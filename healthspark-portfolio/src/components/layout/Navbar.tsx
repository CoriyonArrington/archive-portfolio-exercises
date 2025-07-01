
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-opacity hover:opacity-80"
        >
          <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center text-white font-medium">
            EH
          </div>
          <span className="text-lg font-medium">Emma Hayes</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-10">
          <Link 
            to="/projects" 
            className="text-sm font-medium transition-colors hover:text-highlight"
          >
            Work
          </Link>
          <Link 
            to="/services" 
            className="text-sm font-medium transition-colors hover:text-highlight"
          >
            Services
          </Link>
          <Link 
            to="/process" 
            className="text-sm font-medium transition-colors hover:text-highlight"
          >
            Process
          </Link>
          <Link 
            to="/about" 
            className="text-sm font-medium transition-colors hover:text-highlight"
          >
            About
          </Link>
        </nav>
        
        <Button
          variant="default"
          size="sm"
          className="bg-black hover:bg-black/90 text-white rounded-full px-6 transition-all hover:shadow-smooth"
        >
          Book a call
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
