import AuthHeader from '@/components/AuthHeader';

export const dynamic = 'force-dynamic';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthHeader />
      <main className="flex-1">{children}</main>
    </>
  );
}

