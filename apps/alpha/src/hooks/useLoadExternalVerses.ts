import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addMultiversionAction, RootState } from '../store';
import { MultiversionStoreData } from '../store/slices/versesSlice';
import { ExternalVerseData, VersesToLoadInfo } from '../types/verses';

export function useLoadExternalVerses() {
  const dispatch = useDispatch();
  const multiVersesDataLoaded: MultiversionStoreData = useSelector(
    (state: RootState) => {
      return state.verses.dataMultiversion;
    }
  );

  const getVerses: (
    v: VersesToLoadInfo | VersesToLoadInfo[]
  ) => Promise<ExternalVerseData | ExternalVerseData[] | undefined> = async (
    versesToLoad: VersesToLoadInfo | VersesToLoadInfo[]
  ) => {
    const { selectedBook, selectedChapter, selectedVerse, version } =
      Array.isArray(versesToLoad)
        ? versesToLoad[0] //TODO: Process every verse
        : versesToLoad;

    let versesData: ExternalVerseData | undefined;
    if (Object.keys(multiVersesDataLoaded).length) {
      const versionGroup = version && multiVersesDataLoaded[version];
      if (versionGroup) {
        const searchedId = `${version}/${selectedBook}/${selectedChapter}/${selectedVerse}`;
        versesData =
          versionGroup[searchedId] &&
          Object.keys(versionGroup[searchedId]).length
            ? versionGroup[searchedId]
            : undefined;
      }
    }

    if (!versesData) {
      try {
        const { data } = await axios.get(
          `/api/bible/external/${selectedBook}/${selectedChapter}/${selectedVerse}?version=${version}`
        );
        if (Array.isArray(data)) {
          const processedVerses = data.map((v) => {
            return {
              id: v.id,
              verse: v.verse,
              version: v.version,
            };
          });
          dispatch(addMultiversionAction(processedVerses));
          return processedVerses;
        }
        versesData = {
          id: data.id,
          version: data.version,
          verse: data.verse,
        };
        dispatch(addMultiversionAction(versesData));
        // return processedVerse;
      } catch (err) {
        console.log('Error getting external verses: ', err);
        return;
      }
    }
    return versesData;
  };

  return getVerses;
}
