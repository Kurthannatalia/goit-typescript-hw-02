import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

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
type Gallery = {
  images: Images[];
  isOpen: (imageUrl: string) => void;
};

const ImageGallery: React.FC<Gallery> = ({ images, isOpen }) => {
  return (
    <ul className={css.list}>
      {images.map((image) => (
        <li className={css.listItem} key={image.id}>
          <ImageCard
            small={image.urls.small}
            description={image.description}
            likes={image.likes}
            download={image.links.download}
            onClick={() => isOpen(image.urls.regular)}
          />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;