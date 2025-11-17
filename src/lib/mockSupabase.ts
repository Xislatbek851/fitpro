const storageKey = 'fitpro-mock-session';

type MockSession = {
  user: {
    id: string;
    email: string;
  };
};

type TableName = 'categories' | 'courses' | 'lessons' | 'enrollments' | 'course_reviews';

const now = new Date().toISOString();

const seedData: Record<TableName, any[]> = {
  categories: [
    {
      id: 'cat-training',
      name_uz: 'Mashqlar',
      name_en: 'Exercises',
      description: 'Professional mashqlar dasturlari va texnikalari',
      icon: 'dumbbell',
      order_index: 1,
      created_at: now,
    },
    {
      id: 'cat-nutrition',
      name_uz: 'To\'g\'ri ovqatlanish',
      name_en: 'Nutrition',
      description: 'Sport dietologiyasi va ovqatlanish rejalari',
      icon: 'apple',
      order_index: 2,
      created_at: now,
    },
    {
      id: 'cat-bulking',
      name_uz: 'Mass olish',
      name_en: 'Bulking',
      description: 'Toza massa to\'plash bo\'yicha kurslar',
      icon: 'trending-up',
      order_index: 3,
      created_at: now,
    },
  ],
  courses: [
    {
      id: 'course-functional-strength',
      category_id: 'cat-training',
      title: 'Functional Strength 101',
      description: '6 haftalik dastur orqali asosiy kuch, barqarorlik va to\'g\'ri texnikani o\'rganing.',
      instructor_name: 'Jasur Asadov',
      instructor_bio: '10 yillik tajribaga ega master-trener va funksional harakatlar bo\'yicha mutaxassis.',
      instructor_image: 'https://images.pexels.com/photos/5327534/pexels-photo-5327534.jpeg?auto=compress&cs=tinysrgb&w=200',
      thumbnail: 'https://images.pexels.com/photos/4753648/pexels-photo-4753648.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration_weeks: 6,
      difficulty_level: 'beginner',
      price: 350000,
      is_featured: true,
      created_at: now,
    },
    {
      id: 'course-mobility-power',
      category_id: 'cat-training',
      title: 'Power & Mobility Fusion',
      description: 'Eksploziv kuch va bo\'g\'im harakatchanligini uyg\'unlashtiruvchi zamonaviy dastur.',
      instructor_name: 'Nafisa Sadullayeva',
      instructor_bio: 'CrossFit Level 2 murabbiyi va sport fizioterapevti.',
      instructor_image: 'https://images.pexels.com/photos/3757375/pexels-photo-3757375.jpeg?auto=compress&cs=tinysrgb&w=200',
      thumbnail: 'https://images.pexels.com/photos/3076516/pexels-photo-3076516.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration_weeks: 5,
      difficulty_level: 'intermediate',
      price: 420000,
      is_featured: true,
      created_at: now,
    },
    {
      id: 'course-athletic-core',
      category_id: 'cat-training',
      title: 'Athletic Core Systems',
      description: 'Stabilizatsiya, core kuchi va sportga mos eksplozivlikni oshirish dasturi.',
      instructor_name: 'Bobur Yigitali',
      instructor_bio: 'Sport fiziologi va professional strength & conditioning treneri.',
      instructor_image: 'https://images.pexels.com/photos/2261482/pexels-photo-2261482.jpeg?auto=compress&cs=tinysrgb&w=200',
      thumbnail: 'https://images.pexels.com/photos/799182/pexels-photo-799182.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration_weeks: 4,
      difficulty_level: 'intermediate',
      price: 390000,
      is_featured: false,
      created_at: now,
    },
    {
      id: 'course-smart-fuel',
      category_id: 'cat-nutrition',
      title: 'Smart Fuel System',
      description: 'Makro balans, vaqtlanish va sportchilar uchun amaliy ovqatlanish strategiyalari.',
      instructor_name: 'Akmal Qayum',
      instructor_bio: 'Sport dietologiyasi bo\'yicha PhD va milliy terma jamoa maslahatchisi.',
      instructor_image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200',
      thumbnail: 'https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration_weeks: 4,
      difficulty_level: 'beginner',
      price: 280000,
      is_featured: true,
      created_at: now,
    },
    {
      id: 'course-metabolic-chef',
      category_id: 'cat-nutrition',
      title: 'Metabolic Chef Lab',
      description: 'Sportchilar uchun oshxona logistikasidan boshlab, mikroelementlar balansigacha bo\'lgan to\'liq dastur.',
      instructor_name: 'Dilshod Alimov',
      instructor_bio: 'Performance nutritionist va professional oshpaz.',
      instructor_image: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=200',
      thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration_weeks: 5,
      difficulty_level: 'intermediate',
      price: 360000,
      is_featured: false,
      created_at: now,
    },
    {
      id: 'course-lean-mass',
      category_id: 'cat-bulking',
      title: 'Lean Mass Accelerator',
      description: 'Tabiiy massani oshirish uchun kuchli dastur: trening, ovqatlanish va tiklanish.',
      instructor_name: 'Bekzod Karimov',
      instructor_bio: 'IFBB Pro Classic Physique sportchisi va murabbiy.',
      instructor_image: 'https://images.pexels.com/photos/2261485/pexels-photo-2261485.jpeg?auto=compress&cs=tinysrgb&w=200',
      thumbnail: 'https://images.pexels.com/photos/3076514/pexels-photo-3076514.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration_weeks: 8,
      difficulty_level: 'intermediate',
      price: 540000,
      is_featured: false,
      created_at: now,
    },
    {
      id: 'course-power-mass',
      category_id: 'cat-bulking',
      title: 'Power Mass Blueprint',
      description: 'Og\'ir atletika prinsiplarini bodibilding bilan uyg\'unlashtirib, tez massa yig\'ing.',
      instructor_name: 'Sevinch Rahmonova',
      instructor_bio: 'Strength coach va sport farmakologiyasi bo\'yicha maslahatchi.',
      instructor_image: 'https://images.pexels.com/photos/6456152/pexels-photo-6456152.jpeg?auto=compress&cs=tinysrgb&w=200',
      thumbnail: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration_weeks: 7,
      difficulty_level: 'advanced',
      price: 580000,
      is_featured: true,
      created_at: now,
    },
  ],
  lessons: [
    {
      id: 'lesson-strength-1',
      course_id: 'course-functional-strength',
      title: 'Kuch mashg\'ulotlariga kirish',
      description: 'Nazariy asoslar, xavfsizlik va to\'g\'ri nafas olish.',
      video_url: 'https://www.youtube.com/watch?v=UItWltVZZmE',
      duration_minutes: 18,
      order_index: 1,
      is_free: true,
      created_at: now,
    },
    {
      id: 'lesson-strength-2',
      course_id: 'course-functional-strength',
      title: 'To\'liq tana mashg\'ulotlari',
      description: 'Shtanga va tana vaznidan foydalangan kompleks sessiya.',
      video_url: 'https://www.youtube.com/watch?v=ml6cT4AZdqI',
      duration_minutes: 25,
      order_index: 2,
      is_free: false,
      created_at: now,
    },
    {
      id: 'lesson-strength-3',
      course_id: 'course-functional-strength',
      title: 'Progressiv yuklama',
      description: 'Og\'irlikni bosqichma-bosqich oshirish va tiklanish rejasi.',
      video_url: 'https://www.youtube.com/watch?v=1J8x4c6w5Kk',
      duration_minutes: 22,
      order_index: 3,
      is_free: false,
      created_at: now,
    },
    {
      id: 'lesson-mobility-1',
      course_id: 'course-mobility-power',
      title: 'Bo\'g\'imlarni uyg\'otish',
      description: 'Mobilizatsiya va nevromuskulyar aktivatsiya protokoli.',
      video_url: 'https://www.youtube.com/watch?v=RXc8x33Zt12',
      duration_minutes: 16,
      order_index: 1,
      is_free: true,
      created_at: now,
    },
    {
      id: 'lesson-mobility-2',
      course_id: 'course-mobility-power',
      title: 'Eksploziv kuch bloki',
      description: 'Plyometriklar va kettlebell komplekslari.',
      video_url: 'https://www.youtube.com/watch?v=HFGx4dTnFoI',
      duration_minutes: 24,
      order_index: 2,
      is_free: false,
      created_at: now,
    },
    {
      id: 'lesson-mobility-3',
      course_id: 'course-mobility-power',
      title: 'Regeneratsiya va mobilitet',
      description: 'Yog\'och tayoq, foam roller va nafas protokoli.',
      video_url: 'https://www.youtube.com/watch?v=voR1lY6cwGc',
      duration_minutes: 20,
      order_index: 3,
      is_free: false,
      created_at: now,
    },
    {
      id: 'lesson-athletic-1',
      course_id: 'course-athletic-core',
      title: 'Core anatomiyasi',
      description: 'Chuqur core mushaklarini faollashtirish va testlardan o\'tish.',
      video_url: 'https://www.youtube.com/watch?v=HrkKIvC8u8c',
      duration_minutes: 17,
      order_index: 1,
      is_free: true,
      created_at: now,
    },
    {
      id: 'lesson-athletic-2',
      course_id: 'course-athletic-core',
      title: 'Rotatsion kuch',
      description: 'Medbol, kabel mashqlari va anti-rotatsion drilllar.',
      video_url: 'https://www.youtube.com/watch?v=ANQw22Ygm0I',
      duration_minutes: 23,
      order_index: 2,
      is_free: false,
      created_at: now,
    },
    {
      id: 'lesson-athletic-3',
      course_id: 'course-athletic-core',
      title: 'Sportga mos conditioning',
      description: 'Interval protokollar va yurak urishini nazorat qilish.',
      video_url: 'https://www.youtube.com/watch?v=Lx1lS3Vmaec',
      duration_minutes: 21,
      order_index: 3,
      is_free: false,
      created_at: now,
    },
    {
      id: 'lesson-nutrition-1',
      course_id: 'course-smart-fuel',
      title: 'Makro balans asoslari',
      description: 'Oqsil, yog\' va uglevod ulushlarini hisoblash formulalari.',
      video_url: 'https://www.youtube.com/watch?v=sGZsS0J5p3Q',
      duration_minutes: 19,
      order_index: 1,
      is_free: true,
      created_at: now,
    },
    {
      id: 'lesson-nutrition-2',
      course_id: 'course-smart-fuel',
      title: 'Ovqatlanish vaqtlanishi',
      description: 'Trening oldi va keyingi ovqatlanish ssenariylari.',
      video_url: 'https://www.youtube.com/watch?v=ydZc17rlR5E',
      duration_minutes: 21,
      order_index: 2,
      is_free: false,
      created_at: now,
    },
    {
      id: 'lesson-nutrition-3',
      course_id: 'course-smart-fuel',
      title: 'Gormon balansini qo\'llab-quvvatlash',
      description: 'Uyqu, stress va qo\'shimchalar bilan ishlash.',
      video_url: 'https://www.youtube.com/watch?v=9mvw2Agx_Qk',
      duration_minutes: 23,
      order_index: 3,
      is_free: false,
      created_at: now,
    },
    {
      id: 'lesson-metabolic-1',
      course_id: 'course-metabolic-chef',
      title: 'Oshxonani tizimlashtirish',
      description: 'Batch cooking va meal prep logistikasi.',
      video_url: 'https://www.youtube.com/watch?v=bw1G7wDFk2U',
      duration_minutes: 18,
      order_index: 1,
      is_free: true,
      created_at: now,
    },
    {
      id: 'lesson-metabolic-2',
      course_id: 'course-metabolic-chef',
      title: 'Mikroelementlar ustasi',
      description: 'Vitamin va mineral ehtiyojini individual hisoblash.',
      video_url: 'https://www.youtube.com/watch?v=Vv1-6Q671O0',
      duration_minutes: 24,
      order_index: 2,
      is_free: false,
      created_at: now,
    },
    {
      id: 'lesson-metabolic-3',
      course_id: 'course-metabolic-chef',
      title: 'Ta\'m va performans',
      description: 'Spetsiyalar, glikemiya va hazmni optimallashtirish.',
      video_url: 'https://www.youtube.com/watch?v=k6NsMBR0VNk',
      duration_minutes: 22,
      order_index: 3,
      is_free: false,
      created_at: now,
    },
    {
      id: 'lesson-bulking-1',
      course_id: 'course-lean-mass',
      title: 'Gipertrofiya poydevori',
      description: 'Texnika tekshiruvi va mushak mind-muscle bog\'lanishi.',
      video_url: 'https://www.youtube.com/watch?v=Dy28eq2PjcM',
      duration_minutes: 26,
      order_index: 1,
      is_free: true,
      created_at: now,
    },
    {
      id: 'lesson-bulking-2',
      course_id: 'course-lean-mass',
      title: 'Kaloriya ortig\'i va refeed',
      description: 'Massa olish davrida metabolizmni qo\'llab-quvvatlash.',
      video_url: 'https://www.youtube.com/watch?v=1zgBXw8D3_8',
      duration_minutes: 28,
      order_index: 2,
      is_free: false,
      created_at: now,
    },
    {
      id: 'lesson-bulking-3',
      course_id: 'course-lean-mass',
      title: 'Kuchli push/pull/legs',
      description: 'Haftalik split va progress monitoringi.',
      video_url: 'https://www.youtube.com/watch?v=7L1D1xK6QyI',
      duration_minutes: 30,
      order_index: 3,
      is_free: false,
      created_at: now,
    },
    {
      id: 'lesson-power-mass-1',
      course_id: 'course-power-mass',
      title: 'Powerlifting texnikasi',
      description: 'Squat, bench va deadlift bo\'yicha chuqur tahlil.',
      video_url: 'https://www.youtube.com/watch?v=QhVC_AnZYYM',
      duration_minutes: 27,
      order_index: 1,
      is_free: true,
      created_at: now,
    },
    {
      id: 'lesson-power-mass-2',
      course_id: 'course-power-mass',
      title: 'Gibrid split',
      description: 'Og\'ir kunlar va volumeli kunlar periodizatsiyasi.',
      video_url: 'https://www.youtube.com/watch?v=JXGymXrJ8Vg',
      duration_minutes: 25,
      order_index: 2,
      is_free: false,
      created_at: now,
    },
    {
      id: 'lesson-power-mass-3',
      course_id: 'course-power-mass',
      title: 'Biologik tiklanish',
      description: 'Stress markerlarini kuzatish va aktiv tiklanish.',
      video_url: 'https://www.youtube.com/watch?v=RZQX4x4XQ0M',
      duration_minutes: 23,
      order_index: 3,
      is_free: false,
      created_at: now,
    },
  ],
  enrollments: [],
  course_reviews: [
    {
      id: 'review-1',
      course_id: 'course-functional-strength',
      reviewer_name: 'Murod Sodiqov',
      reviewer_title: 'Triathlon sportchisi',
      rating: 5,
      comment: 'Texnikani birma-bir tushuntirib bergani uchun mashqlar sifati oshdi.',
      avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      created_at: now,
    },
    {
      id: 'review-2',
      course_id: 'course-functional-strength',
      reviewer_name: 'Aziza Qodirova',
      reviewer_title: 'Fitness blogger',
      rating: 4.5,
      comment: 'Progressiv yuklama jadvali juda qulay, ammo qo\'shimcha PDF kerak bo\'lardi.',
      avatar_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      created_at: now,
    },
    {
      id: 'review-3',
      course_id: 'course-mobility-power',
      reviewer_name: 'Beknur Turdaliyev',
      reviewer_title: 'Basketbol murabbiyi',
      rating: 5,
      comment: 'Plyometrik bloklar jamoaviy mashg\'ulotlarga moslashgan.',
      avatar_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
      created_at: now,
    },
    {
      id: 'review-4',
      course_id: 'course-smart-fuel',
      reviewer_name: 'Mohira Saidova',
      reviewer_title: 'Sport dietologi',
      rating: 4.8,
      comment: 'Ovqatlanish vaqtlanishi bo\'limi amaliy misollar bilan to\'la.',
      avatar_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
      created_at: now,
    },
    {
      id: 'review-5',
      course_id: 'course-metabolic-chef',
      reviewer_name: 'Sirojiddin Jumayev',
      reviewer_title: 'Meal prep tadbirkori',
      rating: 4.7,
      comment: 'Oshxona logistikasiga bo\'lgan yondashuv biznesimga ilhom berdi.',
      avatar_url: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100',
      created_at: now,
    },
    {
      id: 'review-6',
      course_id: 'course-lean-mass',
      reviewer_name: 'Alibek Rustamov',
      reviewer_title: 'Classic physique havaskori',
      rating: 4.6,
      comment: 'Refeed strategiyasi tufayli massa olish jarayoni aniq bo\'ldi.',
      avatar_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
      created_at: now,
    },
    {
      id: 'review-7',
      course_id: 'course-power-mass',
      reviewer_name: 'Kamola Ernazarova',
      reviewer_title: 'Powerlifting chempioni',
      rating: 5,
      comment: 'Gibrid split meni musobaqaga tayyorladi, natijalar super!',
      avatar_url: 'https://images.pexels.com/photos/4326900/pexels-photo-4326900.jpeg?auto=compress&cs=tinysrgb&w=100',
      created_at: now,
    },
  ],
};

let mockSession: MockSession | null = loadSession();

function loadSession(): MockSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persistSession() {
  if (typeof window === 'undefined') return;
  try {
    if (mockSession) {
      window.localStorage.setItem(storageKey, JSON.stringify(mockSession));
    } else {
      window.localStorage.removeItem(storageKey);
    }
  } catch {
    // ignore storage errors
  }
}

type QueryState = {
  table: TableName;
  filters: Array<(row: any) => boolean>;
  order?: { column: string; ascending: boolean };
  limit?: number;
  single?: boolean;
  maybeSingle?: boolean;
};

function evaluateQuery(state: QueryState) {
  let rows = [...seedData[state.table]];
  state.filters.forEach((filter) => {
    rows = rows.filter(filter);
  });

  if (state.order) {
    rows.sort((a, b) => {
      const dir = state.order!.ascending ? 1 : -1;
      if (a[state.order!.column] < b[state.order!.column]) return -1 * dir;
      if (a[state.order!.column] > b[state.order!.column]) return 1 * dir;
      return 0;
    });
  }

  if (typeof state.limit === 'number') {
    rows = rows.slice(0, state.limit);
  }

  if (state.single) {
    if (rows.length === 0) {
      return { data: null, error: new Error('Ma\'lumot topilmadi') };
    }
    if (rows.length > 1) {
      return { data: null, error: new Error('Bir nechta natija topildi') };
    }
    return { data: rows[0], error: null };
  }

  if (state.maybeSingle) {
    return { data: rows[0] ?? null, error: null };
  }

  return { data: rows, error: null };
}

function createQueryBuilder(table: TableName) {
  const state: QueryState = {
    table,
    filters: [],
  };

  const builder: any = {
    select() {
      return builder;
    },
    eq(column: string, value: any) {
      state.filters.push((row) => row[column] === value);
      return builder;
    },
    order(column: string, options?: { ascending?: boolean }) {
      state.order = { column, ascending: options?.ascending !== false };
      return builder;
    },
    limit(count: number) {
      state.limit = count;
      return builder;
    },
    single() {
      state.single = true;
      return builder;
    },
    maybeSingle() {
      state.maybeSingle = true;
      return builder;
    },
    then(onFulfilled: (value: any) => any, onRejected?: (reason: any) => any) {
      return Promise.resolve(evaluateQuery(state)).then(onFulfilled, onRejected);
    },
    catch(onRejected: (reason: any) => any) {
      return Promise.resolve(evaluateQuery(state)).catch(onRejected);
    },
    finally(onFinally: () => void) {
      return Promise.resolve(evaluateQuery(state)).finally(onFinally);
    },
  };

  return builder;
}

function handleInsert(table: TableName, payload: any) {
  const rows = Array.isArray(payload) ? payload : [payload];
  rows.forEach((row) => {
    const entry = {
      id: row.id ?? `${table}-${Date.now()}`,
      ...row,
      created_at: row.created_at ?? new Date().toISOString(),
    };
    seedData[table].push(entry);
  });
  return { data: rows, error: null };
}

export function createMockSupabaseClient() {
  return {
    auth: {
      async getSession() {
        return { data: { session: mockSession }, error: null };
      },
      onAuthStateChange(callback: (event: string, session: MockSession | null) => void) {
        callback(mockSession ? 'SIGNED_IN' : 'SIGNED_OUT', mockSession);
        return {
          data: {
            subscription: {
              unsubscribe() {
                /* no-op */
              },
            },
          },
        };
      },
      async signInWithPassword({ email }: { email: string }) {
        mockSession = {
          user: {
            id: 'mock-user',
            email,
          },
        };
        persistSession();
        return { data: { session: mockSession }, error: null };
      },
      async signUp({ email }: { email: string }) {
        return this.signInWithPassword({ email });
      },
      async signOut() {
        mockSession = null;
        persistSession();
        return { error: null };
      },
    },
    from(table: TableName) {
      const builder: any = createQueryBuilder(table);
      builder.insert = (payload: any) => Promise.resolve(handleInsert(table, payload));
      return builder;
    },
  };
}

