import { React } from 'react'
import { Button } from "../../../components/button";
import { Link } from "react-router-dom";

export const MovieItem = (props) => {
  return (
    <div className="relative flex flex-col">

      <div className="group block w-full rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-pink-500 overflow-hidden">
        <img
          src={props.imageUrl}
          alt=""
          className="object-cover pointer-events-none group-hover:opacity-75 h-50 w-full"
        />
      </div>

      <div className="flex-1 flex md:flex-col justify-between items-start md:items-stretch gap-3 px-2">
        
        <div className="mt-1 flex-1">
        <p className="block text-sm font-medium text-gray-900 truncate pointer-events-none">
            {props.releaseDate}
          </p>
          <p className="block text-sm font-medium text-gray-900 truncate pointer-events-none">
            {props.title}
          </p>
          <p className="block text-sm font-medium text-gray-500 pointer-events-none">
            {props.overview}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 py-3">
            <Button 
                variant="primary"
                render={(bProps) => (
                    <Link to={`/movie/${props.movieId}`} {...bProps}>
                        {bProps.children}
                    </Link>
                )}
            >
                LEARN MORE
            </Button>
        </div>

      </div>

    </div>
  );
};
