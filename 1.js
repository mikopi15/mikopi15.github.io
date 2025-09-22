document.addEventListener("DOMContentLoaded", () => {
  //mini game
  const maleIcon = document.getElementById("male");
  const femaleIcon = document.getElementById("female");
  maleIcon.addEventListener("click", () => {
    window.location.href = "2male.html"; // link to your male page
  });

  femaleIcon.addEventListener("click", () => {
    window.location.href = "2female.html"; // link to your male page
  });
});
