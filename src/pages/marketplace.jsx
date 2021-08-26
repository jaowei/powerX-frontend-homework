import { React, useState, useRef, useEffect } from "react";
import { ListingItems } from "../components/listing-item";

const getListings = () =>
  fetch("https://ecomm-service.herokuapp.com/marketplace").then((res) =>
    res.json()
  );

const createListing = (data) =>
  fetch("https://ecomm-service.herokuapp.com/marketplace", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

const usePersistedState = (storageKey, defaultValue) => {
  const [value, setValue] = useState(
    () => sessionStorage.getItem(storageKey) || defaultValue
  );

  useEffect(() => {
    sessionStorage.setItem(storageKey, value);
  }, [storageKey, value]);

  return [value, setValue];
};

export const Marketplace = () => {
  const [listings, setListings] = useState([]);
  const [title, setTitle] = usePersistedState("title", "");
  const [price, setPrice] = usePersistedState("price", 0);
  const [description, setDescription] = usePersistedState("description", "");
  const [condition, setCondition] = usePersistedState("condition", "new");
  const [availability, setAvailability] = usePersistedState(
    "availability",
    "in-stock"
  );
  const [numStock, setNumStock] = usePersistedState("numStock", 0);

  const titleInputRef = useRef();

  const loadListings = () => getListings().then((data) => setListings(data));

  useEffect(() => {
    loadListings();
  });

  return (
    <div className="bg-gray-50 lg:flex">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center mb-12">
            <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">
              Marketplace
            </h1>
          </div>
          <div
            className="
              grid
              md:grid-cols-2
              gap-x-4 gap-y-8
              xl:grid-cols-3 xl:gap-x-6
            "
          >
            {listings &&
              listings.map((listing) => (
                <ListingItems
                  key={listing._id}
                  id={listing._id}
                  imageUrl={listing.imageUrl}
                  currency="SGD"
                  price={listing.price}
                  description={listing.description}
                  item={listing.title}
                  numStock={listing.numOfStock}
                  reload={loadListings}
                />
              ))}
          </div>
        </div>
      </div>
      <div
        className="
          flex-initial
          bg-white
          w-full
          lg:max-w-md
          border-b border-gray-100"
      >
        <form
          className="flex flex-col h-full"
          onSubmit={(ev) => {
            ev.preventDefault();
            createListing({
              title,
              condition,
              description,
              availability,
              numOfStock: Number(numStock),
              price: Number(price),
            }).then(() => {
              loadListings();
              setTitle("");
              setCondition("new");
              setDescription("");
              setAvailability("in-stock");
              setNumStock(0);
              setPrice(0);

              if (titleInputRef.current) {
                titleInputRef.current.focus();
              }
            });
          }}
        >
          <div className="py-6 px-4 bg-pink-700 sm:px-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-white">New Listing</h2>
            </div>
            <div className="mt-1">
              <p className="text-sm text-pink-300">
                Get started by filling in the information below to create your
                new listing.
              </p>
            </div>
          </div>
          <div className="px-4 sm:px-6 pb-12">
            <div className="space-y-6 pt-6 pb-5">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-900"
                >
                  Title
                </label>
                <input
                  className="
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      focus:ring-pink-500 focus:border-pink-500
                      border-gray-300
                      rounded-md
                    "
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(ev) => setTitle(ev.target.value)}
                  ref={titleInputRef}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-900"
                >
                  Price
                </label>
                <input
                  className="
                  block
                  w-full
                  shadow-sm
                  sm:text-sm
                  focus:ring-pink-500 focus:border-pink-500
                  border-gray-300
                  rounded-md
                "
                  type="number"
                  id="price"
                  name="price"
                  value={price}
                  onChange={(ev) => setPrice(ev.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <textarea
                  className="
                    block
                    w-full
                    shadow-sm
                    sm:text-sm
                    focus:ring-pink-500 focus:border-pink-500
                    border-gray-300
                    rounded-md
                  "
                  id="description"
                  name="description"
                  value={description}
                  onChange={(ev) => setDescription(ev.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="condition"
                  className="block text-sm font-medium text-gray-900"
                >
                  Condition
                </label>
                <select
                  className="
                    block
                    w-full
                    shadow-sm
                    sm:text-sm
                    focus:ring-pink-500 focus:border-pink-500
                    border-gray-300
                    rounded-md
                  "
                  id="condition"
                  name="condition"
                  value={condition}
                  onChange={(ev) => setCondition(ev.target.value)}
                  required
                >
                  <option value="new">New</option>
                  <option value="used_like-new">Used (like new)</option>
                  <option value="used_good">Used (good)</option>
                  <option value="used_fair">Used (fair)</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="availability"
                  className="block text-sm font-medium text-gray-900"
                >
                  Availability
                </label>
                <select
                  className="
                    block
                    w-full
                    shadow-sm
                    sm:text-sm
                    focus:ring-pink-500 focus:border-pink-500
                    border-gray-300
                    rounded-md
                  "
                  id="availability"
                  name="availability"
                  value={availability}
                  onChange={(ev) => setAvailability(ev.target.value)}
                  required
                >
                  <option value="in-stock">In Stock</option>
                  <option value="single-item">Single Item</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="numOfStock"
                  className="block text-sm font-medium text-gray-900"
                >
                  Number of Available Stock
                </label>
                <input
                  className="
                    block
                    w-full
                    shadow-sm
                    sm:text-sm
                    focus:ring-pink-500 focus:border-pink-500
                    border-gray-300
                    rounded-md
                  "
                  type="number"
                  id="numOfStock"
                  name="numOfStock"
                  value={numStock}
                  onChange={(ev) => setNumStock(ev.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div
            className="
              flex-shrink-0
              px-4
              py-4
              flex
              justify-end
              border-t border-gray-200
            "
          >
            <button
              type="submit"
              className="
                ml-4
                inline-flex
                justify-center
                py-2
                px-4
                border border-transparent
                shadow-sm
                text-sm
                font-medium
                rounded-md
                text-white
                bg-pink-600
                hover:bg-pink-700
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-pink-500
              "
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
