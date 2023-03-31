import { apiPost } from "@/lib/fetchRelation/APIPOST/apiPost";
import * as type from "@/types/typescript";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "../../styles/itemList.module.css";
import * as cartFetchOptions from "@/lib/fetchRelation/cartRelation/cartFetchOptions";

export function Modal({
  show,
  setShow,
  farmerItems,
  cookie,
  cartData,
  setcartData,
  oneTimeStorage,
  setoneTimeStorage,
  storage,
  setstorage,
  userCartitems,
}: {
  show: boolean;
  setShow: any;
  farmerItems: any;
  cookie: any;
  cartData: any;
  setcartData: any;
  oneTimeStorage: any;
  setoneTimeStorage: any;
  storage: any;
  setstorage: any;
  userCartitems: type.cartitemsType[];
}) {
  // カートへボタン押下後の送信
  useEffect(() => {
    if (cookie.user_id !== 0) {
      apiPost(
        "/cartRelation/cartDataEdit",
        cartFetchOptions.cartPostValue(
          cartData.user_id,
          cartData.item_id,
          cartData.quantity
        )
      );
    } else {
      if (localStorage.getItem(`${oneTimeStorage.id}`) !== null) {
        let cartItem: any = localStorage.getItem(`${oneTimeStorage.id}`);
        cartItem = JSON.parse(cartItem);
        cartItem[0].quantity = oneTimeStorage.quantity;
        cartItem = JSON.stringify(cartItem);
        localStorage.setItem(`${oneTimeStorage.id}`, cartItem);
      } else if (storage.length > 0) {
        let item = storage;
        item = JSON.stringify(item);
        localStorage.setItem(`${oneTimeStorage.id}`, item);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storage]);

  //   モーダルを閉じる
  const closeModal = () => {
    setShow(false);
  };

  // Select選択後
  const itemQuantityChange = (
    item: any,
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    if (cookie.user_id === 0) {
      setoneTimeStorage({
        id: item.id,
        item: item,
        quantity: Number(event.target.value),
      });
    } else {
      setcartData({
        ...cartData,
        item_id: Number(item.id),
        quantity: Number(event.target.value),
      });
    }
  };

  //   カートボタン押下後のイベント
  function cartInport() {
    setstorage([oneTimeStorage]);
  }

  //   数量変更ボタン押下
  function cartPatch() {
    apiPost(
      "/cartRelation/cartDataEdit",
      cartFetchOptions.cartPatchValue(
        cartData.user_id,
        cartData.item_id,
        cartData.quantity
      )
    );
  }

  console.log(userCartitems);
  if (show) {
    return (
      <div className={styles.overlay}>
        <div className={styles.content}>
          {farmerItems.map((item: type.itemType) => {
            return (
              <>
                <div className={styles.sec2_itemSelect}>
                  <div className={styles.imageBox}>
                    <Image
                      src={item.image}
                      width={250}
                      height={250}
                      className={styles.sec2_Image}
                      alt={"野菜画像"}
                    />
                  </div>
                  <div className={styles.nameBox}>
                    <p>{item.name}</p>
                  </div>
                  <div className={styles.priceBox}>
                    <p>価格&nbsp;&nbsp;{item.price}</p>
                  </div>
                  <div className={styles.selectBox}>
                    <label htmlFor={`${item.id}`}>
                      数量&nbsp;&nbsp;
                      <select
                        className={styles.select}
                        id={`${item.id}`}
                        onChange={(event) => itemQuantityChange(item, event)}
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
                      </select>
                    </label>
                  </div>
                  <div className={styles.buttonBox}>
                    {localStorage.getItem(`button${item.id}`) !== null ||
                    userCartitems.some(
                      (cartItem) => cartItem.item_id === item.id
                    ) ? (
                      <button
                        onClick={() =>
                          cookie.user_id !== 0 ? cartPatch() : cartInport()
                        }
                      >
                        <span className={styles.buttonString}>
                          数量を変更する。
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          cartInport(),
                            localStorage.setItem(
                              `button${item.id}`,
                              `${item.id}`
                            );
                        }}
                      >
                        <span className={styles.buttonString}>
                          カートに入れる
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </>
            );
          })}
          <p onClick={closeModal} className={styles.contentClose}>
            閉じる
          </p>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
