🚀 Smart Asset Management System
A professional full-stack web application designed to manage company assets, employees, assignments, and support tickets efficiently.

Features

* 🔐 **User Authentication**: Secure login system using JWT.
* 👨‍💼 **Employee Management**: Track and manage staff details.
* 💻 **Asset Management**: Complete lifecycle tracking (Add, Track, Return).
* 📦 **Inventory Tracking**: Real-time monitoring of available resources.
* 🔧 **Ticket Management**: Streamlined support system for technical issues.
* 📊 **Dashboard**: Visual statistics and data overview.
* 👥 **Role-Based Access**: Specialized views for Admin, Employee, and Technician.

  ## 🛠️ Tech Stack

### 🔹 Backend
* **Language:** Python
* **Framework:** Django & Django REST Framework (DRF)
* **Security:** JWT Authentication

### 🔹 Frontend
* **Library:** React.js
* **API Client:** Axios
* **Styling:** CSS / Bootstrap

### 🔹 Database
* **Development:** SQLite
* **Production:** Compatible with PostgreSQL

---

## 📁 Project Structure

```text
Smart-Assets-Management/
├── backend/        # Django REST API
├── frontend/       # React.js SPA
└── README.md       # Project Documentation

⚙️ Installation & Setup
1. Clone the Repository
git clone [https://github.com/yedukrishnan2000/Smart-Assets-Management.git](https://github.com/yedukrishnan2000/Smart-Assets-Management.git)
cd Smart-Assets-Management

2. Backend Setup
cd backend
python -m demoenv demoenv

# Windows
demoenv\Scripts\activate
# Mac/Linux
source demoenv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

3. Frontend Setup
cd ../frontend
npm install
npm start

🔑 Login Credentials (Testing)
Role      Username       Password
Admin        admin        admin123
Employee     emp1          ******
Technician   tech1         ******

Key API Endpoints
POST /api/token/ → Generate JWT Token
GET /api/assets/ → List/Manage Assets
GET /api/users/ → User Management
GET /api/tickets/ → Support Tickets
GET /api/dashboard/ → Statistics & Analytics

Deployment
Backend hosted on PythonAnywhere
Frontend served via Django static files

Future Improvements
PostgreSQL integration for production.
Real-time Email/Push Notifications.
Enhanced Mobile Responsiveness.
Advanced Data Filtering & Export (Excel/PDF).

Author
Yedukrishnan A M
🎓 B.Tech Computer Science Engineering (Class of 2025)
🐍 Python Full Stack Developer Intern
🚀 Passionate about building scalable web solutions.
