fitpro
========

## Boshlash

1. `cp .env.example .env` buyrug'i bilan namunaviy konfiguratsiyani nusxalang.
2. Supabase loyihangizdagi `Project URL` va `anon public key` ma'lumotlarini mos ravishda `VITE_SUPABASE_URL` va `VITE_SUPABASE_ANON_KEY` o'zgaruvchilariga yozing.
3. Bog'liqliklarni o'rnatish uchun `npm install` ni ishga tushiring.
4. Loyihani lokalda ishga tushirish: `npm run dev`.

> Agar `.env` faylini to'ldirmasangiz ham ilova ishlaydi — bu holatda tizim avtomatik tarzda ichki "mock" Supabase mijozidan foydalanadi va demo ma'lumotlarni ko'rsatadi. Ammo haqiqiy Supabase bilan ishlash uchun yuqoridagi o'zgaruvchilarni to'ldirish zarur.

## Muammolarni bartaraf etish

- Agar brauzer konsolida `supabaseUrl is required` yoki `Supabase konfiguratsiyasi yetishmayapti` xabari chiqsa, `.env` faylida yuqoridagi o'zgaruvchilar to'g'ri to'ldirilganini tekshiring va Vite serverini qayta ishga tushiring.
