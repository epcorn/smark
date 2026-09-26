import React, { useMemo, useState } from "react";
import {
  AppBar, Toolbar, Box, Button, Menu, MenuItem, IconButton, Drawer,
  List, ListItemText, ListItemButton, Accordion, AccordionSummary,
  AccordionDetails, Container, Divider, Stack, Link as MuiLink,
} from "@mui/material";
import {
  FaFacebookF, FaInstagram, FaLinkedinIn, FaBars, FaTimes,
  FaChevronDown, FaChevronRight, FaEnvelope, FaPhoneAlt,
} from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navItems } from "../data/navbar_Data";
import { home_page } from "../data/home_page_Data";
import Search from "./home/Search";

const C = { primary: "#3DCED4", green: "#81D959", text: "#1A202C", border: "#E2E8F0", white: "#fff" };

const LOGOS = {
  service: "/Smark_logos/Smark_Service_Logo.png",
  product: "/Smark_logos/Smark_Product_logo.png",
  academy: "/Smark_logos/Smark_Academy_logo.png",
  research: "/Smark_logos/Smark_Research_logo.png",
  default: "/Smark_logos/Smark_logo.png",
};

const SOCIALS = [
  [FaFacebookF, "#1877F2"],
  [FaInstagram, "#E4405F"],
  [FaLinkedinIn, "#0A66C2"],
];

const menuPaperSx = { borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,.1)", overflow: "hidden" };

/* ---------- Top contact bar ---------- */

const TopContactBar = () => (
  <Box sx={{ bgcolor: C.green, color: "#0F172A", py: 0.75, px: { xs: 2, sm: 4 }, fontSize: "0.825rem", height: 34 }}>
    <Container maxWidth="xl">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={{ xs: 2, sm: 3.5 }}>
          <MuiLink href={`mailto:${home_page.email}`} underline="none" sx={contactLinkSx}>
            <FaEnvelope /> {home_page.email}
          </MuiLink>
          <MuiLink href={`tel:+${home_page?.contact}`} underline="none" sx={contactLinkSx}>
            <FaPhoneAlt /> {home_page?.contact}
          </MuiLink>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ display: { xs: "none", md: "flex" } }}>
          {SOCIALS.map(([Icon, color]) => (
            <IconButton key={color} component="a" href="#" size="small" sx={socialBtnSx(color)}>
              <Icon />
            </IconButton>
          ))}
        </Stack>
      </Stack>
    </Container>
  </Box>
);

const contactLinkSx = {
  color: "inherit", fontWeight: 600, display: "flex", alignItems: "center", gap: 1,
  "&:hover": { opacity: 0.8 },
};

const socialBtnSx = (color) => ({
  bgcolor: "rgba(255,255,255,.85)", color, width: 26, height: 26, fontSize: ".75rem",
  "&:hover": { bgcolor: color, color: "#fff", transform: "translateY(-2px)" },
});

/* ---------- Shared menu item (desktop + nested) ---------- */

const MenuLink = ({ item, onClose }) => (
  <MenuItem
    component={Link}
    to={item.href}
    onClick={onClose}
    sx={{
      fontSize: ".875rem", py: 1.2, px: 2, color: C.text,
      "&:hover": { bgcolor: `${C.primary}15`, pl: 2.5 },
    }}
  >
    {item.label}
  </MenuItem>
);

const NestedMenu = ({ item, onCloseParent }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const timeoutRef = React.useRef(null);

  if (!item.children) return <MenuLink item={item} onClose={onCloseParent} />;

  const handleMouseEnter = (e) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setAnchorEl(e.currentTarget);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setAnchorEl(null);
    }, 150);
  };

  const handleMenuEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <MenuItem
        sx={{
          minWidth: 200,
          justifyContent: "space-between",
          gap: 2,
          fontSize: ".875rem",
          color: C.text,
          "&:hover": { bgcolor: `${C.primary}15`, color: C.primary },
        }}
      >
        {item.label}
        <FaChevronRight style={{ fontSize: ".65rem", color: C.green }} />
      </MenuItem>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          onMouseEnter: handleMenuEnter,
          onMouseLeave: handleMouseLeave,
          sx: {
            ...menuPaperSx,
            borderLeft: `3px solid ${C.green}`,
          },
        }}
      >
        {item.children.map((child) => (
          <MenuLink
            key={child.href}
            item={child}
            onClose={() => {
              setAnchorEl(null);
              onCloseParent();
            }}
          />
        ))}
      </Menu>
    </Box>
  );
};

/* ---------- Desktop top-level dropdown ---------- */

const DesktopDropdown = ({ item }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { pathname } = useLocation();
  const open = Boolean(anchorEl);

  const isActive = item.children
    ? item.children.some((c) => pathname === c.href)
    : false;

  const btnSx = (active) => ({
    textTransform: "none", fontWeight: 600, fontSize: { sm: ".75rem", md: ".95rem" },
    color: C.text, px: { sm: 1, md: 2 }, py: 1, borderRadius: "8px",
    bgcolor: active ? "rgba(0,157,163,.4)" : "transparent",
    "&:hover": { bgcolor: "rgba(0,157,163,.2)" },
  });

  if (!item.children) {
    return (
      <NavLink to={item.href} style={{ textDecoration: "none" }}>
        {({ isActive }) => (
          <Button component="span" sx={btnSx(isActive)}>{item.label}</Button>
        )}
      </NavLink>
    );
  }

  return (
    <>
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<FaChevronDown style={{ fontSize: ".7rem", transform: open ? "rotate(180deg)" : "none" }} />}
        sx={btnSx(isActive)}
      >
        {item.label}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{ sx: { ...menuPaperSx, mt: 1, minWidth: 200, borderTop: `3px solid ${C.primary}` } }}
      >
        {item.children.map((child) => (
          <NestedMenu key={child.href || child.label} item={child} onCloseParent={() => setAnchorEl(null)} />
        ))}
      </Menu>
    </>
  );
};

/* ---------- Mobile drawer item ---------- */

const MobileNavItem = ({ item, onClose }) => {
  if (!item.children) {
    return (
      <ListItemButton
        component={Link}
        to={item.href}
        onClick={onClose}
        sx={{ py: 1.2, px: 2.5, mx: 1, borderRadius: "8px", "&:hover": { bgcolor: `${C.green}15` } }}
      >
        <ListItemText
          primary={item.label}
          primaryTypographyProps={{ fontSize: ".9rem", color: C.text, fontWeight: 500 }}
        />
      </ListItemButton>
    );
  }

  return (
    <Accordion disableGutters elevation={0} sx={{ bgcolor: "transparent", "&:before": { display: "none" } }}>
      <AccordionSummary
        expandIcon={<FaChevronDown style={{ fontSize: ".75rem", color: C.primary }} />}
        sx={{ px: 2.5 }}
      >
        <Box component="span" sx={{ fontWeight: 600, fontSize: ".95rem", color: C.text }}>
          {item.label}
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ p: 0, pl: 2, ml: 2.5, borderLeft: `3px solid ${C.green}` }}>
        <List disablePadding>
          {item.children.map((child) => (
            <MobileNavItem key={child.href || child.label} item={child} onClose={onClose} />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

/* ---------- Main header ---------- */

export default function NavigationHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const activeLogo = useMemo(() => {
    const path = pathname.toLowerCase();
    const key = Object.keys(LOGOS).find((name) => name !== "default" && path.includes(`/${name}`));
    return LOGOS[key || "default"];
  }, [pathname]);

  return (
    <Box component="header" sx={{ position: "sticky", top: 0, zIndex: 1100 }}>
      <TopContactBar />

      <AppBar
        position="sticky"
        elevation={0}
        sx={{ top: 3, bgcolor: C.white, color: C.text, borderBottom: `1px solid ${C.border}`, boxShadow: "0 4px 20px rgba(0,0,0,.03)" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, justifyContent: "space-between" }}>
            <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center" }}>
              <Box component="img" src={activeLogo} alt="S Mark Logo" sx={{ height: { xs: 42, sm: 50 }, width: "auto" }} />
            </Box>

            <Box sx={{ml:"auto", display:"none"}}>
              <Search />
            </Box>
            {/* Desktop nav */}
            <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1, alignItems: "center" }}>
              {navItems.map((item) => (
                <DesktopDropdown key={item.href || item.label} item={item} />
              ))}
            </Box>

            {/* Mobile trigger */}
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{ display: { sm: "none" }, color: C.primary, bgcolor: `${C.primary}10` }}
            >
              <FaBars />
            </IconButton>

            <Drawer
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
              PaperProps={{ sx: { width: { xs: "85%", sm: 380 } } }}
            >
              <Box sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: `${C.primary}12` }}>
                <Box component="img" src={LOGOS.default} alt="S Mark Logo" sx={{ height: 36 }} />
                <IconButton onClick={() => setMobileOpen(false)}>
                  <FaTimes />
                </IconButton>
              </Box>

              <Divider sx={{ borderColor: C.green }} />

              <List sx={{ py: 2 }}>
                {navItems.map((item) => (
                  <MobileNavItem key={item.href || item.label} item={item} onClose={() => setMobileOpen(false)} />
                ))}
              </List>
            </Drawer>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}