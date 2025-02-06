import css from "./LoadMoreBtn.module.css";

type Change = {
  onChange: () => void;
};

const LoadMoreBtn: React.FC<Change> = ({ onChange }) => {
  return (
    <button type="button" className={css.loadMore} onClick={onChange}>
      Load more
    </button>
  );
};
export default LoadMoreBtn;