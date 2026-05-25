# Selva Tropical | Cuidado Artesanal

Tienda web premium con Next.js App Router + TypeScript + Tailwind, lista para desplegar en Vercel.

## Ejecutar localmente
1. Instala dependencias:
```bash
npm install
```
2. Crea variables de entorno:
```bash
cp .env.example .env.local
```
3. Inicia:
```bash
npm run dev
```

## Deploy en Vercel
1. Sube el repositorio a GitHub/GitLab.
2. En Vercel, importa el proyecto.
3. Configura las variables:
   - `NEXT_PUBLIC_PRODUCTS_API_URL`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_BRAND_NAME`
4. Deploy con framework preset **Next.js**.

## Estructura JSON esperada desde Google Sheets API
```json
[
  {
    "id": "1",
    "slug": "jabon-cacao",
    "name": "Jabón de Cacao",
    "description": "Limpieza suave con aroma natural.",
    "category": "Jabones",
    "price": 29000,
    "image": "https://...",
    "active": true,
    "featured": true,
    "references": ["100g", "Pack x3"]
  }
]
```

> Se muestran solo productos con `active: true` y los destacados (`featured`) aparecen primero.
