const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

menuButton.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".mobile-nav a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const galleryItems = [
    document.querySelector('.gallery-a'),
    document.querySelector('.gallery-b'),
    document.querySelector('.gallery-c'),
    document.querySelector('.gallery-d'),
	document.querySelector('.gallery-e')
];

let currentIndex = 0;

function renderGallery() {
    const total = galleryItems.length;

    const mainIndex = currentIndex;
    const topIndex = (currentIndex + 1) % total;
    const bottomIndex = (currentIndex + 2) % total;

    galleryItems.forEach(item => {
        item.classList.remove(
            'is-main',
            'is-top',
            'is-bottom',
            'is-hidden'
        );
    });

    galleryItems[mainIndex].classList.add('is-main');
    galleryItems[topIndex].classList.add('is-top');
    galleryItems[bottomIndex].classList.add('is-bottom');

    galleryItems.forEach((item, index) => {
        if (
            index !== mainIndex &&
            index !== topIndex &&
            index !== bottomIndex
        ) {
            item.classList.add('is-hidden');
        }
    });
}

document.querySelector('.gallery-next').addEventListener('click', () => {

    currentIndex++;

    if (currentIndex >= galleryItems.length) {
        currentIndex = 0;
    }

    renderGallery();
});

document.querySelector('.gallery-prev').addEventListener('click', () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = galleryItems.length - 1;
    }

    renderGallery();
});

renderGallery();
