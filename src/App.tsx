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
import { UnsplashSearchResponse } from "./components/fetchImages/fetchImages";
type Images = {
  id: string;
  description: string;
  urls: {
    small: string;
    regular: string;
  };
  links: {
    download: string;
  };
  likes: string;
};

const App: React.FC = () => {
  const [error, setError] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<Images[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<string>("");
  const [endOfCollection, setEndOfCollection] = useState<boolean>(false);
  const [hasLoadedImages, setHasLoadedImages] = useState<boolean>(false);
  const [totalCollection, setTotalCollection] = useState<number>(0);
  const [totalImages, setTotalImages] = useState<number>(0);

  const handleOpenModal = (imageUrl: string): void => {
    setSelectedImages(imageUrl);
    setIsOpen(true);
  };
  const handleCloseModal = (): void => {
    setSelectedImages("");
    setIsOpen(false);
  };

  const handleSearch = async (
    searchQuery: string,
    page: number
  ): Promise<void> => {
    try {
      setImages([]);
      setLoading(true);
      setError(false);
      setPage(1);
      setSearchTerm(searchQuery);
      const data: UnsplashSearchResponse = await fetchImages(searchQuery, page);
      setImages(data.results);
      setTotalCollection(data.total);
      setEndOfCollection(false);
      setHasLoadedImages(true);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect((): void => {
    const fetchTotalImages = async () => {
      const total = Math.ceil(totalCollection / 15);
      setTotalImages(total);
    };
    fetchTotalImages();
  }, [totalCollection]);

  useEffect((): void => {
    if (page >= totalImages) {
      setEndOfCollection(true);
    } else {
      setEndOfCollection(false);
    }
  }, [page, totalImages]);

  const handleLoadMore = async (): Promise<void> => {
    try {
      setLoading(true);
      const nextPageData = await fetchImages(searchTerm, page);
      setPage((prevPage) => prevPage + 1);
      setImages((prevImages) => [...prevImages, ...nextPageData.results]);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && (
        <ImageGallery images={images} isOpen={handleOpenModal} />
      )}
      {endOfCollection && hasLoadedImages && <EndOfImages />}
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {images.length > 0 && !endOfCollection && (
        <LoadMoreBtn onChange={handleLoadMore} />
      )}
      <ImageModal
        isOpen={isOpen}
        isClose={handleCloseModal}
        imageUrl={selectedImages}
      />
    </>
  );
};

export default App;