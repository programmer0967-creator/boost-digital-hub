import { Link } from "react-router-dom";
import { Flame, Instagram, MessageCircle, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Flame className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">معين العزب</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              خبير في خدمات السوشيال ميديا المتكاملة، نساعدك على النمو وتحقيق أهدافك الرقمية.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  الخدمات
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  معرض الأعمال
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  تواصل معنا
                </Link>
              </li>
              <li>
                <Link to="/request" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  اطلب خدمة
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">خدماتنا</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground text-sm">إدارة الحسابات</li>
              <li className="text-muted-foreground text-sm">زيادة المتابعين</li>
              <li className="text-muted-foreground text-sm">رشق التفاعل</li>
              <li className="text-muted-foreground text-sm">استشارات المحتوى</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://wa.me/966500000000" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>واتساب</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com/moeen_alazab" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@moeen_alazab</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@moeenalazab.com" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>البريد الإلكتروني</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+966500000000" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>اتصل بنا</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} معين العزب. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="https://instagram.com/moeen_alazab" 
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://wa.me/966500000000" 
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
