import {
  SearchBar,
  apiPixabay,
  ImageGallery,
  Modal,
  Button,
  Loader,
  Error,
} from 'components';

import { useState, useEffect } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState(null);
  const [currentModalImage, setCurrentModalImage] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    setIsLoading(true);

    apiPixabay
      .getImages(query, page)
      .then(({ hits: newImages, totalHits }) => {
        setImages((prevImages) => [...prevImages, ...newImages]);
        setTotalHits(totalHits);
      })
      .catch((err) => {
        reset();
        setError(err.message);
      })
      .finally(setIsLoading(false));
  }, [query, page]);

  const onSearchSubmit = (searchQuery) => {
    if (query === '') {
      return alert('Search field is empty! Nothing to search...');
    }
    if (searchQuery === query) {
      return alert("Change query...");
    }

    setQuery(searchQuery);

    reset();
  };

  const onClickLoadMore = () => setPage((prevPage) => prevPage + 1);

  const reset = () => {
    setImages([]);
    setPage(1);
    setTotalHits(0);
  };

  const onToggleModal = (imageSrc = null) => setCurrentModalImage(imageSrc);

  return (
    <div className="App">
      <SearchBar onSubmit={onSearchSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onToggleModal={onToggleModal} />
      )}
      {error && <Error title={error} />}
      {currentModalImage && (
        <Modal image={currentModalImage} onToggleModal={onToggleModal} />
      )}
      {isLoading && <Loader />}
      {images.length < totalHits && <Button onClick={onClickLoadMore} />}
    </div>
  );
};