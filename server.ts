import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- IN-MEMORY DATABASE ---
  const users = new Map();
  users.set('tamil515253@gmail.com', { 
    uid: 'admin_1', 
    name: 'Admin User', 
    email: 'tamil515253@gmail.com', 
    role: 'admin', 
    password: 'password123' 
  });

  let notices = [
    { 
      id: 1, 
      title: 'Welcome to Campus', 
      desc: 'Welcome to the new academic year! We are excited to have you here.', 
      tag: 'General', 
      authorId: 'admin_1', 
      createdAt: new Date().toISOString() 
    },
    { 
      id: 2, 
      title: 'Library Hours Extended', 
      desc: 'The library will now be open until midnight during finals week.', 
      tag: 'Academics', 
      authorId: 'admin_1', 
      createdAt: new Date().toISOString() 
    }
  ];

  let clubs = [
    { id: 1, name: 'Computer Science Society', members: 120, event: 'Hackathon Prep', time: 'Friday 5:00 PM', location: 'Lab 3' },
    { id: 2, name: 'Debate Club', members: 45, event: 'Weekly Meetup', time: 'Thursday 6:00 PM', location: 'Room 101' }
  ];

  // --- API ROUTES ---
  
  // Auth
  app.post('/api/auth/register', (req, res) => {
    const { name, email, password } = req.body;
    if (users.has(email)) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const role = email === 'tamil515253@gmail.com' ? 'admin' : 'student';
    const uid = 'user_' + Math.random().toString(36).substring(2, 9);
    const newUser = { uid, name, email, role, password };
    users.set(email, newUser);
    res.json(newUser);
  });

  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.get(email);
    if (user && user.password === password) {
      res.json(user);
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

  app.post('/api/auth/google', (req, res) => {
    const { name, email, uid } = req.body;
    let user = users.get(email);
    if (user) {
      // User exists, just return them (bypassing password check since Google authenticated them)
      res.json(user);
    } else {
      // New user from Google
      const role = email === 'tamil515253@gmail.com' ? 'admin' : 'student';
      const newUser = { uid, name, email, role, password: uid }; // Use uid as dummy password
      users.set(email, newUser);
      res.json(newUser);
    }
  });

  // Notices
  app.get('/api/notices', (req, res) => {
    res.json(notices);
  });

  app.post('/api/notices', (req, res) => {
    const newNotice = { 
      ...req.body, 
      id: Date.now(), 
      createdAt: new Date().toISOString() 
    };
    notices.unshift(newNotice); // Add to top
    res.json(newNotice);
  });

  // Clubs
  app.get('/api/clubs', (req, res) => {
    res.json(clubs);
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
