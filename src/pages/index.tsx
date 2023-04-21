import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Search from "@/components/search";
import Record from "@/components/Record";
import Category from "@/components/category";
import { useEffect, useState } from "react";
import { Slider } from "@/components/slider";
import NewFarmers from "@/components/NewFarmers";

export default function Home() {
  const [cookie, setCookie] = useState<boolean>();
  useEffect(() => {
    let cookie: string = document.cookie;
    setCookie(cookie.includes("id="));
  }, []);

  return (
    <>
      <main>
        <section className={styles.top_cover}>
          <Image
            src="/coverImages/plant.png"
            width={100}
            height={100}
            className={styles.kiwi}
            alt={""}
          />
          <Image
            src="/coverImages/berry.png"
            width={100}
            height={100}
            className={styles.berry}
            alt={""}
          />
          <Image
            src="/coverImages/okra.png"
            width={100}
            height={100}
            className={styles.okra}
            alt={""}
          />
          <Image
            src="/coverImages/avocado.png"
            width={100}
            height={100}
            className={styles.avocado}
            alt={""}
          />
          <Image
            src="/coverImages/plant.png"
            width={100}
            height={100}
            className={styles.plant}
            alt={""}
          />
          <div>
            <div className={styles.cover_image}>
              <Slider />
            </div>
          </div>
          <div className={styles.cover_text}>
            農家さんの顔を見て
            <br />
            欲しいものを選べるECサイト
          </div>
        </section>

        <section className="top_record">{cookie && <Record />}</section>

        {/* <section className="top_search">
          <div className={styles.top_title}>商品名から生産者を探す</div>
          <Search />
        </section> */}

        <section>
          <Category />
        </section>

        <section>
          <NewFarmers />
        </section>
      </main>
    </>
  );
}
