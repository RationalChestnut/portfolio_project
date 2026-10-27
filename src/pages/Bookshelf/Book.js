import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  Backdrop,
  CloseButton,
  Flow,
  FLOW_GAP,
  FlowWindow,
  Folio,
  Gutter,
  Leaf,
  LeafFace,
  MeasurePage,
  Page,
  PageTurn,
  RunningHead,
  Scene,
  Spread,
} from "./Book.styles";

// Lower-case roman numerals for page numbers.
const ROMAN = [["l", 50], ["xl", 40], ["x", 10], ["ix", 9], ["v", 5], ["iv", 4], ["i", 1]];
const roman = (n) => {
  let out = "";
  for (const [letters, value] of ROMAN) {
    while (n >= value) {
      out += letters;
      n -= value;
    }
  }
  return out;
};
// The cover counts as page i, so the first page inside is ii.
const folio = (index) => roman(index + 2);

const LEAF_TURN = { duration: 0.85, ease: [0.45, 0, 0.2, 1] };

// A book is a list of pages; consecutive pairs are the spreads you turn through.
// A page is { head, body, foot?, title?, id?, newSpread? }, where `body` may be a
// function of the book's context, or { head, flow, id? } for flowing text that
// runs across as many pages as it needs. `title` labels the page-turn links, and
// `newSpread` starts the page on the left of a new spread.
const layOut = (pages, counts) => {
  const out = [];
  pages.forEach((page, i) => {
    if (page.newSpread && out.length % 2) out.push({ blank: true });
    if (!page.flow) out.push(page);
    else for (let part = 0; part < (counts[i] || 1); part++) out.push({ ...page, part });
  });
  if (out.length % 2) out.push({ blank: true });
  return out;
};

const BookPage = ({ side, page, number, context }) => {
  if (page.blank) return <Page side={side} />;
  const body = typeof page.body === "function" ? page.body(context) : page.body;
  return (
    <Page side={side} data-page={page.part ? undefined : page.id}>
      {page.head && <RunningHead>{page.head}</RunningHead>}
      {page.flow && page.part !== undefined ? (
        <FlowWindow>
          <Flow style={{ transform: `translateX(calc(${-page.part} * (100% + ${FLOW_GAP}em)))` }}>
            {page.flow}
          </Flow>
        </FlowWindow>
      ) : (
        page.flow || body
      )}
      {page.foot}
      {number && <Folio>{number}</Folio>}
    </Page>
  );
};

export const OpenBook = ({ book, vp, onClose }) => {
  const [at, setAt] = useState(0); // spread index
  const [turn, setTurn] = useState(null); // { dir: 1 | -1, to }
  const stacked = vp.w < 760;

  // A 3:2 spread that fills most of the window.
  const h = Math.round(Math.min(vp.h * 0.92, (vp.w * 0.94) / 1.5));
  const w = Math.round(h * 1.5);
  const base = h * 0.019;

  // Count the pages each flowing piece fills, from a hidden copy of its page.
  const flowIndexes = useMemo(
    () => book.pages.flatMap((page, i) => (page.flow ? [i] : [])),
    [book.pages]
  );
  const measureRefs = useRef({});
  const [counts, setCounts] = useState({});
  useLayoutEffect(() => {
    if (stacked || !flowIndexes.length) return;
    const measure = () => {
      const next = {};
      for (const i of flowIndexes) {
        const el = measureRefs.current[i];
        if (!el) continue;
        const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
        next[i] = Math.max(1, Math.round((el.scrollWidth + gap) / (el.clientWidth + gap)));
      }
      setCounts(next);
    };
    measure();
    if (document.fonts) document.fonts.ready.then(measure); // Garamond changes the fit
  }, [flowIndexes, stacked, base]);

  const pages = useMemo(() => layOut(book.pages, counts), [book.pages, counts]);
  const spreadCount = pages.length / 2;
  const indexOf = (id) => pages.findIndex((page) => page.id === id && !page.part);

  const context = {
    // Page number where a piece starts (none on phones, where pages just scroll).
    folioOf: (id) => (stacked || indexOf(id) < 0 ? null : folio(indexOf(id))),
    turnTo: (id) => {
      if (stacked) {
        const el = document.querySelector(`[data-page="${id}"]`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (indexOf(id) < 0) return;
      setTurn(null);
      setAt(Math.floor(indexOf(id) / 2));
    },
  };

  const go = (dir) => {
    const to = at + dir;
    if (turn || to < 0 || to >= spreadCount) return;
    setTurn({ dir, to });
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const pageAt = (spread, side) => pages[spread * 2 + (side === "right" ? 1 : 0)];
  const spreadTitle = (spread) => pageAt(spread, "left").title || pageAt(spread, "right").title;
  const render = (spread, side) => (
    <BookPage
      side={side}
      page={pageAt(spread, side)}
      number={pageAt(spread, side).blank ? null : folio(spread * 2 + (side === "right" ? 1 : 0))}
      context={context}
    />
  );

  // While a leaf turns, the pages beneath it already show where it's going.
  const leftAt = turn && turn.dir < 0 ? turn.to : at;
  const rightAt = turn && turn.dir > 0 ? turn.to : at;
  const forward = turn && turn.dir > 0;

  // Keep Close clear of the book. Phones: above the first page, lined up with its
  // right edge (the pages are 94vw wide, centered). Desktop: in the side margin,
  // level with the book's top, or in the top margin when the sides are too narrow.
  const sideMargin = (vp.w - w) / 2;
  const topMargin = (vp.h - h) / 2;
  const closeAt = stacked
    ? { right: Math.round(vp.w * 0.03) }
    : sideMargin >= 64
    ? { top: topMargin, right: (sideMargin - 40) / 2 }
    : { top: Math.max(6, (topMargin - 40) / 2), right: 14 };

  // The book has already turned face-out on the shelf; it opens straight away.
  return (
    <>
      <Backdrop
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={onClose}
      >
        <Scene w={w} h={h} onClick={(e) => e.stopPropagation()}>
          <Spread base={base}>
            {stacked ? (
              book.pages.map((page, i) => (
                <BookPage key={i} side={i % 2 ? "right" : "left"} page={page} number={folio(i)} context={context} />
              ))
            ) : (
              <>
                {flowIndexes.map((i) => (
                  <MeasurePage key={`measure-${i}`} side="right" aria-hidden>
                    <FlowWindow>
                      <Flow
                        ref={(el) => {
                          measureRefs.current[i] = el;
                        }}
                      >
                        {book.pages[i].flow}
                      </Flow>
                    </FlowWindow>
                  </MeasurePage>
                ))}

                {render(leftAt, "left")}
                {render(rightAt, "right")}
                <Gutter />

                {turn && (
                  <Leaf
                    key={`${at}-${turn.to}`}
                    side={forward ? "right" : "left"}
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: forward ? -180 : 180 }}
                    transition={LEAF_TURN}
                    onAnimationComplete={() => {
                      setAt(turn.to);
                      setTurn(null);
                    }}
                  >
                    <LeafFace>{render(at, forward ? "right" : "left")}</LeafFace>
                    <LeafFace back>{render(turn.to, forward ? "left" : "right")}</LeafFace>
                  </Leaf>
                )}

                {!turn && at > 0 && (
                  <PageTurn side="left" onClick={() => go(-1)}>
                    ← {spreadTitle(at - 1) || "Back"}
                  </PageTurn>
                )}
                {!turn && at < spreadCount - 1 && (
                  <PageTurn side="right" onClick={() => go(1)}>
                    {spreadTitle(at + 1) || "Next"} →
                  </PageTurn>
                )}
              </>
            )}
          </Spread>
        </Scene>
      </Backdrop>

      {/* Outside the scrolling backdrop so it stays put while the pages scroll */}
      <CloseButton
        aria-label="Close book"
        title="Close"
        $compact={!stacked}
        style={closeAt}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        transition={{ duration: 0.15 }}
        onClick={onClose}
      >
        <span aria-hidden>×</span>
        {stacked && " Close"}
      </CloseButton>
    </>
  );
};
