"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type LangItem = {
  id: string;
  label: string;     // United States (EN)
  region: string;    // Region & Languages (hoặc Khu vực & Ngôn ngữ)
  current: string;   // Vietnam (EN)
  flag: string;      // 🇺🇸
};

const STORAGE_KEY = "tt_lang";

const LANGS: LangItem[] = [
  { id: "us-en", label: "United States (EN)", region: "Khu vực & Ngôn ngữ", current: "Vietnam (EN)", flag: "🇺🇸" },
  { id: "ca-en", label: "Canada (EN)",        region: "Khu vực & Ngôn ngữ", current: "Vietnam (EN)", flag: "🇨🇦" },
  { id: "vn-en", label: "Vietnam (EN)",       region: "Khu vực & Ngôn ngữ", current: "Vietnam (EN)", flag: "🇻🇳" },
  { id: "id-en", label: "Indonesia (EN)",     region: "Khu vực & Ngôn ngữ", current: "Vietnam (EN)", flag: "🇮🇩" },
  { id: "th-en", label: "Thailand (EN)",      region: "Khu vực & Ngôn ngữ", current: "Vietnam (EN)", flag: "🇹🇭" },
  { id: "ph-en", label: "Philippines (EN)",   region: "Khu vực & Ngôn ngữ", current: "Vietnam (EN)", flag: "🇵🇭" },
  { id: "sg-en", label: "Singapore (EN)",     region: "Khu vực & Ngôn ngữ", current: "Vietnam (EN)", flag: "🇸🇬" },
];

export default function BoChonNgonNgu() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>(() => {
    if (typeof window === "undefined") return "vn-en";

    try {
      return localStorage.getItem(STORAGE_KEY) ?? "vn-en";
    } catch {
      return "vn-en";
    }
  });

  const selected = useMemo(
    () => LANGS.find((x) => x.id === selectedId) ?? LANGS[2],
    [selectedId]
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, selectedId);
    } catch {}
  }, [selectedId]);

  // click outside + ESC to close
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={wrapRef} className="tt-lang">
      <button
        type="button"
        className="tt-lang-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="tt-lang-icon">A文</span>

        <span className="tt-lang-text">
          <span className="tt-lang-sub">{selected.region}</span>
          <span className="tt-lang-main">
            {selected.current} <span className="tt-caret">▲</span>
          </span>
        </span>
      </button>

      {open && (
        <div className="tt-lang-menu" role="menu">
          {LANGS.map((it) => {
            const active = it.id === selectedId;
            return (
              <button
                key={it.id}
                type="button"
                className={`tt-lang-item ${active ? "is-active" : ""}`}
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setSelectedId(it.id);
                  setOpen(false);

                  // TODO: nếu chị dùng i18n/router thì gọi đổi ngôn ngữ ở đây
                  // i18n.changeLanguage(...)
                }}
              >
                <span className={`tt-radio ${active ? "is-on" : ""}`} />
                <span className="tt-flag" aria-hidden="true">{it.flag}</span>
                <span className="tt-lang-label">{it.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
