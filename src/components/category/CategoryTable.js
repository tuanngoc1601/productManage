import { messages } from "../../constants/messages";
import DeleteCategoryPopup from "./DeleteCategoryPopup";
import UpdateCategoryPopup from "./UpdateCategoryPopup";
const CategoryTable = ({ categories }) => {
  return (
    <table className="w-2/3 text-sm  text-gray-500 dark:text-gray-400 text-center">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
        <tr>
          <th scope="col" className="px-6 py-3">
            {messages.common.tableNo}
          </th>
          <th scope="col" className="px-6 py-3">
            {messages.category.category}
          </th>
          <th scope="col" className="px-6 py-3">
            {messages.common.tableAction}
          </th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category, index) => (
          <tr
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            key={category.id}
          >
            <td className="px-6 py-4">{index + 1}</td>
            <td className="px-6 py-4">{category.name}</td>
            <td className="px-6 py-4 flex items-center justify-center">
              <UpdateCategoryPopup category={category} />
              <DeleteCategoryPopup categoryId={category.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryTable;
