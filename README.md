# 🚀 Aerius (MERN Stack)

## 📌 Project Overview
This project is a **Mission Planning System** where users can create, manage, and track Drone missions between different cities using Google Maps. Missions can be **started, completed, canceled, and deleted**, with real-time updates on the map.

## 🛠️ Tech Stack
- **Frontend:** React.js (JSX, Bootstrap, Google Maps API, WebSockets)
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, WebSockets (Socket.io)
- **Database:** MongoDB (Atlas or Local)
- **Version Control:** Git, GitHub

## 🚀 Installation & Setup

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/your-username/Drone-mission-planner.git
cd Drone-mission-planner
```

### 2️⃣ **Backend Setup**
```sh
cd backend
npm install
npm run dev  # Starts the backend server on port 5000
```

### 3️⃣ **Frontend Setup**
```sh
cd frontend
npm install
npm start  # Starts the frontend on port 3000
```

### 4️⃣ **MongoDB Setup**
- Use **MongoDB Atlas** (cloud) or **Local MongoDB**.
- Create a `.env` file in the `backend` folder and add:
```sh
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## 🔧 Usage
1. **Create a Mission** → Select a **Start City & Destination City** from the dropdown.
2. **Start the Mission** → Click the **"Start"** button (Route turns blue 🔵).
3. **Complete the Mission** → Click **"Complete"** (Route turns green ✅ & disappears after 5s).
4. **Cancel the Mission** → Click **"Cancel"** (Route disappears ❌).
5. **Delete a Mission** → Click the **🗑️ (Trash Icon)** to remove a mission permanently.

## 🛡️ Features
✅ **Google Maps Integration** – Shows real-time mission routes.
✅ **Mission Lifecycle** – Create, Start, Complete, Cancel, and Delete Missions.
✅ **Real-time Updates** – Uses WebSockets (Socket.io) to sync across clients.
✅ **Dynamic Route Colors** – Red (default) → Blue (In Progress) → Green (Completed → Removed).
✅ **Database Persistence** – Uses MongoDB to store all missions.

## 🎯 Future Improvements
- ✈️ **Drone Animation** – Show movement along the Drone path.
- 🌍 **Dynamic City Selection** – Fetch city data from an API.
- 🔄 **Mission History** – Store past missions for analytics.

## 🤝 Contributing & Contact
Feel free to **fork this repository** and open **pull requests** for improvements!
📧 Contact: [prem.kumar.soni2907@gmail.com](mailto:your-email@example.com)

---
Made with ❤️ by [PREM KUMAR SONI  ]
# Drone-Mission-Planner
