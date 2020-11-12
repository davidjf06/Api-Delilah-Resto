# Backend "Delilah Restó", App de pedidos de comida

# 3er Proyecto del curso de Desarrollo Web Full Stack de Acámica.

## Recursos y tecnologías utilizadas

- Node.js
- Express
- JWT para autenticación via Token
- MySQL
- Sequelize
- Postman para manejo de endpoints y testing
- Swagger para documentación de API

Este proyecto consta de desarrollar el backend de una app de pedidos de comida llamada Delilah Resto. Se contruye la arquitectura de la base, se arman bases de datos relacionales, endpoints funcionales y la documentación necesaria. 

## Documentación de la API

Abrir el archivo `api.yaml` y copiar su contenido en [Swagger](https://editor.swagger.io/) o importar el mismo desde las opciones.

Se listarán los endpoints y métodos disponibles y la información necesaria para hacer uso de los mismos.

## Instalación e inicializacion del proyecto

### 1 - Clonar proyecto

Clonar el repositorio desde el [siguiente link](https://github.com/davidjf06/Api-Delilah-Resto).

Desde la consola con el siguiente link:

`git clone https://github.com/davidjf06/Api-Delilah-Resto.git.`

### 2 - Instalación de dependencias

```
npm i
```

### 3 - Creando base de datos

- Abrir XAMPP y asegurarse que el puerto sobre el cual se está ejecutando es el `3306`.
- Inicializar los servicios de Apache y MySQL.
- Abrir el panel de control del servicio MySQL.
- Generar una nueva base de datos llamada `proyecto_delilah_resto` desde el panel de control
- Abrir el archivo en `/querys.sql` y dentro del `panel de control` de la base de datos ejecutar la serie de querys del archivo o importar el mismo.

### 4 - Iniciando el servidor

Abrir el archivo en `/server.js` desde node

`node server.js`

### 5 - Listo para usar!

Testear los endpoints provistos desde postman para poder hacer uso de la API y base de datos generadas.
