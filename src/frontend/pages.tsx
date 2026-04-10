import { BookOpen, Calendar, Compass, MessageSquare, Users, ChevronRight } from "lucide-react";
import { User } from "../api/client";

export function DiscoverPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-display font-bold">Discover Campus</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-lowest p-6 rounded-xl shadow-[0_10px_40px_-10px_rgba(53,37,205,0.02)]">
          <h3 className="font-display font-bold text-lg mb-4">Trending Topics</h3>
          <div className="space-y-3">
            {["#SpringFest2026", "#FinalsPrep", "#TechTalks"].map(tag => (
              <button key={tag} className="w-full text-left p-3 rounded-lg bg-surface-low text-primary font-medium cursor-pointer hover:bg-primary-fixed/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-surface-lowest p-6 rounded-xl shadow-[0_10px_40px_-10px_rgba(53,37,205,0.02)]">
          <h3 className="font-display font-bold text-lg mb-4">Featured Article</h3>
          <div className="h-32 bg-surface-low rounded-lg mb-4"></div>
          <h4 className="font-bold">The Future of AI in Education</h4>
          <p className="text-sm text-on-surface-variant mt-2">Explore how new technologies are shaping the learning experience...</p>
        </div>
      </div>
    </div>
  );
}

export function AcademicsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-display font-bold">Academics</h2>
      <div className="bg-surface-lowest p-6 rounded-xl shadow-[0_10px_40px_-10px_rgba(53,37,205,0.02)]">
        <h3 className="font-display font-bold text-lg mb-4">Current Courses</h3>
        <div className="space-y-4">
          {["Data Structures & Algorithms", "Linear Algebra", "Physics II", "Introduction to Psychology"].map(course => (
            <button key={course} className="w-full text-left flex items-center justify-between p-4 rounded-xl border border-outline-variant/20 hover:border-primary/20 transition-colors cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-fixed/30 flex items-center justify-center text-primary">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="font-medium">{course}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ClubsPage({ clubs, searchQuery }: { clubs: any[], searchQuery: string }) {
  const filteredClubs = clubs.filter(c => 
    c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.event?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold">Clubs & Organizations</h2>
        <button className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:bg-primary-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
          Start a Club
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredClubs.length > 0 ? filteredClubs.map(club => (
          <div key={club.id} tabIndex={0} className="bg-surface-lowest p-5 rounded-xl border border-outline-variant/20 hover:shadow-[0_8px_24px_rgba(53,37,205,0.06)] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <div className="w-12 h-12 rounded-full bg-surface-low mb-4 flex items-center justify-center">
              <Users className="w-6 h-6 text-on-surface-variant" />
            </div>
            <h3 className="font-display font-bold mb-1">{club.name}</h3>
            <p className="text-xs text-on-surface-variant mb-4">Join {club.members || 0} fellow students.</p>
            <button className="w-full py-2 bg-surface-low text-on-surface-variant rounded-lg text-sm font-medium hover:bg-primary-fixed/50 hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              View Details
            </button>
          </div>
        )) : (
          <div className="col-span-full text-center py-8 text-on-surface-variant">
            {searchQuery ? "No clubs match your search." : "No clubs available."}
          </div>
        )}
      </div>
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
