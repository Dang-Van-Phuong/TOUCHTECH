"use client";

import React from "react";
import Link from "next/link";

export default function ChuongTrinhHocDropdown() {
  return (
    <li className="nav-item dropdown tt-dropdown-hover tt-program-root">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Chương trình học
      </a>

      <ul className="dropdown-menu tt-program-menu">
        <li>
          <Link className="dropdown-item tt-program-item" href="/chuong-trinh/tin-hoc-van-phong">
            Luyện thi tin học văn phòng (MOS)
          </Link>
        </li>

        <li>
          <Link className="dropdown-item tt-program-item" href="/chuong-trinh/robotics">
            Chế tạo &amp; lắp ráp Robotics
          </Link>
        </li>

        <li className="dropend tt-submenu">
          <a
            className="dropdown-item tt-program-item tt-submenu-trigger"
            href="#"
            role="button"
            aria-expanded="false"
          >
            Cuộc thi lập trình (Scratch / Python / C++)
            <span className="tt-submenu-caret" aria-hidden="true">›</span>
          </a>

          <ul className="dropdown-menu tt-program-submenu">
            <li>
              <Link className="dropdown-item tt-program-item" href="/chuong-trinh/cuoc-thi-lap-trinh/scratch">
                Chương trình học Scratch
              </Link>
            </li>
            <li>
              <Link className="dropdown-item tt-program-item" href="/chuong-trinh/cuoc-thi-lap-trinh/python">
                Chương trình học Python
              </Link>
            </li>
            <li>
              <Link className="dropdown-item tt-program-item" href="/chuong-trinh/cuoc-thi-lap-trinh/cpp">
                Chương trình học C++
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  );
}
