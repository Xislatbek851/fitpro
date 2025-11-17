import { useEffect, useState } from 'react';
import { supabase, type Category } from '../lib/supabase';
import {
  Dumbbell,
  Apple,
  TrendingUp,
  TrendingDown,
  Trophy,
  HeartPulse,
} from 'lucide-react';

const iconMap: Record<string, any> = {
  dumbbell: Dumbbell,
  apple: Apple,
  'trending-up': TrendingUp,
  'trending-down': TrendingDown,
  trophy: Trophy,
  'heart-pulse': HeartPulse,
};

type CategoriesProps = {
  onSelectCategory: (categoryId: string) => void;
};

export default function Categories({ onSelectCategory }: CategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('order_index');

    if (!error && data) {
      setCategories(data);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Kurs Kategoriyalari
          </h2>
          <p className="text-xl text-gray-600">
            O'zingizga mos yo'nalishni tanlang
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Dumbbell;
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 text-left"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-bl-full"></div>

                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="text-white" size={32} />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {category.name_uz}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="mt-6 flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all">
                    <span>Ko'proq</span>
                    <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
