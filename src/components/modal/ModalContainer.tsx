import styles from "../../styles/itemList.module.css";

export function Modal({ show, setShow }: { show: boolean; setShow: any }) {
  const closeModal = () => {
    setShow(false);
  };
  if (show) {
    return (
      <div className={styles.overlay} onClick={closeModal}>
        <div className={styles.content}>
          <p>カートに追加しました。</p>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
