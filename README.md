# ⛳ Golf Charity Platform | Digital Heroes Hackathon

### **Play for More Than Par.**
A high-performance, real-time tournament tracking platform designed to gamify and streamline charity golf events. Built with a focus on high-contrast "Noir" aesthetics and precision handicap calculations.

---

## 🚀 Live Demo
**View the Project:** [https://golf-charity-platform-eta-ten.vercel.app/](https://golf-charity-platform-eta-ten.vercel.app/)

---

## 🛠️ The Tech Stack
* **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
* **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL + GoTrue)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Custom "Noir" Dark Theme)
* **Deployment:** [Vercel](https://vercel.com/)
* **Icons:** [Lucide React](https://lucide.dev/)

---

## ✨ Key Features

### 📉 Custom "Rolling 5" Logic
Unlike standard static leaderboards, this platform implements a **Rolling 5 Handicap System**. 
* The system automatically tracks a player's entire history but only calculates their current standing based on their **last 5 recorded scores**.
* Ensures that current form is prioritized over historical data, keeping the competition fair and dynamic.

### 🌑 Noir Dashboard
A high-contrast, professional-grade interface designed for outdoor visibility on golf courses. 
* **Minimalist UI:** Focuses on essential data points (Score, Date, Relation to Par).
* **Real-time Updates:** Powered by Supabase subscriptions to reflect leaderboard changes instantly.

### 🛡️ Secure Authentication
* Fully integrated Supabase Auth for player profiles.
* Protected routes to ensure only verified players can submit and edit their scores.

---

## 🏗️ Installation & Local Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/mahimasisodiya049-blip/Golf-Charity-Platform.git](https://github.com/mahimasisodiya049-blip/Golf-Charity-Platform.git)
    cd Golf-Charity-Platform
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file and add your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

---

## 📅 Submission Details
* **Hackathon:** Digital Heroes 2026
* **Submission Date:** March 24, 2026
* **Developer:** Mahima Sisodiya

---

## 📜 License
This project is open-source and available under the MIT License.