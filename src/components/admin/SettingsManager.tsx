import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, User, Key, Globe, Palette, Mail, Phone, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface SiteSetting {
  id: string;
  key: string;
  value: string;
}

export function SettingsManager() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();
  
  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*");

    if (error) {
      toast({ title: "خطأ في جلب الإعدادات", variant: "destructive" });
    } else {
      const settingsMap: Record<string, string> = {};
      data?.forEach((setting: SiteSetting) => {
        settingsMap[setting.key] = setting.value;
      });
      setSettings(settingsMap);
    }
    setIsLoading(false);
  };

  const saveSetting = async (key: string, value: string) => {
    setIsSaving(true);
    
    // Check if setting exists
    const { data: existing } = await supabase
      .from("site_settings")
      .select("id")
      .eq("key", key)
      .single();

    if (existing) {
      const { error } = await supabase
        .from("site_settings")
        .update({ value })
        .eq("key", key);

      if (error) {
        toast({ title: "خطأ في حفظ الإعداد", variant: "destructive" });
      } else {
        toast({ title: "تم حفظ الإعداد بنجاح" });
      }
    } else {
      const { error } = await supabase
        .from("site_settings")
        .insert([{ key, value }]);

      if (error) {
        toast({ title: "خطأ في حفظ الإعداد", variant: "destructive" });
      } else {
        toast({ title: "تم حفظ الإعداد بنجاح" });
      }
    }
    
    setIsSaving(false);
  };

  const saveAllSettings = async () => {
    setIsSaving(true);
    
    for (const [key, value] of Object.entries(settings)) {
      await saveSetting(key, value);
    }
    
    setIsSaving(false);
    toast({ title: "تم حفظ جميع الإعدادات" });
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast({ title: "كلمات المرور غير متطابقة", variant: "destructive" });
      return;
    }

    if (newPassword.length < 6) {
      toast({ title: "كلمة المرور يجب أن تكون 6 أحرف على الأقل", variant: "destructive" });
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      toast({ title: "خطأ في تغيير كلمة المرور", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "تم تغيير كلمة المرور بنجاح" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  if (isLoading) {
    return <p className="text-center text-muted-foreground py-8">جاري التحميل...</p>;
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            الحساب
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            التواصل
          </TabsTrigger>
          <TabsTrigger value="site" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            الموقع
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <div className="space-y-6">
            {/* User Info */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  معلومات الحساب
                </CardTitle>
                <CardDescription>
                  معلومات حسابك الأساسية
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>البريد الإلكتروني</Label>
                  <Input value={user?.email || ""} disabled className="bg-muted" />
                </div>
              </CardContent>
            </Card>

            {/* Password Change */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  تغيير كلمة المرور
                </CardTitle>
                <CardDescription>
                  قم بتغيير كلمة المرور الخاصة بك
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>كلمة المرور الجديدة</Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور الجديدة"
                  />
                </div>
                <div>
                  <Label>تأكيد كلمة المرور</Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="أعد إدخال كلمة المرور"
                  />
                </div>
                <Button onClick={handlePasswordChange} disabled={!newPassword || !confirmPassword}>
                  <Key className="w-4 h-4" />
                  تغيير كلمة المرور
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contact">
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                معلومات التواصل
              </CardTitle>
              <CardDescription>
                تحديث معلومات التواصل التي تظهر في الموقع
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  رقم الواتساب
                </Label>
                <Input
                  value={settings.whatsapp_number || ""}
                  onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                  placeholder="مثال: 967737514726"
                  dir="ltr"
                />
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  اسم حساب انستجرام
                </Label>
                <Input
                  value={settings.instagram_username || ""}
                  onChange={(e) => setSettings({ ...settings, instagram_username: e.target.value })}
                  placeholder="مثال: x.gc"
                  dir="ltr"
                />
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  البريد الإلكتروني للتواصل
                </Label>
                <Input
                  value={settings.contact_email || ""}
                  onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                  placeholder="مثال: info@example.com"
                  dir="ltr"
                />
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  رقم الهاتف
                </Label>
                <Input
                  value={settings.phone_number || ""}
                  onChange={(e) => setSettings({ ...settings, phone_number: e.target.value })}
                  placeholder="مثال: +967737514726"
                  dir="ltr"
                />
              </div>
              <Button onClick={saveAllSettings} disabled={isSaving}>
                <Save className="w-4 h-4" />
                {isSaving ? "جاري الحفظ..." : "حفظ الإعدادات"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="site">
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                إعدادات الموقع
              </CardTitle>
              <CardDescription>
                إعدادات عامة للموقع
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>اسم الموقع</Label>
                <Input
                  value={settings.site_name || ""}
                  onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                  placeholder="معين العزب"
                />
              </div>
              <div>
                <Label>وصف الموقع</Label>
                <Input
                  value={settings.site_description || ""}
                  onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                  placeholder="خدمات السوشيال ميديا المتكاملة"
                />
              </div>
              <div>
                <Label>رابط الكانونيكال</Label>
                <Input
                  value={settings.canonical_url || ""}
                  onChange={(e) => setSettings({ ...settings, canonical_url: e.target.value })}
                  placeholder="https://moeenalazab.com"
                  dir="ltr"
                />
              </div>
              <Button onClick={saveAllSettings} disabled={isSaving}>
                <Save className="w-4 h-4" />
                {isSaving ? "جاري الحفظ..." : "حفظ الإعدادات"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}