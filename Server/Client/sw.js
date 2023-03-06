
const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1.0.4");
  await cache.addAll(resources);
};

 self.addEventListener("install", (event) => {
    event.waitUntil(
      addResourcesToCache([
        "/",
        "/index.html",
        "/style.css",
        "/script.js",
        "/Images/badge.gif",
        "/Images/breakout.gif",
        "/Images/ChallengeBG.jpg",
        "/Images/chest.gif",
        "/Images/chest.png",
        "/Images/click.gif",
        "/Images/conference-room.jpg",
        "/Images/confetti.gif",
        "/Images/dragon.png",
        "/Images/fire.gif",
        "/Images/holo.png",
        "/Images/HPbg.jpg",
        "/Images/loader.gif",
        "/Images/MC_BG.jpg",
        "/Images/premiumLogo.png",
        "/Images/ProfileBG.jpg",
        "/Images/profileStatsBG.jpg",
        "/Images/sparkle.gif",
        "/Images/sparkles.gif",
        "/Images/stars.gif",
        "/Images/stressed.jpg",
        "/Images/success.gif",
        "/Images/user.png",
        "/Images/view1.jpg",
        "/Images/view2.jpg",
        "/Images/view3.jpg",
        "/Images/view4.jpg",
        "/Images/view5.jpg",

        "/Images/Pawn_Pack/Pawn.jpg",

        "/Images/Bishop_Pack/Locked/Bishop.jpg",
        "/Images/Bishop_Pack/Deactivated/bishopDeactivated.jpg",
        "/Images/Bishop_Pack/Active/bishopActivated.jpg",


        "/Images/Knight_Pack/Locked/Knight.jpg",
        "/Images/Knight_Pack/Deactivated/knightDeactivated.jpg",
        "/Images/Knight_Pack/Active/knightActivated.jpg",


        "/Images/Rook_Pack/Premium_Only/Rook.jpg",
        "/Images/Rook_Pack/Deactivated/rookDeactivated.jpg",
        "/Images/Rook_Pack/Active/rookActivated.jpg",



        "/Images/Queen_Pack/Premium_Only/Queen.jpg",
        "/Images/Queen_Pack/Deactivated/queenDeactivated.jpg",
        "/Images/Queen_Pack/Active/queenActivated.jpg",


        "/Images/King_Pack/Premium_Only/King.jpg",
        "/Images/King_Pack/Deactivated/kingDeactivated.jpg",
        "/Images/King_Pack/Active/kingActivated.jpg",


        "/Images/Japanese_Pack/Premium_Only/Jp.jpg",
        "/Images/Japanese_Pack/Deactivated/jpDeactivated.jpg",
        "/Images/Japanese_Pack/Active/jpActivated.jpg",


        "/Images/Spanish_Pack/Premium_Only/Es.jpg",
        "/Images/Spanish_Pack/Deactivated/esDeactivated.jpg",
        "/Images/Spanish_Pack/Active/esActivated.jpg",


        "/Images/Players/1.jpg",
        "/Images/Players/2.jpg",
        "/Images/Players/3.jpg",
        "/Images/Players/4.jpg",
        "/Images/Players/5.jpg",
        "/Images/Players/6.jpg",
        "/Images/Players/7.jpg",
        "/Images/Players/8.jpg",
        "/Images/Players/9.jpg",
        "/Images/Players/10.jpg",
        "/Images/Players/11.jpg",
        "/Images/Players/12.jpg",



        "/fonts/RobotoSlab-VariableFont_wght.ttf",
        "/Icons/bell.svg",
        "/Icons/check-mark.svg",
        "/Icons/checkmarkIcon.svg",
        "/Icons/close.svg",
        "/Icons/connection-lost.svg",
        "/Icons/dots.svg",
        "/Icons/emoji.svg",
        "/Icons/feedback.svg",
        "/Icons/funds.svg",
        "/Icons/growth-chart.svg",
        "/Icons/download.svg",
        "/Icons/horizontal.svg",
        "/Icons/idea-exchange.svg",
        "/Icons/knowledge.svg",
        "/Icons/leave.svg",
        "/Icons/left-arrow.svg",
        "/Icons/pictureBG.svg",
        "/Icons/right-arrow.svg",
        "/Icons/shareiOS.svg",
        "/Icons/solution.svg",
        "/Icons/speaker.svg",
        "/Icons/stand-out.svg",
        "/Icons/star.svg",
        "/Icons/trust.svg",
        "/Icons/icon72x72.png",
        "/Icons/icon96x96.png",
        "/Icons/icon120x120.png",
        "/Icons/icon128x128.png",
        "/Icons/icon144x144.png",
        "/Icons/icon152x152.png",
        "/Icons/icon180x180.png",
        "/Icons/icon192x192.png",
        "/Icons/icon384x384.png",
        "/Icons/icon512x512.png"

      ])
    );
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service worker activate event!')
  });

self.addEventListener('push', (event) => {
  let notification = event.data.json();
  event.waitUntil(
    self.registration.showNotification(notification.title, {
      body: notification.body,
      icon: "/Icons/icon192x192.png",
      vibrate: [500]
    })
  );
});
