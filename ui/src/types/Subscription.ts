export interface Subscription {
  id: string;
  userId: string;
  userEmail?: string;
  isPro: boolean;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripeStatus?: string;
  stripePriceId?: string;
  currentPeriodEnd?: Date;
  createdAt?: any; // Firebase Timestamp
  updatedAt?: any; // Firebase Timestamp
}

export interface CreateSubscriptionData {
  userId: string;
  userEmail?: string;
  isPro: boolean;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripeStatus?: string;
  stripePriceId?: string;
  currentPeriodEnd?: Date;
}