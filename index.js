const fs = require("fs");

fs.writeFileSync("./products.json", JSON.stringify([
  { name: "product 1", id: 1 },
  { name: "product 2", id: 2 },
  { name: "product 3", id: 3 }
]));

const data = JSON.parse(fs.readFileSync("./products.json", "utf8"));

function getProductById(id) {
  return data.find(product => product.id === id);
}

function addProduct(name) {
  const newProduct = {
    name,
    id: data.length ? data[data.length - 1].id + 1 : 1
  };
  data.push(newProduct);
  fs.writeFileSync("./products.json", JSON.stringify(data, null, 2));
  return newProduct;
}

function deleteProduct(id) {
  const productIndex = data.findIndex(product => product.id === id);
  if (productIndex === -1) return null;
  const deletedProduct = data.splice(productIndex, 1);
  fs.writeFileSync("./products.json", JSON.stringify(data, null, 2));
  return deletedProduct[0];
}

function editProduct(id, newName) {
  const product = data.find(product => product.id === id);
  if (!product) return null;
  product.name = newName;
  fs.writeFileSync("./products.json", JSON.stringify(data, null, 2));
  return product;
}

console.log("Get product by ID 1:", getProductById(1));
console.log("Adding a new product:", addProduct("product 4"));
console.log("Deleting product by ID 2:", deleteProduct(2));
console.log("Editing product ID 3:", editProduct(3, "updated product 3"));
