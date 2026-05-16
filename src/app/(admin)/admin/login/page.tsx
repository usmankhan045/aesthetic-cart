import { LoginForm } from "@/components/admin/LoginForm";
import { BowAccent } from "@/components/ui/BowAccent";

export const metadata = {
  title: "Admin · Sign in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl p-10 border border-rose-gold/15 shadow-[var(--shadow-card)]">
        <div className="text-center mb-8">
          <BowAccent className="w-12 h-6 mx-auto mb-4 opacity-70" />
          <h1 className="font-serif text-4xl text-charcoal mb-2">
            Admin
          </h1>
          <p className="font-serif italic text-warm-gray">
            Enter the password to manage the edit.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
