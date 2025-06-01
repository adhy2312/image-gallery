
const mainImage = document.getElementById("mainImage");
const thumbnailContainer = document.getElementById("thumbnailContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const imageCount = 12;
let currentIndex = 1;

function renderThumbnails() {
  thumbnailContainer.innerHTML = "";
  for (let i = 1; i <= imageCount; i++) {
    const thumb = document.createElement("img");
    thumb.src = `images/${i}.jpg`;
    thumb.alt = `Image ${i}`;
    if (i === currentIndex) thumb.classList.add("selected");
    thumb.addEventListener("click", () => {
      currentIndex = i;
      updateGallery();
    });
    thumbnailContainer.appendChild(thumb);
  }
}

function updateGallery() {
  mainImage.src = `images/${currentIndex}.jpg`;
  renderThumbnails();
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1) <= 0 ? imageCount : currentIndex - 1;
  updateGallery();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex % imageCount) + 1;
  updateGallery();
});

// Initialize
renderThumbnails();
