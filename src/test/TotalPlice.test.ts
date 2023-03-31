import TotalPlice from "@/components/TotalPlice";
import { totalPrice } from "@/lib/TotalPriceFunc/totalPrice";
import { render, screen } from "@testing-library/react";

describe("購入者の情報と購入金額を表示する", () => {
  const mock_userInfo = {
    address: "日石町2番1号",
    city: "柏崎市",
    email: "kakuei@example.com",
    id: 1,
    name: "田中角栄",
    password: "kakuei",
    prefecture: "新潟県",
    zipcode: "945-8511",
  };
  const mock_itemCountChange = 100;

  // it("debugの確認", () => {
  //   render(
  //     <TotalPlice
  //       userInfo={mock_userInfo}
  //       itemCountChange={mock_itemCountChange}
  //     />
  //   );
  //   screen.debug();
  // });

  const mock_cartitems = [
    {
      quantity: 5,
      items: { price: 100 },
    },
  ];

  it("正しい合計金額が表示されているか", () => {
    expect(500).toBe(totalPrice(mock_cartitems));
  });
});
