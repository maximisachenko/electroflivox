import { InfoBlock } from '@/shared/components/shared/info-block';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Доступ запрещён"
        text="Для доступа к этой странице необходимо авторизоваться"
        imageUrl="/lock.png"
      />
    </div>
  );
}
