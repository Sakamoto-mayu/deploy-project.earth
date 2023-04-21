import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/login.module.css";
import FetchForPost from "@/lib/fetchForPost";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const data: {} = {
      email: email,
      password: password,
    };
    // FetchOfPostで関数の共通化
    const result = await FetchForPost(data, "login");
    console.log("ログインリザルト", result);

    if (result === "データが見つかりませんでした") {
      router.push("/login");
      setError(true);
    } else if (result.length === 1) {
      router.push("/");
    }
  };
  return (
    <>
      <div className={styles.blank}>
        <div className={styles.container}>
          <div className={styles.width}>
            <div className={styles.title}>会員の方はこちら</div>
            <form className="" onSubmit={(event) => handleSubmit(event)}>
              <div>
                <div className={styles.line}>
                  <label htmlFor="email" className="">
                    メールアドレス
                  </label>
                  <div className={styles.input}>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className={styles.input_form}
                      id=""
                      placeholder="@example.com"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.line}>
                <label htmlFor="" className="form-label">
                  パスワード
                </label>
                <div className={styles.input}>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className={styles.input_form}
                    id=""
                    placeholder="パスワード"
                  />
                  {error && (
                    <p>メールアドレスまたはパスワードが間違っています</p>
                  )}
                </div>
              </div>
              <div className={styles.button}>
                <button type="submit" className={styles.inner_button}>
                  ログイン
                </button>
              </div>
            </form>

            <div className={styles.title}>新規会員登録はこちら</div>
            <Link href={"/userRegister/"} className={styles.link}>
              <div className={styles.button}>
                <button type="submit" className={styles.inner_button}>
                  新規会員登録をする
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
