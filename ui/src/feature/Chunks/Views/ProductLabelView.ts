export const PRODUCT_LABEL_PROPERTIES = [  { key: "reorderLevel", type: "Long" },
  { key: "unitsInStock", type: "Long" },
  { key: "unitPrice", type: "Double" },
  { key: "supplierID", type: "String" },
  { key: "productID", type: "String" },
  { key: "discontinued", type: "Boolean" },
  { key: "quantityPerUnit", type: "String" },
  { key: "categoryID", type: "String" },
  { key: "unitsOnOrder", type: "Long" },
  { key: "productName", type: "String" },];
export interface ProductProperties {
  reorderLevel: number;
  unitsInStock: number;
  unitPrice: number;
  supplierID: string;
  productID: string;
  discontinued: boolean;
  quantityPerUnit: string;
  categoryID: string;
  unitsOnOrder: number;
  productName: string;
}