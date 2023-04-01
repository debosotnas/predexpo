import { useRef } from 'react';
import { FaRegWindowClose } from 'react-icons/fa';
import { AiOutlineSound } from 'react-icons/ai';

interface GreekDetailProps {
  handleClose: () => void;
  greekWordInfo: any;
}

const MIN_DESKTOP_SIZE = 1024;

function GetDeviceContainer({ children }: any) {
  const width = window.innerWidth;
  if (width < MIN_DESKTOP_SIZE) {
    return (
      <div className='fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-50 flex justify-center items-center backdrop-blur-sm z-50'>
        {children}
      </div>
    );
  }
  return <>{children}</>;
}

function ItemGreekDetailViewer({
  handleClose,
  greekWordInfo,
}: GreekDetailProps) {
  const strongNumber = String(greekWordInfo.strong).substring(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayAudio = () => {
    if (audioRef.current !== null) {
      audioRef.current.play();
    }
  };
  return (
    <GetDeviceContainer>
      <div className='m-5 w-1/2 md:w-1/4 bg-blue-100 p-2 py-5 relative'>
        <div className='flex justify-end absolute top-1 right-1'>
          <button
            className='border border-slate-300 bg-slate-100 px-2 py-1 flex items-center gap-2 rounded'
            onClick={handleClose}
          >
            {<FaRegWindowClose />}
          </button>
        </div>
        <div className='text-xl my-2 text-center'>
          <audio
            ref={audioRef}
            // itemRef={audioRef}
            src={`https://www.studylight.org/multi-media/audio/lexicons/eng/greek.html?n=${strongNumber}`}
          ></audio>
          {greekWordInfo.greek}
        </div>
        <div>
          <div className='text-slate-500'>
            Pronunciación
            <button
              className='text-base ml-1 text-sky-800 hover:text-sky-600'
              onClick={handlePlayAudio}
            >
              <AiOutlineSound />
            </button>
          </div>
          <div className='text-base ml-2'>{greekWordInfo.greekTrans}</div>
        </div>

        <div>
          <div className='text-slate-500'>Traducción literal:</div>
          <div className='text-base ml-2'>{greekWordInfo.literal}</div>
        </div>

        <div>
          <div className='text-slate-500'>Morfología:</div>
          <div className='text-base ml-2'>{greekWordInfo.morpho}</div>
        </div>

        <div>
          <div className='text-slate-500'>Strong:</div>
          <div className='text-base ml-2'>{greekWordInfo.strong}</div>
        </div>

        <div>
          <div className='text-slate-500'>Más info:</div>
          <div className='text-sm'>
            <ul className='ml-2'>
              <li className='mt-1'>
                <a
                  className='link text-sky-800 hover:text-sky-600'
                  target={'_blank'}
                  href={`https://www.logosklogos.com/strongcodes/${strongNumber}`}
                >
                  LogosKLogos
                </a>
              </li>
              <li className='mt-1'>
                <a
                  className='link text-sky-800 hover:text-sky-600'
                  target={'_blank'}
                  href={`https://bibliaparalela.com/greek/${strongNumber}.htm`}
                >
                  Biblia Paralela
                </a>
              </li>
              <li className='mt-1'>
                <a
                  className='link text-sky-800 hover:text-sky-600'
                  target={'_blank'}
                  href={`https://www.blueletterbible.org/lexicon/${greekWordInfo.strong}/kjv/tr/0-1/`}
                >
                  Blue Letter
                </a>
              </li>
              <li className='mt-1'>
                <a
                  className='link text-sky-800 hover:text-sky-600'
                  target={'_blank'}
                  href={`https://www.studylight.org/lexicons/eng/greek/${greekWordInfo.strong}.html`}
                >
                  Study Light
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </GetDeviceContainer>
  );
}

export default ItemGreekDetailViewer;
