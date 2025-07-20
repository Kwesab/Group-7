import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  TrendingUp,
  Calendar,
  Download,
  RefreshCw,
  BarChart3,
  LineChart,
  PieChart,
} from "lucide-react";

const Analytics = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Sales Analytics & AI Forecasting
          </h1>
          <p className="text-muted-foreground">
            AI-powered demand forecasting using ARIMA and LSTM models
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Bot className="w-4 h-4 mr-2" />
            Generate Forecast
          </Button>
        </div>
      </div>

      {/* AI Model Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Forecasting Models
          </CardTitle>
          <CardDescription>
            Current status and performance of demand forecasting models
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">ARIMA Model</h4>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700"
                >
                  Active
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Time series forecasting for seasonal patterns
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Accuracy:</span>
                <span className="font-medium">94.2%</span>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">LSTM Neural Network</h4>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700"
                >
                  Training
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Deep learning for complex pattern recognition
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Accuracy:</span>
                <span className="font-medium">96.8%</span>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder for Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5" />
              Demand Forecast
            </CardTitle>
            <CardDescription>
              Next 30 days predicted demand by AI models
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <LineChart className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">
                  Interactive forecasting chart will be displayed here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Sales Trends
            </CardTitle>
            <CardDescription>
              Historical sales data and patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">
                  Sales trends visualization will be displayed here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Category Performance
          </CardTitle>
          <CardDescription>
            Sales distribution across product categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <PieChart className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">
                Category performance chart will be displayed here
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
