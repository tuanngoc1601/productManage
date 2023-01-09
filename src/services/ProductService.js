import { unique } from "../utils";

class ProductService {
  static getColorById(colorId, colors) {
    const colorCode = colors.find(
      (color) => color.id.toString() === colorId.toString()
    );
    return colorCode;
  }

  static getColorNameById(colorId, colors) {
    const color = colors.find(
      (color) => color.id.toString() === colorId.toString()
    );
    return color.name;
  }

  static getSizeNameById(sizeId, sizes) {
    const size = sizes.find((size) => size.id.toString() === sizeId.toString());
    return size.name;
  }

  static getColorsByProductId(product, colors) {
    if (product.sub_products.length > 0) {
      const listColors = product.sub_products.map((subProduct) => {
        const color = this.getColorById(subProduct.color_id, colors);
        return color.code;
      });
      return unique(listColors);
    }
    return [];
  }

  static getCatgoryById(categoryId, categories) {
    if (!categoryId) {
      return null;
    }
    const categoryName = categories.find(
      (category) => category.id.toString() === categoryId.toString()
    );
    return categoryName;
  }

  static getSizeById(sizeId, sizes) {
    const size = sizes.find((size) => size.id.toString() === sizeId.toString());
    return size;
  }

  static getSizesByProductId(product, sizes) {
    if (product.sub_products.length > 0) {
      const listSizes = product.sub_products.map((subProduct) => {
        const size = this.getColorById(subProduct.size_id, sizes);
        return size.name;
      });
      return unique(listSizes);
    }
    return [];
  }

  static convertColorsToSelectElementData(colors) {
    if (!colors) {
      return [];
    }
    return colors.map((color) => {
      return { value: color.id, label: color.name, color: color.code };
    });
  }

  static convertSizesToSelectElementData(sizes) {
    if (!sizes) {
      return [];
    }
    return sizes.map((size) => {
      return { value: size.id, label: size.name };
    });
  }

  static convertCategoriesToSelectElementData(categories) {
    if (!categories) {
      return;
    }
    return categories.map((category) => {
      return { value: category.id, label: category.name };
    });
  }
}

export default ProductService;
