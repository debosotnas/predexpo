import { FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useLoadVerses } from '../../hooks/useLoadVerses';
import {
  addVersesAction,
  RootState,
  setExpertViewModeAction,
} from '../../store';
import { IBook, NT_BOOKS } from './books.types';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { VersesToLoadInfo } from '../../types/verses';

const numVersToLoad = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
  { value: 7, label: 7 },
  { value: 8, label: 8 },
  { value: 9, label: 9 },
  { value: 10, label: 10 },
];

// function validateMultiVerses(versesToLoad: VersesToLoadInfo): Boolean { }

function BookSelectorMulti() {
  const [formDisabled, setFormDisabled] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<number | undefined>(0);
  const [selectedChapter, setSelectedChapter] = useState<number | undefined>();
  const [selectedVerse, setSelectedVerse] = useState<number | undefined>();
  const [amountVerses, setAmountVerses] = useState<number | undefined>(1);
  //--------
  const [selectedDestChapter, setSelectedDestChapter] = useState<
    number | undefined
  >();
  const [selectedDestVerse, setSelectedDestVerse] = useState<
    number | undefined
  >();
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();
  const loadVerses = useLoadVerses();

  const [errors, setErrors] = useState<string[]>([]);

  const renderAsExpertMode: boolean = useSelector((state: RootState) => {
    return state.config.viewInExpertMode;
  });

  const handleSubmitForm = async (evt?: FormEvent<HTMLFormElement>) => {
    evt && evt.preventDefault();

    const errs = [];
    if (!selectedBook) {
      errs.push('Selecciona un libro');
    }
    if (!selectedChapter) {
      errs.push('Selecciona un capítulo');
    }
    if (!selectedVerse) {
      errs.push('Selecciona un versículo');
    }
    if (selectedDestChapter && !selectedDestVerse) {
      errs.push('Selecciona un versículo de destino');
    } else if (!selectedDestChapter && selectedDestVerse) {
      errs.push('Selecciona un capítulo de destino');
    }

    if (
      selectedDestChapter &&
      selectedChapter &&
      selectedDestVerse &&
      selectedVerse
    ) {
      if (selectedDestChapter < selectedChapter) {
        errs.push(
          'El cap. inicial debe ser mayor o igual que el cap. de destino'
        );
      }
      if (
        selectedDestChapter === selectedChapter &&
        selectedDestVerse < selectedVerse
      ) {
        errs.push(
          'El vers. inicial debe ser mayor o igual que el vers. de destino'
        );
      }
    }

    if (errs.length) {
      setErrors(errs);
      return;
    }
    setFormDisabled(true);
    setErrors(errs);

    console.log(
      '----> selectedChapter: ',
      selectedChapter,
      ' - selectedVerse: ',
      selectedVerse
    );

    const versesToLoad: VersesToLoadInfo = {
      selectedBook,
      selectedChapter,
      selectedVerse,
      selectedDestVerse,
      selectedDestChapter,
      amountVerses,
    };

    // if (!validateMultiVerses(versesToLoad)) {
    //   // ajustar para validar segun cantidad de versiculos elegidos
    //   errs.push(
    //     'El vers. inicial debe ser mayor o igual que el vers. de destino'
    //   );
    // }

    const verse = await loadVerses(versesToLoad);
    setFormDisabled(false);
    if (!verse || (Array.isArray(verse) && !verse.length)) {
      setErrors(['El versículo no fue encontrado']);
      return;
    }
    setErrors([]);
    setSelectedBook(0);
    setSelectedChapter(undefined);
    setSelectedVerse(undefined);
    setSelectedDestChapter(undefined);
    setSelectedDestVerse(undefined);
    dispatch(addVersesAction(verse));
  };

  const ntOptions = NT_BOOKS.map((book: IBook) => ({
    value: book.id,
    label: book.name,
  }));

  const setChangeNumber = (
    val: string | undefined,
    updater: (v: number) => void
  ) => {
    updater(Number(val));
  };

  const handleConfigExpertMode = () => {
    dispatch(setExpertViewModeAction(!renderAsExpertMode));
  };

  const handleClickFormSubmit = () => {
    handleSubmitForm();
  };

  return (
    <div className='container flex flex-col md:flex-row justify-between bg-slate-100 p-2'>
      <div className=''>
        <form ref={formRef} onSubmit={handleSubmitForm}>
          <div className='flex flex-row items-center'>
            <div className='flex flex-col'>
              <div className='flex items-center'>
                <span className='mr-2'>Libro:</span>
                <Select
                  key={`my_unique_select_key__${selectedBook}`}
                  value={
                    ntOptions.filter((opt) => opt.value === selectedBook) || ''
                  }
                  className='basic-single w-40 mr-2'
                  classNamePrefix='select'
                  onChange={(evt) => setSelectedBook(evt?.value)}
                  isSearchable={true}
                  name='books'
                  options={ntOptions}
                  placeholder={'Seleccione...'}
                />
                {/* </div> */}
                {/* <div className='mr-2 flex gap-2 mt-1'> */}
                <div>
                  {/* <span className='mr-2'>Desde:</span> */}
                  <input
                    value={selectedChapter ? selectedChapter : ''}
                    onChange={(evt) =>
                      setChangeNumber(evt?.target?.value, setSelectedChapter)
                    }
                    disabled={formDisabled}
                    type='text'
                    className='input input-bordered bg-white input-xs w-10 h-10'
                  />
                  <span className='mx-1'>:</span>
                  <input
                    value={selectedVerse ? selectedVerse : ''}
                    onChange={(evt) =>
                      setChangeNumber(evt?.target?.value, setSelectedVerse)
                    }
                    disabled={formDisabled}
                    type='text'
                    className='input input-bordered bg-white input-xs w-10 h-10'
                  />
                </div>
                {/* <div>
                  <span className='mr-2'>Hasta:</span>
                  <input
                    value={selectedDestChapter ? selectedDestChapter : ''}
                    onChange={(evt) =>
                      setChangeNumber(
                        evt?.target?.value,
                        setSelectedDestChapter
                      )
                    }
                    disabled={formDisabled}
                    type='text'
                    className='input input-bordered bg-white input-xs w-10 h-10'
                  />
                  <span className='mx-1'>:</span>
                  <input
                    value={selectedDestVerse ? selectedDestVerse : ''}
                    onChange={(evt) =>
                      setChangeNumber(evt?.target?.value, setSelectedDestVerse)
                    }
                    disabled={formDisabled}
                    type='text'
                    className='input input-bordered bg-white input-xs w-10 h-10'
                  />
                </div> */}
              </div>
              <div className='flex items-center mt-2'>
                <span className='mr-2'>Cant. versículos:</span>
                <Select
                  value={
                    numVersToLoad.filter((opt) => opt.value === amountVerses) ||
                    ''
                  }
                  className='basic-single w-20 mr-2'
                  classNamePrefix='select'
                  onChange={(evt) => setAmountVerses(evt?.value)}
                  isSearchable={true}
                  name='numVersToLoad'
                  options={numVersToLoad}
                  placeholder={''}
                />
              </div>
            </div>

            {formDisabled ? (
              <span className='ml-2'>
                <AiOutlineLoading3Quarters className='animate-spin' />
              </span>
            ) : (
              ''
            )}
          </div>
        </form>
        {errors?.length ? (
          <div className='color-red mt-1'>
            {errors.map((msg: string, idx: number) => (
              <div
                key={idx}
                className='text-sm text-center rounded list-disc text-pink-500'
              >
                {msg}
              </div>
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
      <div className='flex flex-row md:flex-col justify-between items-start md:items-end mt-1 md:mt-0'>
        <div className='form-control'>
          <label className='cursor-pointer label'>
            <span className='label-text mr-2'>Modo experto</span>
            <input
              onClick={handleConfigExpertMode}
              type='checkbox'
              className='toggle toggle-info'
              defaultChecked={renderAsExpertMode}
            />
          </label>
        </div>

        <button
          type={'submit'}
          className='btn btn-sm'
          disabled={formDisabled}
          onClick={handleClickFormSubmit}
        >
          Cargar!
        </button>
      </div>
    </div>
  );
}

export default BookSelectorMulti;
