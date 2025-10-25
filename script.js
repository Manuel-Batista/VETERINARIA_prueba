document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const appointmentForm = document.getElementById('appointmentForm'); // Nuevo formulario
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));

    /**
     * Función para validar un correo electrónico básico.
     * @param {string} email - El correo a validar.
     * @returns {boolean} - True si el email es válido, false en caso contrario.
     */
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Función para simular el envío del correo y mostrar el modal.
     * @param {string} name - Nombre del remitente.
     * @param {string} email - Correo del remitente.
     * @param {string} message - Mensaje.
     */
    function simulateMailtoAndShowModal(name, email, message) {
        // Construye el enlace mailto (simula la detección del intento de enviar)
        const subject = encodeURIComponent(`Consulta de ${name} - Clínica Veterinaria`);
        const body = encodeURIComponent(`De: ${name}\nEmail: ${email}\nMensaje:\n${message}`);
        const mailtoLink = `mailto:info@amoranimal.com?subject=${subject}&body=${body}`;

        window.location.href = mailtoLink;

        // Mostrar el modal de confirmación después de un breve retraso
        setTimeout(() => {
            // El modal de confirmación se usa para el formulario de contacto (mailto)
            confirmationModal.show();
        }, 500);
    }

    /**
     * Función para validar y resetear un formulario dado.
     * @param {HTMLElement} form - El formulario a validar.
     * @returns {boolean} - True si el formulario es válido.
     */
    function validateForm(form) {
        let formIsValid = true;
        
        // Obtiene todos los campos requeridos
        const requiredInputs = form.querySelectorAll('[required]');

        requiredInputs.forEach(input => {
            const trimmedValue = input.value.trim();
            let inputValid = true;

            if (trimmedValue === '') {
                inputValid = false;
            } else if (input.type === 'email' && !isValidEmail(trimmedValue)) {
                inputValid = false;
            } else if (input.tagName === 'SELECT' && trimmedValue === '') {
                 inputValid = false;
            }

            if (!inputValid) {
                input.classList.add('is-invalid');
                formIsValid = false;
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
        });
        
        return formIsValid;
    }

    // 1. Manejador del Formulario de Contacto (Correo mailto)
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        if (validateForm(contactForm)) {
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            simulateMailtoAndShowModal(
                nameInput.value.trim(),
                emailInput.value.trim(),
                messageInput.value.trim()
            );

            // Resetear y limpiar clases después de la simulación
            contactForm.reset();
            contactForm.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
        }
    });

    // 2. Manejador del Formulario de Agendamiento (Simulación simple)
    appointmentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (validateForm(appointmentForm)) {
            alert("✅ Cita Solicitada con Éxito. Hemos simulado el envío a nuestro sistema de agenda. Revisa tu email para la confirmación. ¡Gracias!");
            
            // Resetear y limpiar clases después de la simulación
            appointmentForm.reset();
            appointmentForm.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
        } else {
            alert("⚠️ Por favor, completa todos los campos requeridos para agendar tu cita.");
        }
    });
    
    // Función para añadir la validación 'is-valid'/'is-invalid' en tiempo real
    const allInputs = document.querySelectorAll('#contactForm [required], #appointmentForm [required]');
    
    allInputs.forEach(input => {
        input.addEventListener('input', () => {
            const trimmedValue = input.value.trim();
            let inputValid = true;

            if (trimmedValue === '') {
                inputValid = false;
            } else if (input.type === 'email' && !isValidEmail(trimmedValue)) {
                inputValid = false;
            } else if (input.tagName === 'SELECT' && trimmedValue === '') {
                 inputValid = false;
            }
            
            if (inputValid) {
                input.classList.add('is-valid');
                input.classList.remove('is-invalid');
            } else {
                input.classList.remove('is-valid');
                if (trimmedValue !== '') {
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            }
        });
    });

    // Al cerrar el modal, asegura el foco
    document.getElementById('confirmationModal').addEventListener('hidden.bs.modal', function () {
        document.body.focus();
    });
});