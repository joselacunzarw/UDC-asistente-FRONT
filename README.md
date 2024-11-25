# Asistente UDC - Chatbot

Chatbot inteligente para la Universidad del Chubut (UDC) desarrollado con React, TypeScript y Tailwind CSS.

## 🚀 Características

- 💬 Chat en tiempo real con IA
- 🔐 Autenticación con Google
- 🎨 Interfaz moderna y responsive
- 🛠️ Modo desarrollo con herramientas de depuración
- 🔄 Soporte para API real y simulada
- 🎯 Personalización vía variables de entorno

## 🛠️ Tecnologías

- React 18
- TypeScript
- Tailwind CSS
- Zustand (Estado)
- Google OAuth 2.0
- Lucide Icons
- Docker & Docker Compose

## 📦 Instalación

### Desarrollo local

```bash
# Instalar dependencias
npm install

# Crear archivo de configuración
cp .env.example .env.local

# Iniciar servidor de desarrollo
npm run dev
```

### Docker Compose

1. Crea el archivo de variables de entorno:
```bash
cp .env.example .env
```

2. Configura las variables en el archivo `.env`

3. Inicia los servicios:
```bash
# Desarrollo
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# Producción
docker compose up -d
```

4. Para detener los servicios:
```bash
docker compose down
```

## ⚙️ Configuración

### Variables de Entorno

#### API
- `API_URL`: URL base de la API
- `API_IMAGE`: Imagen Docker de la API

#### Autenticación
- `GOOGLE_CLIENT_ID`: ID de cliente de Google OAuth

#### Personalización
- `APP_NAME`: Nombre de la aplicación
- `ORGANIZATION_NAME`: Nombre de la organización
- `LOGO_BG_COLOR`: Color de fondo del logo
- `LOGO_TEXT_COLOR`: Color del texto del logo

#### Desarrollo
- `NODE_ENV`: Entorno (development/production)
- `MOCK_ENABLED`: Habilitar API simulada
- `DEV_TOOLS_ENABLED`: Habilitar herramientas de desarrollo

#### Puertos
- `WEB_PORT`: Puerto para la aplicación web
- `API_PORT`: Puerto para la API

## 🔧 Desarrollo

### Modos de ejecución

#### Desarrollo con Hot Reload
```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

#### Producción
```bash
docker compose up -d
```

### DevTools

1. Activa el modo desarrollo en la pantalla de login
2. Usa las DevTools para:
   - Ver requests/responses
   - Alternar entre API real y simulada
   - Depurar errores

## 📝 Licencia

Copyright © 2024 Universidad del Chubut