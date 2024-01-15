import"./reset-9GtOEJoH.js";/* empty css              *//* empty css               */import{S as s}from"./swiper-bundle-GuwshZwN.js";import{p as i}from"./pocketbase-v9INCz3k.js";import{g as m,a as r,i as l}from"./common-NlTJxg5N.js";import{g as h}from"./storage-9woz5qE_.js";document.addEventListener("DOMContentLoaded",async()=>{const o=await h("auth"),n=m(".userId");o.isAuth?n.textContent=o.userData.record.username:window.location.href="/src/pages/landing/";const p=await i.collection("program_thumbnail").getFullList({sort:"updated"}),c=await i.collection("program_thumbnail").getFullList({sort:"@random"}),u=await i.collection("program_thumbnail").getFullList({sort:"rank"}),d=await i.collection("vod_thumbnail").getFullList({sort:"created"}),g=await i.collection("live_thumbnail").getFullList({sort:"-viewership"});p.forEach(e=>{if(e.isClicked){const t=`
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
          `;l(".now-see .thumbnail-wrap",t)}}),c.forEach(e=>{const t=`
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
  `;l(".must-see .thumbnail-wrap",t)}),d.forEach(e=>{const t=`
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
  `;l(".quickvod .thumbnail-wrap",t)}),u.forEach(e=>{if(e.rank<11){const t=`
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
  `;l(".popular-title .thumbnail-wrap",t)}}),g.forEach(e=>{const t=`
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
`;l(".popular-live .thumbnail-wrap",t)}),new s(".full-swiper",{slidesPerView:1,loop:!0,autoplay:{delay:3200},pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},keyboard:{enabled:!0}});function a(e){return new s(e,{grabCursor:!0,simulateTouch:!0,allowTouchMove:!0,cssMode:!1,keyboard:{enabled:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},spaceBetween:0,slidesPerView:"auto",slidesPerGroupAuto:!0})}a(".now-swiper"),a(".must-swiper"),a(".quickvod-swiper"),a(".popular-title-swiper"),a(".popular-live-swiper"),a(".only-swiper"),a(".event-swiper");const w=document.querySelectorAll(".swiper-slide"),f={title:"test",link:"https://example.com",isClicked:!0,rank:123};w.forEach(e=>{e.addEventListener("mouseenter",async()=>{await i.collection("program_thumbnail").update("RECORD_ID",f)}),console.log(i),console.log(RECORD_ID)})});
