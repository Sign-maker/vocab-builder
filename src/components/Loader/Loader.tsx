import { RotatingLines } from "react-loader-spinner";
import css from "./Loader.module.css";

export const Loader = () => (
  <div className={css.loaderContainer}>
    <RotatingLines
      visible={true}
      width="60"
      strokeColor="gray"
      strokeWidth="3"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  </div>
);
