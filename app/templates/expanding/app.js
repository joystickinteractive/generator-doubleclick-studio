/* variables */
var mainPanel
, collapsedPanel
, expandPanel
, expandButton
, collapseButton
, expandedBackgroundExit
;


/* init */
var init = function() {
  mainPanel = document.querySelectorAll('#main-panel')[0];
  collapsedPanel = document.querySelectorAll('#collapsed-panel')[0];
  expandPanel = document.querySelectorAll('#expand-panel')[0];
  expandButton = document.querySelectorAll('#expand-button')[0];
  collapseButton = document.querySelectorAll('#collapse-button')[0];
  expandedBackgroundExit = document.querySelectorAll('#expanded-background-exit')[0];

  mainPanel.style.visibility = 'visible';
  collapsedPanel.style.display = 'block';
  expandPanel.style.display = 'none';
};

/* handle evevents after init */
var handleEvents = function() {
  expandedBackgroundExit.addEventListener(evtClick, bgExitHandler, false);
  expandButton.addEventListener(evtClick, expandHandler, false);
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
var expandHandler = function() {
  Enabler.requestExpand();
};
// render collapse view
var collapseFinish = function() {
  // stop all sounds, all videos
  stopMedia();
  collapsedPanel.style.display = 'block';
  expandPanel.style.display = 'none';
}
// render expand view
var expandFinish = function() {
  collapsedPanel.style.display = 'none';
  expandPanel.style.display = 'block';
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

  if (Enabler.isPageLoaded()) {
    init();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, function() {
      init();
      handleEvents();
    });
  }
};

