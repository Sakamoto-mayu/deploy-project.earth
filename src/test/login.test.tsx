//
//
// login.tsの機能
// ログイン画面で受け取ったemailとpassの情報を用いて、DBから一致するユーザー情報を取得する。
// 取得成功　→ result（set-cookie,status200,本体data）を返す
// 取得失敗　→ result(error.message , status500)を返す

// テスト　＝　セットされたresの中身をテストする

import type { NextApiRequest, NextApiResponse } from "next";
import loginFetch from "@/pages/api/login";
import { json } from "stream/consumers";

// DBのモックを作る。分岐をする。ifでtrueなら成功返す。falseなら失敗返す。
// reqで送る値を変えて検査する。
describe("test loginFetch関数", () => {
  it("check res OK or Error", async () => {
    const mockData = {
      // id: 1,
      // name: "田中角栄",
      // email: "kakuei@example.com",
      // password: "kakuei",
      // prefecture: "新潟県",
      // city: "柏崎市",
      // address: "日石町2番1号",
      // zipcode: "945-8511",
      id: 2,
      name: "ラクス太郎",
      email: "rakus@example.com",
      password: "rakus",
      prefecture: "東京都",
      city: "新宿区",
      address: "11-22",
      zipcode: "111-2222",
    };
    //   fetch時に送るreqと、fetch後にセットされるresを擬似的に定義
    //   mock = 仮のブラウザ？
    const req: any = {
      body: { email: "rakus@example.com", password: "rakus" },
    };
    const res: any = {
      setHeader: jest.fn(() => res),
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    //   login.tsのloginFetch関数を呼んだ時、fetchして擬似的なpromiseを作る
    if (
      req.body.email === mockData.email &&
      req.body.password === mockData.password
    ) {
      (global as any).fetch = jest.fn().mockResolvedValue({
        // 以下promiseの内容
        status: 200,
        async json() {
          return [{ ...mockData }];
        },
      });
    } else {
      (global as any).fetch = jest.fn().mockRejectedValue({
        async json() {
          // エラーパターンは失敗する。本番では一致するユーザーがいなくても空の[]が帰ってくるが、
          // テストだと[]が返ってくる前に失敗しているため？エラーメッセージでなくundefinedが返ってくる。
          return [];
        },
      });
    }
    // 関数loginFetchのテスト。状況擬似的なfetchのresと、実際がマッチするか確認。
    //   const res = mockResponse();

    await loginFetch(req, res);
    console.log("json", res.json.mock.lastCall);
    console.log("status", res.status.mock.lastCall);
    if (
      req.body.email === mockData.email &&
      req.body.password === mockData.password
    ) {
      expect(res.json.mock.lastCall[0]).toEqual([{ ...mockData }]);
      expect(res.status.mock.lastCall).toEqual([200]);
    } else {
      expect(res.json.mock.lastCall).toEqual(["データが見つかりませんでした"]);
      expect(res.status.mock.lastCall).toEqual([400]);
    }
  });
});
// 引数と戻り値を設定　どうやって調べる？
// const mockResponse = (): NextApiResponse => ({
//   status: jest.fn().mockReturnThis(),
//   send: jest.fn(),
//   json: jest.fn(() => Promise.resolve()),
//   end: jest.fn(),
//   redirect: jest.fn(),
//   setHeader: jest.fn(),
//   clearCookie: jest.fn(),
//   sendStatus: jest.fn(),
//   getHeader: jest.fn(),
//   cookie: jest.fn(),
//   append: jest.fn(),
//   locals: {},
//   writableEnded: false,
//   writable: true,
//   flushHeaders: jest.fn(),
// });

// test("check login api return value", async () => {
//   const expectData = [
//     {
//       id: 1,
//       name: "田中角栄",
//       email: "kakuei@example.com",
//       password: "kakuei",
//       prefecture: "新潟県",
//       city: "柏崎市",
//       address: "日石町2番1号",
//       zipcode: "945-8511",
//     },
//   ];

//   const mockFetchResponse = {
//     ok: true,
//     json: () => Promise.resolve(expectData),
//   };
//   global.fetch = jest.fn().mockResolvedValue(mockFetchResponse);

//   const req: NextApiRequest = {
//     method: "POST",
//     body: JSON.stringify({ email: "kakuei@example.com", password: "kakuei" }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   const res = mockResponse();

//   await loginFetch(req, res);

//   expect(res.status).toHaveBeenCalledWith(200);
//   expect(res.json).toHaveBeenCalledWith(expectData);
// });
