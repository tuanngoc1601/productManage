import React from "react";
import { useRecoilValue } from "recoil";
import ColorTable from "../../components/color/ColorTable";
import CreateColorPopup from "../../components/color/CreateColorPopup";
import Loading from "../../components/loading/Loading";
import useGetAllColor from "../../hooks/useGetAllColor";
import { IsLoading, ReLoad } from "../../store/CommonState";
import { SearchNavbarValue } from "../../store/SearchValues";
const Color = () => {
  const isReload = useRecoilValue(ReLoad);
  const searchValue = useRecoilValue(SearchNavbarValue);
  const colors = useGetAllColor(isReload, searchValue);
  const loading = useRecoilValue(IsLoading);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="my-12 mx-20 relative overflow-x-auto">
      <CreateColorPopup />
      <ColorTable colors={colors} />
    </div>
  );
};

export default Color;
