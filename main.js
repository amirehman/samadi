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
            y: "50px", 
            scale: 0.5,
            ease: "none",
            scrollTrigger: {
                trigger: ".globe",      
                start: "-30% top",      
                endTrigger: "#globeEnd", 
                end: "-500%", 
                pin: true,
                pinSpacing: false,              
                scrub: true       
            }
        });
    },

    // Tablet breakpoint
    "(min-width: 769px) and (max-width: 1024px)": function() {
        gsap.to(".globe", {
            y: "-200px", 
            scale: 0.4,
            ease: "none",
            scrollTrigger: {
                trigger: ".globe",      
                start: "-30% top",      
                endTrigger: "#globeEnd", 
                end: "-300%", 
                pin: true,
                pinSpacing: false,              
                scrub: true       
            }
        });
    },

    // Laptop breakpoint
    "(min-width: 1025px) and (max-width: 1600px)": function() {
        gsap.to(".globe", {
            scale: 0.5, 
            y: "-300px", 
            ease: "none", 
            scrollTrigger: {
                trigger: ".globe",      
                start: "-30% top",      
                endTrigger: "#globeEnd", 
                end: "-160% top",         
                pin: true,
                pinSpacing: false,              
                scrub: true       
            }
        });
    },

    "(min-width: 1601px) and (max-width: 2200px)": function() {
        gsap.to(".globe", {
            scale: 0.5, 
            y: "-100px", 
            ease:'Power3.easeInOut',
            scrollTrigger: {
                trigger: ".globe",      
                start: "-30% top",      
                endTrigger: "#globeEnd", 
                end: "-160% top",         
                pin: true,
                pinSpacing: false,              
                scrub: true       
            }
        });
    }

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





const clouds = document.querySelector("#clouds");
gsap.to(clouds, { 
    duration: 5, 
    xPercent: "-=40", 
    ease: "none", 
    repeat: -1,
    yoyo: true 
});

