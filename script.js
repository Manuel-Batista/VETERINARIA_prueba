document.addEventListener("DOMContentLoaded", () => {
  // Scroll suave para enlaces del navbar
  document.querySelectorAll("a.nav-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Datos testimonios
  const testimoniosData = [
    { nombre: "Carlos Pérez", comentario: "Muy buena atención y cuidado para mi perro. 🐶✨", foto: "https://randomuser.me/api/portraits/men/12.jpg", icono: "fa-thumbs-up" },
    { nombre: "María López", comentario: "Personal muy profesional y amable. ¡Recomendado! 🐱❤️", foto: "https://randomuser.me/api/portraits/women/22.jpg", icono: "fa-heart" },
    { nombre: "José Martínez", comentario: "Mi gato se siente mucho mejor gracias a la clínica. 😺👌", foto: "https://randomuser.me/api/portraits/men/34.jpg", icono: "fa-paw" },
    { nombre: "Ana Torres", comentario: "Excelente servicio de peluquería para mi mascota. ✂️🐩", foto: "https://randomuser.me/api/portraits/women/45.jpg", icono: "fa-cut" },
    { nombre: "Luis Fernández", comentario: "Siempre atentos y con un trato muy cordial. ⭐🐕", foto: "https://randomuser.me/api/portraits/men/54.jpg", icono: "fa-star" },
    { nombre: "Sofía Rojas", comentario: "El mejor lugar para el cuidado de mis mascotas. 😍🐾", foto: "https://randomuser.me/api/portraits/women/58.jpg", icono: "fa-smile" },
    { nombre: "Miguel Gómez", comentario: "Confianza total, profesionales capacitados. 🩺🐾", foto: "https://randomuser.me/api/portraits/men/67.jpg", icono: "fa-shield-alt" },
    { nombre: "Laura Díaz", comentario: "Procedimientos quirúrgicos impecables y atención humana. ❤️‍🩹🐕", foto: "https://randomuser.me/api/portraits/women/70.jpg", icono: "fa-hand-holding-medical" },
    { nombre: "Pedro Hernández", comentario: "Muy recomendable, precios justos y excelentes resultados. 💰👍", foto: "https://randomuser.me/api/portraits/men/78.jpg", icono: "fa-dollar-sign" },
    { nombre: "Elena Ruiz", comentario: "Gracias por cuidar tan bien de nuestras mascotas. 🐕🐈", foto: "https://randomuser.me/api/portraits/women/85.jpg", icono: "fa-heart-circle-check" }
  ];

  const testimonialsGroup = document.querySelector(".testimonials-group");

  function crearTestimonioCard(testimonio) {
    const card = document.createElement("div");
    card.className = "card p-3";
    card.innerHTML = `
      <img src="${testimonio.foto}" alt="Foto de ${testimonio.nombre}" class="client-photo mx-auto d-block" />
      <h5 class="text-center mt-2">${testimonio.nombre}</h5>
      <p class="text-center fst-italic">${testimonio.comentario}</p>
      <div class="text-center text-secondary fs-4"><i class="fa-solid ${testimonio.icono}"></i></div>
    `;
    return card;
  }

  // Insertar testimonios
  testimoniosData.forEach(testimonio => testimonialsGroup.appendChild(crearTestimonioCard(testimonio)));

  // Carrusel testimonios botones
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  prevBtn.addEventListener("click", () => {
    const cardWidth = testimonialsGroup.querySelector(".card").offsetWidth;
    const gap = 12;
    testimonialsGroup.scrollBy({
      left: -(cardWidth * 4 + gap * 3),
      behavior: "smooth",
    });
  });

  nextBtn.addEventListener("click", () => {
    const cardWidth = testimonialsGroup.querySelector(".card").offsetWidth;
    const gap = 12;
    testimonialsGroup.scrollBy({
      left: cardWidth * 4 + gap * 3,
      behavior: "smooth",
    });
  });

  // Validación Formulario contacto
  const contactoForm = document.getElementById("contactForm");
  contactoForm.addEventListener("submit", e => {
    e.preventDefault();
    if (!contactoForm.checkValidity()) {
      e.stopPropagation();
      contactoForm.classList.add("was-validated");
      return;
    }
    const nombre = contactoForm.nombre.value.trim();
    const email = contactoForm.email.value.trim();
    const mensaje = contactoForm.mensaje.value.trim();
    const mailtoLink = `mailto:contacto@clinicaveterinariasd.com?subject=Mensaje de ${encodeURIComponent(nombre)}&body=${encodeURIComponent(mensaje + "\n\nCorreo: " + email)}`;
    window.location.href = mailtoLink;
    const modal = new bootstrap.Modal(document.getElementById("modalConfirmacion"));
    modal.show();
    contactoForm.reset();
    contactoForm.classList.remove("was-validated");
  });

  // Validación Formulario agendamiento
  const bookingForm = document.getElementById("bookingForm");
  bookingForm.addEventListener("submit", e => {
    e.preventDefault();
    if (!bookingForm.checkValidity()) {
      e.stopPropagation();
      bookingForm.classList.add("was-validated");
      return;
    }
    // Simular envío y mostrar modal
    const modal = new bootstrap.Modal(document.getElementById("modalConfirmacion"));
    modal.show();
    bookingForm.reset();
    bookingForm.classList.remove("was-validated");
  });

  // Detectar apertura cliente correo y mostrar modal (contacto)
  window.addEventListener("blur", () => {
    setTimeout(() => {
      const modal = new bootstrap.Modal(document.getElementById("modalConfirmacion"));
      if (!document.getElementById("modalConfirmacion").classList.contains('show')) {
        modal.show();
      }
    }, 500);
  });
});