import Select from 'react-select';
import { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useLoadExternalVerses } from '../../hooks/useLoadExternalVerses';
import { RootState, updateLastSelectedVersionAction } from '../../store';
import { ExternalVerseData, VerseData } from '../../types/verses';
import { HtmlContainer } from '../common/HtmlContainer';
import axios from 'axios';

interface ItemVersionProps {
  verseData: VerseData;
}

const BIBLE_VERSIONS = [
  { value: '1909', label: 'RV1909' },
  { value: 'RVR1960', label: 'RVR1960' },
  { value: 'NBLA', label: 'NBLA' },
  { value: 'LBLA', label: 'LBLA' },
  { value: 'NTV', label: 'NTV' },
  { value: 'NVI', label: 'NVI' },
  { value: 'TLA', label: 'TLA' },
];

function ItemVersionViewer({ verseData }: ItemVersionProps) {
  // const [isFetchingSelect, setIsFetchingSelect] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [isSelectDisabled, setIsSelectDisabled] = useState<boolean>(false);
  const [currTextVerse, setCurrTextVerse] = useState<
    ExternalVerseData | undefined
  >();
  const [selectedVersion, setSelectedVersion] = useState<string | undefined>(
    ''
  );

  const multiVersion = useSelector((state: RootState) => {
    return state.verses.dataMultiversion;
  });

  const lastVersionSelected = useSelector((state: RootState) => {
    return state.config.lastVersionSelected;
  });
  const loadVerses = useLoadExternalVerses();

  const updateVerseToShow = (
    verses: ExternalVerseData | ExternalVerseData[] | undefined,
    selVersion: string
  ) => {
    if (Array.isArray(verses)) {
      const verseToShow = verses.find(
        (v: ExternalVerseData) => v.version === selVersion
      );
      if (verseToShow) {
        setCurrTextVerse(verseToShow);
      } else {
        console.log(
          '>> no selected v: ',
          verses,
          ' - selectedVersion: ',
          selVersion
        );
      }
    } else if (verses) {
      setCurrTextVerse(verses);
    } else {
      console.error('Error - Getting verses from API: ', verses);
    }
  };

  useEffect(() => {
    const getVerseData = async () => {
      const verses = await loadVerses({
        selectedBook: verseData.path.book,
        selectedChapter: verseData.path.chapter,
        selectedVerse: verseData.path.verse,
        version: lastVersionSelected,
      });
      setSelectedVersion(lastVersionSelected);
      updateVerseToShow(verses, lastVersionSelected);
    };

    if (!verseData.verse) {
      getVerseData();
    }
  }, []);

  const handleChangeVersion = async (value: string | undefined) => {
    if (!value) {
      return false;
    }
    setIsSelectDisabled(true);
    const verses = await loadVerses({
      selectedBook: verseData.path.book,
      selectedChapter: verseData.path.chapter,
      selectedVerse: verseData.path.verse,
      version: value,
    });
    setIsSelectDisabled(false);
    setSelectedVersion(value);
    updateVerseToShow(verses, value);
    dispatch(updateLastSelectedVersionAction(value));
  };

  if (verseData.verse) {
    return (
      <div>
        <div className='m-5 w-1/2 md:w-1/3'>
          <HtmlContainer className='inner-verses' html={verseData.verse} />
        </div>
      </div>
    );
  }

  if (currTextVerse) {
    return (
      <div className='m-5 w-1/2 md:w-1/3'>
        <div className='flex justify-end'>
          <Select
            key={`my_unique_select_key__${selectedVersion}`}
            value={
              BIBLE_VERSIONS.filter((opt) =>
                selectedVersion
                  ? opt.value === selectedVersion
                  : opt.value === lastVersionSelected
              ) || ''
            }
            className='basic-single w-full mr-2 text-xs mb-2'
            classNamePrefix='select'
            onChange={(evt) => handleChangeVersion(evt?.value)}
            name='versions'
            options={BIBLE_VERSIONS}
            isSearchable={false}
            isDisabled={isSelectDisabled}
            placeholder={'Seleccione...'}
          />
        </div>
        <HtmlContainer className='inner-verses' html={currTextVerse.verse} />
      </div>
    );
  }

  return (
    <div className='m-5 w-1/2 md:w-1/3'>
      <div className='flex items-center text-xs justify-center'>
        Cargando versículo{' '}
        <span className='ml-2'>
          <AiOutlineLoading3Quarters className='animate-spin' />
        </span>
      </div>
    </div>
  );
}

export default ItemVersionViewer;
