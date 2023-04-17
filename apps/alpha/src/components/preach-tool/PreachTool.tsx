import classNames from 'classnames';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export function PreachTool() {
  const [animatedCompleted, setAnimatedCompleted] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const wrapperClasses = classNames(
    'flex items-center justify-center transition-all',
    started ? 'h-14' : 'h-96'
  );
  const imageClasses = classNames(
    'absolute z-0 -top-36 -left-36 transition-opacity',
    started ? 'opacity-0' : '',
    animatedCompleted ? 'hidden' : ''
  );

  return (
    <div className={wrapperClasses}>
      <div className='relative'>
        <img className={imageClasses} src='./images/start-es.svg' alt='' />
        <div className='relative z-10 flex w-96 items-center'>
          <input
            type='text'
            placeholder='por ej. 1 Juan 1:1-5 ó Rom. 1:28'
            className='input input-bordered input-info w-full'
          />
          <button
            onClick={() => {
              setStarted(true);
              setTimeout(() => {
                setAnimatedCompleted(true);
              }, 500);
            }}
            className='btn btn-accent ml-2'
          >
            {started ? 'Iniciar nuevo' : 'Iniciar!'}
          </button>
          {loading ? (
            <AiOutlineLoading3Quarters className='animate-spin w-20' />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}
