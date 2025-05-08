# **CIATEQ Research Center**

### **Members:**
1. **Carlos Eduardo Sánchez Ramos** (FrontEnd)
2. **Juan Pablo Vázquez Arévalo**   (BackEnd)

---

## **About the Project**

This project is inspired by **CIATEQ**, a cutting-edge research center in Mexico dedicated to technological innovation and scientific advancement. The system is designed to manage and visualize key elements of the research ecosystem, including:

- **Researchers**: View detailed profiles of scientists, their areas of expertise, and current research projects.
- **Tools and Equipment**: Keep track of laboratory instruments, their usage history, and availability.
- **Students**: Associate students with mentors, track their progress, and visualize their academic involvement.
- **Projects**: Monitor ongoing and completed projects, including budgets, timelines, and participants.
- **Events and Seminars**: A calendar-based system to promote academic events, guest talks, and workshops.

**Goal**: To create an intuitive and powerful platform that supports collaboration, transparency, and innovation within research centers like CIATEQ.  
---
# 🚀 Setting Up the Project from a Cloned Repository  

### **Requirements**  
Ensure that you have **Node.js** and **npm** installed on your system.

[**Click here to install Node.js**](https://nodejs.org/)

### 📦 React Project

This is a React-based project that includes dependencies like Axios, React Router DOM, and Recharts.

## 🚀 Technologies Used
#### 🤳 FrontEnd dependencies
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [React Router DOM](https://reactrouter.com/)
- [Recharts](https://recharts.org/)
#### 🌐 BackEnd dependencies
- [Nginx](https://nginx.org/en/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [DRF Yasg](https://drf-yasg.readthedocs.io/)
- [Django CORS Headers](https://pypi.org/project/django-cors-headers/)
- [Psycopg2](https://pypi.org/project/psycopg2/)
#### 👾 DevOps dependencies  
- [Docker](https://www.docker.com/)
- [Nginx](https://www.nginx.com/)
---

## 📁 Clone the Repository

Start by cloning the repository to your local machine:

```
git clone https://github.com/eduayy/Centro-de-Investigacion.git
cd Centro-de-Investigacion
```

## 📦 Install dependencies

```
cd frontend
Centro-de-Investigacion\frontend> npm install
```

## 🌐 Run the project
```
Centro-de-Investigacion> cd frontend
Centro-de-Investigacion\frontend> cd nginx
Centro-de-Investigacion\frontend\nginx> start nginx
```
The app will be avaible at http://localhost:8080


## 🎯 Setting the backend
Enter to backend file
```
Centro-de-Investigacion> cd backend
Centro-de-Investigacion\backend> pip install -r requirements.txt
```

## 🎰 Configure database 
Enter to backend file Centro-de-Investigacion\backend\mysite\api\views\api_views.py
On line 298 configure with your credentials
```
db_name = "investigadores_db_reloaded" #Don't change this name
db_user = "postgres"  # User
db_password = "12345"  # Password
```
### Configure database connection
In `settings.py` file, you shold look this:
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'investigadores_db_reloaded', #Don't change this name
        'USER': 'YOUR USER NAME',
        'PASSWORD': 'DATABASE PASSWORD',
        'HOST': 'localhost', -> You can change it if not local
        'PORT': '5432',
    }
}
```
Finally create the "investigadores_db_reloaded" database in your PostgreSQL without adding tables.

## 🤖 Run the Django server 
Enter to mysite file.
```
Centro-de-Investigacion\backend> cd mysite
# Run the following command
Centro-de-Investigacion\backend\mysite> python manage.py makemigrations
Centro-de-Investigacion\backend\mysite> python manage.py migrate
Centro-de-Investigacion\backend\mysite> python manage.py runserver
```

## Entity-Relation diagram  
-You can open the pdf with this link:  
📄 [ERD PDF](./ERD-RESEARCHER-CENTER.pdf)  
If you want to see it on Visual Studio Code, install this extension.  
![VSCodeExtension](https://github.com/user-attachments/assets/1d89afab-f617-4dbf-8c0f-864696d5b8b3)

---  
# Researcher Center Overview

### Home page
This page shows login, register, see who are us, timelapse of CIATEQ, and access to our information. 
![Home-Page](https://github.com/user-attachments/assets/1945c803-9221-4a60-aefe-6e87976d66c1)

## Login page  

![Login-Page](https://github.com/user-attachments/assets/570c1213-92cd-4e49-aeca-65e415ff1d6e)

## Register page  

![Register-Page](https://github.com/user-attachments/assets/9123b4d2-5255-499d-878b-45a03807f562)

## Example page (Researchers)

SHOWING ALL OUR RESEARCHERS  

![Researcher-Page](https://github.com/user-attachments/assets/f3638fdb-f947-45c0-9f17-27edd5edca87)  

INFORMATION ABOUT OUR RESEARCHERS  

![Researcher-Info](https://github.com/user-attachments/assets/5f06fdd0-bec1-46d4-87ed-1846fd935ae2)

YOU CAN ALSO SEE STADISTICS OF OUR RESEARCHERS

![Researcher-Stadistics](https://github.com/user-attachments/assets/fe63d491-e85b-489a-ae11-6b6c967da01d)


