import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css"; // デフォルトのテーマを読み込んでいます（コアスタイルのみ読み込む設定も可能）
import Image from "next/image";

export const Slider = () => {
  return (
    <>
      <Splide
        aria-label="私のお気に入りの画像集"
        options={{
          autoplay: true, // 自動再生を有効
          interval: 3000, // 自動再生の間隔を3秒に設定
          type: "loop",
        }}
      >
        <SplideSlide>
          <div className="img-box">
            <Image
              className="slide-img"
              src="/coverImages/cover2.jpg"
              alt="かわいい猫の画像 part1"
              fill
              sizes="100vw"
              style={{
                objectPosition: "left center",
              }}
            />
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="img-box">
            <Image
              className="slide-img"
              src="/coverImages/cover1.jpg"
              alt="かわいい猫の画像 part2"
              fill
              sizes="100vw"
              style={{
                objectPosition: "left center",
              }}
            />
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="img-box">
            <Image
              className="slide-img"
              src="/coverImages/cover3.jpg"
              alt="かわいい猫の画像 part3"
              fill
              sizes="100vw"
              style={{
                objectPosition: "left center",
              }}
            />
          </div>
        </SplideSlide>
      </Splide>

      {/* 画像の高さを揃えて表示させるために以下スタイルを適用 */}
      <style jsx>{`
        .slide-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .wpaw-slider.wpaw-slider__item {
          min-height: 540px !important;
        }
        .img-box {
          position: relative;
          width: 1920px;
          height: 600px;
        }
      `}</style>
    </>
  );
};
