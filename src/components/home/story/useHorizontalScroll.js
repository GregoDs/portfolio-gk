import { useLayoutEffect, useState } from "react";

export function useHorizontalScrollDistance(trackRef) {
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const measure = () => {
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    measure();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [trackRef]);

  return distance;
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useLayoutEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);

    media.addEventListener("change", update);
    update();
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}
