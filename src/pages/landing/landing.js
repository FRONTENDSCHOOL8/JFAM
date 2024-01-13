import Swiper from 'swiper';
// import gsap from 'gsap';
import pb from '/src/js/pocketbase.js';
// import manageData from '/src/js/response.js'
import {getNode, insertEnd, getPbImageURL} from '/src/js/common.js';

document.addEventListener('DOMContentLoaded', async () => {
  // eslint-disable-next-line no-new
  new Swiper(".mySwiper", {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: false,
      breakpoints:{
        1920:{
        },
      },
    });

    let currentSwiperState = null; // 이전 스와이퍼 상태를 저장할 변수
    const skeletonItem = getNode('.skeleton-loading');
    const animskeletonItem = getNode('.animskeleton-loading');

    // 헤더 스크롤
  document.addEventListener("scroll", () => {
    const header = getNode('.landing .header');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
      header.style.backgroundColor = "rgba(0, 0, 0)"; // 스크롤 내리면 배경 불투명
    } else {
      header.style.backgroundColor = "rgba(0, 0, 0, 0)"; // 스크롤 올리면 배경 투명
    }
  });


  // gsap - 적용하면 얘 애니메이션 끝날때까지 기다렸다가 포켓베이스 실행됨
  // gsap.from(".p-copywriting",{ y:100, opacity: 0.2, ease: 'steps(30)'});

  // 포켓베이스

  async function renderSmallThumbnail(){
    try {   
      const response = await pb.collection('landing_animationImg').getList();
      const userData = response.items;
      animskeletonItem.style.display = 'none';

      userData.forEach((item) => {
        const template = /* html */`
          <img src="${getPbImageURL(item)}" alt="">
        `;
        insertEnd('.landing .div-slide__one',template);
        insertEnd('.landing .div-slide__two',template);
        insertEnd('.landing .div-slide__three',template);
        insertEnd('.landing .div-slide__four',template);
        });
    }
    catch (error) {
      console.log(error);
    }
  }

  async function renderVerticelSwiper(){
    try {    
      const responseSwiper = await pb.collection('program_thumbnail').getList();
      const userDataSwiper = responseSwiper.items;
      skeletonItem.style.display = 'none';
    
      getNode('.landing .swiper-wrapper').innerHTML = '';
      userDataSwiper.forEach((item) => {
        const template = /* html */`
        <div class="swiper-slide"><img src="${getPbImageURL(item,'image')}" alt="">
        </div>
        `;
        insertEnd('.landing .swiper-wrapper',template);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function renderHorizontalSwiper(){
    try {
      const responseSwiper = await pb.collection('original_thumbnail_small').getList();
      const userDataSwiper = responseSwiper.items;
      skeletonItem.style.display = 'none';
    
      getNode('.landing .swiper-wrapper').innerHTML = '';
      userDataSwiper.forEach((item) => {
        const template = /* html */`
        <div class="swiper-slide"><img src="${getPbImageURL(item,'image')}" alt="">
        </div>
        `;
        insertEnd('.landing .swiper-wrapper',template);
      });
    } catch (error) {
      console.log(error);
    }
  }

  function renderSwiper(swiperState){
    if(swiperState === 'vertical'){
      currentSwiperState = 'vertical';
      renderVerticelSwiper();
    }else if(swiperState === 'horizontal'){
      currentSwiperState = 'horizontal';
      renderHorizontalSwiper();
    }
  }

  function initSwiper() {
    const viewportWidth = window.innerWidth;
    let newSwiperState = null;

    if(viewportWidth<1920) {
      newSwiperState = 'vertical';
    }
    else{
      newSwiperState = 'horizontal';
    } 

    if(newSwiperState !== currentSwiperState){
      renderSwiper(newSwiperState)
    }
  }


  // 초기화 시 크기를 확인
  initSwiper();

  // 리사이즈 이벤트에 대한 리스너 추가
  window.addEventListener('resize', initSwiper);

  // 추가적으로 필요한 초기화 로직이 있다면 여기에 추가
  renderSmallThumbnail();
})