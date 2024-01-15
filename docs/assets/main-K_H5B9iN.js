import"./reset-9GtOEJoH.js";/* empty css              *//* empty css               */import{S as o}from"./swiper-bundle-GuwshZwN.js";import{p as i}from"./pocketbase-v9INCz3k.js";import{g as w,a as r,i as l}from"./common-NlTJxg5N.js";import{g as f}from"./storage-9woz5qE_.js";document.addEventListener("DOMContentLoaded",async()=>{const s=await f("auth"),n=w(".userId");s.isAuth?n.textContent=s.userData.record.username:window.location.href="/src/pages/landing/";const p=await i.collection("program_thumbnail").getFullList({sort:"updated"}),c=await i.collection("program_thumbnail").getFullList({sort:"@random"}),u=await i.collection("program_thumbnail").getFullList({sort:"rank"}),d=await i.collection("vod_thumbnail").getFullList({sort:"created"}),g=await i.collection("live_thumbnail").getFullList({sort:"-viewership"});p.forEach(t=>{if(t.isClicked){const e=`
  <div class="swiper-slide">
          <figure>
          <a href="${t.link}">
          <img
            class="thumbnail-vertical"
            src="${r(t)}"
            alt="${t.title}"/>
            </a>
          <figcaption>${t.title}</figcaption>
          </figure>
          </div>
          `;l(".now-see .thumbnail-wrap",e)}}),c.forEach(t=>{const e=`
  <div class="swiper-slide">
          <figure>
          <a href="${t.link}">
          <img
            class="thumbnail-vertical"
            src="${r(t)}"
            alt="${t.title}"/>
            </a>
          <figcaption>${t.title}</figcaption>
          </figure>
          </div>
  `;l(".must-see .thumbnail-wrap",e)}),d.forEach(t=>{const e=`
  <div class="swiper-slide">
          <figure>
          <a href="${t.link}">
          <img
            class="thumbnail-horizontal"
            src="${r(t)}"
            alt="${t.title}"/>
            </a>
          <figcaption>
            ${t.title}
            <p>${t.episode_title}</p>
          </figcaption>
          </figure>
          </div>
  `;l(".quickvod .thumbnail-wrap",e)}),u.forEach(t=>{if(t.rank<11){const e=`
  <div class="swiper-slide">
  <figure>
  <a href="${t.link}">
  <img
            class="thumbnail-vertical"
            src="${r(t)}"
            alt="${t.title}"/>
            </a>
          <figcaption>
          <em>${t.rank}</em>${t.title}
          </figcaption>
        </figure>
  </div>
  `;l(".popular-title .thumbnail-wrap",e)}}),g.forEach(t=>{const e=`
      <div class="swiper-slide">
      <figure>
      <a href="${t.link}">
          <img
            class="thumbnail-horizontal"
            src="${r(t)}"
            alt="${t.title}"/>
            </a>
          <figcaption>
              <em>${t.rank}</em>
            <p>
            ${t.title}<span>${t.episode_title}<br/>${t.viewership}%</span>
            </p>
          </figcaption>
          </figure>
      </div>
`;l(".popular-live .thumbnail-wrap",e)}),new o(".full-swiper",{slidesPerView:1,loop:!0,autoplay:{delay:3200},pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},keyboard:{enabled:!0}});function a(t){return new o(t,{grabCursor:!0,simulateTouch:!0,allowTouchMove:!0,cssMode:!1,keyboard:{enabled:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},spaceBetween:0,slidesPerView:"auto",slidesPerGroupAuto:!0})}a(".now-swiper"),a(".must-swiper"),a(".quickvod-swiper"),a(".popular-title-swiper"),a(".popular-live-swiper"),a(".only-swiper"),a(".event-swiper")});
