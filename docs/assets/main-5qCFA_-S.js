import"./reset-9GtOEJoH.js";/* empty css              *//* empty css               *//* empty css               */import{S as s}from"./swiper-bundle-GuwshZwN.js";import{p as a}from"./pocketbase-v9INCz3k.js";import{g as r,i as l}from"./common-6v7X-qfQ.js";import"./include-JfAPemNh.js";document.addEventListener("DOMContentLoaded",async()=>{const o=await a.collection("program_thumbnail").getFullList({sort:"updated"}),n=await a.collection("program_thumbnail").getFullList({sort:"@random"}),p=await a.collection("program_thumbnail").getFullList({sort:"rank"}),c=await a.collection("vod_thumbnail").getFullList({sort:"created"}),u=await a.collection("live_thumbnail").getFullList({sort:"-viewership"});o.forEach(e=>{if(e.isClicked){const i=`
  <div class="swiper-slide">
          <figure>
          <a href="${e.link}">
          <img
            class="thumbnail-vertical"
            src="${r(e)}"
            alt=""/>
            </a>
          <figcaption>${e.title}</figcaption>
          </figure>
          </div>
          `;l(".now-see .thumbnail-wrap",i)}}),n.forEach(e=>{const i=`
  <div class="swiper-slide">
          <figure>
          <a href="${e.link}">
          <img
            class="thumbnail-vertical"
            src="${r(e)}"
            alt=""/>
            </a>
          <figcaption>${e.title}</figcaption>
          </figure>
          </div>
  `;l(".must-see .thumbnail-wrap",i)}),c.forEach(e=>{const i=`
  <div class="swiper-slide">
          <figure>
          <a href="${e.link}">
          <img
            class="thumbnail-horizontal"
            src="${r(e)}"
            alt=""/>
            </a>
          <figcaption>
            ${e.title}
            <p>${e.episode_title}</p>
          </figcaption>
          </figure>
          </div>
  `;l(".quickvod .thumbnail-wrap",i)}),p.forEach(e=>{if(e.rank<11){const i=`
  <div class="swiper-slide">
  <figure>
  <a href="${e.link}">
  <img
            class="thumbnail-vertical"
            src="${r(e)}"
            alt=""/>
            </a>
          <figcaption>
          <em>${e.rank}</em>${e.title}
          </figcaption>
        </figure>
  </div>
  `;l(".popular-title .thumbnail-wrap",i)}}),u.forEach(e=>{const i=`
      <div class="swiper-slide">
      <figure>
      <a href="${e.link}">
          <img
            class="thumbnail-horizontal"
            src="${r(e)}"
            alt=""/>
            </a>
          <figcaption>
              <em>${e.rank}</em>
            <p>
            ${e.title}<span>${e.episode_title}<br/>${e.viewership}%</span>
            </p>
          </figcaption>
          </figure>
      </div>
`;l(".popular-live .thumbnail-wrap",i)})});new s(".full-swiper",{slidesPerView:1,loop:!0,autoplay:!0,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},keyboard:{enabled:!0}});function t(o){return new s(o,{grabCursor:!0,touchEventsTarget:"container",slideToClickedSlide:!1,cssMode:!0,keyboard:{enabled:!0},allowTouchMove:!0,centeredSlides:!1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},spaceBetween:0,slidesPerView:"auto",slidesPerGroupAuto:!0})}t(".now-swiper");t(".must-swiper");t(".quickvod-swiper");t(".popular-title-swiper");t(".popular-live-swiper");t(".only-swiper");t(".event-swiper");
