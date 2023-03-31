/* eslint-disable react-hooks/rules-of-hooks */
// import IntoCart from "@/components/intoCart";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../../styles/itemList.module.css";
import { Modal } from "@/components/modal/itemSelectModal";
import { Get } from "@/lib/fetchRelation/const/apiFetchrs";
import * as type from "@/types/typescript";

export const getStaticPaths = async () => {
  const data = await Get(`/farmer_data`);
  const paths = data.map((item: any) => {
    return {
      params: {
        id: String(item.id),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const farmerdata = await Get(`/farmer_data`);
  const items = await Get(`/items`);
  const category = await Get(`/category`);
  const cartitems = await Get(`/cartitems`);
  return {
    props: {
      params,
      farmerdata,
      items,
      category,
      cartitems,
    },
  };
};
//  --------------------------↓getStaticPropsで作ったprops: {item}
export default function page(props: any) {
  // 持っているcookieによって商品一覧変更。
  const [cookie, setcookie] = useState({
    category_id: 0,
    user_id: 0,
  });
  // 商品一覧の表示切替用
  const [itemSelect, setitemSelect] = useState<number>();

  useEffect(() => {
    let cookie: any = document.cookie;
    let category = localStorage.getItem("category");
    if (document.cookie !== "") {
      let id = cookie.match("id=[0-9]")[0];
      id = id.substring(3);
      setcookie({
        ...cookie,
        user_id: Number(id),
      });
      setcartData({
        ...cartData,
        user_id: Number(id),
      });
      localStorage.clear();
    }
    setitemSelect(Number(category));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ログインユーザーのカート情報送信用
  const [cartData, setcartData] = useState({
    user_id: 0,
    item_id: 0,
    quantity: 0,
  });

  // ローカルストレージ用
  let [oneTimeStorage, setoneTimeStorage] = useState<any>({});
  let [storage, setstorage] = useState<any>([]);

  // モーダル用
  const [show, setShow] = useState(false);

  //   id◎
  const id = Number(props.params.id);
  // 対象農家情報取得◎
  const farmerData = props.farmerdata[id - 1];
  // 対象商品全て取得◎
  let items = props.items.filter((item: any) => {
    return item.farmer_id === id;
  });

  // ログインユーザーのカート情報
  const userCartitems = props.cartitems.filter((item: type.cartitemsType) => {
    return item.user_id === cookie.user_id;
  });

  // 重複カテゴリーidの商品削除◎
  const categoryItem = Array.from(
    new Map(items.map((item: any) => [item.category_id, item])).values()
  );

  // 対象カテゴリー名取得◎
  const categoryArr = categoryItem.map((e: any) => {
    for (const el of props.category) {
      if (e.category_id === el.id) {
        return el;
      }
    }
  });

  // // 対象カテゴリーの商品取得
  const itemfunction = () => {
    items = items.filter((e: any) => {
      return e.category_id === itemSelect;
    });
  };
  itemfunction();

  //  その他関連商品クリックでの表示切り替え関数。
  const changeItem = (id: any) => {
    setitemSelect(id);
  };

  // 下記JSX
  return (
    <div
      className={styles.All}
      style={{ backgroundImage: `url(${farmerData.cover_imageurl})` }}
    >
      <div className={styles.farmerMain}>
        <div
          className={styles.farmerCoverImg}
          style={{
            backgroundImage: `url(${farmerData.icon_imageurl})`,
          }}
        ></div>
        <section className={styles.sec1}>
          <h2 className={styles.farmName}>{farmerData.farm_name}</h2>
          <p className={styles.representative}>
            代表&nbsp;&nbsp;{farmerData.representative_name}
          </p>
          <p className={styles.farmYears}>
            農家歴&nbsp;&nbsp;{farmerData.year}年
          </p>
        </section>
      </div>

      <div className={styles.farmer_career}>
        <pre>{farmerData.carryr}</pre>
      </div>

      <section className={styles.sec3}>
        <h2>商品一覧</h2>
        <div className={styles.otherItems}>
          {categoryItem.map((e: any, index) => {
            // if (e.category_id !== itemSelect) {
            return (
              <>
                <div
                  className={styles.otherItem}
                  key={e.id}
                  onClick={() => {
                    changeItem(e.category_id), setShow(true);
                  }}
                >
                  <div>
                    <p>{categoryArr[index].name}の商品一覧へ</p>
                  </div>

                  <Image
                    src={categoryArr[index].image}
                    width={250}
                    height={250}
                    className={styles.sec3_ImageBox}
                    alt={"野菜画像"}
                  />
                  <div className={styles.mask}>
                    <div className={styles.caption}>CLICK</div>
                  </div>
                </div>
              </>
            );
            // }
          })}
        </div>
      </section>
      <Modal
        show={show}
        setShow={setShow}
        farmerItems={items}
        cookie={cookie}
        cartData={cartData}
        setcartData={setcartData}
        oneTimeStorage={oneTimeStorage}
        setoneTimeStorage={setoneTimeStorage}
        storage={storage}
        setstorage={setstorage}
        userCartitems={userCartitems}
      />
    </div>
  );
}
