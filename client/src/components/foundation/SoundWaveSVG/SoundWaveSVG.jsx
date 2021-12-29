import React from 'react';

/**
 * @typedef {object} Props
 * @property {{ max: number, peaks: number[] }} meta
 */

/**
 * @type {React.VFC<Props>}
 */
const SoundWaveSVG = ({ meta }) => {
  const uniqueIdRef = React.useRef(Math.random().toString(16));
  const [{ max, peaks }, setPeaks] = React.useState({ max: 0, peaks: [] });

  React.useEffect(() => {
    setPeaks(meta);
  }, [meta]);

  return (
    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1">
      {peaks.map((peak, idx) => {
        const ratio = peak / max;
        return (
          <rect key={`${uniqueIdRef.current}#${idx}`} fill="#2563EB" height={ratio} width="1" x={idx} y={1 - ratio} />
        );
      })}
    </svg>
  );
};

export { SoundWaveSVG };
