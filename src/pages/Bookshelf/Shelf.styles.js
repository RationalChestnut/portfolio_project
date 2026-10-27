import styled from "styled-components";
import { motion } from "framer-motion";

const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`;
export const NOISE = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`;

/* Subtle cloth grain over a book face */
export const cloth = `
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: ${NOISE};
    opacity: 0.16;
    mix-blend-mode: multiply;
    pointer-events: none;
    border-radius: inherit;
  }
`;

// Long horizontal streaks for wood grain.
const WOOD_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='700' height='140'><filter id='w'><feTurbulence type='fractalNoise' baseFrequency='0.004 0.17' numOctaves='4' seed='7'/><feColorMatrix values='0 0 0 0 0.16 0 0 0 0 0.09 0 0 0 0 0.03 2.1 0 0 0 -0.8'/></filter><rect width='100%' height='100%' filter='url(#w)'/></svg>`;
const WOOD = `url("data:image/svg+xml,${encodeURIComponent(WOOD_SVG)}")`;

const garamond = `"EB Garamond", Garamond, "Times New Roman", serif`;
const sans = `"Inter", sans-serif`;

export const Stage = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 480px;
  overflow: hidden;
  user-select: none;
  background: ${({ bg }) => bg};
  transition: background-color 0.8s ease;
`;

/* Back wall: soft light from above plus a fine plaster grain */
export const Wall = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
      ellipse 70% 60% at 50% 0%,
      rgba(255, 248, 235, 0.4),
      transparent 70%
    ),
    linear-gradient(to bottom, transparent 55%, rgba(60, 40, 20, 0.07));

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: ${NOISE};
    opacity: 0.07;
    mix-blend-mode: multiply;
  }
`;

/* The shelf board, edge to edge */
export const Plank = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: ${({ bottom }) => bottom}px;
  z-index: 1;
  pointer-events: none;
`;

export const PlankTop = styled.div`
  height: ${({ h }) => h}px;
  background-image: linear-gradient(
      to bottom,
      rgba(25, 15, 8, 0.5) 0%,
      rgba(25, 15, 8, 0) 45%
    ),
    ${WOOD}, linear-gradient(to bottom, #6b4529 0%, #8f6240 40%, #a97c53 100%);
  background-size: 100% 100%, 700px 100%, 100% 100%;
  box-shadow: inset 0 -1px 0 rgba(255, 228, 196, 0.4);
`;

export const PlankFront = styled.div`
  height: ${({ h }) => h}px;
  background-image: ${WOOD},
    linear-gradient(to bottom, #8f6240 0%, #774d2c 50%, #5a3a21 100%);
  background-size: 820px 100%, 100% 100%;
  box-shadow: inset 0 2px 1px -1px rgba(255, 230, 200, 0.35),
    inset 0 -3px 4px rgba(0, 0, 0, 0.35);
`;

/* Area below the shelf, in the plank's shadow */
export const Lower = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${({ h }) => h}px;
  z-index: 1;
  background: linear-gradient(to bottom, #d3ccbf, #cdc5b7);
  box-shadow: inset 0 14px 18px -10px rgba(45, 30, 15, 0.45);
`;

export const Row = styled(motion.div)`
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  gap: ${({ gap }) => gap}px;
  padding-bottom: ${({ pb }) => pb}px;
  will-change: transform;
`;

/* Paper index divider standing on the shelf, with a labelled tab */
export const Divider = styled.div`
  position: relative;
  flex: 0 0 auto;
  width: ${({ w }) => w}px;
  height: ${({ h }) => h}px;
  margin-left: ${({ ml }) => ml}px;
  z-index: 5;
  pointer-events: none;
`;

export const DividerCard = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 3px 3px 0 0;
  background: linear-gradient(to right, #f2ece0, #e5ddcc);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.06),
    4px 0 10px -5px rgba(60, 45, 25, 0.35);
`;

export const Tab = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${({ h }) => h}px;
  display: flex;
  align-items: center;
  padding: 0 1.2em 0 0.8em;
  white-space: nowrap;
  border-radius: 3px 7px 3px 3px;
  background: linear-gradient(to bottom, #f5f0e6, #e9e2d3);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7),
    0 3px 8px -3px rgba(60, 45, 25, 0.35);
  font-family: ${garamond};
  font-size: ${({ fs }) => fs}px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #6e6155;
`;

export const TabNumber = styled.span`
  margin-right: 0.8em;
  padding-right: 0.8em;
  border-right: 1px solid rgba(110, 97, 85, 0.35);
  font-size: 1.25em;
  letter-spacing: 0;
  color: #8a7f72;
`;

/* One book's footprint on the shelf — its width animates spine <-> cover */
export const Slot = styled(motion.div)`
  position: relative;
  flex: 0 0 auto;
  height: ${({ h }) => h}px;
  cursor: pointer;
`;

/* Perspective for the book's 3D turn */
export const Depth = styled.div`
  position: absolute;
  inset: 0;
  perspective: 2200px;
`;

/* The book itself: a box with a front cover and a spine on its left side */
export const Box = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: ${({ cw }) => cw}px;
  height: 100%;
  margin-left: ${({ cw }) => -cw / 2}px;
  transform-style: preserve-3d;
`;

export const Front = styled.div`
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  background-color: ${({ color }) => color};
  ${({ img }) =>
    img &&
    `background-image: url(${img}); background-size: cover; background-position: center;`}
  border-radius: 2px 4px 4px 2px;
  padding: ${({ pad }) => pad}px ${({ pad }) => Math.round(pad * 0.7)}px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 22px 34px -14px rgba(0, 0, 0, 0.5),
    10px 4px 18px -10px rgba(0, 0, 0, 0.35);

  /* Hinge groove by the spine, and light falling across the board */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.38) 0%,
      rgba(0, 0, 0, 0.06) 2.5%,
      rgba(255, 255, 255, 0.14) 4%,
      rgba(0, 0, 0, 0.2) 5.6%,
      rgba(0, 0, 0, 0) 8.5%,
      rgba(255, 255, 255, 0.07) 45%,
      rgba(0, 0, 0, 0) 70%,
      rgba(0, 0, 0, 0.14) 100%
    );
  }

  ${({ img }) => (img ? "" : cloth)}
`;

const spineFonts = {
  caps: `font-family: ${sans}; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;`,
  plain: `font-family: ${sans}; font-weight: 600; letter-spacing: 0.01em;`,
  serif: `font-family: ${garamond}; font-style: italic; font-weight: 500; letter-spacing: 0.01em;`,
  serifCaps: `font-family: ${garamond}; font-weight: 500; text-transform: uppercase; letter-spacing: 0.2em;`,
};

/* Rounded spine: dark at both edges, a soft highlight a third of the way across */
export const SpineFace = styled.div`
  position: absolute;
  top: 0;
  left: ${({ t }) => -t}px;
  width: ${({ t }) => t}px;
  height: 100%;
  transform-origin: right center;
  transform: rotateY(-90deg);
  backface-visibility: hidden;
  background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.42) 0%,
      rgba(0, 0, 0, 0.1) 9%,
      rgba(255, 255, 255, 0.17) 26%,
      rgba(255, 255, 255, 0.05) 42%,
      rgba(0, 0, 0, 0) 58%,
      rgba(0, 0, 0, 0.14) 82%,
      rgba(0, 0, 0, 0.45) 100%
    ),
    ${({ color }) => color};
  color: ${({ ink }) => ink};
  border-radius: 4px 4px 1px 1px;
  padding: ${({ pad }) => pad}px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25),
    0 14px 24px -12px rgba(0, 0, 0, 0.35);
  ${cloth}
`;

/* A single fine gilt rule near the head or tail, clear of the lettering */
export const Band = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  ${({ at }) => at}: ${({ offset }) => offset}px;
  height: 0;
  border-top: 1px solid ${({ ink }) => ink};
  opacity: 0.5;
  pointer-events: none;
`;

export const SpineTitle = styled.span`
  position: relative;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: ${({ size }) => size}px;
  ${({ variant }) => spineFonts[variant] || spineFonts.caps}
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 64%;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.18);
`;

export const SpineAuthor = styled.span`
  position: relative;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: ${sans};
  font-size: ${({ size }) => size}px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  opacity: 0.78;
  white-space: nowrap;
`;

/* Lettering for books without a photographed cover (About Me) */
export const CoverTitle = styled.span`
  position: relative;
  z-index: 1;
  font-family: ${garamond};
  font-size: ${({ size }) => size}px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  line-height: 1.08;
  color: ${({ ink }) => ink};
  opacity: 0.88;
`;

export const CoverRule = styled.span`
  position: relative;
  z-index: 1;
  width: 14%;
  height: 1px;
  background: ${({ ink }) => ink};
  opacity: 0.45;
`;

export const CoverAuthor = styled.span`
  position: relative;
  z-index: 1;
  font-family: ${garamond};
  font-size: ${({ size }) => size}px;
  line-height: 1.1;
  color: ${({ ink }) => ink};
  opacity: 0.88;
`;
