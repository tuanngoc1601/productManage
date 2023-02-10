import Skeleton from "react-loading-skeleton";
const LoadingUpdateProduct = () => {
  return (
    <div className="mx-20 mt-12 flex">
      <div className="w-1/2 mr-12">
        <Skeleton height={100} className="mb-4" />
        <Skeleton height={100} className="mb-4" />
        <Skeleton height={180} className="mb-4" />
        <div className="mb-4 w-1/5">
          <Skeleton height={50} />
        </div>
      </div>
      <div className="w-1/2">
        <Skeleton height={300} className="mb-8" />
        <Skeleton height={80} />
      </div>
    </div>
  );
};

export default LoadingUpdateProduct;
