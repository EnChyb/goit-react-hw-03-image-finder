import PropTypes from 'prop-types';
//import css from './Button.module.css'

export const Button = ({ disabled, onClick }) => {

    return (
        <>
            <button disabled={disabled} onClick={onClick}>{disabled? "End of results" : "Load more" }</button>
        </>
    )



};

Button.propTypes = {
    loadMore: PropTypes.func,
    
}