"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";

const MAU_DAM = "#073647";

/** ✅ ảnh demo (dùng lại bộ ảnh hiện có) */
import DemoKhoaHoc from "../assets/images/DemoKhoaHoc.jpg";
import DemoKhoaHoc1 from "../assets/images/DemoKhoaHoc1.jpg";
import DemoKhoaHoc2 from "../assets/images/DemoKhoaHoc2.jpg";

/** ✅ ảnh demo cho FeaturedStudents */
import AnhDaiDien from "../assets/images/AnhDaiDien.jpg";
import AnhDaiBia from "../assets/images/AnhBia.png";

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="tt-pill"
      style={{ background: "rgba(53,183,183,.12)", color: MAU_DAM }}
    >
      {children}
    </span>
  );
}

/** ===== One-page snap: 1 wheel = 1 section ===== */
function useOnePageWheelSnap(containerRef: React.RefObject<HTMLDivElement | null>) {
  const lockRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const getSections = () =>
      Array.from(el.querySelectorAll<HTMLElement>("section[data-snap]"));

    const findCurrentIndex = (sections: HTMLElement[]) => {
      const top = el.scrollTop;
      let idx = 0;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= top + 2) idx = i;
      }
      return idx;
    };

    const scrollToIndex = (sections: HTMLElement[], idx: number) => {
      const target = sections[Math.max(0, Math.min(idx, sections.length - 1))];
      if (!target) return;
      el.scrollTo({ top: target.offsetTop, behavior: "smooth" });
    };

    const onWheel = (e: WheelEvent) => {
      if (lockRef.current) return;

      const sections = getSections();
      if (sections.length <= 1) return;

      e.preventDefault();

      const dir = e.deltaY > 0 ? 1 : -1;
      const curIdx = findCurrentIndex(sections);
      const nextIdx = curIdx + dir;

      lockRef.current = true;
      scrollToIndex(sections, nextIdx);

      window.setTimeout(() => {
        lockRef.current = false;
      }, 700);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [containerRef]);
}

/** ====== Benefits Slider ====== */
type BenefitSlide = { title: string; desc: string; img: StaticImageData };

function BenefitsSlider() {
  const slides = useMemo<BenefitSlide[]>(
    () => [
      {
        title: "Tư duy thuật toán “chuẩn bài” hơn hẳn",
        desc:
          "C++ cực hợp để luyện nền thuật toán và tư duy tối ưu.\n" +
          "Học viên sẽ quen cách phân tích bài toán, chọn cấu trúc dữ liệu và viết code rõ ràng.",
        img: DemoKhoaHoc,
      },
      {
        title: "Nền tảng vững để thi học sinh giỏi / đội tuyển",
        desc:
          "C++ là lựa chọn phổ biến trong thi thuật toán. Học đúng lộ trình giúp học viên " +
          "tự tin làm bài từ cơ bản đến nâng cao.",
        img: DemoKhoaHoc1,
      },
      {
        title: "Code chạy nhanh – tư duy tối ưu tốt",
        desc:
          "C++ giúp học viên hiểu rõ hiệu năng, luyện thói quen tối ưu và viết code gọn gàng.\n" +
          "Đúng kiểu: làm ít nhưng chất 😎",
        img: DemoKhoaHoc2,
      },
    ],
    []
  );

  const DURATION = 520;
  const [index, setIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);

  const current = slides[index];
  const incoming = nextIndex !== null ? slides[nextIndex] : null;

  const goTo = (to: number, direction: "next" | "prev") => {
    if (animating) return;
    if (to === index) return;

    setDir(direction);
    setNextIndex(to);
    setAnimating(true);

    window.setTimeout(() => {
      setIndex(to);
      setNextIndex(null);
      setAnimating(false);
    }, DURATION);
  };

  useEffect(() => {
    const id = window.setInterval(() => {
      if (animating) return;
      goTo((index + 1) % slides.length, "next");
    }, 5000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, slides.length, animating]);

  return (
    <section data-snap className="tt-benefits">
      <div className="tt-container">
        <h2 className="tt-benefits-title" style={{ color: MAU_DAM }}>
          Dẫn Đầu Tương Lai Cùng C++
          <span className="tt-benefits-underline" aria-hidden="true" />
        </h2>

        <p className="tt-benefits-sub text-secondary">
          C++ là “đường cao tốc” cho thuật toán: nền chắc – tối ưu tốt – phù hợp thi đấu.
          Học xong có thể đi tiếp Data Structure, OLP/ICPC, Robotics nâng cao…
        </p>

        <div className="tt-benefits-card">
          <div className={`tt-benefits-imgWrap ${animating ? "is-fading" : ""}`}>
            <Image
              src={current.img}
              alt={current.title}
              fill
              priority
              className="tt-benefits-img"
              sizes="(max-width: 992px) 100vw, 420px"
            />
          </div>

          <div className="tt-benefits-content">
            <div className="tt-text-stage" aria-live="polite">
              <div
                className={`tt-text tt-text--current ${
                  animating ? `is-out is-out-${dir}` : "is-in"
                }`}
              >
                <div className="tt-benefits-h3">{current.title}</div>
                <div className="tt-benefits-desc text-secondary">
                  {current.desc.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>

              {incoming && (
                <div className={`tt-text tt-text--next is-in is-in-${dir}`}>
                  <div className="tt-benefits-h3">{incoming.title}</div>
                  <div className="tt-benefits-desc text-secondary">
                    {incoming.desc.split("\n").map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="tt-benefits-dots" role="tablist" aria-label="Slider benefits">
              {slides.map((_, i) => {
                const isActive = i === index;
                return (
                  <button
                    key={i}
                    type="button"
                    className={`tt-dot ${isActive ? "is-active" : ""}`}
                    onClick={() => goTo(i, i > index ? "next" : "prev")}
                    aria-label={`Slide ${i + 1}`}
                    aria-selected={isActive}
                    role="tab"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** ===== BLOCK ===== */
function Block({
  id,
  title,
  subtitle,
  leftTitle,
  leftItems,
  cornerCta,
}: {
  id: string;
  title: string;
  subtitle: string;
  leftTitle: string;
  leftItems: { heading: string; bullets: string[] }[];
  cornerCta?: { label: string; href: string };
}) {
  return (
    <section data-snap id={id} className="tt-scratch-section">
      <div className="tt-container">
        <div className={`tt-scratch-block ${cornerCta ? "has-corner-cta" : ""}`}>
          <div className="tt-scratch-block-head">
            <SectionBadge>Chương trình C++</SectionBadge>
            <h2 className="tt-scratch-h2" style={{ color: MAU_DAM }}>
              {title}
            </h2>
            <div className="text-secondary">{subtitle}</div>
          </div>

          <div className="tt-scratch-left">
            <div className="tt-scratch-left-title">{leftTitle}</div>

            <div className="tt-left-grid">
              {leftItems.map((item) => (
                <div key={item.heading} className="tt-left-card">
                  <div className="tt-left-card-head" style={{ color: MAU_DAM }}>
                    {item.heading}
                  </div>
                  <ul className="tt-scratch-ul text-secondary">
                    {item.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {cornerCta && (
            <a className="tt-corner-cta tt-btn-outline-teal" href={cornerCta.href}>
              {cornerCta.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

/** ===== Featured Students ===== */
type FeaturedStudent = {
  name: string;
  course: string;
  country: string;
  flag: string;
  quote: string;
  bigImg: StaticImageData;
  thumbs: StaticImageData[];
};

function FeaturedStudents() {
  const data = useMemo<FeaturedStudent[]>(
    () => [
      {
        name: "Dev Patel",
        course: "C++ / Thuật toán",
        country: "Kenya",
        flag: "🇰🇪",
        quote:
          "Mình học C++ ở TouchTech thấy đi từ dễ đến khó rất rõ. Bài nào cũng được hướng dẫn tư duy, " +
          "không bị kiểu học thuộc code.",
        bigImg: AnhDaiDien,
        thumbs: [AnhDaiDien, AnhDaiBia, AnhDaiDien],
      },
      {
        name: "Minh Anh",
        course: "C++ / Luyện thi",
        country: "Viet Nam",
        flag: "🇻🇳",
        quote:
          "Mình thích phần luyện bài theo dạng đề và tối ưu. Làm sai là biết vì sao sai, sửa lại là nhớ lâu luôn.",
        bigImg: AnhDaiBia,
        thumbs: [AnhDaiBia, AnhDaiDien, AnhDaiBia],
      },
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  const cur = data[idx];

  return (
    <section data-snap id="hoc-vien-tieu-bieu" className="tt-scratch-section tt-featured">
      <div className="tt-container">
        <div className="tt-featured-head">
          <div>
            <h2 className="tt-featured-title" style={{ color: MAU_DAM }}>
              Học viên tiêu biểu
            </h2>
            <div className="tt-featured-sub text-secondary">
              Những ngôi sao tỏa sáng đang tạo ra sự khác biệt
            </div>
          </div>
          <div className="tt-featured-icon" aria-hidden="true">
            ❝❞
          </div>
        </div>

        <div className="tt-featured-card">
          <div className="tt-featured-media">
            <div className="tt-featured-thumbs">
              {cur.thumbs.map((t, i) => (
                <div key={i} className="tt-thumb">
                  <Image
                    src={t}
                    alt={`thumb-${i + 1}`}
                    fill
                    className="tt-thumb-img"
                    sizes="(max-width: 992px) 33vw, 140px"
                  />
                </div>
              ))}
            </div>

            <div className="tt-featured-big">
              <Image
                src={cur.bigImg}
                alt={cur.name}
                fill
                className="tt-featured-bigimg"
                sizes="(max-width: 992px) 100vw, 700px"
              />
              <button className="tt-play" type="button" aria-label="Play video">
                ▶
              </button>
            </div>
          </div>

          <div className="tt-featured-quote">
            <div className="tt-stars" aria-label="5 stars">
              ★★★★★
            </div>

            <p className="tt-featured-text text-secondary">{cur.quote}</p>

            <div className="tt-featured-name">{cur.name}</div>
            <div className="tt-featured-meta text-secondary">
              {cur.course} &nbsp;|&nbsp; {cur.flag} {cur.country}
            </div>
          </div>
        </div>

        <div className="tt-featured-dots" role="tablist" aria-label="Featured students">
          {data.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`tt-dot ${i === idx ? "is-active" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`Student ${i + 1}`}
              aria-selected={i === idx}
              role="tab"
            />
          ))}
        </div>

        <div className="text-center mt-4">
          <a className="btn rounded-pill tt-btn-outline-teal" href="#form">
            Tải bài mẫu miễn phí
          </a>
        </div>
      </div>
    </section>
  );
}

export default function CppLanding() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useOnePageWheelSnap(scrollRef);

  return (
    <main className="tt-scratch">
      <div ref={scrollRef} className="tt-onepage">
        <BenefitsSlider />

        <Block
          id="cpp-co-ban"
          title="C++ cơ bản: cú pháp + tư duy nền"
          subtitle="Từ nhập môn ➝ viết được chương trình nhỏ, hiểu vòng lặp/điều kiện và làm bài chắc tay."
          leftTitle="Bên trái: Lộ trình học • Nội dung học thuật • Kết quả mang lại"
          leftItems={[
            {
              heading: "Lộ trình học",
              bullets: [
                "Tuần 1: Biến – kiểu dữ liệu – nhập/xuất",
                "Tuần 2: If/Else – for/while – bài tập nền",
                "Tuần 3: Mini project/bài tổng hợp + review",
              ],
            },
            {
              heading: "Nội dung học thuật",
              bullets: [
                "Cú pháp C++ căn bản",
                "Tư duy test case",
                "Debug: đọc lỗi compile/runtime",
              ],
            },
            {
              heading: "Kết quả mang lại",
              bullets: [
                "Làm được bài cơ bản chắc chắn",
                "Biết phân tích bài theo bước",
                "Tự tin trình bày cách làm",
              ],
            },
          ]}
          cornerCta={{ label: "Đăng ký ngay", href: "#form" }}
        />

        <Block
          id="cpp-thuat-toan"
          title="Thuật toán & cấu trúc dữ liệu (nhẹ đến nặng)"
          subtitle="Chặng nâng cấp: tư duy thuật toán rõ ràng, biết chọn cách làm tối ưu."
          leftTitle="Bên trái: Lộ trình học • Nội dung học thuật • Kết quả mang lại"
          leftItems={[
            {
              heading: "Lộ trình học",
              bullets: [
                "Tuần 1: Mảng/string – sort – tìm kiếm",
                "Tuần 2: Prefix sum – two pointers – greedy cơ bản",
                "Tuần 3–4: Bài theo dạng đề + tối ưu",
              ],
            },
            {
              heading: "Nội dung học thuật",
              bullets: [
                "Độ phức tạp O(n), O(n log n) (vừa đủ dùng)",
                "Kỹ thuật giải bài phổ biến",
                "Viết code sạch & nhanh",
              ],
            },
            {
              heading: "Kết quả mang lại",
              bullets: [
                "Giải được nhiều dạng bài thi",
                "Biết tối ưu & tránh TLE",
                "Nền chắc cho đội tuyển/thi đấu",
              ],
            },
          ]}
          cornerCta={{ label: "Đăng ký ngay", href: "#form" }}
        />

        <Block
          id="cpp-thi-dau"
          title="Thi đấu & portfolio C++"
          subtitle="Chặng thi đấu: luyện đề – chiến thuật – trình bày lời giải gọn và đúng."
          leftTitle="Bên trái: Sân chơi/định hướng • Nội dung học thuật • Kết quả mang lại"
          leftItems={[
            {
              heading: "Sân chơi phù hợp",
              bullets: [
                "HSG Tin / đội tuyển",
                "OLP/ICPC (định hướng)",
                "Các cuộc thi lập trình cấp trường/cấp tỉnh",
              ],
            },
            {
              heading: "Nội dung học thuật",
              bullets: [
                "Chuẩn hoá template giải bài",
                "Kỹ năng đọc đề – bóc tách yêu cầu",
                "Chiến thuật làm bài theo thời gian",
              ],
            },
            {
              heading: "Kết quả mang lại",
              bullets: [
                "Tự tin thi đấu đúng format",
                "Biết trình bày lời giải mạch lạc",
                "Có lộ trình nâng cấp tiếp (DSA/thi đấu nâng)",
              ],
            },
          ]}
          cornerCta={{ label: "Đăng ký ngay", href: "#form" }}
        />

        <FeaturedStudents />

        <section data-snap id="faq" className="tt-scratch-section tt-bg-soft">
          <div className="tt-container">
            <h2 className="tt-scratch-h2 text-center" style={{ color: MAU_DAM }}>
              FAQ
            </h2>

            <div className="tt-faq mt-3">
              {[
                "Không biết gì có học C++ được không?",
                "Học xong có thi được không?",
                "Bao lâu lên được thuật toán?",
                "Có luyện đề theo dạng thi không?",
                "C++ có phù hợp học sinh THCS/THPT không?",
              ].map((q) => (
                <div key={q} className="tt-faq-item">
                  <div className="fw-bold" style={{ color: MAU_DAM }}>
                    {q}
                  </div>
                  <div className="text-secondary">Chị điền nội dung sau (placeholder).</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section data-snap className="tt-scratch-section">
          <div className="tt-container py-5" />
        </section>
      </div>

      <a className="tt-float-cta" href="#form">
        Tư vấn nhanh
      </a>
    </main>
  );
}
