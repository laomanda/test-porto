// tiga dimensi
document.addEventListener('mousemove', function(e) {
    const foodElements = document.querySelectorAll('.floating-food');
    
    foodElements.forEach(function(element) {
        const moveX = (e.clientX - window.innerWidth / 2) / 50;
        const moveY = (e.clientY - window.innerHeight / 2) / 50;
        
        element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotate3d(1, 2, 1, ${15 + moveX}deg)`;
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});