import { db } from "./firebase-config"
import { collection, query, where, getDocs, Timestamp, addDoc, doc, updateDoc } from "firebase/firestore"

export type Notification = {
  id: string
  userId: string
  message: string
  type: "job" | "application" | "message" | "system"
  read: boolean
  createdAt: Timestamp
  link?: string
}

export async function getNotifications(userId: string): Promise<Notification[]> {
  try {
    // Remove the orderBy clause to avoid requiring a composite index
    const q = query(collection(db, "notifications"), where("userId", "==", userId))

    const querySnapshot = await getDocs(q)

    // Convert the documents to Notification objects
    const notifications = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Notification[]

    // Sort the notifications by createdAt client-side instead
    return notifications.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
  } catch (error) {
    console.error("Error fetching notifications:", error)
    throw error
  }
}

export async function createNotification(notification: Omit<Notification, "id" | "createdAt">) {
  try {
    const notificationData = {
      ...notification,
      createdAt: Timestamp.now(),
    }

    const docRef = await addDoc(collection(db, "notifications"), notificationData)
    return {
      id: docRef.id,
      ...notificationData,
    }
  } catch (error) {
    console.error("Error creating notification:", error)
    throw error
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    const notificationRef = doc(db, "notifications", notificationId);
    await updateDoc(notificationRef, {
      read: true,
      readAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
}

export async function markNotificationAsUnread(notificationId: string) {
  try {
    const notificationRef = doc(db, "notifications", notificationId);
    await updateDoc(notificationRef, {
      read: false,
      readAt: null,
    });
    return true;
  } catch (error) {
    console.error("Error marking notification as unread:", error);
    throw error;
  }
}
