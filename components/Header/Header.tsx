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
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const updateNav = () => {
      const aboutEl = document.getElementById("about")
      // Show only while the hero is in view (before the About section starts)
      const threshold = aboutEl ? aboutEl.offsetTop - 80 : window.innerHeight * 0.8
      setVisible(window.scrollY < threshold)
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
