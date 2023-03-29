export interface ScriptureApiVerseData {
  id: string;
  orgId: string;
  reference: string;
  content: string;
}

export interface ExternalVerseResponse {
  id: string;
  verse: string;
}

export interface DataVerseResponse {
  id: string;
  greek: string;
  verse: string;
  // verse: ExternalVerseResponse;
}
