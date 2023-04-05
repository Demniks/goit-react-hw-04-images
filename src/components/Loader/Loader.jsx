
import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <RotatingLines
      strokeColor="#3f51b5"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
      //   className={css.Loader}
    //   wrapperStyle={{ marginLeft: "auto", marginRight: "auto" }}
      wrapperClass={css.Loader}
    />
  );
};
export default Loader;
