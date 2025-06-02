import React from "react";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-950 text-primary-100 px-4">
      <AlertTriangle className="w-16 h-16 text-secondary-0 mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-lg text-primary-400 mb-6 text-center">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block bg-[#435468] text-white px-6 py-3 rounded-xl font-semibold hover:bg-secondary-100 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
