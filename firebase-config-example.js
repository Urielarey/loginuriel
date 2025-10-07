// firebase-config-example.js
// Este archivo muestra cómo configurar Firebase
// Copia este archivo y renómbralo a firebase-config.js
// Luego reemplaza los valores con los de tu proyecto Firebase

const firebaseConfig = {
    // Tu API Key de Firebase
    apiKey: "AIzaSyAbsuJ0C9uk5HIpgtwqAaaw-0hUAPlWKKs",
    
    // Tu dominio de autenticación
    authDomain: "instagram-login-demo-3ae71.firebaseapp.com",
    
    // Tu ID de proyecto
    projectId: "instagram-login-demo-3ae71",
    
    // Tu bucket de almacenamiento
    storageBucket: "instagram-login-demo-3ae71.firebasestorage.app",
    
    // Tu ID de mensajería
    messagingSenderId: "388411006759",
    
    // Tu ID de aplicación
    appId: "1:388411006759:web:2d72254c3390ce012d9302"
};

// INSTRUCCIONES PARA OBTENER TU CONFIGURACIÓN:
//
// 1. Ve a https://console.firebase.google.com/
// 2. Crea un nuevo proyecto o selecciona uno existente
// 3. Ve a "Configuración del proyecto" (ícono de engranaje)
// 4. En la pestaña "General", desplázate hacia abajo hasta "Tus aplicaciones"
// 5. Haz clic en "Agregar aplicación" y selecciona "Web" (ícono </>)
// 6. Registra tu aplicación con un nombre
// 7. Copia la configuración que aparece en la sección "Configuración de Firebase SDK"
// 8. Reemplaza los valores en el archivo index.html en la sección de configuración de Firebase
//
// CONFIGURACIÓN ADICIONAL NECESARIA:
//
// Para habilitar la autenticación por email/contraseña:
// 1. Ve a "Authentication" en el panel izquierdo
// 2. Haz clic en "Get started"
// 3. Ve a la pestaña "Sign-in method"
// 4. Habilita "Email/Password"
//
// Para habilitar la autenticación con Google:
// 1. En la misma pestaña "Sign-in method"
// 2. Habilita "Google"
// 3. Configura el nombre del proyecto y email de soporte
// 4. Guarda la configuración

export { firebaseConfig };
