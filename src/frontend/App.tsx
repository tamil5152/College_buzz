import { Bell, BookOpen, Calendar, ChevronRight, Compass, GraduationCap, Home, LayoutGrid, LogOut, MessageSquare, Plus, Search, Settings, Users, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";
import { DiscoverPage, AcademicsPage, ClubsPage, EventsPage, DiscussionsPage, SettingsPage } from "./pages";
import { api, User } from "../api/client";
import { RizviChatbot } from "./RizviChatbot";
import { motion, AnimatePresence } from "motion/react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string>("student");
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [notices, setNotices] = useState<any[]>([]);
  const [clubs, setClubs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Mock checking local storage or a /me endpoint
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setUserRole(parsedUser.role);
      }
      setIsAuthReady(true);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (!user || !isAuthReady) return;

    const fetchData = async () => {
      const noticesData = await api.getNotices();
      setNotices(noticesData);
      
      const clubsData = await api.getClubs();
      setClubs(clubsData);
    };
    
    fetchData();
  }, [user, isAuthReady]);

  const handleLogout = async () => {
    await api.logout();
    localStorage.removeItem('user');
    setUser(null);
  };

  if (!isAuthReady) {
    return <div className="min-h-screen flex items-center justify-center bg-surface"><div className="animate-pulse w-12 h-12 rounded-full bg-primary/20"></div></div>;
  }

  if (!user) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-surface flex p-4 md:p-6 gap-6 font-sans">
      {/* Sidebar - Glassmorphism */}
      <aside className="hidden md:flex flex-col w-64 bg-surface-lowest/80 backdrop-blur-xl rounded-xl p-4 shadow-[0_10px_40px_-10px_rgba(53,37,205,0.04)] border border-outline-variant/20 sticky top-6 h-[calc(100vh-3rem)]">
        <div className="flex items-center gap-3 px-4 py-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)] ring-1 ring-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent"></div>
            <GraduationCap className="w-6 h-6 relative z-10" />
          </div>
          <span className="font-display font-black text-2xl tracking-tighter bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent">
            College Buzz
          </span>
        </div>

        <nav className="flex-1 space-y-1">
          <NavItem icon={Home} label="Dashboard" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
          <NavItem icon={Compass} label="Discover" active={activeTab === "discover"} onClick={() => setActiveTab("discover")} />
          <NavItem icon={BookOpen} label="Academics" active={activeTab === "academics"} onClick={() => setActiveTab("academics")} />
          <NavItem icon={Users} label="Clubs & Orgs" active={activeTab === "clubs"} onClick={() => setActiveTab("clubs")} />
          <NavItem icon={Calendar} label="Events" active={activeTab === "events"} onClick={() => setActiveTab("events")} />
          <NavItem icon={MessageSquare} label="Discussions" active={activeTab === "discussions"} onClick={() => setActiveTab("discussions")} />
        </nav>

        <div className="mt-auto space-y-1 pt-4 border-t border-outline-variant/20">
          <NavItem icon={Settings} label="Settings" active={activeTab === "settings"} onClick={() => setActiveTab("settings")} />
          <NavItem icon={LogOut} label="Log Out" onClick={handleLogout} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6 max-w-6xl mx-auto w-full">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-low rounded-xl p-4 md:p-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-on-surface">
              Good morning, {user.name?.split(" ")[0] || "Student"}.
            </h1>
            <p className="text-on-surface-variant mt-1 text-sm md:text-base">
              Welcome back to your academic atelier.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search notices & clubs..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 bg-surface-lowest rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none border border-outline-variant/20 focus:border-primary/20 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-on-surface-variant/60"
              />
            </div>
            <button 
              aria-label="Notifications"
              className="p-2.5 bg-surface-lowest rounded-lg border border-outline-variant/20 text-on-surface-variant hover:text-primary transition-colors relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-surface-lowest"></span>
            </button>
          </div>
        </header>

        {/* Dashboard Grid / Pages */}
        {activeTab === "home" && <Dashboard notices={notices} clubs={clubs} searchQuery={searchQuery} userRole={userRole} user={user} setNotices={setNotices} />}
        {activeTab === "discover" && <DiscoverPage searchQuery={searchQuery} />}
        {activeTab === "academics" && <AcademicsPage userRole={userRole} />}
        {activeTab === "clubs" && <ClubsPage clubs={clubs} searchQuery={searchQuery} />}
        {activeTab === "events" && <EventsPage />}
        {activeTab === "discussions" && <DiscussionsPage />}
        {activeTab === "settings" && <SettingsPage user={user} />}
      </main>
      
      {/* Chatbot Widget */}
      <RizviChatbot />
    </div>
  );
}

function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdminTab, setIsAdminTab] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let loggedInUser;
      if (isLogin) {
        loggedInUser = await api.login(email, password);
      } else {
        loggedInUser = await api.register(name || "Student", email, password);
      }
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      // Reload page to trigger auth state check
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Sync Google user with our custom backend
      const loggedInUser = await api.googleLogin(user.displayName || "Google User", user.email || "", user.uid);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Cursor Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(53,37,205,0.08), transparent 40%)`
        }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full bg-surface-lowest/80 backdrop-blur-xl rounded-3xl p-8 shadow-[0_20px_60px_-15px_rgba(53,37,205,0.1)] border border-outline-variant/20 text-center relative z-10"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center text-white shadow-[0_12px_32px_rgba(0,0,0,0.3)] mb-6 ring-1 ring-white/10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent"></div>
          <GraduationCap className="w-10 h-10 relative z-10" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-display font-black text-on-surface mb-3 tracking-tight"
        >
          College Buzz
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-on-surface-variant mb-8 text-sm"
        >
          Your academic atelier. Connect, discover, and thrive.
        </motion.p>

        {/* Tabs */}
        <div className="flex p-1 bg-surface-low rounded-xl mb-6">
          <button 
            onClick={() => setIsAdminTab(false)}
            className={cn("flex-1 py-2 text-sm font-medium rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary", !isAdminTab ? "bg-surface-lowest shadow-sm text-primary" : "text-on-surface-variant hover:text-on-surface")}
          >
            Student
          </button>
          <button 
            onClick={() => setIsAdminTab(true)}
            className={cn("flex-1 py-2 text-sm font-medium rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary", isAdminTab ? "bg-surface-lowest shadow-sm text-primary" : "text-on-surface-variant hover:text-on-surface")}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6 text-left relative">
          <AnimatePresence mode="wait">
            {isAdminTab && (
              <motion.div 
                key="admin-warning"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3 bg-primary/10 text-primary text-xs rounded-lg border border-primary/20 mb-4 overflow-hidden"
              >
                Admin access is restricted to authorized emails (e.g., tamil515253@gmail.com).
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                key="name-field"
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className="overflow-hidden"
              >
                <label className="block text-xs font-medium text-on-surface-variant mb-1 ml-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-surface-low rounded-xl py-3 px-4 text-sm outline-none border border-outline-variant/20 focus:border-primary/30 focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-xs font-medium text-on-surface-variant mb-1 ml-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-surface-low rounded-xl py-3 px-4 text-sm outline-none border border-outline-variant/20 focus:border-primary/30 focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-on-surface-variant mb-1 ml-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-surface-low rounded-xl py-3 px-4 text-sm outline-none border border-outline-variant/20 focus:border-primary/30 focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <AnimatePresence>
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-xs text-center"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-70"
          >
            {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
          </motion.button>
        </form>

        <div className="relative flex items-center py-2 mb-6">
          <div className="flex-grow border-t border-outline-variant/20"></div>
          <span className="flex-shrink-0 mx-4 text-on-surface-variant text-xs">OR</span>
          <div className="flex-grow border-t border-outline-variant/20"></div>
        </div>
        
        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          type="button"
          className="w-full py-3 bg-surface-low hover:bg-surface-dim text-on-surface rounded-xl font-medium flex items-center justify-center gap-3 transition-colors border border-outline-variant/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-70"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <p className="mt-6 text-xs text-on-surface-variant">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-medium hover:underline focus:outline-none">
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}

function Dashboard({ notices, clubs, searchQuery, userRole, user, setNotices }: { notices: any[], clubs: any[], searchQuery: string, userRole: string, user: User, setNotices: any }) {
  const [isAddingNotice, setIsAddingNotice] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newTag, setNewTag] = useState("Academic");
  const [activeQuickLink, setActiveQuickLink] = useState<string | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<any>(null);
  const [selectedClub, setSelectedClub] = useState<any>(null);
  const [showAllNotices, setShowAllNotices] = useState(false);

  const dummyLinkData: Record<string, { title: string, content: React.ReactNode }> = {
    "Canvas": {
      title: "Canvas LMS",
      content: (
        <ul className="space-y-3 text-sm text-on-surface-variant">
          <li className="flex flex-col"><strong className="text-on-surface">Physics Lab Report</strong> <span className="text-red-500">Due Tomorrow at 11:59 PM</span></li>
          <li className="flex flex-col"><strong className="text-on-surface">Math Homework 4</strong> <span className="text-green-600">Graded (95/100)</span></li>
          <li className="flex flex-col"><strong className="text-on-surface">CS Project Phase 1</strong> <span>Due in 3 days</span></li>
        </ul>
      )
    },
    "Schedule": {
      title: "Today's Schedule",
      content: (
        <ul className="space-y-3 text-sm text-on-surface-variant">
          <li className="flex justify-between"><strong className="text-on-surface">09:00 AM</strong> <span>Physics II (Room 304)</span></li>
          <li className="flex justify-between"><strong className="text-on-surface">11:30 AM</strong> <span>Data Structures (Lab 2)</span></li>
          <li className="flex justify-between"><strong className="text-on-surface">02:00 PM</strong> <span>Linear Algebra (Room 102)</span></li>
        </ul>
      )
    },
    "Library": {
      title: "Library Portal",
      content: (
        <div className="text-sm text-on-surface-variant space-y-3">
          <p className="flex justify-between"><strong className="text-on-surface">Borrowed:</strong> <span>"Intro to Algorithms" (Due in 2 days)</span></p>
          <p className="flex justify-between"><strong className="text-on-surface">Fines:</strong> <span className="text-green-600">$0.00</span></p>
          <p className="flex flex-col mt-2"><strong className="text-on-surface">Available Study Rooms:</strong> <span>Room 4B, Room 2A</span></p>
        </div>
      )
    },
    "Directory": {
      title: "Campus Directory",
      content: (
        <ul className="space-y-3 text-sm text-on-surface-variant">
          <li className="flex justify-between"><strong className="text-on-surface">Prof. Smith (Physics)</strong> <span>Room 302</span></li>
          <li className="flex justify-between"><strong className="text-on-surface">Prof. Johnson (CS)</strong> <span>Room 405</span></li>
          <li className="flex justify-between"><strong className="text-on-surface">Dean's Office</strong> <span>Main Block, 1st Floor</span></li>
        </ul>
      )
    }
  };

  const announcements = [
    "Anna University Exam Schedule Announced for Semester 4",
    "Last date for tuition fee payment is Oct 31st",
    "Campus placement drive by TechCorp on Nov 15th",
    "Library will remain closed this Sunday for maintenance",
    "Register for the upcoming Hackathon before Friday!"
  ];

  const handleAddNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;
    try {
      await api.createNotice(newTitle, newDesc, newTag, user.uid);
      const updatedNotices = await api.getNotices();
      setNotices(updatedNotices);
      setIsAddingNotice(false);
      setNewTitle("");
      setNewDesc("");
    } catch (err) {
      console.error("Error adding notice", err);
    }
  };

  const filteredNotices = notices.filter(n => 
    n.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.desc?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.tag?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredClubs = clubs.filter(c => 
    c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.event?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
      {/* Left Column - 2/3 width on large screens */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Notice Board */}
        <section className="bg-surface-lowest rounded-xl p-6 shadow-[0_10px_40px_-10px_rgba(53,37,205,0.02)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold">Campus Notice Board</h2>
            <div className="flex items-center gap-3">
              {userRole === 'admin' && (
                <button 
                  onClick={() => setIsAddingNotice(true)}
                  className="text-sm font-medium bg-primary text-on-primary hover:bg-primary-container transition-colors flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-3 py-1.5"
                >
                  <Plus className="w-4 h-4" /> New Notice
                </button>
              )}
              {filteredNotices.length > 3 && (
                <button 
                  onClick={() => setShowAllNotices(!showAllNotices)} 
                  className="text-sm font-medium text-primary hover:text-primary-container transition-colors flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2 py-1"
                >
                  {showAllNotices ? "Show less" : "View all"} <ChevronRight className={cn("w-4 h-4 transition-transform", showAllNotices && "rotate-90")} />
                </button>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredNotices.length > 0 ? (showAllNotices ? filteredNotices : filteredNotices.slice(0, 3)).map((notice) => (
              <NoticeCard 
                key={notice.id}
                tag={notice.tag} 
                title={notice.title} 
                time={notice.time || (notice.createdAt ? new Date(notice.createdAt).toLocaleDateString() : "Just now")}
                desc={notice.desc}
                onClick={() => setSelectedNotice(notice)}
              />
            )) : (
              <div className="text-center py-8 text-on-surface-variant">
                {searchQuery ? "No notices match your search." : "No notices available."}
              </div>
            )}
          </div>
        </section>

        {/* Club Activities */}
        <section className="bg-surface-lowest rounded-xl p-6 shadow-[0_10px_40px_-10px_rgba(53,37,205,0.02)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold">Club Activities</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-medium cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">All</button>
              <button className="px-3 py-1 bg-surface-low text-on-surface-variant rounded-full text-xs font-medium cursor-pointer hover:bg-outline-variant/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">My Clubs</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredClubs.length > 0 ? filteredClubs.map(club => (
              <ClubCard 
                key={club.id}
                name={club.name} 
                event={club.event || "No upcoming events"}
                time={club.time || "TBD"}
                location={club.location || "TBD"}
                members={club.members || 0}
                onClick={() => setSelectedClub(club)}
              />
            )) : (
              <div className="col-span-full text-center py-8 text-on-surface-variant">
                {searchQuery ? "No clubs match your search." : "No clubs available."}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Right Column - 1/3 width on large screens */}
      <div className="space-y-6">
        
        {/* Exam & Announcements Ticker */}
        <section className="bg-surface-lowest rounded-xl p-6 shadow-[0_10px_40px_-10px_rgba(53,37,205,0.04)] relative overflow-hidden">
          <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Live Updates
          </h2>
          <div className="relative h-[320px] overflow-hidden rounded-lg bg-surface-low/50 border border-outline-variant/20 p-4">
            {/* Gradient masks for smooth fade at top and bottom */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-surface-lowest to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-surface-lowest to-transparent z-10 pointer-events-none"></div>
            
            <motion.div
              animate={{ y: [0, -400] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="space-y-4 pt-4"
            >
              {/* Render announcements twice for seamless looping */}
              {[...announcements, ...announcements].map((text, i) => (
                <div key={i} className="p-3 bg-surface-lowest rounded-lg border border-outline-variant/20 shadow-sm hover:border-primary/30 transition-colors cursor-pointer">
                  <p className="text-sm font-medium text-on-surface leading-snug">{text}</p>
                  <p className="text-xs text-primary mt-1.5 font-medium">Just now</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="bg-surface-lowest rounded-xl p-6 shadow-[0_10px_40px_-10px_rgba(53,37,205,0.02)]">
          <h2 className="text-xl font-display font-bold mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 gap-3">
            <QuickLink icon={LayoutGrid} label="Canvas" onClick={() => setActiveQuickLink("Canvas")} />
            <QuickLink icon={Calendar} label="Schedule" onClick={() => setActiveQuickLink("Schedule")} />
            <QuickLink icon={BookOpen} label="Library" onClick={() => setActiveQuickLink("Library")} />
            <QuickLink icon={Users} label="Directory" onClick={() => setActiveQuickLink("Directory")} />
          </div>
        </section>

      </div>

      {/* Quick Link Modal */}
      {activeQuickLink && dummyLinkData[activeQuickLink] && createPortal(
        <div className="fixed inset-0 bg-surface-lowest/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-surface-lowest border border-outline-variant/20 rounded-2xl p-6 w-full max-w-sm shadow-[0_20px_60px_-15px_rgba(53,37,205,0.1)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display font-bold text-lg">{dummyLinkData[activeQuickLink].title}</h3>
              <button onClick={(e) => { e.stopPropagation(); setActiveQuickLink(null); }} className="p-1 hover:bg-surface-low rounded-md"><X className="w-5 h-5"/></button>
            </div>
            <div className="bg-surface-low rounded-xl p-4 border border-outline-variant/20">
              {dummyLinkData[activeQuickLink].content}
            </div>
            <button onClick={(e) => { e.stopPropagation(); setActiveQuickLink(null); }} className="w-full mt-6 py-2.5 bg-primary text-on-primary rounded-lg font-medium hover:bg-primary-container transition-colors">Close</button>
          </div>
        </div>,
        document.body
      )}

      {/* Add Notice Modal */}
      {isAddingNotice && createPortal(
        <div className="fixed inset-0 bg-surface-lowest/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-surface-lowest border border-outline-variant/20 rounded-2xl p-6 w-full max-w-md shadow-[0_20px_60px_-15px_rgba(53,37,205,0.1)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display font-bold text-lg">Create New Notice</h3>
              <button onClick={(e) => { e.stopPropagation(); setIsAddingNotice(false); }} className="p-1 hover:bg-surface-low rounded-md"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleAddNotice} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-on-surface-variant mb-1 ml-1">Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-surface-low rounded-xl py-2 px-3 text-sm outline-none border border-outline-variant/20 focus:border-primary/30 focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Notice Title"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-on-surface-variant mb-1 ml-1">Tag</label>
                <select 
                  value={newTag}
                  onChange={e => setNewTag(e.target.value)}
                  className="w-full bg-surface-low rounded-xl py-2 px-3 text-sm outline-none border border-outline-variant/20 focus:border-primary/30 focus:ring-2 focus:ring-primary/20 transition-all"
                >
                  <option value="General">General</option>
                  <option value="Academic">Academic</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Event">Event</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-on-surface-variant mb-1 ml-1">Description</label>
                <textarea 
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="w-full bg-surface-low rounded-xl py-2 px-3 text-sm outline-none border border-outline-variant/20 focus:border-primary/30 focus:ring-2 focus:ring-primary/20 transition-all min-h-[100px]"
                  placeholder="Notice Description"
                  required
                />
              </div>
              <button type="submit" className="w-full py-2.5 bg-primary text-on-primary rounded-lg font-medium hover:bg-primary-container transition-colors">Post Notice</button>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* View Notice Modal */}
      {selectedNotice && createPortal(
        <div className="fixed inset-0 bg-surface-lowest/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={(e) => { e.stopPropagation(); setSelectedNotice(null); }}>
          <div className="bg-surface-lowest border border-outline-variant/20 rounded-2xl p-6 w-full max-w-md shadow-[0_20px_60px_-15px_rgba(53,37,205,0.1)]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={cn(
                  "px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2 inline-block",
                  selectedNotice.tag === "Urgent" ? "bg-red-100 text-red-700" : "bg-surface-low text-on-surface-variant"
                )}>
                  {selectedNotice.tag}
                </span>
                <h3 className="font-display font-bold text-xl">{selectedNotice.title}</h3>
                <p className="text-xs text-on-surface-variant mt-1">{selectedNotice.time || (selectedNotice.createdAt ? new Date(selectedNotice.createdAt).toLocaleDateString() : "Just now")}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); setSelectedNotice(null); }} className="p-1 hover:bg-surface-low rounded-md"><X className="w-5 h-5"/></button>
            </div>
            <div className="bg-surface-low rounded-xl p-4 border border-outline-variant/20 text-sm text-on-surface leading-relaxed whitespace-pre-wrap min-h-[100px] max-h-[60vh] overflow-y-auto">
              {selectedNotice.desc || "No description available for this notice."}
            </div>
            <button onClick={(e) => { e.stopPropagation(); setSelectedNotice(null); }} className="w-full mt-6 py-2.5 bg-primary text-on-primary rounded-lg font-medium hover:bg-primary-container transition-colors">Close</button>
          </div>
        </div>,
        document.body
      )}

      {/* View Club Modal */}
      {selectedClub && createPortal(
        <div className="fixed inset-0 bg-surface-lowest/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={(e) => { e.stopPropagation(); setSelectedClub(null); }}>
          <div className="bg-surface-lowest border border-outline-variant/20 rounded-2xl p-6 w-full max-w-md shadow-[0_20px_60px_-15px_rgba(53,37,205,0.1)]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-display font-bold text-xl">{selectedClub.name}</h3>
                <p className="text-xs text-primary font-medium mt-1">{selectedClub.event}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); setSelectedClub(null); }} className="p-1 hover:bg-surface-low rounded-md"><X className="w-5 h-5"/></button>
            </div>
            <div className="bg-surface-low rounded-xl p-4 border border-outline-variant/20 text-sm text-on-surface space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-on-surface-variant" />
                <span><strong>Time:</strong> {selectedClub.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-on-surface-variant" />
                <span><strong>Location:</strong> {selectedClub.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-on-surface-variant" />
                <span><strong>Members:</strong> {selectedClub.members} active members</span>
              </div>
            </div>
            <button onClick={(e) => { e.stopPropagation(); setSelectedClub(null); }} className="w-full mt-6 py-2.5 bg-primary text-on-primary rounded-lg font-medium hover:bg-primary-container transition-colors">Close</button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        active 
          ? "bg-primary-fixed/50 text-primary" 
          : "text-on-surface-variant hover:bg-surface-low hover:text-on-surface"
      )}
    >
      <Icon className={cn(
        "w-5 h-5 transition-transform group-hover:-translate-y-[2px]",
        active ? "text-primary" : "text-on-surface-variant"
      )} />
      {label}
    </button>
  );
}

function NoticeCard({ tag, title, time, desc, onClick }: { key?: string | number, tag: string, title: string, time: string, desc: string, onClick?: () => void }) {
  const isUrgent = tag === "Urgent";
  return (
    <div 
      tabIndex={0}
      onClick={onClick}
      className="group p-4 rounded-xl border border-outline-variant/20 hover:border-primary/20 hover:bg-surface-low/50 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={cn(
            "px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider",
            isUrgent ? "bg-red-100 text-red-700" : "bg-surface-low text-on-surface-variant"
          )}>
            {tag}
          </span>
          <span className="text-xs text-on-surface-variant font-medium">{time}</span>
        </div>
      </div>
      <h3 className="font-display font-bold text-on-surface group-hover:text-primary transition-colors mb-1.5">{title}</h3>
      <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-2">{desc}</p>
    </div>
  );
}

function ClubCard({ name, event, time, location, members, onClick }: { key?: string | number, name: string, event: string, time: string, location: string, members: number, onClick?: () => void }) {
  return (
    <div 
      tabIndex={0}
      onClick={onClick}
      className="p-4 rounded-xl border border-outline-variant/20 hover:shadow-[0_8px_24px_rgba(53,37,205,0.06)] transition-all cursor-pointer bg-surface-lowest group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-bold text-on-surface">{name}</h3>
        <div className="flex -space-x-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-surface-low border-2 border-surface-lowest flex items-center justify-center text-[8px] font-bold text-on-surface-variant">
              {String.fromCharCode(65 + i)}
            </div>
          ))}
          <div className="w-6 h-6 rounded-full bg-surface-low border-2 border-surface-lowest flex items-center justify-center text-[8px] font-bold text-on-surface-variant">
            +{members > 3 ? members - 3 : 0}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-sm font-medium text-primary group-hover:text-primary-container transition-colors">{event}</div>
        <div className="flex items-center gap-3 text-xs text-on-surface-variant">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {time}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-on-surface-variant">
          <span className="flex items-center gap-1"><Compass className="w-3 h-3" /> {location}</span>
        </div>
      </div>
    </div>
  );
}

function CourseProgress({ name, grade, progress }: { name: string, grade: string, progress: number }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-on-surface">{name}</span>
          <span className="text-sm font-bold text-primary">{grade}</span>
        </div>
        <div className="h-1.5 w-full bg-surface-low rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function QuickLink({ icon: Icon, label, onClick }: { icon: any, label: string, onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-outline-variant/20 hover:bg-surface-low hover:border-primary/20 transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
      <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center group-hover:bg-primary-fixed/30 transition-colors">
        <Icon className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
      </div>
      <span className="text-xs font-medium text-on-surface">{label}</span>
    </button>
  );
}


