import { useDispatch, useSelector } from 'react-redux';
import { removeRenderVerseAction, RootState } from '../../store';
import { VerseData } from '../../types/verses';
import { HtmlContainer } from '../common/HtmlContainer';
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from 'react-icons/bs';

import { MdDeleteSweep } from 'react-icons/md';
import classNames from 'classnames';
import './VersesViewer.css';
import { IBook, NT_BOOKS } from '../book-selector/books.types';
import { MouseEvent, useState } from 'react';

interface GreekWordSelectedInfo {
  greekTrans: string;
  greek: string;
  literal: string;
  morpho: string;
  strong: string;
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

function VersesViewer() {
  const [greekWordInfo, setGreekWordInfo] = useState<
    GreekWordSelectedInfo | undefined | null
  >();
  const versesDataRendered = useSelector((state: RootState) => {
    return state.verses.dataRendered;
  });
  const renderAsExpertMode: Boolean = useSelector((state: RootState) => {
    return state.config.viewInExpertMode;
  });
  const dispatch = useDispatch();

  const classesForGreekRender = classNames(
    'm-5 w-1/2 md:w-2/3',
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
    <div>
      {versesDataRendered?.length
        ? versesDataRendered.map((verseData: VerseData) => {
            return (
              <div
                key={verseData.id}
                className='container mt-1 border border-slate-100 hover:border-slate-400'
              >
                <div className='flex'>
                  <span className='my-3 text-xs ml-3 flex items-center border border-lime-400 bg-lime-100 text-600 rounded px-2'>
                    {verseData.label}
                  </span>
                  <button
                    onClick={() => handleRemoveVerse(verseData.id)}
                    className='flex items-center bg-fuchsia-100 hover:bg-fuchsia-200 border border-fuchsia-200 px-2 py-1 my-3 mx-1 ml-2'
                  >
                    <MdDeleteSweep className='mr-1' />
                    <span className='text-xs'>Quitar versículo</span>
                  </button>
                  {/* <button className='flex items-center bg-slate-200 hover:bg-sky-200 border border-slate-300 px-2 py-1 my-3 mx-1'>
                    <BsFillArrowUpCircleFill className='mr-1' />
                    <span className='text-xs'>Cargar versículo anterior</span>
                  </button>
                  <button className='flex items-center bg-slate-200 hover:bg-sky-200 border border-slate-300 px-2 py-1 my-3 mx-1'>
                    <BsFillArrowDownCircleFill className='mr-1' />
                    <span className='text-xs'>Cargar versículo siguiente</span>
                  </button> */}
                </div>
                <div className='flex'>
                  {greekWordInfo ? (
                    <div>
                      <div>
                        <button onClick={handleClickGreekWordInfo}>
                          Close
                        </button>
                      </div>
                      <div>{greekWordInfo.greek}</div>
                      <div>{greekWordInfo.greekTrans}</div>
                      <div>{greekWordInfo.literal}</div>
                      <div>{greekWordInfo.morpho}</div>
                      <div>{greekWordInfo.strong}</div>
                    </div>
                  ) : (
                    ''
                  )}
                  <div
                    className={classesForGreekRender}
                    onClick={(evt) => handleClickGreekContainer(evt)}
                  >
                    <HtmlContainer
                      html={verseData.greek}
                      preProcessHtml={true}
                    />
                  </div>
                  <div className='m-5 w-1/2 md:w-1/3'>
                    <HtmlContainer
                      className='inner-verses'
                      html={verseData.verse}
                    />
                  </div>
                </div>
              </div>
            );
          })
        : ''}
    </div>
  );
}

export default VersesViewer;
