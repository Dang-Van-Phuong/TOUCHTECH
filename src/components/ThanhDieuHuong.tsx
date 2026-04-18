import Image from "next/image";
import Link from "next/link";
import AnhDaiDien from "@/assets/images/AnhDaiDien.jpg";
import BoChonNgonNgu from "@/components/BoChonNgonNgu";
import ChuongTrinhHocDropdown from "@/components/ChuongTrinhHocDropdown";

export default function ThanhDieuHuong() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="tt-container">
        {/* VUNG TRAI: LOGO */}
        <Link className="navbar-brand d-flex align-items-center gap-2 m-0" href="/">
          <Image
            src={AnhDaiDien}
            alt="TouchTech"
            width={65}
            height={65}
            style={{ borderRadius: 30 }}
          />
          <span className="fw-bold">TouchTech</span>
        </Link>

        {/* TOGGLER (mobile) */}
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* VUNG GIUA + VUNG PHAI */}
        <div className="collapse navbar-collapse" id="nav">
          <div className="tt-nav-3zone w-100">
            {/* VUNG GIUA: MENU */}
            <div className="tt-nav-center">
              <ul className="navbar-nav gap-lg-4 align-items-lg-center">
                <li className="nav-item">
                  <a className="nav-link" href="#gioi-thieu">Giới Thiệu</a>
                </li>

                <ChuongTrinhHocDropdown />

                <li className="nav-item">
                  <a className="nav-link" href="#upcoder">UpCoder</a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#hoc-vien">Học Viên Tiêu Biểu</a>
                </li>
              </ul>
            </div>

            {/* VUNG PHAI: NGON NGU + AUTH */}
            <div className="tt-nav-right">
              <BoChonNgonNgu />

              <div className="d-flex gap-2">
                <Link className="btn rounded-pill btn-login" href="/login">
                  Đăng Nhập
                </Link>
                <Link
                  className="btn rounded-pill"
                  style={{ background: "#35B7B7", color: "white" }}
                  href="/auth/register"
                >
                  Đăng Ký
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
