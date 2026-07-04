# Smart Attendance Backend - Quick Start Guide

## ✅ Project Status: READY TO RUN

Your Smart Attendance Backend project has been successfully built and is ready for use!

---

## 🚀 Quick Start

### Option 1: Run Using Maven Wrapper (Recommended)

```bash
cd "D:\Smart Attendence\Backend"
.\mvnw spring-boot:run
```

The application will start on `http://localhost:8080`

### Option 2: Run the Built JAR File

```bash
cd "D:\Smart Attendence\Backend"
java -jar target/smart-attendance-1.0.0.jar
```

---

## 📋 Pre-requisites

Before running the application, ensure:

1. **PostgreSQL is running** on `localhost:5432`
2. **Database exists:** Create database with:
   ```sql
   CREATE DATABASE smart_attendance;
   ```
3. **Default credentials in application.properties:**
   - Username: `postgres`
   - Password: `root`
   - (Update these in `src/main/resources/application.properties` if different)

---

## 🔌 API Endpoints

### Authentication Endpoints
- **Register User:** `POST /auth/register`
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "TEACHER"
  }
  ```

- **Login:** `POST /auth/login`
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
  Response includes JWT token.

### Student Endpoints
- **Add Student:** `POST /students`
- **Get All Students:** `GET /students`
- **Get Students by Class:** `GET /students/class/{classId}`
- **Bulk Generate Students:** `POST /students/bulk`
- **Delete Student:** `DELETE /students/{id}`
- **Delete Class Students:** `DELETE /students/class/{classId}`

---

## 🔐 Using JWT Token

After login, use the token in subsequent requests:

```
Authorization: Bearer <your_jwt_token>
```

---

## 📊 Build Information

- **Build Tool:** Maven 3.6.3+
- **Java Version:** 17+
- **Build Status:** ✅ SUCCESS
- **Tests:** ✅ ALL PASSED (1/1)
- **JAR File Size:** 58.6 MB
- **Build Time:** ~22 seconds

---

## 🛠️ Common Commands

### Clean Build
```bash
.\mvnw clean compile
```

### Run Tests
```bash
.\mvnw test
```

### Full Build with Tests
```bash
.\mvnw clean verify
```

### Generate JAR Only
```bash
.\mvnw package
```

---

## 📝 Configuration

All configurations are in: `src/main/resources/application.properties`

Key settings:
- **Server Port:** 8080
- **Database:** PostgreSQL on localhost:5432
- **JWT Secret:** ThisIsMyVerySecureSecretKeyForSmartAttendanceProject2026
- **JWT Expiration:** 24 hours
- **CORS Origin:** http://localhost:5173

---

## ⚠️ If You Get Errors

### PostgreSQL Connection Error
- Check if PostgreSQL is running
- Verify credentials in `application.properties`
- Ensure database `smart_attendance` exists

### Port Already in Use
- Change port in `application.properties`:
  ```
  server.port=8081
  ```

### Dependencies Not Downloading
- Clear local cache:
  ```bash
  .\mvnw dependency:purge-local-repository
  ```

---

## 📚 Project Structure

```
Backend/
├── src/main/java/com/smartattendance/backend/
│   ├── controller/        → REST Endpoints
│   ├── service/           → Business Logic
│   ├── repository/        → Database Access
│   ├── entity/            → Database Models
│   ├── dto/               → Data Transfer Objects
│   ├── security/          → JWT & Authentication
│   └── config/            → Application Configuration
├── src/main/resources/
│   └── application.properties    → App Configuration
├── target/
│   └── smart-attendance-1.0.0.jar   → Built JAR
└── pom.xml                → Maven Configuration
```

---

## ✅ Verification

To verify everything is working:

1. **Check if all files compile:**
   ```bash
   .\mvnw compile
   ```

2. **Run tests:**
   ```bash
   .\mvnw test
   ```

3. **Start the application:**
   ```bash
   .\mvnw spring-boot:run
   ```

4. **Test an endpoint:**
   ```bash
   curl -X POST http://localhost:8080/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"test123","role":"TEACHER"}'
   ```

---

## 🎯 Next Steps

1. **Database Setup:** Create the PostgreSQL database
2. **Start the Backend:** Run using Maven or JAR
3. **Connect Frontend:** Point frontend to `http://localhost:8080`
4. **Test Endpoints:** Use Postman or Insomnia to test APIs

---

## 📞 Need Help?

- Check `PROJECT_STATUS.md` for detailed information
- Review Spring Boot documentation
- Check application logs for error messages

---

**Your project is ready to go! 🎉**

