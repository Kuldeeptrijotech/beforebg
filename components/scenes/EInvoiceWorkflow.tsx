"use client";
import type { ReactNode } from "react";
import { FlowLink, Packet, PulseDot, SceneCanvas, TRI } from "./scene-ui";

const hex = (cx: number, cy: number, r: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

const SNAKE =
  "M120 105 L504 105 Q540 105 540 141 L540 254 Q540 290 504 290 L156 290 Q120 290 120 326 L120 424 Q120 460 156 460 L300 460";

type Node = {
  x: number;
  y: number;
  label: string;
  sub: string;
  fill: string;
  stroke: string;
  glyph: ReactNode;
  labelFill: string;
};

function NodeShape({ node, r = 26 }: { node: Node; r?: number }) {
  const { x, y } = node;
  return (
    <g>
      <polygon points={hex(x, y, r + 7)} fill="none" stroke={node.stroke} strokeWidth="1" opacity="0.22" className="tri-pulse" />
      <polygon points={hex(x, y, r)} fill={node.fill} stroke={node.stroke} strokeWidth="1.4" />
      <g transform={`translate(${x},${y})`}>{node.glyph}</g>
      <text x={x} y={y + r + 20} textAnchor="middle" fontSize="12.5" fontWeight={700} fill={node.labelFill} style={{ fontFamily: "Poppins, sans-serif" }}>
        {node.label}
      </text>
      <text x={x} y={y + r + 34} textAnchor="middle" fontSize="9.5" fill="rgba(191,232,216,0.55)" style={{ fontFamily: "Poppins, sans-serif" }}>
        {node.sub}
      </text>
    </g>
  );
}

const GLYPH = {
  server: (
    <g>
      <rect x="-7" y="-9" width="14" height="4" rx="1" fill="#7edcc2" opacity="0.9" />
      <rect x="-7" y="-3" width="14" height="4" rx="1" fill="rgba(191,232,216,0.55)" />
      <rect x="-7" y="3" width="14" height="4" rx="1" fill="rgba(191,232,216,0.35)" />
      <circle cx="5" cy="-7" r="1.5" fill="#050817" />
    </g>
  ),
  doc: (
    <g>
      <rect x="-6" y="-8" width="12" height="16" rx="1.5" fill="none" stroke="#7edcc2" strokeWidth="1.3" />
      <path d="M2 -8 L2 -3 L7 -3 Z" fill="#7edcc2" />
      <rect x="-3.5" y="-2" width="7" height="1.2" fill="rgba(191,232,216,0.6)" />
      <rect x="-3.5" y="1" width="7" height="1.2" fill="rgba(191,232,216,0.6)" />
      <rect x="-3.5" y="4" width="4.5" height="1.2" fill="rgba(191,232,216,0.6)" />
    </g>
  ),
  check: (
    <path d="M-5 0 L-1.5 3.5 L6 -4" fill="none" stroke="#7edcc2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  bolt: <path d="M1 -9 L-5 1 L0 1 L-1 9 L5 -1 L0 -1 Z" fill="#7edcc2" />,
  landmark: (
    <g>
      <path d="M-8 2 L8 2" stroke="#f5a623" strokeWidth="2" strokeLinecap="round" />
      <rect x="-5" y="-5" width="3" height="7" fill="rgba(245,166,35,0.75)" />
      <rect x="1" y="-5" width="3" height="7" fill="rgba(245,166,35,0.75)" />
      <path d="M-7 6 L7 6 L6 9 L-6 9 Z" fill="#f5a623" opacity="0.85" />
    </g>
  ),
  scale: (
    <g>
      <path d="M0 -8 L-7 3 L7 3 Z" fill="none" stroke="#f5a623" strokeWidth="1.6" />
      <path d="M-9 3 L9 3" stroke="#f5a623" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M-7 3 L-9.5 6.5 M7 3 L9.5 6.5" stroke="#f5a623" strokeWidth="1.3" strokeLinecap="round" />
    </g>
  ),
  checkBig: (
    <g>
      <circle r="11" fill="none" stroke="#7edcc2" strokeWidth="1.4" opacity="0.55" />
      <path d="M-4.5 0.5 L-1 4 L5 -3.5" fill="none" stroke="#7edcc2" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
};

const NODES: Node[] = [
  { x: 120, y: 105, label: "SAP", sub: "Source system", fill: "linear-gradient(160deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))", stroke: "rgba(72,101,127,0.9)", glyph: GLYPH.server, labelFill: "rgba(191,232,216,0.85)" },
  { x: 330, y: 105, label: "Invoice Generated", sub: "FI / AR document", fill: "linear-gradient(160deg,rgba(41,171,135,0.22),rgba(17,122,75,0.32))", stroke: "rgba(126,220,194,0.7)", glyph: GLYPH.doc, labelFill: "rgba(191,232,216,0.9)" },
  { x: 540, y: 105, label: "Validation", sub: "Checks & tax rules", fill: "linear-gradient(160deg,rgba(41,171,135,0.22),rgba(17,122,75,0.32))", stroke: "rgba(126,220,194,0.7)", glyph: GLYPH.check, labelFill: "rgba(191,232,216,0.9)" },
  { x: 540, y: 290, label: "E-Invoice Processing", sub: "PEPPOL / XML format", fill: "linear-gradient(160deg,rgba(41,171,135,0.22),rgba(17,122,75,0.32))", stroke: "rgba(126,220,194,0.7)", glyph: GLYPH.bolt, labelFill: "rgba(191,232,216,0.9)" },
  { x: 330, y: 290, label: "Government / External", sub: "Clearance portal", fill: "linear-gradient(160deg,#f5a623,#f29e16)", stroke: "rgba(245,166,35,0.95)", glyph: GLYPH.landmark, labelFill: "#fff" },
  { x: 120, y: 290, label: "Approval / Rejection", sub: "Vendor decision", fill: "linear-gradient(135deg,#29ab87,#117a4b 55%,#f5a623 130%)", stroke: "rgba(245,166,35,0.8)", glyph: GLYPH.scale, labelFill: "rgba(191,232,216,0.9)" },
  { x: 330, y: 460, label: "Approved · Returned to SAP", sub: "Real-time status sync", fill: "linear-gradient(160deg,#29ab87,#117a4b)", stroke: "rgba(126,220,194,0.95)", glyph: GLYPH.checkBig, labelFill: "#fff" },
];

const CHEVRONS: Array<{ d: string }> = [
  { d: "M316 99 L328 105 L316 111" },
  { d: "M534 184 L540 197 L546 184" },
  { d: "M344 284 L332 290 L344 296" },
  { d: "M114 362 L120 375 L126 362" },
  { d: "M168 454 L180 460 L168 466" },
];

const DOC_BARS = [
  { x: -11, w: 1.3, o: 0.85 },
  { x: -7.2, w: 2.1, o: 0.7 },
  { x: -3.4, w: 1.3, o: 0.85 },
  { x: 0.4, w: 2.1, o: 0.6 },
  { x: 4.2, w: 1.3, o: 0.8 },
  { x: 7.6, w: 1.8, o: 0.65 },
];

function FloatBadge({ x, y, rotate, color, title, sub, big = false }: { x: number; y: number; rotate: number; color: string; title: string; sub?: string; big?: boolean }) {
  const w = big ? 88 : 68;
  const h = big ? 30 : 24;
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`} className="tri-pulse">
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill="rgba(4,12,24,0.55)" stroke={color} strokeWidth={big ? 1.8 : 1.3} />
      <text y={big ? 2 : 3.5} textAnchor="middle" fontSize={big ? 10.5 : 9} fontWeight={800} fill={color} letterSpacing={big ? 2 : 1.4} style={{ fontFamily: "Poppins, sans-serif" }}>
        {title}
      </text>
      {sub ? (
        <text y={big ? 12.5 : 13} textAnchor="middle" fontSize={big ? 5.5 : 5} fontWeight={700} fill="#7edcc2" letterSpacing={1.2} style={{ fontFamily: "Poppins, sans-serif" }}>
          {sub}
        </text>
      ) : null}
    </g>
  );
}

export default function EInvoiceWorkflow() {
  return (
    <SceneCanvas bleed className="h-full w-full">
      <div className="absolute right-6 top-5 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-tri-2 tri-pulse" />
        <p className="text-[10px] font-semibold text-tri-2">LIVE · 7 / 7</p>
      </div>

      <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 640 540" preserveAspectRatio="xMidYMid meet" fill="none">
        <defs>
          <linearGradient id="scanGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(126,220,194,0)" />
            <stop offset="0.5" stopColor="rgba(126,220,194,0.95)" />
            <stop offset="1" stopColor="rgba(126,220,194,0)" />
          </linearGradient>
        </defs>

        <FlowLink d={SNAKE} color="rgba(41,171,135,0.4)" width={1.6} dash />

        <Packet d={SNAKE} dur={16} delay={0} color={TRI.mint} r={3.5} />
        <Packet d={SNAKE} dur={16} delay={5.3} color={TRI.amber} r={3} />
        <Packet d={SNAKE} dur={16} delay={10.6} color={TRI.mint} r={3} />

        {CHEVRONS.map((c, i) => (
          <path key={i} d={c.d} stroke="rgba(126,220,194,0.8)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="tri-pulse" />
        ))}

        {NODES.map((n, i) => (
          <NodeShape key={i} node={n} r={i === NODES.length - 1 ? 30 : 26} />
        ))}
        {NODES.map((n, i) => (
          <PulseDot key={i} cx={n.x} cy={n.y} color={i === 0 ? "#48657f" : i === NODES.length - 1 ? TRI.amber : TRI.green} r={3} dur={2.6} />
        ))}

        <g>
          <animateMotion dur="16s" begin="-4s" repeatCount="indefinite" path={SNAKE} />
          <rect x="-17" y="-23" width="34" height="46" rx="3.5" fill="rgba(4,12,24,0.88)" stroke="#7edcc2" strokeWidth="1.4" />
          <path d="M6 -23 L6 -8 L21 -8 Z" fill="rgba(126,220,194,0.16)" stroke="#7edcc2" strokeWidth="1.2" strokeLinejoin="round" />
          <rect x="-11" y="-14" width="16" height="1.6" rx="0.8" fill="rgba(191,232,216,0.85)" />
          <rect x="-11" y="-9.5" width="22" height="1.6" rx="0.8" fill="rgba(191,232,216,0.5)" />
          <rect x="-11" y="-5" width="13" height="1.6" rx="0.8" fill="rgba(191,232,216,0.5)" />
          <text x="-11" y="6" fontSize="7.5" fontWeight={700} fill="#7edcc2" textAnchor="start" style={{ fontFamily: "Poppins, sans-serif" }}>
            € 1,240.00
          </text>
          {DOC_BARS.map((b, i) => (
            <rect key={i} x={b.x} y="10" width={b.w} height="5" rx="0.5" fill="rgba(191,232,216,0.7)" opacity={b.o} />
          ))}
        </g>

        <rect x="505" y="262" width="70" height="3" rx="1.5" fill="url(#scanGrad)" opacity="0.9">
          <animate attributeName="y" values="262;318" dur="2.2s" repeatCount="indefinite" />
        </rect>

        <FloatBadge x={254} y={128} rotate={-6} color="#7edcc2" title="VALID" />
        <FloatBadge x={298} y={196} rotate={-3} color="#f5a623" title="SUBMITTED" />
        <FloatBadge x={452} y={452} rotate={6} color="#f5a623" title="APPROVED" sub="RETURNED TO SAP" big />
      </svg>
    </SceneCanvas>
  );
}
