import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Cover,
  Folio,
  Gutter,
  Leaf,
  LeafFace,
  Page,
  PageTurn,
  RunningHead,
  Scene,
  Spread,
} from "./Book.styles";

const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii"];
// Spreads start on page ii (the title page is i).
const pageNumber = (spread, side) => {
  const n = 2 + spread * 2 + (side === "right" ? 1 : 0);
  return ROMAN[n - 1] || String(n);
};

const LEAF_TURN = { duration: 0.85, ease: [0.45, 0, 0.2, 1] };

const BookPage = ({ side, page, number }) => (
  <Page side={side}>
    <RunningHead>{page.head}</RunningHead>
    {page.body}
    <Folio>{number}</Folio>
  </Page>
);

// `renderCover(scale)` draws the book's cover lettering at a given size.
export const OpenBook = ({ book, vp, onClose, renderCover }) => {
  const { spreads } = book;
  const [at, setAt] = useState(0);
  const [turn, setTurn] = useState(null); // { dir: 1 | -1, to }
  const stacked = vp.w < 760;

  const go = (dir) => {
    const to = at + dir;
    if (turn || to < 0 || to >= spreads.length) return;
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

  // A 3:2 spread that fills most of the window.
  const h = Math.round(Math.min(vp.h * 0.92, (vp.w * 0.94) / 1.5));
  const w = Math.round(h * 1.5);
  const base = h * 0.019;
  const pageW = w / 2;

  // While a leaf turns, the pages beneath it already show where it's going.
  const leftAt = turn && turn.dir < 0 ? turn.to : at;
  const rightAt = turn && turn.dir > 0 ? turn.to : at;
  const forward = turn && turn.dir > 0;

  return (
    <Backdrop
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <Scene w={w} h={h} onClick={(e) => e.stopPropagation()}>
        <Spread
          base={base}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.4, ease: "easeOut" }}
        >
          {stacked ? (
            spreads.flatMap((spread, s) => [
              <BookPage key={`${s}-left`} side="left" page={spread.left} number={pageNumber(s, "left")} />,
              <BookPage key={`${s}-right`} side="right" page={spread.right} number={pageNumber(s, "right")} />,
            ])
          ) : (
            <>
              <BookPage side="left" page={spreads[leftAt].left} number={pageNumber(leftAt, "left")} />
              <BookPage side="right" page={spreads[rightAt].right} number={pageNumber(rightAt, "right")} />
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
                  <LeafFace>
                    <BookPage
                      side={forward ? "right" : "left"}
                      page={forward ? spreads[at].right : spreads[at].left}
                      number={pageNumber(at, forward ? "right" : "left")}
                    />
                  </LeafFace>
                  <LeafFace back>
                    <BookPage
                      side={forward ? "left" : "right"}
                      page={forward ? spreads[turn.to].left : spreads[turn.to].right}
                      number={pageNumber(turn.to, forward ? "left" : "right")}
                    />
                  </LeafFace>
                </Leaf>
              )}

              {!turn && at > 0 && (
                <PageTurn side="left" onClick={() => go(-1)}>
                  ← {spreads[at - 1].title}
                </PageTurn>
              )}
              {!turn && at < spreads.length - 1 && (
                <PageTurn side="right" onClick={() => go(1)}>
                  {spreads[at + 1].title} →
                </PageTurn>
              )}
            </>
          )}
        </Spread>
        <Cover
          color={book.color}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: -180 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.6, 0, 0.3, 1] }}
        >
          {renderCover(pageW / 300)}
        </Cover>
      </Scene>
    </Backdrop>
  );
};
