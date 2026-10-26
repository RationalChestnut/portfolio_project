import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  BurgerButton,
  BurgerLine,
  LastName,
  MobileMenuLinks,
  MobileMenuOverlay,
  MobileNavLink,
  Name,
  NameLink,
  NavigationBarContainer,
  NavLink,
  NavLinks,
  NavLinkText,
} from "./NavigationBar.styles";

const LINKS = [
  { to: "/", label: "About", end: true },
  { to: "/bookshelf", label: "Bookshelf" },
  { to: "/writing", label: "Writing" },
  { to: "/projects", label: "Projects" },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <NavigationBarContainer>
        <Name>
          <NameLink to="/" onClick={close}>
            Brian K. <LastName>Mason</LastName>
          </NameLink>
        </Name>
        <NavLinks>
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}>
              <NavLinkText>{link.label}</NavLinkText>
            </NavLink>
          ))}
        </NavLinks>
        <BurgerButton
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <BurgerLine $open={menuOpen} $position="top" />
          <BurgerLine $open={menuOpen} $position="middle" />
          <BurgerLine $open={menuOpen} $position="bottom" />
        </BurgerButton>
      </NavigationBarContainer>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenuOverlay
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <MobileMenuLinks>
              {LINKS.map((link) => (
                <MobileNavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={close}
                >
                  {link.label}
                </MobileNavLink>
              ))}
            </MobileMenuLinks>
          </MobileMenuOverlay>
        )}
      </AnimatePresence>
    </>
  );
};
