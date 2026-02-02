import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Lo Que Somos", path: "/lo-que-somos" },
  { name: "Directorio", path: "/directorio" },
  { name: "Hall of Fame", path: "/hall-of-fame" },
  { name: "El Club en Números", path: "/numeros" },
  { name: "Galería", path: "/galeria" },
  { name: "Diario de Ruta", path: "/diario" },
  { name: "Gear Oficial", path: "/gear" },
  { name: "Formar Parte", path: "/formar-parte" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          hasScrolled
            ? "bg-negro-asfalto/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 h-16 md:h-20">
          <Link
            to="/"
            className={`font-display text-xl md:text-2xl font-medium tracking-wide transition-colors duration-300 focus-visible:outline-offset-4 ${
              hasScrolled || isMenuOpen ? "text-blanco-sal" : "text-negro-asfalto"
            }`}
          >
            CORRECAMINOS
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer focus-visible:outline-offset-4 ${
              hasScrolled || isMenuOpen ? "text-blanco-sal" : "text-negro-asfalto"
            }`}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <motion.span
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 6 : 0,
              }}
              className="block w-6 h-0.5 bg-current origin-center"
            />
            <motion.span
              animate={{
                opacity: isMenuOpen ? 0 : 1,
                scaleX: isMenuOpen ? 0 : 1,
              }}
              className="block w-6 h-0.5 bg-current"
            />
            <motion.span
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -6 : 0,
              }}
              className="block w-6 h-0.5 bg-current origin-center"
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-negro-asfalto/[0.97] flex items-center justify-center"
          >
            <motion.ul
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.1 },
                },
                closed: {
                  transition: { staggerChildren: 0.03, staggerDirection: -1 },
                },
              }}
              className="flex flex-col items-center gap-4 md:gap-6"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.path}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: 50 },
                  }}
                >
                  <Link
                    to={link.path}
                    className={`font-display text-2xl md:text-4xl lg:text-5xl text-blanco-sal relative group transition-colors duration-300 focus-visible:outline-offset-4 ${
                      location.pathname === link.path ? "text-primary" : "hover:text-primary"
                    }`}
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};
