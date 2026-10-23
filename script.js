function stopSpin(container) {
  const vinyl = container.querySelector(".spinning-vinyl");

  const style = window.getComputedStyle(vinyl);
  const matrix = style.transform;

  if (matrix !== "none") {
    const values = matrix.split("(")[1].split(")")[0].split(",");
    const a = values[0];
    const b = values[1];
    const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

    vinyl.style.animation = "none";
    vinyl.style.transform = `rotate(${angle}deg)`;
    void vinyl.offsetWidth;
    vinyl.style.transform = "rotate(0deg)";
  } else {
    vinyl.style.animation = "none";
    vinyl.style.transform = "rotate(0deg)";
  }
}

function startSpin(container) {
  const vinyl = container.querySelector(".spinning-vinyl");
  vinyl.style.transform = "";
  vinyl.style.animation = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".linki i, .image-group img",
  );

  animatedElements.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;
      const maxRotation = 25;

      const rotateX = -(percentY * maxRotation);
      const rotateY = percentX * maxRotation;
      el.style.transform = `perspective(1000px) scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      el.style.transition = "transform 0.1s ease-out";
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform =
        "perspective(1000px) scale(1) rotateX(0deg) rotateY(0deg)";
      el.style.transition = "transform 0.6s ease";
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("tytul");

  if (title) {
    const text = title.textContent;
    title.textContent = ""; // Czyścimy oryginalny tekst

    // Dzielimy tekst na pojedyncze znaki
    text.split("").forEach((char, index) => {
      const span = document.createElement("span");

      // Jeśli to spacja, używamy "twardej spacji", by zachować odstęp
      span.textContent = char === " " ? "\u00A0" : char;

      // Nadajemy klasę z CSS
      span.classList.add("jump-letter");

      // Opóźnienie animacji dla każdej kolejnej litery (np. 0s, 0.1s, 0.2s...)
      span.style.animationDelay = `${index * 0.1}s`;

      title.appendChild(span);
    });
  }
});
