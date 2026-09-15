import { Link } from "react-router-dom";
import { Film, Heart, Search, Flame } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="
        relative
        overflow-hidden

        border-t
        border-white/[0.06]

        bg-[#08080b]
        text-zinc-500
      "
    >
      {/* Ambient Glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-40
          -top-40

          h-80
          w-80

          rounded-full
          bg-red-600/[0.06]

          blur-[100px]
        "
      />

      <div className="relative mx-auto max-w-[1600px] px-5 py-12 sm:px-8 lg:px-12">
        {/* Main */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center

                  rounded-xl

                  border
                  border-red-500/15

                  bg-red-500/[0.08]

                  text-red-400
                "
              >
                <Film size={20} />
              </div>

              <div>
                <h2 className="text-lg font-black text-white">MovieHub</h2>

                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-700">
                  Your cinematic universe
                </p>
              </div>
            </div>

            <p className="max-w-xl text-sm leading-7 text-zinc-600">
              Discover popular movies, explore genres, search for your favorite
              films, and keep track of the movies you love.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3
              className="
                mb-4
                text-[10px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-zinc-600
              "
            >
              Explore
            </h3>

            <div className="space-y-2">
              <FooterLink to="/" icon={<Film size={15} />} label="Home" />

              <FooterLink
                to="/search"
                icon={<Search size={15} />}
                label="Search Movies"
              />

              <FooterLink
                to="/trending"
                icon={<Flame size={15} />}
                label="Trending"
              />

              <FooterLink
                to="/favorites"
                icon={<Heart size={15} />}
                label="Favorites"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-white/[0.06]" />

        {/* Bottom */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-zinc-700">
              Movie data and images provided by TMDB.
            </p>

            <p className="mt-1 text-xs text-zinc-800">
              This project is created for educational purposes only.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-700">
            <span>Built with</span>

            <span className="font-semibold text-zinc-500">React</span>

            <span>+</span>

            <span className="font-semibold text-zinc-500">TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* Footer Link */

interface FooterLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const FooterLink = ({ to, icon, label }: FooterLinkProps) => {
  return (
    <Link
      to={to}
      className="
        flex
        w-fit
        items-center
        gap-2

        text-sm
        text-zinc-600

        transition

        hover:translate-x-1
        hover:text-white
      "
    >
      {icon}

      {label}
    </Link>
  );
};

export default Footer;
