import { FormEvent, useState } from 'react';
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

function BookSelector() {
  const [formDisabled, setFormDisabled] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<number | undefined>(0);
  const [selectedChapter, setSelectedChapter] = useState<number | undefined>();
  const [selectedVerse, setSelectedVerse] = useState<number | undefined>();
  const dispatch = useDispatch();
  const loadVerses = useLoadVerses();

  const [errors, setErrors] = useState<string[]>([]);

  const renderAsExpertMode: boolean = useSelector((state: RootState) => {
    return state.config.viewInExpertMode;
  });

  const handleSubmitForm = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

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
    if (errs.length) {
      setErrors(errs);
      return;
    }
    setFormDisabled(true);
    setErrors(errs);

    const verse = await loadVerses({
      selectedBook,
      selectedChapter,
      selectedVerse,
    });
    setFormDisabled(false);
    if (!verse) {
      setErrors(['El versículo no fue encontrado']);
      return;
    }
    setErrors([]);
    setSelectedBook(0);
    setSelectedChapter(undefined);
    setSelectedVerse(undefined);
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

  return (
    <div className='container flex justify-between'>
      <div className=''>
        <form onSubmit={handleSubmitForm}>
          <div className='flex items-center'>
            <Select
              key={`my_unique_select_key__${selectedBook}`}
              value={
                ntOptions.filter((opt) => opt.value === selectedBook) || ''
              }
              className='basic-single w-40 mr-2'
              classNamePrefix='select'
              onChange={(evt) => setSelectedBook(evt?.value)}
              isSearchable={true}
              name='color'
              options={ntOptions}
              placeholder={'Seleccione...'}
            />
            <div className='mr-2'>
              <input
                value={selectedChapter ? selectedChapter : ''}
                onChange={(evt) =>
                  setChangeNumber(evt?.target?.value, setSelectedChapter)
                }
                disabled={formDisabled}
                type='text'
                className='input input-bordered input-xs w-10 h-10'
              />
              <span className='mx-1'>:</span>
              <input
                value={selectedVerse ? selectedVerse : ''}
                onChange={(evt) =>
                  setChangeNumber(evt?.target?.value, setSelectedVerse)
                }
                disabled={formDisabled}
                type='text'
                className='input input-bordered input-xs w-10 h-10'
              />
            </div>
            <button
              type={'submit'}
              className='btn btn-sm'
              disabled={formDisabled}
            >
              Cargar!
            </button>
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
      <div className='flex flex-col'>
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
      </div>
    </div>
  );
}

export default BookSelector;
