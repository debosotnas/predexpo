import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { VerseData, VersesToLoadInfo } from '../types/verses';

export function useLoadVerses() {
  const versesDataLoaded = useSelector((state: RootState) => {
    return state.verses.dataLoaded;
  });

  const getVerses: (
    v: VersesToLoadInfo
  ) => Promise<VerseData[] | undefined> = async (
    versesToLoad: VersesToLoadInfo
  ) => {
    const {
      selectedBook,
      selectedChapter,
      selectedVerse,
      selectedDestChapter,
      selectedDestVerse,
      amountVerses,
    } = versesToLoad;

    // const verseSearchId = `${selectedBook}/${selectedChapter}/${selectedVerse}`;
    let verseData: VerseData[];
    // TODO: Cache if is needed for greek
    // let verseData: VerseData[] | undefined = versesDataLoaded.find(
    //   (verse: VerseData) => verse.id === verseSearchId
    // );
    // Get verse from DB if it wasn't previously loaded
    // if (!verseData) {
    try {
      const { data } = await axios.get(
        `/api/bible/${selectedBook}/${selectedChapter}/${selectedVerse}?amountVerses=${amountVerses}`
      );
      if (data && data.length) {
        verseData = data.map((verseObj: any) => {
          return {
            id: verseObj.id,
            label: data.label,
            greek: data.greek,
            verse: data.verse,
            path: {
              ...verseObj.path,
            },
          };
        });
      } else {
        verseData = [
          {
            id: data.id,
            label: data.label,
            greek: data.greek,
            verse: data.verse,
            path: {
              book: selectedBook,
              chapter: selectedChapter,
              verse: selectedVerse,
            },
          },
        ];
      }
    } catch (err) {
      return;
    }
    // }
    return verseData;
  };

  return getVerses;
}
