import { useEffect, useState } from 'react';
import { supabase, type Course } from '../lib/supabase';
import { Clock, Users, Star, TrendingUp } from 'lucide-react';

type FeaturedCoursesProps = {
  onSelectCourse: (courseId: string) => void;
};

export default function FeaturedCourses({ onSelectCourse }: FeaturedCoursesProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedCourses();
  }, []);

  async function loadFeaturedCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('is_featured', true)
      .limit(6);

    if (!error && data) {
      setCourses(data);
    }
    setLoading(false);
  }

  const getDifficultyBadge = (level: string) => {
    const styles = {
      beginner: 'bg-green-100 text-green-700',
      intermediate: 'bg-orange-100 text-orange-700',
      advanced: 'bg-red-100 text-red-700',
    };
    const labels = {
      beginner: 'Boshlang\'ich',
      intermediate: 'O\'rta',
      advanced: 'Yuqori',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[level as keyof typeof styles]}`}>
        {labels[level as keyof typeof labels]}
      </span>
    );
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mashhur Kurslar
            </h2>
            <p className="text-xl text-gray-600">
              Eng ko'p tanlanayotgan dasturlar
            </p>
          </div>
          <button className="hidden md:block px-6 py-3 border-2 border-orange-500 text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition">
            Barchasini Ko'rish
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => onSelectCourse(course.id)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.thumbnail || 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600'}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  {getDifficultyBadge(course.difficulty_level)}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-2 text-white">
                    <img
                      src={course.instructor_image || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'}
                      alt={course.instructor_name}
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <span className="font-semibold text-sm">{course.instructor_name}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{course.duration_weeks} hafta</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users size={16} />
                      <span>1.2K</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-orange-500">
                    <Star size={16} fill="currentColor" />
                    <span className="font-semibold text-sm">4.9</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      {course.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500 ml-1">so'm</span>
                  </div>
                  <TrendingUp className="text-green-500" size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
