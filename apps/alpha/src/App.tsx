import { useEffect, useState } from 'react';
import BookSelector from './components/book-selector/BookSelector';
import VersesViewer from './components/verses-viewer/VersesViewer';

function App() {
  // const [apiResult, setApiResult] = useState<string>('');

  // const callBtn = async () => {
  //   const res = await fetch('/api');
  //   const data = await res.text();
  //   setApiResult(data);
  // };

  return (
    <div className='container mx-auto p-2 border border-color-black'>
      <h1 className='text-center'>Predicación Expositiva - Alpha Tool</h1>
      {/* <div className='card'>
        <button onClick={callBtn} className='btn btn-sm'>
          Hello api!
        </button>
      </div>
      <p className='read-the-docs'>{apiResult}</p> */}

      <BookSelector></BookSelector>
      <VersesViewer></VersesViewer>
    </div>
  );
}

export default App;
