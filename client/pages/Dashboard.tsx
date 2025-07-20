import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  Package,
  ShoppingCart,
  AlertTriangle,
  Bot,
  DollarSign,
  Activity,
  Users,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const stats = [
    {
      name: "Total Products",
      value: "2,847",
      change: "+12.3%",
      changeType: "positive",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      name: "Low Stock Alerts",
      value: "24",
      change: "-8.1%",
      changeType: "negative",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      name: "Monthly Revenue",
      value: "₵127,543",
      change: "+18.7%",
      changeType: "positive",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      name: "Pending Orders",
      value: "156",
      change: "+5.2%",
      changeType: "positive",
      icon: ShoppingCart,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const lowStockItems = [
    {
      name: "iPhone 15 Pro",
      current: 12,
      minimum: 50,
      category: "Electronics",
    },
    { name: "Nike Air Max", current: 8, minimum: 25, category: "Footwear" },
    {
      name: "Samsung Galaxy",
      current: 5,
      minimum: 30,
      category: "Electronics",
    },
    { name: "MacBook Pro", current: 3, minimum: 15, category: "Electronics" },
  ];

  const topProducts = [
    { name: "iPhone 15 Pro", sold: 245, revenue: "₵183,750", trend: "up" },
    { name: "Samsung Galaxy S24", sold: 198, revenue: "₵148,500", trend: "up" },
    { name: "MacBook Pro M3", sold: 87, revenue: "₵173,000", trend: "down" },
    { name: "iPad Pro", sold: 156, revenue: "₵124,800", trend: "up" },
  ];

  const aiInsights = [
    {
      type: "forecast",
      title: "Demand Spike Predicted",
      description: "iPhone 15 Pro demand expected to increase by 35% next week",
      action: "Reorder now",
      urgency: "high",
    },
    {
      type: "optimization",
      title: "Inventory Optimization",
      description: "Samsung Galaxy stock levels are optimal for current demand",
      action: "No action needed",
      urgency: "low",
    },
    {
      type: "alert",
      title: "Supplier Delay Risk",
      description:
        "Nike shipment may be delayed - consider alternative supplier",
      action: "Review suppliers",
      urgency: "medium",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            AI-powered inventory insights and management overview
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Activity className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button>
            <Bot className="w-4 h-4 mr-2" />
            AI Analysis
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {stat.changeType === "positive" ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span
                  className={cn(
                    "ml-1 text-sm font-medium",
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600",
                  )}
                >
                  {stat.change}
                </span>
                <span className="ml-1 text-sm text-muted-foreground">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* AI Insights */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              AI Insights & Recommendations
            </CardTitle>
            <CardDescription>
              Machine learning predictions and optimization suggestions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-4 border border-border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground">
                      {insight.title}
                    </h4>
                    <Badge
                      variant={
                        insight.urgency === "high"
                          ? "destructive"
                          : insight.urgency === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {insight.urgency}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {insight.description}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  {insight.action}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Low Stock Alerts
            </CardTitle>
            <CardDescription>
              Items requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowStockItems.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.category}
                    </p>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    {item.current} left
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Current: {item.current}</span>
                    <span>Min: {item.minimum}</span>
                  </div>
                  <Progress
                    value={(item.current / item.minimum) * 100}
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Top Performing Products
          </CardTitle>
          <CardDescription>
            Best sellers and revenue generators this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 text-sm font-medium text-muted-foreground">
                    Product
                  </th>
                  <th className="text-left p-2 text-sm font-medium text-muted-foreground">
                    Units Sold
                  </th>
                  <th className="text-left p-2 text-sm font-medium text-muted-foreground">
                    Revenue
                  </th>
                  <th className="text-left p-2 text-sm font-medium text-muted-foreground">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="p-2">
                      <div className="font-medium text-foreground">
                        {product.name}
                      </div>
                    </td>
                    <td className="p-2 text-muted-foreground">
                      {product.sold}
                    </td>
                    <td className="p-2 font-medium text-foreground">
                      {product.revenue}
                    </td>
                    <td className="p-2">
                      {product.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
