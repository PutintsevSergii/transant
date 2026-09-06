const centreX = 360;
const centreY = 290;

interface RailwayOrbitalController {
  destroy(): void;
}

function initializeRailwayOrbital(
  root: HTMLElement,
): RailwayOrbitalController | undefined {
  if (root.dataset.motion !== "auto") return undefined;

  const vehicles = [
    ...root.querySelectorAll<SVGGElement>("[data-orbit-vehicle]"),
  ];
  const reducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  let isIntersecting = false;
  let animationFrame: number | undefined;
  let startedAt = 0;

  const render = (elapsed: number): void => {
    for (const vehicle of vehicles) {
      const speed = Number(vehicle.dataset.speed);
      const angle = Number(vehicle.dataset.angle) + elapsed * speed;
      const radians = (angle * Math.PI) / 180;
      const xOnRing = Number(vehicle.dataset.radiusX) * Math.cos(radians);
      const yOnRing = Number(vehicle.dataset.radiusY) * Math.sin(radians);
      const tilt = (Number(vehicle.dataset.tilt) * Math.PI) / 180;
      const x = centreX + xOnRing * Math.cos(tilt) - yOnRing * Math.sin(tilt);
      const y = centreY + xOnRing * Math.sin(tilt) + yOnRing * Math.cos(tilt);
      const tangentX =
        -Number(vehicle.dataset.radiusX) * Math.sin(radians) * Math.cos(tilt) -
        Number(vehicle.dataset.radiusY) * Math.cos(radians) * Math.sin(tilt);
      const tangentY =
        -Number(vehicle.dataset.radiusX) * Math.sin(radians) * Math.sin(tilt) +
        Number(vehicle.dataset.radiusY) * Math.cos(radians) * Math.cos(tilt);
      const heading =
        (Math.atan2(tangentY, tangentX) * 180) / Math.PI +
        (speed < 0 ? 180 : 0);
      vehicle.setAttribute(
        "transform",
        `translate(${x} ${y}) rotate(${heading})`,
      );
    }
  };

  const animate = (timestamp: number): void => {
    if (!startedAt) startedAt = timestamp;
    render(timestamp - startedAt);
    animationFrame = window.requestAnimationFrame(animate);
  };

  const syncMotion = (): void => {
    const canAnimate =
      isIntersecting &&
      !reducedMotionQuery.matches &&
      document.visibilityState === "visible";
    root.toggleAttribute("data-motion-active", canAnimate);
    if (animationFrame !== undefined) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = undefined;
    }
    startedAt = 0;
    if (canAnimate) animationFrame = window.requestAnimationFrame(animate);
  };

  const observer =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            isIntersecting = entries.some((entry) => entry.isIntersecting);
            syncMotion();
          },
          { threshold: 0.1 },
        )
      : undefined;

  if (observer) observer.observe(root);
  else {
    isIntersecting = true;
    syncMotion();
  }

  reducedMotionQuery.addEventListener("change", syncMotion);
  document.addEventListener("visibilitychange", syncMotion);

  return {
    destroy(): void {
      observer?.disconnect();
      reducedMotionQuery.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncMotion);
      if (animationFrame !== undefined)
        window.cancelAnimationFrame(animationFrame);
      delete root.dataset.motionActive;
    },
  };
}

export function initializeRailwayOrbitals(): void {
  for (const root of document.querySelectorAll<HTMLElement>(
    "[data-railway-orbital]",
  )) {
    if (root.dataset.controllerInitialized === "true") continue;
    initializeRailwayOrbital(root);
    root.dataset.controllerInitialized = "true";
  }
}
