/* ==========================================================================
   SOFT COMIC THEME - SCRIPT.JS
   Interactive Love Story with Comic Vibe (Multi-Stage Intro)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Global Elements
  const introScreen = document.getElementById("intro-screen");
  const mainContent = document.getElementById("main-content");
  const introYesBtn = document.getElementById("intro-yes-btn");
  const introNoBtn = document.getElementById("intro-no-btn");
  const finallyBtn = document.getElementById("finally-btn");

  const bearImg = document.getElementById("bear-img");
  const introTitle = document.getElementById("intro-title");
  const introSubtitle = document.getElementById("intro-subtitle");

  // Overlays
  const quizOverlay = document.getElementById("quiz-overlay");
  const letterOverlay = document.getElementById("letter-overlay");
  const photoOverlay = document.getElementById("photo-wall-overlay");

  /* ==========================================================================
     1. INTRO SCREEN LOGIC (Multi-Stage)
     ========================================================================== */

  let noClickCount = 0;

  // Stage logic when NO is clicked
  introNoBtn.addEventListener("click", (e) => {
    noClickCount++;
    const isMobile = window.innerWidth < 640;

    // Growth capped for mobile
    if (noClickCount === 1) {
      bearImg.src = "assets/bear_think_again.png";
      introTitle.textContent = "Think again 😭";
      introSubtitle.textContent =
        "Don't break my heart just yet... give it another thought!";
      introYesBtn.style.transform = `scale(${isMobile ? 1.25 : 1.5})`;
    } else if (noClickCount === 2) {
      bearImg.src = "assets/bear_angry.png";
      introTitle.textContent = "Are you sure 😡?";
      introSubtitle.textContent = "I am not playing anymore! Last chance!";
      introYesBtn.style.transform = `scale(${isMobile ? 1.5 : 2})`;
    } else if (noClickCount >= 3) {
      bearImg.src = "assets/final_warning.png";
      introTitle.textContent = "See this 🤧";
      introSubtitle.textContent =
        "You really want to risk it? Choose wisely...";

      // Fluid take over instead of raw scale
      introNoBtn.style.display = "none";
      introYesBtn.style.width = "100%";
      introYesBtn.style.transform = "scale(1)";
      introYesBtn.style.padding = isMobile ? "20px 10px" : "30px 20px";
      introYesBtn.style.fontSize = isMobile ? "1.1rem" : "1.6rem";
      introYesBtn.textContent = "YES, OKAY! I LOVE YOU! ❤️";
    }
    introYesBtn.style.zIndex = "1000";
  });

  // Yes button starts the journey
  introYesBtn.addEventListener("click", () => {
    startCelebration();
    introScreen.style.opacity = "0";
    introScreen.style.transform = "scale(0.8) rotate(-10deg)";

    setTimeout(() => {
      introScreen.classList.add("hidden");
      mainContent.classList.remove("hidden");
      initHeartsCanvas();
    }, 800);
  });

  /* ==========================================================================
     2. GIFTS LOGIC
     ========================================================================== */

  document.getElementById("gift-1").addEventListener("click", () => {
    quizOverlay.classList.remove("hidden");
    loadQuizQuestion();
  });

  document.getElementById("gift-2").addEventListener("click", () => {
    letterOverlay.classList.remove("hidden");
  });

  document.getElementById("gift-3").addEventListener("click", () => {
    photoOverlay.classList.remove("hidden");
    initPhotoWall();
  });

  // Back Buttons
  document.querySelectorAll(".quiz-back-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".quiz-overlay").classList.add("hidden");
    });
  });

  /* ==========================================================================
     3. QUIZ LOGIC
     ========================================================================== */

  let currentQ = 0;
  const QUIZ_DATA = [
    {
      q: "Who is the 'Boss' here? 😏",
      o: ["Obviously You", "Me", "My Mom"],
      a: 0,
    },
    {
      q: "Where was our first date? ☕",
      o: ["Park", "Café", "Movie"],
      a: 1,
    },
    {
      q: "How much do I love you? ❤️",
      o: ["A Little", "A Lot", "To Infinity"],
      a: 2,
    },
  ];

  function loadQuizQuestion() {
    const qText = document.getElementById("quiz-question-text");
    const qOpts = document.getElementById("quiz-options");
    const qErr = document.getElementById("quiz-error");
    const qSucc = document.getElementById("quiz-success");

    qErr.classList.add("hidden");

    if (currentQ >= QUIZ_DATA.length) {
      qText.classList.add("hidden");
      qOpts.classList.add("hidden");
      qSucc.classList.remove("hidden");
      return;
    }

    const data = QUIZ_DATA[currentQ];
    qText.textContent = data.q;
    qOpts.innerHTML = "";

    data.o.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.textContent = opt;
      btn.onclick = () => {
        if (idx === data.a) {
          currentQ++;
          loadQuizQuestion();
        } else {
          qErr.classList.remove("hidden");
          btn.animate(
            [
              { transform: "translateX(0)" },
              { transform: "translateX(-10px)" },
              { transform: "translateX(10px)" },
              { transform: "translateX(0)" },
            ],
            { duration: 300 },
          );
        }
      };
      qOpts.appendChild(btn);
    });
  }

  /* ==========================================================================
     4. PHOTO WALL LOGIC
     ========================================================================== */

  function initPhotoWall() {
    const grid = document.getElementById("photo-grid");
    if (grid.children.length > 0) return;

    const captions = [
      "Pure Happiness ✨",
      "Me & You ❤️",
      "That Smile! 😊",
      "Perfect Day 📸",
      "My Favorite 💖",
      "Forever Us 💍",
      "Sweet Memories 🍬",
      "Only You 🌙",
      "Better Together 👩‍❤️‍👨",
      "My Whole World 🌎",
      "Simply Cute 🌸",
      "Infinity Love ♾️",
      "Best Person 🏆",
      "Stay Forever 🥺",
      "Loving You 🌹",
      "My Heartbeat 💓",
      "Greatest Gift 🎁",
      "Magic Moments ✨",
      "True Love 💘",
      "Soulmate ❤️",
    ];

    for (let i = 1; i <= 20; i++) {
      const card = document.createElement("div");
      card.className = "polaroid-card";
      const rot = Math.random() * 8 - 4;
      card.style.setProperty("--rotation", `${rot}deg`);

      card.innerHTML = `
        <div class="polaroid-img">
          <img src="couple_imgs/${i}.jpeg" loading="lazy" alt="Memory">
        </div>
        <p class="polaroid-caption">${captions[i - 1] || "Moment #" + i}</p>
      `;
      grid.appendChild(card);
    }
  }

  /* ==========================================================================
     5. HEARTS CANVAS & CELEBRATION
     ========================================================================== */

  function initHeartsCanvas() {
    const canvas = document.getElementById("hearts-canvas");
    const ctx = canvas.getContext("2d");
    let hearts = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    class Heart {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 40;
        this.size = Math.random() * 15 + 10;
        this.speed = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        const colors = ["#ff85a2", "#ffdae9", "#fef3c7", "#ffffff"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.y -= this.speed;
        if (this.y < -40) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.font = `${this.size}px serif`;
        ctx.fillText(
          ["❤️", "💖", "🌸"][Math.floor(Math.random() * 3)],
          this.x,
          this.y,
        );
        ctx.restore();
      }
    }

    for (let i = 0; i < 25; i++) hearts.push(new Heart());

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hearts.forEach((h) => {
        h.update();
        h.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }

  function startCelebration() {
    for (let i = 0; i < 30; i++) {
      const piece = document.createElement("div");
      piece.textContent = ["❤️", "💖", "✨", "🌸", "🍭"][
        Math.floor(Math.random() * 5)
      ];
      piece.style.position = "fixed";
      piece.style.left = "50%";
      piece.style.top = "50%";
      piece.style.fontSize = "2rem";
      piece.style.pointerEvents = "none";
      piece.style.zIndex = "10001";
      document.body.appendChild(piece);

      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 300 + 100;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;

      piece.animate(
        [
          {
            transform: "translate(-50%, -50%) scale(0) rotate(0deg)",
            opacity: 1,
          },
          {
            transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(2) rotate(${Math.random() * 360}deg)`,
            opacity: 0,
          },
        ],
        {
          duration: 1000 + Math.random() * 1000,
          easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        },
      ).onfinish = () => piece.remove();
    }
  }

  /* ==========================================================================
     6. FINALLY BUTTON
     ========================================================================== */

  finallyBtn.addEventListener("click", () => {
    startCelebration();
    finallyBtn.textContent = "HERE WE GO! ❤️";
    finallyBtn.style.transform = "scale(0.9)";

    setTimeout(() => {
      window.location.href = "final.html";
    }, 2000);
  });
});
