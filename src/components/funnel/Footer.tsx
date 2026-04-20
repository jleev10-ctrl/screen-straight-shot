import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border mt-20">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Tap Movie Engine</p>
        <div className="flex gap-6">
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Follow on X
          </a>
          <Link to="/auth" className="hover:text-primary transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};
