-- Create services table for admin management
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Zap',
  features TEXT[] NOT NULL DEFAULT '{}',
  price TEXT NOT NULL,
  popular BOOLEAN DEFAULT false,
  category TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Anyone can view active services
CREATE POLICY "Anyone can view active services" 
ON public.services 
FOR SELECT 
USING (is_active = true);

-- Admins can view all services
CREATE POLICY "Admins can view all services" 
ON public.services 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can insert services
CREATE POLICY "Admins can insert services" 
ON public.services 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update services
CREATE POLICY "Admins can update services" 
ON public.services 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete services
CREATE POLICY "Admins can delete services" 
ON public.services 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default services
INSERT INTO public.services (title, description, icon, features, price, popular, category) VALUES
('بيع وشراء العملات الرقمية', 'خدمات شراء وبيع العملات الرقمية لأي منصة بأسعار تنافسية وأمان تام', 'CreditCard', ARRAY['تحويل فوري وآمن', 'دعم جميع المنصات الرئيسية', 'أسعار تنافسية', 'سرية تامة'], 'حسب الكمية', false, 'مالية'),
('التسويق وإدارة الحسابات', 'إدارة احترافية لحسابات انستجرام وفيسبوك مع استراتيجيات تسويق فعالة', 'TrendingUp', ARRAY['إدارة المحتوى اليومي', 'جدولة المنشورات', 'تحليل الأداء', 'زيادة التفاعل'], 'باقات شهرية', true, 'تسويق'),
('متابعين عرب حقيقيين', 'زيادة متابعين حقيقيين من الدول العربية لحسابات انستجرام وفيسبوك', 'Users', ARRAY['متابعين عرب حقيقيين', 'ضمان عدم النقصان', 'تسليم تدريجي طبيعي', 'دعم مستمر'], 'حسب العدد', true, 'نمو'),
('يوزرات انستجرام مميزة', 'أسماء مستخدم حصرية ومميزة لحساب انستجرام الخاص بك', 'AtSign', ARRAY['يوزرات قصيرة ونادرة', 'نقل ملكية آمن', 'دعم فني كامل', 'ضمان الملكية'], 'حسب الجودة', false, 'حسابات'),
('بيع حسابات جاهزة', 'حسابات سوشيال ميديا متفاعلة وجاهزة للاستخدام الفوري', 'Instagram', ARRAY['حسابات موثقة', 'جمهور حقيقي متفاعل', 'تاريخ نظيف', 'نقل ملكية آمن'], 'حسب القوة', false, 'حسابات'),
('نصائح صناع المحتوى', 'استشارات متخصصة لصناع المحتوى لتطوير قنواتهم وزيادة أرباحهم', 'Lightbulb', ARRAY['جلسات استشارية خاصة', 'خطة محتوى مخصصة', 'نصائح النمو السريع', 'استراتيجيات الربح'], 'جلسات', false, 'استشارات'),
('رشق الحسابات', 'زيادة التفاعل والمشاهدات والإعجابات على منشوراتك', 'Zap', ARRAY['زيادة المشاهدات', 'رفع التفاعل', 'تعليقات حقيقية', 'مشاركات فعلية'], 'حسب الكمية', false, 'نمو'),
('اشتراكات نتفلكس وشاهد', 'اشتراكات بأسعار مخفضة لمنصات البث نتفلكس وشاهد VIP', 'Tv', ARRAY['أسعار تنافسية', 'حسابات خاصة', 'ضمان الاشتراك', 'دعم فني'], 'شهري/سنوي', false, 'اشتراكات');