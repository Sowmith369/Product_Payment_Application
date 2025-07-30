import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentActivity({ className }: { className?: string }) {
  return (
    <Card className={`bg-white shadow-sm rounded-lg ${className}`}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Order #12345 placed</p>
              <p className="text-sm text-muted-foreground">John Doe - 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Product &apos;Brick A&apos; updated</p>
              <p className="text-sm text-muted-foreground">Admin - 1 day ago</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">New user registered</p>
              <p className="text-sm text-muted-foreground">Jane Smith - 3 days ago</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
