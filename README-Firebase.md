# 🔥 Configuración de Firebase para Instagram Login

## 📋 Pasos para configurar Firebase

### 1. Crear proyecto en Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto"
3. Ingresa el nombre del proyecto (ej: "instagram-login-demo")
4. Desactiva Google Analytics (opcional)
5. Haz clic en "Crear proyecto"

### 2. Agregar aplicación web
1. En el panel del proyecto, haz clic en el ícono web `</>`
2. Registra tu aplicación con un nombre (ej: "Instagram Login App")
3. **NO marques** "También configura Firebase Hosting"
4. Haz clic en "Registrar aplicación"
5. **Copia la configuración** que aparece (será algo como esto):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "tu-proyecto-id.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};
```

### 3. Configurar autenticación
1. En el panel izquierdo, haz clic en "Authentication"
2. Haz clic en "Comenzar"
3. Ve a la pestaña "Sign-in method"
4. **Habilita "Email/Password"**:
   - Haz clic en "Email/Password"
   - Activa el primer toggle
   - Haz clic en "Guardar"
5. **Habilita "Google"**:
   - Haz clic en "Google"
   - Activa el toggle
   - Selecciona un email de soporte
   - Haz clic en "Guardar"

### 4. Actualizar el código
1. Abre el archivo `index.html`
2. Busca la sección de configuración de Firebase (líneas 19-26)
3. Reemplaza los valores con los de tu proyecto:

```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY_AQUI",
    authDomain: "TU_PROJECT_ID.firebaseapp.com",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_PROJECT_ID.appspot.com",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
};
```

### 5. Configurar dominios autorizados
1. En Authentication > Settings > Authorized domains
2. Agrega tu dominio (para desarrollo local, usa `localhost`)

## 🚀 Funcionalidades incluidas

### ✅ Login con email/contraseña
- Validación de campos
- Manejo de errores específicos
- Mensajes de éxito/error

### ✅ Registro de usuarios
- Validación de contraseñas
- Confirmación de contraseña
- Creación de cuenta

### ✅ Login con Google
- Autenticación con popup
- Manejo de errores de popup

### ✅ Interfaz completa
- Formularios responsivos
- Mensajes de estado
- Transiciones suaves
- Diseño idéntico a Instagram

## 🔧 Archivos del proyecto

- `index.html` - Página principal con formularios
- `style.css` - Estilos CSS
- `auth.js` - Lógica de autenticación
- `firebase-config-example.js` - Ejemplo de configuración

## 🐛 Solución de problemas

### Error: "Firebase no está configurado"
- Verifica que hayas reemplazado la configuración en `index.html`
- Asegúrate de que Firebase esté cargado correctamente

### Error: "Domain not authorized"
- Agrega tu dominio en Firebase Console > Authentication > Settings

### Error: "Popup blocked"
- Asegúrate de permitir popups en tu navegador
- Prueba en modo incógnito

## 📱 Prueba la aplicación

1. Abre `index.html` en tu navegador
2. Intenta registrarte con un email válido
3. Inicia sesión con las credenciales creadas
4. Prueba el login con Google

¡Listo! Tu aplicación de login con Firebase está funcionando. 🎉
