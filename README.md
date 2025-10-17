# 🛠️ Jobverse Admin Dashboard

The **Jobverse Admin Dashboard** is the control center of the **Jobverse ecosystem** — providing administrators with tools to **manage users, jobs, payments, reports, and platform analytics** in real time.  
It’s designed to help Jobverse maintain a **secure, transparent, and scalable** environment for both freelancers and clients.

---

## 🎯 Overview

**Jobverse Admin Dashboard** allows platform administrators to:
- Oversee user accounts and activity.
- Moderate job posts and disputes.
- Manage payments, reports, and analytics.
- Configure global platform settings.
- Monitor system health and logs.

---

## 🚀 Key Features

### 👤 User Management
- View, verify, or suspend user accounts.  
- Role-based permissions (Admin, Moderator, Support).  
- User activity and engagement tracking.

### 💼 Job Management
- Approve or reject job listings.  
- Track job lifecycle and transactions.  
- Manage job categories and tags.

### 💰 Payment & Finance
- Monitor all payment transactions.  
- Handle withdrawal requests and commissions.  
- Generate revenue and tax reports.

### 📊 Analytics & Reports
- Real-time charts for platform metrics.  
- Growth insights: active users, completed jobs, revenue trends.  
- Export reports as CSV/PDF.

### ⚙️ System Settings
- Manage platform configuration (fees, limits, roles).  
- Control access levels and security policies.  
- System logs and error tracking.

---

## 🏗️ Technology Stack

| Component | Technology |
|------------|-------------|
| **Frontend** | React / Next.js / Tailwind CSS | Tanstack |
| **Backend** | Rust / Nginx |
| **Database** | PostgreSQL |
| **Authentication** | JWT / NextAuth |
| **Charts & Data Viz** | Recharts / Chart.js |****
| **Deployment** | Docker + CI/CD  |

---

## ⚙️ Installation & Setup

To run the Admin Dashboard locally:

```bash
# Clone the admin repo
git clone https://github.com/<username>/jobverse-admin.git
cd jobverse-admin

# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
http://localhost:3001
