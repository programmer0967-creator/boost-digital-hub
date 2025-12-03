import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Image, 
  BarChart3, 
  Settings,
  Menu,
  X,
  Flame,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "لوحة التحكم", href: "/admin", active: true },
  { icon: ShoppingBag, label: "الطلبات", href: "/admin/orders" },
  { icon: Package, label: "الخدمات", href: "/admin/services" },
  { icon: Image, label: "معرض الأعمال", href: "/admin/portfolio" },
  { icon: BarChart3, label: "التقارير", href: "/admin/reports" },
  { icon: Settings, label: "الإعدادات", href: "/admin/settings" },
];

const recentOrders = [
  { id: "#1234", customer: "أحمد محمد", service: "زيادة متابعين", status: "قيد التنفيذ", amount: "350 ر.س" },
  { id: "#1233", customer: "سارة العلي", service: "إدارة حسابات", status: "مكتمل", amount: "1,500 ر.س" },
  { id: "#1232", customer: "خالد الرشيدي", service: "استشارة", status: "جديد", amount: "200 ر.س" },
  { id: "#1231", customer: "نورة السعيد", service: "رشق تفاعل", status: "قيد التنفيذ", amount: "250 ر.س" },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { label: "إجمالي الطلبات", value: "156", icon: ShoppingBag, change: "+12%", color: "text-blue-500" },
    { label: "العملاء النشطين", value: "89", icon: Users, change: "+8%", color: "text-green-500" },
    { label: "الإيرادات الشهرية", value: "12,450 ر.س", icon: DollarSign, change: "+23%", color: "text-primary" },
    { label: "طلبات قيد التنفيذ", value: "24", icon: Clock, change: "-5%", color: "text-amber-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 right-0 h-full w-64 bg-card border-l border-border z-50 transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
      )}>
        <div className="p-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Flame className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">لوحة التحكم</span>
          </Link>

          {/* Navigation */}
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  item.active 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-card-hover"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Back to Site */}
        <div className="absolute bottom-6 left-6 right-6">
          <Link to="/">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4" />
              العودة للموقع
            </Button>
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar Toggle */}
      <button 
        className="fixed top-4 right-4 z-50 md:hidden p-2 bg-card rounded-lg border border-border"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="md:mr-64 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-black mb-2">مرحباً، معين 👋</h1>
            <p className="text-muted-foreground">إليك ملخص أداء متجرك اليوم</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
                  <div className="flex items-center gap-1 mt-3">
                    <TrendingUp className={cn("w-4 h-4", stat.change.startsWith("+") ? "text-green-500" : "text-red-500")} />
                    <span className={cn("text-sm font-medium", stat.change.startsWith("+") ? "text-green-500" : "text-red-500")}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-muted-foreground">من الشهر الماضي</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Orders */}
          <Card variant="glass">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>آخر الطلبات</CardTitle>
                <Button variant="ghost" size="sm">عرض الكل</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">رقم الطلب</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">العميل</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">الخدمة</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">الحالة</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">المبلغ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-border/50 hover:bg-card/50">
                        <td className="py-4 px-4 font-medium">{order.id}</td>
                        <td className="py-4 px-4">{order.customer}</td>
                        <td className="py-4 px-4 text-muted-foreground">{order.service}</td>
                        <td className="py-4 px-4">
                          <span className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            order.status === "مكتمل" && "bg-green-500/20 text-green-500",
                            order.status === "قيد التنفيذ" && "bg-amber-500/20 text-amber-500",
                            order.status === "جديد" && "bg-blue-500/20 text-blue-500"
                          )}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-bold">{order.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
