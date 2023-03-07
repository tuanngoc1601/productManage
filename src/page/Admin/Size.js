import "reactjs-popup/dist/index.css";
import { useRecoilState, useRecoilValue } from "recoil";
import Loading from "../../components/loading/Loading";
import CreateSizePopup from "../../components/size/CreateSizePopup";
import SizeTable from "../../components/size/SizeTable";
import useGetAllSize from "../../hooks/useGetAllSize";
import { IsLoading, ReLoad } from "../../store/CommonState";
import { SearchNavbarValue } from "../../store/SearchValues";
const Size = () => {
  const isReload = useRecoilValue(ReLoad);
  const loading = useRecoilValue(IsLoading);
  const [searchValue] = useRecoilState(SearchNavbarValue);
  const sizes = useGetAllSize(isReload, searchValue);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="my-12 mx-20 relative overflow-x-auto flex flex-col items-center">
      <CreateSizePopup />
      <SizeTable sizes={sizes} />
    </div>
  );
};

export default Size;
