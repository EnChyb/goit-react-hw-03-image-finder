import PropTypes from 'prop-types';
import css from './Searchbar.module.css'

export const Searchbar = ({ onSubmit }) => {

    
    return (
        <header className={css.searchbar}>
            <form className={css.form}>
                <button type="submit" className={css.button}>
                    <span className={css.label}>Search</span>
                </button>
                <input
                    className={css.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    // onChange={(e) => }
                    />
            </form>
        </header>
    )
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func,

}