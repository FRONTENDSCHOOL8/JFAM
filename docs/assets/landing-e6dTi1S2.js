import"./reset-9GtOEJoH.js";import"./footer--eYzTGVC.js";/* empty css              */import{S as h}from"./swiper-bundle-GuwshZwN.js";import{p as d}from"./pocketbase-v9INCz3k.js";import{g as c,a as p,i as o}from"./common-zV-of-AF.js";function y(t){const{includePath:r}=t.dataset;if(r){const s=new XMLHttpRequest;s.onreadystatechange=function(){this.readyState==4&&this.status==200&&(t.outerHTML=this.responseText)},s.open("GET",r,!0),s.send()}}function S(){const t=document.getElementsByTagName("*");Array.prototype.forEach.call(t,y),console.log("include")}window.addEventListener("load",S);document.addEventListener("DOMContentLoaded",async()=>{new h(".mySwiper",{slidesPerView:3,spaceBetween:30,centeredSlides:!1,breakpoints:{1920:{}}});let t=null;const r=c(".skeleton-loading"),s=c(".animskeleton-loading");document.addEventListener("scroll",()=>{const e=c(".landing .header");window.scrollY>50?e.style.backgroundColor="rgba(0, 0, 0)":e.style.backgroundColor="rgba(0, 0, 0, 0)"});async function g(){try{const n=(await d.collection("landing_animationImg").getList()).items,a=await d.collection("landing_animationImg").getFullList({sort:"@random"});s.style.display="none",n.forEach(i=>{const l=`
          <img src="${p(i)}" alt="">
        `;o(".landing .div-slide__one",l),o(".landing .div-slide__two",l)}),a.forEach(i=>{const l=`
            <img src="${p(i)}" alt="">
          `;o(".landing .div-slide__three",l),o(".landing .div-slide__four",l)})}catch(e){console.log(e)}}async function w(){try{const n=(await d.collection("program_thumbnail").getList()).items;r.style.display="none",c(".landing .swiper-wrapper").innerHTML="",n.forEach(a=>{const i=`
        <div class="swiper-slide"><img src="${p(a,"image")}" alt="">
        </div>
        `;o(".landing .swiper-wrapper",i)})}catch(e){console.log(e)}}async function u(){try{const n=(await d.collection("original_thumbnail_small").getList()).items;r.style.display="none",c(".landing .swiper-wrapper").innerHTML="",n.forEach(a=>{const i=`
        <div class="swiper-slide"><img src="${p(a,"image")}" alt="">
        </div>
        `;o(".landing .swiper-wrapper",i)})}catch(e){console.log(e)}}function f(e){e==="vertical"?(t="vertical",w()):e==="horizontal"&&(t="horizontal",u())}function m(){const e=window.innerWidth;let n=null;e<1920?n="vertical":n="horizontal",n!==t&&f(n)}m(),window.addEventListener("resize",m),g()});