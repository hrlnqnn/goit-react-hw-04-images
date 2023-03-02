import css from './SearchBar.module.css';
import { CiSearch } from 'react-icons/ci';
import PropTypes from 'prop-types';

export const SearchBar = ({ onSubmit }) => {
    const handleSubmit = (e) => {
        e.preventSubmit();
        const query = e.target.query.value.trim().toLowerCase();
        onSubmit(query);
    }

    return (
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
};

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};