import { useEffect, useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import Select from "react-select";
import ProductApi from "../../api/ProductApi";
import Loading from "../../components/Loading";
import ProductService from "../../services/ProductService";
const UpdateProductForm = ({ userProducts, categories }) => {
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const updateProduct = userProducts.find(
    (product) => product.id.toString() === productId.toString()
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (updateProduct) {
      setProduct({
        name: updateProduct.name,
        category_id: updateProduct.category_id,
        description: updateProduct.description,
      });
    }
    return () => {
      setProduct({});
    };
  }, [updateProduct]);

  const handleUpdateProduct = async () => {
    try {
      setIsLoading(true);
      const response = await ProductApi.updateProduct(product, productId);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-12 px-44 w-full flex relative flex-col justify-center">
      <div className="w-full flex relative">
        <div className="w-3/5 pr-20">
          <div className="flex flex-col mb-4">
            <label className="text-xl font-medium mb-2 flex items-center">
              Product name
              <RiErrorWarningLine className="ml-2" />
            </label>
            <input
              required
              placeholder="Enter product name"
              className="px-2 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-2 focus:border-blue-500"
              value={product?.name}
              onChange={(e) => {
                setProduct({ ...product, name: e.target.value });
              }}
            />
            <span className="mt-2 text-sm text-yellow-500">
              Do not execeed 50 characters when entering the product name
            </span>
          </div>

          <div className="flex flex-col  mb-4">
            <label className=" text-xl font-medium mb-2 flex items-center">
              Category <RiErrorWarningLine className="ml-2" />
            </label>
            <Select
              options={ProductService.convertCategoriesToSelectElementData(
                categories
              )}
              value={[
                {
                  value: product?.category_id,
                  label: ProductService.getCatgoryById(
                    product?.category_id,
                    categories
                  )?.name,
                },
              ]}
              onChange={(e) => {
                setProduct({ ...product, category_id: e.value });
              }}
            />
          </div>

          <div className="flex flex-col ">
            <label className="text-xl font-medium mb-2">Description</label>
            <textarea
              placeholder="Enter description"
              className="px-2 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-2 focus:border-blue-500 min-h-[160px]"
              value={product?.description}
              onChange={(e) => {
                setProduct({ ...product, description: e.target.value });
              }}
            />
            <span className="mt-2 text-sm text-yellow-500">
              Do not execeed 100 characters when entering the product
              description
            </span>
          </div>
        </div>

        <div className="w-2/5 flex flex-col">
          <div className="mb-8">
            <label className="text-xl font-medium mb-2 flex items-center">
              Detail
            </label>
            <table className="w-full">
              <thead>
                <tr className="my-2">
                  <th className="text-left">Color</th>
                  <th className="text-left">Size</th>
                  <th className="text-left">Quantity</th>
                </tr>
              </thead>
              <tbody className="mt-2">
                {updateProduct?.sub_products ? (
                  updateProduct?.sub_products.map((item) => (
                    <tr className=" my-1 border-t-[1px] border-b-[1px]">
                      <td>{item.color}</td>
                      <td>{item.size}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))
                ) : (
                  <tr className=" my-1 border-t-[2px]">
                    <td>No data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex">
            <div>
              <label className="text-xl font-medium mb-2 flex items-center">
                Cost
              </label>
              <input
                disabled
                value={updateProduct.cost ? updateProduct.cost : "No update"}
              />
            </div>

            <div>
              <label className="text-xl font-medium mb-2 flex items-center">
                Sale off
              </label>
              <input
                disabled
                value={
                  updateProduct.sale_off ? updateProduct.sale_off : "No update"
                }
              />
            </div>

            <div>
              <label className="text-xl font-medium mb-2 flex items-center">
                Sale price
              </label>
              <input
                disabled
                value={
                  updateProduct.sale_price
                    ? updateProduct.sale_price
                    : "No update"
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="my-4 mr-4 w-full">
        <button
          className=" px-4 py-2 bg-blue-900 text-white rounded-md font-medium hover:bg-blue-600 mr-4"
          onClick={handleUpdateProduct}
        >
          Update product
        </button>
      </div>
      {isLoading && (
        <div className="w-screen h-screen top-0 fixed left-0 bg-black opacity-70 flex flex-col justify-center items-center">
          <Loading />
          <span className="text-xl text-white">Updateting...</span>
        </div>
      )}
    </div>
  );
};

export default UpdateProductForm;
