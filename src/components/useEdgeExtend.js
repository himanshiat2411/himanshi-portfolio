import { useEffect, useState } from 'react';

// The colour around the edges of a playing video, sampled a few times a second, so the
// backdrop behind a letterboxed video can match whatever the video is showing.
const useEdgeColor = (videoRef, fallback, active = true) => {
  const [color, setColor] = useState(fallback);

  useEffect(() => {
    if (!active) return undefined;
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const sample = () => {
      const video = videoRef.current;
      if (!video || video.readyState < 2) return;
      try {
        ctx.drawImage(video, 0, 0, 16, 16);
        const { data } = ctx.getImageData(0, 0, 16, 16);
        // average the outer ring of pixels
        let r = 0;
        let g = 0;
        let b = 0;
        let n = 0;
        for (let y = 0; y < 16; y++) {
          for (let x = 0; x < 16; x++) {
            if (x > 0 && x < 15 && y > 0 && y < 15) continue;
            const i = (y * 16 + x) * 4;
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            n++;
          }
        }
        setColor(`rgb(${Math.round(r / n)}, ${Math.round(g / n)}, ${Math.round(b / n)})`);
      } catch {
        // a cross-origin video can't be read; keep the fallback
      }
    };
    const id = setInterval(sample, 200);
    return () => clearInterval(id);
  }, [videoRef, active]);

  return color;
};

export default useEdgeColor;
