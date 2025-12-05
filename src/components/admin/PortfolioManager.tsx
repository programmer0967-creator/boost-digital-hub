import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Save, X, TrendingUp, Users, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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

const categoryOptions = ["تسويق", "نمو", "إدارة", "استشارات"];
const gradientOptions = [
  { label: "برتقالي", value: "from-primary/30 to-accent/30" },
  { label: "أخضر", value: "from-emerald-500/30 to-teal-500/30" },
  { label: "بنفسجي", value: "from-violet-500/30 to-purple-500/30" },
  { label: "أصفر", value: "from-amber-500/30 to-orange-500/30" },
  { label: "وردي", value: "from-rose-500/30 to-pink-500/30" },
  { label: "أزرق", value: "from-cyan-500/30 to-blue-500/30" },
];

export function PortfolioManager() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "تسويق",
    description: "",
    followers: "",
    engagement: "",
    reach: "",
    gradient: "from-primary/30 to-accent/30",
    is_active: true,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "خطأ في جلب البيانات", variant: "destructive" });
    } else {
      setItems(data || []);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description) {
      toast({ title: "يرجى ملء جميع الحقول المطلوبة", variant: "destructive" });
      return;
    }

    if (editingItem) {
      const { error } = await supabase
        .from("portfolio_items")
        .update(formData)
        .eq("id", editingItem);

      if (error) {
        toast({ title: "خطأ في التحديث", variant: "destructive" });
      } else {
        toast({ title: "تم التحديث بنجاح" });
        fetchItems();
        handleCancel();
      }
    } else {
      const { error } = await supabase.from("portfolio_items").insert([formData]);

      if (error) {
        toast({ title: "خطأ في الإضافة", variant: "destructive" });
      } else {
        toast({ title: "تمت الإضافة بنجاح" });
        fetchItems();
        handleCancel();
      }
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("portfolio_items").delete().eq("id", id);

    if (error) {
      toast({ title: "خطأ في الحذف", variant: "destructive" });
    } else {
      toast({ title: "تم الحذف بنجاح" });
      fetchItems();
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      followers: item.followers,
      engagement: item.engagement,
      reach: item.reach,
      gradient: item.gradient,
      is_active: item.is_active,
    });
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingItem(null);
    setFormData({
      title: "",
      category: "تسويق",
      description: "",
      followers: "",
      engagement: "",
      reach: "",
      gradient: "from-primary/30 to-accent/30",
      is_active: true,
    });
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingItem(null);
  };

  const toggleActive = async (id: string, currentState: boolean) => {
    const { error } = await supabase
      .from("portfolio_items")
      .update({ is_active: !currentState })
      .eq("id", id);

    if (error) {
      toast({ title: "خطأ في التحديث", variant: "destructive" });
    } else {
      fetchItems();
    }
  };

  if (isLoading) {
    return <p className="text-center text-muted-foreground py-8">جاري التحميل...</p>;
  }

  return (
    <div className="space-y-6">
      {(isAddingNew || editingItem) && (
        <Card variant="glass">
          <CardHeader>
            <CardTitle>{editingItem ? "تعديل عمل" : "إضافة عمل جديد"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>العنوان</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="عنوان العمل"
                />
              </div>
              <div>
                <Label>التصنيف</Label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-card border border-border rounded-md px-3 py-2"
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label>الوصف</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="وصف العمل"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>المتابعين</Label>
                <Input
                  value={formData.followers}
                  onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                  placeholder="مثال: 50K+"
                />
              </div>
              <div>
                <Label>التفاعل</Label>
                <Input
                  value={formData.engagement}
                  onChange={(e) => setFormData({ ...formData, engagement: e.target.value })}
                  placeholder="مثال: 8%"
                />
              </div>
              <div>
                <Label>الوصول</Label>
                <Input
                  value={formData.reach}
                  onChange={(e) => setFormData({ ...formData, reach: e.target.value })}
                  placeholder="مثال: 500K"
                />
              </div>
            </div>

            <div>
              <Label>اللون</Label>
              <select
                value={formData.gradient}
                onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                className="w-full bg-card border border-border rounded-md px-3 py-2"
              >
                {gradientOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label>نشط</Label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave}>
                <Save className="w-4 h-4" />
                حفظ
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4" />
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card variant="glass">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>معرض الأعمال</CardTitle>
          {!isAddingNew && !editingItem && (
            <Button onClick={handleAddNew} size="sm">
              <Plus className="w-4 h-4" />
              إضافة عمل
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "p-4 rounded-lg border border-border/50 bg-card/50",
                  !item.is_active && "opacity-50"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold">{item.title}</h4>
                      <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    <div className="flex gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> {item.followers}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> {item.engagement}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {item.reach}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={item.is_active}
                      onCheckedChange={() => toggleActive(item.id, item.is_active)}
                    />
                    <Button size="icon" variant="ghost" onClick={() => handleEdit(item)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <p className="text-center text-muted-foreground py-8">لا توجد أعمال</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}