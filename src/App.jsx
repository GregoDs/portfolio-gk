import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import CustomCursor from "./components/cursor/CustomCursor";
import Home from "./components/home/Home";
import Contact from "./components/home/contact/Contact";
import Services from "./components/home/services/Services";
import Navbar from "./components/navbar/Navbar";
import AboutPage from "./components/pages/about/AboutPage";
import SectionPage from "./components/pages/section/SectionPage";
import WorkPage from "./components/pages/work/WorkPage";
import {
  SmoothScrollProvider,
} from "./components/smooth-scroll/SmoothScrollProvider";
import { useSmoothScroll } from "./components/smooth-scroll/smoothScrollContext";

const routes = {
  "/": { label: "Home", element: <Home /> },
  "/about": { label: "About", element: <AboutPage /> },
  "/work": { label: "Work", element: <WorkPage /> },
  "/services": {
    label: "Services",
    element: (
      <SectionPage>
        <Services />
      </SectionPage>
    ),
  },
  "/contact": {
    label: "Contact",
    element: (
      <SectionPage>
        <Contact />
      </SectionPage>
    ),
  },
};

const normalizePath = (path) => {
  if (!path || path === "/index.html") return "/";
  return routes[path] ? path : "/";
};

const getHashTarget = (hash) => {
  if (!hash) return 0;
  return document.querySelector(hash);
};

const scrollToHash = (hash, behavior = "smooth", scrollTo) => {
  const immediate = behavior === "auto";

  if (!hash) {
    scrollTo(0, { immediate });
    return;
  }

  const delays = [0, 80, 180, 360];

  delays.forEach((delay) => {
    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        const target = getHashTarget(hash);
        if (target) scrollTo(target, { immediate });
      });
    }, delay);
  });
};

function AppContent() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  const [gate, setGate] = useState(null);
  const pendingScrollRef = useRef({
    hash: window.location.hash,
    behavior: "auto",
  });
  const { scrollTo } = useSmoothScroll();

  const currentRoute = useMemo(() => routes[path] ?? routes["/"], [path]);

  useEffect(() => {
    const pendingScroll = pendingScrollRef.current;
    if (!pendingScroll) return;

    pendingScrollRef.current = null;
    window.requestAnimationFrame(() => {
      scrollToHash(pendingScroll.hash, pendingScroll.behavior, scrollTo);
    });
  }, [path, scrollTo]);

  useEffect(() => {
    const handlePopState = () => {
      pendingScrollRef.current = {
        hash: window.location.hash,
        behavior: "auto",
      };
      setPath(normalizePath(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = useCallback((target) => {
    const url = new URL(target, window.location.origin);
    const nextPath = normalizePath(url.pathname);
    const nextHash = url.hash;
    const nextTarget = `${nextPath}${nextHash}`;

    if (nextPath === path) {
      window.history.pushState({}, "", nextTarget);
      scrollToHash(nextHash, "smooth", scrollTo);
      return;
    }

    const nextRoute = routes[nextPath] ?? routes["/"];
    setGate({ phase: "entering", label: nextRoute.label });

    window.setTimeout(() => {
      window.history.pushState({}, "", nextTarget);
      pendingScrollRef.current = {
        hash: nextHash,
        behavior: "auto",
      };
      setPath(nextPath);
      setGate({ phase: "leaving", label: nextRoute.label });
    }, 620);

    window.setTimeout(() => setGate(null), 1320);
  }, [path, scrollTo]);

  const handleInternalLink = (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const link = event.target.closest("a");
    if (!link || link.target || link.hasAttribute("download")) return;

    const url = new URL(link.href, window.location.origin);
    if (url.origin !== window.location.origin) return;
    const appRoute = routes[url.pathname] || url.pathname === "/index.html";
    const homeHash = url.pathname === "/" && url.hash;
    if (!appRoute && !homeHash) return;

    event.preventDefault();
    navigate(`${url.pathname}${url.hash}`);
  };

  return (
    <>
      <CustomCursor />
      <Navbar currentPath={path} onNavigate={navigate} />

      <div onClick={handleInternalLink}>{currentRoute.element}</div>

      {gate && (
        <div className={`page-gate page-gate--${gate.phase}`} aria-hidden="true">
          <span>build & ship today</span>
          <strong>{gate.label}</strong>
          <i className="page-gate__strip" />
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <SmoothScrollProvider>
      <AppContent />
    </SmoothScrollProvider>
  );
}

export default App;
