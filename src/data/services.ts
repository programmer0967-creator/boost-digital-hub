import { 
  Users, 
  TrendingUp, 
  Instagram, 
  CreditCard, 
  Lightbulb, 
  Zap,
  Tv,
  AtSign
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: typeof Users;
  features: string[];
  price: string;
  popular?: boolean;
  category: string;
}

export const services: Service[] = [
  {
    id: "crypto-trading",
    title: "بيع وشراء العملات الرقمية",
    description: "خدمات شراء وبيع العملات الرقمية لأي منصة بأسعار تنافسية وأمان تام",
    icon: CreditCard,
    features: [
      "تحويل فوري وآمن",
      "دعم جميع المنصات الرئيسية",
      "أسعار تنافسية",
      "سرية تامة"
    ],
    price: "حسب الكمية",
    category: "مالية"
  },
  {
    id: "account-management",
    title: "التسويق وإدارة الحسابات",
    description: "إدارة احترافية لحسابات انستجرام وفيسبوك مع استراتيجيات تسويق فعالة",
    icon: TrendingUp,
    features: [
      "إدارة المحتوى اليومي",
      "جدولة المنشورات",
      "تحليل الأداء",
      "زيادة التفاعل"
    ],
    price: "باقات شهرية",
    popular: true,
    category: "تسويق"
  },
  {
    id: "real-followers",
    title: "متابعين عرب حقيقيين",
    description: "زيادة متابعين حقيقيين من الدول العربية لحسابات انستجرام وفيسبوك",
    icon: Users,
    features: [
      "متابعين عرب حقيقيين",
      "ضمان عدم النقصان",
      "تسليم تدريجي طبيعي",
      "دعم مستمر"
    ],
    price: "حسب العدد",
    popular: true,
    category: "نمو"
  },
  {
    id: "premium-usernames",
    title: "يوزرات انستجرام مميزة",
    description: "أسماء مستخدم حصرية ومميزة لحساب انستجرام الخاص بك",
    icon: AtSign,
    features: [
      "يوزرات قصيرة ونادرة",
      "نقل ملكية آمن",
      "دعم فني كامل",
      "ضمان الملكية"
    ],
    price: "حسب الجودة",
    category: "حسابات"
  },
  {
    id: "account-sales",
    title: "بيع حسابات جاهزة",
    description: "حسابات سوشيال ميديا متفاعلة وجاهزة للاستخدام الفوري",
    icon: Instagram,
    features: [
      "حسابات موثقة",
      "جمهور حقيقي متفاعل",
      "تاريخ نظيف",
      "نقل ملكية آمن"
    ],
    price: "حسب القوة",
    category: "حسابات"
  },
  {
    id: "creator-tips",
    title: "نصائح صناع المحتوى",
    description: "استشارات متخصصة لصناع المحتوى لتطوير قنواتهم وزيادة أرباحهم",
    icon: Lightbulb,
    features: [
      "جلسات استشارية خاصة",
      "خطة محتوى مخصصة",
      "نصائح النمو السريع",
      "استراتيجيات الربح"
    ],
    price: "جلسات",
    category: "استشارات"
  },
  {
    id: "engagement-boost",
    title: "رشق الحسابات",
    description: "زيادة التفاعل والمشاهدات والإعجابات على منشوراتك",
    icon: Zap,
    features: [
      "زيادة المشاهدات",
      "رفع التفاعل",
      "تعليقات حقيقية",
      "مشاركات فعلية"
    ],
    price: "حسب الكمية",
    category: "نمو"
  },
  {
    id: "streaming-subscriptions",
    title: "اشتراكات نتفلكس وشاهد",
    description: "اشتراكات بأسعار مخفضة لمنصات البث نتفلكس وشاهد VIP",
    icon: Tv,
    features: [
      "أسعار تنافسية",
      "حسابات خاصة",
      "ضمان الاشتراك",
      "دعم فني"
    ],
    price: "شهري/سنوي",
    category: "اشتراكات"
  }
];

export const categories = ["الكل", "تسويق", "نمو", "حسابات", "استشارات", "مالية", "اشتراكات"];
