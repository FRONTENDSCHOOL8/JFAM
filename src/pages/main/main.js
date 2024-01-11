import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import pb from "/src/js/pocketbase";
import '/src/pages/main/main.css'
// console.log(pb)


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

// 돔 요소 납치하기
function getNode(node) {
  if (typeof node !== "string") {
    throw new Error("문자열 아규먼트만 잡아오세요.")
  }
  return document.querySelector(node);
}
function getNodes(node) {
  if (typeof node !== "string") {
    throw new Error("문자열 아규먼트만 잡아오세요.")
  }
  return document.querySelectorAll(node);
}
// 돔에 노드 추가
function insertEnd(node,text){
  node = getNode(node);
  node.insertAdjacentHTML("beforeend",text)
}

// 포켓베이스 연동 ::썸네일
const programThumbnail = await pb.collection('program_thumbnail').getList();
console.log(programThumbnail)
const programData = programThumbnail.items;
console.log(programData)


// 돔 입력 함수::썸네일
programData.forEach((item)=>{
  const template = /* html */`
  <figure>
  <a href="${item.link}"></a>
  <img
    class="thumbnail-vertical"
    src="/src/assets/main/images/thumbnail_a.png"
    alt=""
  />
  <figcaption>${item.title}</figcaption>
  `
  console.log(template)
  insertEnd('.now-see > div', template);

})










//이미지 주소 가져오기

// const titlesData = pb.
// function getPbImageURL(item,fileName){
//   return `https://jfam.pockethost.io/api/files/${item.collectionName}/${item.id}/${item[fileName]}?thumb=100x300`
// }
// console.log(getPbImageURL(titlesData))
// const url = pb.files.getUrl(record, firstFilename, {'thumb': '100x250'});



/* -------------------------------------------------------------------------- */


//있는 html 에 타이틀 텍스트 변경 : 추가안됨 수정만 가능

// const titlesName = getNodes('.now-see figcaption');
// titlesName[0].textContent =  getTitle(1)
// titlesName[1].textContent =  getTitle(2)
// titlesName[2].textContent =  getTitle(3)
// titlesName[3].textContent =  getTitle(4)


/* -------------------------------------------------------------------------- */
//n번째의 데이터 뱉는 함수 ⭐️⭐️⭐️⭐️⭐️
// function getTitle2(number){
//   const title = programData[number-1].title
//   const link = programData[number-1].link
//   const image = programData[number-1].image
//   return link, title, image
// }
// console.log(getTitle2(1))

//타이틀만 몽땅 뽑기
// let titles =[]
// const getTitle = record.items.forEach((item)=>{
//   titles.push(item.title)
// })
// console.log(titles)