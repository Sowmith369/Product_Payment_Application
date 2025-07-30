import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SalesChart({ className }: { className?: string }) {
  return (
    <Card className={`bg-white shadow-sm rounded-lg ${className}`}>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-60 flex items-center justify-center text-gray-400">
          {/* Placeholder for a chart */}
          Chart will go here
        </div>
      </CardContent>
    </Card>
  );
}
