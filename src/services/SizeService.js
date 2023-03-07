import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import SizeApi from "../api/SizeApi";
import { messages } from "../constants/messages";
import { IsLoading, ReLoad } from "../store/CommonState";
import { toastListError } from "../utils";
const SizeService = () => {
  const setLoading = useSetRecoilState(IsLoading);
  const setIsReload = useSetRecoilState(ReLoad);

  return {
    createSize: async (sizeName) => {
      if (!sizeName) return toast.warning(messages.size.SIZE_NAME_REQUIRED);
      setLoading(true);
      await SizeApi.createSize({
        name: sizeName,
      });
      setLoading(false);
      setIsReload((prev) => !prev);
      toast.success(messages.size.ADD_SIZE_SUCCESS);
    },

    updateSize: async (size, updateSizeName) => {
      if (!updateSizeName) {
        return toast.warning(messages.size.SIZE_NAME_REQUIRED);
      }

      if (updateSizeName === size.name) {
        return toast.warning(messages.size.SIZE_NAME_EXISTED);
      }
      setLoading(true);
      await SizeApi.updateSize({
        id: size.id,
        name: updateSizeName,
      });
      setIsReload((prev) => !prev);
      setLoading(false);
      toast.success(messages.size.UPDATE_SIZE_SUCCESS);
    },

    deleteSize: async (id) => {
      setLoading(true);
      await SizeApi.deleteSize(id);
      setIsReload((prev) => !prev);
      setLoading(false);
      toast.success(messages.size.DELETE_SIZE_SUCCESS);
    },

    handleError: (error) => {
      setLoading(false);
      toastListError(error);
    },
  };
};

export default SizeService;
