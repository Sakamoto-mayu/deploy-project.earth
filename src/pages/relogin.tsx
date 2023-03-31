import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/login.module.css";
import Link from "next/link";
import { apiPost } from "@/lib/fetchRelation/APIPOST/apiPost";
import * as cartFetchOptions from "@/lib/fetchRelation/cartRelation/cartFetchOptions";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cartData, setcartData] = useState<any>({});

  useEffect(() => {
    if (localStorage.getItem("cartPage") !== null) {
      localStorage.removeItem("cartPage");
    }
    let postData: any = {
      storage: [],
      localStorage: [],
    };
    for (let i = 0; i < localStorage.length; i++) {
      let num = localStorage.key(i);
      if (Number(num) > 0) {
        let test: any = localStorage.getItem(`${num}`);
        test = JSON.parse(test);
        // console.log(test);
        postData.localStorage.push(test[0]);
        postData.storage.push({
          price_data: {
            unit_amount: test[0].item.price,
            currency: "jpy",
            product_data: {
              name: test[0].item.name,
            },
          },
          quantity: test[0].quantity,
        });
      }
    }
    setcartData(postData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };
    const response = await apiPost("/relogin", data);
    const result = await response.json();
    if (response.ok !== true || result === "") {
      router.replace("/login");
    } else {
      const res = await apiPost("/checkout_sessions", cartData.storage);
      const data = await res.json();
      if (res.status === 200) {
        // cartitemsの有無でpostかpatchに切り替え
        const res = await apiPost("/cartRelation/getCartitems", result[0].id);
        const cartitems = await res.json();
        let postItems = cartData.localStorage.map((item: any) => {
          return {
            user_id: result[0].id,
            item_id: item.id,
            quantity: item.quantity,
          };
        });
        //cartitemsとpostItemsを比較
        console.log("items", postItems);
        if (cartitems.length > 0) {
          for (const postitem of postItems) {
            cartitems.some(
              (cartitem: any) => cartitem.item_id === postitem.item_id
            )
              ? apiPost(
                  "/cartRelation/cartDataEdit",
                  cartFetchOptions.localStorageDataPatchValue(postitem)
                )
              : apiPost(
                  "/cartRelation/cartDataEdit",
                  cartFetchOptions.localStorageDataPostValue(postitem)
                );
          }
        } else {
          apiPost(
            "/cartRelation/cartDataEdit",
            cartFetchOptions.localStorageDataPostValue(postItems)
          );
        }
      }

      localStorage.clear();
      router.push(data.redirectUrl);
    }
  };
  return (
    <>
      <div className={styles.blank}>
        <div className={styles.container}>
          <div className={styles.width}>
            <div className={styles.title}>会員の方はこちら</div>
            <form className="" onSubmit={(event) => handleSubmit(event)}>
              <div>
                <div className={styles.line}>
                  <label htmlFor="email" className="">
                    メールアドレス
                  </label>
                  <div className={styles.input}>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className={styles.input_form}
                      id=""
                      placeholder="@example.com"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.line}>
                <label htmlFor="" className="form-label">
                  パスワード
                </label>
                <div className={styles.input}>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className={styles.input_form}
                    id=""
                    placeholder="パスワード"
                  />
                </div>
              </div>
              <div className={styles.button}>
                <button type="submit" className={styles.inner_button}>
                  ログイン
                </button>
              </div>
            </form>
            <div className={styles.title}>新規会員登録はこちら</div>
            <Link href={"/user_register/"}>
              <div className={styles.button}>
                <button type="submit" className={styles.inner_button}>
                  新規会員登録をする
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
