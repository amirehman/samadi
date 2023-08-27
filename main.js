import './style.css'
import Lenis from '@studio-freight/lenis'
import { gsap } from "gsap";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
AOS.init({
    duration: 600
});

const scrollToButton = document.getElementById('scrollToButton');


const lenis = new Lenis({
  duration: 2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        lenis.scrollTo(this.getAttribute("href"));
    });
});




// Loop through each link
document.querySelectorAll("li a").forEach((link) => {
  // Get the corresponding section's ID from the href of the link
  let sectionID = link.getAttribute('href');

  // Create a ScrollTrigger for each link/section pair
  ScrollTrigger.create({
    trigger: sectionID, 
    start: "top center", 
    end: "bottom end",
    onEnter: () => {
      // Remove bg-white from all links
      document.querySelectorAll("li a").forEach(el => el.classList.remove('bg-white'));
      // Add bg-white to the current link
      link.classList.add('bg-white');
    },
    onLeaveBack: () => link.classList.remove('bg-white'), 
    onLeave: () => link.classList.remove('bg-white'),
    onEnterBack: () => {
        document.querySelectorAll("li a").forEach((e) => {
            e.classList.remove("bg-white");
        });
        link.classList.add("bg-white");
    }
  });
});
  

// Adjustments using ScrollTrigger's matchMedia
ScrollTrigger.matchMedia({

    // Mobile breakpoint
    "(max-width: 768px)": function() {
      gsap.to(".globe", {
        scale: 0.5, 
        y: "0px", 
        ease: "none", 
        scrollTrigger: {
            trigger: ".globe",      
            start: "top-=20% top",      
            end: "center+=35% top",         
            pin: true,
            pinSpacing: false,              
            scrub: true,
        }
      });

      gsap.to(".globe", {
        scale: 0.18, 
        x: '85',
        ease: "none",
        scrollTrigger: {
            trigger: ".globe",
            start: "center-=10% top+=20%",      
            end: "center+=137% top",
            immediateRender: false,
            pin: true,
            pinSpacing: false,
            scrub: true,
        }
      });

    },


    // Mobile breakpoint Landscape
    // (min-width: 915px) and (min-height: 412px)
    "(max-width: 915px) and (max-height: 450px)": function() {

      gsap.to(".globe", {
        scale: 0.5, 
        y: "0px", 
        ease: "none", 
        scrollTrigger: {
            trigger: ".globe",      
            start: "top-=90 top",      
            end: "center+=70 top",         
            pin: true,
            pinSpacing: false,              
            scrub: true
        }
      });

      gsap.to(".globe", {
        scale: 0.1, 
        x: '85',
        ease: "none",
        scrollTrigger: {
            trigger: ".globe",
            start: "center center", 
            end: "center+=37% top",
            immediateRender: false,
            pin: true,
            pinSpacing: false,
            scrub: true,
        }
      });

    },

    // Tablet breakpoint
    "(min-width: 769px) and (max-width: 1024px)": function() {

      gsap.to(".globe", {
        scale: 0.5, 
        y: "0px", 
        ease: "none", 
        scrollTrigger: {
            trigger: ".globe",      
            start: "top-=100 top",      
            end: "center+=70 top",         
            pin: true,
            pinSpacing: false,              
            scrub: true
        }
      });

      gsap.to(".globe", {
        scale: 0.12, 
        x: '85',
        ease: "none",
        scrollTrigger: {
            trigger: ".globe",
            start: "bottom center", 
            end: "center+=488 top",
            immediateRender: false,
            pin: true,
            pinSpacing: false,
            scrub: true,
        }
      });
    },

    // Laptop breakpoint
    "(min-width: 1025px) and (max-width: 1600px)": function() {
      
        gsap.to(".globe", {
            scale: 0.5, 
            y: "0px",
            ease: "none", 
            scrollTrigger: {
                trigger: ".globe",      
                start: "top-=100 top",      
                end: "center+=100 top",         
                pin: true,
                pinSpacing: false,              
                scrub: true
            }
        });

        gsap.to(".globe", {
          scale: 0.065, 
          x: '85',
          ease: "none",
          scrollTrigger: {
              trigger: ".globe",
              start: "center center", 
              end: "center+=59.5% top",
              immediateRender: false,
              pin: true,
              pinSpacing: false,
              scrub: true,
          }
        });

    },

    "(min-width: 1601px) and (max-width: 2600px)": function() {
      
      gsap.to(".globe", {
          scale: 0.5, 
          y: "0px", 
          ease: "none", 
          scrollTrigger: {
              trigger: ".globe",      
              start: "top-=100 top",      
              end: "center+=150 top",         
              pin: true,
              pinSpacing: false,              
              scrub: true
          }
      });

      gsap.to(".globe", {
        scale: 0.05, 
        x: '85',
        ease: "none",
        scrollTrigger: {
            trigger: ".globe",
            start: "center center", 
            end: "center+=610 top",
            immediateRender: false,
            pin: true,
            pinSpacing: false,
            scrub: true,
        }
      });

  },
    

});

  
  


// Animated Counter on scroll


document.addEventListener("DOMContentLoaded", function() {
    // You can change this class to specify which elements are going to behave as counters.
    var elements = document.querySelectorAll(".scroll-counter")
  
    elements.forEach(function(item) {
      // Add new attributes to the elements with the '.scroll-counter' HTML class
      item.counterAlreadyFired = false
      item.counterSpeed = item.getAttribute("data-counter-time") / 45
      item.counterTarget = +item.innerHTML
      item.counterCount = 0
      item.counterStep = item.counterTarget / item.counterSpeed
  
      item.updateCounter = function() {
        item.counterCount = item.counterCount + item.counterStep
        item.innerHTML = Math.ceil(item.counterCount).toLocaleString()
        item.classList.add('animate')
  
        if (item.counterCount < item.counterTarget) {
          setTimeout(item.updateCounter, item.counterSpeed)
        } else {
          item.innerHTML = item.counterTarget.toLocaleString()
        }
      }
    })
  
    // Function to determine if an element is visible in the web page
    var isElementVisible = function isElementVisible(el) {
      var scroll = window.scrollY || window.pageYOffset
      var boundsTop = el.getBoundingClientRect().top + 100 + scroll
      var viewport = {
        top: scroll,
        bottom: scroll + window.innerHeight,
      }
      var bounds = {
        top: boundsTop,
        bottom: boundsTop + el.clientHeight,
      }
      return (
        (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
        (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
      )
    }
  
    // Funciton that will get fired uppon scrolling
    var handleScroll = function handleScroll() {
      elements.forEach(function(item, id) {
        if (true === item.counterAlreadyFired) return
        if (!isElementVisible(item)) return
        item.updateCounter()
        item.counterAlreadyFired = true
      })
    }
  
    // Fire the function on scroll
    window.addEventListener("scroll", handleScroll)
  })




// Marquee effect
let black = '#0A0A0A';
let offWhite = '#EDEEE9';

// saveStyles is used because GSAP writes inline CSS for styling.
// If we resize our browser, we want the styling of each viewport-based animation to be saved.

ScrollTrigger.matchMedia({
  
  // the mobile animations are the same as the desktop, except the font colors are different
  // the scrub is delayed by 1s with relation to the scrollbar (scrub: 1)
  // the animation starts a bit earlier
  "(max-width: 768px)": function() {
    
    let mobileTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".marquee",
        start: "+20% bottom",
        scrub: 1,
      }
    });

    mobileTL.to(".first", {duration: 1, xPercent: -200, color: offWhite})
  },
  
  // The tablet and desktop animations have a delay of 7s on scrubs (scrub: 2).
  "(min-width: 769px)": function() {

    let desktopTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".marquee",
        start: "+40% bottom",
        scrub: true,
      }
    });

    desktopTL.to(".first", {duration: 2, xPercent: -150})
  }
});


gsap.to(".globe", {
  rotation: 360,
  ease: "none",
  repeat: -1, 
  duration: 200,
});


const clouds = document.querySelector("#clouds");
gsap.to(clouds, { 
    duration: 5, 
    xPercent: "-=40", 
    ease: "none", 
    repeat: -1,
    yoyo: true 
});

