document.addEventListener("DOMContentLoaded", () => {
  const texts = document.querySelectorAll(".animate-text");
  const star = document.querySelector(".star");
  const day = document.querySelector(".animate-text-last");
  day.style.opacity = 0;

  const allSpans = [];
  const daySpans = [];

  // --- wrap letters in spans (preserve spaces) ---
  texts.forEach((text) => {
    const letters = text.textContent.split("");
    text.textContent = "";

    letters.forEach((letter) => {
      const span = document.createElement("span");
      span.innerHTML = letter === " " ? "&nbsp;" : letter;
      span.style.opacity = 0;
      text.appendChild(span);
      allSpans.push(span);
    });
  });

  // --- helper delay ---
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // --- animation functions ---
  async function animateBackInDown(spans, delay = 50) {
    for (let i = 0; i < spans.length; i++) {
      spans[i].className = "animate__animated animate__backInDown";
      spans[i].style.opacity = 1;
      await wait(delay);
    }
  }

  async function animateDay(element) {
    element.style.opacity = 1;
    element.className = "animate__animated animate__backInDown animate__fast";
  }

  async function animateRubberBand(spans, delay = 0) {
    for (let i = 0; i < spans.length; i++) {
      if (spans[i].innerHTML === "&nbsp;") continue; // skip spaces
      spans[i].classList.remove("animate__rubberBand");
      void spans[i].offsetWidth; // reflow
      spans[i].classList.add("animate__animated", "animate__rubberBand");
      await wait(delay);
    }
  }

  async function animateStar(element) {
    element.style.opacity = 1;
    element.className =
      "star animate__animated animate__jackInTheBox animate__slow";

    element.addEventListener(
      "animationend",
      () => {
        element.className =
          "star animate__animated animate__pulse animate__infinite animate__slower";
      },
      { once: true }
    );
  }

  // --- looping rubberBand animation ---
  function loopRubberBand() {
    const spans = [...allSpans, ...daySpans]; // include Day 1 too
    spans.forEach((span, i) => {
      setTimeout(() => {
        span.className = "";
        void span.offsetWidth;
        span.classList.add("animate__animated", "animate__rubberBand");
        if (i == spans.length - 1) {
          dayTag = document.querySelector(".content h1:nth-child(3)");
          dayTag.className = "";
          void dayTag.offsetWidth;
          dayTag.classList.add("animate__animated", "animate__bounce");
        }
      }, i * 50);
    });

    setTimeout(loopRubberBand, 3000); // repeat every 4s
  }

  // --- master sequence ---
  (async function start() {
    await animateBackInDown(allSpans); // first lines
    await animateDay(day); // "Day 1"

    await wait(300); // small pause
    await animateRubberBand(allSpans); // bounce once
    animateStar(star); // star appears

    setTimeout(loopRubberBand, 2000); // start loop after 5s
  })();

  //mini game
  const maleIcon = document.getElementById("male");
  const femaleIcon = document.getElementById("female");
});
