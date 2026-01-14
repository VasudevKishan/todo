import { PulseLoader } from 'react-spinners';
import styles from './styles.module.css';

const Loader = () => {
  const rootStyles = getComputedStyle(document.documentElement);
  const textColor = rootStyles.getPropertyValue('--dk-text');

  return (
    <div className={styles.loaderContainer}>
      <PulseLoader color={textColor} />
    </div>
  );
};

export default Loader;
