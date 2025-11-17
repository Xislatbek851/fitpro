import { Dumbbell, Trophy, Target } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-orange-500/20 rounded-full border border-orange-500/30 backdrop-blur-sm">
              <span className="text-orange-400 text-sm font-semibold">O'zbekistonning Eng Yaxshi Bodybuilderlari</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Professional <span className="text-orange-500">Fitness</span> Platformasi
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              Tajribali trenerlar bilan birga o'z maqsadlaringizga erishing. Mass olish, ozish, musobaqaga tayyorgarlik va ko'p narsalar.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all">
                Boshlash
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all">
                Kurslarni Ko'rish
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Dumbbell className="text-orange-500" size={24} />
                </div>
                <h3 className="font-bold text-2xl">500+</h3>
                <p className="text-gray-400 text-sm">Video Darslar</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Trophy className="text-orange-500" size={24} />
                </div>
                <h3 className="font-bold text-2xl">50+</h3>
                <p className="text-gray-400 text-sm">Professional Trenerlar</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Target className="text-orange-500" size={24} />
                </div>
                <h3 className="font-bold text-2xl">10K+</h3>
                <p className="text-gray-400 text-sm">Faol O'quvchilar</p>
              </div>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Bodybuilder"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                    <Trophy className="text-white" size={32} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Hozirgi Kurs</p>
                    <h4 className="text-lg font-bold">Mass Olish Dasturi</h4>
                    <div className="mt-2 w-48 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-3/5 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-500 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-red-600 rounded-full blur-3xl opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
