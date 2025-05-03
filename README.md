# 🚀 Frontend Exercise – React Developer (Script Assist)

This project is a front-end technical exercise built with **React**, using **React Router**, **React Query**, **Mantine UI**, and **Zustand** for state management.  
It includes full **JWT-based authentication**, user registration, a resource list/detail system, and data enrichment features.

## 🌐 Live Demo  
🔗 [Click to View Project](https://mantineui.vercel.app/auth/login)

## 🔐 Demo Credentials

You can either register a new user or use the following credentials to log in:

  - Email: demo@gmail.com
  - Password: Demo@123


---

## 📌 Features Implemented

### ✅ Full Authentication (JWT)
- JWT-based login and registration system.
- Auth state managed via Zustand and persisted with `localStorage`.
- Protected routes restricted to authenticated users only.

### 👥 User Registration
- Create new users with basic form validation.
- Displays error/success messages accordingly.

### 📄 Resource List Page
- Data fetched from **[insert API name here, e.g., SpaceX API]**.
- Displayed using **Mantine Table** with:
  - Search
  - Sorting
  - Pagination

### 📘 Resource Detail Page
- Detailed information view of a selected resource using route parameters.
- Rich UI using Mantine components (`Card`, `Accordion`, etc.).

### 🔁 Data Enrichment
- On the detail page, a second API call fetches related data.
- Combines base and enriched data into one cohesive UI.

### 🔗 Deep Linking
- Resource detail pages accessible via:
  - Path params: `/resource/:id`
  - Query params: `/resource?id=123`

---

## 🛠️ Tech Stack

- **React** + **Vite**
- **React Router**
- **React Query**
- **Mantine UI**
- **Zustand**
- **JWT Authentication**

---

## 🧪 Running Locally

```bash
git clone https://github.com/thisissikandar/mantineui
cd mantineui
npm install
npm run dev
