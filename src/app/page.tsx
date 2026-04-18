import SliderViSao from "@/components/SliderViSao";
import SliderAnhBia from "@/components/SliderAnhBia";

const DuLieuKyNang = [
  { TieuDe: "Lập trình", MoTa: "Sáng tạo qua logic", MauNen: "#35B7B7" },
  { TieuDe: "Robotics", MoTa: "Xây dựng công nghệ", MauNen: "#FFA42C" },
  { TieuDe: "Tài chính", MoTa: "Thói quen thông minh", MauNen: "#0AA0A0" },
  { TieuDe: "Sáng tạo AI", MoTa: "Tư duy tương lai", MauNen: "#073647" },
  { TieuDe: "Toán học", MoTa: "Nền tảng tư duy", MauNen: "#28C6B8" },
  { TieuDe: "Giao tiếp", MoTa: "Tự tin thể hiện", MauNen: "#FF8A5B" },
  { TieuDe: "Khoa học", MoTa: "Khám phá tò mò", MauNen: "#2DB3C0" },
  { TieuDe: "Xem tất cả", MoTa: "Khám phá mọi khóa", MauNen: "#EAE7E2", ChuDen: true },
];

export default function Home() {
  const MauChuDao = "#35B7B7";

  return (
    <div className="tt-snap">
      <section id="home" className="tt-snap-section tt-snap-hero pb-0">
        <div className="tt-container pt-0 pb-3">
          <div className="tt-hero tt-hero-narrow border bg-white mx-auto">
            <SliderAnhBia />
          </div>
        </div>
      </section>

      <section id="gioi-thieu" className="tt-snap-section tt-section-white">
        <div className="tt-container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-6">
              <h2 className="tt-section-title mb-3">Giới thiệu TouchTech</h2>
              <p className="text-secondary mb-3">
                TouchTech – Chạm vào tương lai là nền tảng giúp học viên xây dựng tư duy công nghệ,
                học qua dự án, rèn kỹ năng thực tế và tự tin tạo sản phẩm của riêng mình.
              </p>

              <ul className="text-secondary" style={{ lineHeight: 1.8 }}>
                <li>Học theo lộ trình rõ ràng, tăng dần độ khó.</li>
                <li>Thực hành dự án thật: sản phẩm – thuyết trình – kỹ năng.</li>
                <li>Mentor đồng hành, gỡ rối nhanh, học không bị “kẹt”.</li>
              </ul>

              <div className="d-flex gap-2 flex-wrap mt-3">
                <a className="btn rounded-pill" style={{ background: MauChuDao, color: "white" }} href="#ky-nang">
                  Xem kỹ năng
                </a>
                <a className="btn btn-outline-secondary rounded-pill" href="#vi-sao">
                  Vì sao chọn TouchTech
                </a>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="p-4 border rounded-4 bg-white">
                <div className="fw-bold mb-2" style={{ color: "#073647" }}>TouchTech cam kết</div>
                <div className="text-secondary">
                  Mỗi buổi học đều có mục tiêu rõ ràng, sản phẩm đầu ra, và đánh giá tiến bộ.
                </div>

                <div className="row g-3 mt-3">
                  <div className="col-12 col-md-4">
                    <div className="p-3 rounded-4" style={{ background: "rgba(53,183,183,.12)" }}>
                      <div className="fw-bold">Thực chiến</div>
                      <div className="text-secondary" style={{ fontSize: 15 }}>Làm dự án thật</div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="p-3 rounded-4" style={{ background: "rgba(255,164,44,.12)" }}>
                      <div className="fw-bold">Lộ trình</div>
                      <div className="text-secondary" style={{ fontSize: 15 }}>Từ cơ bản → nâng cao</div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="p-3 rounded-4" style={{ background: "rgba(7,54,71,.10)" }}>
                      <div className="fw-bold">Đồng hành</div>
                      <div className="text-secondary" style={{ fontSize: 15 }}>Mentor hỗ trợ</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="ky-nang" className="tt-snap-section">
        <div className="tt-container">
          <h2 className="text-center tt-section-title mb-2">Kỹ Năng Để Thành Công</h2>
          <p className="text-center text-secondary mb-4">
            Các chương trình giúp học viên tự tin, sáng tạo và rèn luyện kỹ năng thực tế.
          </p>

          <div className="row g-4">
            {DuLieuKyNang.map((k) => (
              <div key={k.TieuDe} className="col-12 col-md-6 col-lg-3">
                <div className="tt-card card h-100">
                  <div
                    className="tt-card-body"
                    style={{
                      background: k.MauNen,
                      color: k.ChuDen ? "#073647" : "white",
                    }}
                  >
                    <div className="h4 fw-bold mb-1">{k.TieuDe}</div>
                    <div style={{ opacity: 0.9 }}>{k.MoTa}</div>

                    <div className="mt-3">
                      <span
                        className="badge rounded-pill"
                        style={{
                          background: k.ChuDen ? MauChuDao : "rgba(255,255,255,.25)",
                          color: "white",
                        }}
                      >
                        TouchTech
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="vi-sao" className="tt-snap-section tt-section-white">
        <div className="tt-container">
          <h2 className="text-center tt-section-title mb-2">Vì Sao Lại Chọn TouchTech</h2>
          <p className="text-center text-secondary mb-4">
            Đồng hành cùng con phát triển tư duy, kỹ năng và năng lực số.
          </p>
          <SliderViSao />
        </div>
      </section>

      <footer id="lien-he" className="tt-snap-section tt-footer">
        <div className="tt-container">
          <div className="row g-4">
            <div className="col-12 col-lg-4">
              <div className="fw-bold mb-2">TouchTech</div>
              <div style={{ opacity: 0.85 }}>
                Chạm vào tương lai — học công nghệ theo cách vui, thực chiến, có lộ trình.
              </div>
            </div>
            <div className="col-6 col-lg-4">
              <div className="fw-bold mb-2">Liên kết</div>
              <div style={{ opacity: 0.85 }}>Khóa học</div>
              <div style={{ opacity: 0.85 }}>Giáo viên</div>
              <div style={{ opacity: 0.85 }}>Về chúng tôi</div>
            </div>
            <div className="col-6 col-lg-4">
              <div className="fw-bold mb-2">Liên hệ</div>
              <div style={{ opacity: 0.85 }}>Email: support@touchtech.vn</div>
              <div style={{ opacity: 0.85 }}>Hotline: 0xxx xxx xxx</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
