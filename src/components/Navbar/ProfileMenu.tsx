import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authClient } from "../../lib/auth-client";
import {
  UserRound,
  LogOut,
  ChevronDown,
  Heart,
  LoaderCircle,
} from "lucide-react";

export default function ProfileMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  async function handleLogout() {
    setLoggingOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        console.error("Logout failed:", result.error.message);
        return;
      }

      setOpen(false);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  }

  if (isPending) {
    return (
      <div className="flex h-10 w-10 items-center justify-center text-zinc-400">
        <LoaderCircle className="animate-spin" size={20} />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("/login")}
          className="rounded-xl px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-white/5 hover:text-white"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
        >
          Sign Up
        </button>
      </div>
    );
  }

  // Logged-in profile menu
  const initial = (user.name || user.email || "U").charAt(0).toUpperCase();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-label="Open profile menu"
        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 transition hover:border-white/20 hover:bg-white/[0.08]"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 font-bold text-white">
          {initial}
        </div>

        <div className="hidden max-w-36 text-left sm:block">
          <p className="truncate text-sm font-semibold text-white">
            {user.name || "MovieHub User"}
          </p>
          <p className="truncate text-xs text-zinc-400">{user.email}</p>
        </div>

        <ChevronDown
          size={16}
          className={`text-zinc-400 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close profile menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#111116] p-2 shadow-2xl shadow-black/40">
            <div className="border-b border-white/10 px-3 py-3">
              <p className="truncate text-sm font-semibold text-white">
                {user.name || "MovieHub User"}
              </p>
              <p className="mt-1 break-all text-xs text-zinc-400">
                {user.email}
              </p>
              <p className="mt-2 text-xs text-emerald-400">● Signed in</p>
            </div>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                navigate("/profile");
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
            >
              <UserRound size={17} />
              My Profile
            </button>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                navigate("/favorites");
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
            >
              <Heart size={17} />
              My Favorites
            </button>

            <div className="my-1 border-t border-white/10" />

            <button
              type="button"
              disabled={loggingOut}
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
            >
              <LogOut size={17} />
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
