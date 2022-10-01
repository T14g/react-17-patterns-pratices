import { TRAY_URL } from "../../config";

export const getProductList = (data) => {
  const prods = [];

  data.forEach((variant) => {
    let item = {};
    item.prod_id = variant.Variant.product_id;
    item.img = variant.Variant.VariantImage[0]?.https;
    item.name = "";
    item.url = variant.Variant.url.https;
    item.price = variant.Variant.price;
    item.available = "";
    prods.push(item);
  });

  return prods;
};

export const getParentsURLS = (data) => {
  const urls = [];

  data.forEach((prod) => {
    urls.push(TRAY_URL + "/" + prod.prod_id);
  });

  return urls;
};

export const setParentData = (data, prods) => {
  data.forEach((prod) => {
    prods.forEach((p) => {
      if (p.prod_id === prod.Product.id) {
        p.name = prod.Product.name;
        p.available = prod.Product.available;
      }
    });
  });
};
