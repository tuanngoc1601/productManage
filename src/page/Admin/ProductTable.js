import { Link } from "react-router-dom";
import ProductService from "../../services/ProductService";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
const ITEM_PER_PAGE = 8;
const ColorItem = ({ color }) => {
  return (
    <div className="rounded-full border-2 border-slate-300 mr-1">
      <div
        className={`w-4 h-4 rounded-full`}
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
};

const ProductTable = ({
  products,
  colors,
  sizes,
  categories,
  setIsOpenDeleteModal,
  setDeleteItem,
}) => {
  const [searchProduct, setSearchProduct] = useState([]);
  const pageCount = Math.ceil(searchProduct.length / ITEM_PER_PAGE);
  const [searchCondition, setSearchCondition] = useState({});
  const [productsPaginate, setProductsPaginate] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (searchCondition.category && searchCondition.category != 0) {
      const search = products.filter(
        (product) => product.category_id == searchCondition.category
      );
      setSearchProduct(search);
    } else {
      setSearchProduct(products);
    }
    setCurrentPage(1);
  }, [searchCondition, products]);

  useEffect(() => {
    setProductsPaginate(searchProduct.slice(0, ITEM_PER_PAGE));
  }, [searchProduct]);
  return (
    <div className="flex flex-col">
      <h4>{searchProduct.length} results</h4>
      <table className="animate-fadeIn text-center m-0 w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border-t border-l border-r border-slate-300 px-4 py-2">
              No
            </th>
            <th className="border-t border-l border-r border-slate-300 px-4 py-2">
              Name
            </th>
            <th className="border-t border-l border-r border-slate-300 px-4 py-2">
              Price (VNĐ)
            </th>
            <th className="border-t border-l border-r border-slate-300 px-2 py-2 min-w-[160px]">
              <select
                className="bg-transparent focus:outline-none"
                onChange={(e) => {
                  setSearchCondition({ category: e.target.value });
                }}
              >
                <option value="0">Category</option>
                {categories.map((category) => {
                  return (
                    <option
                      key={category.category_id}
                      value={category.category_id}
                      className="text-gray-800 cursor-pointer"
                    >
                      {category.category_name}
                    </option>
                  );
                })}
              </select>
            </th>
            <th className="border-t border-l border-r border-slate-300 px-4 py-2">
              Colors
            </th>
            <th className="border-t border-l border-r border-slate-300 px-4 py-2">
              Sizes
            </th>
            <th className="border-t border-l border-r border-slate-300 px-4 py-2">
              Description
            </th>
            <th className="border-t border-l border-r border-slate-300 px-4 py-2">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {productsPaginate.map((product, index) => {
            return (
              <tr key={product.product_id}>
                <td className="border border-slate-300 px-3 py-[6px]">
                  {(currentPage - 1) * ITEM_PER_PAGE + index + 1}
                </td>
                <td className="border border-slate-300 px-3 py-[6px] ">
                  <p className="h-full">{product.product_name}</p>
                </td>
                <td className="border border-slate-300 px-3 py-[6px]">
                  {product.price || "Chưa cập nhật"}
                </td>
                <td className="border border-slate-300 px-3 py-[6px]">
                  {
                    ProductService.getCatgoryById(
                      product.category_id,
                      categories
                    )?.category_name
                  }
                </td>
                <td className="border border-slate-300 px-3 py-[6px]">
                  <div className="flex justify-center">
                    {ProductService.getColorByIds(product.color_id, colors).map(
                      (item, index) => {
                        return (
                          <ColorItem color={item?.color_code} key={index} />
                        );
                      }
                    )}
                  </div>
                </td>
                <td className="border border-slate-300 px-3 py-[6px] font-bold">
                  {ProductService.getSizeByIds(product.size_id, sizes).map(
                    (item, index) => {
                      return (
                        <span
                          key={index}
                          className="px-2 py-1 mr-2 rounded-md  bg-slate-400"
                        >
                          {item?.size_name}
                        </span>
                      );
                    }
                  )}
                </td>
                <td className="border border-slate-300 px-3 py-[6px] ">
                  <p className="text-overflow_3 ">
                    {product.product_description}
                  </p>
                </td>
                <td className="border border-slate-300 px-3 py-[6px] ">
                  <div className="flex flex-nowrap">
                    <button className="px-2 py-1 rounded-sm bg-blue-300 hover:bg-blue-500 hover:text-white mr-2 font-semibold ">
                      <Link
                        to={`/admin/update-product/${product.product_id}`}
                        className="no-underline"
                      >
                        Update
                      </Link>
                    </button>
                    <button
                      className="px-2 py-1 rounded-sm bg-red-500 text-white font-semibold hover:bg-red-700"
                      onClick={() => {
                        setIsOpenDeleteModal(true);
                        setDeleteItem(product.product_id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-3 flex items-center justify-center">
        <ReactPaginate
          className="flex p-1 rounded-xl bg-primary-10 mt-8 shadow-md"
          breakLabel="..."
          previousLabel={<div className=" no-underline">Previous</div>}
          nextLabel={<div className=" no-underline">Next</div>}
          pageCount={pageCount}
          onPageChange={({ selected }) => {
            setCurrentPage(selected + 1);
            setProductsPaginate(
              searchProduct.slice(
                selected * ITEM_PER_PAGE,
                (selected + 1) * ITEM_PER_PAGE
              )
            );
          }}
          pageClassName="px-4 py-2 mx-1 rounded-md flex items-center"
          activeClassName="bg-blue-200 "
          previousClassName={`flex items-center px-2 `}
          nextClassName={`flex items-center px-2 `}
          disabledClassName={"text-primary-20"}
        />
      </div>
    </div>
  );
};

export default ProductTable;
