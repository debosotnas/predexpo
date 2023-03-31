export interface ExternalVerseData {
  id: string;
  version: string;
  verse: string;
}
export interface VerseData {
  id: string;
  label: string;
  verse: string;
  greek: string;
  path: {
    book: number | undefined;
    chapter: number | undefined;
    verse: number | undefined;
  };
}

export interface VersesToLoadInfo {
  selectedBook: number | undefined;
  selectedChapter: number | undefined;
  selectedVerse: number | undefined;
  version?: string;
}

export interface GreekWordSelectedInfo {
  greekTrans: string;
  greek: string;
  literal: string;
  morpho: string;
  strong: string;
}
