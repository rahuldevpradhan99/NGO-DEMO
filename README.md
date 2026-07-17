# Kalyani Care 💧

Kalyani Care is a community-driven web platform designed to facilitate the preservation, cleaning, and maintenance of local lakes and ponds (Kalyanis) in Bengaluru. The platform connects citizens, volunteers, NGOs, and municipal authorities (BBMP) into a unified, gamified ecosystem to report issues, organize cleaning drives, and sponsor restorations.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rahuldevpradhan99/NGO-DEMO&root-directory=client)

## 🚀 Key Features

* **Multi-Role Dashboards:** Distinct tailored experiences for Villagers, Volunteers, NGOs, and Municipal Authorities.
* **Gamification & Badges:** Earn Eco-Points and unlock badges (e.g., *Clean Warrior*, *Pond Sponsor*) by actively submitting reports and joining cleaning drives.
* **Interactive Lake Map:** Integrated Leaflet map pre-loaded with over 45 real lakes across Bangalore, displaying real-time pollution and health indexes.
* **PDF Reporting:** Dynamic, downloadable PDF reports for user submissions, NGO project proposals, and municipal critical-issue analytics using `jspdf`.
* **Multi-language Support:** Accessible interface with support for English, Kannada, and Telugu.
* **Photo Uploads:** Functional local image previews for problem reporting.
* **Leaderboards & Public Profiles:** Compete in weekly, monthly, and all-time leaderboards. View detailed public profiles to see community impact.
* **NGO Proposal Funding:** NGOs can view actionable restoration projects and officially "Approve & Release Funds" to simulate real-world sponsorships.

## 🛠 Tech Stack

* **Frontend Framework:** React 18
* **Build Tool:** Vite
* **Styling:** Vanilla CSS with custom design tokens and glassmorphism UI
* **Routing:** React Router v6
* **Data Visualization:** Recharts
* **Maps:** React-Leaflet
* **Icons:** Lucide React
* **PDF Generation:** jsPDF & jsPDF-AutoTable
* **Data Layer:** Local mock databases (JSON) synchronized via Context API

## 📦 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rahuldevpradhan99/NGO-DEMO.git
   cd NGO-DEMO/client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Generate/Sync Mock Data (Optional):**
   The project comes with robust data generation scripts to simulate a live database environment.
   ```bash
   node generateData.cjs
   node syncReports.cjs
   node updatePonds.cjs
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## 🔑 Test Accounts (Mock Auth)

The application uses a simulated OTP authentication system. You can log in using any of the following pre-configured mobile numbers (OTP is `123456` or the mock-specific OTP if configured, though the system currently bypasses strict OTP validation for demo purposes).

* **Villager:** `9999999991` (OTP: `111111`)
* **Volunteer:** `9999999992` (OTP: `222222`)
* **NGO Admin:** `9999999993` (OTP: `333333`)
* **Municipality (BBMP):** `9999999994` (OTP: `444444`)

## 📄 License
This project is open-source and available for educational and portfolio purposes.
