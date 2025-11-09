// proyectos_scripts.js - Scripts específicos para páginas de proyectos
document.addEventListener('DOMContentLoaded', function () {
    // ========== MENÚ MÓVIL ==========
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');

            // Animación de hamburguesa a X
            const bars = this.querySelectorAll('.bar');
            if (this.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && mobileMenu) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
                const bars = mobileMenu.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });

    // ========== DROPDOWN MENÚ PROYECTOS ==========
    const proyectosLink = document.querySelector('.nav-links a[href="#proyectos"]');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (proyectosLink && dropdownMenu) {
        proyectosLink.addEventListener('click', function (e) {
            e.preventDefault();
            dropdownMenu.classList.toggle('active');
        });

        // Cerrar dropdown al hacer clic fuera
        document.addEventListener('click', function (e) {
            if (!proyectosLink.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove('active');
            }
        });
    }

    // ========== MODAL DE RESUMEN ==========
    const resumenButtons = document.querySelectorAll('.btn-resumen');
    const resumenModal = document.getElementById('resumen-modal');
    const closeResumenModal = document.querySelector('.close-resumen-modal');

    // Función para abrir modal de resumen
    resumenButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('h2').textContent;
            const projectDescription = projectCard.querySelector('p').textContent;
            const projectTech = Array.from(projectCard.querySelectorAll('.project-tech span')).map(span => span.textContent);
            const projectCategory = projectCard.getAttribute('data-category');

            // Crear contenido del resumen
            createResumenContent(projectTitle, projectDescription, projectTech, projectCategory);

            // Mostrar modal
            resumenModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Función para crear contenido del resumen
    function createResumenContent(title, description, tech, category) {
        const modalBody = document.querySelector('.resumen-modal-body');

        // Determinar características basadas en la categoría
        let features = [];
        let status = '';

        switch (category) {
            case 'web':
                features = [
                    { icon: '🖥️', title: 'Diseño Responsive', desc: 'Compatible con todos los dispositivos y tamaños de pantalla' },
                    { icon: '⚡', title: 'Performance', desc: 'Optimizado para máxima velocidad de carga' },
                    { icon: '🔍', title: 'SEO Optimizado', desc: 'Estructura semántica para mejor posicionamiento' },
                    { icon: '🎨', title: 'UI/UX Moderno', desc: 'Interfaz intuitiva y experiencia de usuario fluida' }
                ];
                status = 'Proyecto completado y en producción. Mejoras continuas basadas en analytics y feedback de usuarios.';
                break;

            case 'apps':
                features = [
                    { icon: '📱', title: 'Multiplataforma', desc: 'Funciona en iOS y Android con código compartido' },
                    { icon: '☁️', title: 'Sincronización Cloud', desc: 'Datos sincronizados en tiempo real' },
                    { icon: '🔔', title: 'Notificaciones', desc: 'Alertas inteligentes y personalizables' },
                    { icon: '🎯', title: 'Offline First', desc: 'Funcionalidad sin conexión a internet' }
                ];
                status = 'Aplicación publicada en stores oficiales. Actualizaciones regulares con nuevas funcionalidades.';
                break;

            case 'videojuegos':
                features = [
                    { icon: '🎮', title: 'Gameplay Fluido', desc: 'Mecánicas suaves y respuesta inmediata' },
                    { icon: '🎨', title: 'Arte Digital', desc: 'Gráficos optimizados y estilo visual único' },
                    { icon: '🏆', title: 'Sistema de Logros', desc: 'Retos y recompensas para jugadores' },
                    { icon: '🌍', title: 'Mundo Inmersivo', desc: 'Ambiente envolvente y narrativa atractiva' }
                ];
                status = 'Videojuego disponible en plataformas digitales. Comunidad activa de jugadores.';
                break;

            case 'futuros':
                features = [
                    { icon: '💡', title: 'Innovación', desc: 'Tecnologías de vanguardia y enfoque único' },
                    { icon: '📊', title: 'Planificación', desc: 'Metodología ágil y desarrollo iterativo' },
                    { icon: '🔧', title: 'Arquitectura Sólida', desc: 'Base técnica escalable y mantenible' },
                    { icon: '🎯', title: 'Enfoque Usuario', desc: 'Centrado en resolver problemas reales' }
                ];
                status = 'Proyecto en fase de planificación. Próximamente más detalles sobre el desarrollo.';
                break;
        }

        const resumenHTML = `
            <div class="resumen-content">
                <h4>📋 Descripción del Proyecto</h4>
                <p>${description}</p>
                
                <h4>🛠️ Tecnologías Utilizadas</h4>
                <div class="resumen-tech">
                    ${tech.map(technology => `<span>${technology}</span>`).join('')}
                </div>
                
                <h4>🎯 Características Principales</h4>
                <div class="resumen-features">
                    ${features.map(feature => `
                        <div class="resumen-feature">
                            <h5>${feature.icon} ${feature.title}</h5>
                            <p>${feature.desc}</p>
                        </div>
                    `).join('')}
                </div>
                
                <div class="resumen-status">
                    <h5>🚀 Estado del Proyecto</h5>
                    <p>${status}</p>
                </div>
                
                <h4>📈 Impacto y Resultados</h4>
                <p>Este proyecto demuestra habilidades en desarrollo full-stack, diseño de interfaces y resolución de problemas técnicos. La arquitectura implementada permite escalabilidad y mantenibilidad a largo plazo.</p>
            </div>
        `;

        modalBody.innerHTML = resumenHTML;

        // Actualizar título del modal
        document.querySelector('.resumen-modal-header h3').textContent = `Resumen: ${title}`;
    }

    // Cerrar modal de resumen
    if (closeResumenModal) {
        closeResumenModal.addEventListener('click', closeResumenModalHandler);
    }

    function closeResumenModalHandler() {
        resumenModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Cerrar modal al hacer clic fuera del contenido
    resumenModal.addEventListener('click', function (e) {
        if (e.target === resumenModal) {
            closeResumenModalHandler();
        }
    });

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && resumenModal.classList.contains('active')) {
            closeResumenModalHandler();
        }
    });

    // ========== SCROLL SUAVE ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && !href.startsWith('http') && !href.startsWith('#resumen')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.page-header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========== ANIMACIONES AL SCROLL ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animar
    document.querySelectorAll('.project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ========== FUNCIONES GLOBALES ==========
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    let visibleCount = 0;

    projects.forEach(project => {
        if (category === 'all' || project.getAttribute('data-category') === category) {
            project.style.display = 'block';
            visibleCount++;

            // Animación de entrada
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, 100);
        } else {
            // Animación de salida
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}