import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Save, X, Shield, Clock, HeadphonesIcon, Award, Zap, Users, Star, Heart, Rocket, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
  is_active: boolean;
}

const iconOptions = [
  { name: "Shield", icon: Shield, label: "درع" },
  { name: "Clock", icon: Clock, label: "ساعة" },
  { name: "HeadphonesIcon", icon: HeadphonesIcon, label: "سماعات" },
  { name: "Award", icon: Award, label: "جائزة" },
  { name: "Zap", icon: Zap, label: "برق" },
  { name: "Users", icon: Users, label: "مستخدمين" },
  { name: "Star", icon: Star, label: "نجمة" },
  { name: "Heart", icon: Heart, label: "قلب" },
  { name: "Rocket", icon: Rocket, label: "صاروخ" },
  { name: "Target", icon: Target, label: "هدف" },
];

export function FeaturesManager() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingFeature, setEditingFeature] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    icon: "Zap",
    title: "",
    description: "",
    sort_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    const { data, error } = await supabase
      .from("features")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast({ title: "خطأ في جلب البيانات", variant: "destructive" });
    } else {
      setFeatures(data || []);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description) {
      toast({ title: "يرجى ملء جميع الحقول المطلوبة", variant: "destructive" });
      return;
    }

    if (editingFeature) {
      const { error } = await supabase
        .from("features")
        .update(formData)
        .eq("id", editingFeature);

      if (error) {
        toast({ title: "خطأ في التحديث", variant: "destructive" });
      } else {
        toast({ title: "تم التحديث بنجاح" });
        fetchFeatures();
        handleCancel();
      }
    } else {
      const { error } = await supabase.from("features").insert([formData]);

      if (error) {
        toast({ title: "خطأ في الإضافة", variant: "destructive" });
      } else {
        toast({ title: "تمت الإضافة بنجاح" });
        fetchFeatures();
        handleCancel();
      }
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("features").delete().eq("id", id);

    if (error) {
      toast({ title: "خطأ في الحذف", variant: "destructive" });
    } else {
      toast({ title: "تم الحذف بنجاح" });
      fetchFeatures();
    }
  };

  const handleEdit = (feature: Feature) => {
    setEditingFeature(feature.id);
    setFormData({
      icon: feature.icon,
      title: feature.title,
      description: feature.description,
      sort_order: feature.sort_order,
      is_active: feature.is_active,
    });
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingFeature(null);
    setFormData({
      icon: "Zap",
      title: "",
      description: "",
      sort_order: features.length,
      is_active: true,
    });
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingFeature(null);
  };

  const toggleActive = async (id: string, currentState: boolean) => {
    const { error } = await supabase
      .from("features")
      .update({ is_active: !currentState })
      .eq("id", id);

    if (error) {
      toast({ title: "خطأ في التحديث", variant: "destructive" });
    } else {
      fetchFeatures();
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(opt => opt.name === iconName);
    return iconOption ? iconOption.icon : Zap;
  };

  if (isLoading) {
    return <p className="text-center text-muted-foreground py-8">جاري التحميل...</p>;
  }

  return (
    <div className="space-y-6">
      {(isAddingNew || editingFeature) && (
        <Card variant="glass">
          <CardHeader>
            <CardTitle>{editingFeature ? "تعديل ميزة" : "إضافة ميزة جديدة"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>العنوان</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="عنوان الميزة"
                />
              </div>
              <div>
                <Label>الأيقونة</Label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full bg-card border border-border rounded-md px-3 py-2"
                >
                  {iconOptions.map((opt) => (
                    <option key={opt.name} value={opt.name}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label>الوصف</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="وصف الميزة"
              />
            </div>

            <div>
              <Label>الترتيب</Label>
              <Input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
              />
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
          <CardTitle>لماذا تختارنا</CardTitle>
          {!isAddingNew && !editingFeature && (
            <Button onClick={handleAddNew} size="sm">
              <Plus className="w-4 h-4" />
              إضافة ميزة
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {features.map((feature) => {
              const IconComponent = getIconComponent(feature.icon);
              return (
                <div
                  key={feature.id}
                  className={cn(
                    "p-4 rounded-lg border border-border/50 bg-card/50 flex items-center gap-4",
                    !feature.is_active && "opacity-50"
                  )}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={feature.is_active}
                      onCheckedChange={() => toggleActive(feature.id, feature.is_active)}
                    />
                    <Button size="icon" variant="ghost" onClick={() => handleEdit(feature)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(feature.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
            {features.length === 0 && (
              <p className="text-center text-muted-foreground py-8">لا توجد ميزات - سيتم عرض الميزات الافتراضية</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}