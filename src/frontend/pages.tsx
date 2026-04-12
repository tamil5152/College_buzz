import React, { useState } from "react";
import { createPortal } from "react-dom";
import { BookOpen, Calendar, Compass, MessageSquare, Users, ChevronRight, TrendingUp, ArrowRight, Star, Flame, FileText, Download, ChevronDown, Clock, Award, File, X, Bell } from "lucide-react";
import { User } from "../api/client";

export function DiscoverPage({ searchQuery = "" }: { searchQuery?: string }) {
  const [activeTab, setActiveTab] = useState("Trending");
  const [selectedContent, setSelectedContent] = useState<any>(null);

  const q = searchQuery.toLowerCase();

  // Mock Data
  const newsArticles = [
    { id: 1, title: "New Science Building Opening Next Month", date: "Oct 10", category: "Campus", desc: "The state-of-the-art facility will house 20 new labs.", image: "https://picsum.photos/seed/science/400/300" },
    { id: 2, title: "Tuition Freeze Announced for 2027", date: "Oct 08", category: "Admin", desc: "University president announces no tuition increase for the next academic year.", image: "https://picsum.photos/seed/admin/400/300" },
    { id: 3, title: "Local Coffee Shop Offers Student Discounts", date: "Oct 05", category: "Community", desc: "Show your student ID at Bean & Leaf for 20% off.", image: "https://picsum.photos/seed/coffee/400/300" }
  ];

  const upcomingEvents = [
    { id: 1, title: "Fall Career Fair", date: "Oct 18, 10:00 AM", location: "Student Union", type: "Career" },
    { id: 2, title: "Campus Hackathon 2026", date: "Oct 24-25", location: "Engineering Building", type: "Technology" },
    { id: 3, title: "Guest Lecture: Tech Entrepreneurship", date: "Oct 15, 2:00 PM", location: "Main Auditorium", type: "Academic" },
    { id: 4, title: "Alumni Mixer", date: "Nov 02, 6:00 PM", location: "Downtown Hotel", type: "Networking" }
  ];

  const forYouContent = [
    { id: 1, title: "Recommended: Machine Learning Club", type: "Club", desc: "Based on your interest in CS 301. They meet every Thursday.", icon: Users },
    { id: 2, title: "Scholarship Deadline Approaching", type: "Alert", desc: "Merit-based scholarship applications are due in 5 days.", icon: Bell },
    { id: 3, title: "Study Group: Physics II", type: "Social", desc: "3 students from your class are meeting tomorrow at the library.", icon: BookOpen }
  ];

  const trendingTopics = [
    { tag: "SpringFest2026", category: "Events", posts: "2.4k" },
    { tag: "FinalsPrep", category: "Academics", posts: "1.8k" },
    { tag: "TechTalks", category: "Technology", posts: "956" },
    { tag: "CampusHousing", category: "Student Life", posts: "842" },
    { tag: "BasketballFinals", category: "Sports", posts: "620" }
  ];

  const filteredNews = newsArticles.filter(n => n.title.toLowerCase().includes(q) || n.desc.toLowerCase().includes(q));
  const filteredEvents = upcomingEvents.filter(e => e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q));
  const filteredForYou = forYouContent.filter(f => f.title.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q));
  const filteredTrending = trendingTopics.filter(t => t.tag.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-black tracking-tight">Discover</h2>
          <p className="text-on-surface-variant mt-1">See what's happening around campus right now.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {["For You", "Trending", "News", "Events"].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${activeTab === tab ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-lowest text-on-surface-variant hover:bg-surface-low border border-outline-variant/20'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "Trending" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
          
          {/* Main Featured Article (Spans 2 columns) */}
          {(!q || "the future of ai in campus education".includes(q)) && (
            <div 
              className="md:col-span-2 group relative overflow-hidden rounded-2xl shadow-sm border border-outline-variant/20 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus:outline-none" 
              tabIndex={0}
              onClick={() => setSelectedContent({
                type: 'article',
                title: 'The Future of AI in Campus Education',
                image: 'https://picsum.photos/seed/campus/800/400',
                content: 'Artificial Intelligence is rapidly transforming the educational landscape. From personalized learning assistants to automated grading systems, the class of 2026 will experience a fundamentally different academic environment.\n\nUniversities are now integrating AI literacy into core curriculums, ensuring students are prepared for an AI-driven workforce. This article explores the top 5 ways our campus is adopting these technologies this semester.'
              })}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>
              <img src="https://picsum.photos/seed/campus/800/400" alt="Campus" className="w-full h-[360px] object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/90 backdrop-blur-md text-on-primary text-xs font-bold uppercase tracking-wider mb-4 shadow-sm border border-white/10">
                  <Star className="w-3.5 h-3.5" /> Featured
                </span>
                <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-3 leading-tight group-hover:text-primary-fixed transition-colors">The Future of AI in Campus Education</h3>
                <p className="text-white/80 text-sm md:text-base max-w-2xl line-clamp-2">Explore how new technologies are shaping the learning experience and what it means for the class of 2026.</p>
              </div>
            </div>
          )}

          {/* Trending Topics List */}
          {(filteredTrending.length > 0) && (
            <div className="bg-surface-lowest rounded-2xl p-6 border border-outline-variant/20 shadow-sm flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-xl">Trending Now</h3>
              </div>
              
              <div className="space-y-5 flex-1">
                {filteredTrending.map((item, i) => (
                  <div 
                    key={item.tag} 
                    className="group cursor-pointer flex items-start justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg" 
                    tabIndex={0}
                    onClick={() => setSelectedContent({
                      type: 'topic',
                      title: `#${item.tag}`,
                      content: `Viewing trending posts and discussions for #${item.tag}.\n\n(This is a preview. In a full implementation, this would load a live feed of posts related to this hashtag.)`
                    })}
                  >
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">{i + 1} · {item.category}</p>
                      <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors text-base">#{item.tag}</h4>
                      <p className="text-xs text-on-surface-variant mt-1">{item.posts} posts</p>
                    </div>
                    <div className="p-2 rounded-full bg-surface-low text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Secondary Articles */}
          {(!q || "extended library hours announced for finals".includes(q)) && (
            <div 
              className="bg-surface-lowest rounded-2xl p-5 border border-outline-variant/20 shadow-sm group cursor-pointer hover:border-primary/30 hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" 
              tabIndex={0}
              onClick={() => setSelectedContent({
                type: 'article',
                title: 'Extended Library Hours Announced for Finals',
                image: 'https://picsum.photos/seed/library/400/300',
                content: 'The main library will now remain open 24/7 during the upcoming finals week to support student preparation. Free coffee and snacks will be provided in the lobby from midnight to 2 AM every night.'
              })}
            >
              <div className="h-44 rounded-xl overflow-hidden mb-5 relative">
                <img src="https://picsum.photos/seed/library/400/300" alt="Library" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-surface-lowest/90 backdrop-blur-sm rounded-md text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm">
                  Academics
                </div>
              </div>
              <h4 className="font-display font-bold text-lg leading-snug mb-2 group-hover:text-primary transition-colors">Extended Library Hours Announced for Finals</h4>
              <p className="text-sm text-on-surface-variant line-clamp-2">The main library will now remain open 24/7 during the upcoming finals week to support student preparation.</p>
            </div>
          )}

          {(!q || "annual campus hackathon registration open".includes(q)) && (
            <div 
              className="bg-surface-lowest rounded-2xl p-5 border border-outline-variant/20 shadow-sm group cursor-pointer hover:border-primary/30 hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" 
              tabIndex={0}
              onClick={() => setSelectedContent({
                type: 'article',
                title: 'Annual Campus Hackathon Registration Open',
                image: 'https://picsum.photos/seed/hackathon/400/300',
                content: 'Join over 500 students in this year\'s 48-hour coding marathon. Prizes include internships at top tech companies, latest gadgets, and exclusive networking opportunities. Form your team of up to 4 members and register before the deadline!'
              })}
            >
              <div className="h-44 rounded-xl overflow-hidden mb-5 relative">
                <img src="https://picsum.photos/seed/hackathon/400/300" alt="Hackathon" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-surface-lowest/90 backdrop-blur-sm rounded-md text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm">
                  Technology
                </div>
              </div>
              <h4 className="font-display font-bold text-lg leading-snug mb-2 group-hover:text-primary transition-colors">Annual Campus Hackathon Registration Open</h4>
              <p className="text-sm text-on-surface-variant line-clamp-2">Join over 500 students in this year's 48-hour coding marathon. Prizes include internships and tech gear.</p>
            </div>
          )}

          {/* Active Discussions Mini-Widget */}
          {(!q || "what's the best minor for a cs major?".includes(q)) && (
            <div 
              className="bg-gradient-to-br from-primary to-primary-container rounded-2xl p-6 md:p-8 text-on-primary shadow-lg relative overflow-hidden group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" 
              tabIndex={0}
              onClick={() => setSelectedContent({
                type: 'discussion',
                title: "What's the best minor for a CS major?",
                content: 'User1: I highly recommend Mathematics. It pairs perfectly with algorithms and machine learning.\n\nUser2: Consider Business or Economics if you want to go into product management!\n\nUser3: Philosophy is an underrated minor for CS. It really helps with logic and ethics in AI.'
              })}
            >
              <div className="absolute -top-6 -right-6 p-4 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                <MessageSquare className="w-40 h-40" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 bg-orange-500/20 rounded-md backdrop-blur-sm border border-orange-500/30">
                      <Flame className="w-4 h-4 text-orange-300" />
                    </div>
                    <span className="font-bold tracking-wider uppercase text-xs text-orange-100">Hot Discussion</span>
                  </div>
                  <h4 className="text-2xl font-display font-bold mb-3 leading-tight">"What's the best minor for a CS major?"</h4>
                  <p className="text-primary-fixed/80 text-sm mb-8 leading-relaxed">Join 124 other students sharing their experiences, course loads, and career advice.</p>
                </div>
                <button className="w-full bg-surface-lowest text-primary px-4 py-3 rounded-xl text-sm font-bold hover:bg-surface-low transition-colors shadow-sm flex items-center justify-center gap-2">
                  Join Conversation <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "For You" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
          {filteredForYou.length > 0 ? filteredForYou.map(item => (
            <div 
              key={item.id} 
              className="bg-surface-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm cursor-pointer hover:border-primary/30 hover:shadow-md transition-all group"
              onClick={() => setSelectedContent({
                title: item.title,
                content: item.desc + "\n\n(This is a personalized recommendation based on your recent activity.)"
              })}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-fixed/30 text-primary flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 block">{item.type}</span>
                  <h4 className="font-display font-bold text-lg group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-sm text-on-surface-variant mt-1">{item.desc}</p>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-12 text-on-surface-variant">No recommendations match your search.</div>
          )}
        </div>
      )}

      {activeTab === "News" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          {filteredNews.length > 0 ? filteredNews.map(item => (
            <div 
              key={item.id} 
              className="bg-surface-lowest p-5 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col sm:flex-row gap-5 cursor-pointer hover:border-primary/30 hover:shadow-md transition-all group"
              onClick={() => setSelectedContent({
                title: item.title,
                image: item.image,
                content: item.desc + "\n\nRead the full story on the campus news portal."
              })}
            >
              <img src={item.image} alt={item.title} className="w-full sm:w-48 h-32 object-cover rounded-xl shrink-0" referrerPolicy="no-referrer" />
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{item.category} • {item.date}</span>
                <h4 className="font-display font-bold text-xl group-hover:text-primary transition-colors">{item.title}</h4>
                <p className="text-sm text-on-surface-variant mt-2 line-clamp-2">{item.desc}</p>
              </div>
            </div>
          )) : (
            <div className="text-center py-12 text-on-surface-variant">No news articles match your search.</div>
          )}
        </div>
      )}

      {activeTab === "Events" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
          {filteredEvents.length > 0 ? filteredEvents.map(item => (
            <div 
              key={item.id} 
              className="bg-surface-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm cursor-pointer hover:border-primary/30 hover:shadow-md transition-all group flex flex-col"
              onClick={() => setSelectedContent({
                title: item.title,
                content: `Event Details:\n\nDate & Time: ${item.date}\nLocation: ${item.location}\nType: ${item.type}\n\nDon't forget to RSVP!`
              })}
            >
              <div className="w-12 h-12 bg-primary-fixed/30 text-primary rounded-xl flex items-center justify-center mb-5">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">{item.type}</span>
              <h4 className="font-display font-bold text-lg group-hover:text-primary transition-colors mb-3 flex-1">{item.title}</h4>
              <div className="space-y-2 text-sm text-on-surface-variant">
                <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary/70"/> {item.date}</p>
                <p className="flex items-center gap-2"><Compass className="w-4 h-4 text-primary/70"/> {item.location}</p>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-12 text-on-surface-variant">No events match your search.</div>
          )}
        </div>
      )}

      {/* Content Modal */}
      {selectedContent && createPortal(
        <div className="fixed inset-0 bg-surface-lowest/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setSelectedContent(null)}>
          <div className="bg-surface-lowest border border-outline-variant/20 rounded-2xl p-6 w-full max-w-2xl shadow-[0_20px_60px_-15px_rgba(53,37,205,0.1)] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-display font-bold text-2xl pr-8">{selectedContent.title}</h3>
              <button onClick={() => setSelectedContent(null)} className="p-1 hover:bg-surface-low rounded-md shrink-0"><X className="w-5 h-5"/></button>
            </div>
            
            {selectedContent.image && (
              <img src={selectedContent.image} alt={selectedContent.title} className="w-full h-48 md:h-64 object-cover rounded-xl mb-6" referrerPolicy="no-referrer" />
            )}
            
            <div className="text-on-surface leading-relaxed whitespace-pre-wrap bg-surface-low p-5 rounded-xl border border-outline-variant/20">
              {selectedContent.content}
            </div>
            
            <button onClick={() => setSelectedContent(null)} className="w-full mt-6 py-2.5 bg-primary text-on-primary rounded-lg font-medium hover:bg-primary-container transition-colors">
              Close
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export function AcademicsPage({ userRole }: { userRole?: string }) {
  const [selectedSemester, setSelectedSemester] = useState("Spring 2026");
  const [expandedCourse, setExpandedCourse] = useState<string | null>("CS 301");

  const semesters = ["Fall 2025", "Spring 2026", "Fall 2026"];

  const courses = [
    {
      id: "CS 301",
      name: "Data Structures & Algorithms",
      credits: 4,
      professor: "Dr. Alan Turing",
      progress: 75,
      grade: "A-",
      time: "Mon/Wed 10:00 AM",
      materials: [
        { name: "CS301_Syllabus.pdf", size: "2.4 MB", date: "Jan 15" },
        { name: "Graph_Algorithms_Slides.pdf", size: "5.1 MB", date: "Feb 20" },
        { name: "Assignment_3_Rubric.pdf", size: "1.2 MB", date: "Mar 05" }
      ]
    },
    {
      id: "MATH 240",
      name: "Linear Algebra",
      credits: 3,
      professor: "Dr. Emmy Noether",
      progress: 60,
      grade: "B+",
      time: "Tue/Thu 2:00 PM",
      materials: [
        { name: "MATH240_Syllabus.pdf", size: "1.8 MB", date: "Jan 16" },
        { name: "Eigenvectors_Practice.pdf", size: "3.3 MB", date: "Feb 28" }
      ]
    },
    {
      id: "PHYS 202",
      name: "Physics II: Electromagnetism",
      credits: 4,
      professor: "Dr. Richard Feynman",
      progress: 85,
      grade: "A",
      time: "Mon/Wed/Fri 1:00 PM",
      materials: [
        { name: "PHYS202_Syllabus.pdf", size: "2.1 MB", date: "Jan 14" },
        { name: "Lab_Manual_Part1.pdf", size: "8.5 MB", date: "Jan 20" },
        { name: "Maxwell_Equations_CheatSheet.pdf", size: "0.5 MB", date: "Mar 10" }
      ]
    },
    {
      id: "PSYC 101",
      name: "Introduction to Psychology",
      credits: 3,
      professor: "Dr. Sigmund Freud",
      progress: 92,
      grade: "A",
      time: "Tue 4:00 PM",
      materials: [
        { name: "PSYC101_Syllabus.pdf", size: "1.1 MB", date: "Jan 12" },
        { name: "Reading_List_Midterm.pdf", size: "0.8 MB", date: "Feb 15" }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header & Semester Selection */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-black tracking-tight">Academics</h2>
          <p className="text-on-surface-variant mt-1">Manage your courses, grades, and materials.</p>
        </div>
        <div className="flex bg-surface-low p-1 rounded-xl border border-outline-variant/20 overflow-x-auto hide-scrollbar">
          {semesters.map(sem => (
            <button 
              key={sem}
              onClick={() => setSelectedSemester(sem)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${selectedSemester === sem ? 'bg-surface-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              {sem}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface-lowest p-5 rounded-2xl border border-outline-variant/20 shadow-sm">
          <div className="flex items-center gap-2 text-on-surface-variant mb-2">
            <Award className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Current GPA</span>
          </div>
          <div className="text-3xl font-display font-black text-primary">3.84</div>
        </div>
        <div className="bg-surface-lowest p-5 rounded-2xl border border-outline-variant/20 shadow-sm">
          <div className="flex items-center gap-2 text-on-surface-variant mb-2">
            <BookOpen className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Credits</span>
          </div>
          <div className="text-3xl font-display font-black text-on-surface">14</div>
        </div>
        <div className="bg-surface-lowest p-5 rounded-2xl border border-outline-variant/20 shadow-sm">
          <div className="flex items-center gap-2 text-on-surface-variant mb-2">
            <Clock className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Next Class</span>
          </div>
          <div className="text-lg font-display font-bold text-on-surface leading-tight">CS 301<br/><span className="text-sm font-medium text-primary">10:00 AM</span></div>
        </div>
        <div className="bg-surface-lowest p-5 rounded-2xl border border-outline-variant/20 shadow-sm">
          <div className="flex items-center gap-2 text-on-surface-variant mb-2">
            <FileText className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Assignments</span>
          </div>
          <div className="text-3xl font-display font-black text-orange-500">2 <span className="text-sm font-medium text-on-surface-variant">Due soon</span></div>
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-xl mb-2">Enrolled Courses</h3>
        {courses.map(course => {
          const isExpanded = expandedCourse === course.id;
          return (
            <div key={course.id} className={`bg-surface-lowest rounded-2xl border transition-all duration-300 overflow-hidden ${isExpanded ? 'border-primary/30 shadow-md' : 'border-outline-variant/20 shadow-sm hover:border-primary/20'}`}>
              {/* Course Header (Clickable) */}
              <button 
                onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                className="w-full text-left p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 focus:outline-none focus-visible:bg-surface-low"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isExpanded ? 'bg-primary text-on-primary' : 'bg-primary-fixed/30 text-primary'}`}>
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-surface-low text-on-surface-variant">{course.id}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-secondary-container/50 text-on-surface">{course.credits} Credits</span>
                    </div>
                    <h4 className="font-display font-bold text-lg md:text-xl text-on-surface">{course.name}</h4>
                    <p className="text-sm text-on-surface-variant mt-1">{course.professor} • {course.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 md:gap-8 w-full md:w-auto justify-between md:justify-end">
                  <div className="w-32 hidden sm:block">
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-on-surface-variant">Progress</span>
                      <span className="text-primary">{course.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-low rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-0.5">Grade</div>
                    <div className="font-display font-bold text-xl text-on-surface">{course.grade}</div>
                  </div>
                  <div className={`p-2 rounded-full transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-surface-low text-primary' : 'text-on-surface-variant'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
              </button>

              {/* Course Expanded Content */}
              {isExpanded && (
                <div className="px-5 md:px-6 pb-6 pt-2 border-t border-outline-variant/10 bg-surface-lowest/50 animate-in slide-in-from-top-2 duration-300">
                  <h5 className="font-bold text-sm text-on-surface mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" /> Course Materials & Syllabus
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {course.materials.map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-outline-variant/20 bg-surface-lowest hover:border-primary/30 hover:shadow-sm transition-all group cursor-pointer">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                            <File className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-on-surface truncate group-hover:text-primary transition-colors">{doc.name}</p>
                            <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{doc.size} • Added {doc.date}</p>
                          </div>
                        </div>
                        <button className="p-2 rounded-full text-on-surface-variant hover:bg-surface-low hover:text-primary transition-colors focus:outline-none">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-5 flex gap-3">
                    <button className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:bg-primary-container transition-colors">
                      Go to Course Page
                    </button>
                    <button className="px-4 py-2 bg-surface-low text-on-surface rounded-lg text-sm font-medium hover:bg-surface-dim transition-colors">
                      Email Professor
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ClubsPage({ clubs, searchQuery }: { clubs: any[], searchQuery: string }) {
  const [selectedClub, setSelectedClub] = useState<any>(null);
  const [isCreatingClub, setIsCreatingClub] = useState(false);
  const [newClubName, setNewClubName] = useState("");
  const [newClubCategory, setNewClubCategory] = useState("General");
  const [newClubDesc, setNewClubDesc] = useState("");

  // Augment backend clubs with mock data for a richer UI
  const augmentedClubs = clubs.map(c => ({
    ...c,
    category: c.name.includes('Computer') || c.name.includes('Tech') ? 'Academic & Technology' : 
              c.name.includes('Debate') ? 'Arts & Culture' : 'General',
    description: c.description || `Join the ${c.name} to connect with like-minded students, participate in events like ${c.event}, and grow your skills.`,
    president: c.president || 'Alex Johnson',
    image: c.image || `https://picsum.photos/seed/${c.name.replace(/\s/g, '')}/400/200`
  }));

  // Add some extra mock clubs to make the sections look good
  const mockClubs = [
    { id: 'm1', name: 'Photography Club', members: 85, event: 'Campus Photo Walk', time: 'Sat 10:00 AM', location: 'Main Quad', category: 'Arts & Culture', description: 'Capture the beauty of our campus and learn advanced photography techniques.', president: 'Sarah Lee', image: 'https://picsum.photos/seed/photo/400/200' },
    { id: 'm2', name: 'Intramural Basketball', members: 150, event: 'Spring Tournament', time: 'Wed 7:00 PM', location: 'Rec Center', category: 'Sports & Recreation', description: 'Competitive and casual basketball for all skill levels.', president: 'Mike Davis', image: 'https://picsum.photos/seed/basketball/400/200' },
    { id: 'm3', name: 'Robotics Society', members: 60, event: 'Bot Wars', time: 'Tue 6:00 PM', location: 'Engineering Lab 4', category: 'Academic & Technology', description: 'Design, build, and program robots for national competitions.', president: 'Emily Chen', image: 'https://picsum.photos/seed/robotics/400/200' },
  ];

  const allClubs = [...augmentedClubs, ...mockClubs];

  const filteredClubs = allClubs.filter(c => 
    c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(filteredClubs.map(c => c.category)));

  const handleCreateClub = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API. For now, we'll just close the modal.
    alert(`Club "${newClubName}" creation request submitted!`);
    setIsCreatingClub(false);
    setNewClubName("");
    setNewClubDesc("");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-black tracking-tight">Clubs & Organizations</h2>
          <p className="text-on-surface-variant mt-1">Find your community and get involved on campus.</p>
        </div>
        <button 
          onClick={() => setIsCreatingClub(true)}
          className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:bg-primary-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Start a Club
        </button>
      </div>

      {categories.length > 0 ? categories.map(category => (
        <div key={category} className="space-y-4">
          <h3 className="text-xl font-display font-bold border-b border-outline-variant/20 pb-2">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.filter(c => c.category === category).map(club => (
              <div 
                key={club.id} 
                tabIndex={0} 
                onClick={() => setSelectedClub(club)}
                className="bg-surface-lowest rounded-2xl border border-outline-variant/20 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary overflow-hidden group flex flex-col"
              >
                <div className="h-32 overflow-hidden relative">
                  <img src={club.image} alt={club.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-4 text-white">
                    <h3 className="font-display font-bold text-lg leading-tight">{club.name}</h3>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-sm text-on-surface-variant line-clamp-2 mb-4 flex-1">{club.description}</p>
                  <div className="flex items-center justify-between text-xs font-medium text-on-surface-variant">
                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {club.members} members</span>
                    <span className="text-primary group-hover:underline">View Profile</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )) : (
        <div className="text-center py-12 text-on-surface-variant">
          {searchQuery ? "No clubs match your search." : "No clubs available."}
        </div>
      )}

      {/* Club Profile Modal */}
      {selectedClub && createPortal(
        <div className="fixed inset-0 bg-surface-lowest/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setSelectedClub(null)}>
          <div className="bg-surface-lowest border border-outline-variant/20 rounded-2xl w-full max-w-2xl shadow-[0_20px_60px_-15px_rgba(53,37,205,0.1)] max-h-[90vh] overflow-y-auto flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-48 md:h-64 shrink-0">
              <img src={selectedClub.image} alt={selectedClub.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <button onClick={() => setSelectedClub(null)} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full transition-colors"><X className="w-5 h-5"/></button>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-2.5 py-1 bg-primary/90 text-on-primary text-[10px] font-bold uppercase tracking-wider rounded-md mb-2">{selectedClub.category}</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white">{selectedClub.name}</h2>
              </div>
            </div>
            
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex flex-wrap gap-4 md:gap-8 pb-6 border-b border-outline-variant/20">
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Members</p>
                  <p className="font-medium flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> {selectedClub.members}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">President</p>
                  <p className="font-medium flex items-center gap-2"><Award className="w-4 h-4 text-primary" /> {selectedClub.president}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Meeting Time</p>
                  <p className="font-medium flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {selectedClub.time}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Location</p>
                  <p className="font-medium flex items-center gap-2"><Compass className="w-4 h-4 text-primary" /> {selectedClub.location}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-display font-bold mb-2">About Us</h3>
                <p className="text-on-surface-variant leading-relaxed">{selectedClub.description}</p>
              </div>

              <div className="bg-surface-low p-5 rounded-xl border border-outline-variant/20">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-2"><Calendar className="w-4 h-4" /> Next Event</h3>
                <p className="font-medium text-lg">{selectedClub.event}</p>
                <p className="text-sm text-on-surface-variant mt-1">{selectedClub.time} • {selectedClub.location}</p>
              </div>

              <div className="pt-4 flex gap-3">
                <button className="flex-1 py-3 bg-primary text-on-primary rounded-xl font-bold hover:bg-primary-container transition-colors shadow-sm">
                  Join Club
                </button>
                <button className="flex-1 py-3 bg-surface-low text-on-surface rounded-xl font-bold hover:bg-surface-dim transition-colors border border-outline-variant/20">
                  Contact President
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Create Club Modal */}
      {isCreatingClub && createPortal(
        <div className="fixed inset-0 bg-surface-lowest/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setIsCreatingClub(false)}>
          <div className="bg-surface-lowest border border-outline-variant/20 rounded-2xl w-full max-w-md shadow-[0_20px_60px_-15px_rgba(53,37,205,0.1)] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
              <h3 className="font-display font-bold text-xl">Start a New Club</h3>
              <button onClick={() => setIsCreatingClub(false)} className="p-1 hover:bg-surface-low rounded-md transition-colors"><X className="w-5 h-5"/></button>
            </div>
            
            <form onSubmit={handleCreateClub} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Club Name</label>
                <input 
                  type="text" 
                  required
                  value={newClubName}
                  onChange={(e) => setNewClubName(e.target.value)}
                  className="w-full bg-surface-low rounded-lg py-2 px-3 text-sm outline-none border border-outline-variant/20 focus:border-primary/20 focus:ring-2 focus:ring-primary/10 transition-all" 
                  placeholder="e.g., Quantum Computing Society"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Category</label>
                <select 
                  value={newClubCategory}
                  onChange={(e) => setNewClubCategory(e.target.value)}
                  className="w-full bg-surface-low rounded-lg py-2 px-3 text-sm outline-none border border-outline-variant/20 focus:border-primary/20 focus:ring-2 focus:ring-primary/10 transition-all"
                >
                  <option value="Academic & Technology">Academic & Technology</option>
                  <option value="Arts & Culture">Arts & Culture</option>
                  <option value="Sports & Recreation">Sports & Recreation</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Description</label>
                <textarea 
                  required
                  value={newClubDesc}
                  onChange={(e) => setNewClubDesc(e.target.value)}
                  className="w-full bg-surface-low rounded-lg py-2 px-3 text-sm outline-none border border-outline-variant/20 focus:border-primary/20 focus:ring-2 focus:ring-primary/10 transition-all min-h-[100px]" 
                  placeholder="What is your club about?"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsCreatingClub(false)} className="flex-1 py-2 bg-surface-low text-on-surface rounded-lg font-medium hover:bg-surface-dim transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2 bg-primary text-on-primary rounded-lg font-medium hover:bg-primary-container transition-colors">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export function EventsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-display font-bold">Upcoming Events</h2>
      <div className="bg-surface-lowest p-6 rounded-xl shadow-[0_10px_40px_-10px_rgba(53,37,205,0.02)]">
        <div className="space-y-4">
          {[
            { title: "Guest Lecture: Tech Entrepreneurship", date: "Oct 15, 2:00 PM", loc: "Main Auditorium" },
            { title: "Fall Career Fair", date: "Oct 18, 10:00 AM", loc: "Student Union" },
            { title: "Campus Hackathon 2026", date: "Oct 24-25", loc: "Engineering Building" }
          ].map(event => (
            <div key={event.title} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-outline-variant/20 hover:bg-surface-low/50 transition-colors">
              <div>
                <h3 className="font-bold text-on-surface">{event.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-on-surface-variant">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {event.date}</span>
                  <span className="flex items-center gap-1"><Compass className="w-4 h-4" /> {event.loc}</span>
                </div>
              </div>
              <button className="mt-4 sm:mt-0 px-4 py-2 bg-surface text-primary rounded-lg text-sm font-medium border border-outline-variant/20 hover:border-primary/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                RSVP
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DiscussionsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold">Discussions</h2>
        <button className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:bg-primary-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
          New Topic
        </button>
      </div>
      <div className="bg-surface-lowest rounded-xl shadow-[0_10px_40px_-10px_rgba(53,37,205,0.02)] overflow-hidden">
        {[
          { title: "Study group for Physics II Midterm?", replies: 12, time: "2h ago" },
          { title: "Best coffee spots near the library?", replies: 45, time: "5h ago" },
          { title: "Housing recommendations for next year", replies: 8, time: "1d ago" }
        ].map((topic, i) => (
          <button key={topic.title} className={`w-full text-left p-4 flex items-center justify-between hover:bg-surface-low/50 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${i !== 0 ? 'border-t border-outline-variant/20' : ''}`}>
            <div className="flex items-start gap-3">
              <div className="mt-1 text-primary">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-on-surface">{topic.title}</h3>
                <p className="text-xs text-on-surface-variant mt-1">Posted {topic.time}</p>
              </div>
            </div>
            <div className="text-sm text-on-surface-variant bg-surface px-3 py-1 rounded-full">
              {topic.replies} replies
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function SettingsPage({ user }: { user: User }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-display font-bold">Settings</h2>
      <div className="bg-surface-lowest p-6 rounded-xl shadow-[0_10px_40px_-10px_rgba(53,37,205,0.02)] max-w-2xl">
        <h3 className="font-display font-bold text-lg mb-4">Profile Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">Full Name</label>
            <input type="text" defaultValue={user.name || ""} className="w-full bg-surface-low rounded-lg py-2 px-3 text-sm outline-none border border-outline-variant/20 focus:border-primary/20 focus:ring-2 focus:ring-primary/10 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">Email Address</label>
            <input type="email" disabled defaultValue={user.email || ""} className="w-full bg-surface-low rounded-lg py-2 px-3 text-sm outline-none border border-outline-variant/20 focus:border-primary/20 focus:ring-2 focus:ring-primary/10 transition-all opacity-70 cursor-not-allowed" />
          </div>
          <div className="pt-4">
            <button className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:bg-primary-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-lowest">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
