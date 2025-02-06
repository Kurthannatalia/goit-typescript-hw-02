import css from "./ImageCard.module.css";
import { IoMdCloudDownload } from "react-icons/io";
import { SlLike } from "react-icons/sl";

const ImageCard = ({ small, description, likes, download, onClick }) => {
  const handleDownload = () => {
    window.open(small, "_blank");
  };

  return (
    <div className={css.imageContainer}>
      <img
        className={css.listImage}
        src={small}
        alt={description || "image"}
        onClick={onClick}
      />
      <div className={css.descriptionImage}>
        <p className={css.likes}>
          <SlLike />
          {likes}
        </p>
        {description ? <p className={css.desc}>{description}</p> : <p></p>}
        <a href={download} onClick={handleDownload}>
          <IoMdCloudDownload className={css.icon} />
        </a>
      </div>
    </div>
  );
};
export default ImageCard;