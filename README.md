# ⛳ Golf Charity Platform

### **Precision Tracking. High-Contrast Design.**
A specialized web application built to manage and track scores for charity golf events. This platform prioritizes real-time data accuracy and a mobile-first "Noir" aesthetic for high visibility on the course.

---

## 🚀 Live Application
**URL:** [https://golf-charity-platform-eta-ten.vercel.app/](https://golf-charity-platform-eta-ten.vercel.app/)

---

## 🛠️ Technology Stack
* **Frontend:** [Next.js 14+](https://nextjs.org/) (App Router)
* **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL)
* **Authentication:** [Supabase Auth](https://supabase.com/auth)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Deployment:** [Vercel](https://vercel.com/)

---

## ✨ Core Features

### 📊 Rolling 5 Handicap Algorithm
The platform features a custom-built scoring engine that calculates a player's current standing based on a **Rolling 5** logic. 
* Tracks full historical performance.
* Dynamically filters the 5 most recent entries for the active leaderboard calculation.
* Ensures fair play by reflecting a player's current form.

### 🌑 "Noir" Dashboard
Designed for outdoor utility, the dashboard uses a high-contrast dark theme to ensure readability in bright sunlight on the golf course. 
* **Real-Time Sync:** Uses Supabase Realtime to push score updates to the leaderboard without page refreshes.
* **Responsive Design:** Fully optimized for mobile devices.

### 🔒 Player Management
* Secure login and registration.
* Protected API routes to ensure players can only modify their own score data.

---

## 🏗️ Local Development

1.  **Clone the Repo:**
    ```bash
    git clone [https://github.com/mahimasisodiya049-blip/Golf-Charity-Platform.git](https://github.com/mahimasisodiya049-blip/Golf-Charity-Platform.git)
    cd Golf-Charity-Platform
    ```

2.  **Install Packages:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file with your Supabase keys:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
    ```

4.  **Start Dev Server:**
    ```bash
    npm run dev
    ```

---

## 👤 Author
**Mahima Sisodiya** *Specializing in AI/ML & Full-Stack Development*