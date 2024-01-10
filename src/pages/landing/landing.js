import Swiper from 'swiper';
import gsap from 'gsap';

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
 
  });


  // 헤더 스크롤 배경
document.addEventListener("scroll", function() {
  var header = document.querySelector('.landing .header')
  var scrollPosition = window.scrollY;

  // 스크롤 위치에 따라 배경을 변화시키기
  if (scrollPosition > 50) {
    header.style.backgroundColor = "rgba(0, 0, 0)"; // 스크롤 내리면 배경 불투명
  } else {
    header.style.backgroundColor = "rgba(0, 0, 0, 0)"; // 스크롤 올리면 배경 투명
  }
});


// gsap
gsap.from(".p-copywriting",{ y:100, opacity: 0.2, ease: 'steps(30)'});

