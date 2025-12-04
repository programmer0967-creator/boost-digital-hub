import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  X, 
  Save,
  Users, 
  TrendingUp, 
  Instagram, 
  CreditCard, 
  Lightbulb, 
  Zap,
  Tv,
  AtSign
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price: string;
  popular: boolean;
  category: string;
  is_active: boolean;
}

const iconOptions = [
  { value: "Users", label: "مستخدمين", icon: Users },
  { value: "TrendingUp", label: "نمو", icon: TrendingUp },
  { value: "Instagram", label: "انستجرام", icon: Instagram },
  { value: "CreditCard", label: "مالية", icon: CreditCard },
  { value: "Lightbulb", label: "فكرة", icon: Lightbulb },
  { value: "Zap", label: "سرعة", icon: Zap },
  { value: "Tv", label: "تلفزيون", icon: Tv },
  { value: "AtSign", label: "يوزر", icon: AtSign },
];

const categoryOptions = ["تسويق", "نمو", "حسابات", "استشارات", "مالية", "اشتراكات"];

export function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newFeature, setNewFeature] = useState("");

  const emptyService: Omit<Service, "id"> = {
    title: "",
    description: "",
    icon: "Zap",
    features: [],
    price: "",
    popular: false,
    category: "نمو",
    is_active: true,
  };

  const [formData, setFormData] = useState<Omit<Service, "id">>(emptyService);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      toast({ title: "حدث خطأ في تحميل الخدمات", variant: "destructive" });
    } else {
      setServices(data || []);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description || !formData.price) {
      toast({ title: "يرجى ملء جميع الحقول المطلوبة", variant: "destructive" });
      return;
    }

    if (editingService) {
      const { error } = await supabase
        .from("services")
        .update(formData)
        .eq("id", editingService.id);

      if (error) {
        toast({ title: "حدث خطأ في تحديث الخدمة", variant: "destructive" });
      } else {
        toast({ title: "تم تحديث الخدمة بنجاح" });
        setEditingService(null);
        fetchServices();
      }
    } else {
      const { error } = await supabase.from("services").insert([formData]);

      if (error) {
        toast({ title: "حدث خطأ في إضافة الخدمة", variant: "destructive" });
      } else {
        toast({ title: "تم إضافة الخدمة بنجاح" });
        setIsAddingNew(false);
        fetchServices();
      }
    }

    setFormData(emptyService);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("services").delete().eq("id", id);

    if (error) {
      toast({ title: "حدث خطأ في حذف الخدمة", variant: "destructive" });
    } else {
      toast({ title: "تم حذف الخدمة بنجاح" });
      fetchServices();
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      features: service.features,
      price: service.price,
      popular: service.popular,
      category: service.category,
      is_active: service.is_active,
    });
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingService(null);
    setFormData(emptyService);
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingService(null);
    setFormData(emptyService);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const toggleActive = async (id: string, currentActive: boolean) => {
    const { error } = await supabase
      .from("services")
      .update({ is_active: !currentActive })
      .eq("id", id);

    if (error) {
      toast({ title: "حدث خطأ", variant: "destructive" });
    } else {
      fetchServices();
    }
  };

  const getIconComponent = (iconName: string) => {
    const found = iconOptions.find((opt) => opt.value === iconName);
    return found ? found.icon : Zap;
  };

  if (isLoading) {
    return <p className="text-center text-muted-foreground py-8">جاري التحميل...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      {(isAddingNew || editingService) && (
        <Card variant="glass">
          <CardHeader>
            <CardTitle>{editingService ? "تعديل الخدمة" : "إضافة خدمة جديدة"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>عنوان الخدمة *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="مثال: إدارة الحسابات"
                />
              </div>
              <div className="space-y-2">
                <Label>السعر *</Label>
                <Input
                  value={formData.price}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                  placeholder="مثال: 100$"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>الوصف *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="وصف مختصر للخدمة..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>الأيقونة</Label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData((prev) => ({ ...prev, icon: e.target.value }))}
                  className="w-full bg-card border border-border rounded-lg px-3 py-2"
                >
                  {iconOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>الفئة</Label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-card border border-border rounded-lg px-3 py-2"
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>المميزات</Label>
              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="أضف ميزة..."
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                />
                <Button type="button" onClick={addFeature} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.features.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {feature}
                    <button onClick={() => removeFeature(index)} className="hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.popular}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, popular: checked }))}
                />
                <Label>خدمة مميزة</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_active: checked }))}
                />
                <Label>نشط</Label>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={handleCancel}>
                إلغاء
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 ml-2" />
                حفظ
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Services List */}
      <Card variant="glass">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>الخدمات ({services.length})</CardTitle>
          {!isAddingNew && !editingService && (
            <Button onClick={handleAddNew}>
              <Plus className="w-4 h-4 ml-2" />
              إضافة خدمة
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {services.map((service) => {
              const IconComponent = getIconComponent(service.icon);
              return (
                <div
                  key={service.id}
                  className={`p-4 rounded-lg border transition-all ${
                    service.is_active
                      ? "bg-card/50 border-border/50"
                      : "bg-muted/20 border-border/30 opacity-60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold">{service.title}</h4>
                          {service.popular && (
                            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                              مميز
                            </span>
                          )}
                          {!service.is_active && (
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                              غير نشط
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="bg-card px-2 py-0.5 rounded">{service.category}</span>
                          <span>{service.price}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleActive(service.id, service.is_active)}
                        title={service.is_active ? "إلغاء التنشيط" : "تنشيط"}
                      >
                        <Switch checked={service.is_active} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(service.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            {services.length === 0 && (
              <p className="text-center text-muted-foreground py-8">لا توجد خدمات حتى الآن</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
