import { Shield, Clock, HeadphonesIcon, Award, Zap, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "أمان وموثوقية",
    description: "نحرص على سرية بياناتك وأمان حساباتك بشكل كامل"
  },
  {
    icon: Clock,
    title: "تسليم سريع",
    description: "نلتزم بمواعيد التسليم المتفق عليها دون تأخير"
  },
  {
    icon: HeadphonesIcon,
    title: "دعم متواصل",
    description: "فريق دعم متاح على مدار الساعة للإجابة على استفساراتك"
  },
  {
    icon: Award,
    title: "جودة عالية",
    description: "نقدم خدمات احترافية بأعلى معايير الجودة"
  },
  {
    icon: Zap,
    title: "نتائج ملموسة",
    description: "نركز على تحقيق نتائج حقيقية تساعدك على النمو"
  },
  {
    icon: Users,
    title: "خبرة واسعة",
    description: "سنوات من الخبرة في مجال السوشيال ميديا والتسويق"
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-primary font-medium mb-4 block">لماذا تختارنا؟</span>
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              شريكك الموثوق في النجاح الرقمي
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              نحن نفهم تحديات السوشيال ميديا ونعرف كيف نساعدك على التغلب عليها. 
              مع خبرة واسعة ونتائج مثبتة، نحن الخيار الأمثل لتحقيق أهدافك الرقمية.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {features.slice(0, 4).map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 p-8 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-8 right-8 w-32 h-32 bg-primary/30 rounded-full blur-3xl" />
              <div className="absolute bottom-8 left-8 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              
              {/* Stats Cards */}
              <div className="relative z-10 h-full flex flex-col justify-center gap-6">
                <div className="bg-card/90 backdrop-blur-xl rounded-2xl p-6 border border-border/50 animate-float">
                  <div className="text-4xl font-black text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">عميل راضٍ عن خدماتنا</div>
                </div>
                
                <div className="bg-card/90 backdrop-blur-xl rounded-2xl p-6 border border-border/50 animate-float delay-200 mr-12">
                  <div className="text-4xl font-black text-primary mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">سنوات من الخبرة</div>
                </div>
                
                <div className="bg-card/90 backdrop-blur-xl rounded-2xl p-6 border border-border/50 animate-float delay-400">
                  <div className="text-4xl font-black text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">دعم فني متواصل</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
