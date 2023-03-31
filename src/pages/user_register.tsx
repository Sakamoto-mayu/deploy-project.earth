import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/login.module.css";
import FetchOfPost from "@/lib/fetch_of_post";

export default function User_register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [duplicateEmail, setDuplicateEmail] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // emailを先にチェックする
    const emailData = {
      email: email,
    };
    const checkEmail = await FetchOfPost(emailData, "checkEmail");
    console.log(checkEmail);
    if (checkEmail.length > 1) {
      setDuplicateEmail(true);
    } else if (checkEmail.length === 0) {
      // 以下fetch
      // fetchのoptionで使うdata
      const data: {} = {
        name: name,
        email: email,
        password: password,
        zipcode: zipcode,
        prefecture: prefecture,
        city: city,
        address: address,
      };
      // FetchOfPostで関数の共通化
      //空欄があったらfetchしない
      if (
        name &&
        email &&
        password &&
        zipcode &&
        prefecture &&
        city &&
        address
      ) {
        const result = await FetchOfPost(data, "users");
        if (result.length === 1) {
          router.replace("/login");
        }
      }
    }
  };

  return (
    <>
      <div className={styles.blank}>
        <div className={styles.container}>
          <div className={styles.width}>
            <div className={styles.title}>新規会員登録</div>
            <form onSubmit={(event) => handleSubmit(event)} className="">
              <div>
                <div className={styles.line}>
                  <label htmlFor="name" className="">
                    名前
                  </label>
                  <div className={styles.input}>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      id="name"
                      name="name"
                      className={styles.input_form}
                      placeholder="ラクス　太郎"
                    ></input>
                    {!name && <p className={styles.alert}>入力してください</p>}
                  </div>
                </div>
              </div>

              <div>
                <div className={styles.line}>
                  <label htmlFor="email" className="">
                    メールアドレス
                  </label>
                  <div className={styles.input}>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      id="email"
                      name="email"
                      className={styles.input_form}
                      placeholder="@example.com"
                    ></input>
                    {!email && <p className={styles.alert}>入力してください</p>}
                    {duplicateEmail && (
                      <p className={styles.alert}>
                        メールアドレスが重複しています
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className={styles.line}>
                  <label htmlFor="password" className="">
                    パスワード
                  </label>
                  <div className={styles.input}>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="text"
                      id="password"
                      name="password"
                      className={styles.input_form}
                      placeholder="password"
                    ></input>
                    {!password && (
                      <p className={styles.alert}>入力してください</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className={styles.line}>
                  <label htmlFor="zipcode" className="">
                    郵便番号
                  </label>
                  <div className={styles.input}>
                    <input
                      onChange={(e) => setZipcode(e.target.value)}
                      type="text"
                      id="zipcode"
                      name="zipcode"
                      className={styles.input_form}
                      placeholder="111-2222"
                    ></input>
                    {!zipcode && (
                      <p className={styles.alert}>入力してください</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className={styles.line}>
                  <label htmlFor="prefecture" className="">
                    都道府県
                  </label>
                  <div className={styles.input}>
                    <input
                      onChange={(e) => setPrefecture(e.target.value)}
                      type="text"
                      id="prefecture"
                      name="prefecture"
                      className={styles.input_form}
                      placeholder="○○県"
                    ></input>
                    {!prefecture && (
                      <p className={styles.alert}>入力してください</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className={styles.line}>
                  <label htmlFor="city" className="">
                    市町村
                  </label>
                  <div className={styles.input}>
                    <input
                      onChange={(e) => setCity(e.target.value)}
                      type="text"
                      id="city"
                      name="city"
                      className={styles.input_form}
                      placeholder="○○市"
                    ></input>
                    {!city && <p className={styles.alert}>入力してください</p>}
                  </div>
                </div>
              </div>

              <div>
                <div className={styles.line}>
                  <label htmlFor="address" className="">
                    マンション名・番地等
                  </label>
                  <div className={styles.input}>
                    <input
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      id="address"
                      name="address"
                      className={styles.input_form}
                      placeholder="11-22 ○○マンション 101"
                    ></input>
                    {!address && (
                      <p className={styles.alert}>入力してください</p>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.button}>
                <button type="submit" className={styles.inner_button}>
                  登録
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
