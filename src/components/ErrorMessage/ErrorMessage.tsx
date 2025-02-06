import css from "./Errormesage.module.css";

const ErrorMessage: React.FC = () => {
  return (
    <div>
      <p className={`${css.error} animate`}>
        Sorry, something went wrong, try again later!
      </p>
    </div>
  );
};
export default ErrorMessage;