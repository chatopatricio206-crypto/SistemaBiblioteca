# Sistema de Gestión de Biblioteca

## 1. Descripción del proyecto

El Sistema de Gestión de Biblioteca es una API REST desarrollada con Node.js, Express y MongoDB. Su finalidad es administrar libros, usuarios y préstamos de una biblioteca, permitiendo realizar operaciones de registro, consulta, actualización, eliminación y devolución de libros.

## 2. Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JavaScript
- Postman
- Socket.IO
- Express Session
- Connect Mongo
- Bcryptjs

## 3. Funcionalidades principales

- Registro y consulta de usuarios.
- Inicio y cierre de sesión.
- Registro, consulta, actualización y eliminación de libros.
- Registro y consulta de préstamos.
- Devolución de libros.
- Validación de campos obligatorios.
- Control de ISBN duplicados.
- Control de disponibilidad de libros.
- Almacenamiento de sesiones en MongoDB.
- Notificaciones en tiempo real mediante Socket.IO.

## 4. Endpoints de la API

| Método | Endpoint | Función |
|---|---|---|
| GET | / | Verificar funcionamiento |
| POST | /api/libros | Registrar libro |
| GET | /api/libros | Listar libros |
| GET | /api/libros/:id | Consultar libro |
| PUT | /api/libros/:id | Actualizar libro |
| DELETE | /api/libros/:id | Eliminar libro |
| POST | /api/usuarios | Registrar usuario |
| GET | /api/usuarios | Listar usuarios |
| POST | /api/auth/login | Iniciar sesión |
| POST | /api/auth/logout | Cerrar sesión |
| POST | /api/prestamos | Registrar préstamo |
| GET | /api/prestamos | Consultar préstamos |
| PUT | /api/prestamos/:id/devolver | Devolver libro |

## 5. Notificaciones en tiempo real

Se implementó Socket.IO para comunicar los eventos importantes del sistema:

- `prestamoCreado`: notifica cuando se registra un préstamo.
- `libroDevuelto`: notifica cuando se devuelve un libro.

## 6. Instalación y ejecución

1. Descargar o clonar el repositorio.
2. Instalar las dependencias:

```bash
npm install
```

3. Crear un archivo `.env` y configurar las variables:

```env
PORT=3000
MONGODB_URI=tu_uri_de_mongodb
SESSION_SECRET=tu_clave_secreta
```

4. Ejecutar el proyecto:

```bash
npm run dev
```

5. Abrir en el navegador:

```text
http://localhost:3000
```

## 7. Pruebas realizadas

Se realizaron pruebas mediante Postman para verificar:

- Registro y consulta de libros.
- Validación de campos obligatorios.
- Detección de ISBN duplicados.
- Registro de usuarios.
- Inicio y cierre de sesión.
- Registro y consulta de préstamos.
- Restricción de préstamos cuando un libro no está disponible.
- Devolución de libros y actualización de disponibilidad.
- Notificaciones en tiempo real.

## 8. Conclusión

El desarrollo de este proyecto permitió aplicar los conocimientos de programación web mediante la construcción de una API REST conectada a una base de datos NoSQL. Se implementaron operaciones CRUD, validaciones, gestión de sesiones y comunicación en tiempo real. Las pruebas realizadas permitieron comprobar el funcionamiento de los principales módulos del sistema.
## 9. Estructura del proyecto

El proyecto está organizado en las siguientes carpetas:

- config: configuración de la conexión a MongoDB.
- controllers: lógica de las operaciones del sistema.
- models: modelos y esquemas de la base de datos.
- routes: rutas de los endpoints de la API.
- public: interfaz web para mostrar notificaciones.
- app.js: archivo principal del servidor.
- .env.example: ejemplo de configuración de variables de entorno.