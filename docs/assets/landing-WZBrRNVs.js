import"./reset-9GtOEJoH.js";/* empty css               *//* empty css              */import"./include-JfAPemNh.js";import{S as h}from"./swiper-bundle-GuwshZwN.js";import{p as a}from"./pocketbase-v9INCz3k.js";import{a as s,g as l,i as t}from"./common-6v7X-qfQ.js";import"./footer-w40geAFS.js";document.addEventListener("DOMContentLoaded",async()=>{new h(".mySwiper",{slidesPerView:3,spaceBetween:30,centeredSlides:!1});let c=null;const d=s(".skeleton-loading"),m=s(".animskeleton-loading");document.addEventListener("scroll",()=>{const e=s(".landing .header");window.scrollY>50?e.style.backgroundColor="rgba(0, 0, 0)":e.style.backgroundColor="rgba(0, 0, 0, 0)"});async function w(){try{const i=(await a.collection("landing_animationImg").getList()).items,r=await a.collection("landing_animationImg").getFullList({sort:"@random"});m.style.display="none",i.forEach(n=>{const o=`
          <img src="${l(n)}" alt="">
        `;t(".landing .div-slide__one",o),t(".landing .div-slide__two",o)}),r.forEach(n=>{const o=`
            <img src="${l(n)}" alt="">
          `;t(".landing .div-slide__three",o),t(".landing .div-slide__four",o)})}catch(e){console.log(e)}}async function g(){try{const i=(await a.collection("program_thumbnail").getList()).items;d.style.display="none",s(".landing .swiper-wrapper").innerHTML="",i.forEach(r=>{const n=`
        <div class="swiper-slide"><img src="${l(r,"image")}" alt="">
        </div>
        `;t(".landing .swiper-wrapper",n)})}catch(e){console.log(e)}}async function u(){try{const i=(await a.collection("original_thumbnail_small").getList()).items;d.style.display="none",s(".landing .swiper-wrapper").innerHTML="",i.forEach(r=>{const n=`
        <div class="swiper-slide"><img src="${l(r,"image")}" alt="">
        </div>
        `;t(".landing .swiper-wrapper",n)})}catch(e){console.log(e)}}function f(e){e==="vertical"?(c="vertical",g()):e==="horizontal"&&(c="horizontal",u())}function p(){const e=window.innerWidth;let i=null;e<1920?i="vertical":i="horizontal",i!==c&&f(i)}p(),window.addEventListener("resize",p),w()});
