// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".timeline-content, .project-card, .skill-category, .contact-item")
  animatedElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
})

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const subtitle = document.querySelector(".hero-subtitle")
  const originalText = subtitle.textContent
  typeWriter(subtitle, originalText, 80)
})

// Contact form handling
document.querySelector(".contact-form form").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const button = this.querySelector('button[type="submit"]')
  const originalText = button.textContent

  // Show loading state
  button.textContent = "Sending..."
  button.disabled = true

  // Simulate form submission (replace with actual form handling)
  setTimeout(() => {
    button.textContent = "Message Sent!"
    button.style.background = "#10b981"

    // Reset form
    this.reset()

    // Reset button after 3 seconds
    setTimeout(() => {
      button.textContent = originalText
      button.disabled = false
      button.style.background = ""
    }, 3000)
  }, 2000)
})

// Parallax effect for floating elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".floating-card")

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    const yPos = -(scrolled * speed)
    element.style.transform = `translateY(${yPos}px)`
  })
})

// Add active class to current navigation item
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Skill items hover effect
document.querySelectorAll(".skill-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px) scale(1.05)"
  })

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Project cards: navigate to their case-study page on click
document.querySelectorAll(".project-card[data-href]").forEach((card) => {
  card.setAttribute("tabindex", "0")
  card.setAttribute("role", "link")

  card.addEventListener("click", (e) => {
    if (e.target.closest(".project-links")) return
    window.location.href = card.dataset.href
  })

  card.addEventListener("keydown", (e) => {
    if (e.target.closest(".project-links")) return
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      window.location.href = card.dataset.href
    }
  })
})

// Project cards tilt effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)"
  })
})

// Language progress bars animation
const animateProgressBars = () => {
  const progressBars = document.querySelectorAll(".language-fill")
  progressBars.forEach((bar) => {
    const width = bar.style.width
    bar.style.width = "0%"
    setTimeout(() => {
      bar.style.width = width
    }, 500)
  })
}

// Trigger progress bar animation when skills section is visible
const skillsSection = document.querySelector(".skills")
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateProgressBars()
        skillsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

if (skillsSection) {
  skillsObserver.observe(skillsSection)
}

// Add loading animation to page
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Preloader (optional)
document.addEventListener("DOMContentLoaded", () => {
  // Hide preloader if exists
  const preloader = document.querySelector(".preloader")
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = "0"
      setTimeout(() => {
        preloader.style.display = "none"
      }, 500)
    }, 1000)
  }
})
