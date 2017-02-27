(function() {
'use strict';

angular.module('msgr', [])
.controller('Controller', Controller)
.component('chat', {
  templateUrl: 'chat.html',
  controller: chatController,
  bindings: {
      msgs: '<',
      onRemove: '&'
  }
});

function chatController() {
  this.delete = function(myindex) {
    this.onRemove({index: myindex});
  }
}

Controller.$inject = ['$timeout'];
function Controller($timeout) {
  var ctrl = this;
  ctrl.warning = false;
  ctrl.msgs = [];

  ctrl.submit = function() {
    var d = datetime();
    var newMsg = {text: ctrl.outMsg, class: 'out', date: d};
    ctrl.msgs.push(newMsg);
    ctrl.outMsg = "";
    $timeout(ctrl.answer, 1000);
  }

  ctrl.deleteAll = function() {
    ctrl.msgs = [];
    ctrl.warning = false;
  }

  ctrl.confirm = function() {
    ctrl.warning = true;
  }

  ctrl.answer = function() {
    var answers = [
      {text: 'Hi!', class: 'in', name: 'Robert Lutece'},
      {text: 'Wazzup!', class: 'in', name: 'Robert Lutece'},
      {text: 'What did you say?', class: 'in', name: 'Robert Lutece'},
      {text: 'Do not understand you', class: 'in', name: 'Robert Lutece'}
    ];
    var i = Math.floor(Math.random() * 4);
    var ans = answers[i];
    ans.date = datetime();
    ctrl.msgs.push(ans);
  }

  ctrl.delete = function(index) {
    ctrl.msgs.splice(index, 1);
  }
}

function datetime() {
  var d = new Date();
  var day = d.toLocaleDateString().replace(/\./g, "-");
  var time = d.toLocaleTimeString();
  d = day + " " + time;
  return d;
}

})();
