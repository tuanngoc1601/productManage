class ProductService {
  static getColorById(colorId, colors) {
    const colorCode = colors.find((color) => color.color_id === colorId);
    return colorCode;
  }
  static getColorByIds(colorIds, colors) {
    const data = colorIds.map((colorId) => {
      const colorCode = this.getColorById(colorId, colors);
      return colorCode?.color_code;
    });
    return data;
  }
  static getCatgoryNameById(categoryId, categories) {
    const categoryName = categories.find(
      (category) => category.category_id === categoryId
    );
    return categoryName.category_name;
  }
}

export default ProductService;
