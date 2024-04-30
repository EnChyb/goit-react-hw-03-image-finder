import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css'

export const ImageGalleryItem = ({images}) => {

        return images.map(image => (
                <li key={image.id} className={css.item}>
                        <img className={css.image} src={image.webformatURL} alt={image.tags} />
                </li>
        ));                        

};

ImageGalleryItem.propTypes = {
        images: PropTypes.array,
    
}