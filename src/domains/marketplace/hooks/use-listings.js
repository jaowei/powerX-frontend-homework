import { useEffect, useState } from "react";

const getListings = () =>
  fetch(`https://ecomm-service.herokuapp.com/marketplace`)
    .then((res) =>
        res.json()
    );

export const useListings = () => {
    const [listings, setListings] = useState([]);

    const loadListings = () => 
        getListings().then((data) => setListings(data));

    useEffect(() => {
        loadListings();
    }, []);

    return {
        listings,
        loadListings,
    };
};