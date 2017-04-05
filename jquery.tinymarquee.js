(function(jQuery) {
  var Marquee = (function() {
    function Marquee(element, options) {
      this.elements = {
        wrap: element,
        ul: element.children("ul").eq(0),
        li: element.children("ul").eq(0).children("li")
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
      
      this.elements.wrap.children("ul").not(":first").remove();

      for (var i = 0; i < ulCopyCount; i++) {
        this.elements.ul.after(this.elements.ul.clone(true));
      }
    }

    Marquee.prototype.move = function() {
      var _this = this,
        interval = _this.settings.interval,
        firstUl = _this.elements.wrap.children("ul").eq(0),
        firstUlW = firstUl.outerWidth();
        lastUl = _this.elements.wrap.children("ul").eq(-1),
        firstUlRealMarginL = parseInt(firstUl.css("marginLeft")),
        firstUlRealMarginR = parseInt(firstUl.css("marginRight")),
        firstUlAndMarginRealW = firstUlW + firstUlRealMarginL + firstUlRealMarginR;

      if (firstUlAndMarginRealW < _this.ulW) {
        interval = firstUlAndMarginRealW / _this.ulW * interval;
      }

      firstUl.animate({marginLeft: -(firstUlW + firstUlRealMarginR) + "px"}, interval, "linear", function() {
        firstUl.remove();
        lastUl.after(lastUl.clone(true));
        _this.move();
      });
    }

    Marquee.prototype.pause = function() {
      var firstUl = this.elements.wrap.children("ul").eq(0).stop();
    };

    Marquee.prototype.bind  =function() {
      var _this = this;
      _this.elements.wrap.mouseover(function() {
        _this.pause();
      });

      _this.elements.wrap.mouseout(function() {
        _this.move();
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