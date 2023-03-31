import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/BreadCrumb.module.css";
import { useState } from "react";

export const BreadCrumb: NextPage = () => {
  const router = useRouter();

  // pathを「/」で分解
  let paths = decodeURI(router.asPath).substring(1).split("/");

  // リンク先アドレスの取得
  let roots: string[] = [""];
  for (let i = 0; i < paths.length; i++) roots.push(roots[i] + "/" + paths[i]);

  let text = paths.map((path) => {
    if (path.search(/farmers/) !== -1) {
      return (path = "検索結果");
    }
    if (path.search(/farmerPage/) !== -1) {
      return (path = "商品詳細");
    }
    if (path === "1") {
      return;
    }
    if (path === "nologinuserCartPage" || path === "loginuserCartPage") {
      return (path = "買い物かご");
    }
  });

  return (
    <div className={styles.container}>
      {/* Homeのリンク */}
      <Link href={"/"}>
        <p className={styles.link}>Top</p>
      </Link>
      {text.map((x, i) => (
        <>
          {/* サブページのリンク */}
          <Link href={roots[i + 1]} key={i}>
            <p className={styles.link}>{x}</p>
          </Link>
        </>
      ))}
    </div>
  );
};
