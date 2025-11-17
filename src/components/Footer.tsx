import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">FP</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Fitness Pro</h3>
                <p className="text-xs text-gray-400">Professional Training</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              O'zbekistonning eng yaxshi professional sportchilari bilan birga mashg'ulot o'ting va o'z maqsadingizga erishing.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Tez Havolalar</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                  Biz Haqimizda
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                  Kurslar
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                  Trenerlar
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                  Narxlar
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Yordam</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                  Qo'llab-quvvatlash
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                  Maxfiylik
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                  Shartlar
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Bog'lanish</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail size={18} />
                <span>info@fitnesspro.uz</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone size={18} />
                <span>+998 90 123 45 67</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <MapPin size={18} />
                <span>Toshkent, O'zbekiston</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Fitness Pro. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
}
