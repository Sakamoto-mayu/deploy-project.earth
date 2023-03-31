import Head from "next/head";
import Footer from "@/components/footer";
import Header from "@/components/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { BreadCrumb } from "@/components/Breadcrumd/BreadCrumb";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>産チョク</title>
        <meta name="description" content="農家さんの顔が見えるECサイト" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <BreadCrumb />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
