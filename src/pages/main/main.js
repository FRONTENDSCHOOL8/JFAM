import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import pb from '/src/js/pocketbase';
import gsap from 'gsap';
import '/src/pages/main/main.css';

/* -------------------------------------------------------------------------- */
// 유틸함수
document.addEventListener('DOMContentLoaded', async () => {
  // ::돔 요소 납치하기
  function getNode(node) {
    if (typeof node !== 'string') {
      throw new Error('문자열 아규먼트만 잡아오세요.');
    }
    return document.querySelector(node);
  }
  function getNodes(node) {
    if (typeof node !== 'string') {
      throw new Error('문자열 아규먼트만 잡아오세요.');
    }
    return document.querySelectorAll(node);
  }
  // ::돔에 노드 추가
  function insertEnd(node, text) {
    getNode(node).insertAdjacentHTML('beforeend', text);
  }
  // ::포켓베이스 이미지 url 가져오기
  function getPbImageURL(item) {
    return `https://jfam.pockethost.io/api/files/${item.collectionName}/${item.id}/${item.image}`;
  }
  /* -------------------------------------------------------------------------- */
  // 스와이퍼
  const fullSwiper = new Swiper('.full-swiper', {
    slidesPerView: 1,
    loop: true,
    autoplay: true,
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

  // 프로그램 스와이퍼 유틸함수!!!! ⭐️💖⭐️💖⭐️💖⭐️💖⭐️
  function standardSwiper(node) {
    return new Swiper(node, {
      cssMode: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      keyboard: {
        enabled: true,
      },
      spaceBetween: 0,
      slidesPerView: 'auto',
      slidesPerGroupAuto: true,
    });
  }
  const nowSwiper = standardSwiper('.now-swiper');
  const mustSwiper = standardSwiper('.must-swiper');
  const quickvodSwiper = standardSwiper('.quickvod-swiper');
  const popularTitleSwiper = standardSwiper('.popular-title-swiper');
  const popularLiveSwiper = standardSwiper('.popular-live-swiper');
  const onlySwiper = standardSwiper('.only-swiper');
  const eventSwiper = standardSwiper('.event-swiper');

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
          <figcaption>${item.title}</figcaption>
          </a>
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
          <figcaption>${item.title}</figcaption>
          </a>
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
          <figcaption>
            ${item.title}
            <p>${item.episode_title}</p>
          </figcaption>
          </a>
          </figure>
          </div>
  `;
    insertEnd('.quickvod .thumbnail-wrap', template);
  });
  // ::실시간 인기 프로그램
  popularProgramData.forEach((item) => {
    const template = /* html */ `
  <div class="swiper-slide">
          <figure>
          <a href="${item.link}">
          <img
            class="thumbnail-vertical"
            src="${getPbImageURL(item)}"
            alt=""/>
          <figcaption>
          <em>${item.rank}</em>${item.title}
          </figcaption>
          </a>
        </figure>
  </div>
  `;
    insertEnd('.popular-title .thumbnail-wrap', template);
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
          <figcaption>
              <em>${item.rank}</em>
            <p>
            ${item.title}<span>${item.episode_title}<br/>${
              item.viewership
            }</span>
            </p>
          </figcaption>
          </a>
          </figure>
      </div>
`;
    insertEnd('.popular-live .thumbnail-wrap', template);
  });

  /* -------------------------------------------------------------------------- */
  // gsap 모션

  // 머우스 호버시 figure 또는 img y-20 만큼 점프
  const tl = gsap.timeline();
  const thisNode = getNodes('.event-area');

  // 시작 시점에서 숨겨진 상태로 설정
  gsap.set(thisNode, { autoAlpha: 0 });

  tl.fromTo(
    thisNode,
    { autoAlpha: 0 },
    { duration: 0.5, autoAlpha: 1, repeat: 2, yoyo: true }
  );
  thisNode.addEventListener('mouseenter', () => {
    tl.play();
  });
  thisNode.addEventListener('mouseleave', () => {
    tl.pause();
  });

  /* -------------------------------------------------------------------------- */
  // n번째의 데이터 뱉는 함수 ⭐️⭐️⭐️⭐️⭐️
  // function getTitle2(number){
  //   const title = programData[number-1].title
  //   const link = programData[number-1].link
  //   const image = programData[number-1].image
  //   return link, title, image
  // }
  // console.log(getTitle2(1))

  // 타이틀만 몽땅 뽑기
  // let titles =[]
  // const getTitle = record.items.forEach((item)=>{
  //   titles.push(item.title)
  // })
  // console.log(titles)
});
