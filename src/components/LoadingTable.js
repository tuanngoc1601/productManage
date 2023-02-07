import Skeleton from "react-loading-skeleton";
const LoadingTable = () => {
  return (
    <table className="text-center m-0 w-full">
      <thead className="bg-blue-600 text-white">
        <tr className="w-20">
          <th className="border-t border-l border-r border-slate-300 px-4 py-4">
            No
          </th>
          <th className="border-t border-l border-r border-slate-300 px-4 py-2">
            Name
          </th>
          <th className="border-t border-l border-r border-slate-300 px-4 py-2">
            Price (VNĐ)
          </th>
          <th className="border-t border-l border-r border-slate-300 px-4 py-2">
            Sale off (%)
          </th>
          <th className="border-t border-l border-r border-slate-300 px-2 py-2 min-w-[160px]">
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
        <tr>
          <td colSpan={2} className="py-2 px-1">
            <Skeleton height={50} />
          </td>
          <td colSpan={2} className="py-2 px-1">
            <Skeleton height={50} />
          </td>
          <td colSpan={3} className="py-2 px-1">
            <Skeleton height={50} />
          </td>
          <td colSpan={2} className="py-2 px-1">
            <Skeleton height={50} />
          </td>
        </tr>
        <tr>
          <td colSpan={2} className="py-2 px-1">
            <Skeleton height={50} />
          </td>
          <td colSpan={2} className="py-2 px-1">
            <Skeleton height={50} />
          </td>
          <td colSpan={3} className="py-2 px-1">
            <Skeleton height={50} />
          </td>
          <td colSpan={2} className="py-2 px-1">
            <Skeleton height={50} />
          </td>
        </tr>
        <tr>
          <td colSpan={2} className="py-2 px-1">
            <Skeleton height={50} />
          </td>
          <td colSpan={2} className="py-2 px-1">
            <Skeleton height={50} />
          </td>
          <td colSpan={3} className="py-2 px-1">
            <Skeleton height={50} />
          </td>
          <td colSpan={2} className="py-2 px-1">
            <Skeleton height={50} />
          </td>
        </tr>
        <tr>
          <td colSpan={2} className="py-2 px-1">
            <Skeleton height={50} />
          </td>
          <td colSpan={2} className="py-2 px-1">
            <Skeleton height={50} />
          </td>
          <td colSpan={3} className="py-2 px-1">
            <Skeleton height={50} />
          </td>
          <td colSpan={2} className="py-2 px-1">
            <Skeleton height={50} />
          </td>
        </tr>
        <tr>
          <td colSpan={2} className="py-2 px-1">
            <Skeleton height={50} />
          </td>
          <td colSpan={2} className="py-2 px-1">
            <Skeleton height={50} />
          </td>
          <td colSpan={3} className="py-2 px-1">
            <Skeleton height={50} />
          </td>
          <td colSpan={2} className="py-2 px-1">
            <Skeleton height={50} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default LoadingTable;
