import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  Heart,
  Bookmark,
  Eye,
  Settings,
  LogOut,
  ChevronRight,
  CalendarDays,
  Mail,
  LoaderCircle,
  Clapperboard,
} from "lucide-react";
import { authClient } from "../../lib/auth-client";

function getStoredCount(key: string): number {
  try {
    const stored = localStorage.getItem(key);

    if (!stored) return 0;

    const parsed: unknown = JSON.parse(stored);

    if (Array.isArray(parsed)) return parsed.length;

    if (parsed && typeof parsed === "object") {
      return Object.keys(parsed).length;
    }

    return 0;
  } catch {
    return 0;
  }
}

function Profile() {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();

  const [favoriteCount, setFavoriteCount] = useState(0);
  const [watchlistCount, setWatchlistCount] = useState(0);
  const [viewedCount, setViewedCount] = useState(0);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState("");

  const user = session?.user;

  useEffect(() => {
    const updateCounts = () => {
      setFavoriteCount(getStoredCount("favorites"));
      setWatchlistCount(getStoredCount("watchlist"));
      setViewedCount(getStoredCount("recentlyViewed"));
    };

    updateCounts();
    window.addEventListener("storage", updateCounts);

    return () => {
      window.removeEventListener("storage", updateCounts);
    };
  }, []);

  async function handleSignOut() {
    setSigningOut(true);
    setError("");

    try {
      const result = await authClient.signOut();

      if (result.error) {
        setError(result.error.message || "Unable to sign out.");
        return;
      }

      navigate("/login", { replace: true });
    } catch {
      setError("Server connection failed. Please try again.");
    } finally {
      setSigningOut(false);
    }
  }

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#09090b] text-zinc-400">
        <LoaderCircle className="mr-3 animate-spin" size={24} />
        Loading your profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#09090b] px-4 text-center text-white">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
          <UserRound size={34} className="text-zinc-400" />
        </div>

        <h1 className="text-2xl font-bold">Sign in to MovieHub</h1>

        <p className="mt-2 max-w-sm text-sm text-zinc-400">
          Log in to view your profile and manage your movie collection.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-6 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const initials = (user.name || user.email || "U")
    .trim()
    .charAt(0)
    .toUpperCase();

  const createdAt = "createdAt" in user ? user.createdAt : undefined;

  const memberSince =
    createdAt && !Number.isNaN(new Date(createdAt).getTime())
      ? new Date(createdAt).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      : "MovieHub Member";

  const stats = [
    {
      label: "Favorites",
      count: favoriteCount,
      icon: Heart,
      color: "text-red-400",
      background: "bg-red-500/10",
      path: "/favorites",
    },
    {
      label: "Watchlist",
      count: watchlistCount,
      icon: Bookmark,
      color: "text-amber-400",
      background: "bg-amber-500/10",
      path: "/watchlist",
    },
    {
      label: "Recently Viewed",
      count: viewedCount,
      icon: Eye,
      color: "text-blue-400",
      background: "bg-blue-500/10",
      path: "/recently-viewed",
    },
  ];

  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-8 text-white sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Page heading */}
        <div className="mb-8">
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-red-400">
            <Clapperboard size={15} />
            MovieHub Account
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-zinc-400 sm:text-base">
            Your account, your movies, your next favorite story.
          </p>
        </div>

        {/* Profile card */}
        <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#18181b] via-[#111113] to-[#190d10] p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-red-600/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10 text-3xl font-bold text-red-400 sm:h-24 sm:w-24">
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <span className="inline-flex rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-red-300">
                Movie Lover
              </span>

              <h2 className="mt-3 break-words text-2xl font-bold sm:text-3xl">
                {user.name || "MovieHub Member"}
              </h2>

              <p className="mt-2 flex items-center gap-2 break-all text-sm text-zinc-400">
                <Mail size={15} className="shrink-0" />
                {user.email}
              </p>

              <p className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
                <CalendarDays size={14} />
                {memberSince === "MovieHub Member"
                  ? memberSince
                  : `Member since ${memberSince}`}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] px-3 py-2 sm:self-center">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-emerald-300">
                Account Active
              </span>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <button
                key={stat.label}
                onClick={() => navigate(stat.path)}
                className="group rounded-2xl border border-white/[0.07] bg-[#111113] p-5 text-left transition hover:-translate-y-1 hover:border-red-500/30 hover:bg-[#161214]"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.background} ${stat.color}`}
                  >
                    <Icon size={21} />
                  </div>

                  <ChevronRight
                    size={18}
                    className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-red-400"
                  />
                </div>

                <p className="mt-5 text-3xl font-bold">{stat.count}</p>

                <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
              </button>
            );
          })}
        </section>

        {/* Collection */}
        <section className="mt-10">
          <div className="mb-4">
            <h2 className="text-xl font-bold">My Collection</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Keep your favorite movies close.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111113]">
            <button
              onClick={() => navigate("/favorites")}
              className="flex w-full items-center gap-4 border-b border-white/[0.06] p-5 text-left transition hover:bg-white/[0.03]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                <Heart size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold">Favorite Movies</h3>
                <p className="mt-1 text-sm text-zinc-500">
                  Your personal list of loved movies.
                </p>
              </div>

              <ChevronRight size={19} className="text-zinc-500" />
            </button>

            <button
              onClick={() => navigate("/watchlist")}
              className="flex w-full items-center gap-4 border-b border-white/[0.06] p-5 text-left transition hover:bg-white/[0.03]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Bookmark size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold">My Watchlist</h3>
                <p className="mt-1 text-sm text-zinc-500">
                  Movies you want to watch later.
                </p>
              </div>

              <ChevronRight size={19} className="text-zinc-500" />
            </button>

            <button
              onClick={() => navigate("/recently-viewed")}
              className="flex w-full items-center gap-4 p-5 text-left transition hover:bg-white/[0.03]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Eye size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold">Recently Viewed</h3>
                <p className="mt-1 text-sm text-zinc-500">
                  Keep track of movies you explored.
                </p>
              </div>

              <ChevronRight size={19} className="text-zinc-500" />
            </button>
          </div>
        </section>

        {/* Account details */}
        <section className="mt-10">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Account Details</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Your current account information.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-[#111113] p-5 sm:p-6">
            <div className="flex items-start gap-3 border-b border-white/[0.06] pb-5">
              <UserRound size={19} className="mt-1 text-zinc-500" />

              <div className="min-w-0 flex-1">
                <p className="text-xs text-zinc-500">Full Name</p>
                <p className="mt-1 break-words text-sm font-medium">
                  {user.name || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-5">
              <Mail size={19} className="mt-1 text-zinc-500" />

              <div className="min-w-0 flex-1">
                <p className="text-xs text-zinc-500">Email Address</p>
                <p className="mt-1 break-all text-sm font-medium">
                  {user.email}
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Your email is provided by your account session.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Account actions */}
        <section className="mt-10 rounded-2xl border border-white/[0.07] bg-[#111113] p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05] text-zinc-300">
              <Settings size={21} />
            </div>

            <div>
              <h2 className="font-semibold">Account Settings</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Manage your MovieHub account.
              </p>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          <div className="mt-5 border-t border-white/[0.06] pt-5">
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {signingOut ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                <LogOut size={17} />
              )}

              {signingOut ? "Signing out..." : "Sign Out"}
            </button>
          </div>
        </section>

        <footer className="mt-10 border-t border-white/[0.06] pt-6 text-center text-xs text-zinc-600">
          MovieHub · Your next favorite movie starts here.
        </footer>
      </div>
    </main>
  );
}

export default Profile;
