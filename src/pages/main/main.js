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
      simulateTouch: true,
      allowTouchMove: true,
      cssMode: false,

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
  // const localUser = await getStorage('auth');
  // const userId = getNode('.userId');
  // console.log(localUser);
  // if (!localUser.isAuth) {
  //   window.location.href = '/src/pages/landing/';
  // } else {
  //   userId.textContent = localUser.userData.record.username;
  // }
  //1  '.swiper-slide' 클릭시 유저데아터에 새로 프로퍼티 넣기 isCLiekd : ture
  // 2. 포켓호스트가 가져온 뭔가..

  const imagess = document.querySelectorAll('.swiper-slide');

  images.forEach((image) => {
    image.addEventListener('mouseover', () => {
      console.log('ya');
    });
  });
  // console.log(images);
  // console.log(localUser);

  //   images.forEach((image) => {
  //     image.addEventListener('mouseenter', async () => {
  //       await pb.collection('program_thumbnail').update('RECORD_ID', data);
  //       // .update('RECORD_ID', { isClicked: true });
  //     });
  //     console.log(pb + '일번');
  //     console.log(data + '이번');
  //     // console.log(RECORD_ID + '삼번');
  //     console.log(image + '사');
  //     console.log(images + '오');
  //   });
  // }

  // // 마지막 닫는 문
});
