import"./reset-9GtOEJoH.js";/* empty css               *//* empty css               *//* empty css              */import"./include-JfAPemNh.js";import{S as h}from"./swiper-bundle-GuwshZwN.js";import{p as s}from"./pocketbase-v9INCz3k.js";import{g as a,a as l,i as t}from"./common-NlTJxg5N.js";import"./footer-w40geAFS.js";document.addEventListener("DOMContentLoaded",async()=>{new h(".mySwiper",{slidesPerView:3,spaceBetween:30,centeredSlides:!1});let c=null;const d=a(".skeleton-loading"),m=a(".animskeleton-loading");document.addEventListener("scroll",()=>{const e=a(".landing .header"),i=window.scrollY;e&&(i>50?e.style.backgroundColor="rgba(0, 0, 0)":e.style.backgroundColor="rgba(0, 0, 0, 0)")});async function w(){try{const i=(await s.collection("landing_animationImg").getList()).items,r=await s.collection("landing_animationImg").getFullList({sort:"@random"});m.style.display="none",i.forEach(n=>{const o=`
          <img src="${l(n)}" alt="">
        `;t(".landing .div-slide__one",o),t(".landing .div-slide__two",o)}),r.forEach(n=>{const o=`
            <img src="${l(n)}" alt="">
          `;t(".landing .div-slide__three",o),t(".landing .div-slide__four",o)})}catch(e){console.log(e)}}async function g(){try{const i=(await s.collection("program_thumbnail").getList()).items;d.style.display="none",a(".landing .swiper-wrapper").innerHTML="",i.forEach(r=>{const n=`
        <div class="swiper-slide"><img src="${l(r,"image")}" alt="">
        </div>
        `;t(".landing .swiper-wrapper",n)})}catch(e){console.log(e)}}async function f(){try{const i=(await s.collection("original_thumbnail_small").getList()).items;d.style.display="none",a(".landing .swiper-wrapper").innerHTML="",i.forEach(r=>{const n=`
        <div class="swiper-slide"><img src="${l(r,"image")}" alt="">
        </div>
        `;t(".landing .swiper-wrapper",n)})}catch(e){console.log(e)}}function u(e){e==="vertical"?(c="vertical",g()):e==="horizontal"&&(c="horizontal",f())}function p(){const e=window.innerWidth;let i=null;e<1920?i="vertical":i="horizontal",i!==c&&u(i)}p(),window.addEventListener("resize",p),w()});
