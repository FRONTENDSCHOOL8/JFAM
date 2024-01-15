import Swiper from 'swiper/bundle';
import pb from '/src/js/pocketbase';
import gsap from 'gsap';
import { getNode, getNodes, insertEnd, getPbImageURL } from '/src/js/common.js';
import { getStorage } from '/src/js/storage.js';
import 'swiper/css/bundle';
import '/src/pages/main/main.css';

document.addEventListener('DOMContentLoaded', async () => {
  /* -------------------------------------------------------------------------- */
  // 로컬 데이터 가져오기
  const localUser = await getStorage('auth');
  const userId = getNode('.userId');

  if (!localUser.isAuth) {
    window.location.href = '/src/pages/landing/';
  } else {
    userId.textContent = localUser.userData.record.username;
  }

  /* -------------------------------------------------------------------------- */
  // 포켓베이스 연동 :: 폴더별 연동 >>>>> 함수화
  const nowSeeData = await pb.collection('program_thumbnail').getFullList({
    sort: 'updated',
  });
  const mustSeeData = await pb.collection('program_thumbnail').getFullList({
    sort: '@random',
  });
  const popularProgramData = await pb
    .collection('program_thumbnail')
    .getFullList({
      sort: 'rank',
    });
  const vodData = await pb.collection('vod_thumbnail').getFullList({
    sort: 'created',
  });
  const liveChannelData = await pb.collection('live_thumbnail').getFullList({
    sort: '-viewership',
  });

  /* -------------------------------------------------------------------------- */
  // 돔 뿌리기 함수

  // ::시청 콘텐츠
  nowSeeData.forEach((item) => {
    if (item.isClicked) {
      const template = /* html */ `
  <div class="swiper-slide">
          <figure>
          <a href="${item.link}">
          <img
            class="thumbnail-vertical"
            src="${getPbImageURL(item)}"
            alt=""/>
            </a>
          <figcaption>${item.title}</figcaption>
          </figure>
          </div>
          `;
      insertEnd('.now-see .thumbnail-wrap', template);
    }
  });
  // ::기본 컨텐츠
  mustSeeData.forEach((item) => {
    const template = /* html */ `
  <div class="swiper-slide">
          <figure>
          <a href="${item.link}">
          <img
            class="thumbnail-vertical"
            src="${getPbImageURL(item)}"
            alt=""/>
            </a>
          <figcaption>${item.title}</figcaption>
          </figure>
          </div>
  `;
    insertEnd('.must-see .thumbnail-wrap', template);
  });

  // ::vod
  vodData.forEach((item) => {
    const template = /* html */ `
  <div class="swiper-slide">
          <figure>
          <a href="${item.link}">
          <img
            class="thumbnail-horizontal"
            src="${getPbImageURL(item)}"
            alt=""/>
            </a>
          <figcaption>
            ${item.title}
            <p>${item.episode_title}</p>
          </figcaption>
          </figure>
          </div>
  `;
    insertEnd('.quickvod .thumbnail-wrap', template);
  });
  // ::실시간 인기 프로그램
  popularProgramData.forEach((item) => {
    if (item.rank < 11) {
      const template = /* html */ `
  <div class="swiper-slide">
  <figure>
  <a href="${item.link}">
  <img
            class="thumbnail-vertical"
            src="${getPbImageURL(item)}"
            alt=""/>
            </a>
          <figcaption>
          <em>${item.rank}</em>${item.title}
          </figcaption>
        </figure>
  </div>
  `;
      insertEnd('.popular-title .thumbnail-wrap', template);
    }
  });

  // ::인기 LIVE 채널
  liveChannelData.forEach((item) => {
    const template = /* html */ `
      <div class="swiper-slide">
      <figure>
      <a href="${item.link}">
          <img
            class="thumbnail-horizontal"
            src="${getPbImageURL(item)}"
            alt=""/>
            </a>
          <figcaption>
              <em>${item.rank}</em>
            <p>
            ${item.title}<span>${item.episode_title}<br/>${
              item.viewership
            }%</span>
            </p>
          </figcaption>
          </figure>
      </div>
`;
    insertEnd('.popular-live .thumbnail-wrap', template);
  });
});

/* -------------------------------------------------------------------------- */
// 스와이퍼
const fullSwiper = new Swiper('.full-swiper', {
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 3200,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  keyboard: {
    enabled: true,
  },
});

// 프로그램 스와이퍼 유틸함수!!!!
function standardSwiper(node) {
  return new Swiper(node, {
    grabCursor: true,
    touchEventsTarget: 'container',
    allowTouchMove: true,
    cssMode: true,

    keyboard: {
      enabled: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    spaceBetween: 0,
    slidesPerView: 'auto',
    slidesPerGroupAuto: true,
  });
}

standardSwiper('.now-swiper');
standardSwiper('.must-swiper');
standardSwiper('.quickvod-swiper');
standardSwiper('.popular-title-swiper');
standardSwiper('.popular-live-swiper');
standardSwiper('.only-swiper');
standardSwiper('.event-swiper');

/* -------------------------------------------------------------------------- */
// 클릭시 데이터 변경
// const data = {
//   title: 'test',
//   link: 'https://example.com',
//   isClicked: true,
//   rank: 123,
// };
// const record = await pb
//   .collection('program_thumbnail')
//   .update('RECORD_ID', data);

// const record2 = await pb.collection('program_thumbnail').getOne('RECORD_ID', {
//   expand: 'relField1,relField2.subRelField',
// });
// 프로퍼티 변경
// 1. 클릭하면 해당 슬라이드의 레코드 id 떠야함
// 2. 해당 id의 프로퍼티를 true 바꿔주
// fullSwiper.autoplay = false;

// example update data

// const data = {
//   title: 'test',
//   link: 'https://example.com',
//   isClicked: true,
//   rank: 123,
// };
// 비동기 : 순서를 지정, 데이터 렌더링시 중요

const images = document.querySelectorAll('.swiper-slide');
images.forEach((image) => {
  image.addEventListener('mouseover', async () => {
    await pb
      .collection('program_thumbnail')
      .update('RECORD_ID', { isClicked: true });
    console.log(RECORD_ID);
  });
});

/* -------------------------------------------------------------------------- */
// gsap 모션

// 머우스 호버시 figure 또는 img y-20 만큼 점프
// const tl = gsap.timeline();
// const thisNode = getNodes('.event-area');

// 시작 시점에서 숨겨진 상태로 설정
// gsap.set(thisNode, { autoAlpha: 0 });

// tl.fromTo(
//   thisNode,
//   { autoAlpha: 0 },
//   { duration: 0.5, autoAlpha: 1, repeat: 2, yoyo: true }
// );
// thisNode.addEventListener('mouseenter', () => {
//   tl.play();
// });
// thisNode.addEventListener('mouseleave', () => {
//   tl.pause();
// });

/* -------------------------------------------------------------------------- */
// n번째의 데이터 뱉는 함수
// function getTitle2(number){
//   const title = programData[number-1].title
//   const link = programData[number-1].link
//   const image = programData[number-1].image
//   return link, title, image
// }

// 타이틀만 몽땅 뽑기
// let titles =[]
// const getTitle = record.items.forEach((item)=>{
//   titles.push(item.title)
// })

// 네비게이션 클릭시 여백 삭제

// const clickButton = getNode('.swiper-button');
// const targetClass = getNode('.onlytving');
// clickButton.addEventListener('click', () => {
//   targetClass.classList.add('is-active');
// });

// 버튼 클릭시 스와이퍼 프로퍼티 변경
// const isClicked = getNode('.swiper-button');
// isClicked.addEventListener('click', () => {
//   standardSwiper.centeredSlides(true);
// })
