import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">

      <img
        src="/images/errorPageMascot.png"
        alt="Not Found"
        className="w-1/2 max-w-md mt-6"
      />

      <h2 className="text-3xl font-semibold mt-4">Page Not Found 🦊😿</h2>
      <p className="text-gray-600 mt-2 text-lg">
        The page you are looking for doesn't exist or has been moved.
      </p>
      
      <Link to="/">
        <Button className="mt-6 bg-blue-400 hover:bg-blue-300 text-white font-bold py-3 px-6 rounded-lg text-lg">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
