import React from "react";
import profile from "../../assets/profile.jpg";
import {
  Album,
  Asterism,
  BookLink,
  Body,
  Caption,
  ContentsItem,
  Empty,
  Goals,
  Indent,
  Lead,
  Leader,
  Opener,
  OpenerKicker,
  OpenerRule,
  OpenerTitle,
  Para,
  Pending,
  Plate,
  PlateFrame,
  PlateImage,
  Quote,
  QuoteSource,
  SectionHead,
  Snapshot,
  SnapshotCaption,
  SnapshotImage,
} from "./Book.styles";

const AUTHOR = "Brian K. Mason";
const external = { target: "_blank", rel: "noopener noreferrer" };

// ---- Fill these in; each book's pages are built from them. ----

// Favorite quotes: { text, source }
const QUOTES = [];

// Writing: { title, date, url }
const WRITING = [];

// Photos for the album: { src, caption }. Import images from src/assets.
const PHOTOS = [{ src: profile, caption: "Bethesda, Maryland." }];

// 2026 goals by area (from the Goals page).
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

// ---- Pages ----

const opener = (kicker, title) => (
  <Opener>
    <OpenerKicker>{kicker}</OpenerKicker>
    <OpenerTitle>{title}</OpenerTitle>
    <OpenerRule />
  </Opener>
);

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

const goalsPage = (
  <Body>
    {GOALS_2026.map(({ area, goals }) => (
      <React.Fragment key={area}>
        <SectionHead>{area}</SectionHead>
        {goals.length ? (
          <Goals>
            {goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </Goals>
        ) : (
          <Pending>To come.</Pending>
        )}
      </React.Fragment>
    ))}
  </Body>
);

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

const writingPage = WRITING.length ? (
  <Body>
    {WRITING.map(({ title, date, url }) => (
      <ContentsItem key={title} href={url} {...external}>
        <span>{title}</span>
        <Leader />
        <span>{date}</span>
      </ContentsItem>
    ))}
  </Body>
) : (
  <Empty>Coming soon.</Empty>
);

// Alternate the tilt so the prints look hand-placed.
const albumPage = (
  <Album>
    {PHOTOS.map(({ src, caption }, i) => (
      <Snapshot key={caption + i} wide={PHOTOS.length === 1} tilt={i % 2 ? 1.6 : -1.4}>
        <SnapshotImage src={src} alt={caption} />
        <SnapshotCaption>{caption}</SnapshotCaption>
      </Snapshot>
    ))}
  </Album>
);

// The About Me section of the shelf. Each book is a list of two-page spreads;
// `title` labels the page-turn link that leads to that spread.
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
    spreads: [
      {
        title: "About Me",
        left: {
          head: AUTHOR,
          body: (
            <Plate>
              <PlateFrame>
                <PlateImage src={profile} alt="Brian Mason" />
              </PlateFrame>
              <Caption>The author, Bethesda, Maryland.</Caption>
            </Plate>
          ),
        },
        right: { head: "About Me", body: aboutPage },
      },
      {
        title: "2026 Goals",
        left: { head: AUTHOR, body: opener("II", "2026 Goals") },
        right: { head: "2026 Goals", body: goalsPage },
      },
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
    spreads: [
      {
        title: "Favorite Quotes",
        left: { head: AUTHOR, body: opener(AUTHOR, "Favorite Quotes") },
        right: { head: "Favorite Quotes", body: quotesPage },
      },
    ],
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
    spreads: [
      {
        title: "Writing",
        left: { head: AUTHOR, body: opener(AUTHOR, "Writing") },
        right: { head: "Contents", body: writingPage },
      },
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
    spreads: [
      {
        title: "Photo Album",
        left: { head: AUTHOR, body: opener(AUTHOR, "Photo Album") },
        right: { head: "Photographs", body: albumPage },
      },
    ],
  },
];
