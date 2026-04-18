"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";

const MAU_DAM = "#073647";

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

/** ====== Benefits Slider (Robotics LEGO) ====== */
type BenefitSlide = { title: string; desc: string; img: string };

function BenefitsSliderRobotics() {
  const slides = useMemo<BenefitSlide[]>(
    () => [
      {
        title: "Tư duy kỹ thuật: lắp – thử – sửa (chuẩn dân Engineer nhí)",
        desc:
          "Robotics không phải lắp cho vui — mà là học cách biến ý tưởng thành cơ cấu chạy được.\n" +
          "Trẻ luyện quy trình: thiết kế → lắp ráp → test → debug → tối ưu.",
        img: "/assets/images/robotics_1.jpg",
      },
      {
        title: "Hiểu cảm biến & điều khiển: robot biết “nghe – nhìn – né”",
        desc:
          "Làm quen cảm biến màu/ khoảng cách/ chạm… và cách robot phản ứng theo điều kiện.\n" +
          "Từ đó tư duy thuật toán trở nên “có hình, có tiếng, có hành động”.",
        img: "/assets/images/robotics_2.jpg",
      },
      {
        title: "Teamwork & thi đấu: có sản phẩm, có chiến thuật",
        desc:
          "Học viên luyện teamwork, phân vai (builder/coder/presenter), chạy thử theo bài thi.\n" +
          "Kết thúc có portfolio mô hình + video demo + bài thuyết trình.",
        img: "/assets/images/robotics_3.jpg",
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
          Robotics LEGO: Lắp được – Code được – Thi được
          <span className="tt-benefits-underline" aria-hidden="true" />
        </h2>

        <p className="tt-benefits-sub text-secondary">
          Học Robotics theo kiểu “cầm tay chỉ việc”: từ cơ cấu cơ bản → cảm biến → chiến thuật thi đấu.
          Mục tiêu là robot chạy ổn, giải được nhiệm vụ và trình bày được sản phẩm.
        </p>

        <div className="tt-benefits-card">
          <div className={`tt-benefits-imgWrap ${animating ? "is-fading" : ""}`}>
            <img className="tt-benefits-img" src={current.img} alt={current.title} />
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

            <div className="tt-benefits-dots" role="tablist" aria-label="Slider robotics">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`tt-dot ${i === index ? "is-active" : ""}`}
                  onClick={() => goTo(i, i > index ? "next" : "prev")}
                  aria-label={`Slide ${i + 1}`}
                  aria-selected={i === index}
                  role="tab"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** ===== BLOCK (same layout) ===== */
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
            <SectionBadge>Chương trình Robotics LEGO</SectionBadge>
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

/** ===== Featured Students (reuse style, just content robotics) ===== */
type FeaturedStudent = {
  name: string;
  course: string;
  country: string;
  flag: string;
  quote: string;
  bigImg: string;
  thumbs: string[];
};

function FeaturedStudentsRobotics() {
  const data = useMemo<FeaturedStudent[]>(
    () => [
      {
        name: "Khoa Nguyễn",
        course: "Robotics LEGO | Cảm biến & Line-follow",
        country: "Viet Nam",
        flag: "🇻🇳",
        quote:
          "Trước đây mình lắp robot hay bị lệch bánh và chạy loạn. Vào lớp được hướng dẫn test từng phần, " +
          "chỉnh cơ cấu và code theo bước nên robot chạy ổn hơn rất nhiều. Lần đầu mình tự tin mang robot đi demo luôn!",
        bigImg: "/assets/images/robotics_student_1.jpg",
        thumbs: [
          "/assets/images/robotics_student_1.jpg",
          "/assets/images/robotics_student_2.jpg",
          "/assets/images/robotics_student_3.jpg",
        ],
      },
      {
        name: "Linh Trần",
        course: "Robotics LEGO | Thi đấu & Portfolio",
        country: "Viet Nam",
        flag: "🇻🇳",
        quote:
          "Mình thích phần làm chiến thuật thi đấu: chia nhiệm vụ, chạy thử, canh thời gian và tối ưu. " +
          "Team mình có video demo + slide thuyết trình nên lên sân khấu không bị run nữa.",
        bigImg: "/assets/images/robotics_student_2.jpg",
        thumbs: [
          "/assets/images/robotics_student_2.jpg",
          "/assets/images/robotics_student_1.jpg",
          "/assets/images/robotics_student_3.jpg",
        ],
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
              Robot chạy tốt là một chuyện — trình bày được “vì sao chạy tốt” mới là đỉnh 😎
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
                <div key={t + i} className="tt-thumb">
                  <img src={t} alt={`thumb-${i + 1}`} />
                </div>
              ))}
            </div>

            <div className="tt-featured-big">
              <img src={cur.bigImg} alt={cur.name} />
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
            Nhận lộ trình miễn phí
          </a>
        </div>
      </div>
    </section>
  );
}

/** ===== PAGE: Robotics LEGO Landing ===== */
export default function RoboticsLegoLanding() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useOnePageWheelSnap(scrollRef);

  return (
    <main className="tt-scratch">
      <div ref={scrollRef} className="tt-onepage">
        {/* HERO: nếu có thì biến nó thành section data-snap */}

        <BenefitsSliderRobotics />

        {/* Khóa 1 */}
        <Block
          id="robotics-co-ban"
          title="Robotics LEGO Cơ bản: Lắp ráp & chuyển động"
          subtitle="Từ “lắp cho vui” ➝ hiểu cơ cấu chạy: bánh xe, truyền động, cân bằng, chạy thẳng."
          leftTitle="Bên trái: Lộ trình học • Nội dung học thuật • Kết quả mang lại"
          leftItems={[
            {
              heading: "Lộ trình học",
              bullets: [
                "Tuần 1: Làm quen bộ LEGO + nguyên tắc lắp chắc",
                "Tuần 2: Cơ cấu bánh xe – chạy thẳng – rẽ",
                "Tuần 3: Mini-challenge (đua đường thẳng / mê cung đơn giản)",
              ],
            },
            {
              heading: "Nội dung học thuật",
              bullets: [
                "Cơ khí cơ bản: ma sát, cân bằng, truyền động",
                "Motor: tốc độ – lực – điều khiển mức đơn giản",
                "Kỹ năng test: chạy thử – ghi lỗi – sửa nhanh",
              ],
            },
            {
              heading: "Kết quả mang lại",
              bullets: [
                "Lắp được robot chạy ổn, ít rơi vỡ",
                "Biết chỉnh cơ cấu để robot chạy thẳng/ rẽ đúng",
                "Có 1 sản phẩm demo + video chạy thử",
              ],
            },
          ]}
          cornerCta={{ label: "Đăng ký ngay", href: "#form" }}
        />

        {/* Khóa 2 */}
        <Block
          id="robotics-cam-bien"
          title="Robotics LEGO Nâng cao: Cảm biến & thuật toán điều khiển"
          subtitle="Robot bắt đầu “thông minh”: né vật cản, dò line, phản ứng theo màu."
          leftTitle="Bên trái: Lộ trình học • Nội dung học thuật • Kết quả mang lại"
          leftItems={[
            {
              heading: "Lộ trình học",
              bullets: [
                "Tuần 1: Làm quen cảm biến (màu/ khoảng cách/ chạm)",
                "Tuần 2: Điều kiện – vòng lặp – trạng thái",
                "Tuần 3–4: Nhiệm vụ tổng hợp (line-follow + obstacle + stop-zone)",
              ],
            },
            {
              heading: "Nội dung học thuật",
              bullets: [
                "If/Else + Loop để robot ra quyết định",
                "Khái niệm state (đang dò line / đang né / đang dừng)",
                "Tuning: chỉnh tốc độ – độ nhạy cảm biến",
              ],
            },
            {
              heading: "Kết quả mang lại",
              bullets: [
                "Robot hoàn thành bài dò line / né vật cản",
                "Biết debug theo dữ liệu cảm biến",
                "Hiểu tư duy điều khiển (nền cho lập trình sau này)",
              ],
            },
          ]}
          cornerCta={{ label: "Đăng ký ngay", href: "#form" }}
        />

        {/* Khóa 3 */}
        <Block
          id="robotics-thi-dau"
          title="Robotics LEGO Thi đấu: Nhiệm vụ & chiến thuật"
          subtitle="Chặng “ra sân”: tối ưu thời gian, ổn định, teamwork và thuyết trình sản phẩm."
          leftTitle="Bên trái: Bài thi • Nội dung học thuật • Kết quả mang lại"
          leftItems={[
            {
              heading: "Bài thi mô phỏng",
              bullets: [
                "Chạy theo sa bàn nhiệm vụ (nhặt – đẩy – dừng đúng zone)",
                "Line + rẽ + checkpoint theo thời gian",
                "Nhiệm vụ phối hợp (đội hình 2–3 bạn)",
              ],
            },
            {
              heading: "Nội dung học thuật",
              bullets: [
                "Chiến thuật: chia nhiệm vụ – ưu tiên điểm – kiểm soát rủi ro",
                "Ổn định: chống trượt, chống lệch, tối ưu đường chạy",
                "Pitch & demo: trình bày mục tiêu – cách làm – kết quả",
              ],
            },
            {
              heading: "Kết quả mang lại",
              bullets: [
                "Có portfolio: mô hình + video + mô tả giải pháp",
                "Tự tin demo & trả lời BGK",
                "Sẵn sàng tham gia sân chơi Robotics tại trường/tỉnh",
              ],
            },
          ]}
          cornerCta={{ label: "Đăng ký ngay", href: "#form" }}
        />

        <FeaturedStudentsRobotics />

        <section data-snap id="faq" className="tt-scratch-section tt-bg-soft">
          <div className="tt-container">
            <h2 className="tt-scratch-h2 text-center" style={{ color: MAU_DAM }}>
              FAQ
            </h2>

            <div className="tt-faq mt-3">
              {[
                "Không có nền tảng lập trình có học Robotics LEGO được không?",
                "Học theo bộ LEGO nào? Có cần mua bộ riêng không?",
                "Bao lâu robot chạy được bài nhiệm vụ?",
                "Có chia nhóm và luyện thi đấu không?",
                "Học xong có chuyển tiếp sang Scratch/Python được không?",
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
