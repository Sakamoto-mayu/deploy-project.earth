export type cookieType = {
  category_id: number;
  user_id: number;
};

export type storageType = {
  item_id: number;
  quantity: number;
};

export type cartImportValueType = {
  query: string;
  user: number;
  item: number;
  quantityNumber: number;
};

export type deleteValueType = {
  query: string;
};

export type clientValueType = {
  method: string;
  user: number;
  item: number;
  quantityNumber: number;
};

export type userInfoType = {
  address: string;
  city: string;
  email: string;
  id: number;
  name: string;
  password: string;
  prefecture: string;
  zipcode: string;
};

export type cartItemDataType = {
  id: number;
  item_id: number;
  items: {
    category_id: number;
    comment: string;
    expaire: string;
    farmer_id: number;
    id: number;
    image: string;
    items_search: string;
    name: string;
    price: number;
  };
  quantity: number;
  user_id: number;
};

export type itemType = {
  category_id: number;
  comment: string;
  expaire: string;
  farmer_id: number;
  id: number;
  image: string;
  items_search: string;
  name: string;
  price: number;
};

export type cartitemsType = {
  id: number;
  item_id: number;
  quantity: number;
  user_id: number;
};
