import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { VerseData } from '../../types/verses';

import './VersesViewer.css';
import VersesViewerItem from './VersesViewerItem';

function VersesViewer() {
  const versesDataRendered = useSelector((state: RootState) => {
    return state.verses.dataRendered;
  });

  return (
    <div>
      {versesDataRendered?.length
        ? versesDataRendered.map((verseData: VerseData, idx: number) => {
            return (
              <VersesViewerItem
                key={`${verseData.id}-${idx}`}
                verseData={verseData}
              />
            );
          })
        : ''}
    </div>
  );
}

export default VersesViewer;
