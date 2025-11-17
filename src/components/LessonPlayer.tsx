import { X, PlayCircle, Star } from 'lucide-react';
import type { Lesson, CourseReview } from '../lib/supabase';

type LessonPlayerProps = {
  lesson: Lesson;
  courseTitle: string;
  reviews: CourseReview[];
  onClose: () => void;
};

function getEmbedUrl(url: string) {
  if (!url) return '';
  const youtubeMatch = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
  );
  if (youtubeMatch?.[1]) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}?rel=0`;
  }
  return url;
}

export default function LessonPlayer({ lesson, courseTitle, reviews, onClose }: LessonPlayerProps) {
  const embedUrl = getEmbedUrl(lesson.video_url);

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition"
        >
          <X size={20} />
        </button>
        <div className="relative bg-black rounded-t-3xl">
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <div className="absolute inset-0">
              {embedUrl.includes('youtube.com/embed') ? (
                <iframe
                  src={embedUrl}
                  className="w-full h-full rounded-t-3xl"
                  title={lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video controls src={embedUrl} className="w-full h-full rounded-t-3xl" />
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 p-5">
          <div className="md:col-span-2 space-y-5">
            <div>
              <p className="text-xs sm:text-sm text-orange-600 font-semibold uppercase tracking-wide">
                {courseTitle}
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{lesson.title}</h3>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <PlayCircle size={18} />
                  <span>{lesson.duration_minutes} daqiqa</span>
                </div>
                <span>{lesson.is_free ? 'Bepul namuna' : 'Premium dars'}</span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{lesson.description}</p>

            <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900">Darsdan nimalar olasiz?</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                <li>Amaliy ko&apos;rsatmalar va professional texnikalar</li>
                <li>Trener tomonidan qayta ishlash uchun asosiy topshiriqlar</li>
                <li>Keyingi mashg&apos;ulotlarga tayyorlov bo&apos;yicha tavsiyalar</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-bold text-gray-900">Sharhlar</h4>
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="border border-gray-100 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center space-x-3">
                  <img
                    src={review.avatar_url}
                    alt={review.reviewer_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">{review.reviewer_name}</p>
                    <p className="text-xs text-gray-500">{review.reviewer_title}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-orange-500 mt-3">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm font-semibold">{review.rating}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
              </div>
            ))}
            {reviews.length > 3 && (
              <p className="text-xs text-gray-500">
                Yana {reviews.length - 3} ta sharh kurs sahifasida mavjud.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

