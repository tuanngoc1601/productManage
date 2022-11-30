class ValidateProductForm {
  static validateName(name) {
    if (name && name.length < 50) {
      return true;
    }
    return false;
  }

  static validateCategory(category) {
    if (!category) {
      return false;
    }
    return true;
  }

  static validateColors(colors) {
    if (colors && colors.length > 0) {
      return true;
    }
    return false;
  }

  static validateSizes(sizes) {
    if (sizes && sizes.length > 0) {
      return true;
    }
    return false;
  }

  static validateImgs(imgs) {
    if (imgs && imgs.length > 0) {
      return true;
    }
    return false;
  }

  static validateProduct({
    product_name,
    category_id,
    color_id,
    size_id,
    img_urls,
  }) {
    // console.log({ product_name, category_id, color_id, size_id, img_urls });
    if (
      this.validateName(product_name) &&
      this.validateCategory(category_id) &&
      this.validateColors(color_id) &&
      this.validateSizes(size_id) &&
      this.validateImgs(img_urls)
    ) {
      return true;
    }
    return false;
  }
}

export default ValidateProductForm;
