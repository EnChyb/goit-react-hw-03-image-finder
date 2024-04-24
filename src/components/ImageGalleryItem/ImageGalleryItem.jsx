//import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css'

export const ImageGalleryItem = () => {

        return (
        <li className={css.item}>
                <img className={css.image} src="" alt="" />
        </li>
    )

};

ImageGalleryItem.propTypes = {
    
}