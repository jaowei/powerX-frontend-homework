import { React } from "react";
import { LoginForm, useAuth } from "../domains/auth";
import {
  ListingItem,
  useListings,
  useCartListings,
  CartItem,
  EmptyCart,
} from "../domains/marketplace";

const addToCart = (listingId, token) =>
  fetch(`https://ecomm-service.herokuapp.com/marketplace/cart/items`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      quantity: 1,
      listingId,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  });

const removeFromCart = (listingId, token) =>
fetch(`https://ecomm-service.herokuapp.com/marketplace/cart/items/${listingId}`, {
  method: "DELETE",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
}).then((res) => {
  if (res.ok) {
    return res.json();
  }
  throw new Error(res.statusText);
});

export const Marketplace = () => {
  const { listings } = useListings();
  const { cartListings, totalCartAmt, loadData} = useCartListings();
  const auth = useAuth();

  return (
    <div>
      {auth.status === "anonymous" && (
        <div className="bg-gray-50 p-6 sm:p-12 min-h-screen">
          <LoginForm
            onSuccess={(accessToken) => {
              auth.login(accessToken);
            }}
          />
        </div>
      )}
      {auth.status === "authenticated" && (
        <div className="bg-gray-50 lg:flex">
          <div className="flex-1">
            <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:flex-col sm:align-center mb-12">
                <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">
                  Marketplace
                </h1>
              </div>
              <div className="grid md:grid-cols-2 gap-x-4 gap-y-8 xl:grid-cols-3 xl:gap-x-6">
                {listings &&
                  listings.map((listing) => (
                    <ListingItem
                      key={listing._id}
                      id={listing._id}
                      imageUrl={listing.imageUrl}
                      currency="SGD"
                      price={listing.price}
                      description={listing.description}
                      title={listing.title}
                      numStock={listing.numOfStock}
                      onlyOne={listing.availability === "single-item"}
                      onAddToCart={
                        auth.status === "authenticated"
                          ? () => {
                            addToCart(listing._id, auth.accessToken).then(() => 
                            loadData()
                            )
                          }
                          : undefined
                      }
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="flex-initial bg-white w-full lg:max-w-md border-b border-gray-100">
            <div className="py-6 px-4 bg-pink-700 sm:px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">
                  Your shopping cart
                </h2>
              </div>
              <div className="mt-1">
                <p className="text-sm text-pink-300">
                  Listing added into your shopping cart
                </p>
              </div>
            </div>
            <div>
              {cartListings.length === 0 && (
                <EmptyCart />
              )}
              <ul className="divide-y divide-gray-200">
                {cartListings &&
                  cartListings.map((cartItem) => (
                    <CartItem
                      key={cartItem._id}
                      imageUrl={cartItem.listing.imageUrl}
                      title={cartItem.listing.title}
                      price={cartItem.listing.price}
                      quantity={cartItem.quantity}
                      onDelete={
                        auth.status === "authenticated"
                        ? () => {
                          removeFromCart(cartItem.listing._id, auth.accessToken).then(() => 
                          loadData())
                        }
                        : undefined
                      }
                    />
                  ))}
              </ul>
              <div className="flex-shrink-0 px-4 py-4 flex justify-end border-t border-gray-200">
                <span>
                  Total 
                  <span className="text-3xl">
                    $
                    <span>{totalCartAmt}</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
