-- Portfolio items table
CREATE TABLE public.portfolio_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    category text NOT NULL,
    description text NOT NULL,
    followers text DEFAULT '',
    engagement text DEFAULT '',
    reach text DEFAULT '',
    gradient text DEFAULT 'from-primary/30 to-accent/30',
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Why choose us features table
CREATE TABLE public.features (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    icon text NOT NULL DEFAULT 'Zap',
    title text NOT NULL,
    description text NOT NULL,
    sort_order integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Site settings table for general settings
CREATE TABLE public.site_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    key text UNIQUE NOT NULL,
    value text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Portfolio RLS policies
CREATE POLICY "Anyone can view active portfolio items" ON public.portfolio_items FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all portfolio items" ON public.portfolio_items FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert portfolio items" ON public.portfolio_items FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update portfolio items" ON public.portfolio_items FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete portfolio items" ON public.portfolio_items FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Features RLS policies
CREATE POLICY "Anyone can view active features" ON public.features FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all features" ON public.features FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert features" ON public.features FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update features" ON public.features FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete features" ON public.features FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Site settings RLS policies
CREATE POLICY "Anyone can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can insert site settings" ON public.site_settings FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update site settings" ON public.site_settings FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete site settings" ON public.site_settings FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_portfolio_items_updated_at BEFORE UPDATE ON public.portfolio_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_features_updated_at BEFORE UPDATE ON public.features FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();