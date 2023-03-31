import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import styles from "../styles/complete.module.css";

export default function Complete() {
  useEffect(() => {
    let cookie: any = document.cookie;

    let id = cookie.match("id=[0-9]")[0];
    id = id.substring(3);
    let deleteParam = {
      user_id: Number(id),
    };
    fetch("/api/completeCartDelete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteParam),
    });
  }, []);
  return (
    <>
      <Head>
        <title>産チョク／商品購入完了画面</title>
      </Head>
      <main className={styles.completeMain}>
        <section className={styles.message}>
          <h1>商品購入が完了しました！</h1>
          <h3>
            ご購入いただきありがとうございます。商品の到着までお待ち下さい。
          </h3>
        </section>
        <button className={styles.topLinkButton} type="submit">
          <Link href="/">TOPへ戻る</Link>
        </button>
      </main>
    </>
  );
}
