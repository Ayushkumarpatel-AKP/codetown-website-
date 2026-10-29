import React, { useEffect, useRef } from 'react';
import { faceCanvas, FaceMood } from './lib/faces';

/** A pixel portrait drawn in code by the same routine the extension uses. */
export const Face: React.FC<{ id: string; mood: FaceMood; effort: string; px?: number; className?: string }> = ({ id, mood, effort, px = 3, className }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const src = faceCanvas(id, mood, effort, px);
    c.width = src.width; c.height = src.height;
    const g = c.getContext('2d')!;
    g.clearRect(0, 0, c.width, c.height);
    g.drawImage(src, 0, 0);
  }, [id, mood, effort, px]);
  return <canvas ref={ref} className={'face ' + (className ?? '')} aria-hidden="true" />;
};
