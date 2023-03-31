// jest.mock("node-fetch");
// import fetch, { Response } from "node-fetch";

// test("createUser calls fetch with the right args and returns the user id", async () => {
//   fetch.mockReturnValue(
//     Promise.resolve(
//       new Response({
//         status: 200,
//         json: {
//           id: 1,
//           name: "テスト",
//           email: "test@example.com",
//           password: "test",
//           zipcode: "111-2222",
//           prefecture: "東京都",
//           city: "新宿区",
//           address: "11-22",
//         },
//       })
//     )
//   );

//   const userId = await FetchOfPost(userData);

//   expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/users", {
//     method: "POST",
//   });
//   expect(userId).toBe([
//     {
//       id: 1,
//       name: "テスト",
//       email: "test@example.com",
//       password: "test",
//       zipcode: "111-2222",
//       prefecture: "東京都",
//       city: "新宿区",
//       address: "11-22",
//     },
//   ]);
// });

// useRouterのエラー時
// jest.mock("next/router", () => ({
//   useRouter() {
//     return {
//       route: "/",
//       pathname: "/",
//       query: {},
//       asPath: "/",
//       basePath: "/",
//       isLocaleDomain: true,
//       isReady: true,
//       push: jest.fn(),
//       prefetch: jest.fn(),
//       replace: jest.fn(),
//       reload: jest.fn(),
//       back: jest.fn(),
//       beforePopState: jest.fn(),
//       events: {
//         on: jest.fn(),
//         off: jest.fn(),
//         emit: jest.fn(),
//       },
//       isFallback: false,
//       isPreview: false,
//     };
//   },
// }));

import { render, screen, waitFor } from "@testing-library/react";
import { expect, jest, test } from "@jest/globals";
import FetchOfPost from "../lib/fetch_of_post";

type UserData = {
  name: string;
  email: string;
  password: string;
  zipcode: string;
  prefecture: string;
  city: string;
  address: string;
};

const userData: UserData = {
  name: "テスト",
  email: "test@example.com",
  password: "test",
  zipcode: "111-2222",
  prefecture: "東京都",
  city: "新宿区",
  address: "",
};

//擬似的なmock関数を作る。fetchした際のreturnの内容を指定する。

//FetchOfPost関数の　returnの値が擬似APIの内容と一致するのかテストする。
//FetchOfPost関数を実行した際に、fetchの代わりに擬似mock APIが呼び出されるようにする。

test("check returnValue", async () => {
  (global as any).fetch = jest.fn<() => Promise<{}>>().mockResolvedValue({
    status: 200,
    // .jsonはメソッドなのでjson(){}にする。jsonはただのfunction名
    async json() {
      return [
        //...userの値＋idも含めて使いまわせるように//これどうやるの？
        {
          id: 1,
          ...userData,
        },
      ];
    },
  });

  // 上のreturnの値を変数に入れて下でも使う。
  const actual = await FetchOfPost(userData, "users");
  console.log("actual", actual);
  expect(actual).toEqual([
    {
      //...userの変数
      id: 1,
      ...userData,
    },
  ]);
});

// jest.mock("node-fetch", () => jest.fn());

// test("check returnValue", async () => {
//   const dummyRes = Promise.resolve({
//     status: 200,
//     json: {
//       id: 1,
//       name: "テスト",
//       email: "test@example.com",
//       password: "test",
//       zipcode: "111-2222",
//       prefecture: "東京都",
//       city: "新宿区",
//       address: "11-22",
//     },
//   });

//   require("node-fetch").mockImplementation(() => dummyRes);
//   await dummyRes;

//   const actual = await FetchOfPost(userData);
//   expect(actual).toEqual([
//     {
//       id: 1,
//       name: "テスト",
//       email: "test@example.com",
//       password: "test",
//       zipcode: "111-2222",
//       prefecture: "東京都",
//       city: "新宿区",
//       address: "11-22",
//     },
//   ]);
// });

// const fetchMock = () =>
//   new Promise((resolve) => {
//     resolve({
//       status: 200,
//       json: {
//         id: 1,
//         name: "テスト",
//         email: "test@example.com",
//         password: "test",
//         zipcode: "111-2222",
//         prefecture: "東京都",
//         city: "新宿区",
//         address: "11-22",
//       },
//     });
//   });

// jest.mock("./fetch_of_post", () => jest.fn());

// describe("UserRegister", () => {
//   beforeEach(() => {
//     (global as any).fetch = jest.fn();
//   });

//   afterEach(() => {
//     jest.restoreAllMocks();
//   });

//   test("check returnValue", async () => {
//     global.fetch = jest.fn().mockImplementation(fetchMock);
//     render(<User_register />);
//     const submitButton = screen.getByText(`登録`);
//     submitButton.click();
//     await waitFor(() => expect(FetchOfPost(userData)).toHaveBeenCalled());
//     const actual = await FetchOfPost(userData);
//     expect(actual).toEqual({
//       status: 200,
//       json: {
//         id: 1,
//         name: "テスト",
//         email: "test@example.com",
//         password: "test",
//         zipcode: "111-2222",
//         prefecture: "東京都",
//         city: "新宿区",
//         address: "11-22",
//       },
//     });
//   });
// });
