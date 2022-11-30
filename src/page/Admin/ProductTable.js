import { Link } from "react-router-dom";
import ProductService from "../../services/ProductService";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
const ITEM_PER_PAGE = 10;
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
  const pageCount = Math.ceil(products.length / ITEM_PER_PAGE);
  const [productsPaginate, setProductsPaginate] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setProductsPaginate(products.slice(0, ITEM_PER_PAGE));
  }, [products]);
  return (
    <div className="flex flex-col">
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
              Price
            </th>
            <th className="border-t border-l border-r border-slate-300 px-4 py-2">
              Category
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
                <td className="border border-slate-300 px-3 py-[6px]">
                  {product.product_name}
                </td>
                <td className="border border-slate-300 px-3 py-[6px]">
                  {product.product_price || "Chưa cập nhật"}
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
                  {product.product_description}
                </td>
                <td className="border border-slate-300 px-3 py-[6px] ">
                  <div className="flex flex-nowrap">
                    <button className="px-2 py-1 rounded-sm bg-blue-300 hover:bg-blue-500 hover:text-white mr-2 font-semibold">
                      <Link to={`/admin/update-product/${product.product_id}`}>
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
          previousLabel={<div>Previous</div>}
          nextLabel={<div>Next</div>}
          pageCount={pageCount}
          onPageChange={({ selected }) => {
            setCurrentPage(selected + 1);
            setProductsPaginate(
              products.slice(selected * 10, (selected + 1) * 10)
            );
          }}
          pageClassName="px-4 py-2 mx-1 rounded-md flex items-center"
          activeClassName="bg-blue-200 "
          previousClassName={`flex items-center px-2`}
          nextClassName={`flex items-center px-2 `}
          disabledClassName={"text-primary-20"}
        />
      </div>
    </div>
  );
};

export default ProductTable;
