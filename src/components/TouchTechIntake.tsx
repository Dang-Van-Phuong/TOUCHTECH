"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import styles from "./TouchTechIntake.module.css";

type FormData = {
  countryCode: string;
  phone: string;
  studentName: string;
  parentName: string;
  email: string;
  course: string;
};

type Step = {
  key: keyof FormData;
  title: string;
  placeholder: string;
  helper?: string;
  type?: "text" | "email" | "tel";
};

const COUNTRIES = [
  { code: "+84", label: "Viet Nam", flag: "🇻🇳" },
  { code: "+1", label: "USA", flag: "🇺🇸" },
  { code: "+82", label: "Korea", flag: "🇰🇷" },
  { code: "+81", label: "Japan", flag: "🇯🇵" },
];

export default function TouchTechIntake() {
  const steps = useMemo<Step[]>(
    () => [
      {
        key: "phone",
        title: "Cho TouchTech biết số điện thoại của bạn",
        placeholder: "Nhập tại đây",
        helper: "Dùng để tư vấn & gửi lộ trình học phù hợp.",
        type: "tel",
      },
      {
        key: "studentName",
        title: "Họ và tên học viên",
        placeholder: "Nhập tại đây",
        helper: "Tên này sẽ hiển thị trên hồ sơ học viên.",
        type: "text",
      },
      {
        key: "parentName",
        title: "Họ tên phụ huynh",
        placeholder: "Nhập tại đây",
        helper: "Để TouchTech liên hệ khi cần.",
        type: "text",
      },
      {
        key: "email",
        title: "Email (nếu có)",
        placeholder: "Nhập tại đây",
        helper: "Nhận tài liệu + template + bài tập thực hành.",
        type: "email",
      },
      {
        key: "course",
        title: "Bạn quan tâm khóa nào?",
        placeholder: "VD: Tin học văn phòng / MOS / Robotics…",
        helper: "Gõ ngắn gọn thôi, chị sẽ tư vấn chi tiết sau 😄",
        type: "text",
      },
    ],
    []
  );

  const [stepIndex, setStepIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [data, setData] = useState<FormData>({
    countryCode: "+84",
    phone: "",
    studentName: "",
    parentName: "",
    email: "",
    course: "",
  });

  const current = steps[stepIndex];
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // focus mượt giống form wizard
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [stepIndex]);

  const isLast = stepIndex === steps.length - 1;

  const canNext = () => {
    if (current.key === "phone") return data.phone.trim().length >= 9;
    if (current.key === "studentName") return data.studentName.trim().length >= 2;
    if (current.key === "parentName") return data.parentName.trim().length >= 2;
    if (current.key === "email") return true; // optional
    if (current.key === "course") return data.course.trim().length >= 2;
    return true;
  };

  const next = () => {
    if (!canNext()) return;
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  };

  const prev = () => setStepIndex((i) => Math.max(i - 1, 0));

  const submit = async () => {
    if (!canNext()) return;
    setSubmitting(true);

    const payload = {
      ...data,
      fullPhone: `${data.countryCode} ${data.phone}`.trim(),
      createdAt: new Date().toISOString(),
      source: "touchtech-intake",
    };

    try {
      // Nếu chị muốn bắn webhook:
      // - Tạo .env.local: NEXT_PUBLIC_TT_INTAKE_WEBHOOK="https://...."
      // - (optional) handler API riêng
      const webhook = process.env.NEXT_PUBLIC_TT_INTAKE_WEBHOOK;

      if (webhook) {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        console.log("TouchTech intake payload:", payload);
      }

      // UX: copy JSON cho chị test nhanh
      try {
        await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      } catch {}

      alert("Đã ghi nhận thông tin ✅ (payload đã log console / copy clipboard)");
      // reset nhẹ
      setStepIndex(0);
      setData({
        countryCode: "+84",
        phone: "",
        studentName: "",
        parentName: "",
        email: "",
        course: "",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (isLast) submit();
    else next();
  };

  const setField = (key: keyof FormData, value: string) =>
    setData((d) => ({ ...d, [key]: value }));

  return (
    <div className={styles.shell}>
      {/* Background ornaments */}
      <div className={styles.bgBlob1} aria-hidden="true" />
      <div className={styles.bgBlob2} aria-hidden="true" />
      <div className={styles.star} aria-hidden="true">★</div>

      {/* Topbar */}
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span>⚡</span>
          </div>
          <div>
            <div className={styles.brandName}>TouchTech</div>
            <div className={styles.brandSub}>AI • Coding • Office • Robotics</div>
          </div>
        </div>

        <div className={styles.topActions}>
          <div className={styles.pill}>
            <span className={styles.dot} />
            <span>TouchTech Intake</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.left}>
          <div className={styles.progress}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={prev}
              disabled={stepIndex === 0 || submitting}
              aria-label="Back"
              title="Back"
            >
              ‹
            </button>
            <div className={styles.progressText}>
              {stepIndex + 1}/{steps.length}
            </div>
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => {
                if (isLast) submit();
                else next();
              }}
              disabled={submitting || !canNext()}
              aria-label={isLast ? "Submit" : "Next"}
              title={isLast ? "Submit" : "Next"}
            >
              ›
            </button>
          </div>

          <h1 className={styles.h1}>{current.title}</h1>

          {/* Input row */}
          <div className={styles.inputRow}>
            {current.key === "phone" && (
              <div className={styles.country}>
                <button type="button" className={styles.countryBtn}>
                  <span className={styles.flag}>
                    {COUNTRIES.find((c) => c.code === data.countryCode)?.flag ?? "🇻🇳"}
                  </span>
                  <span className={styles.cc}>{data.countryCode}</span>
                  <span className={styles.caret}>▾</span>
                </button>

                <div className={styles.countryMenu}>
                  {COUNTRIES.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      className={styles.countryItem}
                      onClick={() => setField("countryCode", c.code)}
                    >
                      <span className={styles.flag}>{c.flag}</span>
                      <span className={styles.countryLabel}>{c.label}</span>
                      <span className={styles.ccRight}>{c.code}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <input
              ref={inputRef}
              className={styles.input}
              value={String(data[current.key] ?? "")}
              onChange={(e) => setField(current.key, e.target.value)}
              onKeyDown={onEnter}
              placeholder={current.placeholder}
              type={current.type ?? "text"}
              inputMode={current.key === "phone" ? "tel" : undefined}
              autoComplete="off"
            />
          </div>

          <div className={styles.helper}>
            {current.helper ?? "Nhấn Enter để tiếp tục."}
          </div>

          <div className={styles.actions}>
            {!isLast ? (
              <button
                type="button"
                className={styles.primary}
                onClick={next}
                disabled={!canNext() || submitting}
              >
                Tiếp theo
              </button>
            ) : (
              <button
                type="button"
                className={styles.primary}
                onClick={submit}
                disabled={!canNext() || submitting}
              >
                {submitting ? "Đang gửi..." : "Bắt đầu"}
              </button>
            )}
            <div className={styles.enterHint}>
              ↵ Hoặc nhấn Enter
            </div>
          </div>

          <div className={styles.legal}>
            Bằng việc nhấn “{isLast ? "Bắt đầu" : "Tiếp theo"}”, bạn đồng ý với{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>Điều khoản dịch vụ</a>.
          </div>
        </div>

        {/* Right preview card */}
        <aside className={styles.right}>
          <div className={styles.previewCard}>
            <div className={styles.previewTop}>
              <div className={styles.avatar}>
                {/* dùng ảnh có sẵn trong assets/images */}
                <Image
                  src="/assets/images/AnhDaiDien.jpg"
                  alt="Avatar"
                  fill
                  sizes="96px"
                  className={styles.avatarImg}
                  priority
                />
              </div>
              <div>
                <div className={styles.previewName}>
                  {data.studentName.trim() ? data.studentName : "Tên học viên"}
                </div>
                <div className={styles.previewSub}>
                  Hồ sơ TouchTech
                </div>
              </div>
            </div>

            <div className={styles.previewBody}>
              <div className={styles.row}>
                <div className={styles.label}>Họ tên phụ huynh:</div>
                <div className={styles.value}>
                  {data.parentName.trim() || "—"}
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.label}>Số điện thoại liên hệ:</div>
                <div className={styles.value}>
                  {(data.phone.trim() && `${data.countryCode} ${data.phone}`) || "—"}
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.label}>Email:</div>
                <div className={styles.value}>
                  {data.email.trim() || "—"}
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.label}>Quan tâm:</div>
                <div className={styles.value}>
                  {data.course.trim() || "—"}
                </div>
              </div>
            </div>

            <div className={styles.previewFoot}>
              Được hỗ trợ bởi <b>TouchTech</b>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div>© {new Date().getFullYear()} TouchTech</div>
        <div className={styles.footerLinks}>
          <a href="#" onClick={(e) => e.preventDefault()}>Điều khoản</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Chính sách</a>
        </div>
      </footer>
    </div>
  );
}
