document.addEventListener('DOMContentLoaded', () => {

  // 1. تحديث سنة الفوتر تلقائياً
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. شاشة الترحيب (Welcome Screen)
  const welcomeScreen = document.getElementById('welcome-screen');
  const enterBtn = document.getElementById('enter-site');

  if (enterBtn && welcomeScreen) {
    enterBtn.addEventListener('click', () => {
      welcomeScreen.classList.add('hidden');
    });

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40 && !welcomeScreen.classList.contains('hidden')) {
        welcomeScreen.classList.add('hidden');
      }
    });
  }

  // 3. تبديل الثيم وحفظه (Dark / Light Theme)
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.textContent = savedTheme === 'light' ? '☾' : '☼';

    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const nextTheme = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
      themeToggle.textContent = nextTheme === 'light' ? '☾' : '☼';
    });
  }

  // 4. تفعيل قائمة الموبايل والتابلت (Menu Toggle)
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav-active');
      menuToggle.textContent = navLinks.classList.contains('nav-active') ? '✕' : '☰';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        menuToggle.textContent = '☰';
      });
    });
  }

  // 5. قسم المهارات التفاعلي
  const skillsData = {
    "HTML5": "Building clean, semantic, and SEO-friendly structures.",
    "CSS3": "Advanced 3D transforms, CSS Grid, Flexbox, and fluid animations.",
    "Vanilla JavaScript": "Core modern ES6+, DOM manipulation, event loops, and math/logic programming.",
    "APIs & JSON": "Consuming REST APIs, async/await workflows, and handling real-time data.",
    "C++": "Foundational programming, problem-solving, algorithms, and OOP at SVU.",
    "C#": "Object-oriented design patterns, software architecture, and desktop fundamentals.",
    "Python": "Scripting, algorithmic challenges, and core computer science logic.",
    "Git": "Version control, commit history management, branching, and team workflows.",
    "GitHub Pages": "Automated deployments, custom domain setups, and repository hosting.",
    "Postman": "Testing endpoints, inspecting headers/payloads, and mock server workflows.",
    "VS Code": "Primary development environment with custom dark setups and essential tooling.",
    "Telegram Bots": "Designing conversational UI and deploying interactive bots via Telegram API."
  };

  const skillButtons = document.querySelectorAll('.skill');
  const skillInfo = document.getElementById('skill-info');

  skillButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      skillButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const skillKey = btn.getAttribute('data-skill');
      const description = skillsData[skillKey] || "Continuous improvement and practical projects in this area.";

      if (skillInfo) {
        skillInfo.innerHTML = `<p><strong>${skillKey}:</strong> ${description}</p>`;
      }
    });
  });

  // 6. تفاعل العيون بمشروع The Stalking Eyes مع الماوس
  const miniPupils = document.querySelectorAll('.mini-pupil');
  window.addEventListener('mousemove', (e) => {
    miniPupils.forEach(pupil => {
      const rect = pupil.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - eyeCenterX;
      const deltaY = e.clientY - eyeCenterY;
      const angle = Math.atan2(deltaY, deltaX);

      const distance = Math.min(10, Math.hypot(deltaX, deltaY) / 15);
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      pupil.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
  });

  // 7. جلب إحصائيات GitHub الحقيقية لحسابك amanaldaher
  async function fetchGitHubStats(username) {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.ok) {
        const data = await response.json();
        const repoCount = document.getElementById('repo-count');
        const followerCount = document.getElementById('follower-count');
        const followingCount = document.getElementById('following-count');
        const usernameDisplay = document.getElementById('github-username');
        const profileLink = document.getElementById('github-profile-link');

        if (repoCount) repoCount.textContent = data.public_repos;
        if (followerCount) followerCount.textContent = data.followers;
        if (followingCount) followingCount.textContent = data.following;
        if (usernameDisplay) usernameDisplay.textContent = `@${data.login}`;
        if (profileLink) profileLink.href = data.html_url;
      }
    } catch (err) {
      console.log('GitHub API offline:', err);
    }
  }

  fetchGitHubStats('amanaldaher');

  // 8. مراقبة السكرول وظهور العناصر بنعومة (Scroll Reveal)
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));

  // 9. زر الرجوع للأعلى (Back To Top)
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});