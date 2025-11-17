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

CREATE TABLE IF NOT EXISTS course_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  reviewer_name text NOT NULL,
  reviewer_title text DEFAULT '',
  rating numeric DEFAULT 5,
  comment text DEFAULT '',
  avatar_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;

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

CREATE POLICY "Anyone can view course reviews"
  ON course_reviews FOR SELECT
  USING (true);

INSERT INTO categories (name_uz, name_en, description, icon, order_index) VALUES
  ('Mashqlar', 'Exercises', 'Professional mashqlar dasturlari va texnikalari', 'dumbbell', 1),
  ('To''g''ri ovqatlanish', 'Nutrition', 'Sport dietologiyasi va ovqatlanish rejalari', 'apple', 2),
  ('Mass olish', 'Bulking', 'Toza massa to''plash bo''yicha kurslar', 'trending-up', 3);

INSERT INTO courses (
  category_id,
  title,
  description,
  instructor_name,
  instructor_bio,
  instructor_image,
  thumbnail,
  duration_weeks,
  difficulty_level,
  price,
  is_featured
) VALUES
  (
    (SELECT id FROM categories WHERE name_en = 'Exercises' LIMIT 1),
    'Functional Strength 101',
    '6 haftalik dastur orqali asosiy kuch, barqarorlik va to''g''ri texnikani o''rganing.',
    'Jasur Asadov',
    '10 yillik tajribaga ega master-trener va funksional harakatlar bo''yicha mutaxassis.',
    'https://images.pexels.com/photos/5327534/pexels-photo-5327534.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/4753648/pexels-photo-4753648.jpeg?auto=compress&cs=tinysrgb&w=800',
    6,
    'beginner',
    350000,
    true
  ),
  (
    (SELECT id FROM categories WHERE name_en = 'Exercises' LIMIT 1),
    'Power & Mobility Fusion',
    'Eksploziv kuch va bo''g''im harakatchanligini uyg''unlashtiruvchi zamonaviy dastur.',
    'Nafisa Sadullayeva',
    'CrossFit Level 2 murabbiyi va sport fizioterapevti.',
    'https://images.pexels.com/photos/3757375/pexels-photo-3757375.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/3076516/pexels-photo-3076516.jpeg?auto=compress&cs=tinysrgb&w=800',
    5,
    'intermediate',
    420000,
    true
  ),
  (
    (SELECT id FROM categories WHERE name_en = 'Exercises' LIMIT 1),
    'Athletic Core Systems',
    'Stabilizatsiya, core kuchi va sportga mos eksplozivlikni oshirish dasturi.',
    'Bobur Yigitali',
    'Sport fiziologi va professional strength & conditioning treneri.',
    'https://images.pexels.com/photos/2261482/pexels-photo-2261482.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/799182/pexels-photo-799182.jpeg?auto=compress&cs=tinysrgb&w=800',
    4,
    'intermediate',
    390000,
    false
  ),
  (
    (SELECT id FROM categories WHERE name_en = 'Nutrition' LIMIT 1),
    'Smart Fuel System',
    'Makro balans, vaqtlanish va sportchilar uchun amaliy ovqatlanish strategiyalari.',
    'Akmal Qayum',
    'Sport dietologiyasi bo''yicha PhD va milliy terma jamoa maslahatchisi.',
    'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=800',
    4,
    'beginner',
    280000,
    true
  ),
  (
    (SELECT id FROM categories WHERE name_en = 'Nutrition' LIMIT 1),
    'Metabolic Chef Lab',
    'Sportchilar uchun oshxona logistikasidan boshlab, mikroelementlar balansigacha bo''lgan to''liq dastur.',
    'Dilshod Alimov',
    'Performance nutritionist va professional oshpaz.',
    'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    5,
    'intermediate',
    360000,
    false
  ),
  (
    (SELECT id FROM categories WHERE name_en = 'Bulking' LIMIT 1),
    'Lean Mass Accelerator',
    'Tabiiy massani oshirish uchun kuchli dastur: trening, ovqatlanish va tiklanish.',
    'Bekzod Karimov',
    'IFBB Pro Classic Physique sportchisi va murabbiy.',
    'https://images.pexels.com/photos/2261485/pexels-photo-2261485.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/3076514/pexels-photo-3076514.jpeg?auto=compress&cs=tinysrgb&w=800',
    8,
    'intermediate',
    540000,
    false
  ),
  (
    (SELECT id FROM categories WHERE name_en = 'Bulking' LIMIT 1),
    'Power Mass Blueprint',
    'Og''ir atletika prinsiplarini bodibilding bilan uyg''unlashtirib, tez massa yig''ing.',
    'Sevinch Rahmonova',
    'Strength coach va sport farmakologiyasi bo''yicha maslahatchi.',
    'https://images.pexels.com/photos/6456152/pexels-photo-6456152.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=800',
    7,
    'advanced',
    580000,
    true
  );
-- Ozish, Musobaqaga tayyorgarlik va Reabilitatsiya kurslari olib tashlandi

INSERT INTO lessons (
  course_id,
  title,
  description,
  video_url,
  duration_minutes,
  order_index,
  is_free
) VALUES
  (
    (SELECT id FROM courses WHERE title = 'Functional Strength 101' LIMIT 1),
    'Kuch mashg''ulotlariga kirish',
    'Nazariy asoslar, xavfsizlik va to''g''ri nafas olish.',
    'https://www.youtube.com/watch?v=UItWltVZZmE',
    18,
    1,
    true
  ),
  (
    (SELECT id FROM courses WHERE title = 'Functional Strength 101' LIMIT 1),
    'To''liq tana mashg''ulotlari',
    'Shtanga va tana vaznidan foydalangan kompleks sessiya.',
    'https://www.youtube.com/watch?v=ml6cT4AZdqI',
    25,
    2,
    false
  ),
  (
    (SELECT id FROM courses WHERE title = 'Functional Strength 101' LIMIT 1),
    'Progressiv yuklama',
    'Og''irlikni bosqichma-bosqich oshirish va tiklanish rejasi.',
    'https://www.youtube.com/watch?v=1J8x4c6w5Kk',
    22,
    3,
    false
  ),
  (
    (SELECT id FROM courses WHERE title = 'Power & Mobility Fusion' LIMIT 1),
    'Bo''g''imlarni uyg''otish',
    'Mobilizatsiya va nevromuskulyar aktivatsiya protokoli.',
    'https://www.youtube.com/watch?v=RXc8x33Zt12',
    16,
    1,
    true
  ),
  (
    (SELECT id FROM courses WHERE title = 'Power & Mobility Fusion' LIMIT 1),
    'Eksploziv kuch bloki',
    'Plyometriklar va kettlebell komplekslari.',
    'https://www.youtube.com/watch?v=HFGx4dTnFoI',
    24,
    2,
    false
  ),
  (
    (SELECT id FROM courses WHERE title = 'Power & Mobility Fusion' LIMIT 1),
    'Regeneratsiya va mobilitet',
    'Yog''och tayoq, foam roller va nafas protokoli.',
    'https://www.youtube.com/watch?v=voR1lY6cwGc',
    20,
    3,
    false
  ),
  (
    (SELECT id FROM courses WHERE title = 'Athletic Core Systems' LIMIT 1),
    'Core anatomiyasi',
    'Chuqur core mushaklarini faollashtirish va testlardan o''tish.',
    'https://www.youtube.com/watch?v=HrkKIvC8u8c',
    17,
    1,
    true
  ),
  (
    (SELECT id FROM courses WHERE title = 'Athletic Core Systems' LIMIT 1),
    'Rotatsion kuch',
    'Medbol, kabel mashqlari va anti-rotatsion drilllar.',
    'https://www.youtube.com/watch?v=ANQw22Ygm0I',
    23,
    2,
    false
  ),
  (
    (SELECT id FROM courses WHERE title = 'Athletic Core Systems' LIMIT 1),
    'Sportga mos conditioning',
    'Interval protokollar va yurak urishini nazorat qilish.',
    'https://www.youtube.com/watch?v=Lx1lS3Vmaec',
    21,
    3,
    false
  ),
  (
    (SELECT id FROM courses WHERE title = 'Smart Fuel System' LIMIT 1),
    'Makro balans asoslari',
    'Oqsil, yog'' va uglevod ulushlarini hisoblash formulalari.',
    'https://www.youtube.com/watch?v=sGZsS0J5p3Q',
    19,
    1,
    true
  ),
  (
    (SELECT id FROM courses WHERE title = 'Smart Fuel System' LIMIT 1),
    'Ovqatlanish vaqtlanishi',
    'Trening oldi va keyingi ovqatlanish ssenariylari.',
    'https://www.youtube.com/watch?v=ydZc17rlR5E',
    21,
    2,
    false
  ),
  (
    (SELECT id FROM courses WHERE title = 'Smart Fuel System' LIMIT 1),
    'Gormon balansini qo''llab-quvvatlash',
    'Uyqu, stress va qo''shimchalar bilan ishlash.',
    'https://www.youtube.com/watch?v=9mvw2Agx_Qk',
    23,
    3,
    false
  ),
  (
    (SELECT id FROM courses WHERE title = 'Metabolic Chef Lab' LIMIT 1),
    'Oshxonani tizimlashtirish',
    'Batch cooking va meal prep logistikasi.',
    'https://www.youtube.com/watch?v=bw1G7wDFk2U',
    18,
    1,
    true
  ),
  (
    (SELECT id FROM courses WHERE title = 'Metabolic Chef Lab' LIMIT 1),
    'Mikroelementlar ustasi',
    'Vitamin va mineral ehtiyojini individual hisoblash.',
    'https://www.youtube.com/watch?v=Vv1-6Q671O0',
    24,
    2,
    false
  ),
  (
    (SELECT id FROM courses WHERE title = 'Metabolic Chef Lab' LIMIT 1),
    'Ta''m va performans',
    'Spetsiyalar, glikemiya va hazmni optimallashtirish.',
    'https://www.youtube.com/watch?v=k6NsMBR0VNk',
    22,
    3,
    false
  ),
  (
    (SELECT id FROM courses WHERE title = 'Lean Mass Accelerator' LIMIT 1),
    'Gipertrofiya poydevori',
    'Texnika tekshiruvi va mushak mind-muscle bog''lanishi.',
    'https://www.youtube.com/watch?v=Dy28eq2PjcM',
    26,
    1,
    true
  ),
  (
    (SELECT id FROM courses WHERE title = 'Lean Mass Accelerator' LIMIT 1),
    'Kaloriya ortig''i va refeed',
    'Massa olish davrida metabolizmni qo''llab-quvvatlash.',
    'https://www.youtube.com/watch?v=1zgBXw8D3_8',
    28,
    2,
    false
  ),
  (
    (SELECT id FROM courses WHERE title = 'Lean Mass Accelerator' LIMIT 1),
    'Kuchli push/pull/legs',
    'Haftalik split va progress monitoringi.',
    'https://www.youtube.com/watch?v=7L1D1xK6QyI',
    30,
    3,
    false
  ),
  (
    (SELECT id FROM courses WHERE title = 'Power Mass Blueprint' LIMIT 1),
    'Powerlifting texnikasi',
    'Squat, bench va deadlift bo''yicha chuqur tahlil.',
    'https://www.youtube.com/watch?v=QhVC_AnZYYM',
    27,
    1,
    true
  ),
  (
    (SELECT id FROM courses WHERE title = 'Power Mass Blueprint' LIMIT 1),
    'Gibrid split',
    'Og''ir kunlar va volumeli kunlar periodizatsiyasi.',
    'https://www.youtube.com/watch?v=JXGymXrJ8Vg',
    25,
    2,
    false
  ),
  (
    (SELECT id FROM courses WHERE title = 'Power Mass Blueprint' LIMIT 1),
    'Biologik tiklanish',
    'Stress markerlarini kuzatish va aktiv tiklanish.',
    'https://www.youtube.com/watch?v=RZQX4x4XQ0M',
    23,
    3,
    false
  );
-- Ozish, Musobaqaga tayyorgarlik va Reabilitatsiya kurslari uchun darslar olib tashlandi

INSERT INTO course_reviews (
  course_id,
  reviewer_name,
  reviewer_title,
  rating,
  comment,
  avatar_url
) VALUES
  (
    (SELECT id FROM courses WHERE title = 'Functional Strength 101' LIMIT 1),
    'Murod Sodiqov',
    'Triathlon sportchisi',
    5,
    'Texnikani birma-bir tushuntirib bergani uchun mashqlar sifati oshdi.',
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
  ),
  (
    (SELECT id FROM courses WHERE title = 'Functional Strength 101' LIMIT 1),
    'Aziza Qodirova',
    'Fitness blogger',
    4.5,
    'Progressiv yuklama jadvali juda qulay, ammo qo''shimcha PDF kerak bo''lardi.',
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
  ),
  (
    (SELECT id FROM courses WHERE title = 'Power & Mobility Fusion' LIMIT 1),
    'Beknur Turdaliyev',
    'Basketbol murabbiyi',
    5,
    'Plyometrik bloklar jamoaviy mashg''ulotlarga moslashgan.',
    'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100'
  ),
  (
    (SELECT id FROM courses WHERE title = 'Smart Fuel System' LIMIT 1),
    'Mohira Saidova',
    'Sport dietologi',
    4.8,
    'Ovqatlanish vaqtlanishi bo''limi amaliy misollar bilan to''la.',
    'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100'
  ),
  (
    (SELECT id FROM courses WHERE title = 'Metabolic Chef Lab' LIMIT 1),
    'Sirojiddin Jumayev',
    'Meal prep tadbirkori',
    4.7,
    'Oshxona logistikasiga bo''lgan yondashuv biznesimga ilhom berdi.',
    'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100'
  ),
  (
    (SELECT id FROM courses WHERE title = 'Lean Mass Accelerator' LIMIT 1),
    'Alibek Rustamov',
    'Classic physique havaskori',
    4.6,
    'Refeed strategiyasi tufayli massa olish jarayoni aniq bo''ldi.',
    'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100'
  ),
  (
    (SELECT id FROM courses WHERE title = 'Power Mass Blueprint' LIMIT 1),
    'Kamola Ernazarova',
    'Powerlifting chempioni',
    5,
    'Gibrid split meni musobaqaga tayyorladi, natijalar super!',
    'https://images.pexels.com/photos/4326900/pexels-photo-4326900.jpeg?auto=compress&cs=tinysrgb&w=100'
  );