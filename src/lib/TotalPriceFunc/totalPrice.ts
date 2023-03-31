export function totalPrice(cartData: any[]) {
  return cartData.reduce(
    (
      sum: number,
      item: {
        quantity: number;
        items: { price: number };
      }
    ) => {
      return sum + item.items.price * item.quantity;
    },
    0
  );
}
