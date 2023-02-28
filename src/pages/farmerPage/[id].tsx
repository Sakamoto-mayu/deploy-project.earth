/* eslint-disable react-hooks/rules-of-hooks */
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/itemList.module.css";

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:8000/farmerdata");
  const data = await res.json();
  const paths = data.map((item: any) => {
    return {
      params: {
        id: String(item.id),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const req1 = await fetch("http://localhost:8000/farmerdata");
  const farmerdata = await req1.json();
  const req2 = await fetch("http://localhost:8000/items");
  const items = await req2.json();
  const req3 = await fetch("http://localhost:8000/category");
  const category = await req3.json();
  return {
    props: {
      params,
      farmerdata,
      items,
      category,
    },
  };
};
//  --------------------------↓getStaticPropsで作ったprops: {item}
export default function page(props: any) {
  // 持っているcookieによって商品一覧変更。
  let cookie = 2;
  // 商品一覧の表示切替用useState
  const [itemSelect, setitemSelect] = useState(cookie);
  // カート情報送信用のuseState
  const [cartItem, setcartItem] = useState({});

  //   id◎
  const id = Number(props.params.id);
  // 対象農家情報取得◎
  const farmerData = props.farmerdata[id - 1];
  // 対象商品全て取得◎
  let items = props.items.filter((item: any) => {
    return item.farmer_id === id;
  });

  // 重複カテゴリーidの商品削除
  const categoryItem = Array.from(
    new Map(items.map((item: any) => [item.category_id, item])).values()
  );
  console.log(props.items);
  // 対象カテゴリー名取得
  const categoryName = categoryItem.map((e: any) => {
    for (const el of props.category) {
      if (e.category_id === el.id) {
        return el.name;
      }
    }
  });
  // 対象カテゴリーの商品取得
  const itemfunction = () => {
    items = items.filter((e: any) => {
      return e.category_id === itemSelect;
    });
  };
  itemfunction();
  //  その他関連商品クリックでの表示切り替え関数。
  const changeItem = (id: any) => {
    setitemSelect(id);
    itemfunction();
  };

  return (
    <></>
    // <div
    //   className={styles.All}
    //   style={{ backgroundImage: `url(${farmerData.coverImageUrl})` }}
    // >
    //   <div className={styles.farmerMain}>
    //     <div
    //       className={styles.farmerCoverImg}
    //       style={{
    //         backgroundImage: `url(${farmerData.iconImageUrl})`,
    //       }}
    //     ></div>
    //     <section className={styles.sec1}>
    //       <h2 className={styles.farmName}>{farmerData.farmeName}</h2>
    //       <p className={styles.representative}>
    //         代表&nbsp;&nbsp;{farmerData.representativeName}
    //       </p>
    //       <p className={styles.farmYears}>
    //         農家歴&nbsp;&nbsp;{farmerData.years}年
    //       </p>
    //     </section>
    //   </div>

    //   <div className={styles.farmer_career}>
    //     <pre>{farmerData.carryr}</pre>
    //   </div>

    //   <section className={styles.sec2}>
    //     <h2>商品一覧</h2>
    //     <div className={styles.items}>
    //       {items.map((e: any) => {
    //         return (
    //           <div className={styles.sec2_itemSelect} key={e.id}>
    //             <Image
    //               src={e.image}
    //               width={250}
    //               height={250}
    //               className={styles.sec2_ImageBox}
    //               alt={"野菜画像"}
    //             />
    //             <div>
    //               <p>{e.name}</p>
    //             </div>
    //             <div>
    //               <p>価格:&nbsp;{e.price}円</p>
    //             </div>
    //             <div>
    //               <label htmlFor={e.id}>
    //                 数量:&nbsp;
    //                 <select id={e.id}>
    //                   <option value="---">---</option>
    //                   <option value="1">1</option>
    //                   <option value="2">2</option>
    //                   <option value="3">3</option>
    //                   <option value="4">4</option>
    //                   <option value="5">5</option>
    //                 </select>
    //               </label>
    //             </div>
    //             <button>カートに入れる</button>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </section>

    //   <section className={styles.sec3}>
    //     <h2>その他関連商品</h2>
    //     <div className={styles.otherItems}>
    //       {categoryItem.map((e: any, index) => {
    //         return (
    //           <div
    //             className={styles.otherItem}
    //             key={e.id}
    //             onClick={() => changeItem(e.category_id)}
    //           >
    //             <Image
    //               src={e.image}
    //               width={250}
    //               height={250}
    //               className={styles.sec3_ImageBox}
    //               alt={"野菜画像"}
    //             />
    //             <div>
    //               <p>{categoryName[index]}の商品一覧</p>
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </section>
    // </div>
  );
}