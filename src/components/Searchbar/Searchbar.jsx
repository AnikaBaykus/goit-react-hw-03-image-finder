// import PropTypes from 'prop-types';
import SearchForm from '../SearchForm/SearchForm';
import s from './SearchBar.module.css';

function SearchBar({ onSearchFormSubmit }) {
  return (
    <header className={s.SearchBar}>
      <SearchForm onSearchFormSubmit={onSearchFormSubmit} />
    </header>
  );
}
export default SearchBar;
