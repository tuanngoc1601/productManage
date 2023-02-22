class ValidateProductForm {
  static validateName(name) {
    if (name && name.length < 50) {
      return {
        status: true,
        message: "",
      };
    }
    return {
      message: "Name must be less than 50 characters",
      status: false,
    };
  }

  static validateCategory(category) {
    if (!category) {
      return {
        message: "Please select category",
        status: false,
      };
    }
    return {
      message: "",
      status: true,
    };
  }

  static validateSubProduct(subProduct) {
    if (subProduct && Object.keys(subProduct).length > 0) {
      return {
        message: "",
        status: true,
      };
    }
    return {
      message: "Please add sub product",
      status: false,
    };
  }

  static validateProduct({ name, category_id, sub_products }) {
    if (
      this.validateName(name).status &&
      this.validateCategory(category_id).status &&
      this.validateSubProduct(sub_products).status
    ) {
      return {
        message: "",
        status: true,
      };
    }
    const listErrors = [];
    if (!this.validateName(name).status) {
      listErrors.push(this.validateName(name).message);
    }
    if (!this.validateCategory(category_id).status) {
      listErrors.push(this.validateCategory(category_id).message);
    }
    if (!this.validateSubProduct(sub_products).status) {
      listErrors.push(this.validateSubProduct(sub_products).message);
    }
    return {
      erors: listErrors,
      status: false,
    };
  }
}

export default ValidateProductForm;
