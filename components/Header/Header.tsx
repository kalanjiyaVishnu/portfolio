import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { FaBars, FaTimes } from "react-icons/fa"
import styles from "./Header.module.css"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Things I've known", href: "#skills" },
  { label: "Things I've built", href: "#projects" },
  { label: "What I Do", href: "#what-do-i-do" },
  { label: "Reach Out", href: "#contact" },
]

export function Header() {
  const [visible, setVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.75)
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    document.addEventListener("click", handleClickOutside)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
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
        {navLinks.map(({ label, href }) => (
          <li key={href} className={styles.desktopNavItem}>
            <a
              href={href}
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              {label}
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
              {navLinks.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className={styles.dropdownItem}
                  onClick={() => setMenuOpen(false)}
                >
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
