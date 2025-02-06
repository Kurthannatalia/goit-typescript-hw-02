import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import { VscError } from "react-icons/vsc";
import { IoSearchOutline } from "react-icons/io5";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { useId } from "react";

type Searching = {
  onSearch: (text: string, page: number) => void;
};
type SubmitValues = {
  text: string;
};
const SearchBar: React.FC<Searching> = ({ onSearch }) => {
  const searchId = useId();
  const notify = () =>
    toast(
      <p className={css.errorToast}>
        <VscError className={css.errorIcon} />
        Please enter a search query!
      </p>
    );

  function handleSubmit(
    values: SubmitValues,
    { resetForm }: FormikHelpers<SubmitValues>
  ): void {
    const { text } = values;
    if (!text) {
      notify();
      return;
    } else {
      onSearch(text, 1);
    }

    resetForm();
  }

  return (
    <header className={css.topHeader}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 4000,
          style: {
            background: "red",
            color: "#fff",
          },

          success: {
            duration: 3000,
          },
        }}
      />
      <Formik onSubmit={handleSubmit} initialValues={{ text: "" }}>
        <Form className={css.form}>
          <div>
            <label className={css.nameOfLabel} htmlFor={searchId}>
              Search
            </label>
            <Field
              className={css.searchText}
              type="text"
              name="text"
              autoComplete="off"
              id={searchId}
              autoFocus
              placeholder="Search images and photos"
            />
            <ErrorMessage name="topic" component="span" />
          </div>
          <button className={css.formBtn} type="submit">
            <IoSearchOutline className={css.icon} />
            <span className={css.buttonText}>submit</span>
          </button>
        </Form>
      </Formik>
    </header>
  );
};
export default SearchBar;