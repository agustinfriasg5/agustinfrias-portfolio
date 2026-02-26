 // Custom Cursor
        const cursor = document.querySelector('.cursor');
        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX - 10 + 'px';
            cursor.style.top = mouseY - 10 + 'px';
        });

        document.querySelectorAll('a, button, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });

        // Navbar scroll
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            nav.classList.toggle('scrolled', window.scrollY > 50);
        });

        // GSAP Animations
        gsap.registerPlugin(ScrollTrigger);

        // Stats counter
        const stats = document.querySelectorAll('.stat-value');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            gsap.to(stat, {
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%'
                }
            });
        });

        // Project cards reveal
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.2,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%'
                }
            });
        });

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