import"./reset-9GtOEJoH.js";import"./footer--eYzTGVC.js";/* empty css              */import"./include-JfAPemNh.js";import{S as h}from"./swiper-bundle-GuwshZwN.js";import{p as a}from"./pocketbase-v9INCz3k.js";import{g as s,a as l,i as t}from"./common-NlTJxg5N.js";document.addEventListener("DOMContentLoaded",async()=>{new h(".mySwiper",{slidesPerView:3,spaceBetween:30,centeredSlides:!1,breakpoints:{1920:{}}});let c=null;const d=s(".skeleton-loading"),m=s(".animskeleton-loading");document.addEventListener("scroll",()=>{const e=s(".landing .header");window.scrollY>50?e.style.backgroundColor="rgba(0, 0, 0)":e.style.backgroundColor="rgba(0, 0, 0, 0)"});async function w(){try{const n=(await a.collection("landing_animationImg").getList()).items,r=await a.collection("landing_animationImg").getFullList({sort:"@random"});m.style.display="none",n.forEach(i=>{const o=`
          <img src="${l(i)}" alt="">
        `;t(".landing .div-slide__one",o),t(".landing .div-slide__two",o)}),r.forEach(i=>{const o=`
            <img src="${l(i)}" alt="">
          `;t(".landing .div-slide__three",o),t(".landing .div-slide__four",o)})}catch(e){console.log(e)}}async function g(){try{const n=(await a.collection("program_thumbnail").getList()).items;d.style.display="none",s(".landing .swiper-wrapper").innerHTML="",n.forEach(r=>{const i=`
        <div class="swiper-slide"><img src="${l(r,"image")}" alt="">
        </div>
        `;t(".landing .swiper-wrapper",i)})}catch(e){console.log(e)}}async function u(){try{const n=(await a.collection("original_thumbnail_small").getList()).items;d.style.display="none",s(".landing .swiper-wrapper").innerHTML="",n.forEach(r=>{const i=`
        <div class="swiper-slide"><img src="${l(r,"image")}" alt="">
        </div>
        `;t(".landing .swiper-wrapper",i)})}catch(e){console.log(e)}}function f(e){e==="vertical"?(c="vertical",g()):e==="horizontal"&&(c="horizontal",u())}function p(){const e=window.innerWidth;let n=null;e<1920?n="vertical":n="horizontal",n!==c&&f(n)}p(),window.addEventListener("resize",p),w()});
