// this opens and closes the mobile nav menu while preventing body scrolling
function openMenu() {
    document.getElementById("overlay").style.height = "100%";
    document.getElementById("close-btn").style.display = "flex";
    document.getElementById("html").style.overflow = "hidden";
}

function closeMenu() {
    document.getElementById("overlay").style.height = "0";
    document.getElementById("close-btn").style.display = "none";
    document.getElementById("html").style.overflow = "visible"; 
}

// this opens and closes the project nav menu while preventing body scrolling
function openProject() {
    document.getElementById("project").style.height = "100%";
    document.getElementById("close-pro-btn").style.display = "flex";
    document.getElementById("html").style.overflow = "hidden";
}

function closeProject() {
    document.getElementById("project").style.height = "0";
    document.getElementById("close-pro-btn").style.display = "none";
    document.getElementById("html").style.overflow = "visible"; 
}

// this hides and shows the nav
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
      let context = this, args = arguments;
      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  let scrollPos = 0;
  let scrollTimer = -1;
  const nav = document.querySelector('header.mobile-nav');
  const desknav = document.querySelector('header.desktop-nav');
  
  function bodyScroll() {
    if (scrollTimer != -1)
        clearTimeout(scrollTimer);

    scrollTimer = window.setTimeout("scrollFinished()", 1000);
    }

    function scrollFinished() {
        nav.classList.add('is-visible');
        nav.classList.remove('is-hidden');
        desknav.classList.add('is-visible');
        desknav.classList.remove('is-hidden');
    }

  function checkPosition() {
    let windowY = window.scrollY;
    if (windowY < scrollPos) {
      // Scrolling UP
      nav.classList.add('is-visible');
      nav.classList.remove('is-hidden');
      desknav.classList.add('is-visible');
      desknav.classList.remove('is-hidden');
    } else {
      // Scrolling DOWN
      nav.classList.add('is-hidden');
      nav.classList.remove('is-visible');
      desknav.classList.add('is-hidden');
      desknav.classList.remove('is-visible');
    }
    scrollPos = windowY;
}

window.addEventListener('scroll', debounce(checkPosition));

// this changes the cursor for desktop

var dot1 = document.createElement("div"); 
dot1.className="cursor-dot-outline";
var dot2 = document.createElement("div"); 
dot2.className="cursor-dot";
document.getElementsByTagName('body')[0].appendChild(dot1);
document.getElementsByTagName('body')[0].appendChild(dot2);

var cursor = {
    delay: 8,
    _x: 0,
    _y: 0,
    endX: (window.innerWidth / 2),
    endY: (window.innerHeight / 2),
    cursorVisible: true,
    cursorEnlarged: false,
    $dot: document.querySelector('.cursor-dot'),
    $outline: document.querySelector('.cursor-dot-outline'),
    
    init: function() {
        // Set up element sizes
        this.dotSize = this.$dot.offsetWidth;
        this.outlineSize = this.$outline.offsetWidth;
        
        this.setupEventListeners();
        this.animateDotOutline();
    },
    
    setupEventListeners: function() {
        var self = this;
        
        // Anchor hovering
        document.querySelectorAll('a').forEach(function(el) {
            el.addEventListener('mouseover', function() {
                self.cursorEnlarged = true;
                self.toggleCursorSize();
            });
            el.addEventListener('mouseout', function() {
                self.cursorEnlarged = false;
                self.toggleCursorSize();
            });
        });
        
        // Click events
        document.addEventListener('mousedown', function() {
            self.cursorEnlarged = true;
            self.toggleCursorSize();
        });
        document.addEventListener('mouseup', function() {
            self.cursorEnlarged = false;
            self.toggleCursorSize();
        });
  
  
        document.addEventListener('mousemove', function(e) {
            // Show the cursor
            self.cursorVisible = true;
            self.toggleCursorVisibility();

            // Position the dot
            self.endX = e.pageX;
            self.endY = e.pageY;
            self.$dot.style.top = self.endY + 'px';
            self.$dot.style.left = self.endX + 'px';
        });
        
        // Hide/show cursor
        document.addEventListener('mouseenter', function(e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;
        });
        
        document.addEventListener('mouseleave', function(e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
        });
    },
    
    animateDotOutline: function() {
        var self = this;
        
        self._x += (self.endX - self._x) / self.delay;
        self._y += (self.endY - self._y) / self.delay;
        self.$outline.style.top = self._y + 'px';
        self.$outline.style.left = self._x + 'px';
        
        requestAnimationFrame(this.animateDotOutline.bind(self));
    },
    
    toggleCursorSize: function() {
        var self = this;
        
        if (self.cursorEnlarged) {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(2.5)';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(2.5)';
        } else {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    },
    
    toggleCursorVisibility: function() {
        var self = this;
        
        if (self.cursorVisible) {
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;
        } else {
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
        }
    }
}

cursor.init();