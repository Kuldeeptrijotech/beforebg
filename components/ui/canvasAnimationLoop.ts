type CanvasFrameCallback = (time: number, resumed: boolean) => void;

export function startViewportAnimationLoop(
  element: Element,
  drawFrame: CanvasFrameCallback,
): () => void {
  let frameId: number | null = null;
  let isIntersecting = false;
  let isDisposed = false;
  let isResuming = true;

  const shouldRun = () => isIntersecting && !document.hidden && !isDisposed;

  const tick = (time: number) => {
    frameId = null;
    if (!shouldRun()) {
      isResuming = true;
      return;
    }

    drawFrame(time, isResuming);
    isResuming = false;
    frameId = window.requestAnimationFrame(tick);
  };

  const sync = () => {
    if (shouldRun()) {
      if (frameId === null) frameId = window.requestAnimationFrame(tick);
      return;
    }

    if (frameId !== null) {
      window.cancelAnimationFrame(frameId);
      frameId = null;
    }
    isResuming = true;
  };

  const observer = new IntersectionObserver(([entry]) => {
    isIntersecting = entry.isIntersecting;
    sync();
  });

  const handleVisibilityChange = () => sync();

  observer.observe(element);
  document.addEventListener("visibilitychange", handleVisibilityChange);

  return () => {
    isDisposed = true;
    observer.disconnect();
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    if (frameId !== null) window.cancelAnimationFrame(frameId);
  };
}
