import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Backdrop, CloseButton } from "./Book.styles";
import { isDark, Note, NoteForm, NoteLightbox, TILTS, useNotes } from "./CommunityJournal";
import {
  AllNotes,
  BigBoard,
  BigCork,
  BigHead,
  Board,
  BoardHead,
  BoardNote,
  Card,
  Cork,
  HandCard,
  MiniNote,
  MiniText,
  MoreCard,
  NoteSlot,
  Pin,
  Pinned,
  WriteSheet,
} from "./Corkboard.styles";

const FRAME = 7;
const PIN_COLORS = ["#b4443a", "#c9a24a", "#3f5f8a", "#4f7a52", "#d8d2c4"];

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

// Shorter notes are written larger, as on the big board.
const miniSize = (text, side) => side * (text.length <= 40 ? 0.15 : text.length <= 100 ? 0.12 : 0.105);

const preview = (note) => `${note.name ? `Note from ${note.name}` : "Note"}: ${note.body.slice(0, 60)}`;

const sweep = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 } };

// Visitors' notes pinned to a board on the wall. `box` places it ({ top, left or
// right, width, height }, in px). Notes open in full; visitors write new ones,
// and see every note, from the board.
export const Corkboard = ({ box, phone }) => {
  const { notes, failed } = useNotes();
  const [mode, setMode] = useState(null); // "write" | "all"
  const [opened, setOpened] = useState(null); // a note read in full
  const [freshId, setFreshId] = useState(null);
  const freshTimer = useRef(null);

  // Escape closes whatever is on top.
  useEffect(() => {
    if (!mode && !opened) return undefined;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (opened) setOpened(null);
      else setMode(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, opened]);

  useEffect(() => () => clearTimeout(freshTimer.current), []);

  const posted = (note) => {
    setMode(null);
    // Press the new note onto the board once.
    setFreshId(note.id);
    clearTimeout(freshTimer.current);
    freshTimer.current = setTimeout(() => setFreshId(null), 1800);
  };

  // Fit the notes to the board: one row, or two on a tall board, as many as fit.
  const innerW = box.width - FRAME * 2;
  const innerH = box.height - FRAME * 2;
  const pad = clamp(Math.round(innerH * 0.07), 8, 16);
  const gap = clamp(Math.round(innerH * 0.06), 8, 16);
  const headH = clamp(Math.round(innerH * 0.17), 22, 32);
  const areaW = innerW - pad * 2;
  const areaH = innerH - pad * 2 - headH - gap;
  const rows = areaH >= 160 ? 2 : 1;
  const side = Math.floor(Math.min((areaH - (rows - 1) * gap) / rows, 86));
  const perRow = Math.max(1, Math.floor((areaW + gap) / (side + gap * 1.4)));
  const capacity = rows * perRow;
  const overflow = notes && notes.length > capacity;
  const shown = notes ? notes.slice(0, overflow ? capacity - 1 : capacity) : [];
  const pin = Math.round(clamp(side * 0.1, 7, 11));

  return (
    <>
      <Board aria-label="Community Journal" frame={FRAME} style={box}>
        <Cork pad={pad} gap={gap}>
          <BoardHead h={headH}>
            <Card tilt={-1.2} fs={clamp(Math.round(headH * 0.36), 9, 12)} onClick={() => setMode("all")}>
              <Pin size={pin} color={PIN_COLORS[1]} />
              Community Journal
            </Card>
            <HandCard tilt={1.4} fs={clamp(Math.round(headH * 0.68), 15, 22)} onClick={() => setMode("write")}>
              <Pin size={pin} color={PIN_COLORS[0]} />
              + Leave a note
            </HandCard>
          </BoardHead>

          {notes && !notes.length ? (
            <BoardNote fs={clamp(Math.round(side * 0.2), 14, 22)}>No notes yet. Be the first.</BoardNote>
          ) : failed ? (
            <BoardNote fs={clamp(Math.round(side * 0.18), 13, 20)}>The notes couldn’t be loaded right now.</BoardNote>
          ) : (
            <Pinned perRow={perRow} side={side} gap={gap}>
              {shown.map((note) => (
                <MiniNote
                  key={note.id}
                  type="button"
                  side={side}
                  color={note.color}
                  $dark={isDark(note.color)}
                  aria-label={preview(note)}
                  style={{
                    rotate: TILTS[note.id % TILTS.length],
                    x: ((note.id * 37) % 7) - 3,
                    y: ((note.id * 53) % 5) - 2,
                  }}
                  initial={note.id === freshId ? { opacity: 0, scale: 1.25 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  onClick={() => setOpened(note)}
                >
                  <Pin size={pin} color={PIN_COLORS[note.id % PIN_COLORS.length]} />
                  <MiniText size={miniSize(note.body, side)}>{note.body}</MiniText>
                </MiniNote>
              ))}
              {overflow && (
                <MoreCard type="button" fs={clamp(Math.round(side * 0.17), 13, 22)} onClick={() => setMode("all")}>
                  +{notes.length - shown.length} more
                </MoreCard>
              )}
            </Pinned>
          )}
        </Cork>
      </Board>

      <AnimatePresence>
        {mode === "write" && (
          <Backdrop key="write" data-overlay="" {...sweep} onClick={() => setMode(null)}>
            <WriteSheet
              role="dialog"
              aria-label="Leave a note"
              initial={{ y: 12 }}
              animate={{ y: 0 }}
              exit={{ y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <NoteForm autoFocus={!phone} onPosted={posted} />
            </WriteSheet>
          </Backdrop>
        )}

        {mode === "all" && (
          <Backdrop key="all" data-overlay="" {...sweep} onClick={() => setMode(null)}>
            <BigBoard
              role="dialog"
              aria-label="Community Journal"
              initial={{ y: 12 }}
              animate={{ y: 0 }}
              exit={{ y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <BigCork>
                <BigHead>
                  <Card as="div" tilt={-1.2} fs={phone ? 10 : 12}>
                    <Pin size={10} color={PIN_COLORS[1]} />
                    Community Journal
                  </Card>
                  <HandCard tilt={1.4} fs={phone ? 18 : 22} onClick={() => setMode("write")}>
                    <Pin size={10} color={PIN_COLORS[0]} />
                    + Leave a note
                  </HandCard>
                </BigHead>
                {notes && !notes.length && (
                  <BoardNote fs={phone ? 20 : 26}>No notes yet. Be the first.</BoardNote>
                )}
                <AllNotes>
                  {(notes || []).map((note) => (
                    <NoteSlot
                      key={note.id}
                      role="button"
                      tabIndex={0}
                      aria-label={preview(note)}
                      onClick={() => setOpened(note)}
                      onKeyDown={(e) => e.key === "Enter" && setOpened(note)}
                    >
                      <Note note={note} onOpen={setOpened} />
                    </NoteSlot>
                  ))}
                </AllNotes>
              </BigCork>
            </BigBoard>
          </Backdrop>
        )}
      </AnimatePresence>

      {/* Outside the scrolling backdrop so it stays put */}
      <AnimatePresence>
        {mode && (
          <CloseButton
            key="close"
            aria-label="Close"
            title="Close"
            $compact={!phone}
            {...sweep}
            onClick={() => setMode(null)}
          >
            <span aria-hidden>×</span>
            {phone && " Close"}
          </CloseButton>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {opened && <NoteLightbox key="note" note={opened} phone={phone} onClose={() => setOpened(null)} />}
      </AnimatePresence>
    </>
  );
};
