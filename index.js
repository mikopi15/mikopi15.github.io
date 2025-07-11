document.body.style.overflow = "hidden";
const button = document.querySelector("button");
const body = document.querySelector("body");

const content = document.querySelector(".content");
const contents = content.querySelectorAll("h1");
const happy = contents[0];
const bmp = contents[1];
const from = contents[2];
let lastTouched = null;
happy.addEventListener(
  "touchmove",
  (e) => {
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!element) return;
    if (element !== lastTouched && element.classList.contains("letter")) {
      removeAnimateClasses(element);
      element.classList.add("animate__animated", "animate__swing");
      lastTouched = element;
    }
    e.preventDefault();
  },
  { passive: !1 }
);
happy.addEventListener("touchend", () => {});
bmp.addEventListener(
  "click",
  (e) => {
    addClick(e);
  },
  { passive: !1 }
);
button.addEventListener("click", async () => {
  button.classList.add("animate__animated", "animate__hinge");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  button.style.display = "none";
  content.style.display = "block";
  from.style.display = "none";
  happy.style.display = "flex";
  let isPortrait = window.matchMedia("(orientation: portrait)").matches;
  if (isPortrait) {
    changeToMobileBg();
  } else {
    const img = new Image();
    img.src = "images/bg.png";
    img.onload = () => {
      body.style.backgroundImage = "url('images/bg.png')";
    };
  }
  let intervalId = null;
  window.addEventListener("orientationchange", () => {
    if (window.matchMedia("(orientation: landscape)").matches) {
      clearInterval(intervalId);
      setTimeout(() => {
        changeToMobileBg();
      }, 500);
    } else {
      intervalId = setInterval(updateImage, 300);
    }
  });
  await entranceContent(happy, "Happy SPBB", 1);
  await entranceContent(bmp, "DAY 3", 2);
  document.body.style.overflow = "";
  await entranceContent(from, "2025-07-06", 3);
  if (!isPortrait && !intervalId) {
    intervalId = setInterval(updateImage, 300);
  }
  startAnimate();
});
async function entranceContent(content, text, animate) {
  content.style.display = "block";
  content.textContent = "";
  text.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.innerHTML = char === " " ? "&nbsp;" : char;
    span.classList.add("letter", "animate__animated");
    if (animate === 1) {
      span.classList.add("animate__bounceInDown");
    } else if (animate === 2) {
      span.classList.add("animate__bounceInUp");
    } else if (animate === 3) {
      span.classList.add("animate__jackInTheBox");
    }
    span.style.animationDelay = `${i * 0.03}s`;
    content.append(span);
  });
  lastSpan = content.querySelector("span:first-child");
  return new Promise((resolve) => {
    if (animate === 2) {
      setTimeout(resolve, 1000);
    } else {
      setTimeout(resolve, 700);
    }
  });
}
async function startAnimate() {
  await animate(happy);
  await animate(from);
  await animate(bmp);
  startAnimate();
}
async function animate(content) {
  let span;
  spans = content.querySelectorAll("span");
  for (let i = 0; i < spans.length; i++) {
    span = spans[i];
    removeAnimateClasses(span);
    void span.offsetWidth;
    if (content.textContent.startsWith("DA")) {
      span.classList.add(
        "animate__animated",
        "animate__flip",
        "animate__faster"
      );
    } else {
      span.classList.add("animate__animated", "animate__rubberBand");
    }
    span.style.animationDelay = `${i * 0.03}s`;
  }
  return new Promise((resolve) => {
    if (content.textContent.startsWith("DA")) {
      setTimeout(resolve, 2000);
    } else {
      setTimeout(resolve, 700);
    }
  });
}
function removeAnimateClasses(element) {
  const classes = [...element.classList];
  classes.forEach((className) => {
    if (className.startsWith("animate__")) {
      element.classList.remove(className);
    }
  });
}
const images = ["images/bg1.png", "images/bg2.png", "images/bg3.png"];
let currentIndex = 0;
let bg = null;
window.addEventListener("orientationchange", () => {
  if (window.matchMedia("(orientation: landscape)").matches) {
    bg = "";
  } else {
    bg = "";
  }
});
function updateImage() {
  const nextIndex = (currentIndex + 1) % images.length;
  const img = new Image();
  img.src = images[nextIndex];
  img.onload = () => {
    setTimeout(() => {
      document.body.style.backgroundImage = `url('${images[nextIndex]}')`;
      document.body.style.opacity = 1;
      currentIndex = nextIndex;
    }, 500);
  };
}
function changeToMobileBg() {
  const img = new Image();
  img.src = "images/bgMobile.png";
  img.onload = () => {
    body.style.backgroundImage = "url('images/bgMobile.png')";
  };
}
function addClick(e) {
  const letter = e.target;
  removeAnimateClasses(letter);
  letter.classList.add("animate__animated", "animate__bounce");
}
function addHold(e) {
  const letter = e.target;
  removeAnimateClasses(letter);
  letter.classList.add("animate__animated", "animate__tada");
}

// secret button
let clicks = 0;
modal = document.querySelector(".content button");
secretBtn = document.querySelector("h2");
secretBtn.addEventListener("click", (e) => {
  clicks++;
  if (clicks === 5) {
    clicks = 0;
    modal.click();
  }
});

//enter button
input = content.querySelector(".modal-body input");
console.log(input);
enterBtn = content.querySelector(".modal-footer button");
error = document.getElementById("error");
console.log(error);
enterBtn.addEventListener("click", (e) => {
  if (input.value === "shiro") {
    window.location.href = "pics.html";
  } else if (input.value === "white") {
    error.textContent = "Nope, what is white in Japanese";
  } else {
    error.textContent = "Wrong password";
  }
});

//error
