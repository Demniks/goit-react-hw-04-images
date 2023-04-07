import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchApiImg } from '../services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

import css from './App.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!search) {
      return;
    }
    const getImages = async () => {
      try {
        setLoading(true);
        const data = await fetchApiImg(search, page);

        if (data.hits.length === 0) {
          return toast.error('Oops, there are no such pictures. Try again');
        }

        setImages(prevImages => [...prevImages, ...data.hits]);
        setShowBtn(page < Math.ceil(data.totalHits / 12));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, [search, page]);

  const onSearchImages = ({ search }) => {
    if (search.trim() === '') {
      setImages([]);
      setPage(1);
      return toast.error('Repeat the question again please');
    }
    setSearch(search);
    setImages([]);
    setPage(1);
  };

  const openModal = data => {
    setCurrentImage(data);
  };

  const onClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onClose = () => {
    setCurrentImage(null);
  };

  return (
    <>
      <Searchbar onSubmit={onSearchImages} />

      {error && <p>Something went wrong. Try reloading the page</p>}

      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} search={search} />
      )}

      {showBtn && !loading && <Button onClick={onClick} />}

      <ToastContainer />

      <div className={css.BoxCenter}>{loading && <Loader />}</div>

      {currentImage && (
        <Modal
          className={css.CurrentImage}
          onClose={onClose}
          currentImage={currentImage}
          search={search}
        />
      )}
    </>
  );
};

export default App;
