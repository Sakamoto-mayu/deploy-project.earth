import Link from "next/link";
import useSWR from "swr";
import Image from "next/image";
import styles from "../styles/newface.module.css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NewFace() {
  const { data, error } = useSWR(`/api/newface`, fetcher);

  if (error) return <div>エラーです</div>;
  if (!data) return <div>データがないです</div>;
  console.log(data);

  return (
    <>
      <div className={styles.section}>
        <h2 className={styles.title}>新規の農家さん</h2>
        <div className={styles.flex}>
          {data.map((farmer: any) => {
            return (
              <div key={farmer.id}>
                <div className={styles.shape}>
                  <Link href={`/farmerPage/${farmer.id}`}></Link>
                  <Image
                    src={farmer.icon_imageurl}
                    alt={"農家画像"}
                    width={300}
                    height={250}
                    className={styles.img}
                  ></Image>
                </div>
                <p className={styles.text}>{farmer.farm_name}</p>
                <p className={styles.text}>{farmer.comment}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
