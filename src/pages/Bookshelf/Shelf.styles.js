import styled from "styled-components";
import { motion } from "framer-motion";

const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`;
const NOISE = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`;

/* Subtle cloth grain over a book face */
const cloth = `
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

const serif = `"Bodoni 72", Didot, "Playfair Display", Georgia, serif`;

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

export const Row = styled(motion.div)`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  gap: ${({ gap }) => gap}px;
  padding-bottom: 5vh;
  will-change: transform;
`;

/* One book's footprint on the shelf — its width animates spine <-> cover */
export const Slot = styled(motion.div)`
  position: relative;
  flex: 0 0 auto;
  height: ${({ h }) => h}px;
  cursor: pointer;
`;

/* Carries the resting lean and the perspective for the 3D turn */
export const Lean = styled.div`
  position: absolute;
  inset: 0;
  perspective: 2200px;
  transform: rotate(${({ lean }) => lean}deg);
  transform-origin: bottom center;
  transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
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
  background: ${({ color }) => color};
  border-radius: 2px 4px 4px 2px;
  padding: ${({ pad }) => pad}px ${({ pad }) => Math.round(pad * 0.7)}px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  overflow: hidden;
  box-shadow: inset 10px 0 8px -7px rgba(0, 0, 0, 0.3),
    inset 12px 0 0 -11px rgba(255, 255, 255, 0.12),
    0 24px 40px -18px rgba(0, 0, 0, 0.45);
  ${cloth}
`;

export const SpineFace = styled.div`
  position: absolute;
  top: 0;
  left: ${({ t }) => -t}px;
  width: ${({ t }) => t}px;
  height: 100%;
  transform-origin: right center;
  transform: rotateY(-90deg);
  backface-visibility: hidden;
  background: ${({ color }) => color};
  color: ${({ ink }) => ink};
  border-radius: 2px;
  padding: 18px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  box-shadow: inset -5px 0 8px -5px rgba(0, 0, 0, 0.35),
    inset 2px 0 0 rgba(255, 255, 255, 0.08),
    0 14px 24px -12px rgba(0, 0, 0, 0.3);
  ${cloth}
`;

export const SpineTitle = styled.span`
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: ${({ size }) => size}px;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 68%;
`;

export const SpineAuthor = styled.span`
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: ${({ size }) => size}px;
  font-weight: 500;
  opacity: 0.8;
  white-space: nowrap;
`;

export const CoverTitleSerif = styled.span`
  position: relative;
  z-index: 1;
  font-family: ${serif};
  font-size: ${({ size }) => size}px;
  text-transform: uppercase;
  line-height: 1.04;
  color: ${({ emboss }) => emboss};
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.08);
`;

export const CoverAuthorSerif = styled.span`
  position: relative;
  z-index: 1;
  font-family: ${serif};
  font-size: ${({ size }) => size}px;
  line-height: 1.1;
  color: ${({ emboss }) => emboss};
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.08);
`;

/* ---------- Open book overlay ---------- */

export const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(24, 21, 17, 0.55);
  backdrop-filter: blur(2px);
`;

export const Scene = styled.div`
  position: relative;
  perspective: 2600px;
  width: min(820px, 94vw);
  height: clamp(380px, 74vh, 560px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* The open two-page spread */
export const Spread = styled(motion.div)`
  position: relative;
  display: flex;
  height: 100%;
  border-radius: 3px 6px 6px 3px;
  box-shadow: 0 40px 80px -24px rgba(0, 0, 0, 0.6);
`;

const page = `
  width: clamp(230px, 42vw, 360px);
  height: 100%;
  background: #faf6ec;
  overflow: auto;
  box-sizing: border-box;
`;

export const PageLeft = styled.div`
  ${page}
  border-radius: 3px 0 0 3px;
  display: flex;
  flex-direction: column;
`;

export const PageRight = styled.div`
  ${page}
  border-radius: 0 6px 6px 0;
  padding: 40px 38px;
`;

/* Center gutter shadow */
export const Gutter = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 44px;
  transform: translateX(-50%);
  pointer-events: none;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.16) 48%,
    rgba(0, 0, 0, 0.16) 52%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 3;
`;

/* The front cover that swings open, then fades */
export const Cover = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(50% - clamp(230px, 42vw, 360px) / 2);
  width: clamp(230px, 42vw, 360px);
  transform-origin: left center;
  transform-style: preserve-3d;
  z-index: 6;
  pointer-events: none;
  background: ${({ color }) => color};
  border-radius: 3px 6px 6px 3px;
  box-shadow: inset 12px 0 8px -6px rgba(0, 0, 0, 0.28),
    inset 0 0 0 1px rgba(255, 255, 255, 0.07),
    0 40px 80px -24px rgba(0, 0, 0, 0.6);
  padding: 46px 30px 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  backface-visibility: hidden;
  ${cloth}
`;

/* Page content */
export const AboutPhoto = styled.div`
  flex: 1;
  min-height: 55%;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  margin: 26px 26px 10px;
  border-radius: 2px;
  box-shadow: 0 10px 24px -12px rgba(0, 0, 0, 0.5);
`;

export const PhotoCaption = styled.div`
  padding: 0 26px 30px;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8a7f6c;
`;

export const PageHeading = styled.h2`
  font-size: 15px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #a9490f;
  margin: 22px 0 8px;

  &:first-child {
    margin-top: 0;
  }
`;

export const PageText = styled.p`
  font-size: 13.5px;
  line-height: 1.6;
  color: #3a332a;
  margin: 0 0 10px;
`;

export const PageList = styled.ol`
  margin: 0 0 10px;
  padding-left: 18px;
`;

export const PageListItem = styled.li`
  font-size: 13.5px;
  line-height: 1.55;
  color: #3a332a;
  margin-bottom: 4px;
`;

export const PageLink = styled.a`
  color: #a9490f;
  text-decoration: none;
  border-bottom: 1px solid currentColor;
`;

export const PageTitleBig = styled.div`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.12;
  color: #2c2620;
  margin-bottom: 10px;
`;

export const PageByline = styled.div`
  font-size: 14px;
  color: #8a7f6c;
  margin-bottom: 26px;
`;

export const PageRule = styled.div`
  width: 44px;
  height: 2px;
  background: #cdbfa6;
  margin-bottom: 26px;
`;
