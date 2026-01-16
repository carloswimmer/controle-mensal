# 📊 Controle Mensal

[![Project Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)]()
[![React Version](https://img.shields.io/badge/React-18.x-blue.svg)]()
[![Firebase](https://img.shields.io/badge/Firebase-10.x-orange.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, responsive, and intuitive web application to take control of your monthly expenses, earnings, and investments. Built with **React**, **TypeScript**, and **Firebase**.

---

## ✨ Features

- 🔐 **Authentication**: Secure sign-in and sign-up powered by Firebase Auth.
- 💰 **Expense Tracking**: Easily manage your monthly earnings and expenses.
- 💳 **Payment Categorization**: Categorize entries as Credit, Debit, or Investment.
- 🔄 **Monthly Cloning**: Quickly clone your entries to the next month to save time.
- 🌓 **Dark Mode**: Beautiful glassmorphism UI with native dark mode support.
- 📱 **Fully Responsive**: Optimized for desktop and mobile devices.
- 📊 **Real-time Updates**: Data stays in sync across devices with Firestore.
- 🎓 **Interactive Tutorial**: Step-by-step guide for first-time users.

## 🚀 Live Demo

Check it out live: [controle-mensal.web.app](http://controle-mensal.web.app)

---

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **UI Framework**: [Material UI (MUI)](https://mui.com/)
- **Backend-as-a-Service**: [Firebase](https://firebase.google.com/) (Auth, Firestore, Hosting)
- **Forms**: [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup)
- **State Management**: React Context API & Hooks
- **Icons**: [MUI Icons](https://mui.com/material-ui/material-icons/)

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- A Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/carloswimmer/controle-mensal.git
   cd controle-mensal
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

---

## 📦 Scripts

- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm test`: Launches the test runner.
- `firebase deploy`: Deploys the application to Firebase Hosting.

---

## 🎨 Project Structure

```text
src/
├── assets/         # Images and icons
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks (Auth, Theme, CashBook)
├── pages/          # Application views (Dashboard, Sign In, etc.)
├── routes/         # Route definitions
├── styles/         # Global styles and theme definitions
└── utils/          # Helper functions
```

---

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ by [Carlos Wimmer](https://github.com/carloswimmer)
