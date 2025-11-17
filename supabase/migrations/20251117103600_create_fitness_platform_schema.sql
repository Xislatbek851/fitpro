/*
  # Professional Fitness Platform Database Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name_uz` (text) - Category name in Uzbek
      - `name_en` (text) - Category name in English
      - `description` (text) - Category description
      - `icon` (text) - Icon identifier
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz)
    
    - `courses`
      - `id` (uuid, primary key)
      - `category_id` (uuid, foreign key)
      - `title` (text) - Course title
      - `description` (text) - Course description
      - `instructor_name` (text) - Instructor name
      - `instructor_bio` (text) - Instructor biography
      - `instructor_image` (text) - Instructor photo URL
      - `thumbnail` (text) - Course thumbnail URL
      - `duration_weeks` (integer) - Course duration in weeks
      - `difficulty_level` (text) - beginner, intermediate, advanced
      - `price` (numeric) - Course price
      - `is_featured` (boolean) - Featured course flag
      - `created_at` (timestamptz)
    
    - `lessons`
      - `id` (uuid, primary key)
      - `course_id` (uuid, foreign key)
      - `title` (text) - Lesson title
      - `description` (text) - Lesson description
      - `video_url` (text) - Video URL
      - `duration_minutes` (integer) - Lesson duration
      - `order_index` (integer) - Lesson order
      - `is_free` (boolean) - Free preview flag
      - `created_at` (timestamptz)
    
    - `user_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `lesson_id` (uuid, foreign key)
      - `completed` (boolean) - Completion status
      - `last_watched_position` (integer) - Video position in seconds
      - `completed_at` (timestamptz)
      - `created_at` (timestamptz)
    
    - `enrollments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `course_id` (uuid, foreign key)
      - `enrolled_at` (timestamptz)
      - `expires_at` (timestamptz)
      - `status` (text) - active, expired, cancelled

  2. Security
    - Enable RLS on all tables
    - Public read access for categories and courses
    - Authenticated users can view their own progress and enrollments
    - Users can update their own progress
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_uz text NOT NULL,
  name_en text NOT NULL,
  description text DEFAULT '',
  icon text DEFAULT '',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text DEFAULT '',
  instructor_name text NOT NULL,
  instructor_bio text DEFAULT '',
  instructor_image text DEFAULT '',
  thumbnail text DEFAULT '',
  duration_weeks integer DEFAULT 4,
  difficulty_level text DEFAULT 'beginner',
  price numeric DEFAULT 0,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text DEFAULT '',
  video_url text DEFAULT '',
  duration_minutes integer DEFAULT 0,
  order_index integer DEFAULT 0,
  is_free boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  completed boolean DEFAULT false,
  last_watched_position integer DEFAULT 0,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  status text DEFAULT 'active',
  UNIQUE(user_id, course_id)
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view courses"
  ON courses FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view lessons"
  ON lessons FOR SELECT
  USING (true);

CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own enrollments"
  ON enrollments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can enroll in courses"
  ON enrollments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

INSERT INTO categories (name_uz, name_en, description, icon, order_index) VALUES
  ('Mashqlar', 'Exercises', 'Professional mashqlar dasturlari va texnikalari', 'dumbbell', 1),
  ('To''g''ri ovqatlanish', 'Nutrition', 'Sport dietologiyasi va ovqatlanish rejalari', 'apple', 2),
  ('Mass olish', 'Bulking', 'Toza massa to''plash bo''yicha kurslar', 'trending-up', 3),
  ('Ozish', 'Cutting', 'Yog'' yoqish va og''irlikni kamaytirish', 'trending-down', 4),
  ('Musobaqaga tayyorgarlik', 'Competition Prep', 'Professional musobaqalarga tayyorgarlik', 'trophy', 5),
  ('Reabilitatsiya', 'Recovery', 'Shikastlanishdan tiklanish va profilaktika', 'heart-pulse', 6);