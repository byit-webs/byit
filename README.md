# By It Agency - Web

Plantilla maestra segura y página web oficial de By It.

## 🚀 Stack Tecnológico

- **Framework**: Astro (última versión estable)
- **Estilos**: Tailwind CSS (configurado nativamente)
- **Despliegue**: Netlify (Sitio estático)
- **Seguridad**: Configuraciones endurecidas de cabeceras HTTP y auditoría CI/CD

## 📁 Estructura del Proyecto

```
byit-agency-web/
├── .github/
│   └── workflows/
│       └── security.yml          # CI/CD Security Gate
├── public/
│   └── favicon.svg               # Favicon de la agencia
├── src/
│   ├── components/               # Componentes reutilizables
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   └── ServiceCard.astro
│   ├── layouts/                  # Layouts base
│   │   └── Layout.astro
│   ├── pages/                    # Páginas del sitio
│   │   └── index.astro
│   └── styles/                   # Estilos globales
│       └── global.css
├── .gitignore
├── astro.config.mjs              # Configuración de Astro
├── netlify.toml                  # Configuración de Netlify + Headers de Seguridad
├── package.json
├── README.md
└── tailwind.config.mjs           # Configuración de Tailwind
```

## 🛠️ Instalación y Desarrollo

### Prerrequisitos

- Node.js 20 o superior
- npm o yarn

### Pasos de Instalación

1. Instalar dependencias dentro de la carpeta de el proyecto (BY IT) y abriendo la terminal en vscode/cursor/antigravity con ctrl + ñ y una CMD:
```bash
npm install
```

2. Iniciar servidor de desarrollo:
```bash
npm run dev
```

3. Abrir en el navegador:
```
http://localhost:4321
```

## 🏗️ Build y Despliegue

### Build de Producción (compila el código y si hay algo mal salta el error)

```bash
npm run build
```

El resultado se genera en la carpeta `dist/`.

### Despliegue en Netlify

1. Conecta tu repositorio a Netlify
2. Configura el build:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Las cabeceras de seguridad se aplican automáticamente mediante `netlify.toml`

## 🔒 Seguridad

### Headers HTTP (netlify.toml)

El proyecto incluye configuraciones de seguridad endurecidas:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `Permissions-Policy` restrictivo
- `Content-Security-Policy` configurado

### CI/CD Security Gate

El workflow de GitHub Actions (`security.yml`) ejecuta:

- Auditoría de seguridad de NPM (nivel: high)
- Verificación de build de Astro

Se ejecuta automáticamente en:
- Push a `main` o `master`
- Pull requests a `main` o `master`

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye el sitio para producción
- `npm run preview` - Previsualiza el build de producción localmente
- `npm run astro` - Ejecuta comandos de Astro CLI

## 🎨 Personalización

### Colores

Los colores principales se pueden modificar en `tailwind.config.mjs`:

```javascript
colors: {
  primary: {
    // Personaliza los colores aquí
  }
}
```

### Contenido

- **Páginas**: Edita los archivos en `src/pages/`
- **Componentes**: Modifica los componentes en `src/components/`
- **Layout**: Ajusta el layout base en `src/layouts/Layout.astro`

## 📄 Licencia

© 2024 By It Agency. Todos los derechos reservados.

## 🤝 Contribución

Este proyecto es la plantilla maestra de By It Agency. Para contribuciones, contacta con el equipo de desarrollo.
