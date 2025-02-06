import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import fetchImages from "./components/fetchImages/fetchImages";
import EndOfImages from "./components/EndOfImages/EndOfImages";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState("");
  const [endOfCollection, setEndOfCollection] = useState(false);
  const [hasLoadedImages, setHasLoadedImages] = useState(false);
  const [totalCollection, setTotalCollection] = useState(0);
  const [totalImages, setTotalImages] = useState(0);

  const handleOpenModal = (imageUrl) => {
    setSelectedImages(imageUrl);
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedImages("");
    setIsOpen(false);
  };

  const handleSearch = (searchTerm) => {
    setImages([]);
    setError(null);
    setPage(1);
    setSearchTerm(searchTerm);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (!searchTerm) return;

    const fetchImagesData = async () => {
      try {
        setLoading(true);
        const data = await fetchImages(searchTerm, page);
        setImages((prevImages) =>
          page === 1 ? data.results : [...prevImages, ...data.results]
        );
        setTotalCollection(data.total);
        setHasLoadedImages(true);
        setEndOfCollection(data.results.length === 0);
      } catch (error) {
        setError(error.message || "Щось пішло не так");
      } finally {
        setLoading(false);
      }
    };

    fetchImagesData();
  }, [searchTerm, page]);

  useEffect(() => {
    if (totalCollection > 0) {
      const total = Math.ceil(totalCollection / 15);
      setTotalImages(total);
    }
  }, [totalCollection]);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && (
        <ImageGallery images={images} isOpen={handleOpenModal} />
      )}
      {endOfCollection && hasLoadedImages && <EndOfImages />}
      {error && <ErrorMessage searchTerm={searchTerm} setError={setError} />}
      {loading && <Loader />}
      {images.length > 0 && !endOfCollection && (
        <LoadMoreBtn onChange={handleLoadMore} />
      )}
      <ImageModal
        images={images}
        isOpen={isOpen}
        isClose={handleCloseModal}
        imageUrl={selectedImages}
      />
    </>
  );
}

export default App;
