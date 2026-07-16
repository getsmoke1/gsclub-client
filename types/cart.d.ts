export interface CartItem {
  id: string;
  quantity: number;
  attributeId?: string;
  price?: number;              // Override price (e.g. subscription discount)
  isSubscription?: boolean;
  subscriptionFrequency?: string;
}
