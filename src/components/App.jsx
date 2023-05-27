import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import { StyledApp } from 'components/App.styled';

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [hasMoreImages, setHasMoreImages] = useState(true);

  useEffect(() => {
    if (query && page === 1) {
      fetchImages(query, page);
    }
  }, [query]);

  useEffect(() => {
    if (query && page > 1) {
      fetchImages(query, page);
    }
  }, [page]);

  const fetchImages = (query, page = 1) => {
    const API_KEY = '36044899-e18e2ff497f22a2f7cea9b850';
    const BASE_URL = 'https://pixabay.com/api/';
    const perPage = 120;

    setIsLoading(true);

    axios
      .get(
        `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      )
      .then((response) => {
        const { hits } = response.data;
        setImages((prevImages) => (page === 1 ? hits : [...prevImages, ...hits]));
        setPage(page);
        setHasMoreImages(hits.length === perPage);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const handleSearchSubmit = (query) => {
    setImages([]);
    setError(null);
    setPage(1);
    setQuery(query);
    setHasMoreImages(true);
  };

  const handleLoadMore = () => {
    if (hasMoreImages && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <StyledApp>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <p className="error">{error}</p>}
      {images && <ImageGallery images={images} />}
      {isLoading && <Loader />}
      {!isLoading && images.length > 0 && hasMoreImages && (
        <Button onClick={handleLoadMore}>Load more</Button>
      )}
    </StyledApp>
  );
};

export default App;
