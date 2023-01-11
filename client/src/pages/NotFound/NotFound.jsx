import styles from "./NotFound.module.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const routeTo = (url) => {
    navigate(url);
  };
  return (
    <div>
      <div className={styles.face}>
        <div className={styles.band}>
          <div className={styles.red}></div>
          <div className={styles.white}></div>
          <div className={styles.blue}></div>
        </div>
        <div className={styles.eyes}></div>
        <div className={styles.dimples}></div>
        <div className={styles.mouth}></div>
      </div>

      <h1>Oops! Something went wrong!</h1>
      <div
        className={styles.btn}
        onClick={() => {
          routeTo("/");
        }}
      >
        Return to Home
      </div>
    </div>
  );
};
export default NotFound;
