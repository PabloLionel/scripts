const isMobile = navigator?.userAgent ?
  [/Android/i,/webOS/i,/iPhone/i,/iPad/i,/iPod/i,/BlackBerry/i,/Windows Phone/i].some(re => navigator.userAgent.match(re))
  : false;
