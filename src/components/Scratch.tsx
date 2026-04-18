"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";

const MAU_DAM = "#073647";

/** ✅ ảnh demo cho Benefits */
import DemoKhoaHoc from "../assets/images/DemoKhoaHoc.jpg";
import DemoKhoaHoc1 from "../assets/images/DemoKhoaHoc1.jpg";
import DemoKhoaHoc2 from "../assets/images/DemoKhoaHoc2.jpg";

/** ✅ ảnh demo cho FeaturedStudents (đúng vị trí src/assets/images) */
import AnhDaiDien from "../assets/images/AnhDaiDien.jpg";
import AnhDaiBia from "../assets/images/AnhBia.png";

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="tt-pill" style={{ background: "rgba(53,183,183,.12)", color: MAU_DAM }}>
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
        title: "Cải Thiện 85% Kỹ Năng Giải Quyết Vấn Đề",
        desc:
          "Quá trình gỡ lỗi và sửa lỗi trong lập trình giúp tăng cường tư duy logic.\n" +
          "Những lập trình viên nhí có sự cải thiện đáng kể trong việc giải quyết vấn đề " +
          "và phân tích sau khi học các kỹ năng này.",
        img: DemoKhoaHoc,
      },
      {
        title: "Nhân Đôi Khả Năng Tập Trung",
        desc:
          "Lập trình đòi hỏi sự kiên nhẫn và chính xác, giúp trẻ cải thiện đáng kể khả năng tập trung, " +
          "chú ý đến chi tiết và kiên trì vượt qua thử thách.",
        img: DemoKhoaHoc1,
      },
      {
        title: "Tự Tin Làm Dự Án & Thuyết Trình",
        desc:
          "Không chỉ code chạy — học viên còn biết kể câu chuyện sản phẩm, demo rõ ràng, " +
          "và tự tin trình bày trước lớp / ban giám khảo.",
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
          Dẫn Đầu Tương Lai Cùng Kỹ Năng Lập Trình
          <span className="tt-benefits-underline" aria-hidden="true" />
        </h2>

        <p className="tt-benefits-sub text-secondary">
          Lập trình trở thành phản xạ tự nhiên khi trẻ biến trí tưởng tượng thành sáng tạo.
          Trong các buổi học, trẻ phát triển tư duy logic, khả năng giải quyết vấn đề và sự tự tin
          sẵn sàng cho tương lai!
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
              <div className={`tt-text tt-text--current ${animating ? `is-out is-out-${dir}` : "is-in"}`}>
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
            <SectionBadge>Chương trình Scratch</SectionBadge>
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
        course: "Scratch / Lập trình",
        country: "Kenya",
        flag: "🇰🇪",
        quote:
          "Hiện tại mình đang học khóa Scratch tại TouchTech. Thầy/cô hỗ trợ mình rất nhiệt tình. " +
          "Mình đã tự làm được mini game và biết cách trình bày ý tưởng rõ ràng. Cảm ơn TouchTech rất nhiều!",
        bigImg: AnhDaiDien,
        thumbs: [AnhDaiDien, AnhDaiBia, AnhDaiDien],
      },
      {
        name: "Minh Anh",
        course: "Scratch / Game mini",
        country: "Viet Nam",
        flag: "🇻🇳",
        quote:
          "Mình thích nhất là phần làm dự án theo tuần. Code không chỉ chạy mà còn được góp ý để game mượt hơn. " +
          "Giờ mình tự tin demo và trả lời câu hỏi luôn.",
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

export default function CuocThiLapTrinhLanding() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useOnePageWheelSnap(scrollRef);

  return (
    <main className="tt-scratch">
      <div ref={scrollRef} className="tt-onepage">
        <BenefitsSlider />

        <Block
          id="lam-quen"
          title="Làm quen với tư duy lập trình Scratch"
          subtitle="Từ “mình chưa biết gì” ➝ tự làm được game/story đơn giản, nắm nền tảng tư duy lập trình."
          leftTitle="Bên trái: Lộ trình học • Nội dung học thuật • Kết quả mang lại"
          leftItems={[
            {
              heading: "Lộ trình học",
              bullets: [
                "Tuần 1: Làm quen giao diện – Sprite – Stage – Events",
                "Tuần 2: Điều khiển – âm thanh – hiệu ứng",
                "Tuần 3: Game mini 1 (bài dự án) + review",
              ],
            },
            {
              heading: "Nội dung học thuật",
              bullets: [
                "Events / Motion / Looks / Sound",
                "Variables (biến) cơ bản",
                "Khái niệm vòng lặp & điều kiện (nhẹ nhàng)",
              ],
            },
            {
              heading: "Kết quả mang lại",
              bullets: [
                "Tự làm 1 game mini hoặc story tương tác",
                "Biết cách chia bài toán thành bước",
                "Tự tin thuyết trình sản phẩm 1–2 phút",
              ],
            },
          ]}
          cornerCta={{ label: "Đăng ký ngay", href: "#form" }}
        />

        <Block
          id="tu-duy"
          title="Tư duy thuật toán với Scratch"
          subtitle="Chặng nâng cấp: logic rõ ràng, tối ưu cách nghĩ — làm dự án “có bài” hơn."
          leftTitle="Bên trái: Lộ trình học • Nội dung học thuật • Kết quả mang lại"
          leftItems={[
            {
              heading: "Lộ trình học",
              bullets: [
                "Tuần 1: If/Else nâng – Loop lồng – Clone",
                "Tuần 2: Biến + danh sách (List) – điểm số – level",
                "Tuần 3–4: Dự án Game hoàn chỉnh + sửa tối ưu",
              ],
            },
            {
              heading: "Nội dung học thuật",
              bullets: [
                "Thuật toán: tuần tự – rẽ nhánh – lặp",
                "Debug: tìm lỗi theo dấu vết",
                "Thiết kế game: trạng thái (state), điểm, độ khó",
              ],
            },
            {
              heading: "Kết quả mang lại",
              bullets: [
                "Tự làm game có level + điểm + hiệu ứng",
                "Biết cách debug & tối ưu",
                "Tư duy thuật toán rõ ràng (bước đệm qua Python sau này)",
              ],
            },
          ]}
          cornerCta={{ label: "Đăng ký ngay", href: "#form" }}
        />

        <Block
          id="ra-bien-lon"
          title="Hành trình ra biển lớn với Scratch"
          subtitle="Chặng thi đấu: dự án + luyện trình bày + chọn cuộc thi phù hợp và chiến thuật đi thi."
          leftTitle="Bên trái: Các cuộc thi Scratch • Nội dung học thuật • Kết quả mang lại"
          leftItems={[
            {
              heading: "Các cuộc thi có Scratch",
              bullets: [
                "Cuộc thi lập trình cấp trường/cấp tỉnh (tuỳ địa phương)",
                "Ngày hội STEM/Robotics có hạng mục lập trình",
                "Cuộc thi sáng tạo (game/animation/story) theo chủ đề",
              ],
            },
            {
              heading: "Nội dung học thuật",
              bullets: [
                "Chuẩn hoá sản phẩm: structure – đặt tên – asset",
                "Kịch bản demo: mở bài – trình bày – kết",
                "Tối ưu: tốc độ, độ mượt, trải nghiệm người chơi",
              ],
            },
            {
              heading: "Kết quả mang lại",
              bullets: [
                "Có portfolio dự án để nộp thi",
                "Biết pitch sản phẩm & trả lời BGK",
                "Tự tin tham gia sân chơi lớn (và mở đường sang Python/C++)",
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
                "Không biết gì có học Scratch được không?",
                "Học online hay offline?",
                "Bao lâu làm được game hoàn chỉnh?",
                "Có luyện thuyết trình/pitch sản phẩm không?",
                "Học xong có lên Python được không?",
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
