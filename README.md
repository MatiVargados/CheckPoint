# 🧾 TP Programación III – Sistema de Autoservicio: CheckPoint

Proyecto para la materia **Programación III**, correspondiente a la **División 131**, desarrollado por los estudiantes **Juan Ullua** y **Matias Vargados**.

CheckPoint es un sistema de autoservicio que simula una tienda de videojuegos y consolas. Incluye una **aplicación frontend para clientes** y un **backend con API RESTful** más un **panel de administración**.

---

## 🏗️ Arquitectura del Sistema

El sistema se divide en dos grandes módulos:

- 🔙 **Backend** (Node.js + Express)
  - Servidor API REST
  - Panel de administración (EJS)
  - Base de datos MySQL
  - Arquitectura MVC

- 🎨 **Frontend** (HTML + CSS + JavaScript)
  - Interfaz de cliente
  - Carrito de compras
  - Filtros por categoría y barra de búsqueda
  - Responsive Design
  - Temas claro/oscuro

---

## 📦 Estructura del Proyecto

/backend
├── controllers/
├── models/
├── routes/
├── views/
├── public/
├── .env
├── server.js

/frontend
├── html/
├── css/
├── js/


---

## 🧠 Tecnologías Utilizadas

### 🔧 Backend
- **Node.js** – Runtime JavaScript
- **Express.js** – Framework Web
- **MySQL2** – Cliente de base de datos
- **EJS** – Motor de plantillas para vistas del admin
- **dotenv** – Variables de entorno
- **CORS** – Middleware de seguridad
- **nodemon** – Hot reload para desarrollo

### 💻 Frontend
- **HTML5**, **CSS3**, **JavaScript ES6+**
- **LocalStorage** – Carrito persistente entre sesiones
- **Fetch API** – Comunicación asíncrona con el backend
- **Responsive Design** – Adaptado a dispositivos móviles
- **Dark/Light Theme** – Modo claro y oscuro

---

## 📊 Funcionalidades

### 🛍️ Cliente
- Página de inicio con captura del nombre de usuario y video de fondo
- Catálogo de productos con filtros por categoría
- Barra de búsqueda por nombre
- Carrito de compras funcional
- Persistencia de datos con LocalStorage

### 🔐 Panel de Administración (`/dashboard`)
- Listado de productos
- Crear nuevos productos
- Buscar producto por ID
- Actualizar información de productos
- Eliminar productos del catálogo

---

## 🔌 API REST

| Método | Endpoint      | Descripción                     |
|--------|---------------|---------------------------------|
| GET    | `/`           | Obtener todos los productos     |
| GET    | `/:id`        | Obtener producto por ID         |
| POST   | `/`           | Crear nuevo producto            |
| PUT    | `/`           | Actualizar producto existente   |
| DELETE | `/:id`        | Eliminar producto por ID        |

---

## 🔄 Flujo de Usuario

### 👤 Cliente
`Inicio` → Ingresa nombre → `Catálogo` → Agrega al `Carrito` → Finaliza compra

### 🛠️ Administrador
`Dashboard` → Gestión CRUD de productos (vista web)

---

## 🛠️ Instalación y Configuración

### 📌 Prerrequisitos
- Node.js v14 o superior
- MySQL (recomendado: XAMPP)
- Navegador moderno

### ⚙️ Pasos

1. Clonar el repositorio  
2. Configurar backend:
   - Crear archivo `.env` en `/backend` con las variables necesarias
3. Configurar base de datos:
   - Crear base de datos `checkpoint_db` en MySQL
   - Ejecutar el script SQL proporcionado
4. Iniciar el servidor:
   ```bash
   cd backend
   npm install express ejs mysql2 nodemon dotenv cors
   npm run dev

5. Acceder a la app:

   - **Frontend cliente:** [http://localhost:3000/frontend/html/inicio.html](http://localhost:3000/frontend/html/inicio.html)  
   - **Panel admin:** [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

## 🔐 Seguridad

- 🔒 **Protección contra SQL Injection** – Uso de placeholders en consultas SQL  
- 🧪 **Validación de entrada** – Control de datos enviados por el usuario  
- 🧱 **Middleware personalizado** – Logging de rutas accedidas  
- ❗ **Manejo de errores** – Gestión de errores en todas las operaciones  
- 🌍 **CORS Configuration** – Configuración básica habilitada  

---

## 🎯 Funcionalidades Destacadas

- 🎥 **Página de inicio con video de fondo**  
- ❌ **Filtros dinámicos por categoría**  
- 🔎 **Búsqueda en tiempo real**  
- 🛒 **Carrito persistente con LocalStorage**  
- 🧑‍💻 **Panel administrativo con CRUD completo**  
- 🌐 **API REST documentada**  
- 💡 **Interfaz intuitiva y responsive**  

---

## 👥 Autores

- 👤 **Juan Ullua** – Desarrollador  
- 👤 **Matias Vargados** – Desarrollador  

---
## 📄 Licencia

Este proyecto está bajo la licencia MIT.
