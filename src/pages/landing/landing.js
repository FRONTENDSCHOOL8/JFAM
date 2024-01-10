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


// gsap - 적용하면 얘 애니메이션 끝날때까지 기다렸다가 포켓베이스 실행됨
gsap.from(".p-copywriting",{ y:100, opacity: 0.2, ease: 'steps(30)'});

// 포켓베이스

function getPbImageURL(item,fileName = 'img'){
  return `https://jfam.pockethost.io/api/files/${item.collectionId}/${item.id}/${item[fileName]}`
}

async function renderSmallThumbnail(){

  const response = await pb.collection('landing_animationImg').getList();
  const userData = response.items;

  userData.forEach((item) => {
    const template = /* html */`
      <img src="${getPbImageURL(item)}" alt="">
    `;
    document.querySelector('.landing .div-slide__one').insertAdjacentHTML('beforeend',template);
    document.querySelector('.landing .div-slide__two').insertAdjacentHTML('beforeend',template);
    document.querySelector('.landing .div-slide__three').insertAdjacentHTML('beforeend',template);
    document.querySelector('.landing .div-slide__four').insertAdjacentHTML('beforeend',template);

  });
}

async function renderSwiperThumbnail(){

  const response_swiper = await pb.collection('program_thumbnail').getList();
  const userData_swiper = response_swiper.items;

  userData_swiper.forEach((item) => {
    console.log(getPbImageURL(item,"image"));
    const template = /* html */`
    <div class="swiper-slide"><img src="${getPbImageURL(item,'image')}" alt="">
    </div>
    `;
    console.log(template);
    document.querySelector('.landing .swiper-wrapper').insertAdjacentHTML('beforeend',template);
  });
}


renderSmallThumbnail();
renderSwiperThumbnail();