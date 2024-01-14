import"./reset-9GtOEJoH.js";/* empty css              */import{S as n}from"./swiper-bundle-GuwshZwN.js";import{p as l}from"./pocketbase-v9INCz3k.js";document.addEventListener("DOMContentLoaded",async()=>{function o(e){if(typeof e!="string")throw new Error("문자열 아규먼트만 잡아오세요.");return document.querySelector(e)}function a(e,t){o(e).insertAdjacentHTML("beforeend",t)}function r(e){return`https://jfam.pockethost.io/api/files/${e.collectionName}/${e.id}/${e.image}`}new n(".full-swiper",{slidesPerView:1,loop:!0,autoplay:!0,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},keyboard:{enabled:!0}});function i(e){return new n(e,{cssMode:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},keyboard:{enabled:!0},spaceBetween:0,slidesPerView:"auto",slidesPerGroupAuto:!0})}i(".now-swiper"),i(".must-swiper"),i(".quickvod-swiper"),i(".popular-title-swiper"),i(".popular-live-swiper"),i(".only-swiper"),i(".event-swiper");const s=await l.collection("program_thumbnail").getFullList({sort:"updated"}),p=await l.collection("program_thumbnail").getFullList({sort:"@random"}),c=await l.collection("program_thumbnail").getFullList({sort:"rank"}),u=await l.collection("vod_thumbnail").getFullList({sort:"created"}),d=await l.collection("live_thumbnail").getFullList({sort:"-viewership"});s.forEach(e=>{if(e.isClicked){const t=`
  <div class="swiper-slide">
          <figure>
          <a href="${e.link}">
          <img
            class="thumbnail-vertical"
            src="${r(e)}"
            alt=""/>
          <figcaption>${e.title}</figcaption>
          </a>
          </figure>
          </div>
          `;a(".now-see .thumbnail-wrap",t)}}),p.forEach(e=>{const t=`
  <div class="swiper-slide">
          <figure>
          <a href="${e.link}">
          <img
            class="thumbnail-vertical"
            src="${r(e)}"
            alt=""/>
          <figcaption>${e.title}</figcaption>
          </a>
          </figure>
          </div>
  `;a(".must-see .thumbnail-wrap",t)}),u.forEach(e=>{const t=`
  <div class="swiper-slide">
          <figure>
          <a href="${e.link}">
          <img
            class="thumbnail-horizontal"
            src="${r(e)}"
            alt=""/>
          <figcaption>
            ${e.title}
            <p>${e.episode_title}</p>
          </figcaption>
          </a>
          </figure>
          </div>
  `;a(".quickvod .thumbnail-wrap",t)}),c.forEach(e=>{const t=`
  <div class="swiper-slide">
          <figure>
          <a href="${e.link}">
          <img
            class="thumbnail-vertical"
            src="${r(e)}"
            alt=""/>
          <figcaption>
          <em>${e.rank}</em>${e.title}
          </figcaption>
          </a>
        </figure>
  </div>
  `;a(".popular-title .thumbnail-wrap",t)}),d.forEach(e=>{const t=`
      <div class="swiper-slide">
          <figure>
          <a href="${e.link}">
          <img
            class="thumbnail-horizontal"
            src="${r(e)}"
            alt=""/>
          <figcaption>
              <em>${e.rank}</em>
            <p>
            ${e.title}<span>${e.episode_title}<br/>${e.viewership}</span>
            </p>
          </figcaption>
          </a>
          </figure>
      </div>
`;a(".popular-live .thumbnail-wrap",t)})});
