import type { LocalizedJourneyContent } from "./content.types";

export const persianJourneyContent = {
  interface: {
    skipLabel: "پرش به روایت",
    fallbackStatus: "صحنهٔ تزئینی وب‌جی‌ال در دسترس نیست؛ روایت در ادامه قابل استفاده است.",
    sourceHeading: "منابع",
    uncertaintyHeading: "دربارهٔ این بازسازی",
  },
  stations: {
    intro: {
      id: "intro",
      navigationTitle: "آغاز",
      title: "شاهنشاهی ایران ۲۵۰۰",
      lead: "سنگ می‌تواند خاطره را از سده‌ها عبور دهد.",
      description:
        "این بخش، مقدمه‌ای گزینشی و اسکرول‌محور برای آشنایی با فرم‌هایی از تخت جمشید است. گزاره‌های تاریخی روایت به منابع فهرست‌شده پیوند دارند.",
      labels: [],
      evidence: "editorial",
      sourceIds: [],
    },
    "grand-stairway": {
      id: "grand-stairway",
      navigationTitle: "پلکان بزرگ",
      title: "پلکان بزرگ",
      lead: "راهی آیینی در سنگ.",
      description:
        "تخت جمشید در مجموعهٔ معماری گستردهٔ خود، پلکان‌های یادمانی و نوارهای نقش‌برجسته دارد.",
      labels: [
        { id: "context", title: "بافت محوطه", value: "صفهٔ تخت جمشید" },
        { id: "evidence", title: "شواهد دیداری", value: "پلکان‌ها و نوارهای نقش‌برجسته" },
      ],
      uncertaintyNote:
        "این فایل GLB یک placeholder است و پلکان یا توالی نقش‌برجسته‌های باقی‌مانده را بازتولید نمی‌کند.",
      evidence: "confirmed",
      sourceIds: ["UNESCO-PERSEPOLIS"],
    },
    lamassu: {
      id: "lamassu",
      navigationTitle: "پیکره‌های نگهبان",
      title: "پیکره‌های نگهبان",
      lead: "آستانه‌ای قاب‌گرفته با پیکره‌های محافظ.",
      description:
        "در دروازهٔ خشایارشا، گاوهای نگهبان و گاو-انسان‌های متأثر از هنر آشوری در ورودی‌ها قرار داشتند.",
      labels: [
        { id: "context", title: "بافت معماری", value: "دروازهٔ خشایارشا" },
        { id: "evidence", title: "فرم پیکره", value: "گاو نگهبان و گاو-انسان" },
      ],
      uncertaintyNote:
        "GLB فعلی placeholder است و بازسازی تأییدشده‌ای از پیکرهٔ نگهبان تخت جمشید نیست.",
      evidence: "confirmed",
      sourceIds: ["ISAC-GATE-XERXES"],
    },
    "bull-capital": {
      id: "bull-capital",
      navigationTitle: "سرستون گاو",
      title: "سرستون گاو",
      lead: "پیکره‌ای تراش‌خورده برای حمل سازه.",
      description:
        "در تخت جمشید، برخی سرستون‌های سنگی از بخش‌های جلوییِ جفت‌گاو برای نگه‌داشتن تیرهای چوبی سقف استفاده می‌کردند.",
      labels: [
        { id: "function", title: "کارکرد", value: "پشتیبانی از تیرِ سقف" },
        { id: "form", title: "فرم", value: "پیش‌تنه‌های جفت‌گاو" },
      ],
      uncertaintyNote:
        "این مونتاژ دیجیتال، placeholder ساده‌شده است و بازسازی معماریِ اندازه‌برداری‌شده نیست.",
      evidence: "confirmed",
      sourceIds: ["MET-BULL-CAPITAL", "ISAC-ANCIENT-IRAN-MUSEUM"],
    },
    outro: {
      id: "outro",
      navigationTitle: "پایان",
      title: "یاد در سنگ",
      lead: "آنچه باقی مانده، نگاه دقیق را فرامی‌خواند.",
      description:
        "این زیرساخت برای محتوای تاریخیِ منبع‌دار، بیان صریحِ عدم‌قطعیت و بازسازی‌های بررسی‌شده در آینده طراحی شده است.",
      labels: [],
      evidence: "editorial",
      sourceIds: [],
    },
  },
} as const satisfies LocalizedJourneyContent;
