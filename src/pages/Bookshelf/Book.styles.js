import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { NOISE } from "./Shelf.styles";

const garamond = `"EB Garamond", Garamond, "Times New Roman", serif`;
const ink = "#2a241f";
const muted = "#8a7f72";
const accent = "#7a2416";
const narrow = "@media (max-width: 760px)";

/* Every link in a book: black and underlined, the same before, during and after a click */
const link = css`
  color: ${ink};
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.18em;
  text-decoration-color: rgba(42, 36, 31, 0.45);
  transition: text-decoration-color 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  outline: none;

  &:visited,
  &:active {
    color: ${ink};
  }

  &:hover,
  &:focus-visible {
    text-decoration-color: ${ink};
  }
`;

/* Light, slightly blurred room behind the open book */
export const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  background: rgba(221, 215, 203, 0.94);
  backdrop-filter: blur(3px);
  /* No scrollbar gutter, so the book stays centered (scrolling still works) */
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${narrow} {
    align-items: flex-start;
  }
`;

/* Pinned to the screen's top-right corner so there's always a way back to the shelf */
export const CloseButton = styled(motion.button)`
  position: fixed;
  top: max(14px, env(safe-area-inset-top));
  right: 14px;
  z-index: 51;
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 8px 16px 8px 13px;
  border: 1px solid #d8cdb9;
  border-radius: 999px;
  background: #f6f1e6;
  box-shadow: 0 4px 14px -6px rgba(60, 45, 25, 0.45);
  cursor: pointer;
  font-family: ${garamond};
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #6e6155;
  transition: color 0.2s ease;

  &:hover {
    color: ${accent};
  }

  & span {
    font-size: 17px;
    line-height: 1;
    letter-spacing: 0;
  }

  /* Desktop: just the ×, small enough to sit in the margin beside the book */
  ${({ $compact }) =>
    $compact &&
    `
    width: 40px;
    height: 40px;
    padding: 0;
    justify-content: center;

    & span {
      font-size: 21px;
    }
  `}
`;

export const Scene = styled.div`
  position: relative;
  width: ${({ w }) => w}px;
  height: ${({ h }) => h}px;
  perspective: 3000px;

  /* Room above the first page for the Close button */
  ${narrow} {
    width: 94vw;
    height: auto;
    margin: calc(max(14px, env(safe-area-inset-top)) + 50px) 0 3vh;
  }
`;

/* The open two-page spread; every size inside is in em off `base` */
export const Spread = styled(motion.div)`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  font-family: ${garamond};
  font-size: ${({ base }) => base}px;
  color: ${ink};
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(90, 70, 40, 0.08), -3px 0 0 #ece5d7,
    -4px 1px 0 #d9cfbe, 3px 0 0 #ece5d7, 4px 1px 0 #d9cfbe,
    0 30px 60px -20px rgba(60, 45, 25, 0.35);

  ${narrow} {
    flex-direction: column;
    font-size: 16px;
  }
`;

const pageShade = (dir) => `
  radial-gradient(ellipse 30% 40% at ${dir === "right" ? "100%" : "0%"} 0%, rgba(255, 240, 233, 0.6), transparent 70%),
  linear-gradient(to ${dir}, #f3eee2 0%, #f7f2e8 55%, #f3ece0 86%, #e6dcca 97%, #d9cdb8 100%)
`;

export const Page = styled.section`
  position: relative;
  flex: 1;
  min-width: 0;
  box-sizing: border-box;
  padding: 8.2em 4.75em 6em;
  overflow: auto;
  background: ${({ side }) => pageShade(side === "left" ? "right" : "left")};
  border-radius: ${({ side }) => (side === "left" ? "3px 0 0 3px" : "0 3px 3px 0")};

  /* Media block must precede the ::after block, or it gets scoped to ::after */
  ${narrow} {
    padding: 4.6em 1.5em 4.4em;
    border-radius: 3px;
    background: #f6f1e6;

    & + & {
      border-top: 1px solid #e3dac9;
    }
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

/* Small letterspaced title at the top of each page */
export const RunningHead = styled.div`
  position: absolute;
  top: 4.8em;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 0.68em;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: ${muted};

  ${narrow} {
    top: 2.6em;
  }
`;

/* Page number */
export const Folio = styled.div`
  position: absolute;
  bottom: 2.6em;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 0.78em;
  color: ${muted};
`;

/* 75% of the text block is ~57% of the full page, as in the mockup */
export const Plate = styled.figure`
  width: 75%;
  margin: 1.2em auto 0;
  text-align: center;

  ${narrow} {
    width: 78%;
    margin-top: 0.5em;
  }
`;

export const PlateFrame = styled.div`
  padding: 0.7em;
  background: #fbf8f1;
  border: 1px solid #d8cdb9;
  box-shadow: 0 1px 2px rgba(60, 45, 25, 0.08);
`;

export const PlateImage = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
`;

export const Caption = styled.figcaption`
  margin-top: 1.9em;
  font-size: 1.1em;
  font-style: italic;
  color: #3b332b;
`;

export const Body = styled.div`
  line-height: 1.75;
`;

/* Opening paragraph, justified, with a drop cap */
export const Lead = styled.p`
  margin: 0 0 1em;
  text-align: justify;

  &::first-letter {
    float: left;
    font-size: 4.35em;
    line-height: 0.82;
    padding: 0.06em 0.08em 0 0;
    color: #6b5444;
  }
`;

/* Everything after the lead clears the drop cap, even when the lead is one line */
export const Indent = styled.p`
  clear: both;
  margin: 0 0 0.7em;
  padding-left: 1.8em;
`;

/* List numbered i. ii. iii. in italics */
export const Goals = styled.ol`
  list-style: none;
  counter-reset: goal;
  margin: 0 0 1.1em;
  padding-left: 1.8em;

  & li {
    counter-increment: goal;
    position: relative;
    padding-left: 2.1em;
    margin-bottom: 0.25em;
    line-height: 1.6;
  }

  & li::before {
    content: counter(goal, lower-roman) ".";
    position: absolute;
    left: 0;
    font-style: italic;
    color: ${muted};
  }
`;

/* Centered * * * section break */
export const Asterism = styled.div`
  clear: both;
  margin: 1.4em 0 2.2em;
  padding-left: 1.6em;
  text-align: center;
  font-size: 0.8em;
  letter-spacing: 1.6em;
  color: ${muted};
`;

export const SectionHead = styled.h3`
  clear: both;
  margin: 1.7em 0 0.45em;
  font-weight: 400;
  font-size: 0.74em;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #6e6155;
`;

export const Para = styled.p`
  margin: 0 0 0.9em;
`;

export const BookLink = styled.a`
  ${link}
`;

/* Crease down the middle of the spread */
export const Gutter = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 6%;
  transform: translateX(-50%);
  pointer-events: none;
  background: linear-gradient(
    to right,
    rgba(120, 95, 60, 0) 0%,
    rgba(120, 95, 60, 0.1) 46%,
    rgba(90, 70, 40, 0.22) 50%,
    rgba(120, 95, 60, 0.1) 54%,
    rgba(120, 95, 60, 0) 100%
  );

  ${narrow} {
    display: none;
  }
`;

/* ---------- Page turning ---------- */

/* The leaf that turns over at the spine; one face per side of the paper */
export const Leaf = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ side }) => (side === "right" ? "50%" : "0")};
  width: 50%;
  z-index: 4;
  transform-origin: ${({ side }) => (side === "right" ? "left" : "right")} center;
  transform-style: preserve-3d;

  ${narrow} {
    display: none;
  }
`;

export const LeafFace = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  backface-visibility: hidden;
  box-shadow: 0 0 24px -6px rgba(60, 45, 25, 0.35);
  ${({ back }) => back && "transform: rotateY(180deg);"}
`;

/* "Next" / "Back" links in the bottom corners, level with the page numbers */
export const PageTurn = styled.button`
  position: absolute;
  bottom: 2.8em;
  ${({ side }) => side}: 6.6em;
  z-index: 3;
  padding: 0.3em 0;
  border: none;
  background: none;
  cursor: pointer;
  font-family: ${garamond};
  font-size: 0.72em;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  ${link}

  ${narrow} {
    display: none;
  }
`;

/* ---------- Page content ---------- */

/* Title page for a chapter or a book: small line, large title, short rule */
export const Opener = styled.div`
  height: 100%;
  margin-top: -2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  ${narrow} {
    height: auto;
    margin-top: 0;
    padding: 3em 0;
  }
`;

export const OpenerKicker = styled.div`
  margin-bottom: 1.6em;
  font-size: 0.72em;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: ${muted};
`;

export const OpenerTitle = styled.h2`
  margin: 0;
  font-size: 2.6em;
  font-weight: 400;
  font-style: italic;
  line-height: 1.1;
  color: ${ink};
`;

export const OpenerRule = styled.div`
  width: 2.4em;
  height: 1px;
  margin-top: 1.8em;
  background: ${muted};
  opacity: 0.6;
`;

/* Tighter type for pages with long lists, so a full year of goals fits one page */
export const Compact = styled.div`
  font-size: 0.92em;
  line-height: 1.45;

  & h3 {
    margin-top: 1.15em;
  }

  & h3:first-child {
    margin-top: 0;
  }

  & li {
    line-height: 1.4;
    margin-bottom: 0.15em;
  }
`;

/* Small link in a page's bottom-left corner, level with the page number */
export const PageNote = styled.a`
  position: absolute;
  bottom: 2.8em;
  left: 6.6em;
  z-index: 2;
  font-size: 0.72em;
  letter-spacing: 0.08em;
  ${link}

  ${narrow} {
    position: static;
    display: inline-block;
    margin-top: 2em;
  }
`;

/* Check mark after a goal that's been reached */
export const Done = styled.span`
  margin-left: 0.45em;
  font-size: 0.9em;
  color: #4f7a52;
`;

/* Placeholder where a list has nothing in it yet */
export const Empty = styled.p`
  margin: 4em 0 0;
  text-align: center;
  font-style: italic;
  color: ${muted};
`;

/* Inline placeholder under a heading */
export const Pending = styled.p`
  margin: 0 0 0.9em;
  font-style: italic;
  color: ${muted};
`;

export const Quote = styled.blockquote`
  margin: 0 0 1.6em;
  padding: 0;
  font-size: 1.08em;
  font-style: italic;
  line-height: 1.6;
`;

export const QuoteSource = styled.cite`
  display: block;
  margin-top: 0.4em;
  font-size: 0.72em;
  font-style: normal;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${muted};
`;

export const Leader = styled.span`
  flex: 1;
  border-bottom: 1px dotted ${muted};
  transform: translateY(-0.3em);
`;

/* ---------- Flowing text across pages ---------- */

// Space between the hidden columns; any value works since one column shows at a time.
export const FLOW_GAP = 10;

/* A page-sized window onto one column of a flowing piece */
export const FlowWindow = styled.div`
  height: 100%;
  overflow: hidden;
`;

/* The piece laid out as page-sized columns; each extra column is the next page */
export const Flow = styled.div`
  height: 100%;
  column-count: 1;
  column-gap: ${FLOW_GAP}em;
  column-fill: auto;
  line-height: 1.7;

  /* Keep headings with the text below them; long list items may run onto the next page */
  & h3,
  & h4 {
    break-after: avoid;
  }
`;

/* Off-screen copy of a page, used only to count how many pages a piece needs */
export const MeasurePage = styled(Page)`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  visibility: hidden;
  pointer-events: none;
`;

/* ---------- Writing ---------- */

export const Prose = styled.p`
  margin: 0 0 0.85em;
  text-align: justify;
`;

export const SubHead = styled.h4`
  margin: 1.4em 0 0.35em;
  font-size: 1.08em;
  font-style: italic;
  font-weight: 400;
  color: #3b332b;
`;

/* Bulleted list; nested lists step in */
export const Bullets = styled.ul`
  margin: 0 0 0.85em;
  padding-left: 1.3em;
  list-style: none;

  & & {
    margin: 0.2em 0 0.3em;
  }

  & > li {
    position: relative;
    margin-bottom: 0.3em;
  }

  & > li::before {
    content: "–";
    position: absolute;
    left: -1.1em;
    color: ${muted};
  }
`;

/* One line of verse */
export const Verse = styled.p`
  margin: 0 0 0.25em;
  text-align: left;
`;

/* "Originally published on Substack" after a piece */
export const SourceNote = styled.p`
  margin: 2em 0 0;
  font-size: 0.82em;
  font-style: italic;
  color: ${muted};
`;

export const OpenerDate = styled.div`
  margin-top: 1.6em;
  font-size: 0.95em;
  color: #4a4038;
`;

export const OpenerSub = styled.div`
  max-width: 22em;
  margin-top: 0.5em;
  font-style: italic;
  color: ${muted};
`;

/* Contents page: grouped entries that jump to a piece */
export const ContentsGroup = styled.h3`
  margin: 1.6em 0 0.6em;
  font-size: 0.74em;
  font-weight: 400;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #6e6155;

  &:first-child {
    margin-top: 0;
  }
`;

/* The underlined title in a Contents entry (its date sits below, not underlined) */
export const ContentsTitle = styled.span`
  ${link}
`;

export const ContentsEntry = styled.button`
  display: flex;
  align-items: baseline;
  gap: 0.6em;
  width: 100%;
  margin: 0 0 0.75em;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font: inherit;
  text-align: left;
  ${link}
  text-decoration: none;

  &:hover ${ContentsTitle}, &:focus-visible ${ContentsTitle} {
    text-decoration-color: ${ink};
  }
`;

export const ContentsMeta = styled.span`
  display: block;
  font-size: 0.8em;
  font-style: italic;
  color: ${muted};
`;

/* ---------- Scrapbook (photo album) ---------- */

export const Scrapbook = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8em;
  padding-top: 0.6em;
`;

/* Season name, written by hand */
export const SeasonTitle = styled.div`
  margin: -0.3em 0 0.1em 0.2em;
  font-family: "Caveat", cursive;
  font-size: 2.9em;
  font-weight: 500;
  line-height: 1;
  color: #3b332b;
  transform: rotate(-2deg);
  transform-origin: left center;
`;

export const PrintRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.6em;
`;

/* A photo print with a white border, set slightly askew */
export const Print = styled.figure`
  position: relative;
  flex: 0 0 auto;
  width: ${({ width }) => width}%;
  margin: 0;
  padding: 0.45em;
  box-sizing: border-box;
  background: #fbf8f1;
  box-shadow: 0 1px 2px rgba(60, 45, 25, 0.18),
    0 8px 16px -10px rgba(60, 45, 25, 0.45);
  transform: rotate(${({ tilt }) => tilt}deg);
`;

export const PrintImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

/* Strip of washi tape holding a print to the page */
export const Tape = styled.span`
  position: absolute;
  top: -0.7em;
  left: 50%;
  width: 38%;
  height: 1.3em;
  transform: translateX(-50%) rotate(${({ tilt }) => tilt}deg);
  background: repeating-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.18) 0 0.3em,
      rgba(255, 255, 255, 0) 0.3em 0.6em
    ),
    ${({ color }) => color};
  box-shadow: 0 1px 2px rgba(60, 45, 25, 0.15);
  clip-path: polygon(
    2% 0, 98% 0, 100% 20%, 97% 40%, 100% 60%, 97% 80%, 100% 100%,
    2% 100%, 0 80%, 3% 60%, 0 40%, 3% 20%
  );
`;

/* Paper photo corner; `at` is top-left, top-right, bottom-left or bottom-right */
export const PhotoCorner = styled.span`
  position: absolute;
  width: 1.5em;
  height: 1.5em;
  ${({ at }) => (at.startsWith("top") ? "top: -0.25em;" : "bottom: -0.25em;")}
  ${({ at }) => (at.endsWith("left") ? "left: -0.25em;" : "right: -0.25em;")}
  background: linear-gradient(
    ${({ at }) =>
      ({ "top-left": 135, "top-right": 225, "bottom-left": 45, "bottom-right": 315 })[at]}deg,
    #4a3c31 50%,
    transparent 50%
  );
  opacity: 0.88;
`;
