import { React } from 'react'
import { ShoppingBagIcon } from '@heroicons/react/outline'

export const EmptyCart = () => {
    return (
        <div className="px-4 sm:px-6 pb-12">
        <div className="pt-6 pb-5">
          <div id="no-cart-item-message">
            <div className="p-4 text-center">
              <ShoppingBagIcon className="inline-block w-12 h-12 text-gray-300"/>
            </div>
            <p className="text-center text-gray-500">
              There is no item in your shopping cart.
            </p>
          </div>
        </div>
      </div>
    )
}
