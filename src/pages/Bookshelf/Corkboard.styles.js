import styled from "styled-components";
import { motion } from "framer-motion";
import { NOISE } from "./Shelf.styles";
import { notePaper } from "./Book.styles";

const garamond = `"EB Garamond", Garamond, "Times New Roman", serif`;
const hand = `"Caveat", cursive`;
const ink = "#2a241f";
const narrow = "@media (max-width: 760px)";

/* Cork, with fine light and dark specks under a paper grain */
const cork = `
  background: radial-gradient(circle at 30% 40%, rgba(110, 70, 35, 0.22) 0 0.8px, transparent 1.4px) 0 0 / 7px 7px,
    radial-gradient(circle at 70% 70%, rgba(255, 238, 210, 0.2) 0 0.8px, transparent 1.4px) 3px 2px / 9px 9px,
    radial-gradient(circle at 50% 50%, rgba(95, 60, 30, 0.16) 0 1.2px, transparent 2px) 5px 6px / 13px 13px,
    linear-gradient(155deg, #d1aa80, #c19670 55%, #b98d66);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    background-image: ${NOISE};
    opacity: 0.3;
    mix-blend-mode: multiply;
    pointer-events: none;
  }
`;

/* Hangs on the wall in a thin wooden frame */
export const Board = styled.section`
  position: absolute;
  z-index: 3;
  box-sizing: border-box;
  padding: ${({ frame }) => frame}px;
  border-radius: 3px;
  cursor: pointer;
  background: linear-gradient(to bottom, #93653f, #6f4628);
  box-shadow: inset 0 1px 0 rgba(255, 228, 196, 0.35), inset 0 -1px 0 rgba(0, 0, 0, 0.3),
    0 2px 3px rgba(45, 30, 15, 0.16), 0 20px 32px -18px rgba(45, 30, 15, 0.55);
`;

export const Cork = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: ${({ pad }) => pad}px;
  gap: ${({ gap }) => gap}px;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px rgba(60, 35, 15, 0.25), inset 0 3px 8px rgba(60, 35, 15, 0.35);
  ${cork}

  & > * {
    position: relative;
    z-index: 1;
  }
`;

export const BoardHead = styled.div`
  display: flex;
  flex: none;
  align-items: stretch;
  justify-content: space-between;
  gap: 10px;
  height: ${({ h }) => h}px;
`;

/* A pinned index card: the board's title, or a button */
export const Card = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  flex: none;
  padding: 0 1em;
  border: none;
  border-radius: 1px;
  background: linear-gradient(to bottom, #fcf9f2, #f2ebdc);
  box-shadow: 0 1px 1px rgba(60, 40, 20, 0.22), 0 5px 9px -5px rgba(60, 40, 20, 0.45);
  transform: rotate(${({ tilt }) => tilt}deg);
  cursor: pointer;
  font-family: ${garamond};
  font-size: ${({ fs }) => fs}px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  white-space: nowrap;
  color: #5f5348;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: rotate(${({ tilt }) => tilt}deg) translateY(-1px);
    box-shadow: 0 2px 2px rgba(60, 40, 20, 0.2), 0 9px 14px -6px rgba(60, 40, 20, 0.45);
  }

  &:focus-visible {
    outline: 1px solid rgba(42, 36, 31, 0.5);
    outline-offset: 2px;
  }
`;

/* "Leave a note", written by hand */
export const HandCard = styled(Card)`
  font-family: ${hand};
  font-size: ${({ fs }) => fs}px;
  letter-spacing: 0;
  text-transform: none;
  color: ${ink};
`;

export const Pin = styled.span`
  position: absolute;
  top: ${({ size }) => -Math.round(size * 0.35)}px;
  left: 50%;
  z-index: 2;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  margin-left: ${({ size }) => -size / 2}px;
  border-radius: 50%;
  background: radial-gradient(circle at 34% 30%, rgba(255, 255, 255, 0.75) 0 14%, rgba(255, 255, 255, 0) 30%),
    radial-gradient(circle at 50% 55%, ${({ color }) => color} 0 55%, rgba(0, 0, 0, 0.35) 100%),
    ${({ color }) => color};
  box-shadow: 1px 2px 2px rgba(40, 20, 5, 0.45);
  pointer-events: none;
`;

/* The notes, pinned in rows */
export const Pinned = styled.div`
  display: grid;
  flex: 1;
  min-height: 0;
  grid-template-columns: repeat(${({ perRow }) => perRow}, ${({ side }) => side}px);
  grid-auto-rows: ${({ side }) => side}px;
  justify-content: space-evenly;
  align-content: center;
  row-gap: ${({ gap }) => gap}px;
`;

/* A note on the board, small; tapping it opens it in full */
export const MiniNote = styled(motion.button)`
  position: relative;
  box-sizing: border-box;
  margin: 0;
  padding: ${({ side }) => Math.round(side * 0.12)}px ${({ side }) => Math.round(side * 0.1)}px;
  border: none;
  border-radius: 0;
  text-align: left;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  ${({ color, $dark }) => notePaper(color, $dark)}

  &:focus-visible {
    outline: 1px solid rgba(42, 36, 31, 0.6);
    outline-offset: 2px;
  }
`;

export const MiniText = styled.span`
  display: block;
  height: 100%;
  overflow: hidden;
  font-family: ${hand};
  font-size: ${({ size }) => size}px;
  line-height: 1.12;
  white-space: pre-line;
  overflow-wrap: anywhere;
  color: var(--note-ink);
  -webkit-mask-image: linear-gradient(to bottom, #000 70%, transparent);
  mask-image: linear-gradient(to bottom, #000 70%, transparent);
`;

/* "+12 more": a short stack of cards */
export const MoreCard = styled.button`
  position: relative;
  border: none;
  border-radius: 1px;
  background: linear-gradient(to bottom, #fcf9f2, #f2ebdc);
  box-shadow: 3px 3px 0 -1px #efe7d6, 3px 3px 0 0 rgba(60, 40, 20, 0.18), 0 6px 10px -6px rgba(60, 40, 20, 0.5);
  transform: rotate(1.5deg);
  cursor: pointer;
  font-family: ${hand};
  font-size: ${({ fs }) => fs}px;
  line-height: 1.1;
  color: ${ink};
  -webkit-tap-highlight-color: transparent;
`;

/* Shown on an empty board */
export const BoardNote = styled.p`
  align-self: center;
  margin: auto;
  padding: 0.5em 1em;
  background: linear-gradient(to bottom, #fcf9f2, #f2ebdc);
  box-shadow: 0 1px 1px rgba(60, 40, 20, 0.22), 0 5px 9px -5px rgba(60, 40, 20, 0.45);
  transform: rotate(-1deg);
  font-family: ${hand};
  font-size: ${({ fs }) => fs}px;
  color: ${ink};
`;

/* ---------- Opened from the board ---------- */

/* A sheet of paper holding the note form */
export const WriteSheet = styled(motion.div)`
  position: relative;
  width: min(470px, 100%);
  box-sizing: border-box;
  margin: auto;
  padding: 46px 40px 26px;
  border-radius: 3px;
  background: #f6f1e6;
  box-shadow: 0 0 0 1px rgba(90, 70, 40, 0.08), 0 30px 60px -20px rgba(60, 45, 25, 0.35);
  font-family: ${garamond};
  font-size: 17px;
  color: ${ink};

  /* Media block must precede the ::after block, or it gets scoped to ::after */
  ${narrow} {
    width: 94vw;
    margin: calc(max(14px, env(safe-area-inset-top)) + 54px) auto 4vh;
    padding: 34px 22px 18px;
    font-size: 16px;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: ${NOISE};
    opacity: 0.05;
    mix-blend-mode: multiply;
    pointer-events: none;
  }
`;

/* Every note, on a big board */
export const BigBoard = styled(motion.div)`
  position: relative;
  width: min(1100px, 94vw);
  box-sizing: border-box;
  margin: auto;
  padding: 10px;
  border-radius: 4px;
  background: linear-gradient(to bottom, #93653f, #6f4628);
  box-shadow: inset 0 1px 0 rgba(255, 228, 196, 0.35), 0 30px 60px -20px rgba(45, 30, 15, 0.55);

  ${narrow} {
    margin: calc(max(14px, env(safe-area-inset-top)) + 54px) auto 4vh;
    padding: 7px;
  }
`;

/* Tall even with few notes, like a real board */
export const BigCork = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: min(74vh, 720px);
  box-sizing: border-box;
  padding: 26px 28px 34px;
  box-shadow: inset 0 0 0 1px rgba(60, 35, 15, 0.25), inset 0 3px 8px rgba(60, 35, 15, 0.35);

  /* Before the cork's ::after block, which would otherwise swallow it */
  ${narrow} {
    min-height: 72vh;
    padding: 18px 14px 24px;
  }

  ${cork}

  & > * {
    position: relative;
    z-index: 1;
  }
`;

export const BigHead = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 12px;
  height: 38px;
  margin-bottom: 30px;

  ${narrow} {
    height: 32px;
    margin-bottom: 22px;
  }
`;

export const AllNotes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  grid-auto-rows: 160px;
  gap: 30px 24px;
  font-size: 14px;

  ${narrow} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: auto;
    gap: 18px 14px;
    font-size: 13px;
  }
`;

/* A note on the big board; the whole note opens it in full */
export const NoteSlot = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;

  & > figure {
    flex: 1;
  }

  &:focus-visible > figure {
    outline: 1px solid rgba(42, 36, 31, 0.6);
    outline-offset: 2px;
  }
`;
