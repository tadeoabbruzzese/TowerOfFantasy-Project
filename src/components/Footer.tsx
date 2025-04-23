import React from 'react';
import { Link } from 'react-router-dom';
import { TowerControl, Github, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-bold mb-4">
              <TowerControl className="text-energy h-6 w-6" />
              <span>Tower of Fantasy</span>
            </Link>
            <p className="text-sm text-foreground/70">
              An unofficial wiki for Tower of Fantasy. All game content, images, and names are property of their respective owners.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary">Characters</Link></li>
              <li><Link to="/tier-list" className="hover:text-primary">Tier List</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary">Official Game Site</a></li>
              <li><a href="#" className="hover:text-primary">Community Discord</a></li>
              <li><a href="#" className="hover:text-primary">Report an Issue</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/70">
            © {new Date().getFullYear()} Tower of Fantasy Wiki. Not affiliated with Hotta Studio or Level Infinite.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/tadeoabbruzzese" className="text-foreground/70 hover:text-primary">
              <Github className="h-5 w-5" />
            </a>
            <span className="text-sm flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-error" /> by Tadeo Abbruzzese
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;