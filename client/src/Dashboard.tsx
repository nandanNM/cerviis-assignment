import { Loader2, RefreshCcw, Copy, Target, Activity, Award, BarChart3, TrendingDown } from "lucide-react";
import useDashboard from "./hooks/useDashboard";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { useToast } from "./components/ui/use-toast";



export default function Dashboard() {
  const { data, isLoading, countdown, handleManualRefresh } = useDashboard();
  const { toast } = useToast();

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(baseUrl);
    toast({
      title: "URL Copied!",
      description: "Profile URL has been copied to clipboard.",
    });
  };

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded-xl shadow-sm border border-zinc-200 w-full max-w-6xl text-zinc-950">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-sm font-medium text-zinc-500 mt-1">
            {data ? `Welcome back, ${data.user.name} (${data.user.role})` : "Loading your profile..."}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              handleManualRefresh();
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <RefreshCcw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </Button>

          <div className="flex flex-col items-end min-w-[3.5rem]">
            <span className="text-xs font-medium text-zinc-400">Next poll</span>
            <span className="text-sm font-bold text-zinc-900 border border-zinc-200 bg-zinc-50 px-2 rounded mt-1">
              {countdown}s
            </span>
          </div>
        </div>
      </div>

      {/* Copy link section */}
      <div className="mb-6 space-y-2 max-w-lg">
        <h2 className="text-sm font-semibold text-zinc-700">Your Shareable Link</h2>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={baseUrl || "Loading link..."}
            disabled
            className="flex h-10 w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button onClick={copyToClipboard} disabled={!data} className="shrink-0 gap-2">
            <Copy className="h-4 w-4" /> Copy
          </Button>
        </div>
      </div>
      
      <div className="my-6">
        <Separator />
      </div>

      {/* Statistics board */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data ? (
          <>
            <StatCard 
              title="Interviews Given" 
              value={data.overview.interviewsGiven} 
              icon={Target} 
            />
            <StatCard 
              title="Success Rate" 
              value={data.overview.successRate} 
              icon={Activity} 
            />
            <StatCard 
              title="Average Score" 
              value={data.overview.avgScore} 
              icon={Award} 
            />
            <StatCard 
              title="Error Rate" 
              value={data.performance.errorRate} 
              icon={TrendingDown} 
            />
            <StatCard 
              title="Last Score" 
              value={data.performance.lastScore} 
              icon={BarChart3} 
            />
            {/* Last updated visual card */}
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 flex flex-col items-center justify-center text-zinc-500">
              <p className="text-sm font-medium">Last Updated</p>
              <p className="text-sm mt-1">
                {new Date(data.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </>
        ) : (
          <div className="col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-xl text-zinc-500">
            <Loader2 className="h-8 w-8 animate-spin mb-4 text-zinc-400" />
            <p className="text-lg font-medium">Loading statistics...</p>
          </div>
        )}
      </div>
    </div>
  );
}


const StatCard = ({ title, value, icon: Icon }: { title: string, value: string | number, icon: any }) => (
  <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-sm font-medium tracking-tight text-zinc-500">{title}</p>
      <p className="text-3xl font-bold text-zinc-900 mt-2">{value}</p>
    </div>
    <div className="h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-700">
      <Icon className="h-6 w-6" />
    </div>
  </div>
);
