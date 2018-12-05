var $ = require('cash-dom');


function getScrollTop() {
    return window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
}

function initTitle() {
    var title = $('.c-sticky-title');
    if (!title.length) {
        return;
    }

    var last_known_scroll_position = 0;
    var isFixed = false;
    var setTitle = function() {
        var inPosition = last_known_scroll_position > 80;
        if(!inPosition && isFixed) {
            isFixed=false;
            title.removeClass('c-sticky-title--fixed');
        } else if (inPosition && !isFixed) {
            isFixed=true;
            title.addClass('c-sticky-title--fixed');
        }
    }
    
    var ticking = false;
    window.addEventListener('scroll', function() {
        last_known_scroll_position = getScrollTop()
        if (!ticking) {
          window.requestAnimationFrame(function() {
            setTitle();
            ticking = false;
          });
          ticking = true;
        }
      });

    setTitle();
}

initTitle();
