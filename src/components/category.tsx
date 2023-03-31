import Image from "next/image";
import useSWR from "swr";
import { useState } from "react";
import styles from "../styles/category.module.css";
import { fetcher } from "@/lib/fecher";
import Link from "next/link";
import Search from "./search";
import { useRouter } from "next/router";

export default function Category() {
  const router = useRouter();
  const { data, error } = useSWR("api/category", fetcher);
  if (error) return <div>エラーです</div>;
  if (!data) return <div>データがありません</div>;
  // データ確認用

  // 試し１：Searchコンポーネントにpropsで渡して検索できないかな？
  // function moveSearch() {
  //   <Search props={data.name} />;
  // }

  // 試し２：farmer.tsxへつなげる。書き方はsearch.tsxと同じような記述。
  const moveSearch = (categoryName: string) => {
    console.log("検索カテゴリー名", categoryName);
    const searchWords = categoryName;
    const uri = encodeURI(searchWords);
    router.push(`/farmers?search=${uri}&page=1`);
  };
  return (
    <>
      <section className={styles.section}>
        <h2 className={styles.title}>商品カテゴリー</h2>
        <div className={styles.picture}>
          {data.map((category: CategoryData) => {
            return (
              <div className="category" key={category.id}>
                <div id={category.id} onClick={() => moveSearch(category.name)}>
                  <div className={styles.shape}>
                    <Image
                      src={category.image}
                      id={category.id}
                      alt="カテゴリー画像"
                      width={250}
                      height={250}
                      className={styles.img}
                    />
                  </div>
                  <p id={category.id} className={styles.text}>
                    {category.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

type CategoryData = {
  id: string;
  name: string;
  image: string;
};
