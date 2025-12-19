# CORN-APP

**Venta de Maíz Vue.js + Node.js**

## Este proyecto consiste de un sistema de venta de Maíz:

- Comprar Maíz.
- Obtener todas las ventas.

## Stack

| Tipo          | Herramientas                               |
| ------------- | ------------------------------------------ |
| client-portal | Vue 3 + Vite + Tailwind                    |
| api           | hexagonal Architecture + Node.js + Express |
| Base de datos | postgreSQL + docker-compose                |
| http client   | Postman                                    |

## endPoints

### REST (node.js + express)

| Método | Ruta                         | Descripción                      | Parámetros           |
| ------ | ---------------------------- | -------------------------------- | -------------------- |
| POST   | `/api/v1/sale/createSale`    | Crear venta                      | name, type, quantity |
| GET    | `/api/v1/sale/getTotalSales` | Obtener total de ventas por tipo |                      |

**Ejemplo request (Crear Venta) REST:**

```json
{
  "name": "corn",
  "type": "sweetCorn",
  "quantity": 1
}
```

**Ejemplo Respuesta**

```json
{
  "success": true,
  "message": "Sale created successfully",
  "data": []
}
```

**Ejemplo request (Obtener total de ventas por tipo) REST:**

```json
{}
```

**Ejemplo Respuesta**

```json
{
  "success": true,
  "message": "Total sales retrieved successfully",
  "data": [
    {
      "name": "corn",
      "type": "sweetCorn",
      "quantity": 0,
      "sold": 19,
      "createdAt": "2025-12-19T14:41:11.699Z"
    },
    {
      "name": "corn",
      "type": "butterCorn",
      "quantity": 0,
      "sold": 6,
      "createdAt": "2025-12-19T14:41:11.699Z"
    },
    {
      "name": "corn",
      "type": "blueCorn",
      "quantity": 0,
      "sold": 6,
      "createdAt": "2025-12-19T14:41:11.699Z"
    },
    {
      "name": "corn",
      "type": "redCorn",
      "quantity": 0,
      "sold": 5,
      "createdAt": "2025-12-19T14:41:11.699Z"
    }
  ]
}
```
