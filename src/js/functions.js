//********************************************
//               JavaScript
//********************************************

"use strict";

(function() {

  const Menu = {
    init: function() {
      this.cacheDOM();
      this.bindEvents();
    },
    cacheDOM: function() {
      this.$body            = $('body');
      this.$menuOpen        = this.$body.find('.menu-button');
      this.$menuClose       = this.$body.find('.menu-button-close');
      this.$headerWrapper   = this.$body.find('.header-wrapper');
    },
    bindEvents: function() {
      this.$menuOpen.on('click', this.openMenu.bind(this));
      this.$menuClose.on('click', this.closeMenu.bind(this));
    },
    openMenu: function() {
      this.$headerWrapper.addClass('active-menu');
    },
    closeMenu: function() {
      this.$headerWrapper.removeClass('active-menu');
    }
  }

  Menu.init();

})();
