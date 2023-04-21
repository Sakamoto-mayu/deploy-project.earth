import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";
import Image from "next/image";
import styles from "../styles/record.module.css";
import { fetcher } from "@/lib/fecher";

//SWRを使う　indexの中でこのコンポーネントのみCSRをするイメージ

type Farmer = {
  farmer_data: {
    farm_name: string;
    icon_imageurl: string;
  };
  items: {
    id: number;
    name: string;
    image: string;
  };
};

export default function Record() {
  const [cookie, setCookie] = useState<number>();
  useEffect(() => {
    let cookie: string = document.cookie;
    if (cookie !== null) {
      const idMatch = cookie.match("id=[0-100]");
      if (idMatch !== null) {
        let id: string | number = idMatch[0];
        id = Number(id.substring(3));
        setCookie(id);
      }
    }
  }, []);

  const { data, error } = useSWR<Farmer[]>(`/api/getRecordApi`, fetcher);
  if (error) return <div>エラーです</div>;
  if (!data) return <div>データがありません</div>;
  console.log("履歴", data);
  console.log("エラー", error);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const cartData = {
      user_id: cookie,
      item_id: data[0].items.id,
      quantity: 1,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    };
    const response = await fetch("/api/cartInport", options);
    console.log(response);
    const result = await response.json();
    console.log(result);
  };

  return (
    <>
      {data.length === 1 && data[0].farmer_data && data[0].items && (
        <>
          <div className={styles.section}>
            <div className={styles.border}>
              <h2 className={styles.title}>前回購入された商品と農家さん</h2>
              <div className={styles.container}>
                <div className={styles.half_one}>
                  <div className={styles.height}>
                    <Image
                      src={data[0].farmer_data.icon_imageurl}
                      alt={"画像"}
                      width={300}
                      height={200}
                      className={styles.img}
                    />
                    <p
                      className={styles.text_center}
                    >{`${data[0].farmer_data.farm_name}`}</p>
                  </div>
                </div>
                <div className={styles.half_two}>
                  <form
                    onSubmit={(event) => handleSubmit(event)}
                    className={styles.center}
                  >
                    <Image
                      src={data[0].items.image}
                      alt={"画像"}
                      width={250}
                      height={250}
                      className={styles.img_2}
                    />
                    <p
                      className={styles.text_center}
                    >{`${data[0].items.name}`}</p>
                    <div className={styles.button}>
                      <button type="submit" className={styles.inner_button}>
                        カートに入れる
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
