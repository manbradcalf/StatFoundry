export const CUSTOMER_LABEL_PROPERTIES = [  { key: "country", type: "String" },
  { key: "address", type: "String" },
  { key: "contactTitle", type: "String" },
  { key: "city", type: "String" },
  { key: "phone", type: "String" },
  { key: "contactName", type: "String" },
  { key: "postalCode", type: "String" },
  { key: "companyName", type: "String" },
  { key: "fax", type: "String" },
  { key: "region", type: "String" },
  { key: "customerID", type: "String" },];
export interface CustomerProperties {
  country: string;
  address: string;
  contactTitle: string;
  city: string;
  phone: string;
  contactName: string;
  postalCode: string;
  companyName: string;
  fax: string;
  region: string;
  customerID: string;
}