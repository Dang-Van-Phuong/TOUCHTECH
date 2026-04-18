"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import AnhBia from "@/assets/images/AnhBia.png";

const DanhSachAnhBia = [
  { Anh: AnhBia, Alt: "TouchTech Slide 1" },
  { Anh: AnhBia, Alt: "TouchTech Slide 2" },
  { Anh: AnhBia, Alt: "TouchTech Slide 3" },
  { Anh: AnhBia, Alt: "TouchTech Slide 4" },
  { Anh: AnhBia, Alt: "TouchTech Slide 5" },

];

export default function SliderAnhBia() {
  return (
      <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    navigation
    pagination={{ clickable: true }}
    slidesPerView={1}
    loop
    speed={700}                 // <-- hiệu ứng lướt rõ ràng
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: false, // <-- đừng để chuột làm nó đứng
    }}
    className="tt-hero-slider"
  >
      {DanhSachAnhBia.map((item, i) => (
        <SwiperSlide key={i}>
          <div className="tt-hero-slide">
            <Image
              src={item.Anh}
              alt={item.Alt}
              priority={i === 0}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
