import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const services = await prisma.service.findMany();
  return NextResponse.json(services);
}
