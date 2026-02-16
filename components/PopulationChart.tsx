import React, { useState, MouseEvent } from "react";

const TOTAL = 70;
const CASES = 13;
const COLS = 14;
const UNIT = 500000;
const ICON_W = 52;
const ICON_H = 62;
const PAD_X = 6;
const PAD_Y = 6;

const PERSON_PATH = "M410.79,461.57s-.37,22.84-24.34,22.86c-23.45.02-23.45-21.69-23.45-21.69v-128.04c0-16.71.07-20.7-4.25-20.7s-3.35,14.72-3.35,26.3c0,21.38-.4,323.75-.4,391.7,0,11.33-15.61,33.15-32.6,33.15-25.5,0-36.69-22.96-36.69-33.51v-178.38c0-15.37,1.43-23.78-6.1-25.01-7.53,1.23-6.1,9.64-6.1,25.01v178.38c0,10.56-11.19,33.51-36.69,33.51-16.99,0-32.6-21.83-32.6-33.15,0-67.95-.4-370.32-.4-391.7,0-11.58,1-26.3-3.35-26.3s-4.25,3.99-4.25,20.7v128.04s0,21.71-23.45,21.69c-23.96-.02-24.34-22.86-24.34-22.86,0,0-.62-137.44.55-174.93,2.18-70.51,55.67-84.94,76.37-85.25,35.82-.55,51.26-.4,54.26-.41,3.01,0,18.44-.14,54.26.41,20.7.32,74.19,14.74,76.38,85.25,1.17,37.49.54,174.93.54,174.93ZM279.62,61.24c-35.43,0-64.15,28.72-64.15,64.15s28.72,64.15,64.15,64.15,64.15-28.72,64.15-64.15-28.72-64.15-64.15-64.15Z";

// Original SVG viewBox: 0 0 595.28 841.89
// Icon bounds roughly: x 148–411, y 61–765 → w~263, h~704
const VB_X = 148;
const VB_Y = 50;
const VB_W = 270;
const VB_H = 720;

// Theme colors
const TEAL = "#02605b";
const CRIMSON = "#9f1c20"; 
const NAVY = "#394a62";

interface IconData {
  i: number;
  col: number;
  row: number;
  isCase: boolean;
}

const PopulationChart: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 });

  const icons: IconData[] = [];
  for (let i = 0; i < TOTAL; i++) {
    icons.push({
      i,
      col: i % COLS,
      row: Math.floor(i / COLS),
      isCase: i >= TOTAL - CASES,
    });
  }

  const rows = Math.ceil(TOTAL / COLS);
  const svgW = COLS * (ICON_W + PAD_X) + PAD_X;
  const svgH = rows * (ICON_H + PAD_Y) + PAD_Y + 60;

  const handleMove = (e: MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget.closest("svg");
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    setTipPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const getLabel = (icon: IconData) => {
    if (icon.isCase) {
      // e.g. if i is 57 (TOTAL-CASES), caseNum is 1.
      const caseNum = icon.i - (TOTAL - CASES) + 1;
      return `Malaria case group ${caseNum} of ${CASES}`;
    }
    return `Healthy group ${icon.i + 1} of ${TOTAL - CASES}`;
  };
  
  const getSubLabel = (icon: IconData) => {
      return "represents 500,000 people";
  }

  return (
    <div className="w-full flex flex-col items-center font-sans">
      <div className="text-center mb-6">
        <h2 className="text-navy font-semibold text-xl md:text-2xl mb-2">
            6.5 million cases out of 35 million population
        </h2>
        <p className="text-navy/60 text-sm italic">
            Hover or tap on any figure to see what it represents
        </p>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            className="mx-auto"
            style={{ overflow: "visible", maxHeight: '80vh', width: '100%', maxWidth: '800px' }}
            onMouseMove={handleMove}
        >
            {icons.map(({ i, col, row, isCase }) => {
            const x = PAD_X + col * (ICON_W + PAD_X);
            const y = PAD_Y + row * (ICON_H + PAD_Y);
            const active = hovered === i;
            const fill = isCase ? CRIMSON : TEAL;

            return (
                <g key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
                >
                <svg
                    x={x} y={y}
                    width={ICON_W} height={ICON_H}
                    viewBox={`${VB_X} ${VB_Y} ${VB_W} ${VB_H}`}
                >
                    <path
                    d={PERSON_PATH}
                    fill={fill}
                    fillRule="evenodd"
                    opacity={hovered !== null && !active ? 0.3 : 1}
                    style={{ transition: "opacity 0.2s ease, transform 0.2s ease" }}
                    />
                </svg>
                {active && (
                    <rect
                    x={x - 2} y={y - 2}
                    width={ICON_W + 4} height={ICON_H + 4}
                    rx={4}
                    fill="none"
                    stroke={fill}
                    strokeWidth={2}
                    opacity={0.6}
                    />
                )}
                </g>
            );
            })}

            <text x={svgW / 2} y={rows * (ICON_H + PAD_Y) + 30} textAnchor="middle" fontSize="13" fill="#394a62" fontWeight="500">
            1 icon = 500,000 people
            </text>

            {hovered !== null && (() => {
                const label = getLabel(icons[hovered]);
                const subLabel = getSubLabel(icons[hovered]);
                const bg = icons[hovered].isCase ? CRIMSON : TEAL;
                
                // Tooltip dimensions
                const tw = 220;
                const th = 50;
                
                // Constrain tooltip to SVG bounds
                const tx = Math.max(tw / 2, Math.min(tipPos.x, svgW - tw / 2));
                const ty = tipPos.y - 16;
                
                return (
                    <g style={{ pointerEvents: "none" }}>
                        <rect x={tx - tw / 2} y={ty - th} width={tw} height={th} rx={6} fill={bg} opacity={0.95} />
                        <polygon points={`${tx - 5},${ty} ${tx + 5},${ty} ${tx},${ty + 6}`} fill={bg} opacity={0.95} />
                        <text x={tx} y={ty - th + 20} textAnchor="middle" fontSize="12" fill="white" fontWeight="600">{label}</text>
                        <text x={tx} y={ty - th + 38} textAnchor="middle" fontSize="11" fill="white" fontWeight="400">{subLabel}</text>
                    </g>
                );
            })()}
        </svg>
      </div>

      <div className="flex gap-6 mt-6 justify-center flex-wrap">
        <div className="flex items-center gap-2">
          <svg width={18} height={22} viewBox={`${VB_X} ${VB_Y} ${VB_W} ${VB_H}`}>
            <path d={PERSON_PATH} fill={TEAL} fillRule="evenodd" />
          </svg>
          <span className="text-sm text-navy">Healthy ({((TOTAL - CASES) * UNIT / 1e6).toFixed(1)}M)</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width={18} height={22} viewBox={`${VB_X} ${VB_Y} ${VB_W} ${VB_H}`}>
            <path d={PERSON_PATH} fill={CRIMSON} fillRule="evenodd" />
          </svg>
          <span className="text-sm text-navy">Malaria Cases ({(CASES * UNIT / 1e6).toFixed(1)}M)</span>
        </div>
      </div>
    </div>
  );
}

export default PopulationChart;