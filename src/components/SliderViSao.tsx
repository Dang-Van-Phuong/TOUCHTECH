"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const DuLieuViSao = [
  { TieuDe: "Học qua dự án", MoTa: "Làm sản phẩm thật, học là ra kết quả." },
  { TieuDe: "Lộ trình rõ ràng", MoTa: "Từ cơ bản → nâng cao, theo mục tiêu." },
  { TieuDe: "Mentor hỗ trợ", MoTa: "Gặp lỗi có người gỡ, không bị kẹt." },
];

export default function SliderViSao() {
  return (
    <Swiper modules={[Pagination]} pagination={{ clickable: true }} spaceBetween={16} slidesPerView={1}
      breakpoints={{ 992: { slidesPerView: 3 } }}>
      {DuLieuViSao.map((m) => (
        <SwiperSlide key={m.TieuDe}>
          <div className="p-4 bg-white border rounded-4 h-100">
            <div className="fw-bold mb-1">{m.TieuDe}</div>
            <div className="text-secondary">{m.MoTa}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
