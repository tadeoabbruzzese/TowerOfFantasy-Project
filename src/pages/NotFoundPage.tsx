import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="mb-8 text-primary/20">
        <svg
          className="w-32 h-32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Page Not Found</h1>
      
      <p className="text-foreground/70 text-lg max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/"
          className="btn btn-primary"
        >
          <Home size={18} className="mr-2" />
          Back to Home
        </Link>
        
        <button 
          onClick={() => window.history.back()}
          className="btn btn-outline"
        >
          <ArrowLeft size={18} className="mr-2" />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;