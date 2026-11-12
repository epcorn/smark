import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ClickAwayListener,
  Container,
  Divider,
  Paper,
  Stack,
  useMediaQuery,
} from "@mui/material";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../data/navbar_Data";
import { home_page } from "../data/home_page_Data";

const COLORS = {
  primary: "#3DCED4",
  green: "#81D959",
  text: "#1A202C",
  border: "#E2E8F0",
  white: "#FFFFFF",
};

const LOGOS = {
  "/services": "/Smark_logos/Smark_Service_Logo.png",
  "/products": "/Smark_logos/Smark_Product_logo.png",
  "/learning": "/Smark_logos/Smark_Academy_logo.png",
  "/research": "/Smark_logos/Smark_Research_logo.png",
};
const DEFAULT_LOGO = "/Smark_logos/Smark_logo.png";

const getLogo = (pathname) =>
  Object.entries(LOGOS).find(([path]) => pathname.startsWith(path))?.[1] ??
  DEFAULT_LOGO;

// True if this item (or any nested child) matches the current route
const isActive = (pathname, item) =>
  item.href
    ? pathname === item.href ||
      (item.href !== "/" && pathname.startsWith(`${item.href}/`))
    : item.children?.some((child) => isActive(pathname, child)) ?? false;

/* ---------- Top contact bar ---------- */

function TopContactBar() {
  const links = [
    { icon: <FaEnvelope />, text: home_page?.email, href: `mailto:${home_page?.email}` },
    { icon: <FaPhoneAlt />, text: home_page?.contact, href: `tel:${home_page?.contact}` },
  ].filter((link) => link.text);

  return (
    <Box sx={{ bgcolor: COLORS.green, color: COLORS.text, py: 0.75, fontSize: "0.8rem" }}>
      <Container maxWidth="xl">
        <Stack direction="row" spacing={{ xs: 1.5, sm: 3 }}>
          {links.map(({ icon, text, href }) => (
            <Box
              key={href}
              component="a"
              href={href}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "inherit",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              {icon}
              {text}
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

/* ---------- Desktop: one recursive component for every level ---------- */

function DesktopItem({ item, nested = false, flip = false }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  // Mouse/trackpad = open on hover. Touch screens = open on tap.
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const hasChildren = Boolean(item.children?.length);
  const active = isActive(pathname, item);

  useEffect(() => setOpen(false), [pathname]);

  const Arrow = nested ? FaChevronRight : FaChevronDown;

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box
        sx={{ position: "relative" }}
        onMouseEnter={() => canHover && setOpen(true)}
        onMouseLeave={() => canHover && setOpen(false)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
      >
        <Button
          {...(hasChildren
            ? { onClick: () => setOpen((o) => canHover || !o) }
            : { component: Link, to: item.href })}
          fullWidth={nested}
          endIcon={hasChildren && <Arrow size={11} />}
          sx={{
            color: COLORS.text,
            textTransform: "none",
            fontWeight: 600,
            borderRadius: nested ? 0 : 2,
            justifyContent: nested ? "space-between" : "center",
            fontSize: nested ? "0.875rem" : { sm: "0.8rem", md: "1.05rem" },
            px: nested ? 2 : { sm: 1, md: 1.5 },
            py: nested ? 1.2 : undefined,
            whiteSpace: "nowrap",
            bgcolor: active
              ? `${COLORS.primary}80`
              : open
                ? `${COLORS.primary}25`
                : "transparent",
            "&:hover": { bgcolor: `${COLORS.primary}25` },
          }}
        >
          {item.label}
        </Button>

        {hasChildren && open && (
          <Paper
            elevation={0}
            sx={{
              position: "absolute",
              zIndex: 10,
              minWidth: 220,
              py: 0.5,
              borderRadius: 2,
              border: `1px solid ${COLORS.border}`,
              borderTop: nested ? undefined : `3px solid ${COLORS.primary}`,
              boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
              top: nested ? -5 : "100%",
              // `flip` opens menus toward the left so the last item never overflows the screen
              [flip ? "right" : "left"]: nested ? "100%" : 0,
            }}
          >
            {item.children.map((child) => (
              <DesktopItem
                key={child.href || child.label}
                item={child}
                nested
                flip={flip}
              />
            ))}
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
}

/* ---------- Mobile: recursive accordion ---------- */

function MobileItem({ item, onNavigate }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const hasChildren = Boolean(item.children?.length);
  const active = isActive(pathname, item);

  return (
    <>
      <ListItemButton
        {...(hasChildren
          ? { onClick: () => setOpen((o) => !o) }
          : { component: Link, to: item.href, onClick: onNavigate })}
        sx={{
          py: 1.2,
          px: 2.5,
          bgcolor: active && !hasChildren ? `${COLORS.primary}20` : "transparent",
          "&:hover": { bgcolor: `${COLORS.green}20` },
        }}
      >
        <ListItemText
          primary={item.label}
          sx={{
            "& .MuiListItemText-primary": {
              fontSize: "0.9rem",
              fontWeight: active ? 700 : 500,
              color: COLORS.text,
            },
          }}
        />
        {hasChildren && (
          <FaChevronDown
            size={12}
            color={COLORS.primary}
            style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
          />
        )}
      </ListItemButton>

      {hasChildren && (
        <Collapse in={open} unmountOnExit>
          <List disablePadding sx={{ ml: 2.5, borderLeft: `2px solid ${COLORS.green}` }}>
            {item.children.map((child) => (
              <MobileItem key={child.href || child.label} item={child} onNavigate={onNavigate} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

/* ---------- Main header ---------- */

export default function NavigationHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const logo = getLogo(pathname);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header>
      <TopContactBar />

      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: COLORS.white,
          borderBottom: `1px solid ${COLORS.border}`,
          boxShadow: "0 4px 18px rgba(0,0,0,0.04)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ minHeight: { xs: 64, md: 76 }, justifyContent: "space-between", gap: 2 }}
          >
            <Link to="/" style={{ display: "flex", flexShrink: 0 }}>
              <Box
                component="img"
                src={logo}
                alt="S Mark Logo"
                sx={{
                  height: { xs: 40, sm: 48 },
                  maxWidth: { xs: 130, sm: 180 },
                  objectFit: "contain",
                }}
              />
            </Link>

            {/* Desktop navigation */}
            <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: { sm: 0.5, md: 1 } }}>
              {navItems.map((item, i) => (
                <DesktopItem
                  key={item.href || item.label}
                  item={item}
                  flip={i === navItems.length - 1}
                />
              ))}
            </Box>

            {/* Mobile menu button */}
            <IconButton
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              sx={{
                display: { xs: "inline-flex", sm: "none" },
                color: COLORS.text,
                bgcolor: `${COLORS.primary}20`,
                borderRadius: 2,
              }}
            >
              <FaBars />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={closeMobile}
        slotProps={{ paper: { sx: { width: { xs: "85%", sm: 360 }, maxWidth: 380 } } }}
      >
        <Box
          sx={{
            p: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: `${COLORS.primary}15`,
          }}
        >
          <Box component="img" src={logo} alt="S Mark Logo" sx={{ height: 36, maxWidth: 160, objectFit: "contain" }} />
          <IconButton onClick={closeMobile} aria-label="Close navigation menu">
            <FaTimes />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: COLORS.green }} />

        <List sx={{ py: 2 }}>
          {navItems.map((item) => (
            <MobileItem key={item.href || item.label} item={item} onNavigate={closeMobile} />
          ))}
        </List>
      </Drawer>
    </header>
  );
}