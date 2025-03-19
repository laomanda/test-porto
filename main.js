// Initialize Three.js Scene
const initThreeScene = () => {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add point light
    const pointLight = new THREE.PointLight(0x06b6d4, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x06b6d4
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add floating objects
    const addFloatingObject = (x, y, z, color) => {
        const geometry = new THREE.IcosahedronGeometry(0.3, 0);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            wireframe: true
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        scene.add(mesh);
        return mesh;
    };
    
    const floatingObjects = [
        addFloatingObject(-2, 0, -5, 0x2563eb),
        addFloatingObject(2, 1, -3, 0x06b6d4),
        addFloatingObject(0, -1, -4, 0x3b82f6),
        addFloatingObject(1, 0, -7, 0x0ea5e9),
        addFloatingObject(-1, 1, -6, 0x2563eb)
    ];
    
    // Position camera
    camera.position.z = 3;
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        
        // Rotate particles
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        // Move scene slightly based on mouse position
        scene.rotation.y += (mouseX * 0.05 - scene.rotation.y) * 0.05;
        scene.rotation.x += (mouseY * 0.05 - scene.rotation.x) * 0.05;
        
        // Animate floating objects
        floatingObjects.forEach((obj, i) => {
            obj.rotation.x += 0.01;
            obj.rotation.y += 0.005;
            obj.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
        });
        
        renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// Initialize all animations and effects
const initAnimations = () => {
    // Scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section-title, .skill-card, .project-card, .about-content, .contact-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.8) {
                gsap.to(element, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            }
        });
    };
    
    // Set initial state
    gsap.set('.section-title, .skill-card, .project-card, .about-content, .contact-item', {
        opacity: 0,
        y: 50
    });
    
    // Hero animation
    gsap.fromTo('.hero-content', {
        opacity: 0,
        y: 50
    }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.5
    });
    
    // Progress bar animation
    const animateProgressBars = () => {
        const progressBars = document.querySelectorAll('.progress');
        
        progressBars.forEach(bar => {
            const target = bar.getAttribute('style').split(':')[1].trim().split(';')[0];
            gsap.fromTo(bar, {
                width: '0%'
            }, {
                width: target,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: bar,
                    start: 'top 80%'
                }
            });
        });
    };
    
    // Listen for scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
    
    // Mouse follower effect
    const cursor = document.createElement('div');
    cursor.classList.add('glow');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
};

// Navigation and UI functionality
const initUI = () => {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const backToTop = document.getElementById('backToTop');
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Scroll event for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (window.scrollY > 500) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    // Back to top button
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Form handling
const initForm = () => {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !subject || !message) {
            alert('Mohon isi semua field.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.innerHTML = 'Mengirim... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Pesan Anda telah dikirim! Terima kasih.');
            contactForm.reset();
            submitBtn.innerHTML = 'Kirim Pesan <i class="fas fa-paper-plane"></i>';
            submitBtn.disabled = false;
        }, 2000);
    });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Show loading screen
    const loader = document.querySelector('.loader');
    
    // Initialize Three.js after a short delay
    setTimeout(() => {
        initThreeScene();
        initAnimations();
        initUI();
        initForm();
        
        // Hide loader
        loader.classList.add('fade');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
});