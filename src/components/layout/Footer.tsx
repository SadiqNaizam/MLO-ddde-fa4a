import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingCart, Package, User } from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/cart', label: 'Cart', icon: ShoppingCart },
  { path: '/order-tracking', label: 'Orders', icon: Package },
  { path: '/user-profile', label: 'Profile', icon: User },
];

const Footer: React.FC = () => {
  console.log('Footer component loaded');

  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-700/60 bg-neutral-900/70 backdrop-blur-lg shadow-lg">
      <nav className="container mx-auto flex h-16 max-w-md items-center justify-around px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-2 rounded-md transition-colors duration-200 ease-in-out group
               ${isActive ? 'text-indigo-400' : 'text-neutral-400 hover:text-neutral-100 focus:text-neutral-100'}`
            }
            aria-label={item.label}
          >
            {({ isActive }) => (
              <>
                <item.icon className={`h-5 w-5 mb-0.5 transition-transform duration-200 ease-in-out ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;