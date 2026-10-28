import React, { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { MdColorize } from "react-icons/md";
import { OpenBook } from "./Book";
import {
  CloseButton,
  ColorField,
  ColorPanel,
  CustomSwatch,
  DropperButton,
  Empty,
  FormRow,
  FormStatus,
  HexInput,
  HueBar,
  JournalForm,
  JournalIntro,
  JournalTitle,
  Lightbox,
  NOTE_COLORS,
  NoteBoard,
  NoteCount,
  NoteDate,
  NoteDraft,
  NoteFull,
  NoteFullText,
  NoteInput,
  NoteSign,
  NoteText,
  PickerRow,
  PickerSide,
  PickerThumb,
  RgbReadout,
  SeeMore,
  SignInput,
  SignLine,
  StickButton,
  StickyNote,
  Swatch,
  Swatches,
} from "./Book.styles";

// Notes live in the portfolio's Supabase project. The publishable key is meant
// for browsers: the table only lets visitors read notes and post new ones.
const NOTES_URL = "https://rzglfolzbqftfyyeemyl.supabase.co/rest/v1/notes";
const API_KEY = "sb_publishable_zPLYjD-4IHg7An0lfbufMQ__TGCyf7m";
const FIELDS = "id,body,name,color,created_at";

export const NOTE_MAX = 2000;
const NAME_MAX = 40;
const PER_PAGE = 6;
const TILTS = [-2.4, 1.8, -1.2, 2.6, -1.9, 1.1];
const EMPTY_DRAFT = { body: "", name: "", color: NOTE_COLORS[0] };

const request = async (query, options = {}) => {
  const res = await fetch(`${NOTES_URL}?${query}`, {
    ...options,
    headers: { apikey: API_KEY, "Content-Type": "application/json", ...options.headers },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    // The database's posting limit explains itself; anything else gets a general message.
    throw new Error(data && data.code === "P0001" ? data.message : "Something went wrong. Try again.");
  }
  return data;
};

// Kept between openings, so the book opens with its notes and an unfinished note survives closing it.
let cachedNotes = null;
let savedDraft = EMPTY_DRAFT;

const Journal = createContext(null);

// ---- Colors ----

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const rgbToHex = (rgb) => `#${rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;

const hexToHsv = (hex) => {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
  const max = Math.max(r, g, b);
  const d = max - Math.min(r, g, b);
  const h = !d ? 0 : max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return { h: (h * 60 + 360) % 360, s: max ? d / max : 0, v: max };
};

const hsvToHex = ({ h, s, v }) => {
  const f = (n) => {
    const k = (n + h / 60) % 6;
    return 255 * (v - v * s * Math.max(0, Math.min(k, 4 - k, 1)));
  };
  return rgbToHex([f(5), f(3), f(1)]);
};

// "#abc123", "abc123" or "rgb(1, 2, 3)" -> "#abc123"; anything else -> null
const parseColor = (text) => {
  const value = text.trim().toLowerCase();
  const hex = value.match(/^#?([0-9a-f]{6})$/);
  if (hex) return `#${hex[1]}`;
  const rgb = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  return rgb ? rgbToHex(rgb.slice(1, 4).map((v) => Math.min(255, Number(v)))) : null;
};

// Dark notes are written in light ink, whichever reads better.
const isDark = (hex) => {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.21;
};

// Drag (or tap) anywhere on the element; `apply` gets the pointer's position across it, 0 to 1.
const dragger = (apply) => {
  const at = (e) => {
    const box = e.currentTarget.getBoundingClientRect();
    apply(clamp01((e.clientX - box.left) / box.width), clamp01((e.clientY - box.top) / box.height));
  };
  return {
    onPointerDown: (e) => {
      e.preventDefault();
      e.currentTarget.focus();
      e.currentTarget.setPointerCapture(e.pointerId);
      at(e);
    },
    onPointerMove: (e) => {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) at(e);
    },
  };
};

const ColorPicker = ({ color, onChange }) => {
  // Hue is kept separately, so dragging through grays doesn't lose it.
  const [hsv, setHsv] = useState(() => hexToHsv(color));
  const [text, setText] = useState(color);
  const canDrop = typeof window !== "undefined" && "EyeDropper" in window;

  const choose = (next) => {
    setHsv(next);
    setText(hsvToHex(next));
    onChange(hsvToHex(next));
  };
  const chooseHex = (hex) => {
    setHsv(hexToHsv(hex));
    setText(hex);
    onChange(hex);
  };
  const drop = async () => {
    try {
      const { sRGBHex } = await new window.EyeDropper().open();
      const hex = parseColor(sRGBHex);
      if (hex) chooseHex(hex);
    } catch {} // closed without picking
  };
  const nudge = (keys, step) => (e) => {
    const change = keys[e.key];
    if (!change) return;
    e.preventDefault();
    choose(change(hsv, step));
  };

  return (
    <ColorPanel>
      <ColorField
        hue={hsv.h}
        role="slider"
        tabIndex={0}
        aria-label="Saturation and brightness"
        aria-valuetext={`${Math.round(hsv.s * 100)}% saturation, ${Math.round(hsv.v * 100)}% brightness`}
        {...dragger((x, y) => choose({ ...hsv, s: x, v: 1 - y }))}
        onKeyDown={nudge(
          {
            ArrowLeft: (c, d) => ({ ...c, s: clamp01(c.s - d) }),
            ArrowRight: (c, d) => ({ ...c, s: clamp01(c.s + d) }),
            ArrowUp: (c, d) => ({ ...c, v: clamp01(c.v + d) }),
            ArrowDown: (c, d) => ({ ...c, v: clamp01(c.v - d) }),
          },
          0.04
        )}
      >
        <PickerThumb color={color} style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%` }} />
      </ColorField>

      <PickerSide>
        <HueBar
          role="slider"
          tabIndex={0}
          aria-label="Hue"
          aria-valuemin={0}
          aria-valuemax={360}
          aria-valuenow={Math.round(hsv.h)}
          {...dragger((x) => choose({ ...hsv, h: x * 359.9 }))}
          onKeyDown={nudge(
            {
              ArrowLeft: (c, d) => ({ ...c, h: Math.max(0, c.h - d) }),
              ArrowRight: (c, d) => ({ ...c, h: Math.min(359.9, c.h + d) }),
            },
            6
          )}
        >
          <PickerThumb
            color={`hsl(${hsv.h}, 100%, 50%)`}
            style={{ left: `${(hsv.h / 360) * 100}%`, top: "50%" }}
          />
        </HueBar>
        <PickerRow>
          <HexInput
            aria-label="Hex color"
            spellCheck={false}
            maxLength={7}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              const hex = parseColor(e.target.value);
              if (hex) chooseHex(hex);
            }}
            onBlur={() => setText(color)}
          />
          {canDrop && (
            <DropperButton type="button" aria-label="Pick a color from the screen" title="Eyedropper" onClick={drop}>
              <MdColorize aria-hidden />
            </DropperButton>
          )}
        </PickerRow>
        <RgbReadout>rgb({hexToRgb(color).join(", ")})</RgbReadout>
      </PickerSide>
    </ColorPanel>
  );
};

// ---- Writing a note ----

const NoteForm = ({ turnTo }) => {
  const { draft, setDraft, post, status } = useContext(Journal);
  const [picking, setPicking] = useState(false);
  const sending = status.state === "sending";
  const ready = draft.body.trim().length > 0 && !sending;
  const left = NOTE_MAX - draft.body.length;
  const custom = !NOTE_COLORS.includes(draft.color);
  const setColor = (color) => setDraft((current) => ({ ...current, color }));
  const submit = (e) => {
    e.preventDefault();
    if (ready) post(turnTo);
  };

  return (
    <JournalForm onSubmit={submit}>
      <JournalTitle>Leave a note</JournalTitle>
      <JournalIntro>
        Say hello, recommend a book, or leave a thought for whoever comes next. Your note stays
        stuck in this journal for everyone to read.
      </JournalIntro>

      <NoteDraft color={draft.color} $dark={isDark(draft.color)}>
        <NoteInput
          aria-label="Your note"
          placeholder="Write your note…"
          maxLength={NOTE_MAX}
          value={draft.body}
          onChange={(e) => setDraft({ ...draft, body: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit(e);
          }}
        />
        {left <= 300 && <NoteCount aria-live="polite">{left} left</NoteCount>}
      </NoteDraft>

      <SignLine>
        Signed,
        <SignInput
          placeholder="your name (optional)"
          maxLength={NAME_MAX}
          value={draft.name}
          onChange={(e) => setDraft({ ...draft, name: e.target.value })}
        />
      </SignLine>

      <FormRow>
        <Swatches role="radiogroup" aria-label="Note color">
          {NOTE_COLORS.map((color) => (
            <Swatch
              key={color}
              type="button"
              role="radio"
              aria-checked={draft.color === color}
              aria-label={color}
              color={color}
              onClick={() => {
                setColor(color);
                setPicking(false);
              }}
            />
          ))}
          <CustomSwatch
            type="button"
            role="radio"
            aria-checked={custom}
            aria-expanded={picking}
            aria-label="Pick your own color"
            title="Pick your own color"
            color={custom ? draft.color : undefined}
            onClick={() => setPicking(!picking)}
          />
        </Swatches>
        <StickButton type="submit" disabled={!ready}>
          {sending ? "Sticking…" : "Stick it in"}
        </StickButton>
      </FormRow>

      {picking && <ColorPicker color={draft.color} onChange={setColor} />}

      <FormStatus role="status" error={status.state === "error"}>
        {status.state === "error" && status.message}
        {status.state === "stuck" && "Stuck! Your note is in the journal."}
      </FormStatus>
    </JournalForm>
  );
};

// ---- The notes ----

// Shorter notes are written larger.
const noteSize = (text) => (text.length <= 50 ? 1.4 : text.length <= 100 ? 1.18 : 1.02);

const noteDate = (iso) => {
  const date = new Date(iso);
  const sameYear = date.getFullYear() === new Date().getFullYear();
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: sameYear ? undefined : "numeric" });
};

const Signature = ({ note }) => (
  <NoteSign>
    <NoteDate>{noteDate(note.created_at)}</NoteDate>
    {note.name && <span>— {note.name}</span>}
  </NoteSign>
);

// A note too long for its square fades out, with a link to read the rest.
const Note = ({ note, fresh }) => {
  const { openNote } = useContext(Journal);
  const textRef = useRef(null);
  const [clipped, setClipped] = useState(false);

  useLayoutEffect(() => {
    const el = textRef.current;
    const check = () => setClipped(el.scrollHeight > el.clientHeight + 1);
    check();
    if (document.fonts) document.fonts.ready.then(check); // Caveat changes the fit
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [note.body]);

  return (
    <StickyNote
      color={note.color}
      $dark={isDark(note.color)}
      style={{ rotate: TILTS[note.id % TILTS.length] }}
      // A note that was just posted is pressed onto the page.
      initial={fresh ? { opacity: 0, scale: 1.18, y: -12 } : false}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <NoteText ref={textRef} size={noteSize(note.body)} $clipped={clipped}>
        {note.body}
      </NoteText>
      {clipped && (
        <SeeMore type="button" onClick={() => openNote(note)}>
          See more
        </SeeMore>
      )}
      <Signature note={note} />
    </StickyNote>
  );
};

// The pages after the form: the notes, newest first, six to a page.
const notePages = (notes, failed, freshId) => {
  const message = failed
    ? "The notes couldn’t be loaded right now."
    : !notes
    ? "Loading notes…"
    : !notes.length && "No notes yet. Yours could be the first.";
  if (message) return [{ id: "notes", head: "Community Journal", body: <Empty>{message}</Empty> }];

  const pages = [];
  for (let i = 0; i < notes.length; i += PER_PAGE) {
    pages.push({
      id: i === 0 ? "notes" : undefined,
      head: "Community Journal",
      body: (
        <NoteBoard>
          {notes.slice(i, i + PER_PAGE).map((note) => (
            <Note key={note.id} note={note} fresh={note.id === freshId} />
          ))}
        </NoteBoard>
      ),
    });
  }
  return pages;
};

// The Community Journal's first page, where visitors write.
export const JOURNAL_FORM = {
  title: "Leave a note",
  head: "Community Journal",
  body: ({ turnTo }) => <NoteForm turnTo={turnTo} />,
};

// Opens like any other book, with the visitors' notes added after the form.
export const CommunityJournal = ({ book, vp, ...props }) => {
  const phone = vp.w < 760;
  const [notes, setNotes] = useState(cachedNotes);
  const [failed, setFailed] = useState(false);
  const [draft, setDraft] = useState(savedDraft);
  const [status, setStatus] = useState({ state: "idle" });
  const [freshId, setFreshId] = useState(null);
  const [opened, setOpened] = useState(null); // a long note being read in full
  const freshTimer = useRef(null);

  useEffect(() => {
    savedDraft = draft;
  }, [draft]);

  useEffect(() => {
    let live = true;
    request(`select=${FIELDS}&order=created_at.desc&limit=600`)
      .then((rows) => {
        cachedNotes = rows;
        if (live) setNotes(rows);
      })
      .catch(() => live && !cachedNotes && setFailed(true));
    return () => {
      live = false;
      clearTimeout(freshTimer.current);
    };
  }, []);

  // While a note is open, Escape closes it rather than the book.
  useEffect(() => {
    if (!opened) return undefined;
    const onKey = (e) => {
      e.stopImmediatePropagation();
      if (e.key === "Escape") setOpened(null);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [opened]);

  const post = async (turnTo) => {
    setStatus({ state: "sending" });
    try {
      const [note] = await request(`select=${FIELDS}`, {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({ body: draft.body.trim(), name: draft.name.trim() || null, color: draft.color }),
      });
      cachedNotes = [note, ...(cachedNotes || [])];
      setNotes(cachedNotes);
      setFailed(false);
      setDraft({ ...EMPTY_DRAFT, color: draft.color });
      setStatus({ state: "stuck" });
      // Press the new note on once; copies drawn later (as a leaf turns) don't repeat it.
      setFreshId(note.id);
      clearTimeout(freshTimer.current);
      freshTimer.current = setTimeout(() => setFreshId(null), 1500);
      turnTo("notes");
    } catch (error) {
      setStatus({ state: "error", message: error.message });
    }
  };

  const pages = useMemo(
    () => [...book.pages, ...notePages(notes, failed, freshId)],
    [book.pages, notes, failed, freshId]
  );
  const withNotes = useMemo(() => ({ ...book, pages }), [book, pages]);

  return (
    <Journal.Provider value={{ draft, setDraft, post, status, openNote: setOpened }}>
      <OpenBook book={withNotes} vp={vp} {...props} />

      <AnimatePresence>
        {opened && (
          <Lightbox
            key="note"
            role="dialog"
            aria-label="Note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpened(null)}
          >
            <NoteFull
              color={opened.color}
              $dark={isDark(opened.color)}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.96, rotate: TILTS[opened.id % TILTS.length] }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.96 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <NoteFullText>{opened.body}</NoteFullText>
              <Signature note={opened} />
            </NoteFull>
            <CloseButton aria-label="Close note" title="Close" $compact={!phone} onClick={() => setOpened(null)}>
              <span aria-hidden>×</span>
              {phone && " Close"}
            </CloseButton>
          </Lightbox>
        )}
      </AnimatePresence>
    </Journal.Provider>
  );
};
