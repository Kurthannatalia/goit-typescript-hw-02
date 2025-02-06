import css from "./ImageCard.module.css";
import { IoMdCloudDownload } from "react-icons/io";
import { SlLike } from "react-icons/sl";

type Image = {
  small: string;
  description: string;
  likes: string;
  download: string;
  onClick: () => void;
};
const ImageCard: React.FC<Image> = ({
  small,
  description,
  likes,
  download,
  onClick,
}) => {
  const handleDownload = (): void => {
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
        <a className={css.link} href={download} onClick={handleDownload}>
          <IoMdCloudDownload className={css.icon} />
          Download
        </a>
      </div>
    </div>
  );
};
export default ImageCard;