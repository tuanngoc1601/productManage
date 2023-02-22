import { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import ProductApi from "../../api/ProductApi";
import SubProductApi from "../../api/SubProductApi";
import Loading from "../../components/Loading/Loading";
import LoadingUpdateProduct from "../../components/Loading/LoadingUpdateProduct";
import useGetUserProductById from "../../hooks/useGetUserProductById";
import ProductService from "../../services/ProductService";
import { toastListError } from "../../utils";
import CreateSubPForm from "./components/CreateSubPForm";
const UpdateProduct = ({ categories }) => {
  const [product, setProduct] = useState({});
  const [isReload, setIsReload] = useState(false);
  const [subProducts, setSubProducts] = useState({});
  const navigate = useNavigate();
  const { productId } = useParams();
  let { userProduct: updateProduct } = useGetUserProductById(
    productId,
    isReload
  );
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (updateProduct) {
      setProduct({
        name: updateProduct.name,
        category_id: updateProduct.category_id,
        description: updateProduct.description,
      });
      const totalProduct = updateProduct.sub_products?.reduce(
        (acc, item) => (acc += item.quantity),
        0
      );
      setTotal(totalProduct);
    }
    return () => {
      setProduct({});
    };
  }, [updateProduct]);

  const handleUpdateProduct = async () => {
    try {
      setIsLoading(true);
      await ProductApi.updateProduct(product, productId);
      toast.success("Update product successfully", {
        theme: "colored",
      });
      navigate("/product");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("Update product failed");
    }
  };

  if (!updateProduct.sub_products) return <LoadingUpdateProduct />;
  if (isLoading) return <Loading />;
  return (
    <div className="mt-12 px-20 w-full flex relative flex-col justify-center">
      <div className="fixed top-12 w-12 h-36"></div>
      <div className="w-full flex relative">
        {/* Basic info */}
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
        {/* Detail info */}
        <div className="w-2/5 flex flex-col">
          <div className="mb-16 pb-4 h-[386px]">
            <div className="flex items-center mb-2 ">
              <label className="text-xl font-medium flex items-center mr-8">
                Detail
              </label>
              <Popup
                trigger={
                  <button className="px-2 py-1 bg-slate-500 text-white rounded-md">
                    Add
                  </button>
                }
                modal
                nested
                onClose={() => {
                  setSubProducts({});
                }}
              >
                {(close) => (
                  <div className="modal">
                    <button className="close" onClick={close}>
                      &times;
                    </button>
                    <div className="header text-2xl"> Add sub product </div>
                    <div className="content">
                      <div className="flex flex-col mb-4">
                        <CreateSubPForm setSubProduct={setSubProducts} />
                      </div>
                      <div className="actions flex justify-center font-semibold">
                        <button
                          className="px-2 py-2 bg-blue-500 text-white rounded-md mr-4"
                          onClick={async () => {
                            try {
                              setIsLoading(true);
                              if (Object.keys(subProducts).length === 0) {
                                setIsLoading(false);
                                return toast.error("Please fill all fields");
                              }
                              await SubProductApi.createSubProduct({
                                sub_products: subProducts,
                                product_id: productId,
                              });
                              toast.success("Add sub product successfully", {
                                theme: "colored",
                              });
                              setIsLoading(false);
                              setIsReload(!isReload);
                              close();
                            } catch (error) {
                              toastListError(error);
                              setIsLoading(false);
                            }
                          }}
                        >
                          Add item
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
            {/* Table sub products */}
            <div className="h-full overflow-auto">
              <table className="w-full text-sm text-gray-500 dark:text-gray-400 text-center">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Color
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Size
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {updateProduct?.sub_products.map((item) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={item.id}
                    >
                      <td className="px-6 py-4">{item.color}</td>
                      <td className="px-6 py-4">{item.size}</td>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4">
                        <a
                          href={item.image_url}
                          target="_blank"
                          className="text-white hover:text-blue-500"
                          rel="noopener noreferrer"
                        >
                          Link
                        </a>
                      </td>
                      <td className="px-6 py-4 flex justify-center">
                        <Popup
                          trigger={
                            <BsFillTrashFill className="cursor-pointer" />
                          }
                          modal
                          nested
                        >
                          {(close) => (
                            <div className="modal">
                              <button className="close" onClick={close}>
                                &times;
                              </button>
                              <div className="header text-2xl mb-2">
                                Delete item
                              </div>
                              <div className="content">
                                <p>
                                  Data of the product may be lost completely in
                                  the future. Are you sure you want to delete
                                  this sub product?
                                </p>
                              </div>
                              <div className="actions">
                                <button
                                  className="bg-red-500 px-4 py-2 rounded-md text-white mr-4"
                                  onClick={async () => {
                                    try {
                                      setIsLoading(true);
                                      await SubProductApi.deleteSubProduct(
                                        item.id
                                      );
                                      setIsLoading(false);
                                      setIsReload(!isReload);
                                      toast.success("Delete item success");
                                    } catch (error) {
                                      toastListError(error);
                                      setIsLoading(false);
                                    }
                                  }}
                                >
                                  Confirm
                                </button>
                                <button
                                  className="bg-gray-500 px-4 py-2 rounded-md text-white"
                                  onClick={() => {
                                    close();
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </Popup>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-white border-b dark:bg-blue-800 dark:border-gray-700 text-white">
                    <td className="font-bold px-6 py-4">Total</td>
                    <td className="px-6 py-4"></td>
                    <td className="font-bold px-6 py-4">{total}</td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex">
            <div>
              <label className="text-xl font-medium mb-2 flex items-center">
                Cost
              </label>
              <input
                disabled
                value={updateProduct?.cost ? updateProduct.cost : "Not update"}
              />
            </div>

            <div>
              <label className="text-xl font-medium mb-2 flex items-center">
                Sale off
              </label>
              <input
                disabled
                value={updateProduct?.sale_off ? updateProduct.sale_off : "0%"}
              />
            </div>

            <div>
              <label className="text-xl font-medium mb-2 flex items-center">
                Sale price
              </label>
              <input
                disabled
                value={
                  updateProduct?.sale_price
                    ? updateProduct.sale_price
                    : "Not update"
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
    </div>
  );
};

export default UpdateProduct;
