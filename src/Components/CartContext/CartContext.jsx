// import React, { createContext, useState, useEffect } from 'react';

// export const CartContext = createContext();

// export default function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState(() => {
//     // جلب البيانات من localStorage عند بداية التشغيل
//     const savedCart = localStorage.getItem('cartItems');
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   // حفظ التغيرات على cartItems في localStorage
//   useEffect(() => {
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   }, [cartItems]);

// //   increaseQuantity
//   const increaseQuantity =(id) =>{
//     setCartItems(prevItems => prevItems.map(item =>
//         item.id === id ?{...item , quantity: item.quantity+1} : item
//     ))
//   }



//   const addToCart = (product) => {
//     setCartItems((prev) => [...prev, {...product,quantity: 1}]);
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, setCartItems, addToCart , increaseQuantity }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// جزء cart 
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export default function CartProvider({ children }) {


// Favorites
 const [favorites, setFavorites] = useState(() => {
    const savedFav = localStorage.getItem('favoritesItems');
    return savedFav ? JSON.parse(savedFav) : [];
  });
  const addToFavorites = (item) =>{
    setFavorites((prev) =>{
      if(prev.some((i) => i.id === item.id)) return prev;
      return[...prev, item]
    })
  }
  useEffect(() => {
    localStorage.setItem("favoritesItems", JSON.stringify(favorites));
  }, [favorites])

  const removeFromFavorites = (id) => {
    setFavorites((prov) => prov.filter((i) => i.id !==id))
  }





// cart
  const [cartItems, setCartItems] = useState(() => {
    // جلب البيانات من localStorage عند بداية التشغيل
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // حفظ التغيرات على cartItems في localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // زيادة الكمية
  const increaseQuantity = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  //   نقصان الكميه
  const decreaseQuantity = (id) => {
    setCartItems(prevItems => prevItems.map(item => item.id === id && item.quantity > 1 ?
      { ...item, quantity: item.quantity - 1 } : item
    ))
  }

  //   خذف من السله
  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }


  // إضافة منتج للعربة
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, increaseQuantity, decreaseQuantity, removeFromCart , addToFavorites, favorites ,removeFromFavorites }}>
      {children}
    </CartContext.Provider>
  );
}
