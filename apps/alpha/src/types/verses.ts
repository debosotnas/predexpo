export interface VerseData {
  id: string;
  verse: string;
  greek: string;
}

export interface VersesToLoadInfo {
  selectedBook: number | undefined;
  selectedChapter: number | undefined;
  selectedVerse: number | undefined;
}