import React, { createContext, useState, useMemo } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {

        const [orders, setOrders] = useState([]);        

        const addItem = (item)=>{
            const existing = orders.find((i) => i.id === item.id);
            if (existing) {
            setOrders(
                orders.map((i) =>
                i.id === item.id ? { ...i, qty: i.qty + 1 } : i
                )
            );
            } else {
            setOrders([...orders, { ...item, qty: 1 }]);
            }
        }

        const decreaseQty = (id) => {
            setOrders((prevCart) =>
            prevCart
                .map((item) =>
                item.id === id
                    ? { ...item, qty: item.qty - 1 }
                    : item
                )
                .filter((item) => item.qty > 0) // otomatis hapus kalau qty 0
            );
        };    

        // 🔹 Hitung total (optimal)
        const total = useMemo(() => {
            return orders.reduce((sum, item) => {
            return sum + item.harga * item.qty;
            }, 0);
        }, [orders]);        

  return (
    <OrderContext.Provider value={{ orders, addItem, decreaseQty, total }}>
      {children}
    </OrderContext.Provider>
  );
};