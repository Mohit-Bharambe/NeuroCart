import { Link } from 'react-router-dom';
import { Sparkles, Mail, ArrowRight } from 'lucide-react';
import './footer.css';

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FOOTER_LINKS = {
  Shop: [
    { label: 'All Products', to: '/shop' },
    { label: 'New Arrivals', to: '/shop' },
    { label: 'Best Sellers', to: '/shop' },
    { label: 'Deals', to: '/shop' },
  ],
  Company: [
    { label: 'About Us', to: '/' },
    { label: 'Careers', to: '/' },
    { label: 'Press', to: '/' },
    { label: 'Blog', to: '/' },
  ],
  Support: [
    { label: 'Help Center', to: '/' },
    { label: 'Shipping Info', to: '/' },
    { label: 'Returns', to: '/' },
    { label: 'Contact Us', to: '/' },
  ],
};

const SOCIALS = [
  { icon: TwitterIcon, label: 'Twitter', href: '#' },
  { icon: InstagramIcon, label: 'Instagram', href: '#' },
  { icon: GithubIcon, label: 'GitHub', href: '#' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: '#' },
];

export function Footer() {
  return (
    <footer className="nc-footer">
      {/* Main footer content */}
      <div className="nc-footer-inner">
        {/* Brand column */}
        <div className="nc-footer-brand">
          <Link to="/" className="nc-footer-logo">
            <Sparkles className="w-5 h-5 text-accent" />
            <span>NeuroCart</span>
          </Link>
          <p className="nc-footer-tagline">
            AI-powered shopping experience. Discover products curated just for you.
          </p>

          {/* Newsletter mini */}
          <div className="nc-footer-newsletter">
            <div className="nc-footer-newsletter-input">
              <Mail className="w-4 h-4 text-gray-500" />
              <input type="email" placeholder="Your email" />
              <button aria-label="Subscribe">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title} className="nc-footer-col">
            <h4 className="nc-footer-col-title">{title}</h4>
            <ul className="nc-footer-col-links">
              {links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="nc-footer-bottom">
        <div className="nc-footer-bottom-inner">
          <p className="nc-footer-copyright">
            © {new Date().getFullYear()} NeuroCart. All rights reserved.
          </p>

          <div className="nc-footer-socials">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="nc-footer-social-icon"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <div className="nc-footer-legal">
            <a href="#">Privacy Policy</a>
            <span className="nc-footer-dot">·</span>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}