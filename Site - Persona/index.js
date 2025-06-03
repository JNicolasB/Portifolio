// CARROSSEL

var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop:true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 150,
      modifier: 0.1,
      slideShadows: true,
    },
    autoplay:{
        delay: 1700,
        disableOnInteraction: false,
    }
  });

  
