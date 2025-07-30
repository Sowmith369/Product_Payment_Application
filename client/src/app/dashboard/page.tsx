import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Stats } from "@/components/dashboard/stats";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { SalesChart } from "@/components/dashboard/sales-chart";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Stats />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RecentActivity className="col-span-1 md:col-span-2" />
        <SalesChart className="col-span-1" />
      </div>
    </DashboardLayout>
  );
}
