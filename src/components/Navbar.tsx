import { User, LogIn, Menu, X } from 'lucide-react';
import { useState } from 'react';

type NavbarProps = {
  user: any;
  onLoginClick: () => void;
  onLogout: () => void;
};

export default function Navbar({ user, onLoginClick, onLogout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">FP</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Fitness Pro</h1>
              <p className="text-xs text-gray-500">Professional Training</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition">Kurslar</a>
            <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition">Kategoriyalar</a>
            <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition">Haqida</a>

            {user ? (
              <div className="flex items-center space-x-4">
                <a href="#dashboard" className="text-gray-700 hover:text-orange-600 font-medium transition">
                  Dashboard
                </a>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                >
                  <User size={18} />
                  <span className="text-sm">Chiqish</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <LogIn size={18} />
                <span>Kirish</span>
              </button>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <a href="#" className="block text-gray-700 hover:text-orange-600 font-medium py-2">Kurslar</a>
            <a href="#" className="block text-gray-700 hover:text-orange-600 font-medium py-2">Kategoriyalar</a>
            <a href="#" className="block text-gray-700 hover:text-orange-600 font-medium py-2">Haqida</a>

            {user ? (
              <>
                <a href="#dashboard" className="block text-gray-700 hover:text-orange-600 font-medium py-2">
                  Dashboard
                </a>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                >
                  <User size={18} />
                  <span>Chiqish</span>
                </button>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="w-full flex items-center justify-center space-x-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <LogIn size={18} />
                <span>Kirish</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
