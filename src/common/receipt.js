class Receipt {
  constructor() {
    this.enties = {};
  }

  receiptKey(categoryName, productId) {
    return `${categoryName}.${productId}`;
  }

  add(categoryName, productId) {
    const key = this.receiptKey(categoryName, productId);
    this.enties[key] = {
      categoryName: categoryName,
      productId: productId
    };
  }

  get(categoryName, productId) {
    const key = this.receiptKey(categoryName, productId);
    return this.enties[key];
  }

  delete(categoryName, productId) {
    const key = this.receiptKey(categoryName, productId);
    delete this.enties[key];
  }

  has(categoryName, productId) {
    return (
      this.get(categoryName, productId) !== undefined &&
      this.get(categoryName, productId) !== null
    );
  }

  getAll() {
    return this.enties;
  }
}

module.exports = Receipt;
