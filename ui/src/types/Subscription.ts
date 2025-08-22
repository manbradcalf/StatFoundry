export interface Subscription {
  id: string;
  userId: string;
  isPro: boolean;
  createdAt?: any; // Firebase Timestamp
  updatedAt?: any; // Firebase Timestamp
}

export interface CreateSubscriptionData {
  userId: string;
  isPro: boolean;
}