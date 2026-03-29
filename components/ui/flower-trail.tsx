"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type FlowerParticle = {
  id: number;
  x: number;
  y: number;
  size: number;
  durationMs: number;
  driftPx: number;
  rotationDeg: number;
  opacity: number;
  iconPath: string;
};

const FLOWER_ICONS = [
  "/flowers/flower-01.svg",
  "/flowers/flower-02.svg",
  "/flowers/flower-03.svg",
  "/flowers/flower-04.svg",
  "/flowers/flower-05.svg",
  "/flowers/flower-06.svg",
  "/flowers/flower-07.svg",
  "/flowers/flower-08.svg",
  "/flowers/flower-09.svg",
  "/flowers/flower-10.svg",
];

const MAX_PARTICLES = 120;
const SPAWN_INTERVAL_MS = 32;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function buildParticle(clientX: number, clientY: number, deltaX: number, deltaY: number): FlowerParticle {
  const size = randomBetween(11, 20);
  const lagFactor = randomBetween(0.25, 0.45);
  const x = clientX - deltaX * lagFactor + randomBetween(-4, 4) - size / 2;
  const y = clientY - deltaY * lagFactor + randomBetween(-4, 4) - size / 2;
  const iconPath = FLOWER_ICONS[Math.floor(Math.random() * FLOWER_ICONS.length)] ?? FLOWER_ICONS[0];

  return {
    id: Date.now() + Math.floor(Math.random() * 100000),
    x,
    y,
    size,
    durationMs: randomBetween(2600, 4600),
    driftPx: deltaX * 0.25 + randomBetween(-70, 70),
    rotationDeg: randomBetween(-260, 260),
    opacity: randomBetween(0.68, 0.9),
    iconPath,
  };
}

export function FlowerTrail() {
  const [particles, setParticles] = useState<FlowerParticle[]>([]);
  const lastSpawnRef = useRef(0);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const particleTimeoutsRef = useRef<number[]>([]);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mediaQuery.matches;

    const updateMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
    };

    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) {
      return;
    }

    // Throttle particle creation to keep animation smooth.
    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotionRef.current) {
        return;
      }

      const lastPointer = lastPointerRef.current;
      const deltaX = lastPointer ? event.clientX - lastPointer.x : 0;
      const deltaY = lastPointer ? event.clientY - lastPointer.y : 0;
      lastPointerRef.current = { x: event.clientX, y: event.clientY };

      const now = performance.now();
      if (now - lastSpawnRef.current < SPAWN_INTERVAL_MS) {
        return;
      }
      lastSpawnRef.current = now;

      // Spawn slightly behind pointer movement to create a real trail.
      const particle = buildParticle(event.clientX, event.clientY, deltaX, deltaY);

      setParticles((previous) => [...previous.slice(-MAX_PARTICLES + 1), particle]);

      const timeoutId = window.setTimeout(() => {
        setParticles((previous) => previous.filter((item) => item.id !== particle.id));
      }, particle.durationMs + 180);

      particleTimeoutsRef.current.push(timeoutId);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      for (const timeoutId of particleTimeoutsRef.current) {
        window.clearTimeout(timeoutId);
      }
      particleTimeoutsRef.current = [];
    };
  }, []);

  if (particles.length === 0) {
    return null;
  }

  return (
    <div aria-hidden="true" className="flower-trail-layer">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="flower-trail-particle"
          style={
            {
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              "--flower-fall-duration": `${particle.durationMs}ms`,
              "--flower-fall-drift": `${particle.driftPx}px`,
              "--flower-fall-rotation": `${particle.rotationDeg}deg`,
              "--flower-opacity": particle.opacity,
            } as CSSProperties
          }
        >
          <Image
            src={particle.iconPath}
            alt=""
            width={24}
            height={24}
            unoptimized
            draggable={false}
            className="h-full w-full"
          />
        </span>
      ))}
    </div>
  );
}
