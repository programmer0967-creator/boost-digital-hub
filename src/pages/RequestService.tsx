import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Send, CheckCircle } from "lucide-react";
import { services } from "@/data/services";
import { toast } from "@/hooks/use-toast";

const RequestService = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get("service") || "";
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: preselectedService,
    platform: "",
    accountLink: "",
    details: "",
    budget: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-24">
          <div className="container mx-auto px-4">
            <Card variant="glass" className="max-w-lg mx-auto">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-2xl font-black mb-4">تم إرسال طلبك بنجاح!</h1>
                <p className="text-muted-foreground mb-8">
                  شكراً لك، سنراجع طلبك ونتواصل معك في أقرب وقت ممكن.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/">
                    <Button variant="outline">العودة للرئيسية</Button>
                  </Link>
                  <a href="https://wa.me/966500000000">
                    <Button variant="hero">تواصل واتساب</Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-foreground">طلب خدمة</span>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <span className="text-primary font-medium mb-4 block">طلب خدمة</span>
              <h1 className="text-4xl md:text-5xl font-black mb-4">
                أخبرنا عن احتياجاتك
              </h1>
              <p className="text-muted-foreground">
                املأ النموذج التالي وسنتواصل معك لمناقشة التفاصيل
              </p>
            </div>

            {/* Request Form */}
            <Card variant="glass">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg border-r-4 border-primary pr-3">المعلومات الشخصية</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">الاسم الكامل *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="أدخل اسمك الكامل"
                          required
                          className="bg-card/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="example@email.com"
                          required
                          className="bg-card/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الجوال (واتساب) *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+966 5X XXX XXXX"
                        required
                        className="bg-card/50"
                      />
                    </div>
                  </div>

                  {/* Service Info */}
                  <div className="space-y-4 pt-6 border-t border-border">
                    <h3 className="font-bold text-lg border-r-4 border-primary pr-3">تفاصيل الخدمة</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>الخدمة المطلوبة *</Label>
                        <Select 
                          value={formData.service} 
                          onValueChange={(value) => setFormData({ ...formData, service: value })}
                        >
                          <SelectTrigger className="bg-card/50">
                            <SelectValue placeholder="اختر الخدمة" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>المنصة</Label>
                        <Select 
                          value={formData.platform} 
                          onValueChange={(value) => setFormData({ ...formData, platform: value })}
                        >
                          <SelectTrigger className="bg-card/50">
                            <SelectValue placeholder="اختر المنصة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="instagram">انستجرام</SelectItem>
                            <SelectItem value="facebook">فيسبوك</SelectItem>
                            <SelectItem value="tiktok">تيك توك</SelectItem>
                            <SelectItem value="twitter">تويتر</SelectItem>
                            <SelectItem value="youtube">يوتيوب</SelectItem>
                            <SelectItem value="multiple">عدة منصات</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accountLink">رابط الحساب (اختياري)</Label>
                      <Input
                        id="accountLink"
                        value={formData.accountLink}
                        onChange={(e) => setFormData({ ...formData, accountLink: e.target.value })}
                        placeholder="https://instagram.com/your_account"
                        className="bg-card/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="details">تفاصيل إضافية *</Label>
                      <Textarea
                        id="details"
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        placeholder="اشرح لنا بالتفصيل ما تحتاجه من الخدمة، أهدافك، وأي متطلبات خاصة..."
                        rows={5}
                        required
                        className="bg-card/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>الميزانية المتوقعة</Label>
                      <Select 
                        value={formData.budget} 
                        onValueChange={(value) => setFormData({ ...formData, budget: value })}
                      >
                        <SelectTrigger className="bg-card/50">
                          <SelectValue placeholder="حدد ميزانيتك" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under100">أقل من 100 ريال</SelectItem>
                          <SelectItem value="100-500">100 - 500 ريال</SelectItem>
                          <SelectItem value="500-1000">500 - 1000 ريال</SelectItem>
                          <SelectItem value="1000-5000">1000 - 5000 ريال</SelectItem>
                          <SelectItem value="over5000">أكثر من 5000 ريال</SelectItem>
                          <SelectItem value="discuss">نناقش الميزانية</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "جاري إرسال الطلب..." : "إرسال الطلب"}
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RequestService;
