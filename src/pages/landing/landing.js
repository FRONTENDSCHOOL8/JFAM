import Swiper from 'swiper';
import gsap from 'gsap';
import pb from '/src/js/pocketbase.js';
import manageData from '/src/js/response.js'

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    centeredSlides: true,
    breakpoints:{
      1920:{
        slidesPerView: 4,
      },
    },
  });


  // 헤더 스크롤
document.addEventListener("scroll", function() {
  var header = document.querySelector('.landing .header')
  var scrollPosition = window.scrollY;

  if (scrollPosition > 50) {
    header.style.backgroundColor = "rgba(0, 0, 0)"; // 스크롤 내리면 배경 불투명
  } else {
    header.style.backgroundColor = "rgba(0, 0, 0, 0)"; // 스크롤 올리면 배경 투명
  }
});


// gsap - 적용하면 얘 애니메이션 끝날때까지 기다렸다가 포켓베이스 실행됨
// gsap.from(".p-copywriting",{ y:100, opacity: 0.2, ease: 'steps(30)'});

// 포켓베이스
function insertLast(node, text){  
  if(typeof node === 'string') node = document.querySelector(node);
  node.insertAdjacentHTML('beforeend',text);
}

async function getPbList(recordsName){
  const response = await pb.collection(recordsName).getList();
  console.log(response);
  return response.items;
}

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
    insertLast('.landing .div-slide__one',template);
    insertLast('.landing .div-slide__two',template);
    insertLast('.landing .div-slide__three',template);
    insertLast('.landing .div-slide__four',template);
    
  });
}

async function renderSwiperThumbnail(){
  // const userData_swiper = getPbList('program_thumbnail');
  const response_swiper = await pb.collection('program_thumbnail').getList();
  const userData_swiper = response_swiper.items;
  console.log('userdata', userData_swiper)
  userData_swiper.forEach((item) => {
    console.log(getPbImageURL(item,"image"));
    const template = /* html */`
    <div class="swiper-slide"><img src="${getPbImageURL(item,'image')}" alt="">
    </div>
    `;
    insertLast('.landing .swiper-wrapper',template);
  });
}


renderSmallThumbnail();
renderSwiperThumbnail();