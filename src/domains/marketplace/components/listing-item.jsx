import React from "react";
import PropTypes from "prop-types";
import { Badge } from "../../../components/badge";
import { Button } from "../../../components/button";
import { ShoppingCartIcon } from "@heroicons/react/outline";

const CartButton = (props) => {
  return (
    <Button
      type="button"
      variant="primary"
      title={props.title}
      onClick={props.onClick}
    >
      <ShoppingCartIcon className="h-5 w-5 mr-1.5 text-white-400" />
      ADD TO CART
    </Button>
  );
};

export const ListingItem = (props) => {

  return (
    <div className="relative flex flex-col">
      <div className="group block w-full rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-pink-500 overflow-hidden">
        <img
          src={props.imageUrl}
          alt=""
          className="object-cover pointer-events-none group-hover:opacity-75 h-48 w-full"
        />
        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {props.title}</span>
        </button>
      </div>
      <div className="flex-1 flex md:flex-col justify-between items-start md:items-stretch gap-3 px-2">
        <div className="mt-1 flex-1">
          <div className="flex justify-between items-center gap-3">
            <div>
              {props.currency}{" "}
              <span className="text-2xl font-bold">{props.price}</span>
            </div>
            {props.onlyOne ? (
              <Badge color="red" className="random">Only One</Badge>
            ) : (
              <div className="text-sm text-gray-500">
                {props.availableStock} piece available
              </div>
            )}
          </div>
          <p className="block text-sm font-medium text-gray-900 truncate pointer-events-none">
            {props.title}
          </p>
          <p className="block text-sm font-medium text-gray-500 pointer-events-none">
            {props.description}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 py-3">
          {props.onAddToCart && (
            <CartButton onClick={props.onAddToCart}/>
          )}
        </div>
      </div>
    </div>
  );
};

ListingItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  availableStock: PropTypes.number,
  onlyOne: PropTypes.bool,
};
