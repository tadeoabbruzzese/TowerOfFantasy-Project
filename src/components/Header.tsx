import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TowerControl, Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-border' : 'bg-background/50 border-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <TowerControl className="text-energy h-6 w-6" />
          <span>Tower of Fantasy</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/">Characters</NavLink>
          <NavLink to="/tier-list">Tier List</NavLink>
          
          <div className="relative ml-4">
            <SearchBar className="w-48" />
          </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container py-4 flex flex-col gap-4">
            <MobileNavLink to="/">Characters</MobileNavLink>
            <MobileNavLink to="/tier-list">Tier List</MobileNavLink>
            
            <div className="relative mt-2">
              <SearchBar />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink = ({ to, children }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={`relative py-1 transition-colors ${
        isActive ? 'text-primary' : 'hover:text-primary-light'
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
      )}
    </Link>
  );
};

const MobileNavLink = ({ to, children }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={`block py-2 px-4 rounded-md ${
        isActive ? 'bg-card text-primary' : 'hover:bg-card hover:text-primary-light'
      }`}
    >
      {children}
    </Link>
  );
};

export default Header;