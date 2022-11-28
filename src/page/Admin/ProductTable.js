import ProductService from "../../services/ProductService";

const ColorItem = ({ color }) => {
  return <div className={`w-4 h-4 bg-[${color}] mr-2`}></div>;
};

const ProductTable = ({ products, colors, sizes, categories }) => {
  return (
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
        {products.map((product, index) => {
          return (
            <tr key={product.product_id}>
              <td className="border border-slate-300 px-3 py-[6px]">
                {index + 1}
              </td>
              <td className="border border-slate-300 px-3 py-[6px]">
                {product.product_name}
              </td>
              <td className="border border-slate-300 px-3 py-[6px]">
                {product.product_price || "Chưa cập nhật"}
              </td>
              <td className="border border-slate-300 px-3 py-[6px]">
                {ProductService.getCatgoryNameById(
                  product.category_id,
                  categories
                )}
              </td>
              <td className="border border-slate-300 px-3 py-[6px]">
                <div className="flex justify-center">
                  {ProductService.getColorByIds(product.color_id, colors).map(
                    (item) => {
                      return <ColorItem color={item} key={item} />;
                    }
                  )}
                </div>
              </td>
              <td className="border border-slate-300 px-3 py-[6px]">
                {product.size_id}
              </td>
              <td className="border border-slate-300 px-3 py-[6px] ">
                {product.product_description}
              </td>
              <td className="border border-slate-300 px-3 py-[6px] ">
                <button className="px-2 py-1 rounded-sm bg-blue-300 hover:bg-blue-500 hover:text-white mr-2 font-semibold">
                  Update
                </button>
                <button className="px-2 py-1 rounded-sm bg-red-500 text-white font-semibold hover:bg-red-700">
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductTable;
