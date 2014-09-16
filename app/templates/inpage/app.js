(function() {
    console.log('It works!');

    //Declaring namespace
    var bgExit,
        timeLine = [];

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
            Enabler.addEventListener(studio.events.StudioEvent.VISIBLE,
                adVisibilityHandler);
        }
    }

    /**
     * Init the Ad
     */

    function adVisibilityHandler() {
        //Assign All the elements to the element on the page
        bgExit = document.getElementById('bg-exit');

        //Bring in listeners
        addListeners();

        //Bring in tracking
        addTracking();

        // Start Animation
        document.body.setAttribute('class', 'start');
        startAnimation();
    }

    function addListeners() {
        bgExit.addEventListener('click', bgExitHandler, false);
    }

    function addTracking() {

    }

    function startAnimation() {
        // for example
        // timeLine.push(delaySetClass('logo-icon', 100, 'logo-in'));
    }

    function switchToEnd() {
        var i = 0,
            len = timeLine.length;

        for (; i < len; i++) {
            clearTimeout(timeLine[i]);
        };

        document.body.setAttribute('class', 'end');
    }

    function bgExitHandler(e) {
        Enabler.exit('Background Exit');
        switchToEnd();
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