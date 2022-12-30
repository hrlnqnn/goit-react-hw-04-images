import css from './SearchBar.module.css';
import { CiSearch } from 'react-icons/ci';
import PropTypes from 'prop-types';

export const SearchBar = ({ onSubmit }) => (
    <header className={css.searchBar}>
        <form className={css.searchForm} onSubmit={onSubmit}>
            <button type="submit" className={css.searchFormButton}>
                <CiSearch style={{ width: 30, height: 30 }} />
            </button>
            <input
                className={css.searchFormInput}
                type="text"
                autoComplete="off"
                name="query"
                autoFocus
                placeholder="Search images and photos"
            />
        </form>
    </header>
);

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};