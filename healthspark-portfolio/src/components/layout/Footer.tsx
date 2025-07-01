
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-20 border-t border-gray-100">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Emma Hayes</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Senior product designer with a background in biomedical engineering, 
              passionate about healthcare innovation.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-highlight transition-colors">
                  Work
                </Link>
              </li>
              <li>
                <Link to="/process" className="text-sm hover:text-highlight transition-colors">
                  Process
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-highlight transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm hover:text-highlight transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-highlight transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-highlight transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-highlight transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="/resume.pdf" 
                target="_blank"
                className="text-gray-600 hover:text-highlight transition-colors"
              >
                <FileText size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Emma Hayes. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Designed and developed with care
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
