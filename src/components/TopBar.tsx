import { MessageCircle, ChevronLeft, Menu, Heart } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMessagesPage = location.pathname === '/messages';
  const isSearchPage = location.pathname === '/search';
  const isCompanyProfile = location.pathname.startsWith('/company/');
  const isTradePage = location.pathname === '/trade';
  const isProfilePage = location.pathname === '/profile';
  const fromPath = location.state?.from;
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Don't render the top bar on search page
  if (isSearchPage) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 5) {
        // Scrolling up with threshold
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down and past 50px
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`fixed top-0 left-0 right-0 bg-background/90 backdrop-blur-md z-50 transition-transform duration-300 ease-out border-b border-border/30 ${isVisible || isTradePage ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-2xl mx-auto flex items-center justify-between px-3 h-12">
        {/* Left */}
        <div className="flex items-center lg:hidden w-9">
          {isCompanyProfile && fromPath ? (
            <button 
              onClick={() => navigate(fromPath)}
              className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-muted/50 transition-colors active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
            </button>
          ) : isProfilePage ? (
            <button 
              onClick={() => navigate('/settings')}
              className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-muted/50 transition-colors active:scale-95"
            >
              <Menu className="w-5 h-5" strokeWidth={2} />
            </button>
          ) : (
            <button 
              onClick={() => {
                const currentMode = localStorage.getItem('navMode') || 'left';
                localStorage.setItem('notificationsPreviousMode', currentMode);
                navigate('/notifications');
              }}
              className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-muted/50 transition-colors active:scale-95 relative"
            >
              <Heart className="w-5 h-5" strokeWidth={2} />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-destructive rounded-full"></span>
            </button>
          )}
        </div>

        {/* Center */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="font-cursive text-xl text-foreground">
            Atmosphere
          </h1>
        </div>

        {/* Right */}
        <div className="flex items-center lg:hidden w-9">
          <button 
            onClick={() => {
              const currentMode = localStorage.getItem('navMode') || 'left';
              localStorage.setItem('messagesPreviousMode', currentMode);
              navigate('/messages');
            }}
            className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-muted/50 transition-colors active:scale-95 relative"
          >
            <MessageCircle 
              className={`w-5 h-5 ${isMessagesPage ? 'fill-primary text-primary' : ''}`}
              strokeWidth={2} 
            />
            <span className="absolute top-0 right-0 min-w-[16px] h-4 px-0.5 bg-destructive rounded-full flex items-center justify-center text-[9px] font-semibold text-white">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
