import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Star,
  Menu,
  X,
  Flame,
  Clock,
  ArrowLeft,
  LogOut,
  CheckCircle,
  XCircle,
  Package,
  Image,
  Award,
  Settings,
  BarChart3,
  TrendingUp
} from "lucide-react";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { PortfolioManager } from "@/components/admin/PortfolioManager";
import { FeaturesManager } from "@/components/admin/FeaturesManager";
import { SettingsManager } from "@/components/admin/SettingsManager";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const statusLabels: Record<string, string> = {
  new: "جديد",
  analyzing: "تحليل",
  confirmed: "مؤكد",
  in_progress: "قيد التنفيذ",
  monitoring: "متابعة",
  completed: "مكتمل",
};

const statusColors: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-500",
  analyzing: "bg-purple-500/20 text-purple-500",
  confirmed: "bg-cyan-500/20 text-cyan-500",
  in_progress: "bg-amber-500/20 text-amber-500",
  monitoring: "bg-orange-500/20 text-orange-500",
  completed: "bg-green-500/20 text-green-500",
};

interface ServiceRequest {
  id: string;
  name: string;
  service_type: string;
  status: string;
  created_at: string;
}

interface Rating {
  id: string;
  name: string;
  rating: number;
  comment: string | null;
  service_type: string;
  is_approved: boolean;
  created_at: string;
}

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"orders" | "ratings" | "services" | "portfolio" | "features" | "settings" | "stats">("orders");
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [portfolioCount, setPortfolioCount] = useState(0);
  const [featuresCount, setFeaturesCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin]);

  const fetchData = async () => {
    setIsLoading(true);
    
    const [requestsRes, ratingsRes, portfolioRes, featuresRes, servicesRes] = await Promise.all([
      supabase.from("service_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("ratings").select("*").order("created_at", { ascending: false }),
      supabase.from("portfolio_items").select("id", { count: "exact" }),
      supabase.from("features").select("id", { count: "exact" }),
      supabase.from("services").select("id", { count: "exact" }),
    ]);

    if (requestsRes.data) setRequests(requestsRes.data);
    if (ratingsRes.data) setRatings(ratingsRes.data);
    if (portfolioRes.count !== null) setPortfolioCount(portfolioRes.count);
    if (featuresRes.count !== null) setFeaturesCount(featuresRes.count);
    if (servicesRes.count !== null) setServicesCount(servicesRes.count);
    
    setIsLoading(false);
  };

  const updateRequestStatus = async (id: string, status: "new" | "analyzing" | "confirmed" | "in_progress" | "monitoring" | "completed") => {
    const { error } = await supabase
      .from("service_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast({ title: "حدث خطأ", variant: "destructive" });
    } else {
      toast({ title: "تم تحديث الحالة" });
      fetchData();
    }
  };

  const toggleRatingApproval = async (id: string, currentApproval: boolean) => {
    const { error } = await supabase
      .from("ratings")
      .update({ is_approved: !currentApproval })
      .eq("id", id);

    if (error) {
      toast({ title: "حدث خطأ", variant: "destructive" });
    } else {
      toast({ title: currentApproval ? "تم إلغاء الموافقة" : "تم الموافقة على التقييم" });
      fetchData();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Flame className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "إجمالي الطلبات", value: requests.length.toString(), icon: ShoppingBag, color: "text-blue-500" },
    { label: "طلبات جديدة", value: requests.filter(r => r.status === "new").length.toString(), icon: Clock, color: "text-amber-500" },
    { label: "طلبات مكتملة", value: requests.filter(r => r.status === "completed").length.toString(), icon: CheckCircle, color: "text-green-500" },
    { label: "التقييمات", value: ratings.length.toString(), icon: Star, color: "text-primary" },
    { label: "الخدمات", value: servicesCount.toString(), icon: Package, color: "text-cyan-500" },
    { label: "معرض الأعمال", value: portfolioCount.toString(), icon: Image, color: "text-violet-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 right-0 h-full w-64 bg-card border-l border-border z-50 transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
      )}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Flame className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">لوحة التحكم</span>
          </Link>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("orders")}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full",
                activeTab === "orders" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-card-hover"
              )}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="font-medium">الطلبات</span>
            </button>
            <button
              onClick={() => setActiveTab("ratings")}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full",
                activeTab === "ratings" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-card-hover"
              )}
            >
              <Star className="w-5 h-5" />
              <span className="font-medium">التقييمات</span>
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full",
                activeTab === "services" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-card-hover"
              )}
            >
              <Package className="w-5 h-5" />
              <span className="font-medium">الخدمات</span>
            </button>
            <button
              onClick={() => setActiveTab("portfolio")}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full",
                activeTab === "portfolio" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-card-hover"
              )}
            >
              <Image className="w-5 h-5" />
              <span className="font-medium">معرض الأعمال</span>
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full",
                activeTab === "features" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-card-hover"
              )}
            >
              <Award className="w-5 h-5" />
              <span className="font-medium">لماذا تختارنا</span>
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full",
                activeTab === "stats" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-card-hover"
              )}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">الإحصائيات</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full",
                activeTab === "settings" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-card-hover"
              )}
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">الإعدادات</span>
            </button>
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <Link to="/">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4" />
              العودة للموقع
            </Button>
          </Link>
          <Button variant="ghost" className="w-full text-destructive" onClick={handleSignOut}>
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar Toggle */}
      <button 
        className="fixed top-4 right-4 z-50 md:hidden p-2 bg-card rounded-lg border border-border"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="md:mr-64 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-black mb-2">مرحباً، معين 👋</h1>
            <p className="text-muted-foreground">إليك ملخص أداء متجرك</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} variant="glass">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-2xl font-black">{stat.value}</p>
                    </div>
                    <div className={cn("w-10 h-10 rounded-lg bg-card flex items-center justify-center", stat.color)}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {activeTab === "orders" && (
            <Card variant="glass">
              <CardHeader>
                <CardTitle>الطلبات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">العميل</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">الخدمة</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">الحالة</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">التاريخ</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">إجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((request) => (
                        <tr key={request.id} className="border-b border-border/50 hover:bg-card/50">
                          <td className="py-4 px-4 font-medium">{request.name}</td>
                          <td className="py-4 px-4 text-muted-foreground">{request.service_type}</td>
                          <td className="py-4 px-4">
                            <span className={cn("px-2 py-1 rounded-full text-xs font-medium", statusColors[request.status])}>
                              {statusLabels[request.status]}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-muted-foreground text-sm">
                            {new Date(request.created_at).toLocaleDateString("ar-SA")}
                          </td>
                          <td className="py-4 px-4">
                            <select
                              value={request.status}
                              onChange={(e) => updateRequestStatus(request.id, e.target.value as "new" | "analyzing" | "confirmed" | "in_progress" | "monitoring" | "completed")}
                              className="bg-card border border-border rounded px-2 py-1 text-sm"
                            >
                              {Object.entries(statusLabels).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {requests.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">لا توجد طلبات حتى الآن</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "ratings" && (
            <Card variant="glass">
              <CardHeader>
                <CardTitle>التقييمات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ratings.map((rating) => (
                    <div key={rating.id} className="p-4 bg-card/50 rounded-lg border border-border/50">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold">{rating.name}</span>
                            <div className="flex gap-0.5">
                              {Array.from({ length: rating.rating }).map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{rating.service_type}</p>
                          {rating.comment && <p className="text-foreground/80">{rating.comment}</p>}
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(rating.created_at).toLocaleDateString("ar-SA")}
                          </p>
                        </div>
                        <Button
                          variant={rating.is_approved ? "outline" : "hero"}
                          size="sm"
                          onClick={() => toggleRatingApproval(rating.id, rating.is_approved)}
                        >
                          {rating.is_approved ? (
                            <>
                              <XCircle className="w-4 h-4" />
                              إلغاء
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              موافقة
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                  {ratings.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">لا توجد تقييمات حتى الآن</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "services" && <ServicesManager />}

          {activeTab === "portfolio" && <PortfolioManager />}

          {activeTab === "features" && <FeaturesManager />}

          {activeTab === "settings" && <SettingsManager />}

          {activeTab === "stats" && (
            <div className="space-y-6">
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    إحصائيات عامة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">إجمالي الطلبات</p>
                          <p className="text-3xl font-black">{requests.length}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-green-500">{requests.filter(r => r.status === "completed").length} مكتملة</span>
                      </div>
                    </div>

                    <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                          <Star className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">التقييمات</p>
                          <p className="text-3xl font-black">{ratings.length}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-green-500">{ratings.filter(r => r.is_approved).length} موافق عليها</span>
                      </div>
                    </div>

                    <div className="p-6 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                          <Package className="w-6 h-6 text-violet-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">الخدمات النشطة</p>
                          <p className="text-3xl font-black">{servicesCount}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                          <Image className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">معرض الأعمال</p>
                          <p className="text-3xl font-black">{portfolioCount}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-xl bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/20">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center">
                          <Award className="w-6 h-6 text-rose-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">المميزات</p>
                          <p className="text-3xl font-black">{featuresCount}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                          <Clock className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">طلبات قيد الانتظار</p>
                          <p className="text-3xl font-black">{requests.filter(r => r.status === "new" || r.status === "analyzing").length}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status Distribution */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle>توزيع حالات الطلبات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {Object.entries(statusLabels).map(([status, label]) => {
                      const count = requests.filter(r => r.status === status).length;
                      return (
                        <div key={status} className="text-center p-4 rounded-lg bg-card/50 border border-border/50">
                          <p className="text-2xl font-bold mb-1">{count}</p>
                          <p className={cn("text-xs px-2 py-1 rounded-full inline-block", statusColors[status])}>
                            {label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
