class ProductService {
  static getColorById(colorId, colors) {
    const colorCode = colors.find((color) => color.color_id == colorId);
    return colorCode;
  }

  static getColorByIds(colorIds, colors) {
    if (!colorIds) {
      return [];
    }
    const data = colorIds.map((colorId) => {
      const colorCode = this.getColorById(colorId, colors);
      return colorCode;
    });
    return data;
  }

  static getCatgoryById(categoryId, categories) {
    const categoryName = categories.find(
      (category) => category.category_id == categoryId
    );
    return categoryName;
  }

  static getSizeById(sizeId, sizes) {
    const size = sizes.find((size) => size.size_id == sizeId);
    return size;
  }

  static getSizeByIds(sizeIds, sizes) {
    if (!sizeIds) {
      return [];
    }
    const data = sizeIds.map((sizeId) => {
      const size = this.getSizeById(sizeId, sizes);
      return size;
    });
    return data;
  }

  static convertColorsToSelectElementData(colors) {
    if (!colors) {
      return [];
    }
    return colors.map((color) => {
      return { value: color.color_id, label: color.color_code };
    });
  }

  static convertSizesToSelectElementData(sizes) {
    if (!sizes) {
      return [];
    }
    return sizes.map((size) => {
      return { value: size.size_id, label: size.size_name };
    });
  }

  static convertCategoriesToSelectElementData(categories) {
    if (!categories) {
      return;
    }
    return categories.map((category) => {
      return { value: category.category_id, label: category.category_name };
    });
  }
}

export default ProductService;
