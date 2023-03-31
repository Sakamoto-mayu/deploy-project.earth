// POST----------------------------------------------------------------
export function cartPostValue(
  userValue: number,
  itemValue: number,
  quantityValue: number
) {
  return {
    method: "POST",
    bodyValue: {
      user_id: userValue,
      item_id: itemValue,
      quantity: quantityValue,
    },
  };
}

export function localStorageDataPostValue(data: any) {
  return {
    method: "POST",
    bodyValue: data,
  };
}

// PATCH----------------------------------------------------------------
export function cartPatchValue(
  userValue: number,
  itemValue: number,
  quantityValue: number
) {
  return {
    method: "PATCH",
    bodyValue: {
      user_id: userValue,
      item_id: itemValue,
      quantity: quantityValue,
    },
  };
}

export function localStorageDataPatchValue(data: any) {
  return {
    method: "PATCH",
    bodyValue: data,
  };
}

// DELETE----------------------------------------------------------------
export function cartDeleteValue(userValue: number, itemValue: number) {
  return {
    method: "DELETE",
    bodyValue: {
      user_id: userValue,
      item_id: itemValue,
    },
  };
}

// GET---------------------------------------------------------------------
export function cartGetValue(userValue: number) {
  return {
    method: "GET",
    bodyValue: {
      user_id: userValue,
    },
  };
}
