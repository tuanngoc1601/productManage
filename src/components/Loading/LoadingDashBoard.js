import Skeleton from "react-loading-skeleton";

const LoadingDashBoard = () => {
  return (
    <div className="mx-20 mt-12 flex">
      <div className="w-2/5 mr-12 flex flex-col justify-center items-center">
        <div className="mb-4 w-2/5">
          <Skeleton height={40} />
        </div>
        <div className="w-5/6">
          <Skeleton height={480} circle />
        </div>
      </div>
      <div className="w-3/5 flex flex-col justify-center items-center">
        <div className="mb-4 w-2/5">
          <Skeleton height={20} />
        </div>
        <div className="w-full">
          <Skeleton height={480} />
        </div>
      </div>
    </div>
  );
};

export default LoadingDashBoard;
