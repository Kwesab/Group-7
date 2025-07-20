import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Package,
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  const inventoryData = [
    {
      id: "INV001",
      name: "iPhone 15 Pro",
      sku: "APL-IP15P-128",
      category: "Electronics",
      brand: "Apple",
      currentStock: 12,
      minStock: 50,
      maxStock: 200,
      price: 999.99,
      cost: 750.0,
      location: "A1-B2-C3",
      lastUpdated: "2024-01-15",
      status: "low_stock",
      trend: "up",
      soldLast30Days: 45,
    },
    {
      id: "INV002",
      name: "Samsung Galaxy S24",
      sku: "SAM-GS24-256",
      category: "Electronics",
      brand: "Samsung",
      currentStock: 75,
      minStock: 30,
      maxStock: 150,
      price: 899.99,
      cost: 650.0,
      location: "A1-B3-C1",
      lastUpdated: "2024-01-14",
      status: "in_stock",
      trend: "up",
      soldLast30Days: 32,
    },
    {
      id: "INV003",
      name: "MacBook Pro M3",
      sku: "APL-MBP-M3-512",
      category: "Electronics",
      brand: "Apple",
      currentStock: 8,
      minStock: 15,
      maxStock: 60,
      price: 1999.99,
      cost: 1500.0,
      location: "B2-C1-D2",
      lastUpdated: "2024-01-13",
      status: "low_stock",
      trend: "down",
      soldLast30Days: 18,
    },
    {
      id: "INV004",
      name: "Nike Air Max 270",
      sku: "NIK-AM270-42",
      category: "Footwear",
      brand: "Nike",
      currentStock: 150,
      minStock: 50,
      maxStock: 300,
      price: 149.99,
      cost: 85.0,
      location: "C1-D2-E1",
      lastUpdated: "2024-01-12",
      status: "in_stock",
      trend: "up",
      soldLast30Days: 67,
    },
    {
      id: "INV005",
      name: "Sony WH-1000XM5",
      sku: "SNY-WH1000XM5",
      category: "Electronics",
      brand: "Sony",
      currentStock: 0,
      minStock: 25,
      maxStock: 100,
      price: 399.99,
      cost: 250.0,
      location: "A2-B1-C2",
      lastUpdated: "2024-01-10",
      status: "out_of_stock",
      trend: "down",
      soldLast30Days: 28,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_stock":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            In Stock
          </Badge>
        );
      case "low_stock":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
            Low Stock
          </Badge>
        );
      case "out_of_stock":
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const filteredInventory = inventoryData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;

    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "in_stock" && item.status === "in_stock") ||
      (stockFilter === "low_stock" && item.status === "low_stock") ||
      (stockFilter === "out_of_stock" && item.status === "out_of_stock");

    return matchesSearch && matchesCategory && matchesStock;
  });

  const categories = [...new Set(inventoryData.map((item) => item.category))];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Inventory Management
          </h1>
          <p className="text-muted-foreground">
            Track and manage your product inventory with AI-powered insights
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Enter the details for the new product to add to inventory.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" placeholder="Enter product name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input id="sku" placeholder="Enter SKU" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="footwear">Footwear</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input id="brand" placeholder="Enter brand" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₵)</Label>
                    <Input id="price" type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cost">Cost (₵)</Label>
                    <Input id="cost" type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Initial Stock</Label>
                    <Input id="stock" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minStock">Min Stock</Label>
                    <Input id="minStock" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxStock">Max Stock</Label>
                    <Input id="maxStock" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g., A1-B2-C3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter product description"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Add Product</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, SKU, or brand..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stock Levels</SelectItem>
                  <SelectItem value="in_stock">In Stock</SelectItem>
                  <SelectItem value="low_stock">Low Stock</SelectItem>
                  <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Inventory Items ({filteredInventory.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                    Product
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                    SKU
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                    Current Stock
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                    Price
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                    Trend
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                    Location
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="border-b border-border">
                    <td className="p-3">
                      <div>
                        <div className="font-medium text-foreground">
                          {item.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.brand} • {item.category}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {item.sku}
                      </code>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          {item.currentStock} units
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Min: {item.minStock} • Max: {item.maxStock}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">{getStatusBadge(item.status)}</td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="font-medium">₵{item.price}</div>
                        <div className="text-xs text-muted-foreground">
                          Cost: ₵{item.cost}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        {item.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                        <span className="text-xs text-muted-foreground">
                          {item.soldLast30Days} sold
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {item.location}
                      </code>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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

export default Inventory;
