import { useEffect, useState } from "react";

export function useSessionStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue; // 確保 SSR 安全
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading sessionStorage key:", key, error);
      return initialValue;
    }
  });

  useEffect(() => {
    // 確保只在 client side 執行
    if (typeof window === "undefined") return;

    try {
      sessionStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error saving to sessionStorage:", key, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
