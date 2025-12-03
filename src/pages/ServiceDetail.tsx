import { useParams, Link, Navigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Check, MessageCircle, ArrowRight } from "lucide-react";
import { services } from "@/data/services";

const ServiceDetail = () => {
  const { id } = useParams();
  const service = services.find(s => s.id === id);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const relatedServices = services.filter(s => s.category === service.category && s.id !== service.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
            <ArrowRight className="w-4 h-4" />
            <Link to="/services" className="hover:text-primary transition-colors">الخدمات</Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-foreground">{service.title}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Service Header */}
              <div className="mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl md:text-4xl font-black">{service.title}</h1>
                      {service.popular && (
                        <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">
                          الأكثر طلباً
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">التصنيف: {service.category}</span>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Features */}
              <Card variant="glass" className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6">مميزات الخدمة</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-card/50">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* How it works */}
              <Card variant="glass">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6">كيف تعمل الخدمة؟</h2>
                  <div className="space-y-4">
                    {[
                      "تواصل معنا وشاركنا متطلباتك",
                      "نقوم بتحليل احتياجاتك وتقديم العرض المناسب",
                      "بعد الموافقة نبدأ العمل فوراً",
                      "تتابع تقدم العمل خطوة بخطوة",
                      "تسليم الخدمة ومتابعة ما بعد البيع"
                    ].map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
                          {index + 1}
                        </div>
                        <p className="pt-1 text-muted-foreground">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Pricing Card */}
              <Card variant="glow" className="sticky top-28 mb-6">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <span className="text-sm text-muted-foreground">السعر</span>
                    <div className="text-3xl font-black text-primary mt-1">{service.price}</div>
                  </div>
                  
                  <div className="space-y-3">
                    <Link to={`/request?service=${service.id}`}>
                      <Button variant="hero" className="w-full group">
                        اطلب الخدمة
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <a href="https://wa.me/966500000000" className="block">
                      <Button variant="outline" className="w-full">
                        <MessageCircle className="w-4 h-4" />
                        استفسر عبر واتساب
                      </Button>
                    </a>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary" />
                      <span>ضمان جودة الخدمة</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary" />
                      <span>دعم فني متواصل</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary" />
                      <span>تسليم في الوقت المحدد</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div>
                  <h3 className="font-bold mb-4">خدمات مشابهة</h3>
                  <div className="space-y-3">
                    {relatedServices.map((related) => (
                      <Link key={related.id} to={`/services/${related.id}`}>
                        <Card variant="service" className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <related.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">{related.title}</h4>
                              <span className="text-xs text-muted-foreground">{related.price}</span>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
