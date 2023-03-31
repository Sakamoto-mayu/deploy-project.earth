/* eslint-disable react-hooks/rules-of-hooks */
import React, { SyntheticEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "@/styles/cartpage.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import * as cartFetchOptions from "@/lib/fetchRelation/cartRelation/cartFetchOptions";
import { Get } from "@/lib/fetchRelation/const/apiFetchrs";
import { apiPost } from "@/lib/fetchRelation/APIPOST/apiPost";
import TotalPlice from "@/components/TotalPlice";
import { totalPrice } from "@/lib/TotalPriceFunc/totalPrice";

export async function getServerSideProps(context: {
  req: { cookies: { id: any } };
}) {
  const data = await Get("/cartitems?select=*,items(*)");
  const user = await Get(`/users?id=eq.${context.req.cookies.id}`);
  return {
    props: {
      data,
      user,
    },
  };
}
// ------------------------------------------
const loginuser_cartPage = (props: any) => {
  let data: any = props.data;
  const user = props.user[0];
  const id = props.user[0].id;
  data = data.filter((e: { user_id: any }) => {
    return e.user_id === id;
  });
  const router = useRouter();
  const [itemCountChange, setItemCountChange] = useState(totalPrice(data));
  // -----------------------------------------------------------------------------------------
  // 削除用ファンクション
  const deleteCartItem = async (
    e: /* eslint-disable react-hooks/rules-of-hooks */
    React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item_id: number
  ) => {
    e.preventDefault();
    apiPost(
      "/cartRelation/cartDataEdit",
      cartFetchOptions.cartDeleteValue(id, item_id)
    ).then((res: any) => {
      if (res.status === 200) {
        router.push("/loginuserCartPage");
      }
    });
  };
  // -----------------------------------------------------------------------------------------
  // 数量変更ファンクション
  const changeItemQuantity = (
    event: ChangeEvent<HTMLSelectElement>,
    item_id: number
  ) => {
    event.preventDefault();
    apiPost(
      "/cartRelation/cartDataEdit",
      cartFetchOptions.cartPatchValue(id, item_id, Number(event.target.value))
    ).then(async (res: any) => {
      if (res.status === 200) {
        let itemData: any = await apiPost(
          "/cartRelation/cartDataEdit",
          cartFetchOptions.cartGetValue(id)
        );
        itemData = await itemData.json();
        setItemCountChange(totalPrice(itemData));
      }
    });
  };
  // stripe用データ-----------------------------------------------------------------------------------------
  let checkoutData = data.map(
    (item: { items: { price: any; name: any }; quantity: any }) => {
      return {
        price_data: {
          unit_amount: item.items.price,
          currency: "jpy",
          product_data: {
            name: item.items.name,
          },
        },
        quantity: item.quantity,
      };
    }
  );
  // 下記JSX
  return (
    <>
      <div className={styles.main}>
        <div className={styles.itemList}>
          {data.map((item: any) => {
            return (
              <>
                {/* 下記から商品情報 */}
                <div key={item.id} className={styles.itemBox}>
                  <div className={styles.flex}>
                    <div className={styles.imageBox}>
                      <Image
                        src={item.items.image}
                        width={200}
                        height={200}
                        className={styles.image}
                        alt={"野菜画像"}
                      />
                    </div>
                    <div className={styles.discriptionBox}>
                      <div className={styles.nameBox}>
                        <p> 商品名&nbsp;:&nbsp;{item.items.name}</p>
                      </div>
                      <div className={styles.priceBox}>
                        <p>価格&nbsp;:&nbsp;{item.items.price}</p>
                      </div>
                      {/* con */}
                      <div className={styles.selectBox}>
                        <label htmlFor={item.id}>
                          数量変更&nbsp;:&nbsp;
                          <select
                            id={item.id}
                            defaultValue={item.quantity}
                            onChange={(event) =>
                              changeItemQuantity(event, item.item_id)
                            }
                            className={styles.select}
                          >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                          </select>
                        </label>
                      </div>
                      {/* con */}
                      <div className={styles.buttonBox}>
                        <button
                          className={styles.deleteButton}
                          onClick={(e) => deleteCartItem(e, item.item_id)}
                        >
                          カートから削除
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        {/* 下記から小計表示と購入手続きボタン */}
        <div className={styles.fixedBox}>
          <div className={styles.subTotalBox}>
            <form action="/api/checkout_sessions" method="POST">
              <input
                type="hidden"
                name="data"
                value={JSON.stringify(checkoutData)}
              />
              <TotalPlice userInfo={user} itemCountChange={itemCountChange} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default loginuser_cartPage;
