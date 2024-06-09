
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header></header>
      <section>{children}</section>
    </>
  );
}
