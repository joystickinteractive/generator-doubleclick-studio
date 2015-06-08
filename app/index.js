'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var DctemplateGenerator = module.exports = function DctemplateGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(DctemplateGenerator, yeoman.generators.Base);

DctemplateGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'list',
    name: 'dcType',
    message: 'Which type do you want to create?',
    choices: [
      { key: "1", name: "1. In-page", value: "inpage" },
      { key: "2", name: "2. Expanding", value: "expanding" },
      { key: "3", name: "3. Lightbox", value: "lightbox" },
      { key: "4", name: "4. Lightbox Fullscreen", value: "lightbox_fullscreen" }
    ],
    default: 0
  }, {
    name: 'unitWidth',
    message: 'Width?',
    default: 300
  }, {
    name: 'unitHeight',
    message: 'Height?',
    default: 250
  }, {
    name: 'expandingWidth',
    message: 'Expanding width?',
    default: 600,
    when: function(props) {
      return props.dcType === 'expanding' || props.dcType === 'lightbox';
    }
  }, {
    name: 'expandingHeight',
    message: 'Expanding height?',
    default: 250,
    when: function(props) {
      return props.dcType === 'expanding' || props.dcType === 'lightbox';
    }
  }, {
    type: 'confirm',
    name: 'tweenLiteOption',
    message: 'Would you like to enable TweenLite.js?',
    default: false
  }, 
  /*, {
    type: 'confirm',
    name: 'zeptoOption',
    message: 'Would you like to enable zepto.js?',
    default: false
  }, {
    type: 'confirm',
    name: 'tweenLiteOption',
    message: 'Would you like to enable TweenLite.js?',
    default: false
  }, {
    type: 'confirm',
    name: 'timelineLiteOption',
    message: 'Would you like to enable TimelineLite.js?',
    default: false
  }*/];

  this.prompt(prompts, function (props) {
    this.dcType = props.dcType;
    this.unitWidth = props.unitWidth;
    this.unitHeight = props.unitHeight;
    this.expandingWidth = props.expandingWidth;
    this.expandingHeight = props.expandingHeight;
    // this.zeptoOption = props.zeptoOption;
    this.tweenLiteOption = props.tweenLiteOption;
    // this.timelineLiteOption = props.timelineLiteOption;

    cb();
  }.bind(this));
};


DctemplateGenerator.prototype.app = function app() {
  this.template('_README.md', 'README.md');

  this.template('_package.json', 'package.json');
  this.template('_Gruntfile.js', 'Gruntfile.js');

};

DctemplateGenerator.prototype.projectfiles = function projectfiles() {
  this.template('editorconfig', '.editorconfig');
  this.template('jshintrc', '.jshintrc');
};

DctemplateGenerator.prototype.inPage = function inPage() {
  if (this.dcType == 'inpage') {
    this.directory('inpage/', 'dev/');
  }
};
DctemplateGenerator.prototype.expanding = function expanding() {
  if (this.dcType == 'expanding') {
    this.directory('expanding/', 'dev/');
  }
};
DctemplateGenerator.prototype.lightbox = function lightbox() {
  if (this.dcType == 'lightbox') {
    this.directory('lightbox/', 'dev/');
  }
};

/*DctemplateGenerator.prototype.zepto = function zepto() {
  if (this.zeptoOption) {
    this.template('vendor/zepto.js', 'dev/zepto.js');
  }
};
DctemplateGenerator.prototype.gsap = function gsap() {
  if (this.tweenLiteOption) {
    this.template('vendor/TweenLite.js', 'dev/TweenLite.js');
  }
  if (this.timelineLiteOption) {
    this.template('vendor/TimelineLite.js', 'dev/TimelineLite.js');
  }
};*/