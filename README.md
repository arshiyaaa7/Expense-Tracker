# 💰 Expense Tracker Application

A full-stack **Expense Tracker** web application built using **Java, Spring Boot, MySQL, Spring JPA, Hibernate, Tailwind CSS, and TypeScript**. The app allows users to manage their income and expenses with intuitive dashboards, visual charts, and secure authentication.

## 🚀 Features

- ✅ **User Authentication** with Spring Security  
- 💸 **Add, View, Filter Expenses**  
- 📊 **Visual Reports**:  
  - Pie Chart (Category-wise breakdown)  
  - Bar Chart (Income vs Expenses)  
  - Line Chart (Monthly Expense Trends)  
- 📅 **Expense Tracking** with date-wise grouping  
- 📄 **REST APIs** for seamless frontend-backend communication  
- 🛠 **Efficient Database Access** using Spring Data JPA & Hibernate  
- 🎨 **Modern UI** using Tailwind CSS + TypeScript  

## 🛠 Tech Stack

| Category       | Tech Used                          |
|----------------|------------------------------------|
| **Backend**     | Java, Spring Boot, Spring JPA, Hibernate |
| **Database**    | MySQL                             |
| **Frontend**    | HTML, Tailwind CSS, TypeScript, JavaScript |
| **Security**    | Spring Security                   |
| **Build Tool**  | Maven                             |
| **Platform**    | Linux (tested on AWS EC2)         |

## 📸 Screenshots

- **Dashboard** with Income vs Expenses Bar Chart, Expense Category Pie Chart, and Monthly Trends Line Chart
![Home page](https://github.com/user-attachments/assets/abce5498-ae5c-4101-9cdb-e7ffc071cee2)

![charts1](https://github.com/user-attachments/assets/f0cd8dbe-5d9e-426d-934b-d69790ce803d)

- **Spring Boot Backend** structured into the following packages: `controllers`, `config`, `models`, `services`, and `repo`.
![springboot](https://github.com/user-attachments/assets/ac4c8c12-9e39-4528-89f6-cfd6104ffbbf)

- **Database** view with normalized tables for `User`, `Category`, and `Expense`
![db](https://github.com/user-attachments/assets/9cc95314-e71f-4929-94b4-934793858279)

## ⚙️ How to Run Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   cd expense-tracker
   ```

2. **Configure `application.properties`**
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/expense_tracker
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   ```

3. **Run the backend**
   ```bash
   mvn spring-boot:run
   ```

4. **Run the frontend**
   ```bash
   npm install
   npm run dev
   ```

## 📂 Project Structure (Backend)

```
src/
├── config/
├── controllers/
├── models/
├── repo/
├── services/
└── ExpenseTrackerApplication.java
```

## ✍️ Author

**Arshiya Shaikh**
