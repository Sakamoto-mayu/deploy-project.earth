/* eslint-disable react-hooks/exhaustive-deps */
import styles from "@/styles/cartpage.module.css";
import * as type from "@/types/typescript";

const TotalPlice = ({
  userInfo,
  itemCountChange,
}: {
  userInfo: type.userInfoType;
  itemCountChange: any;
}) => {
  return (
    <div>
      <h3>お届け先情報</h3>
      <div className={styles.infomation}>
        <ul>
          <li>{userInfo.name}様</li>
          <li>&#12306;&nbsp;{userInfo.zipcode}</li>
          <li>
            {userInfo.prefecture}&nbsp;&nbsp; {userInfo.city}
          </li>
          <li>{userInfo.address}</li>
        </ul>
      </div>
      <div className={styles.totalBox}>
        <p>
          合計金額&nbsp;&nbsp;
          <span className={styles.total}>{itemCountChange}</span>円
        </p>
      </div>
      <div className={styles.submitBox}>
        <button type="submit" role="link" className={styles.purchase}>
          購入手続きへ
        </button>
      </div>
    </div>
  );
};

export default TotalPlice;
