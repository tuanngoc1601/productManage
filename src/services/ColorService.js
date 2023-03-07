import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import ColorApi from "../api/ColorApi";
import { messages } from "../constants/messages";
import { IsLoading, ReLoad } from "../store/CommonState";
import { toastListError } from "../utils";
const ColorService = () => {
  const setLoading = useSetRecoilState(IsLoading);
  const setIsReaload = useSetRecoilState(ReLoad);

  return {
    createColor: async (color) => {
      if (!color.name) {
        return toast.warning(messages.color.COLOR_NAME_REQUIRED);
      }
      if (!color.code) {
        return toast.warning(messages.color.COLOR_CODE_REQUIRED);
      }
      setLoading(true);
      await ColorApi.createColor(color);
      setLoading(false);
      setIsReaload((prev) => !prev);
      toast.success(messages.color.ADD_COLOR_SUCCESS);
    },

    updateColor: async (color, id) => {
      if (!color.name) {
        return toast.warning(messages.color.COLOR_NAME_REQUIRED);
      }
      if (!color.code) {
        return toast.warning(messages.color.COLOR_CODE_REQUIRED);
      }
      setLoading(true);
      await ColorApi.updateColor({
        id: id,
        name: color.name,
        code: color.code,
      });
      setIsReaload((prev) => !prev);
      setLoading(false);
      toast.success(messages.color.UPDATE_COLOR_SUCCESS);
    },

    deleteColor: async (id) => {
      setLoading(true);
      await ColorApi.deleteColor(id);
      setIsReaload((prev) => !prev);
      setLoading(false);
      toast.success(messages.color.DELETE_COLOR_SUCCESS);
    },

    handleError: (error) => {
      setLoading(false);
      toastListError(error);
    },
  };
};

export default ColorService;
