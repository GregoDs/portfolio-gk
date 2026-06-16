import "./Navbar.css";

const navLinks = [
  ["Works,", "/work"],
  ["About,", "/about"],
//   ["Services,", "/services"],
  ["Contact", "/#contact"],
];

function Navbar({ currentPath = "/", onNavigate }) {
  const handleNavigate = (event, href) => {
    event.preventDefault();
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
    </nav>
  );
}

export default Navbar;
