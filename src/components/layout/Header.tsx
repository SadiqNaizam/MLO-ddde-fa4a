import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, Search, Bell, User } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header component loaded');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 md:px-6 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm border-b border-neutral-200/60 dark:border-neutral-800/60">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors">
        <Package className="h-6 w-6 text-primary" />
        <span className="hidden sm:inline-block">AppLogo</span>
      </Link>

      {/* Navigation Icons */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Search"
          className="text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-neutral-100"
          onClick={() => console.log('Search icon clicked')}
        >
          <Search className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-neutral-100"
          onClick={() => console.log('Notifications icon clicked')}
        >
          <Bell className="h-5 w-5" />
          {/* Optional: Add a badge for notification count */}
          {/* <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span> */}
        </Button>

        <Link to="/user-profile">
          <Button
            variant="ghost"
            size="icon"
            aria-label="User Profile"
            className="text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            <User className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;