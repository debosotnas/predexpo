import BookSelectorMulti from './BookSelectorMulti';
import BookSelectorSingle from './BookSelectorSingle';

function BookSelector({ isMulti }: { isMulti: Boolean }) {
  return !isMulti ? <BookSelectorMulti /> : <BookSelectorSingle />;
}

export default BookSelector;
