// import { Component } from 'react';
import axios from "axios";

import css from './App.module.css'
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Loader } from "./Loader/Loader";
//import { Modal } from "./Modal/Modal";



// axios.defaults.baseURL = "https://hn.algolia.com/api/v1";

export const App = () => {

  //State



  //Pixabay API
  const fetchGallery = async (q, page) => {
    const baseURL = `https://pixabay.com/api/?q=${q}&page=${page}&key=42474865-55c278fe0045234625bd75cd9&image_type=photo&orientation=horizontal&per_page=12`
    try {
      const response = await axios.get('https://pixabay.com/api/?key=42474865-55c278fe0045234625bd75cd9&q=yellow+flowers&image_type=photo&pretty=true');
      return response.data.hits
    } catch (error) {
      console.error('Fetching error:', error)
    }
  }

//   W odpowiedzi od api przychodzi tablica obiektów, w których ważne są dla ciebie tylko następujące właściwości.

// id - unikalny identyfikator
// webformatURL - odnośnik do miniatury dla listy obrazków
// largeImageURL - odnośnik do dużej wersji dla okna modalnego

  
  return (
    <div className={css.app}>
      <Searchbar/>
      <ImageGallery>
        <ImageGalleryItem />
      </ImageGallery> 
      <Loader />

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