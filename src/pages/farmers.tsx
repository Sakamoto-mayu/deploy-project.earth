import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/farmers.module.css";
import { Voice } from "@/components/voice";
import { fetcher } from "@/lib/fecher";

export default function Farmers() {
  const router = useRouter();
  const { search, page } = router.query;
  const [pageNumber, setPageNumber] = useState(page ? Number(page) : 1);
  useEffect(() => {
    setPageNumber(Number(page));
    // console.log("useEffect");
  }, [page]);

  console.log("page", page);
  console.log("pageNumber", pageNumber);

  const {
    data: result,
    error,
    isLoading,
  } = useSWR(
    !search ? "/api/farmer" : `/api/farmer?search=${search}&page=${pageNumber}`,
    fetcher
  );
  if (isLoading) return "ロード中";

  // useSWRで取得したデータ（result.data）と、データの個数を最大値とする配列(result.pageNumberArr)
  const data = result.data;
  console.log("data", data);
  const pageNumberArr = result.pageNumberArr;
  if (error) return "エラーが発生しました";
  if (data.length !== 0) {
    const categoryID = data[0].items[0].category_id;
    // console.log("localstrageの値", categoryID);
    localStorage.setItem("category", categoryID);
  }

  return (
    <div>
      <Head>
        <title>検索結果</title>
      </Head>
      <main>
        <h1 className={styles.resultMessage}>生産者検索結果:</h1>
        <div>
          {data.length === 0 && (
            <section className={styles.blankMessage}>
              <div>
                <h2>検索結果がありませんでした。</h2>
                <br />
                入力内容をお確かめの上、もう一度検索をお願いします。
                <br />
                （検索例）キャベツ、にんじん、なす、かぼちゃ...
              </div>
            </section>
          )}

          <div className={styles.result}>
            {data.map((farmer: any) => {
              return (
                <div className={styles.resultBlock} key={farmer.id}>
                  <Link href={`/farmerPage/${farmer.id}`}>
                    <Image
                      className={styles.image}
                      src={farmer.icon_imageurl}
                      alt={"画像"}
                      width={264}
                      height={264}
                    />
                  </Link>
                  <div>
                    <h2 className={styles.farmerName}>{farmer.farm_name}</h2>
                    <p className={styles.comment}>{farmer.comment}</p>
                  </div>
                  <div>
                    <Voice src={farmer.voiceurl} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* ページング機能 */}
        <>
          <ul className={styles.pagingButtons}>
            {pageNumberArr.map((pagingNumber: number) => {
              return (
                <li key={pagingNumber} className={styles.pagingButton}>
                  <button
                    onClick={() => {
                      router.push(
                        `/farmers?search=${search}&page=${pagingNumber}`
                      );
                    }}
                    className={styles.pagingButtonNumber}
                  >
                    {pagingNumber}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      </main>
    </div>
  );
}
