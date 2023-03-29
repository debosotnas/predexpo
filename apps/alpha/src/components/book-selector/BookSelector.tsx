import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { useLoadVerses } from '../../hooks/useLoadVerses';
import { addVersesAction } from '../../store';
import { IBook, NT_BOOKS } from './books.types';

function BookSelector() {
  const [selectedBook, setSelectedBook] = useState<number | undefined>(0);
  const [selectedChapter, setSelectedChapter] = useState<number | undefined>();
  const [selectedVerse, setSelectedVerse] = useState<number | undefined>();
  const dispatch = useDispatch();
  const loadVerses = useLoadVerses();

  const [errors, setErrors] = useState<string[]>([]);

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
    setErrors(errs);

    const verse = await loadVerses({
      selectedBook,
      selectedChapter,
      selectedVerse,
    });

    dispatch(addVersesAction(verse));

    // -------------------------------------
    /*
    //TODO: Use axios
    const res = await fetch(
      `/api/bible/${selectedBook}/${selectedChapter}/${selectedVerse}`
    );
    //TODO: instead use .text, use json and
    const data = await res.text();

    dispatch(
      addVersesAction({
        id: `${selectedBook}/${selectedChapter}/${selectedVerse}`,
        greek: data,
        verse: '',
      })
    );
    */
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

  return (
    <div className='container'>
      <div className=' w-96 mx-auto'>
        <form onSubmit={handleSubmitForm}>
          <div className='flex items-center'>
            <Select
              className='basic-single w-40 mr-2'
              classNamePrefix='select'
              onChange={(evt) => setSelectedBook(evt?.value)}
              isClearable={false}
              isSearchable={true}
              name='color'
              options={ntOptions}
            />
            <div className='mr-2'>
              <input
                value={selectedChapter ? selectedChapter : ''}
                onChange={(evt) =>
                  setChangeNumber(evt?.target?.value, setSelectedChapter)
                }
                type='text'
                className='input input-bordered input-xs w-10 h-10'
              />
              <span className='mx-1'>:</span>
              <input
                value={selectedVerse ? selectedVerse : ''}
                onChange={(evt) =>
                  setChangeNumber(evt?.target?.value, setSelectedVerse)
                }
                type='text'
                className='input input-bordered input-xs w-10 h-10'
              />
            </div>
            <button type={'submit'} className='btn btn-sm'>
              Cargar!
            </button>
          </div>
        </form>
        {errors?.length ? (
          <div className='color-red'>
            <ul className='list-inside'>
              {errors.map((msg: string, idx: number) => (
                <li key={idx} className='text-sm list-disc text-pink-500'>
                  {msg}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default BookSelector;
