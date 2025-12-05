import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  followers: string;
  engagement: string;
  reach: string;
  gradient: string;
  is_active: boolean;
}

const defaultItems = [
  { id: "1", title: "حملة تسويقية لمتجر إلكتروني", category: "تسويق", description: "زيادة المبيعات بنسبة 150% خلال شهر واحد من خلال إدارة حملات إعلانية متكاملة", followers: "50K+", engagement: "8%", reach: "500K", gradient: "from-primary/30 to-accent/30", is_active: true },
  { id: "2", title: "نمو حساب مؤثر", category: "نمو", description: "من 5 آلاف إلى 100 ألف متابع حقيقي خلال 3 أشهر مع الحفاظ على التفاعل", followers: "100K", engagement: "12%", reach: "1M", gradient: "from-emerald-500/30 to-teal-500/30", is_active: true },
  { id: "3", title: "إدارة حساب علامة تجارية", category: "إدارة", description: "إدارة متكاملة لحسابات العلامة التجارية على جميع المنصات مع تحسين الأداء", followers: "25K", engagement: "15%", reach: "300K", gradient: "from-violet-500/30 to-purple-500/30", is_active: true },
  { id: "4", title: "استراتيجية محتوى لصانع محتوى", category: "استشارات", description: "تطوير استراتيجية محتوى شاملة أدت لمضاعفة الدخل 3 مرات", followers: "200K", engagement: "10%", reach: "2M", gradient: "from-amber-500/30 to-orange-500/30", is_active: true },
  { id: "5", title: "حملة رشق تفاعل", category: "نمو", description: "رفع معدل التفاعل من 2% إلى 18% مع محافظة على جودة المتابعين", followers: "75K", engagement: "18%", reach: "800K", gradient: "from-rose-500/30 to-pink-500/30", is_active: true },
  { id: "6", title: "بناء علامة تجارية من الصفر", category: "تسويق", description: "بناء هوية رقمية متكاملة وإطلاق حسابات السوشيال ميديا بنجاح", followers: "30K", engagement: "14%", reach: "400K", gradient: "from-cyan-500/30 to-blue-500/30", is_active: true }
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [categories, setCategories] = useState<string[]>(["الكل"]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      setPortfolioItems(data);
      const uniqueCategories = ["الكل", ...new Set(data.map((item) => item.category))];
      setCategories(uniqueCategories);
    } else {
      setPortfolioItems(defaultItems);
      setCategories(["الكل", "تسويق", "نمو", "إدارة", "استشارات"]);
    }
    setIsLoading(false);
  };

  const filteredItems = activeCategory === "الكل"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <span className="text-primary font-medium mb-4 block">أعمالنا</span>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              معرض الأعمال الناجحة
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              نماذج حقيقية من حملات ومشاريع ناجحة نفذناها لعملائنا
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:border-primary/50"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {isLoading ? (
            <p className="text-center text-muted-foreground py-8">جاري التحميل...</p>
          ) : (
            /* Portfolio Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} variant="service" className="overflow-hidden group">
                  {/* Visual Header */}
                  <div className={cn("h-48 bg-gradient-to-br relative", item.gradient)}>
                    <div className="absolute inset-0 bg-hero-pattern opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <TrendingUp className="w-12 h-12 text-foreground/80 mx-auto mb-2" />
                        <span className="text-sm font-medium text-foreground/60">{item.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Users className="w-3 h-3 text-primary" />
                          <span className="font-bold text-sm">{item.followers}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">متابعين</span>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <TrendingUp className="w-3 h-3 text-primary" />
                          <span className="font-bold text-sm">{item.engagement}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">تفاعل</span>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Eye className="w-3 h-3 text-primary" />
                          <span className="font-bold text-sm">{item.reach}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">وصول</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && filteredItems.length === 0 && (
            <p className="text-center text-muted-foreground py-8">لا توجد أعمال في هذا التصنيف</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;