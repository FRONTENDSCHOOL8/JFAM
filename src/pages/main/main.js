import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import pb from "/src/js/pocketbase";
import '/src/pages/main/main.css';

/* -------------------------------------------------------------------------- */
// 스와이퍼
const swiper = new Swiper('.swiper', {

  slidesPerView: 1,
  loop: true,
  autoplay: false,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


/* -------------------------------------------------------------------------- */
// 데이터 연동

// 함수 ::돔 요소 납치하기
function getNode(node) {
  if (typeof node !== "string") {
    throw new Error("문자열 아규먼트만 잡아오세요.")
  }
  return document.querySelector(node);
}

// 함수 ::돔에 노드 추가
function insertEnd(node,text){
  getNode(node).insertAdjacentHTML("beforeend",text)
}

/* -------------------------------------------------------------------------- */
// 함수 ::포켓베이스 이미지 url 가져오기
function getPbImageURL(item){
  return `https://jfam.pockethost.io/api/files/${item.collectionName}/${item.id}/${item.image}`
}

// 포켓베이스 연동 :: 폴더별 연동
const programData = await pb.collection('program_thumbnail').getFullList({
  sort: 'rank',
});


const vodData = await pb.collection('vod_thumbnail').getFullList({
  sort: 'created',
});
const liveChannelData = await pb.collection('live_thumbnail').getFullList({
  sort: '-viewership',
});



/* -------------------------------------------------------------------------- */
// 돔 입력 함수

// ::시청 콘텐츠
programData.forEach((item)=>{
  if (item.isClicked){
  const template = /* html */`
          <figure>
          <a href="${item.link}">
          <img
            class="thumbnail-vertical"
            src="${getPbImageURL(item)}"
            alt=""
          /></a>
          <figcaption>${item.title}</figcaption></figure>
          `
  insertEnd('.now-see > div', template);
  }
})
// ::기본 컨텐츠 
programData.forEach((item)=>{
  const template = /* html */`
          <figure>
          <a href="${item.link}">
          <img
            class="thumbnail-vertical"
            src="${getPbImageURL(item)}"
            alt=""
          /></a>
          <figcaption>${item.title}</figcaption>
          </figure>
  `
  insertEnd('.must-see > div', template);
})


// ::vod
vodData.forEach((item)=>{
  const template = /* html */`
          <figure>
          <a href="${item.link}">
          <img
            class="thumbnail-horizontal"
            src="${getPbImageURL(item)}"
            alt=""
          /></a>
          <figcaption>
            ${item.title}
            <p>${item.episode_title}</p>
          </figcaption>
          </figure>
  `
  insertEnd('.quickvod > div', template);
})
// ::실시간 인기 프로그램
programData.forEach((item)=>{
  const template = /* html */`
          <figure>
          <a href="${item.link}">
          <img
            class="thumbnail-vertical"
            src="${getPbImageURL(item)}"
            alt=""
          />
          <figcaption><em>${item.rank}</em> ${item.title}</figcaption>
        </figure>
  `
  insertEnd('.top-title > div', template);
})
// ::인기 LIVE 채널
liveChannelData.forEach((item)=>{
const template = /* html */`
          <figure>
          <a href="${item.link}">
          <img
            class="thumbnail-horizontal"
            src="${getPbImageURL(item)}"
            alt=""
          />
          <figcaption>
              <em>${item.rank}</em>
            <p>
            ${item.title}<span> ${item.episode_title}<br />${item.viewership}</span>
            </p>
          </figcaption>
          </a>
          </figure>
`
insertEnd('.top-live > div', template);
})






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