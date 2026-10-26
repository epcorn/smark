
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Divider,
  Stack,
} from "@mui/material";

import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

import { Link, NavLink, useLocation } from "react-router-dom";
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
  service: "/Smark_logos/Smark_Service_Logo.png",
  product: "/Smark_logos/Smark_Product_logo.png",
  academy: "/Smark_logos/Smark_Academy_logo.png",
  research: "/Smark_logos/Smark_Research_logo.png",
  default: "/Smark_logos/Smark_logo.png",
};

const menuPaper = {
  minWidth: 210,
  borderRadius: 2,
  border: `1px solid ${COLORS.border}`,
  boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
  "& .MuiMenuItem-root": {
    fontSize: "0.875rem",
    py: 1.2,
    color: COLORS.text,
    "&:hover": {
      backgroundColor: `${COLORS.primary}20`,
    },
  },
};

// Top contact bar
function TopContactBar() {
  return (
    <Box
      className="w-full"
      sx={{
        bgcolor: COLORS.green,
        color: COLORS.text,
        py: 0.75,
        px: { xs: 2, md: 4 },
        fontSize: "0.8rem",
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={1}
        >
          <Stack direction="row" spacing={{ xs: 1.5, sm: 3 }}>
            {home_page?.email && (
              <Box
                component="a"
                href={`mailto:${home_page.email}`}
                className="flex items-center gap-2 no-underline"
                sx={{ color: "inherit", fontWeight: 600 }}
              >
                <FaEnvelope />
                {home_page.email}
              </Box>
            )}

            {home_page?.contact && (
              <Box
                component="a"
                href={`tel:${home_page.contact}`}
                className="flex items-center gap-2 no-underline"
                sx={{ color: "inherit", fontWeight: 600 }}
              >
                <FaPhoneAlt />
                {home_page.contact}
              </Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

// Recursive desktop menu item
function DesktopMenuItem({ item, onNavigate }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const hasChildren = Boolean(item.children?.length);
  const open = Boolean(anchorEl);

  if (!hasChildren) {
    return (
      <MenuItem
        component={Link}
        to={item.href}
        onClick={onNavigate}
      >
        {item.label}
      </MenuItem>
    );
  }

  return (


    <>
      <MenuItem
        onMouseEnter={(event) => setAnchorEl(event.currentTarget)}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {item.label}
        <FaChevronRight size={10} />
      </MenuItem>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: menuPaper,
            onMouseEnter: () => { },
            onMouseLeave: () => setAnchorEl(null),
          },
        }}
      >
        {item.children.map((child) => (
          <DesktopMenuItem
            key={child.href || child.label}
            item={child}
            onNavigate={() => setAnchorEl(null)}
          />
        ))}
      </Menu>
    </>


  );
}

// Desktop navigation dropdown
function DesktopDropdown({ item }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { pathname } = useLocation();
  const hasChildren = Boolean(item.children?.length);
  const open = Boolean(anchorEl);

  const isActive = item.href
    ? pathname === item.href ||
    (item.href !== "/" && pathname.startsWith(`${item.href}/`))
    : item.children?.some(
      (child) =>
        child.href &&
        (pathname === child.href ||
          pathname.startsWith(`${child.href}/`))
    ) ?? false;

  const buttonStyle = {
    color: COLORS.text,
    textTransform: "none",
    fontWeight: 600,
    fontSize: { sm: "0.8rem", md: "0.95rem" },
    px: { sm: 1, md: 1.5 },
    borderRadius: 2,
    bgcolor: isActive ? `${COLORS.primary}80` : "transparent",
    "&:hover": {
      bgcolor: `${COLORS.primary}25`,
    },
  };

  if (!hasChildren) {
    return (
      <Button
        component={NavLink}
        to={item.href}
        sx={buttonStyle}
      >
        {item.label}
      </Button>
    );
  }

  return (
    <>
      <Button
        onClick={(event) =>
          setAnchorEl(open ? null : event.currentTarget)
        }
        endIcon={
          <FaChevronDown
            size={11}
            style={{
              transform: open ? "rotate(180deg)" : "none",
              transition: "transform 0.2s",
            }}
          />
        }
        sx={buttonStyle}
      >
        {item.label}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              ...menuPaper,
              mt: 1,
              borderTop: `3px solid ${COLORS.primary}`,
            },
          },
        }}
      >
        {item.children.map((child) => (
          <DesktopMenuItem
            key={child.href || child.label}
            item={child}
            onNavigate={() => setAnchorEl(null)}
          />
        ))}
      </Menu>
    </>
  );
}

// Recursive mobile menu item
function MobileNavItem({ item, onNavigate }) {
  const hasChildren = Boolean(item.children?.length);
  const { pathname } = useLocation();

  const isActive =
    item.href &&
    (pathname === item.href ||
      pathname.startsWith(`${item.href}/`));

  if (!hasChildren) {
    return (
      <ListItemButton
        component={Link}
        to={item.href}
        onClick={onNavigate}
        sx={{
          mx: 1,
          borderRadius: 2,
          py: 1.2,
          bgcolor: isActive ? `${COLORS.primary}20` : "transparent",
          "&:hover": {
            bgcolor: `${COLORS.green}20`,
          },
        }}
      >
        <ListItemText
          primary={item.label}
          primaryTypographyProps={{
            fontSize: "0.9rem",
            fontWeight: isActive ? 700 : 500,
            color: COLORS.text,
          }}
        />
      </ListItemButton>
    );
  }

  return (
    <Accordion
      disableGutters
      elevation={0}
      sx={{
        bgcolor: "transparent",
        "&:before": { display: "none" },
      }}
    >
      <AccordionSummary
        expandIcon={
          <FaChevronDown
            size={12}
            color={COLORS.primary}
          />
        }
        sx={{
          px: 2.5,
          minHeight: 48,
          "& .MuiAccordionSummary-content": {
            my: 1,
          },
        }}
      >
        <Box
          component="span"
          sx={{
            color: COLORS.text,
            fontSize: "0.9rem",
            fontWeight: isActive ? 700 : 600,
          }}
        >
          {item.label}
        </Box>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          p: 0,
          ml: 2.5,
          borderLeft: `2px solid ${COLORS.green}`,
        }}
      >
        <List disablePadding>
          {item.children.map((child) => (
            <MobileNavItem
              key={child.href || child.label}
              item={child}
              onNavigate={onNavigate}
            />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

// Main navbar
export default function NavigationHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const logoKey = pathname.startsWith("/services")
    ? "service"
    : pathname.startsWith("/products")
      ? "product"
      : pathname.startsWith("/academy")
        ? "academy"
        : pathname.startsWith("/research")
          ? "research"
          : "default";

  const activeLogo = LOGOS[logoKey];

  const closeMobile = () => setMobileOpen(false);

  return (
    <Box
      component="header"
      className="w-full"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
      }}
    >
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
            sx={{
              minHeight: { xs: 64, md: 76 },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box
              component={Link}
              to="/"
              className="flex shrink-0 items-center"
              sx={{ textDecoration: "none" }}
            >
              <Box
                component="img"
                src={activeLogo}
                alt="S Mark Logo"
                sx={{
                  height: { xs: 40, sm: 48 },
                  width: "auto",
                  maxWidth: { xs: 130, sm: 180 },
                  objectFit: "contain",
                }}
              />
            </Box>

            {/* Desktop navigation */}
            <Box
              className="hidden sm:flex"
              sx={{
                alignItems: "center",
                gap: { sm: 0.5, md: 1 },
              }}
            >
              {navItems.map((item) => (
                <DesktopDropdown
                  key={item.href || item.label}
                  item={item}
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
        slotProps={{
          paper: {
            sx: {
              width: { xs: "85%", sm: 360 },
              maxWidth: 380,
              bgcolor: COLORS.white,
            },
          },
        }}
      >
        <Box
          className="flex items-center justify-between"
          sx={{
            p: 2.5,
            bgcolor: `${COLORS.primary}15`,
          }}
        >
          <Box
            component="img"
            src={activeLogo}
            alt="S Mark Logo"
            sx={{ height: 36, maxWidth: 160, objectFit: "contain" }}
          />

          <IconButton
            onClick={closeMobile}
            aria-label="Close navigation menu"
          >
            <FaTimes />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: COLORS.green }} />

        <List sx={{ py: 2 }}>
          {navItems.map((item) => (
            <MobileNavItem
              key={item.href || item.label}
              item={item}
              onNavigate={closeMobile}
            />
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
