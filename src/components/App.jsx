//import { Component } from 'react';

import axios from "axios";
import css from './App.module.css'
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Loader } from "./Loader/Loader";
import { useState } from 'react';
import { Button } from "./Button/Button";
//import { Modal } from "./Modal/Modal";

export const App = () => {

  //State
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedImages, setSearchedImages] = useState('')
  const [totalHits, setTotalHits] = useState(0)
  console.log("totalHits State:" + totalHits)
  const [disabledButton, setDisabledButton] = useState(true);
  const [images, setImages] = useState([])


//Pixabay API
const fetchGallery = async (q, page) => {
    const baseURL = `https://pixabay.com/api/?q=${q}&page=${page}&key=42474865-55c278fe0045234625bd75cd9&image_type=photo&orientation=horizontal&per_page=12`
    try {
      const response = await axios.get(baseURL);
      console.log('fetch gallery')
      return response.data
    } catch (error) {
        console.error('Fetching error:', error)
    }
}

  //Handle and fetch value from input
  const fetchSearchedValue = async (data) => {
    setIsLoading(true);
    setSearchedImages(data);
    console.log("setSearchedData:" + data)
    setCurrentPage(1);
    setTotalHits(0);
    console.log(currentPage);
    console.log(searchedImages)
    await fetchGallery(data, currentPage)
      .then((results) => {
        if (currentPage === 1) {
          console.log('fetch przy 1 stronie');
          setImages(results.hits)
          console.log(images)
          setTotalHits(() => results.totalHits);
          console.log(totalHits)
          checkIfLoadMore(results.totalHits);
        };
      });
    setTimeout(() => { setIsLoading(false) }, 1000);
  
  }

  //check if loadmore is abled
  const checkIfLoadMore = (data) => {
          if (data > 12) {
            console.log('totalHits większe niż 12');
          setDisabledButton(false);
          setCurrentPage(currentPage => currentPage + 1);
            setTotalHits(totalHits => totalHits - 12);
            console.log('current page checkIfLoadMore:' + currentPage)
            console.log('totalhits checkIfLoadMore:' + totalHits)
        } else {
          setDisabledButton(true)
        };

  }

  //load more images
  const loadMore = async() => {
    setIsLoading(true);
    console.log('loadmore searchedValue' + searchedImages)
    await fetchGallery(searchedImages, currentPage)
      .then(data => setImages(data.hits));
    console.log('loadmore fetch:' + images)
    checkIfLoadMore(totalHits);
    setTimeout(() => { setIsLoading(false) }, 1000);
  }

//   W odpowiedzi od api przychodzi tablica obiektów, w których ważne są dla ciebie tylko następujące właściwości.

// id - unikalny identyfikator
// webformatURL - odnośnik do miniatury dla listy obrazków
// largeImageURL - odnośnik do dużej wersji dla okna modalnego

  
  return (
    <div className={css.app}>
      <Searchbar onSubmit={fetchSearchedValue}/>
      <ImageGallery>
        {isLoading ? <Loader /> : <ImageGalleryItem images={images} /> }
      </ImageGallery>
      {totalHits!==0 && <Button disabled={disabledButton} onClick={loadMore} />}

    </div>
  );
};


// 42474865-55c278fe0045234625bd75cd9

// class App extends Component {
//   state = {
//     articles: [],
//     isLoading: false,
//     error: '',
//     currentPage: 1
//   }

//   timer = null;

//   async componentDidMount() {
//     this.timer = setInterval(() => {
//       this.handleCurrentPageUpdate()
//     }, 10000)
//     await this.getInitialData()
//   }

//   async componentDidUpdate() {
//     await this.getInitialData()
//   }

//   getInitialData = async () => {
//     const query = `react&page=${this.state.currentPage}`;
//     try {
//       const articles = await api.fetchArticlesWithQuery(query)
//       this.setState({ articles })
//     } catch (error) {
//       this.setState({ error })
//     } finally {
//       this.setState({ isLoading: false })
//     }
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     const oldState = this.state;

//     if (nextState.articles[0]?.title === oldState.articles[0]?.title 
//             && nextState.currentPage === oldState.currentPage) {
//       return false
//     }

//     return true
//   }

//   handleCurrentPageUpdate = () => {
//     this.setState((state) => {
//       return {
//         currentPage: state.currentPage + 1
//       }
//     })
//   }

//   handleClick = () => {
//     this.handleCurrentPageUpdate()
//   }

//   componentWillUnmount() {
//     clearInterval(this.timer);
//   }

//   render() {
//     const { articles, isLoading, error } = this.state;

//     return (
//       <>
//         {error && <p>Something went wrong: {error.message}</p>}
//         {isLoading && <ContentLoader />}
//         {articles.length > 0 && <ArticleList articles={articles} />}
//         <button onClick={this.handleClick}>
//           Next page
//         </button>
//       </>
//     );
//   }

// }

// export default App;