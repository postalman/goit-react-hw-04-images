import { Circles } from 'react-loader-spinner';

const CustomLoader = () => {
  return (
    <div className="loader">
      <Circles type="ThreeDots" color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default CustomLoader;
