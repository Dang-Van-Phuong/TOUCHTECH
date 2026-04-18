"use client";

import React, { useState, useEffect, useRef } from "react";

const MAU_CHU_DAO = "#35B7B7";
const MAU_DAM = "#073647";

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        padding: "6px 14px",
        borderRadius: "30px",
        background: "rgba(53,183,183,.12)",
        color: MAU_DAM,
        fontWeight: 600,
        fontSize: "14px",
      }}
    >
      {children}
    </span>
  );
}

/* ===== Scroll snap 1 section ===== */

function useOnePageWheelSnapWindow() {
  const lockRef = useRef(false);

  useEffect(() => {
    const sections = () =>
      Array.from(document.querySelectorAll<HTMLElement>("section[data-snap]"));

    const onWheel = (e: WheelEvent) => {
      if (lockRef.current) return;

      const list = sections();
      const current = window.scrollY;

      const index = list.findIndex(
        (sec) =>
          sec.offsetTop <= current + 100 &&
          sec.offsetTop + sec.offsetHeight > current + 100
      );

      if (Math.abs(e.deltaY) < 8) return;

      e.preventDefault();

      const dir = e.deltaY > 0 ? 1 : -1;
      const next = list[index + dir];

      if (!next) return;

      lockRef.current = true;

      window.scrollTo({
        top: next.offsetTop - 80,
        behavior: "smooth",
      });

      setTimeout(() => {
        lockRef.current = false;
      }, 700);
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => window.removeEventListener("wheel", onWheel);
  }, []);
}

/* ===== Thành tích ===== */

function Achievements() {
  return (
    <section data-snap style={{ padding: "100px 0", textAlign: "center" }}>
      <h2 style={{ color: MAU_DAM }}>Thành tích tiêu biểu</h2>

      <div
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "center",
          gap: 80,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1 style={{ color: MAU_CHU_DAO }}>500+</h1>
          <p>Học viên tham gia</p>
        </div>

        <div>
          <h1 style={{ color: MAU_CHU_DAO }}>200+</h1>
          <p>Chứng chỉ MOS đạt được</p>
        </div>

        <div>
          <h1 style={{ color: MAU_CHU_DAO }}>95%</h1>
          <p>Hài lòng sau khóa học</p>
        </div>
      </div>
    </section>
  );
}

/* ===== Học viên ===== */

function Students() {
  const data = [
    {
      name: "Minh Anh",
      quote:
        "Học xong Word và Excel mình làm báo cáo nhanh hơn rất nhiều. Slide PowerPoint cũng đẹp hơn hẳn.",
    },
    {
      name: "Quang Huy",
      quote:
        "Trước mình sợ Excel lắm, học xong Pivot và Dashboard thấy cực kỳ hữu ích.",
    },
  ];

  const [i, setI] = useState(0);

  return (
    <section data-snap style={{ padding: "100px 0", textAlign: "center" }}>
      <h2 style={{ color: MAU_DAM }}>Đánh giá học viên</h2>

      <p style={{ marginTop: 20, fontStyle: "italic", maxWidth: 600, marginInline: "auto" }}>
        <span aria-hidden="true">&ldquo;</span>
        {data[i].quote}
        <span aria-hidden="true">&rdquo;</span>
      </p>

      <h4 style={{ marginTop: 10 }}>{data[i].name}</h4>

      <div style={{ marginTop: 20 }}>
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => setI(index)}
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              border: "none",
              margin: 5,
              background: index === i ? MAU_CHU_DAO : "#ccc",
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* ===== Page ===== */

export default function Page() {
  useOnePageWheelSnapWindow();

  return (
    <main>
      {/* HERO */}

      <section
        data-snap
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <div style={{ maxWidth: 900, margin: "auto" }}>
          <SectionBadge>TouchTech</SectionBadge>

          <h1 style={{ fontSize: 50, marginTop: 20 }}>
            2 lộ trình học tại <span style={{ color: MAU_CHU_DAO }}>TouchTech</span>
          </h1>

          <p style={{ marginTop: 20, fontSize: 18 }}>
            Trung tâm đào tạo tin học với 2 chương trình chính: Tin học văn phòng
            và luyện thi chứng chỉ MOS quốc tế.
          </p>

          <div style={{ marginTop: 20 }}>
            <p>
              <b>Tin học văn phòng:</b> học Word, Excel, PowerPoint từ cơ bản đến
              thực hành thực tế.
            </p>

            <p>
              <b>MOS quốc tế:</b> luyện thi chứng chỉ Microsoft Word, Excel,
              PowerPoint theo chuẩn quốc tế.
            </p>
          </div>

          <div style={{ marginTop: 30, display: "flex", gap: 20 }}>
            <a
              href="#office"
              style={{
                background: MAU_CHU_DAO,
                padding: "12px 24px",
                borderRadius: 30,
                color: "white",
                textDecoration: "none",
              }}
            >
              Đăng ký Tin học văn phòng
            </a>

            <a
              href="#mos"
              style={{
                border: `2px solid ${MAU_CHU_DAO}`,
                padding: "12px 24px",
                borderRadius: 30,
                textDecoration: "none",
              }}
            >
              Đăng ký luyện MOS
            </a>
          </div>
        </div>
      </section>

      {/* KHÓA HỌC VĂN PHÒNG */}

      <section
        id="office"
        data-snap
        style={{ padding: "120px 20px", textAlign: "center" }}
      >
        <h2 style={{ color: MAU_DAM }}>Tin học văn phòng</h2>

        <p style={{ maxWidth: 700, margin: "20px auto" }}>
          Học Word, Excel, PowerPoint từ cơ bản đến nâng cao. Phù hợp cho học
          sinh, sinh viên và người đi làm.
        </p>
      </section>

      {/* MOS */}

      <section
        id="mos"
        data-snap
        style={{ padding: "120px 20px", textAlign: "center" }}
      >
        <h2 style={{ color: MAU_DAM }}>Luyện thi MOS quốc tế</h2>

        <p style={{ maxWidth: 700, margin: "20px auto" }}>
          Luyện thi chứng chỉ MOS Word, Excel, PowerPoint theo cấu trúc đề thi
          chính thức của Microsoft.
        </p>
      </section>

      <Achievements />

      <Students />

      {/* FORM */}

      <section
        data-snap
        style={{ padding: "120px 20px", textAlign: "center" }}
      >
        <h2 style={{ color: MAU_DAM }}>Đăng ký tư vấn</h2>

        <div style={{ maxWidth: 400, margin: "30px auto" }}>
          <input
            placeholder="Họ và tên"
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          />

          <input
            placeholder="Số điện thoại"
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          />

          <button
            style={{
              width: "100%",
              padding: 12,
              background: MAU_CHU_DAO,
              border: "none",
              color: "white",
              borderRadius: 8,
            }}
          >
            Gửi thông tin
          </button>
        </div>
      </section>
    </main>
  );
}
