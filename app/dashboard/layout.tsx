import AuthHeader from '@/components/AuthHeader';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function DashboardLayout({
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

