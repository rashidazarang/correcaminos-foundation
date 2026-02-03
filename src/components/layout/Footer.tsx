import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-negro-asfalto py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Link
            to="/"
            className="font-display text-lg text-blanco-sal tracking-wide"
          >
            CORRECAMINOS
          </Link>

          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/club_correcaminos/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gris-humo hover:text-primary transition-colors duration-300"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://www.strava.com/clubs/corecaminosmty"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gris-humo hover:text-primary transition-colors duration-300"
              aria-label="Strava"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
              </svg>
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1 text-gris-humo text-sm font-body">
            <span>Monterrey, México</span>
            <span>© 2026 Club Correcaminos</span>
            <Link
              to="/admin"
              className="text-gris-humo/30 hover:text-gris-humo/60 text-xs transition-colors duration-300"
            >
              Admin
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gris-humo/10 text-center">
          <span className="font-body text-[11px] tracking-wide text-gris-humo/30">
            Hecho por{" "}
            <a
              href="https://rashidazarang.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gris-humo/50 transition-colors duration-300"
            >
              Rashid Azarang
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};
