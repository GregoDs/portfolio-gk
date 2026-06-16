import { useEffect, useRef } from "react";
import { useSmoothScroll } from "../smooth-scroll/smoothScrollContext";
import "./Footer.css";

const quickLinks = [
  ["Home", "/#home"],
  ["About", "/about"],
  ["Work", "/work"],
  ["Contact", "/#contact"],
];

const socials = [
  ["Instagram", "#"],
  ["LinkedIn", "#"],
  ["Behance", "#"],
];

function Footer({ onNavigate }) {
  const footerRef = useRef(null);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const footer = footerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          footer.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const handleQuickLink = (event, target) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(target);
  };

  return (
    <footer className="site-footer" id="contact" ref={footerRef}>
      <div className="site-footer__ambient" aria-hidden="true">
        <span />
        <span />
      </div>

      <section className="site-footer__cta">
        <p>Need the right mix of capabilities?</p>
        <h2>
          Let&apos;s build
          <br />
          what&apos;s <span>next.</span>
        </h2>
        <a href="tel:0706622071">
          Start a project <span>↗</span>
        </a>
      </section>

      <div className="site-footer__details">
        <nav className="site-footer__links" aria-label="Footer navigation">
          <p>Quick links/</p>
          {quickLinks.map(([label, target]) => (
            <a
              href={target}
              onClick={(event) => handleQuickLink(event, target)}
              key={label}
            >
              <span>{label}</span>
              <em>↗</em>
            </a>
          ))}
        </nav>

        <div className="site-footer__contact">
          <p>Contact/</p>
          <a href="mailto:gregorykago@gmail.com">gregorykago@gmail.com</a>
          <span>Nairobi · Working worldwide</span>
        </div>

        <div className="site-footer__socials">
          <p>Social/</p>
          {socials.map(([label, target]) => (
            <a
              href={target}
              onClick={target === "#" ? (event) => event.preventDefault() : undefined}
              key={label}
            >
              {label} <span>↗</span>
            </a>
          ))}
        </div>
      </div>

      <div className="site-footer__bottom">
        <strong>
          GK<span>.</span>
        </strong>
        <p>© 2026 Designed & coded by Gregory Kago. All rights reserved.</p>
        <button type="button" onClick={() => scrollTo(0)}>
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}

export default Footer;
