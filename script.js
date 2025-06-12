document.addEventListener("DOMContentLoaded", function () {
  // --- Slideshow de fundo ---
  const bgPhotos = [
    "assets/bg1.jpg",
    // Adicione mais caminhos de imagens conforme desejar
  ];

  const bgSlideshow = document.getElementById("background-slideshow");
  let bgSlides = [];
  let currentBg = 0;

  function createBgSlides() {
    bgPhotos.forEach((src, idx) => {
      const img = document.createElement("img");
      img.src = src;
      img.className = "bg-slide";
      img.style.opacity = idx === 0 ? "0.25" : "0";
      bgSlideshow.appendChild(img);
      bgSlides.push(img);
    });
  }

  function startBgSlideshow() {
    setInterval(() => {
      bgSlides[currentBg].style.opacity = "0";
      currentBg = (currentBg + 1) % bgSlides.length;
      bgSlides[currentBg].style.opacity = "0.5";
    }, 4000);
  }

  createBgSlides();
  startBgSlideshow();

  // --- Slideshow de fotos principais (dinâmico) ---
  const slideshow = document.getElementById("slideshow");
  let photos = [];
  let currentPhotoIndex = 0;

  // Função para verificar se a imagem existe
  function checkImage(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }

  // Tenta carregar fotos de foto1.jpg até foto99.jpg
  async function loadPhotos() {
    const checks = [];
    for (let i = 1; i <= 99; i++) {
      const url = `assets/foto${i}.jpg`;
      checks.push(checkImage(url));
    }
    const results = await Promise.all(checks);
    photos = results.filter(Boolean);
    if (photos.length > 0) {
      slideshow.src = photos[0];
      startSlideshow();
    }
  }

  function startSlideshow() {
    setInterval(() => {
      currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
      slideshow.style.opacity = 0;
      setTimeout(() => {
        slideshow.src = photos[currentPhotoIndex];
        slideshow.style.opacity = 1;
      }, 500);
    }, 2500);
  }

  loadPhotos();

  // --- Timer de relacionamento ---
  const startDate = new Date("February 24, 2019 00:00:00");
  const timerElement = document.getElementById("timer");

  function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const years = Math.floor(days / 365);
    const remainingDays = days % 365;
    const months = Math.floor(remainingDays / 30);
    const finalDays = remainingDays % 30;

    const finalHours = hours % 24;
    const finalMinutes = minutes % 60;
    const finalSeconds = seconds % 60;

    timerElement.textContent = `${years} anos, ${months} meses, ${finalDays} dias, ${finalHours} horas, ${finalMinutes} minutos e ${finalSeconds} segundos`;
  }

  updateTimer();
  setInterval(updateTimer, 1000);

  // --- Música de fundo ---
  const bgMusic = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("music-toggle");
  const musicIcon = document.getElementById("music-icon");
  let isPlaying = false;

  function toggleMusic() {
    if (bgMusic.paused) {
      bgMusic.play();
      musicIcon.src = "assets/pause.svg";
      musicIcon.alt = "Pause";
      isPlaying = true;
    } else {
      bgMusic.pause();
      musicIcon.src = "assets/play.svg";
      musicIcon.alt = "Play";
      isPlaying = false;
    }
  }

  musicToggle.addEventListener("click", toggleMusic);

  document.body.addEventListener(
    "click",
    function () {
      if (!isPlaying) {
        bgMusic.play().catch((e) => console.log("Autoplay bloqueado:", e));
        musicIcon.src = "assets/pause.svg";
        musicIcon.alt = "Pause";
        isPlaying = true;
      }
    },
    { once: true }
  );

  // --- Mensagem com efeito de esmaecer ---
  const messageElement = document.getElementById("typed-message");
  const fixedMessage = `Desde o momento em que te vi pela primeira vez senti algo diferente, uma sensação que nunca tinha sentido antes.

Só de te olhar e escutar sua voz, sentia um conforto e felicidade inexplicável, e quando a gente se despediu aquela sensação virou do avesso… já sentia uma grande saudade e solidão por não ter você comigo o resto do dia. Que loucura né? Como podemos explicar esse sentimento por uma pessoa que tinha encontrado pela primeira vez?

Acredito que isso seja o amor à primeira vista, e eu me apaixonei por você desde o primeiro momento que te vi, principalmente depois do nosso primeiro beijo.

Mal sabia eu tudo que estava pela frente… Tantas conquistas, lutas, momentos felizes e desesperadores, brigas sem sentidos e discussões construtivas, impaciências e cordialidades vindo dos dois lados, viagens incríveis, aprendizados e desapontamentos que sentimos juntos, enfim… foram tantos momentos ao seu lado que é impossível listar tudo em uma mensagem. Porém o mais confortante era que no final do dia sempre seriamos só nós dois! E eu almejo que continuemos assim até o último dia das nossas vidas, um pelo outro sempre.

Quero viver incontáveis novos momentos felizes juntos, conhecer novos lugares, atingir novas conquistas, e se caso a gente brigar por algo, que nos resolvemos antes de deitar na cama. O amor é assim, momentos bons e ruins compartilhados juntos, um pelo outro e sempre se fortalecendo JUNTOS.

Hoje somos namorados e estamos comemorando esse dia especial, mas na verdade todo dia ao seu lado é uma celebração do amor, e um dos meus sonhos é um dia poder te chamar de minha noiva e minha esposa.

É incrível como momentos simples com você se tornam experiências incríveis, e além disso toda vez que olho pra você penso “porra que sorte a minha de ter essa mulher!”. Seus olhinhos, seu cabelo, seu corpo, tudo em você me encanta. Você me dá força pra me tornar uma pessoa melhor, você é meu lar, minha paixão, meu benzinho, meu mores, minha vida! E escolheria você todos os dias, em todas as realidades e linhas do tempo existente!

Quero aproveitar para pedir desculpas por momentos que te chateei ou fui ausente, essa jamais seria minha intenção, mas prometo melhorar a cada dia que passo ao seu lado.

Que venham muitos outros dias dos namorados, e que nossos laços se conectem e fortaleçam cada vez mais.

Te Amo do fundo do meu coração, da maneira mais pura e profunda que existe! 

Conte comigo sempre!

Com todo meu amor,
Will 💜, seu benzinho.`;

  function showFullMessage() {
    messageElement.innerHTML = "";
    const div = document.createElement("div");
    div.style.opacity = "0";
    div.style.transition = "opacity 2.2s cubic-bezier(0.4,0,0.2,1)";
    div.style.fontWeight = "300";
    div.style.letterSpacing = "0.01em";
    div.style.lineHeight = "1.7";
    div.innerHTML = fixedMessage.replace(/\n/g, "<br>");
    messageElement.appendChild(div);
    void div.offsetWidth;
    setTimeout(() => {
      div.style.opacity = "1";
    }, 100);
  }

  const openMessageBtn = document.getElementById("open-message-btn");
  const messageBox = document.getElementById("message-box");

  // --- Polaroid em miniatura ao rolar (apenas após abrir a mensagem) ---
  const polaroidFrame = document.querySelector('.polaroid-frame');
  const polaroidOriginalTop = polaroidFrame.getBoundingClientRect().top + window.scrollY;
  let polaroidScrollActive = false;

  function handlePolaroidScroll() {
    if (!polaroidScrollActive) return;
    if (window.scrollY > polaroidOriginalTop + 80) {
      polaroidFrame.classList.add('mini');
    } else {
      polaroidFrame.classList.remove('mini');
    }
  }

  window.addEventListener('scroll', handlePolaroidScroll);

  openMessageBtn.addEventListener("click", function () {
    openMessageBtn.style.transition =
      "transform 0.5s cubic-bezier(.68,-0.55,.27,1.55), opacity 0.5s";
    openMessageBtn.style.transform = "scale(1.2) rotate(-8deg)";
    openMessageBtn.style.opacity = "0";
    setTimeout(() => {
      openMessageBtn.style.display = "none";
      messageBox.style.display = "flex";
      setTimeout(showFullMessage, 400);
      // Ativa o efeito da polaroid miniatura só após abrir a mensagem
      polaroidScrollActive = true;
      handlePolaroidScroll(); // já verifica o estado atual ao ativar
    }, 500);
  });

  // --- Efeito de girassóis e corações caindo ---
  function createFallingImage() {
    const isSunflower = Math.random() < 0.5; // 50% chance para cada
    const img = document.createElement("img");
    img.src = isSunflower ? "assets/sunflower.png" : "assets/coracao.png";
    img.className = isSunflower ? "sunflower" : "coracao";
    img.style.left = Math.random() * 95 + "vw";
    img.style.opacity = "0.6";
    const duration = 7 + Math.random() * 4;
    img.style.animationDuration = duration + "s";
    img.style.width = "48px";
    img.style.height = "48px";
    document.body.appendChild(img);

    img.addEventListener("animationend", () => {
      img.remove();
    });
  }

  setInterval(createFallingImage, 2000); // 1 imagem a cada 3,5s
});
