/* variables */
var container
, bgExit
;


/* init */
var init = function() {
  bgExit = document.querySelectorAll('#bg-exit')[0];
};

/* handle evevents after init */
var handleEvents = function() {
  bgExit.addEventListener(evtClick, bgExitHandler, false);
};

/* functions */
var stopMedia = function() {
  // stop all sounds, all videos
};

var bgExitHandler = function() {
  // stop all sounds, all videos
  stopMedia();
  Enabler.exit('Background Exit');
};




/**
 * Helper functions 
 */
// check if mobile
var isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i) ? true : false;
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i) ? true : false;
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
  },
  iPad: function() {
    return navigator.userAgent.match(/iPad/i) ? true : false;
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i) ? true : false;
  },
  any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
  }
};
// check click events
var evtOver;
var evtClick;
var evtMouseDown;
var evtMouseUp;
var evtMouseMove;
var evtLeave;
if (isMobile.any()) {
  evtOver = 'touchstart';
  evtClick = 'touchstart';
  evtMouseDown = 'touchstart';
  evtMouseUp = 'touchend';
  evtMouseMove = 'touchmove';
} else {
  evtOver = 'mouseover';
  evtLeave = 'mouseleave';
  evtClick = 'click';
  evtMouseDown = 'mousedown';
  evtMouseUp = 'mouseup';
  evtMouseMove = 'mousemove';
}


/**
 * Waits for the page to load (and for the Enabler to be initialized) before
 * proceeding to call enablerInitHandler().
 */
window.onload = function () {
  if (Enabler.isInitialized()) {
    enablerInitHandler();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
  }

};
var enablerInitHandler = function () {
  // Add expansion listeners.
  Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, function(){
    Enabler.finishExpand();
  }, false);
  Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, function(){
    expandFinish();
    Enabler.counter('Lightbox Expand');
  }, false);
  Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, function(){
    Enabler.finishCollapse();
  }, false);
  Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, function(){
    collapseFinish();
    Enabler.counter('Lightbox Collapse');
  }, false);

  if (Enabler.isPageLoaded()) {
    init();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, function() {
      init();
      handleEvents();
    });
  }
};

