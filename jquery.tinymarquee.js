(function(jQuery) {
  var Marquee = (function() {
    function Marquee(element, options) {
      this.elements = {
        wrap: element,
        ul: element.children("ul:last")
      };
      this.ulW;
      this.settings = jQuery.extend({}, jQuery.fn.marquee.defaults, options);
    }

    Marquee.prototype.init = function() {
      this.setStyle();
      this.fillWrap();
      this.move();
      this.bind();
    }

    Marquee.prototype.setStyle = function() {
      this.elements.wrap.find("*").css("display", "inline-block");
      this.elements.wrap.css("white-space", "nowrap");
      this.elements.wrap.css("overflow", "hidden");
    }

    Marquee.prototype.fillWrap = function() {
      var wrapInnerW = this.elements.wrap.innerWidth(),
        ulW = this.elements.ul.outerWidth(true),
        ulCopyCount = Math.ceil(wrapInnerW / ulW);

      this.ulW = ulW;

      this.elements.wrap.children("ul").not(":last").remove();
      for (var i = 0; i < ulCopyCount; i++) {
        this.elements.ul.after(this.elements.ul.clone());
      }
    }

    Marquee.prototype.move = function() {
      var _this = this,
        interval = _this.settings.interval,
        firstUl = _this.elements.wrap.children("ul:first"),
        firstUlW = firstUl.outerWidth(),
        lastUl = _this.elements.wrap.children("ul:last"),
        firstUlMarginL = parseInt(firstUl.css("marginLeft")),
        firstUlMarginR = parseInt(firstUl.css("marginRight")),
        firstUlAndMarginRealW = firstUlW + firstUlMarginL + firstUlMarginR;

      if (firstUlAndMarginRealW < _this.ulW) {
        interval = firstUlAndMarginRealW / _this.ulW * interval;
      }

      firstUl.animate({marginLeft: -(firstUlW + firstUlMarginR) + "px"}, interval, "linear", function() {
        firstUl.remove();
        lastUl.after(lastUl.clone());
        _this.move();
      });
    }

    Marquee.prototype.pause = function() {
      var firstUl = this.elements.wrap.children("ul:first").stop();
    };

    Marquee.prototype.refillWrap = function() {
      var wrapInnerW = this.elements.wrap.innerWidth(),
        newUlCopyCount = Math.ceil(wrapInnerW / this.ulW) + 1,
        oldUlCopyCount = this.elements.wrap.children("ul").length,
        lastUl = this.elements.wrap.children("ul:last");

      this.pause();
      if (newUlCopyCount > oldUlCopyCount) {
        for (var i = 0; i < newUlCopyCount - oldUlCopyCount; i++) {
          lastUl.after(lastUl.clone());
        }
      } else if (newUlCopyCount < oldUlCopyCount) {
        for (var i = 0; i < oldUlCopyCount - newUlCopyCount; i++) {
          this.elements.wrap.children("ul:last").remove();
        }
      }
      this.move();
    }

    Marquee.prototype.bind = function() {
      var _this = this;

      _this.elements.wrap.mouseover(function() {
        _this.pause();
      });

      _this.elements.wrap.mouseout(function() {
        _this.move();
      });

      jQuery(window).resize(function() {
        _this.refillWrap();
      });
    }

    return Marquee;

  })();

  jQuery.fn.marquee = function(options) {
    return this.each(function() {
      marquee = new Marquee(jQuery(this), options);
      marquee.init();
    });
  }

  jQuery.fn.marquee.defaults = {
    interval: 3000
  }

})(jQuery);
