import "reactjs-popup/dist/index.css";
import { useRecoilState, useRecoilValue } from "recoil";
import CategoryTable from "../../components/category/CategoryTable";
import CreateCategoryPopup from "../../components/category/CreateCategoryPopup";
import Loading from "../../components/loading/Loading";
import useGetAllCategory from "../../hooks/useGetAllCategory";
import { IsLoading, ReLoad } from "../../store/CommonState";
import { SearchNavbarValue } from "../../store/SearchValues";
const Category = () => {
  const isReload = useRecoilValue(ReLoad);
  const loading = useRecoilValue(IsLoading);
  const [searchValue] = useRecoilState(SearchNavbarValue);
  const categories = useGetAllCategory(isReload, searchValue);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="my-6 mx-20 relative overflow-x-auto flex flex-col items-center">
      <CreateCategoryPopup />
      <CategoryTable categories={categories} />
    </div>
  );
};

export default Category;
