//********************************************
//               JavaScript
//********************************************

"use strict";

(function () {

  var Menu = {
    init: function init() {
      this.cacheDOM();
      this.bindEvents();
    },
    cacheDOM: function cacheDOM() {
      this.$body = $('body');
      this.$menuOpen = this.$body.find('.menu-button');
      this.$menuClose = this.$body.find('.menu-button-close');
      this.$headerWrapper = this.$body.find('.header-wrapper');
    },
    bindEvents: function bindEvents() {
      this.$menuOpen.on('click', this.openMenu.bind(this));
      this.$menuClose.on('click', this.closeMenu.bind(this));
    },
    openMenu: function openMenu() {
      this.$headerWrapper.addClass('active-menu');
    },
    closeMenu: function closeMenu() {
      this.$headerWrapper.removeClass('active-menu');
    }
  };

  Menu.init();
})();