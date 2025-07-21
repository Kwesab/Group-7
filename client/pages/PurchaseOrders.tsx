import React, { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingCart,
  Plus,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  Bot,
  DollarSign,
  Loader2,
} from "lucide-react";
import { usePaystack } from "@/hooks/usePaystack";
import { toast } from "sonner";

const PurchaseOrders = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { initiatePayment, isPaystackLoaded } = usePaystack();

  const purchaseOrders = [
    {
      id: "PO-001",
      supplier: "Apple Wholesale",
      products: [
        { name: "iPhone 15 Pro", quantity: 50, price: 750 },
        { name: "MacBook Pro M3", quantity: 20, price: 1500 },
      ],
      total: 2,
      status: "pending",
      created: "2024-01-15",
      expectedDelivery: "2024-01-25",
      isAiGenerated: true,
    },
    {
      id: "PO-002",
      supplier: "Samsung Distribution",
      products: [{ name: "Samsung Galaxy S24", quantity: 30, price: 650 }],
      total: 19500,
      status: "approved",
      created: "2024-01-14",
      expectedDelivery: "2024-01-22",
      isAiGenerated: false,
    },
    {
      id: "PO-003",
      supplier: "Nike Supply Chain",
      products: [{ name: "Nike Air Max 270", quantity: 100, price: 85 }],
      total: 8500,
      status: "delivered",
      created: "2024-01-10",
      expectedDelivery: "2024-01-18",
      isAiGenerated: true,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case "delivered":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Delivered
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handlePaystackPayment = async (order: any) => {
    if (!isPaystackLoaded()) {
      toast.error("Payment system not loaded. Please refresh and try again.");
      return;
    }

    setCurrentOrder(order);
    setShowPayment(true);
  };

  const processPayment = async () => {
    if (!currentOrder) return;

    setIsProcessingPayment(true);

    try {
      const response = await initiatePayment({
        orderId: currentOrder.id,
        amount: currentOrder.total,
        email: "admin@inventoryai.com", // This should come from user context
        description: `Payment for Purchase Order ${currentOrder.id} - ${currentOrder.supplier}`,
        metadata: {
          supplier: currentOrder.supplier,
          products: currentOrder.products,
        },
      });

      // Payment successful
      toast.success(`Payment successful! Reference: ${response.reference}`);

      // Here you would typically update the order status in your backend
      console.log("Payment successful:", response);

      setShowPayment(false);
      setCurrentOrder(null);

      // Optionally refresh the orders list or update the specific order status
    } catch (error: any) {
      toast.error(error.message || "Payment failed. Please try again.");
      console.error("Payment error:", error);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Purchase Orders
          </h1>
          <p className="text-muted-foreground">
            Manage purchase orders with automated AI-generated recommendations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Bot className="w-4 h-4 mr-2" />
            AI Generate Orders
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Order
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create Purchase Order</DialogTitle>
                <DialogDescription>
                  Create a new purchase order for restocking inventory.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apple">Apple Wholesale</SelectItem>
                      <SelectItem value="samsung">
                        Samsung Distribution
                      </SelectItem>
                      <SelectItem value="nike">Nike Supply Chain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product">Product</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iphone">iPhone 15 Pro</SelectItem>
                      <SelectItem value="samsung">
                        Samsung Galaxy S24
                      </SelectItem>
                      <SelectItem value="macbook">MacBook Pro M3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unitPrice">Unit Price (₵)</Label>
                    <Input id="unitPrice" type="number" placeholder="0.00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedDelivery">Expected Delivery</Label>
                  <Input id="expectedDelivery" type="date" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Create Order</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI-Generated Recommendations
          </CardTitle>
          <CardDescription>
            Smart purchase suggestions based on demand forecasting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-border rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-foreground">
                    Urgent Restock Required
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    iPhone 15 Pro stock is critically low. AI predicts 35%
                    demand increase next week.
                  </p>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Recommended order:</span> 75
                    units (₵56,250)
                  </div>
                </div>
                <Button size="sm">Generate Order</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Purchase Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Purchase Orders ({purchaseOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                    Order ID
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                    Supplier
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                    Products
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                    Total
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                    Expected Delivery
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {order.id}
                        </code>
                        {order.isAiGenerated && (
                          <Badge
                            variant="secondary"
                            className="bg-purple-100 text-purple-700 text-xs"
                          >
                            <Bot className="w-3 h-3 mr-1" />
                            AI
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium text-foreground">
                        {order.supplier}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        {order.products.map((product, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium">{product.name}</span>
                            <span className="text-muted-foreground">
                              {" "}
                              × {product.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium text-foreground">
                        ₵{order.total.toLocaleString()}
                      </div>
                    </td>
                    <td className="p-3">{getStatusBadge(order.status)}</td>
                    <td className="p-3">
                      <div className="text-sm text-muted-foreground">
                        {order.expectedDelivery}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        {order.status === "pending" && (
                          <Button
                            size="sm"
                            onClick={() => handlePaystackPayment(order)}
                          >
                            <CreditCard className="w-4 h-4 mr-1" />
                            Pay
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          View
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

      {/* Paystack Payment Modal */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Paystack Payment
            </DialogTitle>
            <DialogDescription>
              Secure payment processing for purchase order
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {currentOrder && (
              <>
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Order ID:
                    </span>
                    <span className="font-medium">{currentOrder.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Supplier:
                    </span>
                    <span className="font-medium">{currentOrder.supplier}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Amount:
                    </span>
                    <span className="font-bold text-lg">
                      ₵{currentOrder.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Products:</h4>
                  <div className="space-y-1">
                    {currentOrder.products.map(
                      (product: any, index: number) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span>
                            {product.name} × {product.quantity}
                          </span>
                          <span>
                            ₵
                            {(
                              product.price * product.quantity
                            ).toLocaleString()}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Secure Payment with Paystack
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-300">
                    Your payment will be processed securely through Paystack.
                    You'll be redirected to complete the payment.
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowPayment(false);
                setCurrentOrder(null);
              }}
              disabled={isProcessingPayment}
            >
              Cancel
            </Button>
            <Button onClick={processPayment} disabled={isProcessingPayment}>
              {isProcessingPayment ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay with Paystack
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PurchaseOrders;
