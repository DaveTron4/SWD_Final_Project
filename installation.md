# SWD Final Project – Employee Management System

This project is a full-stack Employee Management System built with:
- 🔙 **Spring Boot** for the backend (`ems-backend`)
- ⚛️ **React** for the frontend (`my_app`)

---

## 🚀 Getting Started

### ✅ Prerequisites

Before you begin, make sure you have the following installed:

#### 🔧 Backend (Spring Boot)
- [Java 17](https://adoptium.net/en-GB/)
- [Maven](https://maven.apache.org/download.cgi) (Make sure its this version | apache-maven-3.9.9-bin.zip)
- [MySQL](https://dev.mysql.com/downloads/installer/) (or your preferred DB)

#### ⚛️ Frontend (React)
- [Node.js](https://nodejs.org/) (recommended: 18.x or 20.x)
- npm (comes with Node.js)

---

## 📁 Folder Structure

```
SWD_Final_Project/
├── ems-backend/   # Spring Boot backend
└── my_app/        # React frontend
```

---

## 🧱 Backend Setup (Spring Boot)

1. **Navigate to the backend folder:**
   ```bash
   cd ems-backend
   ```

2. **Make sure the project structure is correct:**
   - Java files should be inside `src/main/java/net/finalSWDProject/ems/...`
   - Your package declarations in the `.java` files must match their folder path.

3. **(Optional but recommended)**: Clean the Maven cache to prevent OneDrive sync issues:
   ```bash
   mvn clean
   ```

4. **Build the project:**
   ```bash
   mvn install
   ```

5. **Run the backend:**
   ```bash
   mvn spring-boot:run
   ```

6. **Configure your database:**
   - Create a `application.properties` file in `src/main/resources` if not already present.
   - Add your MySQL config:
    ```yaml
     spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
     spring.datasource.username=your_db_user
     spring.datasource.password=your_db_password
     spring.jpa.hibernate.ddl-auto=update
	```

---

## ⚛️ Frontend Setup (React)

1. **Navigate to the frontend folder:**
   ```bash
   cd ../my_app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the React app:**
   ```bash
   npm run dev
   ```

4. The app should now be running on [http://localhost:3000](http://localhost:3000)

---

## 🧠 Notes

- You might need to update the backend API URLs in the React app depending on how you're serving the backend.
- If you're using `proxy` in `package.json`, make sure it points to `http://localhost:8080` (Spring Boot default).

---

## 🛠️ Common Issues

### ❌ `The declared package does not match the expected package`
- This happens if your file is not in the correct directory structure. Make sure all Java classes in `package net.finalSWDProject.ems.x` live under `src/main/java/net/finalSWDProject/ems/x`.

### ❌ `Failed to delete target/classes/...`
- This usually happens if you’re working in OneDrive or your IDE is locking files.
- Close VSCode and retry `mvn clean`.

---

## 👥 Collaboration Tips

- Everyone should clone the repo into a **local directory outside of OneDrive or Google Drive** to avoid file locking issues.
- Use branches for new features or bug fixes.
- Commit often and write clear commit messages.
- Pull regularly to stay up to date with the main branch.

---
