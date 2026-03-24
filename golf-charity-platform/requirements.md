# 🏆 Digital Heroes: High-Performance Golf Charity Platform

Digital Heroes is a premium, full-stack SaaS platform designed to gamify golf for social impact. Built for the **March 26th Selection Deadline**, this project demonstrates a "Charity-First" architecture combined with a proprietary "Rolling 5" performance tracking system.

---

## 🚀 Core Technical Pillar: The "Rolling 5" Logic
The "Rolling 5" is the heartbeat of the platform. To ensure fair play and recent performance tracking, the system only maintains a user's **5 most recent Stableford scores**.

### How it works (Automated Logic):
Instead of handling data cleanup in the frontend (which is insecure), I implemented a **Postgres Trigger** in the database layer. 
* **The Trigger:** `trigger_rotate_scores`
* **The Action:** Every time a new score is inserted, the database automatically identifies the 6th oldest score for that specific `user_id` and deletes it.
* **Benefit:** This ensures the database stays lean, prevents users from "cherry-picking" old high scores, and enforces system-wide integrity.

---

## 🏗️ System Architecture

### Frontend (The Hero Experience)
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS with a "High-Contrast Noir" aesthetic.
- **Icons:** Lucide-React for a clean, minimalist UI.
- **State Management:** React Hooks (`useEffect`, `useState`) for real-time dashboard updates.

### Backend (The Engine)
- **Database:** Supabase (PostgreSQL)
- **Security:** Row Level Security (RLS) policies ensure that users can only interact with their own scores and profile data.
- **Authentication:** Supabase Auth (JWT-based) for secure, persistent sessions.
- **Logic Layer:** SQL Functions and Triggers handle the prize distribution math (40/35/25 split) and the score rotation.

---

## 🛠️ Database Schema

| Table | Purpose | Key Feature |
| :--- | :--- | :--- |
| `profiles` | User metadata & Charity choice | Links user to their 10% impact target. |
| `golf_scores` | Performance tracking | Enforced `1-45` Stableford range check. |
| `draws` | Monthly prize pool records | Stores winning number arrays and total pools. |
| `winners` | Prize distribution | Maps matches between User Scores and Draws. |

---

## 🔐 Security & Integrity
- **Server-Side Validation:** Score entries are restricted to a range of 1-45 points via PostgreSQL `CHECK` constraints.
- **Data Isolation:** RLS ensures no cross-contamination of user data.
- **Scalability:** The architecture is designed to handle thousands of concurrent "Score Logins" without degrading performance, thanks to indexed `user_id` lookups.

---

## 🎯 Impact Goal
10% of every membership fee is automatically routed to a user-selected charity. The **CharitySelector** component provides a seamless interface for users to align their performance on the green with real-world social impact.

---

**Developed for the Digital Heroes 48-Hour Technical Evaluation.**