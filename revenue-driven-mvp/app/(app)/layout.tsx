import { requireUser } from '@/lib/auth';
import { SidebarNav } from '@/components/shared/sidebar-nav';
import { UserMenu } from '@/components/shared/user-menu';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 shrink-0 border-r bg-white">
        <div className="flex h-14 items-center border-b px-4">
          <span className="font-bold">Revenue Driven</span>
        </div>
        <SidebarNav />
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-end border-b bg-white px-6">
          <UserMenu user={user} />
        </header>
        <main className="flex-1 bg-slate-50 p-6">{children}</main>
      </div>
    </div>
  );
}
