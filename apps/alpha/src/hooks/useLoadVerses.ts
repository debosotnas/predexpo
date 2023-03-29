import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { VerseData, VersesToLoadInfo } from '../types/verses';

export function useLoadVerses() {
  const versesDataLoaded = useSelector((state: RootState) => {
    return state.verses.dataLoaded;
  });

  const getVerses: (
    v: VersesToLoadInfo | VersesToLoadInfo[]
  ) => Promise<VerseData> = async (
    versesToLoad: VersesToLoadInfo | VersesToLoadInfo[]
  ) => {
    const { selectedBook, selectedChapter, selectedVerse } = Array.isArray(
      versesToLoad
    )
      ? versesToLoad[0] //TODO: Process every verse
      : versesToLoad;

    const verseSearchId = `${selectedBook}/${selectedChapter}/${selectedVerse}`;
    let verseData: VerseData | undefined = versesDataLoaded.find(
      (verse: VerseData) => verse.id === verseSearchId
    );
    if (!verseData) {
      const { data } = await axios.get(
        `/api/bible/${selectedBook}/${selectedChapter}/${selectedVerse}`
      );
      verseData = {
        id: data.id,
        greek: data.greek,
        verse: data.verse,
      };
    }
    return verseData;
  };

  return getVerses;
}
