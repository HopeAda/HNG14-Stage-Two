# 📄 Invoice App

A full-stack invoice management application built with **React + TypeScript** on the frontend and **Express + MongoDB** on the backend. Features full CRUD functionality, status filtering, form validation, and a clean overlay-based UI for creating and editing invoices.

---

## 🌐 Live Demo

- **Frontend:** https://hng-14-stage-two.vercel.app/
- **Backend API:** https://hng14-stage-two-1.onrender.com

---

## 🚀 Features

- Create, edit, and delete invoices
- Save invoices as **Draft** or **Pending**
- Mark invoices as **Paid**
- Filter invoices by status: Draft / Pending / Paid
- Full form validation with field-level error highlighting
- Overlay drawer UI — click outside or press `ESC` to close
- Responsive design (mobile → desktop)
- Data persisted to MongoDB via REST API

---

## 🏗️ Tech Stack

### Frontend

- React
- TypeScript
- React Router
- Vite
- Pure CSS (mobile-first, CSS variables)

### Backend

- Node.js
- Express
- TypeScript
- Mongoose + MongoDB Atlas
- CORS / Dotenv

---

## 📂 Project Structure

```
/
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── InvoiceForm/
│   │   │   ├── TextInput/
│   │   │   ├── ItemList/
│   │   │   ├── Button/
│   │   │   ├── FilterDropdown/
│   │   │   ├── DatePicker/
│   │   │   └── PaymentTermDropdown/
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Add/
│   │   │   ├── Edit/
│   │   │   └── Details/
│   │   ├── Context/
│   │   │   └── DataContext.tsx
│   │   ├── assets/
│   │   └── App.tsx
│   └── package.json
│
└── server/                   # Express backend
    ├── src/
    │   ├── controllers/
    │   │   └── invoiceController.ts
    │   ├── models/
    │   │   └── InvoiceModel.ts
    │   ├── routes/
    │   │   └── invoiceRoutes.ts
    │   ├── types/
    │   │   └── invoice.ts
    │   └── index.ts
    └── package.json
```

---

## 🧮 Data Model

```ts
type Invoice = {
	id: string;
	description: string;
	sender: {
		street: string;
		city: string;
		postcode: string;
		country: string;
	};
	client: {
		name: string;
		email: string;
		address: {
			street: string;
			city: string;
			postcode: string;
			country: string;
		};
	};
	items: {
		id: string;
		name: string;
		qty: number;
		price: number;
		total: number;
	}[];
	dateCreated: string;
	dueDate: string;
	paymentTerm: number;
	status: "draft" | "pending" | "paid";
	total: number;
};
```

---

## 🔁 API Endpoints

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| GET    | `/api/invoices`     | Fetch all invoices   |
| POST   | `/api/invoices`     | Create a new invoice |
| PUT    | `/api/invoices/:id` | Update an invoice    |
| DELETE | `/api/invoices/:id` | Delete an invoice    |

---

## 🔁 Routing Strategy

Uses **React Router with a modal overlay pattern** so the background page stays visible while forms are open:

```tsx
<Routes location={state?.backgroundLocation || location}>
```

- `/add` and `/edit/:id` render as overlays on top of the invoice list
- Direct URL navigation redirects back to home

---

## ⚙️ Environment Variables

### Backend (`server/.env`)

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
FRONTEND_URL=https://hng-14-stage-two.vercel.app
```

### Frontend (`client/.env`)

```env
VITE_API_URL=https://hng14-stage-two-1.onrender.com
```

---

## ▶️ Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account

### 1. Clone the repo

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Setup the backend

```bash
cd server
npm install
npm run dev
```

### 3. Setup the frontend

```bash
cd client
npm install
npm run dev
```

---

## 🚢 Deployment

- **Backend** hosted on [Render](https://render.com)
    - Build command: `npm install && npm run build`
    - Start command: `node dist/index.js`
    - Root directory: `server`

- **Frontend** hosted on [Vercel](https://vercel.com)
    - Build command: `npm run build`
    - Output directory: `dist`
    - Root directory: `client`

---

## 🧪 Validation

- All fields required on submission
- Email format checked with regex
- Item list must not be empty
- Draft save disabled if all fields are empty
- Field-level error highlighting on failed submit

---

## 👨‍💻 Author

HopeAda

---
