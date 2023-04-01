import { useEffect, useState } from 'react';
import BookSelector from './components/book-selector/BookSelector';
import VersesViewer from './components/verses-viewer/VersesViewer';

function App() {
  return (
    <div className='container mx-auto p-2 border border-color-black bg-white'>
      <h1 className='text-center flex justify-center'>
        <img
          className='h-20'
          src='./alpha-logo.svg'
          alt='Predicación Expositiva'
        />
      </h1>
      <BookSelector></BookSelector>
      <VersesViewer></VersesViewer>
    </div>
  );
}

export default App;
