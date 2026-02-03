import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="pt-20 md:pt-24 min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <span className="stat-display text-8xl md:text-9xl block mb-4">404</span>
        <h1 className="headline-lg text-foreground mb-4">
          Ruta no encontrada
        </h1>
        <p className="body-lg mb-8 max-w-md mx-auto">
          Parece que te desviaste del camino. Volvamos a la ruta principal.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body font-medium tracking-wide hover:bg-primary/90 transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
