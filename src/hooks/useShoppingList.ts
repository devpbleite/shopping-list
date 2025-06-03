import { useState, useEffect } from 'react';
import { ShoppingItem } from '@/types';
<<<<<<< HEAD
import { db } from '@/lib/firebase'; // Import Firestore instance
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy
} from 'firebase/firestore';

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const itemsCollectionRef = collection(db, 'shoppingList');

  // Fetch items from Firestore on initial load and listen for real-time updates
  useEffect(() => {
    setLoading(true);
    const q = query(itemsCollectionRef, orderBy('name')); // Optional: order by name

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const itemsData: ShoppingItem[] = [];
      querySnapshot.forEach((doc) => {
        // Ensure data matches the ShoppingItem interface, providing defaults if necessary
        const data = doc.data();
        itemsData.push({
          id: doc.id,
          name: data.name || '', // Default to empty string if name is missing
          quantity: typeof data.quantity === 'number' ? data.quantity : 1, // Default to 1 if quantity is missing/invalid
          category: data.category || 'Outros', // Default category
          checked: typeof data.checked === 'boolean' ? data.checked : false, // Default to false
        });
      });
      setItems(itemsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching shopping list: ", error);
      // Handle error appropriately, maybe set an error state
      setLoading(false);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Add item to Firestore
  const addItem = async (item: Omit<ShoppingItem, 'id' | 'checked'>) => {
    try {
      await addDoc(itemsCollectionRef, {
        ...item,
        checked: false, // Ensure checked is false initially
      });
      // No need to setItems here, onSnapshot will update the state
    } catch (error) {
      console.error("Error adding item: ", error);
      // Handle error (e.g., show a toast notification)
    }
  };

  // Toggle item's checked status in Firestore
  const toggleItem = async (id: string) => {
    const itemDoc = doc(db, 'shoppingList', id);
    const itemToToggle = items.find(item => item.id === id);
    if (!itemToToggle) return; // Item not found

    try {
      await updateDoc(itemDoc, {
        checked: !itemToToggle.checked
      });
      // No need to setItems here, onSnapshot will update the state
    } catch (error) {
      console.error("Error toggling item: ", error);
      // Handle error
    }
  };

  // Remove item from Firestore
  const removeItem = async (id: string) => {
    const itemDoc = doc(db, 'shoppingList', id);
    try {
      await deleteDoc(itemDoc);
      // No need to setItems here, onSnapshot will update the state
    } catch (error) {
      console.error("Error removing item: ", error);
      // Handle error
    }
  };

  // Update item details in Firestore
  const updateItem = async (id: string, updates: Partial<Omit<ShoppingItem, 'id'>>) => {
    // Ensure 'id' is not part of the updates object passed to updateDoc
    const { id: itemId, ...validUpdates } = updates as any; // Type assertion might be needed depending on how updates is structured

    const itemDoc = doc(db, 'shoppingList', id);
    try {
      await updateDoc(itemDoc, validUpdates);
      // No need to setItems here, onSnapshot will update the state
    } catch (error) {
      console.error("Error updating item: ", error);
      // Handle error
    }
  };

  return { items, addItem, toggleItem, removeItem, updateItem, loading }; // Return loading state
}
=======

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem('shoppingList');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<ShoppingItem, 'id' | 'checked'>) => {
    setItems(prev => [...prev, {
      ...item,
      id: crypto.randomUUID(),
      checked: false
    }]);
  };

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateItem = (id: string, updates: Partial<ShoppingItem>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  return { items, addItem, toggleItem, removeItem, updateItem };
}
>>>>>>> 43bb93615575ba23efb807b626d9e23729c14c36
