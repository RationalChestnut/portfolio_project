import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, useSpring } from "framer-motion";
import { OpenBook } from "./Book";
import { PERSONAL } from "./PersonalBooks";
import {
  Band,
  Box,
  CoverAuthor,
  CoverRule,
  CoverTitle,
  Depth,
  DetailAuthor,
  DetailNote,
  Details,
  DetailTitle,
  Divider,
  DividerCard,
  Front,
  Kicker,
  Lower,
  Masthead,
  MastTitle,
  Rating,
  RatingValue,
  Plank,
  PlankFront,
  PlankTop,
  Row,
  Slot,
  SpineAuthor,
  SpineFace,
  SpineTitle,
  Stage,
  Tab,
  TabNumber,
  Wall,
} from "./Shelf.styles";

const dp = (id) => `https://www.amazon.com/dp/${id}`;
// Covers come from Open Library and are served from public/covers.
const cover = (slug) => `${process.env.PUBLIC_URL}/covers/${slug}.jpg`;

// Spine colors follow each book's real cover; `font` picks the spine lettering.
// Add `rating: 8` to a book to show "My rating 8/10" under the shelf on phones.
const READ = [
  { title: "Sapiens", author: "Yuval Noah Harari", color: "#f3f0e9", ink: "#b0262d", w: 50, h: 430, font: "serifCaps", cover: cover("sapiens"), ratio: 0.662, url: dp("0062316095"), note: "A brief history of humankind." },
  { title: "The Alchemist", author: "Paulo Coelho", color: "#e2742b", ink: "#fdebc9", w: 34, h: 350, font: "serif", bands: true, cover: cover("the-alchemist"), ratio: 0.661, url: dp("0062315005"), note: "A shepherd's journey toward his personal legend." },
  { title: "The Road", author: "Cormac McCarthy", color: "#151515", ink: "#e8e4dc", w: 36, h: 370, font: "serifCaps", cover: cover("the-road"), ratio: 0.649, url: dp("0307387895"), note: "A father and son walk through the ashes." },
  { title: "Grit", author: "Angela Duckworth", color: "#f2f0ec", ink: "#d9302a", w: 42, h: 400, font: "caps", cover: cover("grit"), ratio: 0.661, url: dp("1501111116"), note: "The power of passion and perseverance." },
  { title: "Why We Sleep", author: "Matthew Walker", color: "#142a4c", ink: "#f0ead8", w: 46, h: 425, font: "serif", bands: true, cover: cover("why-we-sleep"), ratio: 0.656, url: dp("1501144324"), note: "Unlocking the power of sleep and dreams." },
  { title: "The Almanack of Naval Ravikant", author: "Eric Jorgenson", color: "#f4f3f0", ink: "#2b2b2b", w: 40, h: 395, font: "plain", cover: cover("the-almanack-of-naval-ravikant"), ratio: 0.616, url: dp("1544514212"), note: "A guide to wealth and happiness." },
  { title: "Red Rising", author: "Pierce Brown", color: "#151515", ink: "#d0212f", w: 48, h: 415, font: "serifCaps", bands: true, cover: cover("red-rising"), ratio: 0.664, url: dp("034553980X"), note: "A caste-war epic on a terraformed Mars." },
  { title: "Outlive", author: "Peter Attia", color: "#f6f6f4", ink: "#2b2b2b", w: 38, h: 385, font: "caps", cover: cover("outlive"), ratio: 0.77, url: dp("0593236599"), note: "The science and art of longevity." },
  { title: "Ready Player One", author: "Ernest Cline", color: "#d0d3d5", ink: "#1d1d1d", w: 44, h: 405, font: "caps", cover: cover("ready-player-one"), ratio: 0.649, url: dp("0307887448"), note: "A treasure hunt inside a virtual world." },
  { title: "Elon Musk", author: "Walter Isaacson", color: "#1d1d1d", ink: "#f2f2f2", w: 46, h: 415, font: "caps", cover: cover("elon-musk"), ratio: 0.655, url: dp("1982181281"), note: "Inside the mind of the world's most polarizing founder." },
  { title: "The Hard Thing About Hard Things", author: "Ben Horowitz", color: "#121212", ink: "#f05a28", w: 40, h: 395, font: "caps", cover: cover("the-hard-thing-about-hard-things"), ratio: 0.661, url: dp("0062273205"), note: "Building a business when there are no easy answers." },
  { title: "Delivering Happiness", author: "Tony Hsieh", color: "#f2efe8", ink: "#1f5aa6", w: 38, h: 375, font: "plain", cover: cover("delivering-happiness"), ratio: 0.62, url: dp("0446576220"), note: "Zappos, culture, and profits." },
  { title: "The Everything Store", author: "Brad Stone", color: "#c8a57a", ink: "#2b2b2b", w: 42, h: 405, font: "plain", cover: cover("the-everything-store"), ratio: 0.645, url: dp("0316219282"), note: "Jeff Bezos and the age of Amazon." },
  { title: "The 4-Hour Workweek", author: "Timothy Ferriss", color: "#f2902a", ink: "#7a1410", w: 36, h: 365, font: "caps", cover: cover("the-4-hour-workweek"), ratio: 0.661, url: dp("0307465357"), note: "Escape 9–5 and join the new rich." },
  { title: "Die With Zero", author: "Bill Perkins", color: "#1d63c8", ink: "#ffe23a", w: 38, h: 380, font: "caps", cover: cover("die-with-zero"), ratio: 0.665, url: dp("0358567092"), note: "Getting all you can from your money and your life." },
  { title: "The Dark Forest", author: "Cixin Liu", color: "#161a24", ink: "#f2a43a", w: 44, h: 420, font: "caps", cover: cover("the-dark-forest"), ratio: 0.662, url: dp("0765386690"), note: "Book two of the Three-Body trilogy." },
  { title: "Death's End", author: "Cixin Liu", color: "#13202f", ink: "#7fd3e0", w: 44, h: 425, font: "caps", cover: cover("deaths-end"), ratio: 0.661, url: dp("0765386631"), note: "The trilogy's staggering finale." },
  { title: "The Way of Kings", author: "Brandon Sanderson", color: "#26507d", ink: "#f3d9a0", w: 54, h: 440, font: "serifCaps", bands: true, cover: cover("the-way-of-kings"), ratio: 0.664, url: dp("0765326353"), note: "Epic fantasy at its most ambitious." },
  { title: "Freakonomics", author: "Levitt & Dubner", color: "#f4f1ea", ink: "#e2731c", w: 42, h: 400, font: "caps", cover: cover("freakonomics"), ratio: 0.661, url: dp("0060731338"), note: "A rogue economist explores the hidden side of everything." },
  { title: "Endurance", author: "Alfred Lansing", color: "#2f3236", ink: "#e8e8e8", w: 40, h: 400, font: "serifCaps", bands: true, cover: cover("endurance"), ratio: 0.666, url: dp("0465062881"), note: "Shackleton's incredible Antarctic voyage." },
  { title: "Children of Time", author: "Adrian Tchaikovsky", color: "#1d2a33", ink: "#e9edf0", w: 42, h: 410, font: "serifCaps", cover: cover("children-of-time"), ratio: 0.671, url: dp("0316452505"), note: "Evolution, uplift, and a world of spiders." },
  { title: "Shoe Dog", author: "Phil Knight", color: "#141414", ink: "#f0b23c", w: 48, h: 420, font: "caps", cover: cover("shoe-dog"), ratio: 0.649, url: dp("1501135910"), note: "Nike's origin story — my favorite founder memoir." },
  { title: "Zero to One", author: "Peter Thiel", color: "#8eaacb", ink: "#1d2430", w: 36, h: 360, font: "serifCaps", cover: cover("zero-to-one"), ratio: 0.666, url: dp("0804139296"), note: "Notes on startups, monopolies and building the future." },
  { title: "Project Hail Mary", author: "Andy Weir", color: "#121212", ink: "#e9c46a", w: 52, h: 440, font: "caps", cover: cover("project-hail-mary"), ratio: 0.649, url: dp("0593135229"), note: "A lone astronaut, a dying sun, and a lot of science." },
  { title: "The Psychology of Money", author: "Morgan Housel", color: "#f2efe6", ink: "#4a8a6a", w: 40, h: 390, font: "serif", cover: cover("the-psychology-of-money"), ratio: 0.646, url: dp("0857197681"), note: "Timeless lessons on wealth, greed and happiness." },
  { title: "Can't Hurt Me", author: "David Goggins", color: "#1c1c1e", ink: "#d6b25e", w: 44, h: 410, font: "caps", cover: cover("cant-hurt-me"), ratio: 0.666, url: dp("1544512279"), note: "Master your mind and defy the odds." },
  { title: "The Three-Body Problem", author: "Cixin Liu", color: "#1e4a7a", ink: "#e4e36a", w: 38, h: 380, font: "caps", cover: cover("the-three-body-problem"), ratio: 0.662, url: dp("0765382032"), note: "First contact, told at a cosmic scale." },
];

// The shelf, left to right: paper section dividers and books.
// Only the About Me books have pages, so only they open.
const ITEMS = [
  { divider: "I", label: "About Me" },
  ...PERSONAL,
  { divider: "II", label: "The Books I Read" },
  ...READ,
];
const BOOKS = ITEMS.filter((item) => !item.divider);
const DIVIDER_ITEMS = ITEMS.flatMap((item, k) => (item.divider ? [k] : []));
const LAST = BOOKS.length - 1;

const TURN = { duration: 0.65, ease: [0.65, 0, 0.35, 1] };
const BASE_BG = "#e9e5dd";

const hexToRgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

// Cream, nudged toward the face-out book's color.
const tint = (hex, amount = 0.12) => {
  const base = hexToRgb(BASE_BG);
  const book = hexToRgb(hex);
  return `rgb(${base.map((v, k) => Math.round(v + (book[k] - v) * amount)).join(",")})`;
};

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

const ORDINALS = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth", "sixteenth", "seventeenth", "eighteenth", "nineteenth"];
const TENS = { 2: ["twentieth", "twenty"], 3: ["thirtieth", "thirty"], 4: ["fortieth", "forty"] };

// 1 -> "first", 23 -> "twenty-third"
const ordinal = (n) => {
  if (n < 20) return ORDINALS[n - 1];
  const [round, prefix] = TENS[Math.floor(n / 10)] || ["", ""];
  return n % 10 ? `${prefix}-${ORDINALS[(n % 10) - 1]}` : round;
};

const lastName = (author) => author.split(" ").pop();

const titleSize = (title, scale = 1) =>
  Math.round((title.length <= 12 ? 34 : title.length <= 22 ? 28 : 23) * scale);

// Spine lettering sized to the spine's thickness, shrunk so long titles fit its length.
const spineTitleSize = (book, t, h) => {
  const scale = book.font === "serif" ? 1.2 : book.font === "caps" ? 0.85 : 1;
  const perChar = book.font === "caps" || book.font === "serifCaps" ? 0.86 : 0.6;
  const fitsLength = (h * 0.6) / (book.title.length * perChar);
  return clamp(Math.round(Math.min(t * 0.3 * scale, fitsLength)), 9, 24);
};

// Lettered cover for books without a photographed one (About Me).
const CoverFace = ({ book, scale = 1 }) => (
  <>
    <CoverTitle size={titleSize(book.title, scale)} ink={book.ink}>
      {book.title}
    </CoverTitle>
    <CoverRule ink={book.ink} />
    <CoverAuthor size={Math.round(19 * scale)} ink={book.ink}>
      {book.author}
    </CoverAuthor>
  </>
);

const useViewport = () => {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return size;
};

export const Shelf = () => {
  const stageRef = useRef(null);
  const indexRef = useRef(0);
  const snapTimer = useRef(null);
  const touchX = useRef(null);
  const dragged = useRef(0); // how far the current touch has moved, to tell swipes from taps
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const selectedRef = useRef(selected);
  selectedRef.current = selected;

  const vp = useViewport();
  // Phones get their own layout: a masthead, a row of spines, and details below.
  const phone = vp.w < 760;

  // Books scale with the window, leaving room for the shelf below,
  // and staying narrow enough that the widest cover fits uncropped.
  const widestCover = 440 * Math.max(...BOOKS.map((book) => book.ratio));
  const s = phone
    ? clamp(Math.min((vp.h * 0.4) / 440, (vp.w * 0.66) / widestCover), 0.45, 1.2)
    : clamp(Math.min((vp.h * 0.64) / 440, (vp.w * 0.64) / widestCover), 0.5, 2.2);
  // Phone spines are drawn thicker so their lettering stays readable.
  const thickness = phone ? 1.55 : 1;
  // Books stand shoulder to shoulder.
  const gap = Math.max(1, Math.round(1.5 * s));
  const plankTop = Math.round(14 * s);
  const plankFront = Math.round(30 * s);
  // On phones the shelf sits higher to leave room for the details panel below it.
  const plankBottom = Math.round(phone ? vp.h * 0.3 : vp.h * 0.1);
  // Books stand halfway back on the plank's top surface.
  const booksBottom = plankBottom + plankFront + Math.round(plankTop * 0.5);
  const divider = {
    w: Math.round(14 * s),
    h: Math.round(475 * s),
    tab: Math.round(26 * s),
    fs: clamp(Math.round(10.5 * s), 9, 16),
    ml: Math.round(30 * s),
  };

  // Room above the title and below the author; gilt rules sit inside it.
  const spinePad = Math.round(22 * s);

  const sized = BOOKS.map((book) => {
    const h = Math.round(book.h * s);
    const t = Math.round(book.w * s * thickness);
    const cw = Math.round(h * book.ratio);
    return { h, t, cw };
  });

  const active = Math.round(index);
  const frac = index - active;

  // Covers attach as the face-out book nears them and then stay attached, so a
  // cover never disappears while its book is still turning.
  const [coversShown, setCoversShown] = useState(() => new Set());
  useEffect(() => {
    setCoversShown((shown) => {
      const near = [];
      for (let i = Math.max(0, active - 3); i <= Math.min(LAST, active + 3); i++) {
        if (!shown.has(i)) near.push(i);
      }
      return near.length ? new Set([...shown, ...near]) : shown;
    });
  }, [active]);

  // Once the shelf has settled, quietly load every other cover, two at a time,
  // so a fast scroll never reaches a cover that isn't ready. Phones skip this to
  // save data and load covers only as they approach.
  useEffect(() => {
    if (phone) return undefined;
    let cancelled = false;
    const queue = BOOKS.filter((book) => book.cover).map((book) => book.cover);
    const loadNext = () => {
      if (cancelled || !queue.length) return;
      const img = new Image();
      img.onload = img.onerror = loadNext;
      img.src = queue.shift();
    };
    const start = setTimeout(() => {
      loadNext();
      loadNext();
    }, 1500);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [phone]);

  // Measure each divider's tab so a section is never narrower than its tab.
  const tabRefs = useRef([]);
  const [tabWidths, setTabWidths] = useState([]);
  useLayoutEffect(() => {
    const measure = () => setTabWidths(tabRefs.current.map((el) => (el ? el.offsetWidth : 0)));
    measure();
    if (document.fonts) document.fonts.ready.then(measure); // Garamond changes the width
  }, [divider.fs, divider.tab]);

  // What stands on the shelf: phones show just the books, no dividers.
  const shelfItems = phone ? BOOKS : ITEMS;
  const facesOut = (i) => i === active;

  // Width every shelf item currently takes. A divider's width includes the space
  // before it, widened when the previous section is too narrow for that section's tab.
  const widths = [];
  const dividerGaps = {};
  let sectionStart = 0;
  let dividerCount = 0;
  shelfItems.forEach((item, k) => {
    if (!item.divider) {
      const i = BOOKS.indexOf(item);
      widths.push(facesOut(i) ? sized[i].cw : sized[i].t);
      return;
    }
    let ml = 0;
    if (k > 0) {
      let span = divider.w + gap;
      for (let j = sectionStart + 1; j < k; j++) span += widths[j] + gap;
      const need = (tabWidths[dividerCount - 1] || 0) + Math.round(16 * s);
      ml = Math.max(divider.ml, need - span);
    }
    dividerGaps[k] = ml;
    widths.push(divider.w + ml);
    sectionStart = k;
    dividerCount += 1;
  });
  const activeItem = shelfItems.indexOf(BOOKS[active]);
  let activeCenter = widths[activeItem] / 2;
  for (let k = 0; k < activeItem; k++) activeCenter += widths[k] + gap;
  const total = widths.reduce((sum, w) => sum + w, 0) + gap * (shelfItems.length - 1);

  // Center the face-out book, but never scroll past either end of the shelf.
  const edge = Math.round(phone ? vp.w * 0.07 : clamp(vp.w * 0.035, 12, 56));
  const minX = vp.w - edge - total;
  const neighbor = sized[clamp(active + Math.sign(frac), 0, LAST)];
  const centered = vp.w / 2 - activeCenter - frac * (neighbor.t + gap);
  const target = minX > edge ? (vp.w - total) / 2 : clamp(centered, minX, edge);

  const x = useSpring(target, { stiffness: 140, damping: 26, mass: 0.9 });
  useEffect(() => {
    x.set(target);
  }, [target, x]);

  const goTo = useCallback((i) => {
    clearTimeout(snapTimer.current);
    const next = clamp(i, 0, LAST);
    indexRef.current = next;
    setIndex(next);
  }, []);

  // Free movement while scrolling, then settle on the nearest book.
  const moveBy = useCallback((delta) => {
    const next = clamp(indexRef.current + delta, 0, LAST);
    indexRef.current = next;
    setIndex(next);
    clearTimeout(snapTimer.current);
    snapTimer.current = setTimeout(() => goTo(Math.round(indexRef.current)), 140);
  }, [goTo]);

  useEffect(() => {
    const el = stageRef.current;
    const onWheel = (e) => {
      if (selectedRef.current !== null) return; // let the open book's pages scroll
      e.preventDefault();
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      // Cap each event so one mouse-wheel notch moves one book; trackpads still glide.
      moveBy(clamp(d, -120, 120) / 120);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [moveBy]);

  useEffect(() => {
    const onKey = (e) => {
      if (selectedRef.current !== null) {
        if (e.key === "Escape") setSelected(null);
        return;
      }
      const at = Math.round(indexRef.current);
      if (e.key === "ArrowRight") goTo(at + 1);
      if (e.key === "ArrowLeft") goTo(at - 1);
      if (e.key === "Enter" && BOOKS[at].pages) setSelected(at);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo]);

  useEffect(() => () => clearTimeout(snapTimer.current), []);

  // Clicking turns a book face-out, and the About Me books open right away.
  const handleClick = (i) => {
    if (dragged.current > 8) return; // that was a swipe, not a tap
    goTo(i);
    if (BOOKS[i].pages) setSelected(i);
  };

  return (
    <Stage
      ref={stageRef}
      bg={tint(BOOKS[active].color)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
        dragged.current = 0;
      }}
      onTouchMove={(e) => {
        if (touchX.current === null) return;
        const cx = e.touches[0].clientX;
        const dx = touchX.current - cx;
        dragged.current += Math.abs(dx);
        // About one spine's width of swipe moves one book.
        moveBy(dx / (phone ? 55 : 70));
        touchX.current = cx;
      }}
      onTouchEnd={() => {
        touchX.current = null;
      }}
    >
      <Wall />
      <Plank bottom={plankBottom}>
        <PlankTop h={plankTop} />
        <PlankFront h={plankFront} />
      </Plank>
      <Lower h={plankBottom} />

      {phone && (
        <Masthead top={Math.round(vp.h * 0.09)} inset={edge}>
          <Kicker>The library of</Kicker>
          <MastTitle>Brian K. Mason</MastTitle>
        </Masthead>
      )}

      <Row gap={gap} pb={booksBottom} style={{ x }}>
        {shelfItems.map((item, k) => {
          if (item.divider) {
            return (
              <Divider key={`divider-${item.divider}`} w={divider.w} h={divider.h} ml={dividerGaps[k]}>
                <DividerCard />
                <Tab
                  ref={(el) => {
                    tabRefs.current[DIVIDER_ITEMS.indexOf(k)] = el;
                  }}
                  h={divider.tab}
                  fs={divider.fs}
                >
                  <TabNumber>{item.divider}</TabNumber>
                  {item.label}
                </Tab>
              </Divider>
            );
          }

          const book = item;
          const i = BOOKS.indexOf(book);
          const { h, t, cw } = sized[i];
          return (
            <Slot
              key={book.title}
              h={h}
              role="button"
              aria-label={book.title}
              initial={false}
              animate={{ width: facesOut(i) ? cw : t }}
              transition={TURN}
              onClick={() => handleClick(i)}
            >
              <Depth>
                <Box
                  cw={cw}
                  initial={false}
                  style={{ originX: 0.5, originY: 0.5, originZ: -t / 2 }}
                  animate={{
                    rotateY: facesOut(i) ? 0 : 90,
                    z: facesOut(i) ? 0 : -(cw - t) / 2,
                  }}
                  transition={TURN}
                >
                  <Front
                    color={book.color}
                    img={coversShown.has(i) ? book.cover : undefined}
                    pad={Math.round(cw * 0.12)}
                  >
                    {!book.cover && <CoverFace book={book} scale={cw / 300} />}
                  </Front>
                  <SpineFace t={t} pad={spinePad} color={book.color} ink={book.ink}>
                    {book.bands && (
                      <>
                        <Band at="top" offset={Math.round(spinePad * 0.45)} ink={book.ink} />
                        <Band at="bottom" offset={Math.round(spinePad * 0.45)} ink={book.ink} />
                      </>
                    )}
                    <SpineTitle variant={book.font} size={spineTitleSize(book, t, h)}>
                      {book.title}
                    </SpineTitle>
                    <SpineAuthor size={clamp(Math.round(t * 0.17), 8, 13)}>
                      {phone ? lastName(book.author) : book.author}
                    </SpineAuthor>
                  </SpineFace>
                </Box>
              </Depth>
            </Slot>
          );
        })}
      </Row>

      {phone && (
        <AnimatePresence mode="wait">
          <Details
            key={BOOKS[active].title}
            inset={edge}
            // Hang just below the shelf, so the panel can never run into it.
            top={vp.h - plankBottom + Math.round(18 + 10 * s)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            <Kicker>The {ordinal(active + 1)} volume</Kicker>
            <DetailTitle>{BOOKS[active].title}</DetailTitle>
            {BOOKS[active].pages ? (
              <DetailNote>Tap to open</DetailNote>
            ) : (
              <>
                <DetailAuthor>{BOOKS[active].author}</DetailAuthor>
                <Rating>
                  My rating
                  <RatingValue unrated={!BOOKS[active].rating}>
                    {BOOKS[active].rating ? `${BOOKS[active].rating}/10` : "Unrated"}
                  </RatingValue>
                </Rating>
              </>
            )}
          </Details>
        </AnimatePresence>
      )}

      <AnimatePresence>
        {selected !== null && (
          <OpenBook
            book={BOOKS[selected]}
            vp={vp}
            onClose={() => setSelected(null)}
            renderCover={(scale) => <CoverFace book={BOOKS[selected]} scale={scale} />}
          />
        )}
      </AnimatePresence>
    </Stage>
  );
};
