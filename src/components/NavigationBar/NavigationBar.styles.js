import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, NavLink as RouterNavLink } from "react-router-dom";

export const NavigationBarContainer = styled(motion.div)`
  position: relative;
  z-index: 1100;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 40px;
  background: #f7fafa;
  border-bottom: 1px solid #e6e6e6;

  @media (max-width: 768px) {
    padding: 14px 24px;
  }
`;

export const NameLink = styled(Link)`
  text-decoration: none;
  color: #222;
  font-weight: 500;
`;

export const Name = styled.h1`
  font-weight: 500;
  font-size: 19px;
  margin: 0;
`;

export const LastName = styled.span`
  color: #8c8e8e;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled(RouterNavLink)`
  padding-left: 20px;
  transition: color 0.2s ease-in;
  color: #8c8e8e;
  text-decoration: none;

  &.active {
    color: #222;
  }

  &:hover {
    color: #222;
    cursor: pointer;
  }
`;

export const NavLinkText = styled.span`
  padding: 0;
  margin: 0;
  font-size: 16.5px;
`;

export const BurgerButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 26px;
  height: 26px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const BurgerLine = styled.span`
  display: block;
  width: 24px;
  height: 2px;
  border-radius: 2px;
  background: #222;
  transition: transform 0.3s ease, opacity 0.2s ease;
  transform-origin: center;

  transform: ${({ $open, $position }) => {
    if (!$open) return "none";
    if ($position === "top") return "translateY(7px) rotate(45deg)";
    if ($position === "bottom") return "translateY(-7px) rotate(-45deg)";
    return "none";
  }};
  opacity: ${({ $open, $position }) =>
    $open && $position === "middle" ? 0 : 1};
`;

export const MobileMenuOverlay = styled(motion.div)`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: #f7fafa;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 0 24px 56px;
  }
`;

export const MobileMenuLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
`;

export const MobileNavLink = styled(RouterNavLink)`
  text-decoration: none;
  color: #222;
  font-size: 40px;
  font-weight: 500;
  line-height: 1.1;

  &.active {
    color: #222;
  }
`;
