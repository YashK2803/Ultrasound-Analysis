```markdown
# Ultrasound-Analysis

A full-stack web application for breast ultrasound image analysis using deep learning. This project features a React frontend for intuitive UI and a FastAPI backend for ML-powered image classification and segmentation.

---

## 📂 Project Structure

```
Ultrasound-Analysis/
├── backend/
│   ├── controllers/
│   ├── ml/
│   │   ├── best_attention_unet_busi.pth
│   │   ├── ml_api.py
│   │   ├── resnet.pth
│   │   └── resnet.py
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── db.js
│   ├── package.json
│   ├── server.js
│   └── ...
├── public/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── Hero.jsx
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   └── Signup.jsx
│   ├── App.jsx
│   └── ...
├── package.json
└── README.md
```

---

## 🚀 Quick Start

### 1. Backend (FastAPI ML Inference)
- Python 3.8+ required.
- Install dependencies from `backend/ml/requirements.txt` or run:

  ```
  pip install fastapi uvicorn pillow torch torchvision numpy scikit-learn python-multipart bcrypt psycopg2-binary supabase
  ```

- Place `resnet.pth` and `best_attention_unet_busi.pth` inside `backend/ml/`.
- Start the backend server:

  ```
  cd backend/ml
  uvicorn ml_api:app --reload --host 0.0.0.0 --port 8000
  ```

### 2. Backend (Node/Express Auth)
- In `backend/`:
  ```
  npm install
  node server.js
  ```
- Ensure `.env` contains your database credentials.

### 3. Frontend (React)
- In the root or frontend directory:

  ```
  npm install
  npm run dev
  ```

- App runs at [http://localhost:5173](http://localhost:5173) (or your configured port).

---

## 🛠 Features

- **Image Upload with Preview:** See the selected image before analysis.
- **Classification:** Predicts `normal`, `benign`, or `malignant` using ResNet.
- **Segmentation:** Masks regions of interest using an Attention U-Net (if abnormality is found).
- **Auth & User Management:** Secure signup/login with JWT, Postgres (Supabase ready).
- **Modern UI:** Responsive design with clear feedback and Segmentation Mask visualization.

---

## 🔌 API Endpoints

| Endpoint               | Method | Description                                |
|------------------------|--------|--------------------------------------------|
| `/segment`             | POST   | Accepts ultrasound image, returns prediction and (if applicable) segmentation mask (base64 PNG in JSON). |
| `/api/auth/signup`     | POST   | Register a new user (Node.js backend)      |
| `/api/auth/login`      | POST   | Login and receive JWT (Node.js backend)    |

---

## ⚙️ Environment Variables

In `backend/.env` (Node.js API):
```
PORT=3000
DB_USER=your_db_user
DB_PASSWORD=your_password
DB_HOST=your_host
DB_PORT=5432
DB_DATABASE=your_db_name
JWT_SECRET=your_jwt_secret
```
*Never commit real passwords/secrets to source control.*

---

## 📝 Usage

1. **Upload ultrasound image:** Navigate to Dashboard and select an image.
2. **Preview:** The image shows up instantly.
3. **Analyze:** Click Analyze to receive prediction. If abnormal, a mask image is shown.
4. **Signup/Login:** Use the Auth pages to register and access the dashboard (if enabled).

---

## ⚡ Troubleshooting

- **Backend not connecting:** Ensure backend servers are running; check `.env` and CORS config.
- **Port conflicts:** Make sure only one service uses a port at a time (3000/8000/5173, etc.).
- **Segmentation missing:** Only shown for `benign` or `malignant` predictions. Try with different images.
- **Database not persistent:** Verify Supabase/Postgres connection info is correct and matches intended environment.

---

## 📦 Backend Main Dependencies

- fastapi, uvicorn
- pillow, torch, torchvision, numpy
- scikit-learn
- python-multipart, bcrypt, psycopg2-binary, supabase

## 📦 Frontend Main Dependencies

- react, react-dom, react-router-dom
- lucide-react, tailwindcss, dotenv, axios, bcryptjs, classnames

(Install Node deps with `npm install` and Python deps with `pip install ...` as listed above.)

---

## 🤝 Contributing

- Fork the repo, create a branch, commit features/fixes, and open a pull request.
- For bugs or questions, please open an issue.

---

## 📞 Contact

For support or feature requests, open an issue or reach out to the maintainer.

---
```