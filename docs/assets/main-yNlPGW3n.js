import"./reset-9GtOEJoH.js";/* empty css              *//* empty css               */import{S as o}from"./swiper-bundle-GuwshZwN.js";import{p as i}from"./pocketbase-v9INCz3k.js";import{g as w,a as r,i as l}from"./common-NlTJxg5N.js";import{g as f}from"./storage-9woz5qE_.js";document.addEventListener("DOMContentLoaded",async()=>{const s=await f("auth"),n=w(".userId");s.isAuth?n.textContent=s.userData.record.username:window.location.href="/src/pages/landing/";const p=await i.collection("program_thumbnail").getFullList({sort:"updated"}),c=await i.collection("program_thumbnail").getFullList({sort:"@random"}),u=await i.collection("program_thumbnail").getFullList({sort:"rank"}),d=await i.collection("vod_thumbnail").getFullList({sort:"created"}),g=await i.collection("live_thumbnail").getFullList({sort:"-viewership"});p.forEach(e=>{if(e.isClicked){const a=`
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
          `;l(".now-see .thumbnail-wrap",a)}}),c.forEach(e=>{const a=`
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
  `;l(".must-see .thumbnail-wrap",a)}),d.forEach(e=>{const a=`
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
  `;l(".quickvod .thumbnail-wrap",a)}),u.forEach(e=>{if(e.rank<11){const a=`
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
  `;l(".popular-title .thumbnail-wrap",a)}}),g.forEach(e=>{const a=`
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
`;l(".popular-live .thumbnail-wrap",a)}),new o(".full-swiper",{slidesPerView:1,loop:!0,autoplay:{delay:3200},pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},keyboard:{enabled:!0}});function t(e){return new o(e,{grabCursor:!0,simulateTouch:!0,allowTouchMove:!0,cssMode:!1,keyboard:{enabled:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},spaceBetween:0,slidesPerView:"auto",slidesPerGroupAuto:!0})}t(".now-swiper"),t(".must-swiper"),t(".quickvod-swiper"),t(".popular-title-swiper"),t(".popular-live-swiper"),t(".only-swiper"),t(".event-swiper")});
