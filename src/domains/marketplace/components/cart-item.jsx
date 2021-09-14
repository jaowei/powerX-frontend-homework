import React from 'react'
import { Button } from '../../../components/button';
import { TrashIcon } from "@heroicons/react/outline";

const DeleteButton = (props) => (
    <Button variant="borderless" onClick={props.onClick}>
        <TrashIcon className="h-5 w-5 mr-1.5 text-white-400"/>
    </Button>       
)

export const CartItem = (props) => {
    return (
        <li className="flex px-4 sm:px-6 py-4">
            <img 
                className="h-10 w-10 rounded-full"
                src={props.imageUrl} 
                alt="" 
            />
            <div className="flex-1 flex justify-between items-center ml-3">
                <div>
                    <p className="text-sm font-medium text-gray-900">{props.title}</p>
                    <p className="text-sm text-gray-500">${props.price} X {props.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                    <div>${props.price * props.quantity}</div>
                    <DeleteButton onClick={props.onDelete} />
                </div>
            </div>
        </li>
    );
}