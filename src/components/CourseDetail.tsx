import { useEffect, useState } from 'react';
import { supabase, type Course, type Lesson, type CourseReview } from '../lib/supabase';
import LessonPlayer from './LessonPlayer';
import {
  X,
  Clock,
  Users,
  Star,
  PlayCircle,
  CheckCircle,
  Lock,
  Award,
  TrendingUp,
} from 'lucide-react';

type CourseDetailProps = {
  courseId: string;
  onClose: () => void;
  user: any;
};

export default function CourseDetail({ courseId, onClose, user }: CourseDetailProps) {
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [enrolled, setEnrolled] = useState(false);
  const [reviews, setReviews] = useState<CourseReview[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourseData();
  }, [courseId, user]);

  async function loadCourseData() {
    const { data: courseData } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .maybeSingle();

    const { data: lessonsData } = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', courseId)
      .order('order_index');

    if (user) {
      const { data: enrollmentData } = await supabase
        .from('enrollments')
        .select('*')
        .eq('course_id', courseId)
        .eq('user_id', user.id)
        .maybeSingle();

      setEnrolled(!!enrollmentData);
    }

    const { data: reviewsData } = await supabase
      .from('course_reviews')
      .select('*')
      .eq('course_id', courseId)
      .order('created_at', { ascending: false });

    if (courseData) setCourse(courseData);
    if (lessonsData) setLessons(lessonsData);
    if (reviewsData) setReviews(reviewsData);
    setLoading(false);
  }

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / (reviews.length || 1);

  const handleEnroll = async () => {
    if (!user) {
      alert('Iltimos, avval tizimga kiring');
      return;
    }

    const { error } = await supabase.from('enrollments').insert({
      user_id: user.id,
      course_id: courseId,
      status: 'active',
    });

    if (!error) {
      setEnrolled(true);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="relative">
        <div className="relative h-96 bg-gradient-to-br from-gray-900 to-gray-800">
          <img
            src={course.thumbnail || 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1200'}
            alt={course.title}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-6 right-6 bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/20 transition"
          >
            <X size={24} />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-start space-x-6">
                <img
                  src={course.instructor_image || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200'}
                  alt={course.instructor_name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-xl"
                />
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {course.title}
                  </h1>
                  <p className="text-xl text-gray-200 mb-4">
                    {course.instructor_name} bilan
                  </p>
                  <div className="flex items-center space-x-6 text-white">
                    <div className="flex items-center space-x-2">
                      <Clock size={20} />
                      <span>{course.duration_weeks} hafta</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users size={20} />
                      <span>2.5K o'quvchi</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star size={20} fill="currentColor" />
                      <span>4.9 (328 baho)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Kurs Haqida
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {course.description}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Trener Haqida
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {course.instructor_bio || 'Professional trener va tajribali bodybuilder'}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Darslar ({lessons.length})
                </h2>
                <div className="space-y-4">
                  {lessons.map((lesson, index) => {
                    const canPlay = lesson.is_free || enrolled;
                    return (
                      <div
                        key={lesson.id}
                        className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {lesson.title}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {lesson.duration_minutes} daqiqa
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => {
                                if (!canPlay) {
                                  alert('Bu dars faqat kursga yozilganlar uchun ochiq');
                                  return;
                                }
                                setActiveLesson(lesson);
                              }}
                              className={`p-3 rounded-full border transition ${
                                canPlay
                                  ? 'border-orange-500 text-orange-600 hover:bg-orange-50'
                                  : 'border-gray-200 text-gray-400 cursor-not-allowed'
                              }`}
                              type="button"
                              aria-label={canPlay ? 'Videoni ochish' : 'Yopiq dars'}
                              disabled={!canPlay}
                            >
                              {canPlay ? <PlayCircle size={20} /> : <Lock size={18} />}
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-3">
                          {lesson.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Sharhlar</h2>
                  <div className="flex items-center space-x-2 text-orange-500 font-semibold">
                    <Star size={20} fill="currentColor" />
                    <span>
                      {averageRating.toFixed(1)} / 5 ({reviews.length} ta)
                    </span>
                  </div>
                </div>
                {reviews.length === 0 ? (
                  <p className="text-gray-500">Hali sharhlar qo\'shilmagan.</p>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center space-x-4">
                          <img
                            src={review.avatar_url}
                            alt={review.reviewer_name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">
                              {review.reviewer_name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {review.reviewer_title}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-3 text-orange-500">
                          <Star size={16} fill="currentColor" />
                          <span className="font-semibold">{review.rating}</span>
                        </div>
                        <p className="text-gray-700 mt-2">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-6 bg-white border-2 border-gray-200 rounded-2xl p-6 space-y-6 shadow-lg">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {course.price.toLocaleString()} so'm
                  </div>
                  <p className="text-gray-500">Bir martalik to'lov</p>
                </div>

                {enrolled ? (
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <CheckCircle className="mx-auto text-green-500 mb-2" size={32} />
                      <p className="font-semibold text-green-700">
                        Siz bu kursga yozilgansiz
                      </p>
                    </div>
                    <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all">
                      Davom Ettirish
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleEnroll}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                  >
                    Kursga Yozilish
                  </button>
                )}

                <div className="border-t border-gray-200 pt-6 space-y-4">
                  <h3 className="font-bold text-gray-900">
                    Kurs Ichida:
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Award className="text-orange-500" size={20} />
                      <span className="text-gray-700">Sertifikat</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <PlayCircle className="text-orange-500" size={20} />
                      <span className="text-gray-700">{lessons.length} video dars</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="text-orange-500" size={20} />
                      <span className="text-gray-700">Progress tracking</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="text-orange-500" size={20} />
                      <span className="text-gray-700">Community access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {activeLesson && course && (
        <LessonPlayer
          lesson={activeLesson}
          courseTitle={course.title}
          reviews={reviews}
          onClose={() => setActiveLesson(null)}
        />
      )}
    </div>
  );
}
