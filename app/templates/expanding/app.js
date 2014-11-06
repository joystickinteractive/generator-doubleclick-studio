/* variables */
var main_panel
, collapsed_panel
, expanded_panel
, expand_button
, collapse_button
, expanded_background_exit
;


/* init */
var init = function() {
  main_panel = document.querySelectorAll('.main_panel')[0];
  collapsed_panel = document.querySelectorAll('.collapsed_panel')[0];
  expanded_panel = document.querySelectorAll('.expanded_panel')[0];
  expand_button = document.querySelectorAll('.expand_button')[0];
  collapse_button = document.querySelectorAll('.collapse_button')[0];
  expanded_background_exit = document.querySelectorAll('.expanded_background_exit')[0];

  main_panel.style.visibility = 'visible';
  collapsed_panel.style.display = 'block';
  expanded_panel.style.display = 'none';
};

/* handle evevents after init */
var handleEvents = function() {
  expanded_background_exit.addEventListener(evtClick, bgExitHandler, false);
  expand_button.addEventListener(evtClick, expandHandler, false);
  collapse_button.addEventListener(evtClick, manualCloseHandler, false);
};

/* functions */
var stopMedia = function() {
  // stop all sounds, all videos
};
var adExit = function() {
  // on ad exit, stop all sounds
  // and collapse
  stopMedia();
  Enabler.requestCollapse();
};
var bgExitHandler = function() {
  Enabler.exit('Background Exit');
};
var expandHandler = function() {
  Enabler.requestExpand();
};
var manualCloseHandler = function() {
  Enabler.reportManualClose();
  Enabler.requestCollapse();
};
// render collapse view
var collapseFinish = function() {
  // stop all sounds, all videos
  stopMedia();
  collapsed_panel.style.display = 'block';
  expanded_panel.style.display = 'none';
}
// render expand view
var expandFinish = function() {
  collapsed_panel.style.display = 'none';
  expanded_panel.style.display = 'block';
}




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
  // Set expanding pixel offsets.
  Enabler.setExpandingPixelOffsets(0, 0, <%=expandingWidth%>, <%=expandingHeight%>, false, false);
  // Add expansion listeners.
  Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, function(){
    Enabler.finishExpand();
  }, false);
  Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, function(){
    expandFinish();
  }, false);
  Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, function(){
    Enabler.finishCollapse();
  }, false);
  Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, function(){
    collapseFinish();
  }, false);
  Enabler.addEventListener(studio.events.StudioEvent.EXIT, function(){
    adExit();
  }, false);

  if (Enabler.isPageLoaded()) {
    init();
    handleEvents();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, function() {
      init();
      handleEvents();
    });
  }
};

