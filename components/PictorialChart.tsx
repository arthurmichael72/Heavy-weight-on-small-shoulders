import React, { useState, MouseEvent } from 'react';

const DATA_FULL = [
  { year: 2015, admissions: 214118 },
  { year: 2016, admissions: 182053 },
  { year: 2017, admissions: 161151 },
  { year: 2018, admissions: 157367 },
  { year: 2019, admissions: 165608 },
  { year: 2020, admissions: 122553 },
  { year: 2021, admissions: 142938 },
  { year: 2022, admissions: 142251 },
  { year: 2023, admissions: 128087 },
  { year: 2024, admissions: 110260 }
];

// Provided snippet restricts admissions chart to 2015-2019
const DATA_ADMISSIONS = DATA_FULL.filter(d => d.year <= 2019);

const ICON_VALUE = 5000;
const ICON_SIZE = 40;
const ICON_SPACING = 5;
const ICONS_PER_ROW = 3;
const COL_WIDTH = 220; // Increased from 180 to 220 per snippet
const MARGIN = { top: 80, right: 40, bottom: 100, left: 40 };

// Snippet Color
const COLOR_NAVY_SNIPPET = "#2C3E75";
const COLOR_TEAL = '#02605b';
const COLOR_CRIMSON = '#9f1c20';

interface PictorialChartProps {
  mode: 'admissions' | 'comparison';
}

const BedIcon: React.FC<{ x: number; y: number; size: number; color: string; opacity?: number }> = ({ x, y, size, color, opacity = 1 }) => {
  const scale = size / 100;
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} style={{ opacity, transition: 'opacity 0.2s' }}>
      {/* Bed Frame */}
      <rect x="20" y="45" width="60" height="3" rx="1" fill={color} />
      <rect x="25" y="48" width="50" height="2" fill={color} />
      <rect x="18" y="38" width="3" height="15" rx="1" fill={color} />
      <rect x="79" y="41" width="3" height="12" rx="1" fill={color} />
      
      {/* Wheels */}
      <circle cx="25" cy="55" r="2.5" fill={color} />
      <circle cx="75" cy="55" r="2.5" fill={color} />
      
      {/* Patient */}
      <circle cx="31" cy="35" r="4" fill={color} />
      <path d="M22 43 L32 38 L42 43 L42 45 L22 45 Z" fill={color} />
      <path d="M40 38 L78 40 L78 45 L40 45 Z" fill={color} />
      <rect x="36" y="41" width="12" height="3" rx="1.5" fill="white" />
    </g>
  );
};

const PictorialChart: React.FC<PictorialChartProps> = ({ mode }) => {
  const [hoveredIcon, setHoveredIcon] = useState<{ year: number; iconIndex: number; total: number; value: number } | null>(null);
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 });

  // Select Data based on mode
  const dataset = mode === 'admissions' ? DATA_ADMISSIONS : DATA_FULL;
  const isComparison = mode === 'comparison';

  // Chart Dimensions Logic
  const maxIcons = Math.ceil(Math.max(...dataset.map(d => d.admissions)) / ICON_VALUE);
  const rows = Math.ceil(maxIcons / ICONS_PER_ROW);
  const width = (COL_WIDTH * dataset.length) + MARGIN.left + MARGIN.right;
  const height = (rows * (ICON_SIZE + ICON_SPACING)) + MARGIN.top + MARGIN.bottom + 80;

  const getColor = (year: number) => {
    if (!isComparison) return COLOR_NAVY_SNIPPET;
    return year >= 2020 ? COLOR_TEAL : COLOR_CRIMSON;
  };

  const handleMouseMove = (e: MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget.closest("svg");
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    setTipPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  // SMC Annotation Position (Only relevant for comparison or full dataset)
  // For admissions mode (ending 2019), we don't show the line.
  const showSMCLine = isComparison;
  let smcLineX = 0;
  if (showSMCLine) {
      const year2019Idx = dataset.findIndex(d => d.year === 2019);
      if (year2019Idx !== -1 && year2019Idx < dataset.length - 1) {
        const x2019 = MARGIN.left + (year2019Idx * COL_WIDTH);
        const x2020 = MARGIN.left + ((year2019Idx + 1) * COL_WIDTH);
        // Place line between the last icon col of 2019 and first of 2020
        const rightEdge2019 = x2019 + (ICONS_PER_ROW * (ICON_SIZE + ICON_SPACING));
        const leftEdge2020 = x2020;
        smcLineX = (rightEdge2019 + leftEdge2020) / 2 - (ICON_SPACING * 2); 
      }
  }

  const titleText = isComparison 
    ? "MALARIA ADMISSIONS: PRE-SMC vs POST-SMC" 
    : "YEARLY MALARIA ADMISSIONS (2015 - 2019)";

  return (
    <div className="w-full relative">
      <div className="w-full overflow-x-auto pb-6 scrollbar-hide flex justify-center">
        <div style={{ minWidth: width }} className="flex flex-col items-center bg-white shadow-sm rounded-lg p-4">
          <svg 
              id={`visualization-${mode}`} 
              width={width} 
              height={height} 
              onMouseMove={handleMouseMove}
              style={{ overflow: 'visible' }}
          >
            {/* Title Group (Top - matches snippet style) */}
            <g transform={`translate(${width / 2}, 40)`} textAnchor="middle">
               <text className="font-sans font-normal text-lg tracking-wider" fill={COLOR_NAVY_SNIPPET}>{titleText}</text>
               <text className="font-sans font-normal text-xs" fill="#666" y="25">1 ICON = 5,000 CASES</text>
            </g>

            {/* Legend for Comparison Mode */}
            {isComparison && (
              <g transform={`translate(${width / 2}, ${height - 20})`}>
                  <g transform="translate(-160, 0)">
                      <rect x="0" y="0" width="16" height="16" rx="2" fill={COLOR_CRIMSON} />
                      <text x="24" y="13" className="font-sans text-sm fill-navy/80 font-medium">Before SMC</text>
                  </g>
                  <g transform="translate(40, 0)">
                      <rect x="0" y="0" width="16" height="16" rx="2" fill={COLOR_TEAL} />
                      <text x="24" y="13" className="font-sans text-sm fill-navy/80 font-medium">After SMC</text>
                  </g>
              </g>
            )}

            {/* SMC Annotation */}
            {showSMCLine && (
                <>
                <line 
                x1={smcLineX} y1={MARGIN.top + 5} 
                x2={smcLineX} y2={height - MARGIN.bottom} 
                stroke={COLOR_NAVY_SNIPPET} strokeWidth="2" strokeDasharray="5,5" 
                opacity="0.5"
                />
                <text 
                x={smcLineX} y={MARGIN.top - 10} 
                textAnchor="middle" 
                className="font-sans text-xs font-semibold"
                fill={COLOR_NAVY_SNIPPET}
                >
                SMC starts
                </text>
                </>
            )}

            {/* Columns */}
            {dataset.map((d, yearIndex) => {
              const totalIcons = Math.round(d.admissions / ICON_VALUE);
              const xOffset = MARGIN.left + (yearIndex * COL_WIDTH);
              const color = getColor(d.year);

              // Generate icons for this year
              const icons = [];
              for (let i = 0; i < totalIcons; i++) {
                  const row = Math.floor(i / ICONS_PER_ROW);
                  const col = i % ICONS_PER_ROW;
                  const x = xOffset + (col * (ICON_SIZE + ICON_SPACING));
                  const y = height - MARGIN.bottom - ((row + 1) * (ICON_SIZE + ICON_SPACING));
                  
                  const isHovered = hoveredIcon?.year === d.year && hoveredIcon?.iconIndex === i;
                  
                  icons.push(
                      <g 
                          key={i} 
                          onMouseEnter={() => setHoveredIcon({ year: d.year, iconIndex: i, total: totalIcons, value: ICON_VALUE })}
                          onMouseLeave={() => setHoveredIcon(null)}
                          className="bed-icon"
                      >
                          <BedIcon 
                              x={x} 
                              y={y} 
                              size={ICON_SIZE} 
                              color={color} 
                              opacity={hoveredIcon && hoveredIcon !== null && (hoveredIcon.year !== d.year || hoveredIcon.iconIndex !== i) ? 0.4 : 1}
                          />
                      </g>
                  );
              }

              return (
                  <g key={d.year}>
                      {icons}
                      {/* Year Label */}
                      <text 
                          x={xOffset + (ICONS_PER_ROW * (ICON_SIZE + ICON_SPACING)) / 2 - ICON_SPACING / 2}
                          y={height - MARGIN.bottom + 40}
                          textAnchor="middle"
                          className="font-sans text-lg"
                          fill={COLOR_NAVY_SNIPPET}
                      >
                          {d.year}
                      </text>
                      {/* Count Label */}
                      <text 
                          x={xOffset + (ICONS_PER_ROW * (ICON_SIZE + ICON_SPACING)) / 2 - ICON_SPACING / 2}
                          y={height - MARGIN.bottom - (rows * (ICON_SIZE + ICON_SPACING)) - 2}
                          textAnchor="middle"
                          className="font-sans text-sm font-bold"
                          fill={COLOR_NAVY_SNIPPET}
                      >
                          {d.admissions.toLocaleString()}
                      </text>
                  </g>
              );
            })}

            {/* Tooltip */}
            {hoveredIcon && (() => {
              const labelLines = [
                  `${hoveredIcon.year}`,
                  `Icon ${hoveredIcon.iconIndex + 1} of ${hoveredIcon.total}`,
                  `${hoveredIcon.value.toLocaleString()} cases`
              ];
              const tw = 160;
              const th = 70;
              const tx = Math.max(tw / 2 + 10, Math.min(tipPos.x, width - tw / 2 - 10));
              const ty = tipPos.y - 14;

              return (
                  <g style={{ pointerEvents: "none", zIndex: 1000 }}>
                      <rect 
                          x={tx - tw / 2} y={ty - th} 
                          width={tw} height={th} 
                          rx={6} 
                          fill={COLOR_NAVY_SNIPPET} 
                          fillOpacity="0.95"
                          stroke="none"
                      />
                      <polygon points={`${tx - 6},${ty} ${tx + 6},${ty} ${tx},${ty + 6}`} fill={COLOR_NAVY_SNIPPET} fillOpacity="0.95" />
                      <text x={tx} y={ty - th + 20} textAnchor="middle" className="font-sans text-sm font-bold fill-white">
                          {labelLines[0]}
                      </text>
                      <text x={tx} y={ty - th + 40} textAnchor="middle" className="font-sans text-xs fill-white/90">
                          {labelLines[1]}
                      </text>
                      <text x={tx} y={ty - th + 58} textAnchor="middle" className="font-sans text-xs fill-white/90">
                          {labelLines[2]}
                      </text>
                  </g>
              );
            })()}

          </svg>
        </div>
      </div>
      
      {/* Mobile Scroll Hint */}
      <div className="block lg:hidden text-center mt-2 text-navy/50 text-xs italic animate-pulse">
        ← Scroll horizontally to see all years →
      </div>
    </div>
  );
};

export default PictorialChart;