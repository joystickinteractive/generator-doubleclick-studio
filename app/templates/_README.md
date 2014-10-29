
# 使用方法 #
## 目录介绍 ##
- dev: 开发目录，所有文件建立于此，不设置二级目录
- node_modules: node.js 模块
- pub: 发布目录，通过`grunt build`生成，用于上传DC平台
- package.json: node.js依赖关系
- Gruntfile.js: grunt配置文件

## HTML文件说明 ##
建议使用class定义样式，id用于js选取元素。
### Inpage ##
```
<!-- HTML 5 Ad Template from DoubleClick by KoodooGroup -->
<!doctype html>
<html lang="en">
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <title>Document Title</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="container">
        <div id="bg-exit"></div>
        <!-- Start Your Ad -->

    </div>
    <!-- Studio Enabler Required -->
    <script type="text/javascript" src="http://s0.2mdn.net/ads/studio/Enabler.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

基础结构无需改动，从`<!-- Start Your Ad -->`处开始添加元素。

### Expanding ###
```
<!-- HTML 5 Ad Template from DoubleClick by KoodooGroup -->
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Document Title</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div id="main-panel">
            <!-- Collapsed Conent -->
            <div id="collapsed-panel">
                <div id="expand-button">
                </div>
                <!-- Start Your Ad for Collapse -->

            </div>
            <!-- Expand Content -->
            <div id="expanded-panel">
                <div id="collapse-button">
                </div>
                <div id="expanded-background-exit">
                </div>
                <!-- Start Your Ad for Expand -->

            </div>
        </div>
        <!-- Studio Enabler Required -->
        <script src="http://s0.2mdn.net/ads/studio/Enabler.js" type="text/javascript"></script>
        <script type="text/javascript" src="app.js"> </script>
    </body>
</html>
```

基础结构无需改动，collapse部分从`<!-- Start Your Ad for Collapse -->`处开始， expand部分从`<!-- Start Your Ad for Expand -->`处开始。

## CSS文件结构 ##
文件尺寸在context.css中修改。

开发过程中，CSS文件分结构开发：

- `base.css`用于基础结构
- `context.css`用于结构和动画
- `end.css`用于定义最后画面


### 如何书写动画 ###
`backface-visibility`和`translateZ(0)`用于防止动画抖动。

transition方式：

```
.logo-text {
    width: 55px;
    height: 15px;
    position: absolute;
    top: 4px;
    left: 52px;
    opacity: 0;
    -webkit-backface-visibility: visible !important;
    backface-visibility: visible !important;
    -webkit-transform: translateZ(0);
    -webkit-transition: opacity 0.4s cubic-bezier(.70, 0, .81, 1) 0s, -webkit-transform 0.4s cubic-bezier(.80, 0, .60, 1) 0s;
}
.logo-text.fadein {
    opacity: 1;
    -webkit-transform: translateZ(0) translate(-20px,0);
}
```


animation方式：

```
#logo-text {
    opacity: 0;
    position: absolute;
    width: 284px;
    height: 90px;
    background: url(../images/mask_1.png) no-repeat;
    -webkit-backface-visibility: visible !important;
    backface-visibility: visible !important;
    -webkit-transform: translateZ(0);
}
.logo-text.fadein {
    -webkit-animation: fadein 0.6s 0s forwards cubic-bezier(0, .40, .20, 1);
}
@-webkit-keyframes fadein {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
```

## JavaScript结构 ##
`adVisibilityHandler`是项目入口。所有操作开始于此。css动画控制使用`delaySetClass`，时间以0为参考点。

### Inpage ###
`startAnimation`开始动画，书写方式如下：

```
function startAnimation() {
    timeLine.push(delaySetClass('logo-text', 0, 'fadein'));
}
```

### Expanding ###
`collapseAnimation`用于collapse动画， `expandAnimation`用于expand动画。

```
function collapseAnimation() {
  // collapseTimeLine.push(delaySetClass('c-copy', 100, 'copy-in'));
}

function expandAnimation() {
  // expandTimeLime.push(delaySetClass('e-bg', 0, 'bg-in'));
}
```