// Smooth scrolling and animations
document.addEventListener("DOMContentLoaded", () => {
  // Timeline animation on scroll
  const timelineItems = document.querySelectorAll(".timeline-item")

  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  }

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  timelineItems.forEach((item) => {
    timelineObserver.observe(item)
  })

  // Animated quote typing effect
  const quote = "What matters in life is not what happens to you but what you remember and how you remember it."
  const quoteElement = document.getElementById("animatedQuote")
  let i = 0

  function typeQuote() {
    if (i < quote.length) {
      quoteElement.textContent += quote.charAt(i)
      i++
      setTimeout(typeQuote, 50)
    }
  }

  // Start typing animation when quote section is visible
  const quoteObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && quoteElement.textContent === "") {
          typeQuote()
        }
      })
    },
    { threshold: 0.5 },
  )

  quoteObserver.observe(document.querySelector(".quote-section"))

  // Interactive map tooltips
  const mapPoints = document.querySelectorAll(".map-point")
  const tooltips = document.querySelectorAll(".map-tooltip")

  mapPoints.forEach((point, index) => {
    point.addEventListener("mouseenter", () => {
      tooltips[index].classList.add("visible")
      // Position tooltip near the point
      const rect = point.getBoundingClientRect()
      const mapRect = document.getElementById("worldMap").getBoundingClientRect()
      tooltips[index].style.left = rect.left - mapRect.left + 20 + "px"
      tooltips[index].style.top = rect.top - mapRect.top - 60 + "px"
    })

    point.addEventListener("mouseleave", () => {
      tooltips[index].classList.remove("visible")
    })
  })

  // Charts creation using Canvas
  createLanguagesChart()
  createSalesChart()
})

// Languages Chart (Pie Chart)
function createLanguagesChart() {
  const canvas = document.getElementById("languagesChart")
  const ctx = canvas.getContext("2d")
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const radius = 100

  const data = [
    { label: "Spanish", value: 25, color: "#00c7be" },
    { label: "English", value: 20, color: "#2ca7e0" },
    { label: "French", value: 15, color: "#ffb547" },
    { label: "German", value: 12, color: "#ffffff" },
    { label: "Others", value: 28, color: "#666666" },
  ]

  let currentAngle = -Math.PI / 2

  data.forEach((segment) => {
    const sliceAngle = (segment.value / 100) * 2 * Math.PI

    // Draw slice
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
    ctx.closePath()
    ctx.fillStyle = segment.color
    ctx.fill()

    // Draw border
    ctx.strokeStyle = "#24292d"
    ctx.lineWidth = 2
    ctx.stroke()

    currentAngle += sliceAngle
  })

  // Add center circle
  ctx.beginPath()
  ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI)
  ctx.fillStyle = "#24292d"
  ctx.fill()

  // Add text
  ctx.fillStyle = "#ffffff"
  ctx.font = "16px Poppins"
  ctx.textAlign = "center"
  ctx.fillText("40+", centerX, centerY - 5)
  ctx.font = "12px Montserrat"
  ctx.fillText("Languages", centerX, centerY + 10)
}

// Sales Chart (Bar Chart)
function createSalesChart() {
  const canvas = document.getElementById("salesChart")
  const ctx = canvas.getContext("2d")
  const padding = 40
  const chartWidth = canvas.width - padding * 2
  const chartHeight = canvas.height - padding * 2

  const data = [
    { label: "1970s", value: 5 },
    { label: "1980s", value: 15 },
    { label: "1990s", value: 20 },
    { label: "2000s", value: 25 },
    { label: "2010s", value: 30 },
  ]

  const maxValue = Math.max(...data.map((d) => d.value))
  const barWidth = chartWidth / data.length - 10

  data.forEach((item, index) => {
    const barHeight = (item.value / maxValue) * chartHeight
    const x = padding + index * (barWidth + 10)
    const y = canvas.height - padding - barHeight

    // Draw bar
    const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight)
    gradient.addColorStop(0, "#00c7be")
    gradient.addColorStop(1, "#2ca7e0")

    ctx.fillStyle = gradient
    ctx.fillRect(x, y, barWidth, barHeight)

    // Draw label
    ctx.fillStyle = "#ffffff"
    ctx.font = "12px Montserrat"
    ctx.textAlign = "center"
    ctx.fillText(item.label, x + barWidth / 2, canvas.height - 10)

    // Draw value
    ctx.fillStyle = "#ffb547"
    ctx.font = "14px Poppins"
    ctx.fillText(item.value + "M", x + barWidth / 2, y - 10)
  })

  // Draw axes
  ctx.strokeStyle = "#666666"
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(padding, padding)
  ctx.lineTo(padding, canvas.height - padding)
  ctx.lineTo(canvas.width - padding, canvas.height - padding)
  ctx.stroke()
}

// Smooth scroll for better UX
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

// Add scroll progress indicator
const progressBar = document.createElement("div")
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #00c7be, #2ca7e0);
    z-index: 1000;
    transition: width 0.1s ease;
`
document.body.appendChild(progressBar)

window.addEventListener("scroll", () => {
  const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
  progressBar.style.width = scrolled + "%"
})
