# Mercado Vecino

Sitio web de supermercado con inventario, fichas de productos y carrito.

## Descripción

Mercado Vecino permite consultar las existencias de una selección inicial de productos y agregar nuevos artículos al inventario. El carrito se sincroniza con el stock disponible al agregar o retirar unidades.

Proyecto de Desarrollo Frontend II (PFY2202) desarrollado con React, React Router, Tailwind CSS y Vite.

## Funcionalidades principales

- Inventario con productos de muestra y filtro por categoría.
- Formulario para registrar productos con nombre, marca, tipo, stock inicial y precio unitario en pesos chilenos.
- Detalle del producto en un modal desde el listado y en una página al abrir su enlace directo.
- Carrito con controles de cantidad, subtotales, total y actualización del stock.
- Diseño adaptable para escritorio y dispositivos móviles.

Al recargar la página, se restablece el inventario de muestra y se vacía el carrito.

## Estructura del proyecto

```text
Desarrollo_Frontend_II_supermercado/
├── .github/workflows/  # Publicación en GitHub Pages
├── public/            # Recursos estáticos
├── src/
│   ├── components/    # Componentes de interfaz
│   ├── context/       # Estado del inventario y el carrito
│   ├── data/          # Productos de muestra
│   ├── pages/         # Vistas del sitio
│   └── utils/         # Validaciones y pruebas
└── README.md
```

## Cómo ejecutar el proyecto

Con Node.js 22.12 o superior y npm, instala las dependencias e inicia el servidor local.

```bash
npm ci
npm run dev
```

Para comprobar el proyecto, ejecuta las pruebas y la compilación.

```bash
npm test
npm run build
```

## Enlaces

- [Repositorio en GitHub](https://github.com/Arekkusu17/Desarrollo_Frontend_II_supermercado)
- [Sitio publicado](https://arekkusu17.github.io/Desarrollo_Frontend_II_supermercado/)
