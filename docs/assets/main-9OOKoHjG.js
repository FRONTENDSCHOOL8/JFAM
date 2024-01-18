import"./reset-9GtOEJoH.js";/* empty css              *//* empty css               */import{S as o}from"./swiper-bundle-GuwshZwN.js";import{g as w,a as i,i as r}from"./common-NlTJxg5N.js";import{p as l}from"./pocketbase-sgNYQJQ-.js";import{g as f}from"./storage-9woz5qE_.js";document.addEventListener("DOMContentLoaded",async()=>{const s=await f("auth"),n=w(".userId");s.isAuth?n.textContent=s.userData.record.username:window.location.href="/src/pages/landing/";const p=await l.collection("program_thumbnail").getFullList({sort:"updated"}),c=await l.collection("program_thumbnail").getFullList({sort:"@random"}),u=await l.collection("program_thumbnail").getFullList({sort:"rank"}),d=await l.collection("vod_thumbnail").getFullList({sort:"created"}),g=await l.collection("live_thumbnail").getFullList({sort:"-viewership"});p.forEach(t=>{if(t.isClicked){const e=`
  <div class="swiper-slide">
          <figure>
          <a href="${t.link}">
          <img
            class="thumbnail-vertical"
            src="${i(t)}"
            alt="${t.title}"/>
            </a>
          <figcaption>${t.title}</figcaption>
          </figure>
          </div>
          `;r(".now-see .thumbnail-wrap",e)}}),c.forEach(t=>{const e=`
  <div class="swiper-slide">
          <figure>
          <a href="${t.link}">
          <img
            class="thumbnail-vertical"
            src="${i(t)}"
            alt="${t.title}"/>
            </a>
          <figcaption>${t.title}</figcaption>
          </figure>
          </div>
  `;r(".must-see .thumbnail-wrap",e)}),d.forEach(t=>{const e=`
  <div class="swiper-slide">
          <figure>
          <a href="${t.link}">
          <img
            class="thumbnail-horizontal"
            src="${i(t)}"
            alt="${t.title}"/>
            </a>
          <figcaption>
            ${t.title}
            <p>${t.episode_title}</p>
          </figcaption>
          </figure>
          </div>
  `;r(".quickvod .thumbnail-wrap",e)}),u.forEach(t=>{if(t.rank<11){const e=`
  <div class="swiper-slide">
  <figure>
  <a href="${t.link}">
  <img
            class="thumbnail-vertical"
            src="${i(t)}"
            alt="${t.title}"/>
            </a>
          <figcaption>
          <em>${t.rank}</em>${t.title}
          </figcaption>
        </figure>
  </div>
  `;r(".popular-title .thumbnail-wrap",e)}}),g.forEach(t=>{const e=`
      <div class="swiper-slide">
      <figure>
      <a href="${t.link}">
          <img
            class="thumbnail-horizontal"
            src="${i(t)}"
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
`;r(".popular-live .thumbnail-wrap",e)}),new o(".full-swiper",{slidesPerView:1,loop:!0,autoplay:{delay:3200},pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},keyboard:{enabled:!0}});function a(t){return new o(t,{grabCursor:!0,simulateTouch:!0,allowTouchMove:!0,cssMode:!1,keyboard:{enabled:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},spaceBetween:0,slidesPerView:"auto",slidesPerGroupAuto:!0})}a(".now-swiper"),a(".must-swiper"),a(".quickvod-swiper"),a(".popular-title-swiper"),a(".popular-live-swiper"),a(".only-swiper"),a(".event-swiper")});
