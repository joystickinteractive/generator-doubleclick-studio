(function() {
  console.log('It works!');

  //Declaring namespace
  var expandBtn,
    collapsedPanel,
    expandedPanel,
    collapseBtn,
    expandedPanelBgExit,
    collapseTimeLine = [],
    expandTimeLime = [];

  // Check the Enabler
  if (Enabler.isInitialized()) {
    enablerInitHandler();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
  }

  function enablerInitHandler() {
    if (Enabler.isVisible()) {
      adVisibilityHandler();
    } else {
      Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, adVisibilityHandler);
    }
  }

  /**
   * Init the Ad
   */

  function adVisibilityHandler() {
    Enabler.setExpandingPixelOffsets(0, 250, 300, 300, false, false);

    //Assign All the elements to the element on the collpase-panel
    expandBtn = document.getElementById('expand-button');

    //Assign All the elements to the element on the expand-panel
    expandedPanel = document.getElementById('expanded-panel');
    collapseBtn = document.getElementById('collapse-button');
    expandedPanelBgExit = document.getElementById('expanded-background-exit');

    //Bring in listeners
    addListeners();

    // Collpased Panel Animation
    document.body.setAttribute('class', 'start');
    collapseAnimation();
  }

  function addListeners() {
    expandBtn.addEventListener('click', expandHandle, false);
    collapseBtn.addEventListener('click', collapseHandle, false);
    expandedPanelBgExit.addEventListener('click', expandedPanelBgExitHandle, false);
  }

  function collapseAnimation() {
    // collapseTimeLine.push(delaySetClass('c-copy-1', 100, 'copy-in'));
  }

  // expand-button

  function expandHandle(e) {
    Enabler.expand();
    Enabler.counter('Collapsed_ClickToExpand_Counter');

    expandedPanel.style.display = 'block';

    expandAnimation();
  }

  function expandAnimation() {
    // expandTimeLime.push(delaySetClass('e-bg', 0, 'bg-in'));
  }

  // expanded-panel-bg

  function expandedPanelBgExitHandle(e) {
    Enabler.collapse();
    Enabler.exit('Expanded_Background_Exit');
    expandedPanel.style.display = 'none';
  }

  // collapse-button

  function collapseHandle(e) {
    Enabler.collapse();
    Enabler.reportManualClose();
    Enabler.counter('Expanded_Close_Counter');
    expandedPanel.style.display = 'none';
  }

  function delaySetClass(elementId, delayTime, classToAdd, classToRemove, callback) {
    var element = document.getElementById(elementId);

    if (element == null) {
      console.log(elementId + 'does not exit!');
      return;
    }

    var delayTimeout = setTimeout(function() {
      var oldClassName = element.className,
        newClassName = '';

      if (typeof classToAdd == 'string') {
        newClassName = oldClassName + ' ' + classToAdd;
      } else if (Object.prototype.toString.call(classToAdd) === '[object Array]') {
        newClassName = oldClassName + ' ' + classToAdd.join(' ');
      }
      element.className = newClassName;
      oldClassName = newClassName;

      if (typeof classToRemove == 'string') {
        newClassName = oldClassName.replace(classToRemove, '').trim();
      } else if (Object.prototype.toString.call(classToRemove) === '[object Array]') {
        classToRemove.forEach(function(item) {
          oldClassName = oldClassName.replace(item, '');
        });
        newClassName = oldClassName.trim();
      }

      element.className = newClassName;

      if (typeof callback == 'function') {
        callback();
      }
    }, delayTime);

    return delayTimeout;
  }

  /**
   * 播放序列帧图片
   * @param  {string} elementId         元素id
   * @param  {number} playTime          播放时间/ms
   * @param  {number} totalSpriteHeight 序列帧图片高度/px
   * @param  {number} startFrame        播放开始帧数(0为空白帧)
   * @param  {number} endFrame          播放结束帧数(总帧数+1为空白帧)
   * @return {null}                   没有返回值
   */

  function playSpriteAni(elementId, playTime, totalSpriteHeight, startFrame, endFrame) {
    var element = document.getElementById(elementId),
      spriteHeight = element.clientHeight,
      startFrame = (startFrame == 0) || startFrame ? startFrame : 1,
      endFrame = endFrame ? endFrame : (totalSpriteHeight / spriteHeight),
      playRate = playTime / (endFrame - startFrame);

    var curFrame = startFrame;
    var transY = -(startFrame - 1) * spriteHeight;
    var endtransY = -(endFrame - 1) * spriteHeight;

    var sprites = setInterval(function() {
      curFrame++;
      transY -= spriteHeight;

      element.style.backgroundPosition = "0 " + transY + "px";

      if (curFrame == endFrame || document.body.className == 'end') {
        element.style.backgroundPosition = "0 " + endtransY + "px";
        clearInterval(sprites);
      }

    }, playRate);
  }
})();