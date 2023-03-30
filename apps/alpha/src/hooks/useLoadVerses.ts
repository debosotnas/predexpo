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
  ) => Promise<VerseData | undefined> = async (
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
    // Get verse from DB if it wasn't previously loaded
    if (!verseData) {
      try {
        const { data } = await axios.get(
          `/api/bible/${selectedBook}/${selectedChapter}/${selectedVerse}`
        );
        verseData = {
          id: data.id,
          label: data.label,
          greek: data.greek,
          verse: data.verse,
        };
      } catch (err) {
        return;
      }
    }
    return verseData;
  };

  return getVerses;
}
