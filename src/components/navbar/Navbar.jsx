import { useEffect, useState } from "react";
import "./Navbar.css";

const navLinks = [
  ["Works,", "/work"],
  ["About,", "/about"],
//   ["Services,", "/services"],
  ["Contact", "/#contact"],
];

function Navbar({ currentPath = "/", onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-active", menuOpen);
    return () => document.body.classList.remove("menu-active");
  }, [menuOpen]);

  const handleNavigate = (event, href) => {
    event.preventDefault();
    setMenuOpen(false);
    onNavigate(href);
  };

  return (
    <nav className="navbar" aria-label="Primary navigation">
      <a
        className="navbar__logo"
        href="/"
        aria-label="Gregory Kago home"
        aria-current={currentPath === "/" ? "page" : undefined}
        onClick={(event) => handleNavigate(event, "/")}
      >
        Gregory<span>.</span>
      </a>

      <div className="navbar__links">
        {navLinks.map(([label, href]) => (
          <a
            href={href}
            aria-current={currentPath === href ? "page" : undefined}
            onClick={(event) => handleNavigate(event, href)}
            key={href}
          >
            {label}
          </a>
        ))}
      </div>

      <div className="navbar__socials">
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          Github
        </a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="mailto:gregorykago@gmail.com">Email</a>
      </div>

      <button
        className="navbar__menu-button"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? "Close" : "Menu"}
      </button>

      <div
        className={menuOpen ? "mobile-menu is-open" : "mobile-menu"}
        id="mobile-menu"
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu__inner">
          <p>Navigation</p>
          <div className="mobile-menu__links">
            <a href="/" onClick={(event) => handleNavigate(event, "/")}>
              Home
            </a>
            {navLinks.map(([label, href]) => (
              <a href={href} onClick={(event) => handleNavigate(event, href)} key={href}>
                {label.replace(",", "")}
              </a>
            ))}
          </div>
          <div className="mobile-menu__footer">
            <a href="mailto:gregorykago@gmail.com">gregorykago@gmail.com</a>
            <span>Nairobi / Portfolio</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
