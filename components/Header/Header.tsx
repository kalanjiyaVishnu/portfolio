import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  FaBars,
  FaTimes,
  FaUser,
  FaCode,
  FaHammer,
  FaBolt,
  FaPaperPlane,
} from "react-icons/fa"
import styles from "./Header.module.css"

const navLinks = [
  { label: "About", href: "#about", icon: <FaUser /> },
  { label: "Things I've known", href: "#skills", icon: <FaCode /> },
  { label: "Things I've built", href: "#projects", icon: <FaHammer /> },
  { label: "What I Do", href: "#what-do-i-do", icon: <FaBolt /> },
  { label: "Reach Out", href: "#contact", icon: <FaPaperPlane /> },
]

export function Header() {
  const [visible, setVisible] = useState(true)
  const [currentSection, setCurrentSection] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const updateNav = () => {
      const scrollY = window.scrollY
      const aboutEl = document.getElementById("about")
      const skillsEl = document.getElementById("skills")

      if (!aboutEl || !skillsEl) {
        setVisible(true)
        return
      }

      const aboutTop = aboutEl.offsetTop
      const skillsTop = skillsEl.offsetTop

      // Hidden only during the About/Me dark section
      const inAbout = scrollY >= aboutTop - 80 && scrollY < skillsTop - 80
      setVisible(!inAbout)

      // Current section title — only when past the about section
      if (inAbout || scrollY < aboutTop - 80) {
        setCurrentSection("")
        return
      }

      // Bottom-up: find the last section heading crossed
      const sections = [
        { id: "contact", label: "Reach Out" },
        { id: "what-do-i-do", label: "What I Do" },
        { id: "projects", label: "Things I've built" },
        { id: "skills", label: "Things I've known" },
      ]

      for (const { id, label } of sections) {
        const el = document.getElementById(id)
        if (el && scrollY >= el.offsetTop - 80) {
          setCurrentSection(label)
          return
        }
      }

      setCurrentSection("")
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }

    window.addEventListener("scroll", updateNav, { passive: true })
    document.addEventListener("click", handleClickOutside)
    updateNav()

    return () => {
      window.removeEventListener("scroll", updateNav)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  return (
    <nav
      ref={navRef}
      className={`${styles.navbar} ${visible ? styles.navbarVisible : styles.navbarHidden}`}
      aria-hidden={!visible}
    >
      <Link href="/" className={styles.brand}>
        <span className={styles.brandMain}>Vishnu J</span>
        <span className={styles.brandAlias}>r1558</span>
      </Link>

      {/* Section title — centered, fades in as each heading is crossed */}
      <div
        key={currentSection}
        className={`${styles.sectionTitle} ${currentSection ? styles.sectionTitleVisible : ""}`}
      >
        {currentSection}
      </div>

      <ul className={styles.navbarNav}>
        {navLinks.map(({ label, href, icon }) => (
          <li key={href} className={styles.desktopNavItem}>
            <a
              href={href}
              className={styles.navIconLink}
              onClick={() => setMenuOpen(false)}
              title={label}
              aria-label={label}
            >
              {icon}
            </a>
          </li>
        ))}

        <li className={styles.mobileMenu}>
          <button
            className={styles.hamburger}
            onClick={(e) => {
              e.stopPropagation()
              setMenuOpen((prev) => !prev)
            }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
          {menuOpen && (
            <div className={styles.dropdown}>
              {navLinks.map(({ label, href, icon }) => (
                <a
                  key={href}
                  href={href}
                  className={styles.dropdownItem}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className={styles.dropdownIcon}>{icon}</span>
                  {label}
                </a>
              ))}
            </div>
          )}
        </li>
      </ul>
    </nav>
  )
}
