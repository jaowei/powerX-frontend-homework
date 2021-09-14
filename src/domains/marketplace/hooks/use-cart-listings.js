import { useEffect, useState } from "react";
import { useAuth } from "../../auth";

const getCartListings = ({token, signal}) =>
  fetch(`https://ecomm-service.herokuapp.com/marketplace/cart/items`, {
      method: "GET",
      headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`
      },
      signal
  }).then((res) => {
    if (res.ok) {
        return res.json();
        }
        throw new Error(res.statusText);
  });

export const useCartListings = () => {
    const [cartListings, setCartListings] = useState([]);
    const [totalCartAmt, setTotalCartAmt] = useState(0)
    const { accessToken } = useAuth()

    const loadCartListings = ({token, signal}) =>
        getCartListings({token, signal}).then((data) => setCartListings(data));

    useEffect(() => {
        if (accessToken) {
            const ab = new AbortController();
            loadCartListings({ token: accessToken, signal: ab.signal});

            return () => {
                ab.abort()
            }
        }
    }, [accessToken])

    useEffect(() => {
        const amounts = []
        cartListings.forEach((item) => amounts.push(item.listing.price * item.quantity))


        if (amounts.length === 0) {
            setTotalCartAmt(0)
        } else {
            setTotalCartAmt(amounts.reduce((prev, next) => prev + next))
        }

    }, [cartListings]);

    return {
        cartListings,
        loadData: () => loadCartListings({token: accessToken}),
        totalCartAmt
    };
};