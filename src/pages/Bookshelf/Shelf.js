import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, useSpring } from "framer-motion";
import profile from "../../assets/profile.jpg";
import {
  AboutPhoto,
  Backdrop,
  Box,
  Cover,
  CoverAuthorSerif,
  CoverTitleSerif,
  Front,
  Gutter,
  Lean,
  PageByline,
  PageHeading,
  PageLeft,
  PageLink,
  PageList,
  PageListItem,
  PageRight,
  PageRule,
  PageText,
  PageTitleBig,
  PhotoCaption,
  Row,
  Scene,
  Slot,
  SpineAuthor,
  SpineFace,
  SpineTitle,
  Spread,
  Stage,
} from "./Shelf.styles";

const dp = (id) => `https://www.amazon.com/dp/${id}`;

// About Me sits in the middle so the shelf opens with books on both sides.
const BOOKS = [
  { title: "Shoe Dog", author: "Phil Knight", color: "#e4b33c", ink: "#2b2b2b", w: 48, h: 420, ratio: 0.66, url: dp("1501135910"), note: "Nike's origin story — my favorite founder memoir." },
  { title: "Zero to One", author: "Peter Thiel", color: "#cf4434", ink: "#fdfdfd", w: 36, h: 360, lean: 3, url: dp("0804139296"), note: "Notes on startups, monopolies and building the future." },
  { title: "Project Hail Mary", author: "Andy Weir", color: "#20406a", ink: "#f2f2f2", w: 52, h: 440, ratio: 0.68, url: dp("0593135229"), note: "A lone astronaut, a dying sun, and a lot of science." },
  { title: "The Psychology of Money", author: "Morgan Housel", color: "#eae4d6", ink: "#2b2b2b", w: 40, h: 390, url: dp("0857197681"), note: "Timeless lessons on wealth, greed and happiness." },
  { title: "Can't Hurt Me", author: "David Goggins", color: "#1c1c1e", ink: "#f0f0f0", w: 44, h: 410, url: dp("1544512279"), note: "Master your mind and defy the odds." },
  { title: "The Three-Body Problem", author: "Cixin Liu", color: "#2e6f5e", ink: "#f4f4f4", w: 38, h: 380, url: dp("0765382032"), note: "First contact, told at a cosmic scale." },
  { title: "Sapiens", author: "Yuval Noah Harari", color: "#edc84a", ink: "#2b2b2b", w: 50, h: 430, ratio: 0.66, url: dp("006342200X"), note: "A brief history of humankind." },
  { title: "The Alchemist", author: "Paulo Coelho", color: "#c67f3b", ink: "#fbfbfb", w: 34, h: 350, lean: -2.5, url: dp("0062315005"), note: "A shepherd's journey toward his personal legend." },
  { title: "The Road", author: "Cormac McCarthy", color: "#3a3f44", ink: "#ededed", w: 36, h: 370, url: dp("0307387895"), note: "A father and son walk through the ashes." },
  { title: "Grit", author: "Angela Duckworth", color: "#7a98c4", ink: "#fbfbfb", w: 42, h: 400, url: dp("1501111116"), note: "The power of passion and perseverance." },
  { title: "Why We Sleep", author: "Matthew Walker", color: "#16263d", ink: "#cfe0ef", w: 46, h: 425, url: dp("1501144324"), note: "Unlocking the power of sleep and dreams." },
  { title: "The Almanack of Naval Ravikant", author: "Eric Jorgenson", color: "#e9e6df", ink: "#2b2b2b", w: 40, h: 395, url: dp("B0F9VM4V5N"), note: "A guide to wealth and happiness." },
  { title: "Red Rising", author: "Pierce Brown", color: "#a11f2a", ink: "#f5f5f5", w: 48, h: 415, lean: 2, url: dp("034553980X"), note: "A caste-war epic on a terraformed Mars." },
  { title: "About Me", author: "Brian K. Mason", color: "#6f5844", ink: "#f1e7d8", w: 52, h: 440, ratio: 0.74, about: true },
  { title: "Outlive", author: "Peter Attia", color: "#d8dde0", ink: "#2b2b2b", w: 38, h: 385, url: dp("0593236599"), note: "The science and art of longevity." },
  { title: "Ready Player One", author: "Ernest Cline", color: "#11131a", ink: "#67e8f9", w: 44, h: 405, url: dp("0307887448"), note: "A treasure hunt inside a virtual world." },
  { title: "Elon Musk", author: "Walter Isaacson", color: "#f2f1ee", ink: "#222222", w: 46, h: 415, url: dp("1982181281"), note: "Inside the mind of the world's most polarizing founder." },
  { title: "The Hard Thing About Hard Things", author: "Ben Horowitz", color: "#121212", ink: "#efefef", w: 40, h: 395, url: dp("0062273205"), note: "Building a business when there are no easy answers." },
  { title: "Delivering Happiness", author: "Tony Hsieh", color: "#d64a86", ink: "#fdfdfd", w: 38, h: 375, lean: -3, url: dp("0446576220"), note: "Zappos, culture, and profits." },
  { title: "The Everything Store", author: "Brad Stone", color: "#e07b39", ink: "#fdfdfd", w: 42, h: 405, url: dp("0316219282"), note: "Jeff Bezos and the age of Amazon." },
  { title: "The 4-Hour Workweek", author: "Timothy Ferriss", color: "#2a2f36", ink: "#eaeaea", w: 36, h: 365, url: dp("0307465357"), note: "Escape 9–5 and join the new rich." },
  { title: "Die With Zero", author: "Bill Perkins", color: "#149a9a", ink: "#fdfdfd", w: 38, h: 380, url: dp("0358567092"), note: "Getting all you can from your money and your life." },
  { title: "The Dark Forest", author: "Cixin Liu", color: "#1b2a4a", ink: "#dfe6f2", w: 44, h: 420, url: dp("0765386690"), note: "Book two of the Three-Body trilogy." },
  { title: "Death's End", author: "Cixin Liu", color: "#3a2e55", ink: "#ece8f2", w: 44, h: 425, lean: 2.5, url: dp("0765386631"), note: "The trilogy's staggering finale." },
  { title: "The Way of Kings", author: "Brandon Sanderson", color: "#27496d", ink: "#eef3f7", w: 54, h: 440, url: dp("0765376679"), note: "Epic fantasy at its most ambitious." },
  { title: "Freakonomics", author: "Levitt & Dubner", color: "#e8863a", ink: "#222222", w: 42, h: 400, url: dp("0063494558"), note: "A rogue economist explores the hidden side of everything." },
  { title: "Endurance", author: "Alfred Lansing", color: "#5b7fa6", ink: "#fdfdfd", w: 40, h: 400, url: dp("0465062881"), note: "Shackleton's incredible Antarctic voyage." },
  { title: "Children of Time", author: "Adrian Tchaikovsky", color: "#3f6f4a", ink: "#eef3ee", w: 42, h: 410, url: dp("0316452505"), note: "Evolution, uplift, and a world of spiders." },
];

const ABOUT_INDEX = BOOKS.findIndex((book) => book.about);
const LAST = BOOKS.length - 1;

const TURN = { duration: 0.65, ease: [0.65, 0, 0.35, 1] };
const BASE_BG = "#ece9e2";

const hexToRgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const isDark = (hex) => {
  const [r, g, b] = hexToRgb(hex);
  return 0.299 * r + 0.587 * g + 0.114 * b < 140;
};

// Cream, nudged toward the centered book's color.
const tint = (hex, amount = 0.14) => {
  const base = hexToRgb(BASE_BG);
  const book = hexToRgb(hex);
  return `rgb(${base.map((v, k) => Math.round(v + (book[k] - v) * amount)).join(",")})`;
};

// Tone-on-tone "debossed" lettering, like a cloth-bound cover.
const emboss = (hex) => (isDark(hex) ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.32)");

const titleSize = (title, scale = 1) =>
  Math.round((title.length <= 12 ? 34 : title.length <= 22 ? 28 : 23) * scale);

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

const CoverFace = ({ book, scale = 1 }) => (
  <>
    <CoverTitleSerif size={titleSize(book.title, scale)} emboss={emboss(book.color)}>
      {book.title}
    </CoverTitleSerif>
    <CoverAuthorSerif size={Math.round(19 * scale)} emboss={emboss(book.color)}>
      {book.author}
    </CoverAuthorSerif>
  </>
);

const AboutPages = () => (
  <>
    <PageLeft>
      <AboutPhoto src={profile} />
      <PhotoCaption>Brian K. Mason · Bethesda, MD</PhotoCaption>
    </PageLeft>
    <PageRight>
      <PageHeading>About</PageHeading>
      <PageText>
        My name is Brian Mason. I grew up in Bethesda, Maryland. I love being
        active (running, lifting, tennis, spikeball), reading, writing, and
        playing guitar. I’m incredibly competitive, have an addictive
        personality, and am the type of person who constantly has a scheme for
        improving his own life.
      </PageText>
      <PageText>My top three life goals:</PageText>
      <PageList>
        <PageListItem>Be surrounded by the people I love</PageListItem>
        <PageListItem>Produce things that are a reflection of who I am</PageListItem>
        <PageListItem>Live a storyful life</PageListItem>
      </PageList>

      <PageHeading>Currently</PageHeading>
      <PageText>
        Head of Engineering at{" "}
        <PageLink href="https://www.differenthealth.com/" target="_blank" rel="noopener noreferrer">
          Different Health
        </PageLink>
      </PageText>
      <PageText>Studying Math at Duke University</PageText>

      <PageHeading>Previously</PageHeading>
      <PageText>Founded an app ranked 21st on the Google Play Store</PageText>
      <PageText>
        Founding Engineer at{" "}
        <PageLink href="https://www.pathfindercard.com/" target="_blank" rel="noopener noreferrer">
          Pathfinder
        </PageLink>
      </PageText>

      <PageText>
        <PageLink href="mailto:brian.kw.mason@gmail.com">email</PageLink>
        {"  ·  "}
        <PageLink href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
          linkedin
        </PageLink>
      </PageText>
    </PageRight>
  </>
);

const BookPages = ({ book }) => (
  <>
    <PageLeft>
      <div style={{ padding: "48px 38px" }}>
        <PageTitleBig>{book.title}</PageTitleBig>
        <PageByline>{book.author}</PageByline>
        <PageRule />
      </div>
    </PageLeft>
    <PageRight>
      <PageHeading>Notes</PageHeading>
      <PageText>{book.note}</PageText>
      <PageText>
        <PageLink href={book.url} target="_blank" rel="noopener noreferrer">
          View on Amazon →
        </PageLink>
      </PageText>
    </PageRight>
  </>
);

const OpenBook = ({ book, onClose }) => (
  <Backdrop
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
    onClick={onClose}
  >
    <Scene onClick={(e) => e.stopPropagation()}>
      <Spread
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.45, duration: 0.45, ease: "easeOut" }}
      >
        {book.about ? <AboutPages /> : <BookPages book={book} />}
        <Gutter />
      </Spread>
      <Cover
        color={book.color}
        initial={{ rotateY: 0, opacity: 1 }}
        animate={{ rotateY: -165, opacity: 0 }}
        transition={{
          rotateY: { delay: 0.2, duration: 0.9, ease: [0.6, 0, 0.3, 1] },
          opacity: { delay: 0.75, duration: 0.35 },
        }}
      >
        <CoverFace book={book} scale={1.1} />
      </Cover>
    </Scene>
  </Backdrop>
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
  const indexRef = useRef(ABOUT_INDEX);
  const snapTimer = useRef(null);
  const touchX = useRef(null);
  const [index, setIndex] = useState(ABOUT_INDEX);
  const [selected, setSelected] = useState(null);
  const selectedRef = useRef(selected);
  selectedRef.current = selected;

  const vp = useViewport();

  // Books scale with the window so the tallest nearly fills its height.
  const s = clamp((vp.h * 0.82) / 440, 0.7, 2.2);
  const gap = Math.round(8 * s);
  const sized = BOOKS.map((book) => {
    const h = Math.round(book.h * s);
    const t = Math.round(book.w * s);
    const cw = Math.min(Math.round(h * (book.ratio || 0.7)), Math.round(vp.w * 0.72));
    return { h, t, cw };
  });

  const active = Math.round(index);
  const frac = index - active;

  // Shift the row so the active (face-out) book sits at the center.
  let activeCenter = sized[active].cw / 2;
  for (let j = 0; j < active; j++) activeCenter += sized[j].t + gap;
  const neighbor = sized[clamp(active + Math.sign(frac), 0, LAST)];
  const target = vp.w / 2 - activeCenter - frac * (neighbor.t + gap);

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
      if (e.key === "Enter") setSelected(at);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo]);

  useEffect(() => () => clearTimeout(snapTimer.current), []);

  const handleClick = (i) => {
    if (i === active && Math.abs(frac) < 0.05) setSelected(i);
    else goTo(i);
  };

  return (
    <Stage
      ref={stageRef}
      bg={tint(BOOKS[active].color)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchMove={(e) => {
        if (touchX.current === null) return;
        const cx = e.touches[0].clientX;
        moveBy((touchX.current - cx) / 70);
        touchX.current = cx;
      }}
      onTouchEnd={() => {
        touchX.current = null;
      }}
    >
      <Row gap={gap} style={{ x }}>
        {BOOKS.map((book, i) => {
          const { h, t, cw } = sized[i];
          const isActive = i === active;
          return (
            <Slot
              key={book.title}
              h={h}
              role="button"
              aria-label={book.title}
              initial={false}
              animate={{ width: isActive ? cw : t }}
              transition={TURN}
              onClick={() => handleClick(i)}
            >
              <Lean lean={isActive ? 0 : book.lean || 0}>
                <Box
                  cw={cw}
                  initial={false}
                  style={{ originX: 0.5, originY: 0.5, originZ: -t / 2 }}
                  animate={{
                    rotateY: isActive ? 0 : 90,
                    z: isActive ? 0 : -(cw - t) / 2,
                  }}
                  transition={TURN}
                >
                  <Front color={book.color} pad={Math.round(cw * 0.1)}>
                    <CoverFace book={book} scale={cw / 300} />
                  </Front>
                  <SpineFace t={t} color={book.color} ink={book.ink}>
                    <SpineTitle size={clamp(Math.round(t * 0.3), 11, 22)}>{book.title}</SpineTitle>
                    <SpineAuthor size={clamp(Math.round(t * 0.2), 9, 15)}>{book.author}</SpineAuthor>
                  </SpineFace>
                </Box>
              </Lean>
            </Slot>
          );
        })}
      </Row>

      <AnimatePresence>
        {selected !== null && (
          <OpenBook book={BOOKS[selected]} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </Stage>
  );
};
