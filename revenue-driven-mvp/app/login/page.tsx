import { LoginForm } from './login-form';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Revenue Driven</h1>
          <p className="mt-1 text-sm text-muted-foreground">Reactivation AI for auto repair shops</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
