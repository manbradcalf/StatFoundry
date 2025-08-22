import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { Subscription, CreateSubscriptionData } from "../types/Subscription";

const COLLECTION_NAME = "Subscriptions";

export const subscriptionService = {
  /**
   * Create a new subscription for a user
   */
  async createSubscription(
    subscriptionData: CreateSubscriptionData,
  ): Promise<string> {
    console.log("Creating subscription with data:", subscriptionData);

    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...subscriptionData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    console.log("Subscription created successfully with ID:", docRef.id);
    return docRef.id;
  },

  /**
   * Get all subscriptions for a specific user
   */
  async getUserSubscriptions(userId: string): Promise<Subscription[]> {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", userId),
      orderBy("updatedAt", "desc"),
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Subscription[];
  },

  /**
   * Get a specific subscription by ID
   */
  async getSubscriptionById(subscriptionId: string): Promise<Subscription | null> {
    const docRef = doc(db, COLLECTION_NAME, subscriptionId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Subscription;
    }
    return null;
  },

  /**
   * Update an existing subscription
   */
  async updateSubscription(
    subscriptionId: string,
    updates: Partial<CreateSubscriptionData>,
  ): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, subscriptionId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  },

  /**
   * Delete a subscription
   */
  async deleteSubscription(subscriptionId: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, subscriptionId);
    await deleteDoc(docRef);
  },

  /**
   * Check if a user has an active Pro subscription
   */
  async isUserPro(userId: string): Promise<boolean> {
    const subscriptions = await this.getUserSubscriptions(userId);
    // Check if any subscription has isPro: true
    return subscriptions.some(subscription => subscription.isPro);
  },

  /**
   * Upgrade user to Pro
   */
  async upgradeUserToPro(userId: string): Promise<string> {
    const subscriptions = await this.getUserSubscriptions(userId);
    const existingSubscription = subscriptions[0]; // Most recent
    
    if (existingSubscription) {
      // Update existing subscription
      await this.updateSubscription(existingSubscription.id, { isPro: true });
      return existingSubscription.id;
    } else {
      // Create new subscription
      return await this.createSubscription({ userId, isPro: true });
    }
  },

  /**
   * Downgrade user from Pro
   */
  async downgradeUserFromPro(userId: string): Promise<void> {
    const subscriptions = await this.getUserSubscriptions(userId);
    const existingSubscription = subscriptions[0]; // Most recent
    
    if (existingSubscription) {
      await this.updateSubscription(existingSubscription.id, { isPro: false });
    }
  },
};