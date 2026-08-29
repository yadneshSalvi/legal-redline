"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * The measured content width of an element, so an inline SVG chart can be drawn at exact pixel size
 * — a `viewBox` that does not match the box either distorts the strokes or scales the labels.
 */
export function useElementWidth(ref: RefObject<HTMLElement | null>, fallback: number): number {
  const [width, setWidth] = useState(fallback);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const measure = () => setWidth(Math.max(240, Math.round(node.clientWidth)));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return width;
}
