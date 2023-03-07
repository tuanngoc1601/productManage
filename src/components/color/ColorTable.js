import { messages } from "../../constants/messages";
import DeleteColorPopup from "./DeleteColorPopup";
import UpdateColorPopup from "./UpdateColorPopup";

const ColorTable = ({ colors }) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            {messages.common.tableNo}
          </th>
          <th scope="col" className="px-6 py-3">
            {messages.common.name}
          </th>
          <th scope="col" className="px-6 py-3">
            {messages.color.code}
          </th>
          <th scope="col" className="px-6 py-3 text-center">
            {messages.color.color}
          </th>
          <th scope="col" className="px-6 py-3 text-center">
            {messages.common.tableAction}
          </th>
        </tr>
      </thead>
      <tbody>
        {colors.map((color, index) => {
          return (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={color.id}
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{color.name}</td>
              <td className="px-6 py-4">{color.code}</td>
              <td
                className="px-6 py-4"
                style={{ backgroundColor: color.code }}
              ></td>
              <td className="px-6 py-4 flex items-center justify-center">
                <UpdateColorPopup color={color} />
                <DeleteColorPopup colorId={color.id} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ColorTable;
