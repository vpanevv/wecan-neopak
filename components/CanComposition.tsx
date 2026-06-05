'use client';

// Editorial SVG composition of blank aluminum cans in the four formats we run
// (250ml Slim, 330ml Sleek, 330ml Standard, 500ml Standard). Rendered as vector
// art so it is always crisp, weightless, unbranded, and on-message for a
// private-label facility.
//
// TODO: Replace with client-provided studio photography of real cans when
// available — swap this component for a <next/image> with priority + blur.

interface CanProps {
  x: number;
  bodyW: number;
  bodyH: number;
  baseY: number;
  label?: 'silver' | 'ember' | 'ink';
  id: string;
}

function Can({ x, bodyW, bodyH, baseY, label = 'silver', id }: CanProps) {
  const topY = baseY - bodyH;
  const rx = bodyW / 2;
  const ellipseRy = bodyW * 0.13;
  const left = x - rx;
  const right = x + rx;

  const labelFill =
    label === 'ember'
      ? `url(#ember-${id})`
      : label === 'ink'
        ? `url(#ink-${id})`
        : `url(#silver-${id})`;

  // Label band sits in the middle third of the can.
  const bandTop = topY + bodyH * 0.3;
  const bandH = bodyH * 0.42;

  return (
    <g>
      {/* Soft contact shadow */}
      <ellipse
        cx={x}
        cy={baseY + 4}
        rx={rx * 1.05}
        ry={ellipseRy * 0.7}
        fill="rgba(15,16,17,0.16)"
      />

      {/* Body */}
      <path
        d={`M ${left} ${topY}
            L ${left} ${baseY}
            A ${rx} ${ellipseRy} 0 0 0 ${right} ${baseY}
            L ${right} ${topY}
            A ${rx} ${ellipseRy} 0 0 1 ${left} ${topY} Z`}
        fill={`url(#body-${id})`}
      />

      {/* Label band */}
      <rect
        x={left}
        y={bandTop}
        width={bodyW}
        height={bandH}
        fill={labelFill}
      />

      {/* Vertical highlight to suggest the brushed-metal sheen */}
      <rect
        x={left + bodyW * 0.16}
        y={topY}
        width={bodyW * 0.1}
        height={bodyH}
        fill="rgba(255,255,255,0.4)"
        opacity={0.55}
      />
      <rect
        x={left + bodyW * 0.6}
        y={topY}
        width={bodyW * 0.05}
        height={bodyH}
        fill="rgba(255,255,255,0.25)"
      />

      {/* Top rim + lid */}
      <ellipse cx={x} cy={topY} rx={rx} ry={ellipseRy} fill={`url(#lid-${id})`} />
      <ellipse
        cx={x}
        cy={topY}
        rx={rx * 0.82}
        ry={ellipseRy * 0.78}
        fill="none"
        stroke="rgba(15,16,17,0.18)"
        strokeWidth={0.8}
      />
      {/* Pull tab */}
      <ellipse
        cx={x}
        cy={topY}
        rx={rx * 0.34}
        ry={ellipseRy * 0.34}
        fill="rgba(15,16,17,0.1)"
      />
    </g>
  );
}

export default function CanComposition({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 520"
      className={className}
      role="img"
      aria-label="Aluminum cans in four formats: 250ml Slim, 330ml Sleek, 330ml and 500ml Standard"
    >
      <defs>
        {['slim', 'sleek', 'std1', 'std2'].map((id) => (
          <g key={id}>
            <linearGradient id={`body-${id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#9aa0a4" />
              <stop offset="0.18" stopColor="#e9ebec" />
              <stop offset="0.42" stopColor="#c2c7ca" />
              <stop offset="0.62" stopColor="#eef0f1" />
              <stop offset="0.82" stopColor="#aab0b4" />
              <stop offset="1" stopColor="#878d91" />
            </linearGradient>
            <linearGradient id={`lid-${id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#b7bcbf" />
              <stop offset="0.5" stopColor="#e7e9ea" />
              <stop offset="1" stopColor="#a4aaae" />
            </linearGradient>
            <linearGradient id={`silver-${id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#c9cdd0" />
              <stop offset="0.5" stopColor="#f3f4f4" />
              <stop offset="1" stopColor="#bcc1c4" />
            </linearGradient>
            <linearGradient id={`ember-${id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#c14a23" />
              <stop offset="0.5" stopColor="#e85d2f" />
              <stop offset="1" stopColor="#b9461f" />
            </linearGradient>
            <linearGradient id={`ink-${id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#0b0c0d" />
              <stop offset="0.5" stopColor="#26282a" />
              <stop offset="1" stopColor="#0b0c0d" />
            </linearGradient>
          </g>
        ))}
      </defs>

      {/* Back-to-front, tallest behind. Baseline ~470. */}
      <Can id="std2" x={300} bodyW={84} bodyH={300} baseY={474} label="ink" />
      <Can id="sleek" x={150} bodyW={62} bodyH={262} baseY={474} label="ember" />
      <Can id="std1" x={228} bodyW={84} bodyH={236} baseY={486} label="silver" />
      <Can id="slim" x={92} bodyW={52} bodyH={214} baseY={486} label="silver" />
    </svg>
  );
}
