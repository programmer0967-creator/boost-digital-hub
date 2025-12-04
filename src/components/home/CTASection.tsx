import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { CONTACT_INFO } from "@/lib/contact";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-l from-primary/20 via-primary/10 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            جاهز لتحقيق النمو؟
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            ابدأ رحلتك نحو النجاح في عالم السوشيال ميديا اليوم. 
            تواصل معنا واحصل على استشارة مجانية.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/request">
              <Button variant="hero" size="xl" className="group">
                اطلب خدمتك الآن
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href={CONTACT_INFO.whatsapp.link} target="_blank" rel="noopener noreferrer">
              <Button variant="heroOutline" size="xl" className="group">
                <MessageCircle className="w-5 h-5" />
                تواصل واتساب
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
