/* ==========================================================================
   全局交互：导航、滚动、渐入、数字动画、图片放大
   ========================================================================== */

import './styles/base.css'
import './styles/nav.css'
import './styles/hero.css'
import './styles/about.css'
import './styles/works.css'
import './styles/experience.css'
import './styles/project.css'

// 项目筛选
const filterBtns = document.querySelectorAll('.filter-btn')
const workCards = document.querySelectorAll('.work-card')

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('is-active'))
    btn.classList.add('is-active')
    const filter = btn.dataset.filter
    workCards.forEach((card) => {
      const tags = card.dataset.tags || ''
      if (filter === 'all' || tags.includes(filter)) {
        card.style.display = ''
      } else {
        card.style.display = 'none'
      }
    })
  })
})

// 导航栏滚动状态
const nav = document.querySelector('.site-nav')
const backTop = document.querySelector('.back-top')

function onScroll() {
  if (nav) {
    nav.classList.toggle('is-scrolled', window.scrollY > 40)
  }
  if (backTop) {
    backTop.classList.toggle('is-visible', window.scrollY > 600)
  }
}

window.addEventListener('scroll', onScroll, { passive: true })
onScroll()

if (backTop) {
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

// 移动端菜单
const navToggle = document.querySelector('.nav-toggle')
const mobileMenu = document.querySelector('.mobile-menu')

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const open = navToggle.classList.toggle('is-open')
    mobileMenu.classList.toggle('is-open', open)
  })
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('is-open')
      mobileMenu.classList.remove('is-open')
    })
  })
}

// 滚动渐入
const revealEls = document.querySelectorAll('.reveal')
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  )
  revealEls.forEach((el) => observer.observe(el))
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'))
}

// 数字滚动动画
function animateNumber(el) {
  const target = parseFloat(el.dataset.count)
  const decimals = parseInt(el.dataset.decimals || '0', 10)
  const suffix = el.dataset.suffix || ''
  const prefix = el.dataset.prefix || ''
  const duration = 1600
  const start = performance.now()

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    const value = (target * eased).toFixed(decimals)
    el.textContent = prefix + value + suffix
    if (progress < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

const countEls = document.querySelectorAll('[data-count]')
if ('IntersectionObserver' in window) {
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNumber(entry.target)
          countObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 }
  )
  countEls.forEach((el) => countObserver.observe(el))
} else {
  countEls.forEach(animateNumber)
}

// 图片点击放大
const zoomableImgs = document.querySelectorAll('[data-zoom]')
zoomableImgs.forEach((img) => {
  img.addEventListener('click', () => {
    openLightbox(img.src)
  })
})

function openLightbox(src) {
  let lb = document.getElementById('lightbox')
  if (!lb) {
    lb = document.createElement('div')
    lb.id = 'lightbox'
    lb.innerHTML = `
      <div class="lb-backdrop"></div>
      <img class="lb-img" src="" alt="放大预览">
      <button class="lb-close" aria-label="关闭">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>`
    document.body.appendChild(lb)
  }
  lb.querySelector('.lb-img').src = src
  lb.classList.add('is-open')

  const close = () => lb.classList.remove('is-open')
  lb.querySelector('.lb-close').addEventListener('click', close)
  lb.querySelector('.lb-backdrop').addEventListener('click', close)
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close()
  })
}
