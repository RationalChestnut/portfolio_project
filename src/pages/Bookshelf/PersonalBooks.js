import React from "react";
import profile from "../../assets/profile.jpg";
import { PIECES } from "./writing";import {
  Asterism,
  BookLink,
  Body,
  Bullets,
  Caption,
  Compact,
  ContentsEntry,
  ContentsGroup,
  ContentsMeta,
  ContentsTitle,
  Done,
  Empty,
  Goals,
  Indent,
  Lead,
  Leader,
  Opener,
  OpenerDate,
  OpenerKicker,
  OpenerRule,
  OpenerSub,
  OpenerTitle,
  PageNote,
  Para,
  Pending,
  PhotoCorner,
  Plate,
  PlateFrame,
  PlateImage,
  Print,
  PrintImage,
  PrintRow,
  Prose,
  Quote,
  QuoteSource,
  Scrapbook,
  SeasonTitle,
  SectionHead,
  SourceNote,
  SubHead,
  Tape,
  Verse,
} from "./Book.styles";

const AUTHOR = "Brian K. Mason";
const EMAIL = "brian.kw.mason@gmail.com";
// Where the profile photo was taken.
const PHOTO_PLACE = "Pisgah National Forest, North Carolina";
const external = { target: "_blank", rel: "noopener noreferrer" };

// ---- Fill these in; each book's pages are built from them. ----

// Favorite quotes: { text, source }
const QUOTES = [];

// Photo album, by season. Photos live in public/album; `ratio` is width / height.
const album = (name) => `${process.env.PUBLIC_URL}/album/${name}.jpg`;
const season = (name, ratios) =>
  ratios.map((ratio, i) => ({ src: album(`${name}-${String(i + 1).padStart(2, "0")}`), ratio }));
const ALBUM = [
  {
    season: "Spring",
    photos: season("spring", [0.751, 1.332, 0.751, 0.642, 0.751, 0.562, 1.332, 0.751, 0.751, 0.751, 0.751, 0.562, 0.751, 0.751, 1.332, 0.751, 0.751, 0.751, 1.332, 0.751]),
  },
  {
    season: "Summer",
    photos: season("summer", [1.332, 0.751, 0.751, 0.751, 1.332, 0.751, 0.751, 0.751, 1.332, 0.751, 0.751, 0.751, 1.332, 1.332, 0.751, 0.562, 1.332, 0.751]),
  },
];

// Goals by area. A goal is text, or { text, done: true } once it's reached.

// 2026 goals (from the Goals page).
const GOALS_2026 = [
  {
    area: "Adventure",
    goals: [
      "Learn to sing",
      "Perform improv at 3 different venues",
      "Travel somewhere new for spring break",
    ],
  },
  { area: "Work", goals: [] },
  { area: "Relationships", goals: [] },
  { area: "Health & Fitness", goals: [] },
  { area: "Misc.", goals: [] },
];

// 2025 goals (from the site's earlier home page).
const GOALS_2025 = [
  {
    area: "Fitness",
    goals: [
      "Qualify for the Boston Marathon (2:55). Current best time: 3:17",
      "Bench 225. Current 1 rep max: 215",
      "Survive an Iron Man (thriving is for next year)",
      "Weigh 165 at 11% body fat (currently 150 at 11%)",
      "Learn to backflip",
    ],
  },
  {
    area: "Academic",
    goals: [{ text: "Find a subject I love (philosophy)", done: true }, "Average B or B+"],
  },
  {
    area: "Work",
    goals: [
      { text: "Find a co-founder", done: true },
      "Make 1M revenue",
      "Learn how a great company operates",
      "Learn how to make products explode on social media",
    ],
  },
  {
    area: "Relationships",
    goals: [
      "Call 1 high school friend a week",
      { text: "Find a girl I love", done: true },
      { text: "Go on a spring break trip", done: true },
      "Become acquaintances with ~7.5% of Duke's class (120 people)",
      { text: "Find 20 friends I love", done: true },
    ],
  },
  {
    area: "Misc.",
    goals: [
      "Organize a Hamilton Karaoke Night at Duke",
      'Read 6 "great" books',
      "Read 26 books",
    ],
  },
];

// ---- About Me ----

const aboutPage = (
  <Body>
    <Lead>
      My name is Brian Mason. I grew up in Bethesda, Maryland. I love being
      active — running, lifting, tennis, spikeball — reading, writing, and
      playing guitar. I’m incredibly competitive, have an addictive
      personality, and am the type of person who constantly has a scheme for
      improving his own life.
    </Lead>
    <Indent>My top three life goals:</Indent>
    <Goals>
      <li>Be surrounded by the people I love</li>
      <li>Produce things that are a reflection of who I am</li>
      <li>Live a storyful life</li>
    </Goals>
    <Asterism>***</Asterism>

    <SectionHead>Currently</SectionHead>
    <Para>
      Head of Engineering at{" "}
      <BookLink href="https://www.differenthealth.com/" {...external}>
        Different Health
      </BookLink>
      . Studying Math at Duke University.
    </Para>

    <SectionHead>Previously</SectionHead>
    <Para>
      Founded an app ranked 21st on the Google Play Store. Founding Engineer
      at{" "}
      <BookLink href="https://www.pathfindercard.com/" {...external}>
        Pathfinder
      </BookLink>
      .
    </Para>
  </Body>
);

// Headed lists of goals, one per area.
const goalAreas = (areas) =>
  areas.map(({ area, goals }) => (
    <React.Fragment key={area}>
      <SectionHead>{area}</SectionHead>
      {goals.length ? (
        <Goals>
          {goals.map((goal) => {
            const { text, done } = typeof goal === "string" ? { text: goal } : goal;
            return (
              <li key={text}>
                {text}
                {done && <Done aria-label="done">✓</Done>}
              </li>
            );
          })}
        </Goals>
      ) : (
        <Pending>To come.</Pending>
      )}
    </React.Fragment>
  ));

// ---- Favorite Quotes ----

const quotesPage = QUOTES.length ? (
  <Body>
    {QUOTES.map(({ text, source }) => (
      <Quote key={text}>
        “{text}”<QuoteSource>{source}</QuoteSource>
      </Quote>
    ))}
  </Body>
) : (
  <Empty>Coming soon.</Empty>
);

// ---- Writing ----

const runsToJsx = (runs) =>
  runs.map((run, i) =>
    typeof run === "string" ? (
      run
    ) : (
      <BookLink key={i} href={run[1]} {...external}>
        {run[0]}
      </BookLink>
    )
  );

// Consecutive list items -> a tree, nesting each item under the one above it.
const listTree = (items) => {
  const root = [];
  const stack = [{ level: -1, children: root }];
  for (const item of items) {
    const node = { runs: item.runs, children: [] };
    while (stack[stack.length - 1].level >= item.level) stack.pop();
    stack[stack.length - 1].children.push(node);
    stack.push({ level: item.level, children: node.children });
  }
  return root;
};

const renderList = (nodes) => (
  <Bullets>
    {nodes.map((node, i) => (
      <li key={i}>
        {runsToJsx(node.runs)}
        {node.children.length > 0 && renderList(node.children)}
      </li>
    ))}
  </Bullets>
);

// A piece's blocks as page content. Its opening paragraph gets the drop cap.
const renderPiece = (piece) => {
  const out = [];
  const { blocks } = piece;
  for (let i = 0; i < blocks.length; ) {
    const block = blocks[i];
    if (block.t === "li") {
      const items = [];
      while (i < blocks.length && blocks[i].t === "li") items.push(blocks[i++]);
      out.push(<React.Fragment key={`list-${i}`}>{renderList(listTree(items))}</React.Fragment>);
      continue;
    }
    const content = runsToJsx(block.runs);
    if (block.t === "h") out.push(<SectionHead key={i}>{content}</SectionHead>);
    else if (block.t === "h2") out.push(<SubHead key={i}>{content}</SubHead>);
    else if (block.t === "line") out.push(<Verse key={i}>{content}</Verse>);
    else if (i === 0) out.push(<Lead key={i}>{content}</Lead>);
    else out.push(<Prose key={i}>{content}</Prose>);
    i += 1;
  }
  if (piece.url) {
    out.push(
      <SourceNote key="source">
        Originally published on{" "}
        <BookLink href={piece.url} {...external}>
          Substack
        </BookLink>
        .
      </SourceNote>
    );
  }
  return out;
};

const pieceOpener = (piece) => (
  <Opener>
    <OpenerKicker>{piece.kind}</OpenerKicker>
    <OpenerTitle>{piece.title}</OpenerTitle>
    <OpenerRule />
    <OpenerDate>{piece.date}</OpenerDate>
    {piece.subtitle && <OpenerSub>{piece.subtitle}</OpenerSub>}
  </Opener>
);

const GROUPS = [...new Set(PIECES.map((piece) => piece.group))];

const contentsPage = ({ folioOf, turnTo }) => (
  <Body>
    {GROUPS.map((group) => (
      <React.Fragment key={group}>
        <ContentsGroup>{group}</ContentsGroup>
        {PIECES.filter((piece) => piece.group === group).map((piece) => (
          <ContentsEntry key={piece.id} onClick={() => turnTo(piece.id)}>
            <span>
              <ContentsTitle>{piece.title}</ContentsTitle>
              <ContentsMeta>{piece.date}</ContentsMeta>
            </span>
            {folioOf(piece.id) && (
              <>
                <Leader />
                <span>{folioOf(piece.id)}</span>
              </>
            )}
          </ContentsEntry>
        ))}
      </React.Fragment>
    ))}
  </Body>
);

// ---- Photo Album ----

// Usable text area of a page, in em (the same at every screen size).
const PAGE_W = 30;
const PAGE_H = 37.5;
const TILTS = [-3, 2.2, -1.6, 2.8, -2.4, 1.4];
const TAPES = [
  "rgba(214, 168, 152, 0.82)",
  "rgba(186, 201, 170, 0.82)",
  "rgba(232, 205, 141, 0.85)",
  "rgba(168, 190, 207, 0.82)",
];
const CORNERS = ["top-left", "top-right", "bottom-left", "bottom-right"];

// Split a season's photos into pages: three under the season title, then four
// per page, never leaving a page with a single photo.
const albumChunks = (photos) => {
  const chunks = [photos.slice(0, 3)];
  for (let i = 3; i < photos.length; i += 4) chunks.push(photos.slice(i, i + 4));
  const last = chunks[chunks.length - 1];
  if (chunks.length > 1 && last.length === 1) last.unshift(chunks[chunks.length - 2].pop());
  return chunks;
};

// Two prints per row (one per row when a page has just one or two), sized so the
// whole page fits; a few use photo corners instead of tape. Clicking a print
// opens the photo full size.
const albumPage = (photos, title, seasonName, startIndex, showPhoto) => {
  const perRow = photos.length <= 2 ? 1 : 2;
  const rows = [];
  for (let i = 0; i < photos.length; i += perRow) rows.push(photos.slice(i, i + perRow));
  const rowHeight = (row) => {
    const share = row.length === 1 ? 0.7 : 0.9;
    const ratios = row.reduce((sum, photo) => sum + photo.ratio, 0);
    return Math.min(19, (PAGE_W * share - (row.length - 1) * 1.6) / ratios);
  };
  const natural = rows.map(rowHeight);
  const needed = natural.reduce((sum, h) => sum + h + 0.9, 0) + 1.8 * (rows.length - 1);
  const fit = Math.min(1, (PAGE_H - (title ? 4.2 : 0)) / needed);

  let n = startIndex;
  return (
    <Scrapbook>
      {title && <SeasonTitle>{title}</SeasonTitle>}
      {rows.map((row, r) => (
        <PrintRow key={r}>
          {row.map((photo) => {
            const k = n++;
            const width = ((natural[r] * fit * photo.ratio + 0.9) / PAGE_W) * 100;
            const alt = `${seasonName} photo ${k - startIndex + 1}`;
            const open = () => showPhoto({ src: photo.src, alt });
            return (
              <Print
                key={photo.src}
                width={width}
                tilt={TILTS[k % TILTS.length]}
                role="button"
                tabIndex={0}
                aria-label={`Open ${alt}`}
                onClick={open}
                onKeyDown={(e) => e.key === "Enter" && open()}
              >
                {k % 3 === 2 ? (
                  CORNERS.map((at) => <PhotoCorner key={at} at={at} />)
                ) : (
                  <Tape color={TAPES[k % TAPES.length]} tilt={k % 2 ? 3 : -2} />
                )}
                <PrintImage src={photo.src} alt={alt} loading="lazy" />
              </Print>
            );
          })}
        </PrintRow>
      ))}
    </Scrapbook>
  );
};

const albumPages = ALBUM.flatMap(({ season: name, photos }) => {
  let start = 0;
  return albumChunks(photos).map((chunk, c) => {
    const first = start;
    const page = {
      title: c === 0 ? name : undefined,
      head: name,
      body: ({ showPhoto }) => albumPage(chunk, c === 0 ? name : null, name, first, showPhoto),
    };
    start += chunk.length;
    return page;
  });
});

// ---- The books ----

// The About Me section of the shelf. Each book is a list of pages; see Book.js.
export const PERSONAL = [
  {
    title: "About Me",
    author: AUTHOR,
    color: "#6f5844",
    ink: "#f1e7d8",
    w: 52,
    h: 440,
    ratio: 0.74,
    font: "serifCaps",
    bands: true,
    pages: [
      {
        title: "About Me",
        head: AUTHOR,
        body: (
          <Plate>
            <PlateFrame>
              <PlateImage src={profile} alt="Brian Mason" />
            </PlateFrame>
            <Caption>{PHOTO_PLACE}.</Caption>
          </Plate>
        ),
      },
      {
        head: "About Me",
        body: aboutPage,
        foot: <PageNote href={`mailto:${EMAIL}`}>{EMAIL}</PageNote>,
      },
      // One year per page; Compact keeps a full year on a single page.
      { title: "Goals", head: "2026 Goals", body: <Compact>{goalAreas(GOALS_2026)}</Compact> },
      { head: "2025 Goals", body: <Compact>{goalAreas(GOALS_2025)}</Compact> },
    ],
  },
  {
    title: "Favorite Quotes",
    author: AUTHOR,
    color: "#34503f",
    ink: "#ece4cf",
    w: 24,
    h: 372,
    ratio: 0.7,
    font: "serif",
    bands: true,
    pages: [{ head: "Favorite Quotes", body: quotesPage }],
  },
  {
    title: "Writing",
    author: AUTHOR,
    color: "#2d3b54",
    ink: "#efe6d2",
    w: 40,
    h: 408,
    ratio: 0.72,
    font: "serifCaps",
    bands: true,
    // The first piece's title page sits beside Contents; later pieces start a new spread.
    pages: [
      { title: "Contents", head: "Contents", body: contentsPage },
      ...PIECES.flatMap((piece, n) => [
        { id: piece.id, title: piece.title, newSpread: n > 0, head: AUTHOR, body: pieceOpener(piece) },
        { head: piece.title, flow: renderPiece(piece) },
      ]),
    ],
  },
  {
    title: "Photo Album",
    author: AUTHOR,
    color: "#6e2b2b",
    ink: "#f2e5cf",
    w: 46,
    h: 392,
    ratio: 0.8,
    font: "serifCaps",
    bands: true,
    pages: albumPages,
  },
];
