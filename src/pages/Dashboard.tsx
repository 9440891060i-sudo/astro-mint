import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, Heart, Crown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();

  const metrics = [
    {
      title: "Account Reached",
      subtitle: "Total views",
      value: "24,583",
      change: "+12.5%",
      icon: Eye,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      title: "Likes",
      subtitle: "Post engagements",
      value: "3,247",
      change: "+8.3%",
      icon: Heart,
      iconBg: "bg-pink-500/10",
      iconColor: "text-pink-500",
    },
    {
      title: "Crowns",
      subtitle: "Premium rewards",
      value: "156",
      change: "+15.2%",
      icon: Crown,
      iconBg: "bg-yellow-500/10",
      iconColor: "text-yellow-500",
    },
    {
      title: "Followers",
      subtitle: "Your community",
      value: "1,842",
      change: "+5.7%",
      icon: Users,
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center gap-4 px-4 py-3 max-w-2xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-muted/80"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Professional Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Overview Section */}
          <div className="space-y-3">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-foreground">Performance Overview</h2>
              <p className="text-sm text-muted-foreground">Track your account metrics and growth</p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className="bg-card rounded-xl border border-border/50 p-6 space-y-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Icon and Title */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        {metric.title}
                      </p>
                      <p className="text-xs text-muted-foreground/70">
                        {metric.subtitle}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${metric.iconBg}`}>
                      <Icon className={`h-5 w-5 ${metric.iconColor}`} />
                    </div>
                  </div>

                  {/* Value and Change */}
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-foreground">
                      {metric.value}
                    </p>
                    <p className="text-xs font-medium text-green-500">
                      {metric.change} from last month
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Stats */}
          <div className="bg-card rounded-xl border border-border/50 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Summary</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Engagement Rate
                </p>
                <p className="text-2xl font-bold text-foreground">13.2%</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Growth Rate
                </p>
                <p className="text-2xl font-bold text-foreground">10.4%</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Avg. Daily Views
                </p>
                <p className="text-2xl font-bold text-foreground">819</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Peak Views Day
                </p>
                <p className="text-2xl font-bold text-foreground">Friday</p>
              </div>
            </div>
          </div>

          {/* Time Period Info */}
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-xs text-muted-foreground text-center">
              Data shown is from the last 30 days • Updated daily
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
