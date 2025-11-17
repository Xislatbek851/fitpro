import { createClient } from '@supabase/supabase-js';
import { createMockSupabaseClient } from './mockSupabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockSupabaseClient();

export type Category = {
  id: string;
  name_uz: string;
  name_en: string;
  description: string;
  icon: string;
  order_index: number;
  created_at: string;
};

export type Course = {
  id: string;
  category_id: string;
  title: string;
  description: string;
  instructor_name: string;
  instructor_bio: string;
  instructor_image: string;
  thumbnail: string;
  duration_weeks: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  is_featured: boolean;
  created_at: string;
};

export type Lesson = {
  id: string;
  course_id: string;
  title: string;
  description: string;
  video_url: string;
  duration_minutes: number;
  order_index: number;
  is_free: boolean;
  created_at: string;
};

export type CourseReview = {
  id: string;
  course_id: string;
  reviewer_name: string;
  reviewer_title: string;
  rating: number;
  comment: string;
  avatar_url: string;
  created_at: string;
};

export type UserProgress = {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  last_watched_position: number;
  completed_at: string | null;
  created_at: string;
};

export type Enrollment = {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  expires_at: string | null;
  status: 'active' | 'expired' | 'cancelled';
};
