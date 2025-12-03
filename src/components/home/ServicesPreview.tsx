import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { services } from "@/data/services";

export function ServicesPreview() {
  const featuredServices = services.slice(0, 6);

  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium mb-4 block">خدماتنا</span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            خدمات السوشيال ميديا المتكاملة
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            نقدم مجموعة شاملة من الخدمات لمساعدتك على النمو وتحقيق أهدافك في عالم التواصل الاجتماعي
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service, index) => (
            <Link key={service.id} to={`/services/${service.id}`}>
              <Card 
                variant="service" 
                className="h-full cursor-pointer group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="flex items-center justify-between">
                    {service.title}
                    {service.popular && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                        الأكثر طلباً
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">
                      {service.price}
                    </span>
                    <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/services">
            <Button variant="outline" size="lg" className="group">
              عرض جميع الخدمات
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
