import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedCourses from './components/FeaturedCourses';
import CourseDetail from './components/CourseDetail';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setUser(session?.user ?? null);
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleSelectCategory = (categoryId: string) => {
    console.log('Selected category:', categoryId);
  };

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        user={user}
        onLoginClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />

      {selectedCourseId ? (
        <CourseDetail
          courseId={selectedCourseId}
          onClose={() => setSelectedCourseId(null)}
          user={user}
        />
      ) : (
        <>
          <Hero />
          <Categories onSelectCategory={handleSelectCategory} />
          <FeaturedCourses onSelectCourse={handleSelectCourse} />
          <Footer />
        </>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => console.log('Auth success')}
      />
    </div>
  );
}

export default App;
