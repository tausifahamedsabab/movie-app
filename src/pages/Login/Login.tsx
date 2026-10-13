import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Clapperboard, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { authClient } from "../../lib/auth-client";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authClient.signIn.email({ email, password });

      if (result.error) {
        setError(result.error.message || "Unable to login. Please try again.");
        return;
      }

      navigate("/");
    } catch {
      setError("Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative isolate flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden bg-[#07070a] px-4 py-14 text-white sm:px-6">
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-red-600/[0.12] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-72 w-72 rounded-full bg-red-900/[0.08] blur-[100px]" />

      <section className="w-full max-w-[460px]">
        {/* Brand */}
        <Link to="/" className="mb-8 flex items-center justify-center gap-2.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-600 shadow-lg shadow-red-600/20">
            <Clapperboard size={23} />
          </span>
          <span className="text-2xl font-extrabold tracking-tight">
            Movie<span className="text-red-500">Hub</span>
          </span>
        </Link>

        {/* Card */}
        <div className="rounded-3xl border border-white/[0.09] bg-[#101014]/95 p-6 shadow-2xl shadow-black/40 sm:p-10">
          <div className="mb-8 text-center">
            <span className="mb-4 inline-flex rounded-full border border-red-500/20 bg-red-500/[0.08] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-red-400">
              Welcome Back
            </span>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Sign in to MovieHub
            </h1>

            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-zinc-400">
              Your next favorite movie is waiting for you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="login-email"
                className="mb-2.5 block text-sm font-medium text-zinc-200"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-[54px] w-full rounded-xl border border-white/10 bg-[#09090c] pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 hover:border-white/20 focus:border-red-500/70 focus:ring-4 focus:ring-red-500/10"
                />
              </div>
            </div>

            <div>
              <div className="mb-2.5 flex items-center justify-between">
                <label
                  htmlFor="login-password"
                  className="text-sm font-medium text-zinc-200"
                >
                  Password
                </label>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-[54px] w-full rounded-xl border border-white/10 bg-[#09090c] pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-zinc-600 hover:border-white/20 focus:border-red-500/70 focus:ring-4 focus:ring-red-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-white/[0.06] hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-500/20 bg-red-500/[0.08] px-4 py-3 text-sm leading-5 text-red-300"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group flex h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-bold text-white shadow-lg shadow-red-600/15 transition hover:bg-red-500 hover:shadow-red-600/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing you in..." : "Sign In"}
              {!loading && (
                <span className="text-lg transition-transform group-hover:translate-x-1">
                  →
                </span>
              )}
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/[0.08]" />
            <span className="text-xs text-zinc-600">YOUR MOVIE JOURNEY</span>
            <div className="h-px flex-1 bg-white/[0.08]" />
          </div>

          <p className="text-center text-sm text-zinc-400">
            New to MovieHub?{" "}
            <Link
              to="/signup"
              className="font-semibold text-red-400 transition hover:text-red-300"
            >
              Create an account
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-600">
          Discover stories worth remembering.
        </p>
      </section>
    </main>
  );
}
