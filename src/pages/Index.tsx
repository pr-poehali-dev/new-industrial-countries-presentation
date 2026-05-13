import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const slides = [
  {
    id: 0,
    title: "Таиланд",
    subtitle: "Королевство на перекрёстке цивилизаций",
    tag: "Географический обзор",
    image: "https://cdn.poehali.dev/projects/b001a868-3031-4851-8bbc-be7b22055faa/files/576e4e21-d472-4ddc-82c0-5e5b16bbee9d.jpg",
    section: "01",
    sectionName: "Введение",
    color: "#C8960C",
    isCover: true,
    facts: [
      { icon: "MapPin", label: "Столица", value: "Бангкок" },
      { icon: "Users", label: "Население", value: "71 млн чел." },
      { icon: "Globe", label: "Площадь", value: "513 120 км²" },
    ],
  },
  {
    id: 1,
    title: "Расположение",
    subtitle: "Сердце Юго-Восточной Азии",
    tag: "География",
    image: "https://cdn.poehali.dev/projects/b001a868-3031-4851-8bbc-be7b22055faa/files/576e4e21-d472-4ddc-82c0-5e5b16bbee9d.jpg",
    section: "02",
    sectionName: "Расположение",
    color: "#2A7A4F",
    isCover: false,
    body: "Таиланд расположен в центральной части полуострова Индокитай и на севере полуострова Малакка. Граничит с Мьянмой, Лаосом, Камбоджей и Малайзией. Омывается Сиамским заливом и Андаманским морем.",
    facts: [
      { icon: "Compass", label: "Координаты", value: "15°N, 101°E" },
      { icon: "Anchor", label: "Береговая линия", value: "3 219 км" },
      { icon: "Mountain", label: "Макс. высота", value: "2 565 м" },
    ],
  },
  {
    id: 2,
    title: "Климат",
    subtitle: "Тропический муссонный пояс",
    tag: "Климатология",
    image: "https://cdn.poehali.dev/projects/b001a868-3031-4851-8bbc-be7b22055faa/files/bac54cc5-489c-49c5-be75-e7cf1ce68ef8.jpg",
    section: "03",
    sectionName: "Климат",
    color: "#1A5A8A",
    isCover: false,
    body: "Климат тропический муссонный с тремя сезонами: жаркий (март–май), дождливый (июнь–октябрь) и прохладный (ноябрь–февраль). Среднегодовая температура +28°C. Юг страны получает осадки весь год благодаря близости океанов.",
    facts: [
      { icon: "Thermometer", label: "Средняя t°", value: "+28°C" },
      { icon: "CloudRain", label: "Осадки/год", value: "1 400 мм" },
      { icon: "Wind", label: "Сезон дождей", value: "Июнь–Октябрь" },
    ],
  },
  {
    id: 3,
    title: "Индустриальность",
    subtitle: "Новая индустриальная страна Азии",
    tag: "Экономика",
    image: "https://cdn.poehali.dev/projects/b001a868-3031-4851-8bbc-be7b22055faa/files/c5218818-44ee-4377-a4f3-4ae757d9d6e6.jpg",
    section: "04",
    sectionName: "Промышленность",
    color: "#D4472A",
    isCover: false,
    body: "Таиланд — один из крупнейших мировых производителей автомобилей, электроники и текстиля. «Детройт Азии» выпускает свыше 2 млн авто в год. Страна экспортирует компьютерные компоненты, рис, каучук и морепродукты. ВВП превышает $500 млрд — 2-я экономика Юго-Восточной Азии.",
    facts: [
      { icon: "Car", label: "Авто/год", value: "2 млн+" },
      { icon: "Package", label: "Экспорт", value: "$285 млрд" },
      { icon: "TrendingUp", label: "ВВП", value: "$500+ млрд" },
    ],
  },
  {
    id: 4,
    title: "Ресурсы и ландшафты",
    subtitle: "Богатство тропической природы",
    tag: "Природа",
    image: "https://cdn.poehali.dev/projects/b001a868-3031-4851-8bbc-be7b22055faa/files/319c1f97-f8af-42eb-91f3-2f85102049dd.jpg",
    section: "05",
    sectionName: "Природа",
    color: "#6B3A8A",
    isCover: false,
    body: "Таиланд богат оловом, каучуком, природным газом, вольфрамом и драгоценными камнями. Ландшафты разнообразны: горные хребты на севере, центральная равнина реки Чаупхрая, тропические джунгли и мангровые побережья.",
    facts: [
      { icon: "Gem", label: "Полезные ископаемые", value: "Олово, газ, вольфрам" },
      { icon: "Trees", label: "Леса", value: "33% территории" },
      { icon: "Waves", label: "Острова", value: "более 1 400" },
    ],
  },
];

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current) return;
      setDirection(index > current ? "next" : "prev");
      setPrev(current);
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 700);
    },
    [animating, current]
  );

  const next = () => goTo(Math.min(current + 1, slides.length - 1));
  const back = () => goTo(Math.max(current - 1, 0));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") back();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, animating]);

  const slide = slides[current];
  const prevSlide = prev !== null ? slides[prev] : null;

  return (
    <div
      style={{ fontFamily: "'Golos Text', sans-serif" }}
      className="relative w-full h-screen overflow-hidden bg-[#0d0d0d] select-none"
    >
      {/* Prev slide (exiting) */}
      {prevSlide && (
        <SlideView
          slide={prevSlide}
          state="exit"
          direction={direction}
        />
      )}

      {/* Current slide (entering) */}
      <SlideView
        slide={slide}
        state={animating ? "enter" : "idle"}
        direction={direction}
      />

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-50">
        <button
          onClick={back}
          disabled={current === 0}
          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white/70 transition-all disabled:opacity-20"
        >
          <Icon name="ChevronLeft" size={18} />
        </button>

        <div className="flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className="transition-all duration-300"
            >
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "28px" : "8px",
                  height: "8px",
                  background: i === current ? slide.color : "rgba(255,255,255,0.3)",
                }}
              />
            </button>
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white/70 transition-all disabled:opacity-20"
        >
          <Icon name="ChevronRight" size={18} />
        </button>
      </div>

      {/* Slide counter */}
      <div className="absolute top-8 right-10 z-50 text-white/40 text-sm tracking-widest"
        style={{ fontFamily: "'Cormorant', serif" }}>
        {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>
    </div>
  );
}

function SlideView({
  slide,
  state,
  direction,
}: {
  slide: (typeof slides)[0];
  state: "idle" | "enter" | "exit";
  direction: "next" | "prev";
}) {
  const enterFrom = direction === "next" ? "translateX(60px)" : "translateX(-60px)";
  const exitTo = direction === "next" ? "translateX(-60px)" : "translateX(60px)";

  const style: React.CSSProperties =
    state === "enter"
      ? {
          animation: "slideEnter 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        }
      : state === "exit"
      ? {
          animation: "slideExit 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
          pointerEvents: "none",
        }
      : {};

  return (
    <>
      <style>{`
        @keyframes slideEnter {
          from { opacity: 0; transform: ${enterFrom}; }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideExit {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: ${exitTo}; }
        }
        @keyframes fadeUp {
          from { opacity:0; transform: translateY(24px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          from { width: 0; }
          to   { width: 48px; }
        }
      `}</style>

      <div
        style={style}
        className="absolute inset-0 w-full h-full flex"
      >
        {/* Left content panel */}
        <div
          className="relative z-10 flex flex-col justify-between px-14 py-12 w-[52%]"
          style={{ background: "linear-gradient(135deg, #0d0d0d 60%, #1a1a1a)" }}
        >
          {/* Top label */}
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full"
              style={{
                background: slide.color + "22",
                color: slide.color,
                border: `1px solid ${slide.color}44`,
              }}
            >
              {slide.tag}
            </span>
          </div>

          {/* Main content */}
          <div>
            <div
              className="flex items-center gap-3 mb-5"
              style={{ animation: state !== "exit" ? "fadeUp 0.6s 0.15s both" : undefined }}
            >
              <span
                className="block h-[2px] rounded-full"
                style={{
                  width: "48px",
                  background: slide.color,
                  animation: state !== "exit" ? "lineGrow 0.5s 0.3s both" : undefined,
                }}
              />
              <span
                className="text-xs tracking-[0.25em] uppercase"
                style={{ color: slide.color, fontFamily: "'Golos Text', sans-serif" }}
              >
                {slide.section} · {slide.sectionName}
              </span>
            </div>

            <h1
              className="text-6xl font-bold leading-tight text-white mb-3"
              style={{
                fontFamily: "'Cormorant', serif",
                animation: state !== "exit" ? "fadeUp 0.6s 0.2s both" : undefined,
              }}
            >
              {slide.title}
            </h1>

            <p
              className="text-lg text-white/50 mb-8 italic"
              style={{
                fontFamily: "'Cormorant', serif",
                animation: state !== "exit" ? "fadeUp 0.6s 0.28s both" : undefined,
              }}
            >
              {slide.subtitle}
            </p>

            {slide.body && (
              <p
                className="text-sm text-white/65 leading-relaxed max-w-sm"
                style={{ animation: state !== "exit" ? "fadeUp 0.6s 0.35s both" : undefined }}
              >
                {slide.body}
              </p>
            )}

            {/* Facts row */}
            <div
              className="flex gap-6 mt-10"
              style={{ animation: state !== "exit" ? "fadeUp 0.6s 0.42s both" : undefined }}
            >
              {slide.facts.map((f) => (
                <div key={f.label} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-white/40 text-xs tracking-wide uppercase">
                    <Icon name={f.icon} fallback="MapPin" size={12} />
                    {f.label}
                  </div>
                  <span className="text-white font-semibold text-sm">{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Author signature — only on cover slide */}
          {slide.isCover && (
            <div
              className="absolute bottom-10 right-10 text-white/35 text-xs tracking-wide"
              style={{ fontFamily: "'Golos Text', sans-serif" }}
            >
              Папазян Сергей 11Б
            </div>
          )}

          {/* Bottom decoration */}
          {!slide.isCover && <div className="h-6" />}
        </div>

        {/* Right image panel */}
        <div className="relative flex-1 overflow-hidden">
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "saturate(1.1) brightness(0.88)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #0d0d0d 0%, transparent 30%), linear-gradient(to top, #0d0d0d 0%, transparent 40%)",
            }}
          />

          {/* Accent line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px]"
            style={{ background: slide.color }}
          />
        </div>
      </div>
    </>
  );
}