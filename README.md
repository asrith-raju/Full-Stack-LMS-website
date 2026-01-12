
# Edemy – Learning Management System (LMS)

Edemy is a full-stack Learning Management System built using the **MERN stack**. It supports student and educator roles, course management, secure authentication, and online payments.

---

## 🚀 Features

### 👨‍🎓 Student
- Browse and search courses
- View course details and previews
- Purchase courses using Razorpay
- Enroll and track course progress
- Rate courses

### 👨‍🏫 Educator
- Upgrade role to educator
- Create and publish courses
- Upload course thumbnails and content
- View enrolled students
- Dashboard with earnings & analytics

### 🔐 Authentication
- Clerk authentication (login/signup)
- Role-based access (student / educator)

### 💳 Payments
- Razorpay integration
- Secure payment verification
- Purchase history tracking

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Clerk (Auth)
- Razorpay (Payments)
- Cloudinary (Media uploads)
- Multer

---

## 📁 Project Structure

```
Edemy/
├── client/        # Frontend (React + Vite)
├── server/        # Backend (Node + Express)
├── .env           # Environment variables
├── .gitignore
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the **server** folder:

```env
MONGODB_URI=your_mongodb_url
CLERK_WEBHOOK_SECRET=your_clerk_secret
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key
```

Create a `.env` file in the **client** folder:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

---

## ▶️ Run the Project

### Backend
```bash
cd server
npm install
npm run server
```

### Frontend
```bash
cd client
npm install
npm run dev
```

---

## 🌐 Deployment
- Frontend: Vercel
- Backend: Vercel
- Database: MongoDB Atlas

---

## 👨‍💻 Author
**Asrith Raju**  
GitHub: https://github.com/asrith-raju

---

## 📜 License
This project is for educational purposes.
