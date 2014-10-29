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
    name: 'dcType',
    message: 'Which type do you want to create?(1.In-page, 2.Expanding)',
    default: 1
  }, {
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
  }];

  this.prompt(prompts, function (props) {
    this.dcType = props.dcType;
    this.zeptoOption = props.zeptoOption;
    this.tweenLiteOption = props.tweenLiteOption;
    this.timelineLiteOption = props.timelineLiteOption;

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
  if (this.dcType == 1) {
    this.directory('inpage/', 'dev/');
  }
};
DctemplateGenerator.prototype.expanding = function expanding() {
  if (this.dcType == 2) {
    this.directory('expanding/', 'dev/');
  }
};

DctemplateGenerator.prototype.zepto = function zepto() {
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
};