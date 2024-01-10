import Swiper from 'swiper';
import gsap from 'gsap';
import pb from '/src/js/pocketbase.js';
import manageData from '/src/js/response.js'

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

// 포켓베이스

async function renderSmallThumbnail(){
  console.log('test1');

  // 경로 문제 404
  const response = await manageData.get(
    `https://jfam.pockethost.io/collections/landing_animationImg/records`
  );
  console.log('test2');

  const userData = response.data.items;
  console.log('test3');
  userData.forEach((item) => {
    const template = /* html */`
      <img src="${item.img}" alt="">
    `;
    // insertLast 함수 추가
    document.querySelector('.landing div-slide__one').insertAdjacentHTML('beforeend',template);
    document.querySelector('.landing div-slide__two').insertAdjacentHTML('beforeend',template);
  });
}

renderSmallThumbnail();