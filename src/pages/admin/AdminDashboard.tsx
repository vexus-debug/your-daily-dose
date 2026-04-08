import { useEffect, useState } from "react";
import { getPageVisitors } from "@/lib/supabase-content";
import { Users, Eye, Globe, Clock, Monitor, Smartphone, Tablet, MapPin, ArrowUpRight, TrendingUp, Loader2 } from "lucide-react";

const AdminDashboard = () => {
  const [visitors, setVisitors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPageVisitors().then((data) => {
      setVisitors(data);
      setLoading(false);
    });
  }, []);

  const pageViews: Record<string, number> = {};
  const referrerCounts: Record<string, number> = {};
  const deviceCounts: Record<string, number> = {};
  const countryCounts: Record<string, number> = {};

  visitors.forEach((v) => {
    pageViews[v.page] = (pageViews[v.page] || 0) + 1;
    referrerCounts[v.referrer] = (referrerCounts[v.referrer] || 0) + 1;
    deviceCounts[v.device] = (deviceCounts[v.device] || 0) + 1;
    countryCounts[v.country] = (countryCounts[v.country] || 0) + 1;
  });

  const timeAgo = (dateStr: string) => {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const DeviceIcon = ({ device }: { device: string }) => {
    if (device === "Mobile") return <Smartphone size={14} />;
    if (device === "Tablet") return <Tablet size={14} />;
    return <Monitor size={14} />;
  };

  const pageLabels: Record<string, string> = {
    "/": "Home",
    "/about": "About",
    "/eye-clinic": "Eye Clinic",
    "/blog": "Blog",
    "/donate": "Donate",
    "/contact": "Contact",
    "/gallery": "Gallery",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-secondary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Recent website activity overview</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: "Total Visitors", value: visitors.length, icon: Users, color: "bg-primary" },
          { label: "Pages Viewed", value: Object.keys(pageViews).length, icon: Eye, color: "bg-secondary" },
          { label: "Referrers", value: Object.keys(referrerCounts).length, icon: Globe, color: "bg-accent" },
          { label: "Countries", value: Object.keys(countryCounts).length, icon: MapPin, color: "bg-primary" },
        ].map((s, i) => (
          <div key={i} className="p-4 md:p-5 rounded-2xl bg-card border border-border">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
              <s.icon size={18} className="text-primary-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <Clock size={16} className="text-secondary" />
            <h3 className="font-heading text-sm font-bold text-foreground">Recent Visitors</h3>
          </div>
          <div className="divide-y divide-border max-h-[400px] overflow-y-auto">
            {visitors.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No visitors yet. Data will appear as people visit your site.
              </div>
            ) : (
              visitors.map((v) => (
                <div key={v.id} className="px-4 py-3 flex items-center gap-3 hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <DeviceIcon device={v.device} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground truncate">{pageLabels[v.page] || v.page}</span>
                      <span className="text-[10px] text-muted-foreground">{timeAgo(v.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <ArrowUpRight size={10} /> {v.referrer}
                      </span>
                      <span className="text-xs text-muted-foreground">• {v.country}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-card border border-border overflow-hidden">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <TrendingUp size={16} className="text-secondary" />
              <h3 className="font-heading text-sm font-bold text-foreground">Top Pages</h3>
            </div>
            <div className="p-4 space-y-3">
              {Object.entries(pageViews)
                .sort(([, a], [, b]) => b - a)
                .map(([page, count]) => (
                  <div key={page} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{pageLabels[page] || page}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-secondary"
                          style={{ width: `${(count / visitors.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-6 text-right">{count}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="rounded-2xl bg-card border border-border overflow-hidden">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <Globe size={16} className="text-secondary" />
              <h3 className="font-heading text-sm font-bold text-foreground">Top Referrers</h3>
            </div>
            <div className="p-4 space-y-3">
              {Object.entries(referrerCounts)
                .sort(([, a], [, b]) => b - a)
                .map(([ref, count]) => (
                  <div key={ref} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{ref}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{count}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="rounded-2xl bg-card border border-border overflow-hidden">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <Monitor size={16} className="text-secondary" />
              <h3 className="font-heading text-sm font-bold text-foreground">Devices</h3>
            </div>
            <div className="p-4 flex gap-3">
              {Object.entries(deviceCounts).map(([device, count]) => (
                <div key={device} className="flex-1 text-center p-3 rounded-xl bg-muted">
                  <div className="flex justify-center mb-1">
                    <DeviceIcon device={device} />
                  </div>
                  <p className="text-lg font-bold text-foreground">{count}</p>
                  <p className="text-[10px] text-muted-foreground">{device}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
