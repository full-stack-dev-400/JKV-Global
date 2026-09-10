"use client";

import Image from "next/image";
import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import styles from "./Footer.module.css";

/* =========================================================
   JKV GLOBAL FOOTER MENUS
========================================================= */

const footerMenus = [
  {
    label: "Company",
    items: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "About Us",
        href: "/about",
      },
      {
        label: "Contact Us",
        href: "/contact",
      },
      {
        label: "Partnership",
        href: "/partnership",
      },
    ],
  },

  {
    label: "Trading",
    items: [
      {
        label: "Instruments",
        href: "/instruments",
      },
      {
        label: "Account Types",
        href: "/account-types",
      },
      {
        label: "MetaTrader 5",
        href: "/platform/mt5",
      },
      {
        label: "Social Trading",
        href: "/social-trading",
      },
    ],
  },

  {
    label: "Resources",
    items: [
      {
        label: "Education",
        href: "/education",
      },
      {
        label: "Blogs",
        href: "/blog",
      },
      {
        label: "Market News",
        href: "/market-news",
      },
      {
        label: "Try Demo",
        href: "/register",
      },
    ],
  },

  {
    label: "Legal",
    items: [
      {
        label: "Legal",
        href: "/legal",
      },
      {
        label: "Privacy Policy",
        href: "/privacy-policy",
      },
      {
        label: "Terms & Conditions",
        href: "/terms-and-conditions",
      },
    ],
  },
];

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* =====================================================
          TOP CTA
      ===================================================== */}

      <div className={`container ${styles.ctaSection}`}>
        <div className={styles.ctaContent}>
          <div className={styles.ctaCopy}>
            <span className={styles.ctaEyebrow}>JKV Global</span>

            <h2 className={styles.ctaTitle}>Ready To Start Trading?</h2>

            <p className={styles.ctaText}>
              Open a JKV Global account or explore the platform through a demo
              environment before you begin.
            </p>
          </div>

          <div className={styles.ctaActions}>
            <Link href="/register" className={styles.primaryBtn}>
              Open Account
              <span aria-hidden="true">→</span>
            </Link>

            <Link href="/register" className={styles.secondaryBtn}>
              Try Demo
            </Link>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className={`container ${styles.mainGrid}`}>
        {/* ===================================================
            BRAND COLUMN
        =================================================== */}

        <div className={styles.brandCol}>
          <Link
            href="/"
            className={styles.logoLink}
            aria-label="JKV Global home"
          >
            <Image
              src="/images/jkvlatestlogo.png"
              alt="JKV Global"
              width={170}
              height={120}
              className={styles.logo}
            />
          </Link>

          <p className={styles.brandText}>
            JKV Global provides access to global financial markets through
            MetaTrader 5 with account, platform and client support services.
          </p>

          {/* Regulation */}

          <div className={styles.regulation}>
            <span className={styles.regDot} aria-hidden="true" />

            <div>
              <span className={styles.regSmall}>Regulated by</span>

              <strong>FSC Mauritius</strong>

              <span className={styles.regLicence}>Licence GB23201820</span>
            </div>
          </div>

          {/* ===================================================
              SOCIAL ICONS
          =================================================== */}

          <div className={styles.socialRow}>
            <Link href="#" aria-label="Facebook" className={styles.socialIcon}>
              <FaFacebookF />
            </Link>

            <Link href="#" aria-label="Instagram" className={styles.socialIcon}>
              <FaInstagram />
            </Link>

            <Link href="#" aria-label="X" className={styles.socialIcon}>
              <FaXTwitter />
            </Link>

            <Link href="#" aria-label="LinkedIn" className={styles.socialIcon}>
              <FaLinkedinIn />
            </Link>

            <Link href="#" aria-label="YouTube" className={styles.socialIcon}>
              <FaYoutube />
            </Link>
          </div>
        </div>

        {/* ===================================================
            MENUS
        =================================================== */}

        <div className={styles.menuArea}>
          {footerMenus.map((group) => (
            <div key={group.label} className={styles.menuGroup}>
              <h3 className={styles.menuHeading}>{group.label}</h3>

              <ul className={styles.menuList}>
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={styles.menuLink}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          CONTACT DETAILS
      ===================================================== */}

      <div className={`container ${styles.contactGrid}`}>
        <div className={styles.contactItem}>
          <span className={styles.contactLabel}>Email</span>

          <a
            href="mailto:enquiry@jkvglobal.com"
            className={styles.contactValue}
          >
            enquiry@jkvglobal.com
          </a>
        </div>

        <div className={styles.contactItem}>
          <span className={styles.contactLabel}>Phone</span>

          <a href="tel:+97145706453" className={styles.contactValue}>
            +971 4 570 6453
          </a>
        </div>

        <div className={styles.contactItem}>
          <span className={styles.contactLabel}>Dubai Office</span>

          <span className={styles.contactValue}>
            4004 U Bora Tower, Marasi Drive, Business Bay, Dubai
          </span>
        </div>

        <div className={styles.contactItem}>
          <span className={styles.contactLabel}>Mauritius Office</span>

          <span className={styles.contactValue}>
            The Gardens, Ground Floor, Bagatelle Office Park, Bagatelle, Moka
            80832, Mauritius
          </span>
        </div>
      </div>

      {/* =====================================================
          LEGAL AREA
      ===================================================== */}

      <div className={styles.legalArea}>
        <div className={`container ${styles.legalInner}`}>
          <p className={styles.riskTitle}>Risk Warning</p>

          <p className={styles.riskText}>
            Trading leveraged products such as Forex and CFDs involves a high
            level of risk and may not be suitable for all investors. Market
            movements can result in substantial losses. Make sure you understand
            the risks involved before trading.
          </p>

          <p className={styles.adviceText}>
            Information provided by JKV Global is for general information
            purposes and should not be considered personal investment, legal or
            tax advice. Where appropriate, seek independent professional advice.
          </p>

          <div className={styles.bottomRow}>
            <p className={styles.copy}>
              © {new Date().getFullYear()} JKV Global. All rights reserved.
            </p>

            <div className={styles.legalLinks}>
              <Link href="/privacy-policy">Privacy Policy</Link>

              <Link href="/terms-and-conditions">Terms & Conditions</Link>

              <Link href="/legal">Legal</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
