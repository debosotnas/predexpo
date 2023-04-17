import { useState } from 'react';
import { InterlinealTool } from './components/interlineal-tool/InterlinealTool';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';
import { PreachTool } from './components/preach-tool/PreachTool';

function App() {
  const [showInterlinealTool, setShowInterlinealTool] = useState(false);

  return (
    <div className='p-2 border border-color-black bg-white'>
      <h1 className='text-center flex justify-center relative'>
        <img
          className='h-20'
          src='./alpha-logo.svg'
          alt='Predicación Expositiva'
        />
        <button
          onClick={() => {
            setShowInterlinealTool(!showInterlinealTool);
          }}
          className='absolute right-0 bottom-0 flex items-center btn btn-xs mb-1'
        >
          {showInterlinealTool ? (
            <>
              <RxEyeOpen className='mr-2' /> Ocultar Interlineal
            </>
          ) : (
            <>
              <RxEyeClosed className='mr-2' /> Ver Interlineal
            </>
          )}
        </button>
      </h1>
      {showInterlinealTool ? <InterlinealTool /> : ''}

      <PreachTool />
    </div>
  );
}

export default App;
