import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import CategoryApi from "../api/CategoryApi";
import { messages } from "../constants/messages";
import { IsLoading, ReLoad } from "../store/CommonState";
import { toastListError } from "../utils";
const CategoryService = () => {
  const setIsReaload = useSetRecoilState(ReLoad);
  const setLoading = useSetRecoilState(IsLoading);

  return {
    createCategory: async (categoryName) => {
      if (!categoryName)
        return toast.warning(messages.category.CATEGORY_NAME_REQUIRED);
      setLoading(true);
      await CategoryApi.createCategory({
        name: categoryName,
      });
      setLoading(false);
      setIsReaload((prev) => !prev);
      toast.success(messages.category.ADD_CATEGORY_SUCCESS);
    },

    updateCategory: async (category, updateCategoryName) => {
      if (!updateCategoryName) {
        return toast.warning(messages.category.CATEGORY_NAME_REQUIRED);
      }

      if (updateCategoryName === category.name) {
        return toast.warning(messages.category.CATEGORY_NAME_EXISTED);
      }
      setLoading(true);
      await CategoryApi.updateCategory({
        id: category.id,
        name: updateCategoryName,
      });
      setIsReaload((prev) => !prev);
      setLoading(false);
      toast.success(messages.category.UPDATE_CATEGORY_SUCCESS);
    },

    deleteCategory: async (id) => {
      setLoading(true);
      await CategoryApi.deleteCategory(id);
      setIsReaload((prev) => !prev);
      setLoading(false);
      toast.success(messages.category.DELETE_CATEGORY_SUCCESS);
    },

    handleError: (error) => {
      setLoading(false);
      toastListError(error);
    },
  };
};

export default CategoryService;
