import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/prisma/prisma-client';
import { compare, hashSync } from 'bcrypt';
import { UserRole } from '@prisma/client';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: 'USER' as UserRole,
        };
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'E-Mail', type: 'text' },
        password: { label: 'Пароль', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.log('No credentials provided');
          return null;
        }

        console.log('Attempting login with:', credentials.email);

        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (!user) {
          console.log('User not found');
          return null;
        }

        console.log('User found:', {
          id: user.id,
          email: user.email,
          hasPassword: !!user.password,
          passwordLength: user.password?.length,
        });

        try {
          const isPasswordValid = await compare(
            credentials.password,
            user.password
          );
          console.log('Password validation:', isPasswordValid);
          console.log('Input password:', credentials.password);
          console.log('Stored password hash:', user.password);

          if (!isPasswordValid) {
            console.log('Invalid password');
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.fullName,
            role: user.role,
          };
        } catch (error) {
          console.error('Error comparing passwords:', error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === 'credentials') {
          return true;
        }
        if (!user.email) return false;

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                provider: account?.provider,
                providerId: account?.providerAccountId,
              },
              { email: user.email },
            ],
          },
        });

        if (findUser) {
          await prisma.user.update({
            where: { id: findUser.id },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });

          return true;
        }

        await prisma.user.create({
          data: {
            email: user.email,
            fullName: user.name || `User #${user.id}`,
            password: hashSync(user.id.toString(), 10),
            verified: new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        });

        return true;
      } catch (error) {
        console.error('Error [SIGNIN]', error);
        return false;
      }
    },

    async jwt({ token }) {
      if (!token.email) return token;
      const findUser = await prisma.user.findFirst({
        where: { email: token.email },
      });

      if (findUser) {
        token.id = String(findUser.id);
        token.email = findUser.email;
        token.name = findUser.fullName;
        token.role = findUser.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
