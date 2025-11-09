// scripts.js - Código Completo CORREGIDO para EmailJS + OPTIMIZACIONES
document.addEventListener('DOMContentLoaded', function () {
    console.log('=== INICIANDO CONFIGURACIÓN EMAILJS ===');
    console.log('Public Key: tKP1jG8HDLZFLp4u7');
    console.log('Service ID: service_l2jyi3a');
    console.log('Template ID: template_z4e8lmo');
    console.log('======================================');

    // ========== CONFIGURACIÓN EMAILJS ==========
    // Verificar que EmailJS esté cargado antes de inicializar
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS no se cargó correctamente. Verifica la URL del SDK.');
        showMessage('Error: EmailJS no se cargó correctamente', 'error');
        return;
    }

    try {
        // Inicializar EmailJS con tu Public Key
        emailjs.init("tKP1jG8HDLZFLp4u7");
        console.log('✅ EmailJS inicializado correctamente');
    } catch (error) {
        console.error('❌ Error inicializando EmailJS:', error);
        showMessage('Error al inicializar el servicio de email', 'error');
    }

    // ========== OPTIMIZACIONES DE RENDIMIENTO ==========
    initPerformanceOptimizations();

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

    // ========== SCROLL SUAVE OPTIMIZADO ==========
    initSmoothScroll();

    // ========== FORMULARIO DE CONTACTO ==========
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        // Validación en tiempo real
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                validateField(this);
            });

            input.addEventListener('input', function () {
                clearValidation(this);
            });
        });

        // Envío del formulario CORREGIDO
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            console.log('🔄 Iniciando envío del formulario...');

            if (validateForm()) {
                const submitBtn = this.querySelector('.btn');
                const btnText = this.querySelector('.btn-text');
                const loadingBtn = this.querySelector('.btn-loading');

                // Mostrar loading
                if (btnText && loadingBtn) {
                    btnText.style.display = 'none';
                    loadingBtn.style.display = 'inline-block';
                }
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.classList.add('btn-loading');
                }

                try {
                    // Verificar que EmailJS esté disponible
                    if (typeof emailjs === 'undefined' || !emailjs.send) {
                        throw new Error('EmailJS no está disponible');
                    }

                    // Preparar datos del formulario
                    const formData = {
                        from_name: document.getElementById('name').value,
                        from_email: document.getElementById('email').value,
                        subject: document.getElementById('subject').value,
                        message: document.getElementById('message').value
                    };

                    console.log('📤 Enviando formulario con datos:', formData);

                    // ✅ Enviar con EmailJS - FORMA CORRECTA
                    const result = await emailjs.send(
                        'service_l2jyi3a',  // Service ID
                        'template_z4e8lmo', // Template ID
                        formData            // Datos del formulario
                    );

                    console.log('✅ Email enviado correctamente:', result);
                    console.log('Status:', result.status);
                    console.log('Text:', result.text);

                    // Éxito
                    showMessage('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
                    contactForm.reset();

                } catch (error) {
                    console.error('❌ Error enviando el formulario:', error);
                    console.error('Detalles del error:', error);

                    // Mensaje de error específico
                    let errorMessage = 'Error al enviar el mensaje. ';

                    if (error.text) {
                        if (error.text.includes('Invalid template ID')) {
                            errorMessage += 'Error en la configuración del template. Verifica el Template ID.';
                        } else if (error.text.includes('Invalid service ID')) {
                            errorMessage += 'Error en la configuración del servicio. Verifica el Service ID.';
                        } else if (error.text.includes('Public Key is not valid')) {
                            errorMessage += 'Error en la clave pública. Verifica tu Public Key.';
                        } else {
                            errorMessage += error.text;
                        }
                    } else if (error.message) {
                        errorMessage += error.message;
                    } else {
                        errorMessage += 'Por favor, inténtalo de nuevo.';
                    }

                    showMessage(errorMessage, 'error');
                } finally {
                    // Ocultar loading y restaurar botón
                    if (btnText && loadingBtn) {
                        btnText.style.display = 'inline-block';
                        loadingBtn.style.display = 'none';
                    }
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('btn-loading');
                    }
                }
            }
        });
    }

    // ========== ANIMACIONES AL SCROLL OPTIMIZADAS ==========
    initScrollAnimations();

    // ========== HEADER SCROLL EFFECT OPTIMIZADO ==========
    initHeaderScrollEffect();

    // ========== LAZY LOADING PARA IMÁGENES ==========
    initLazyLoading();

    // ========== INICIALIZACIÓN ==========
    updateVisitCounter();

    // Mostrar año actual en footer
    const yearElement = document.querySelector('.copyright');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }
});

// ========== OPTIMIZACIONES DE RENDIMIENTO ==========

function initPerformanceOptimizations() {
    console.log('🚀 Inicializando optimizaciones de rendimiento...');
    
    // Debounce para eventos de scroll/resize
    window.addEventListener('scroll', debounce(() => {
        // Tu lógica de scroll aquí
    }, 10));
    
    window.addEventListener('resize', debounce(() => {
        // Tu lógica de resize aquí
    }, 250));
    
    // Métricas de rendimiento
    trackPerformance();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#inicio') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Dejar de observar después de la animación
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animar
    document.querySelectorAll('.project-card, .about-card, .skill-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initHeaderScrollEffect() {
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const header = document.querySelector('header');
                if (header) {
                    const scrollY = window.scrollY;

                    if (scrollY > 100) {
                        header.style.background = 'rgba(15, 20, 25, 0.98)';
                        header.style.backdropFilter = 'blur(15px)';
                        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
                    } else {
                        header.style.background = 'rgba(15, 20, 25, 0.95)';
                        header.style.backdropFilter = 'blur(10px)';
                        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

function initLazyLoading() {
    const lazyImages = [].slice.call(document.querySelectorAll('img[loading="lazy"]'));
    
    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.classList.add('loaded');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(lazyImage => {
            lazyImageObserver.observe(lazyImage);
        });
    }
}

function trackPerformance() {
    window.addEventListener('load', () => {
        // Usar Performance API si está disponible
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            const domContentLoaded = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
            
            console.log(`🚀 Métricas de Rendimiento:`);
            console.log(`📊 Tiempo de carga total: ${loadTime}ms`);
            console.log(`📊 DOM Content Loaded: ${domContentLoaded}ms`);
            
            if (loadTime > 3000) {
                console.warn('⚠️  Sitio lento - considerar optimizaciones adicionales');
            }
        }
    });
}

// ========== FUNCIONES AUXILIARES ==========

function validateField(field) {
    const value = field.value.trim();
    const validationMessage = field.parentNode.querySelector('.validation-message');

    if (field.hasAttribute('required') && !value) {
        showFieldError(field, validationMessage, 'Este campo es obligatorio');
        return false;
    }

    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, validationMessage, 'Por favor ingresa un email válido');
            return false;
        }
    }

    clearFieldError(field, validationMessage);
    return true;
}

function showFieldError(field, messageElement, message) {
    field.style.borderColor = '#e74c3c';
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.style.display = 'block';
    }
}

function clearFieldError(field, messageElement) {
    field.style.borderColor = '#4a5f7a';
    if (messageElement) {
        messageElement.style.display = 'none';
    }
}

function clearValidation(field) {
    const validationMessage = field.parentNode.querySelector('.validation-message');
    clearFieldError(field, validationMessage);
}

function validateForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return false;

    let isValid = true;
    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

function showMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';

        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    } else {
        // Fallback si no existe el elemento form-message
        console.log(`${type.toUpperCase()}: ${message}`);
    }
}

// ========== CONTADOR DE VISITAS ==========
function updateVisitCounter() {
    let visits = localStorage.getItem('portfolioVisits');
    visits = visits ? parseInt(visits) + 1 : 1;
    localStorage.setItem('portfolioVisits', visits);
    console.log(`👀 Visitas a tu portfolio: ${visits}`);
}

// ========== FUNCIONES GLOBALES ==========
// Para uso en otras páginas
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        if (category === 'all' || project.getAttribute('data-category') === category) {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, 100);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}

// Efecto de escritura para textos (opcional)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Función para verificar configuración de EmailJS
function checkEmailJSConfig() {
    console.log('🔍 Verificando configuración EmailJS:');
    console.log('Public Key: tKP1jG8HDLZFLp4u7');
    console.log('Service ID: service_l2jyi3a');
    console.log('Template ID: template_z4e8lmo');

    if (typeof emailjs !== 'undefined') {
        console.log('✅ EmailJS está cargado correctamente');
    } else {
        console.log('❌ EmailJS no está disponible');
    }
}

// Ejecutar verificación después de cargar la página
setTimeout(checkEmailJSConfig, 2000);


// Filtrado de proyectos
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease';
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.6s ease';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
});