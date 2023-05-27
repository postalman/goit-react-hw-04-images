import React from 'react';
import axios from 'axios';
import SearchBar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import { StyledApp } from 'components/App.styled';

class App extends React.Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    page: 1,
    query: '',
    hasMoreImages: true,
  };

  componentDidUpdate(_, prevState) {
    const { query: prevQuery, page: prevPage } = prevState;
    const { query, page } = this.state;

    if (prevQuery !== query || prevPage !== page) {
      this.fetchImages(query, page);
    }
  }

  fetchImages = (query, page = 1) => {
    const API_KEY = '36044899-e18e2ff497f22a2f7cea9b850';
    const BASE_URL = 'https://pixabay.com/api/';
    const perPage = 12;

    this.setState({ isLoading: true });

    axios
      .get(
        `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      )
      .then(response => {
        const { hits } = response.data;
        this.setState(prevState => ({
          images: page === 1 ? hits : [...prevState.images, ...hits],
          page: page,
          hasMoreImages: hits.length === perPage,
          isLoading: false,
        }));
      })
      .catch(error => {
        this.setState({ error: error.message, isLoading: false });
      });
  };

  handleSearchSubmit = query => {
    this.setState({ images: [], error: null, page: 1, query: query, hasMoreImages: true });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      const { hasMoreImages, isLoading, page } = prevState;
  
      if (hasMoreImages && !isLoading) {
        return { page: page + 1 };
      } else {
        return prevState;
      }
    });
  };

  render() {
    const { images, isLoading, error, hasMoreImages } = this.state;

    return (
      <StyledApp>
        <SearchBar onSubmit={this.handleSearchSubmit} />
        {error && <p className="error">{error}</p>}
        {images && (
          <ImageGallery images={images} />
        )}
        {isLoading && <Loader />}
        {!isLoading && images.length > 0 && hasMoreImages && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}
      </StyledApp>
    );
  }
}

export default App;
