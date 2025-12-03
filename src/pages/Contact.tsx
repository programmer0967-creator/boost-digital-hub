import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Instagram, Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const contactMethods = [
  {
    icon: MessageCircle,
    title: "واتساب",
    value: "+966 50 000 0000",
    href: "https://wa.me/966500000000",
    color: "bg-green-500/10 text-green-500"
  },
  {
    icon: Instagram,
    title: "انستجرام",
    value: "@moeen_alazab",
    href: "https://instagram.com/moeen_alazab",
    color: "bg-pink-500/10 text-pink-500"
  },
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    value: "info@moeenalazab.com",
    href: "mailto:info@moeenalazab.com",
    color: "bg-primary/10 text-primary"
  },
  {
    icon: Phone,
    title: "الهاتف",
    value: "+966 50 000 0000",
    href: "tel:+966500000000",
    color: "bg-blue-500/10 text-blue-500"
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "تم إرسال رسالتك بنجاح!",
      description: "سنتواصل معك في أقرب وقت ممكن.",
    });
    
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <span className="text-primary font-medium mb-4 block">تواصل معنا</span>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              نحن هنا لمساعدتك
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              تواصل معنا عبر أي من القنوات المتاحة وسنرد عليك في أقرب وقت
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Methods */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-6">طرق التواصل</h2>
              {contactMethods.map((method, index) => (
                <a key={index} href={method.href} target="_blank" rel="noopener noreferrer">
                  <Card variant="service" className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method.color}`}>
                        <method.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold">{method.title}</h3>
                        <p className="text-sm text-muted-foreground">{method.value}</p>
                      </div>
                    </div>
                  </Card>
                </a>
              ))}

              {/* Location */}
              <Card variant="glass" className="p-6 mt-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">الموقع</h3>
                    <p className="text-sm text-muted-foreground">
                      المملكة العربية السعودية
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card variant="glass">
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold mb-6">أرسل رسالتك</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">الاسم الكامل</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="أدخل اسمك"
                          required
                          className="bg-card/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني</Label>
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

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">رقم الجوال</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+966 5X XXX XXXX"
                          className="bg-card/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">الموضوع</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="موضوع الرسالة"
                          required
                          className="bg-card/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">الرسالة</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="اكتب رسالتك هنا..."
                        rows={5}
                        required
                        className="bg-card/50"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "جاري الإرسال..." : "إرسال الرسالة"}
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
