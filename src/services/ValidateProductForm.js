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

  static validateSubProduct(subProduct) {
    if (subProduct && Object.keys(subProduct).length > 0) {
      return true;
    }
    return false;
  }

  static validateProduct({ name, category_id, sub_products }) {
    if (
      this.validateName(name) &&
      this.validateCategory(category_id) &&
      this.validateSubProduct(sub_products)
    ) {
      return true;
    }
    return false;
  }
}

export default ValidateProductForm;
