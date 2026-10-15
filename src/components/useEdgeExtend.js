import { useEffect } from 'react';

// Fills the space around a fitted ("contain") video by extending the video's own edges
// outward, every frame: the outermost rows and columns are stretched across the empty
// bands, so the background a scene already has (a UI's cream, the crystals around the ring)
// carries on to the edges of the screen and the whole screen reads as the film.
const useEdgeExtend = (videoRef, canvasRef, active = true) => {
  useEffect(() => {
    if (!active) return undefined;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // the video's edges, gently smoothed along their length so the bands are soft fields of
    // the edge colours rather than streaks
    const edge = document.createElement('canvas');
    const ectx = edge.getContext('2d');
    const EW = 56; // samples along each edge: lower = softer fields
    const DEPTH = 2; // rows/columns taken from each edge
    const avg = document.createElement('canvas');
    avg.width = 1;
    avg.height = 1;
    const actx = avg.getContext('2d', { willReadFrequently: true });
    // the average colour of a strip of the edge canvas, as 'r, g, b'
    const tone = (sx, sy, sw, sh) => {
      actx.drawImage(edge, sx, sy, sw, sh, 0, 0, 1, 1);
      const [r, g, b] = actx.getImageData(0, 0, 1, 1).data;
      return `${r}, ${g}, ${b}`;
    };
    // fade a band from the extended edge (at the film) into that edge's average colour
    const fade = (c, x0, y0, x1, y1, rx, ry, rw, rh) => {
      const g = ctx.createLinearGradient(x0, y0, x1, y1);
      g.addColorStop(0, `rgba(${c}, 0)`);
      g.addColorStop(0.65, `rgba(${c}, 1)`);
      g.addColorStop(1, `rgba(${c}, 1)`);
      ctx.fillStyle = g;
      ctx.fillRect(rx, ry, rw, rh);
    };
    let raf = 0;

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      const video = videoRef.current;
      if (!video || video.readyState < 2 || !video.videoWidth) return;
      const W = canvas.width;
      const H = canvas.height;
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      const s = Math.min(W / vw, H / vh);
      const w = vw * s;
      const h = vh * s;
      const x = (W - w) / 2;
      const y = (H - h) / 2;
      try {
        edge.width = EW;
        edge.height = Math.max(2, Math.round((EW * vh) / vw));
        ectx.drawImage(video, 0, 0, edge.width, edge.height);
        const ew = edge.width;
        const eh = edge.height;
        if (y > 0.5) {
          const b = H - (y + h);
          ctx.drawImage(edge, 0, 0, ew, DEPTH, x, 0, w, y + 1); // top rows, upward
          ctx.drawImage(edge, 0, eh - DEPTH, ew, DEPTH, x, y + h - 1, w, b + 1); // bottom rows, downward
          fade(tone(0, 0, ew, DEPTH), 0, y, 0, 0, 0, 0, W, y + 1);
          fade(tone(0, eh - DEPTH, ew, DEPTH), 0, y + h, 0, H, 0, y + h - 1, W, b + 1);
        }
        if (x > 0.5) {
          const r = W - (x + w);
          ctx.drawImage(edge, 0, 0, DEPTH, eh, 0, y, x + 1, h); // left columns
          ctx.drawImage(edge, ew - DEPTH, 0, DEPTH, eh, x + w - 1, y, r + 1, h); // right columns
          fade(tone(0, 0, DEPTH, eh), x, 0, 0, 0, 0, 0, x + 1, H);
          fade(tone(ew - DEPTH, 0, DEPTH, eh), x + w, 0, W, 0, x + w - 1, 0, r + 1, H);
        }
      } catch {
        // a cross-origin video can't be read; the plain backdrop colour stays
      }
    };

    fit();
    window.addEventListener('resize', fit);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', fit);
    };
  }, [videoRef, canvasRef, active]);
};

export default useEdgeExtend;
