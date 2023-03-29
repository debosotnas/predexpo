import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { VerseData } from '../../types/verses';
import { HtmlContainer } from '../common/HtmlContainer';

function VersesViewer() {
  const versesDataRendered = useSelector((state: RootState) => {
    return state.verses.dataRendered;
  });

  return (
    <div>
      {versesDataRendered?.length
        ? versesDataRendered.map((verseData: VerseData) => {
            return (
              <div key={verseData.id} className='container p-2'>
                <div className='p-5'>
                  <HtmlContainer html={verseData.greek} />
                </div>
                <div className='p-5'>
                  <HtmlContainer html={verseData.verse} />
                </div>
              </div>
            );
          })
        : ''}
    </div>
  );
}

export default VersesViewer;
