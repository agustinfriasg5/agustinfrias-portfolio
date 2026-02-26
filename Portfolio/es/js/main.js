gsap.registerPlugin(ScrollTrigger);

window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

const counters = document.querySelectorAll('.stat-number');
counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    gsap.to(counter, {
        innerHTML: target,
        duration: 2,
        delay: 0.5,
        snap: { innerHTML: 1 },
        ease: "power2.out"
    });
});

const reveals = document.querySelectorAll('.reveal');
reveals.forEach((reveal) => {
    gsap.fromTo(reveal, 
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: reveal,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

const canvasContainer = document.getElementById('canvas-container');
if (canvasContainer) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasContainer.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x6366f1,
        transparent: true,
        opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    camera.position.z = 3;

    function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
// Stack categories stagger
        gsap.from('.stack-category', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.stack-grid',
                start: 'top 80%'
            }
        });