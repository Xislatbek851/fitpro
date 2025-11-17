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
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-black">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 bg-white/15 text-white px-4 py-2 rounded-full backdrop-blur hover:bg-white/25 transition text-sm font-semibold flex items-center space-x-2"
        >
          <X size={16} />
          <span>Orqaga</span>
        </button>
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
          <div className="absolute inset-0">
            {embedUrl.includes('youtube.com/embed') ? (
              <iframe
                src={embedUrl}
                className="w-full h-full"
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video controls src={embedUrl} className="w-full h-full" />
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <p className="text-xs sm:text-sm text-orange-600 font-semibold uppercase tracking-wide">
              {courseTitle}
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">{lesson.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-2">
              <div className="flex items-center space-x-2">
                <PlayCircle size={18} />
                <span>{lesson.duration_minutes} daqiqa</span>
              </div>
              <span>{lesson.is_free ? 'Bepul namuna' : 'Premium dars'}</span>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">{lesson.description}</p>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-3">
            <h4 className="text-lg font-semibold text-gray-900">Darsdan nimalar olasiz?</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Amaliy ko&apos;rsatmalar va professional texnikalar</li>
              <li>Trener tomonidan qayta ishlash uchun asosiy topshiriqlar</li>
              <li>Keyingi mashg&apos;ulotlarga tayyorlov bo&apos;yicha tavsiyalar</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-bold text-gray-900">Sharhlar</h4>
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <img
                  src={review.avatar_url}
                  alt={review.reviewer_name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{review.reviewer_name}</p>
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
  );
}

