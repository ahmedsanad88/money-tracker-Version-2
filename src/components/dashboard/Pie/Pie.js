import React from "react";
import "./Pie.css";

// create the percentage circle which show to the client the percentage of used cash.

// Func. to handle the percentage.
const cleanPercentage = (percentage) => {
  const tooLow = !Number.isFinite(+percentage) || percentage < 0;
  const tooHigh = percentage > 100;
  return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

// Create a circle using the SVG.
const Circle = ({ colour, pct }) => {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct) * circ) / 100;
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
      strokeWidth={"2rem"}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};

// Create a text using SVG.
const Text = ({ percentage }) => {
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={"1.5em"}
      fontWeight={"bold"}
      fill={"white"}
    >
      {percentage.toFixed(0)}%
    </text>
  );
};

// Create the pie component to reuse it in any place cross our app.
const Pie = ({ percentage, colour }) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg width={200} height={200}>
      {/* Create a gradient for the percentage circle */}
      <defs>
        <linearGradient id="linear" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e12279" />
          <stop offset="25%" stopColor="#7209b7" />
          <stop offset="50%" stopColor="#3d22b6" />
          <stop offset="75%" stopColor="#4361ee" />
          <stop offset="100%" stopColor="#5ccef1" />
        </linearGradient>
      </defs>
      <g transform={`rotate(-90 ${"100 100"})`}>
        <Circle colour="#272C3F" />
        <Circle colour="url(#linear)" pct={pct} />
      </g>
      <Text percentage={100 - pct} />
    </svg>
  );
};

export default Pie;
