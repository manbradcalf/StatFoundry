export const ORDER_LABEL_PROPERTIES = [  { key: "customerID", type: "String" },
  { key: "shipCity", type: "String" },
  { key: "orderID", type: "String" },
  { key: "freight", type: "String" },
  { key: "requiredDate", type: "String" },
  { key: "employeeID", type: "String" },
  { key: "shipName", type: "String" },
  { key: "shipPostalCode", type: "String" },
  { key: "orderDate", type: "String" },
  { key: "shipRegion", type: "String" },
  { key: "shipCountry", type: "String" },
  { key: "shippedDate", type: "String" },
  { key: "shipVia", type: "String" },
  { key: "shipAddress", type: "String" },];
export interface OrderProperties {
  customerID: string;
  shipCity: string;
  orderID: string;
  freight: string;
  requiredDate: string;
  employeeID: string;
  shipName: string;
  shipPostalCode: string;
  orderDate: string;
  shipRegion: string;
  shipCountry: string;
  shippedDate: string;
  shipVia: string;
  shipAddress: string;
}