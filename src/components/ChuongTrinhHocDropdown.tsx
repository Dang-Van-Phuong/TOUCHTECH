"use client";

import React from "react";

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

      {/* Dropdown cấp 1 */}
      <ul className="dropdown-menu tt-program-menu">
        <li>
          <a className="dropdown-item tt-program-item" href="/chuong-trinh/tin-hoc-van-phong">
            Luyện thi tin học văn phòng (MOS)
          </a>
        </li>

        <li>
          <a className="dropdown-item tt-program-item" href="/chuong-trinh/robotics">
            Chế tạo &amp; lắp ráp Robotics
          </a>
        </li>

        {/* ✅ Item có submenu */}
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

          {/* Dropdown cấp 2 (submenu) */}
          <ul className="dropdown-menu tt-program-submenu">
        <li>
          <a className="dropdown-item tt-program-item" href="/chuong-trinh/cuoc-thi-lap-trinh/scratch">
            Chương trình học Scratch
          </a>
        </li>
        <li>
          <a className="dropdown-item tt-program-item" href="/chuong-trinh/cuoc-thi-lap-trinh/python">
            Chương trình học Python
          </a>
        </li>
        <li>
          <a className="dropdown-item tt-program-item" href="/chuong-trinh/cuoc-thi-lap-trinh/cpp">
            Chương trình học C++
          </a>
        </li>
      </ul>
        </li>
      </ul>
    </li>
  );
}
