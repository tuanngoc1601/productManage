import { useState } from "react";
import { RiArrowRightLine, RiErrorWarningLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import ProductApi from "../../api/ProductApi";
import Loading from "../../components/Loading/Loading";
import ProductService from "../../services/ProductService";
import ValidateProductForm from "../../services/ValidateProductForm";
import CreateSubPForm from "./components/CreateSubPForm";
const NewProduct = ({ categories, colors, sizes }) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [subProduct, setSubProduct] = useState({});
  const handleCreateProduct = async () => {
    try {
      const checkValidate = ValidateProductForm.validateProduct(product);
      if (checkValidate) {
        setIsLoading(true);
        await ProductApi.createProduct(product);
        setIsLoading(false);
        toast.success("Create product successfully");
        navigate("/admin");
      } else {
        toast.warning("Please fill all fields");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      const listErrors = error.response.data;
      if (listErrors) {
        listErrors.errors.forEach((error) => {
          toast.error(error);
        });
      }
    }
  };
  const handleAddSubProduct = () => {
    if (
      product.sub_products &&
      product.sub_products.hasOwnProperty(Object.keys(subProduct)[0])
    ) {
      toast.warning("Color already exists");
    } else if (Object.keys(subProduct).length === 0) {
      toast.warning("Please fill all fields for sub product");
    } else {
      setProduct((prev) => {
        return {
          ...prev,
          sub_products: {
            ...prev.sub_products,
            ...subProduct,
          },
        };
      });
    }
  };
  return (
    <div className="mt-12 px-20 w-full flex relative flex-col justify-center">
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
              onChange={(e) => {
                setProduct({ ...product, description: e.target.value });
              }}
            />
            <span className="mt-2 text-sm text-yellow-500">
              Do not execeed 100 characters when entering the product
              description
            </span>
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-xl font-medium mb-2 flex">
              Detail
              <RiErrorWarningLine className="ml-2" />
            </label>
            <div className="ml-2 mb-8">
              {product.sub_products ? (
                Object.keys(product.sub_products).map((key) => {
                  return (
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-medium">
                        {ProductService.getColorNameById(key, colors)}
                      </span>
                      <span className="mx-2">:</span>
                      <span className="text-base font-medium">
                        {product.sub_products[key].map((item) => {
                          return (
                            ProductService.getSizeNameById(
                              item.size_id,
                              sizes
                            ) + ", "
                          );
                        })}
                      </span>
                    </div>
                  );
                })
              ) : (
                <span className="flex items-center text-blue-400">
                  Add sub product
                  <RiArrowRightLine className="ml-2" />
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="relative w-2/5 h-[580px] overflow-auto pr-2">
          <CreateSubPForm
            subProduct={subProduct}
            setSubProduct={setSubProduct}
          />
          <div className="mt-8">
            <button
              className=" px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-400 mr-4"
              onClick={handleAddSubProduct}
            >
              Add sub product
            </button>
          </div>
        </div>
      </div>

      <div className="mb-4 mr-4 w-full">
        <button
          className=" px-4 py-2 bg-blue-900 text-white rounded-md font-medium hover:bg-blue-600 mr-4"
          onClick={handleCreateProduct}
        >
          Create new product
        </button>
      </div>
      {isLoading && (
        <div className="w-screen h-screen top-0 fixed left-0 bg-black opacity-70 flex flex-col justify-center items-center">
          <Loading />
          <span className="text-xl text-white">Creating...</span>
        </div>
      )}
    </div>
  );
};

export default NewProduct;
