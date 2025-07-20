import { useCallback } from "react";

// Declare Paystack types
declare global {
  interface Window {
    PaystackPop: {
      setup: (options: PaystackOptions) => {
        openIframe: () => void;
      };
    };
  }
}

interface PaystackOptions {
  key: string;
  email: string;
  amount: number; // in kobo (1 cedi = 100 kobo)
  currency: string;
  ref: string;
  metadata?: {
    orderId: string;
    custom_fields?: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
  callback: (response: PaystackResponse) => void;
  onClose: () => void;
}

interface PaystackResponse {
  reference: string;
  message: string;
  status: string;
  trans: string;
  transaction: string;
  trxref: string;
}

interface PaymentData {
  orderId: string;
  amount: number; // in cedis
  email: string;
  description?: string;
  metadata?: Record<string, any>;
}

export const usePaystack = () => {
  const PAYSTACK_PUBLIC_KEY =
    "pk_live_6dbb3b43909b00e3373eeb1b25f7870c4f59c13b";

  const initiatePayment = useCallback(
    (paymentData: PaymentData) => {
      return new Promise<PaystackResponse>((resolve, reject) => {
        if (!window.PaystackPop) {
          reject(new Error("Paystack script not loaded"));
          return;
        }

        // Generate unique reference
        const reference = `INV_${paymentData.orderId}_${Date.now()}`;

        const options: PaystackOptions = {
          key: PAYSTACK_PUBLIC_KEY,
          email: paymentData.email,
          amount: Math.round(paymentData.amount * 100), // Convert cedis to pesewas (kobo equivalent)
          currency: "GHS", // Ghana Cedis
          ref: reference,
          metadata: {
            orderId: paymentData.orderId,
            custom_fields: [
              {
                display_name: "Order ID",
                variable_name: "order_id",
                value: paymentData.orderId,
              },
              {
                display_name: "Description",
                variable_name: "description",
                value: paymentData.description || "Purchase Order Payment",
              },
            ],
          },
          callback: (response: PaystackResponse) => {
            resolve(response);
          },
          onClose: () => {
            reject(new Error("Payment cancelled by user"));
          },
        };

        const handler = window.PaystackPop.setup(options);
        handler.openIframe();
      });
    },
    [PAYSTACK_PUBLIC_KEY],
  );

  return {
    initiatePayment,
    isPaystackLoaded: () => !!window.PaystackPop,
  };
};
