import classNames from 'classnames';
import { MouseEvent, useState } from 'react';
import { MdDeleteSweep } from 'react-icons/md';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { removeRenderVerseAction, RootState } from '../../store';
import { GreekWordSelectedInfo, VerseData } from '../../types/verses';
import { HtmlContainer } from '../common/HtmlContainer';
import ItemGreekDetailViewer from './ItemGreekDetailViewer';
import ItemVersionViewer from './ItemVersionViewer';
import { NT_BOOKS } from '../book-selector/books.types';

interface ViewerButtonsProps {
  handleRemoveVerse: (id: string) => void;
  verseData: VerseData;
  showAddButtons?: boolean;
}

function getViewerButtons({
  handleRemoveVerse,
  verseData,
  showAddButtons,
}: ViewerButtonsProps) {
  return (
    <>
      <button
        onClick={() => handleRemoveVerse(verseData.id)}
        className='flex items-center bg-fuchsia-100 hover:bg-fuchsia-200 border border-fuchsia-200 px-2 py-1 my-3 mx-1 ml-2'
      >
        <MdDeleteSweep className='mr-1' />
        <span className='text-xs'>Quitar versículo</span>
      </button>

      {showAddButtons ? (
        <>
          <button className='flex items-center bg-slate-200 hover:bg-sky-200 border border-slate-300 px-2 py-1 my-3 mx-1'>
            <BsFillArrowUpCircleFill className='mr-1' />
            <span className='text-xs'>Cargar versículo anterior</span>
          </button>
          <button className='flex items-center bg-slate-200 hover:bg-sky-200 border border-slate-300 px-2 py-1 my-3 mx-1'>
            <BsFillArrowDownCircleFill className='mr-1' />
            <span className='text-xs'>Cargar versículo siguiente</span>
          </button>
        </>
      ) : (
        ''
      )}
    </>
  );
}

function getGreekWordInfo(div: HTMLElement) {
  const greekWordInfo: GreekWordSelectedInfo = {
    greekTrans: div.querySelector('font.text-gray-500')?.textContent || '',
    greek: div.querySelector('grk')?.textContent || '',
    literal: div.querySelector('font.text-orange-800')?.textContent || '',
    morpho: Array.from(div.querySelectorAll('tvm'))
      .map((pp) => pp.textContent)
      .filter((pp) => pp && !pp.includes(','))
      .join('/'),
    strong: div.querySelector('num')?.textContent || '',
  };
  return greekWordInfo;
}

function VersesViewerItem({ verseData }: { verseData: VerseData }) {
  const [greekWordInfo, setGreekWordInfo] = useState<
    GreekWordSelectedInfo | undefined | null
  >();
  const renderAsExpertMode: Boolean = useSelector((state: RootState) => {
    return state.config.viewInExpertMode;
  });
  const dispatch = useDispatch();

  const classesForGreekRender = classNames(
    'm-5 md:w-2/3',
    renderAsExpertMode ? 'render-as-expert-mode' : ''
  );

  const handleRemoveVerse = (verseId: string) => {
    dispatch(removeRenderVerseAction(verseId));
  };

  const handleClickGreekWordInfo = () => {
    setGreekWordInfo(null);
  };

  const handleClickGreekContainer = (evt: MouseEvent<HTMLDivElement>) => {
    const div = evt.target as HTMLDivElement;
    if (div.classList.contains('word-block')) {
      const greekWordInfo = getGreekWordInfo(div);
      setGreekWordInfo(greekWordInfo);
    } else {
      let pElem: HTMLElement | null = div;
      let found: boolean = false;
      while (
        !found &&
        pElem &&
        pElem.tagName !== 'body' &&
        !pElem.classList.contains('main-html-container')
      ) {
        if (pElem.classList.contains('word-block')) {
          found = true;
        } else {
          pElem = pElem.parentElement;
        }
      }

      if (found && pElem) {
        const greekWordInfo = getGreekWordInfo(pElem);
        setGreekWordInfo(greekWordInfo);
      }
    }
  };

  return (
    <div
      key={verseData.id}
      className='container mt-1 border border-slate-100 hover:border-slate-400'
    >
      <div className='flex justify-between'>
        <span className='my-3 text-xs ml-3 flex items-center border border-lime-400 bg-lime-100 text-600 rounded px-2'>
          {NT_BOOKS.find((b) => b.id === verseData.path.book)?.name}{' '}
          {`${verseData.path.chapter}:${verseData.path.chapter}`}
        </span>
        <div className='flex mr-2'>
          {getViewerButtons({
            handleRemoveVerse,
            verseData,
          })}
        </div>
      </div>
      <div className='flex flex-col md:flex-row'>
        {greekWordInfo ? (
          <ItemGreekDetailViewer
            handleClose={handleClickGreekWordInfo}
            greekWordInfo={greekWordInfo}
          />
        ) : (
          ''
        )}
        <div
          className={classesForGreekRender}
          onClick={(evt) => handleClickGreekContainer(evt)}
        >
          <HtmlContainer html={verseData.greek} preProcessHtml={true} />
        </div>
        <ItemVersionViewer verseData={verseData} />
      </div>
    </div>
  );
}

export default VersesViewerItem;
