import React, { useState } from 'react';
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
  ListItemText,
  ListItemButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Divider,
  Stack,
  Link as MuiLink,
} from '@mui/material';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
  FaEnvelope,
  FaPhoneAlt,
} from 'react-icons/fa';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navItems } from '../data/navbar_Data';
import { home_page } from '../data/home_page_Data';

// Brand Design Constants
const PRIMARY_CYAN = '#3DCED4';
const ACCENT_GREEN = '#81D959';
const DARK_TEXT = '#1A202C';

const logos = [
  { location: "/home", logo: '/Smark_logos/Smark_logo.png' },
  { location: "/service", logo: '/public/Smark_logos/Smark_Service_Logo.png' },
  { location: "/product", logo: '/public/Smark_logos/Smark Product logo.png' },
  { location: "/academy", logo: '/public/Smark_logos/Smark_Academy_logo.png' },
  { location: "/research", logo: '/public/Smark_logos/Smark_Research_logo.png' },
]
/* =====================================================
    1. TOP ANNOUNCEMENT / CONTACT BAR
====================================================== */
function TopContactBar() {
  return (
    <Box
      sx={{
        bgcolor: "#81D959",
        color: '#0F172A',
        py: 0.75,
        px: { xs: 2, sm: 4 },
        fontSize: '0.825rem',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Contact Details */}
          <Stack direction="row" spacing={{ xs: 2, sm: 3.5 }} className='flex items-center'>
            <MuiLink
              href={`mailto:${home_page.email}`}
              underline="none"
              sx={{
                color: 'inherit',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                transition: 'opacity 0.2s',
                '&:hover': { opacity: 0.8 },
              }}
            >
              <FaEnvelope style={{ fontSize: '0.85rem' }} />
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                Email:
              </Box>{' '}
              {home_page.email}
            </MuiLink>

            <MuiLink
              href={`tel:+${home_page?.contact}`}
              underline="none"
              sx={{
                color: 'inherit',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                transition: 'opacity 0.2s',
                '&:hover': { opacity: 0.8 },
              }}
            >
              <FaPhoneAlt style={{ fontSize: '0.8rem' }} />
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                Call Us:
              </Box>{' '}
              {home_page?.contact}
            </MuiLink>
          </Stack>

          {/* Social Icons */}
          <Stack direction="row" spacing={1} className='hidden! items-center '>
            <Typography
              variant="caption"
              sx={{
                display: { xs: 'none', md: 'block' },
                fontWeight: 700,
                letterSpacing: 0.5,
                mr: 0.5,
              }}
            >
              FOLLOW US:
            </Typography>

            {[
              { icon: <FaFacebookF />, color: '#1877F2', href: '' },
              { icon: <FaInstagram />, color: '#E4405F', href: '' },
              { icon: <FaLinkedinIn />, color: '#0A66C2', href: '' },
            ].map((social, idx) => (
              <IconButton
                key={idx}
                component="a"
                href={social.href}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.85)',
                  color: social.color,
                  width: 26,
                  height: 26,
                  fontSize: '0.75rem',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: social.color,
                    color: '#ffffff',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

/* =====================================================
    2. DESKTOP DROPDOWN MENU ITEMS
====================================================== */
function NestedDesktopMenuItem({ item, onCloseParent }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  if (!item.children) {
    return (
      <MenuItem
        component={Link}
        to={item.href}
        onClick={onCloseParent}
        sx={{
          fontSize: '0.875rem',
          fontWeight: 500,
          py: 1.2,
          px: 2,
          color: DARK_TEXT,
          transition: 'all 0.15s ease',
          '&:hover': {
            bgcolor: `${PRIMARY_CYAN}15`,
            pl: 2.5,
          },
        }}
      >
        {item.label}
      </MenuItem>
    );
  }

  return (
    <Box onMouseEnter={(e) => setAnchorEl(e.currentTarget)} onMouseLeave={() => setAnchorEl(null)}>
      <MenuItem
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.875rem',
          fontWeight: 500,
          py: 1.2,
          px: 2,
          minWidth: 200,
          color: DARK_TEXT,
          '&:hover': {
            bgcolor: `${PRIMARY_CYAN}15`,
            color: PRIMARY_CYAN,
          },
        }}
      >
        <span>{item.label}</span>
        <FaChevronRight style={{ fontSize: '0.65rem', color: ACCENT_GREEN }} />
      </MenuItem>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        elevation={4}
        paperprops={{
          sx: {
            mt: -0.5,
            borderRadius: '12px',
            borderLeft: `3px solid ${ACCENT_GREEN}`,
            boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
            overflow: 'hidden',
          },
        }}
      >
        {item.children.map((subChild, idx) => (
          <MenuItem
            key={idx}
            component={Link}
            to={subChild.href}
            onClick={() => {
              setAnchorEl(null);
              onCloseParent();
            }}
            sx={{
              fontSize: '0.85rem',
              py: 1,
              px: 2,
              color: DARK_TEXT,
              transition: 'all 0.15s ease',
              '&:hover': {
                bgcolor: `${ACCENT_GREEN}20`,
                color: DARK_TEXT,
                fontWeight: 600,
                pl: 2.5,
              },
            }}
          >
            {subChild.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

function DesktopDropdown({ item }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const location = useLocation(); // Hook to check the active route

  const buttonStyles = (isActive) => ({
    textTransform: 'none',
    fontWeight: 600,
    fontSize: { sm: "0.75rem", md: '0.95rem' },
    color: open ? 'black' : DARK_TEXT,
    px: { sm: 1, md: 2 },
    py: 1,
    borderRadius: '8px',
    bgcolor: isActive ? "rgba(0, 157, 163,0.4)" : "transparent",
    transition: 'all 0.2s ease',
    '&:hover': {
      bgcolor: `rgba(0, 157, 163,0.4)`,
    },
  });

  // 1. Handling Simple Links (No Sub-menus)
  if (!item.children) {
    return (
      <NavLink to={item.href} style={{ textDecoration: "none" }}>
        {({ isActive }) => (
          // FIXED: Changed component={Link} to component="span" to prevent invalid nested anchors
          <Button component="span" sx={buttonStyles(isActive)} >
            {item.label}
          </Button>
        )}
      </NavLink >
    );
  }

  // 2. Handling Dropdown Menus
  // Dynamic Check: Is the current page URL one of the sub-menu child paths?
  const isDropdownActive = item.children.some(child => location.pathname === child.href);

  return (
    <>
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={
          <FaChevronDown
            style={{
              fontSize: '0.7rem',
              transition: 'transform 0.2s ease',
              transform: open ? 'rotate(180deg)' : 'none',
              color: 'black',
            }}
          />
        }
        // FIXED: Passed the calculated dropdown active state to the styles function
        sx={buttonStyles(isDropdownActive)}
      >
        {item.label}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        elevation={4}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        paperprops={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: '12px',
            borderTop: `3px solid ${PRIMARY_CYAN}`,
            boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
            py: 0.5,
          },
        }}
      >
        {item.children.map((child, index) => (
          <NestedDesktopMenuItem
            key={index}
            item={child}
            onCloseParent={() => setAnchorEl(null)}
          />
        ))}
      </Menu>
    </>
  );
}
/* =====================================================
    3. RECURSIVE MOBILE DRAWER ITEMS
====================================================== */
function MobileNavItem({ item, onCloseDrawer }) {
  if (item.children) {
    return (
      <Accordion disableGutters elevation={0} square sx={{ bgcolor: 'transparent', '&:before': { display: 'none' } }}>
        <AccordionSummary
          expandIcon={<FaChevronDown style={{ fontSize: '0.75rem', color: PRIMARY_CYAN }} />}
          sx={{
            px: 2.5,
            py: 0.5,
            '&:hover': { bgcolor: `${PRIMARY_CYAN}08` },
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: DARK_TEXT }}>
            {item.label}
          </Typography>
        </AccordionSummary>

        <AccordionDetails sx={{ p: 0, pl: 2, borderLeft: `3px solid ${ACCENT_GREEN}`, ml: 2.5, mb: 1 }}>
          <List disablePadding>
            {item.children.map((child, idx) => (
              <MobileNavItem key={idx} item={child} onCloseDrawer={onCloseDrawer} />
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    );
  }

  return (
    <ListItemButton
      component={Link}
      to={item.href}
      onClick={onCloseDrawer}
      sx={{
        py: 1.2,
        px: 2.5,
        borderRadius: '8px',
        mx: 1,
        my: 0.2,
        '&:hover': {
          bgcolor: `${ACCENT_GREEN}15`,
          '& .MuiListItemText-primary': { color: PRIMARY_CYAN, fontWeight: 700 },
        },
      }}
    >
      <ListItemText
        primary={item.label}
        primaryTypographyProps={{ fontSize: '0.9rem', color: DARK_TEXT, fontWeight: 500 }}
      />
    </ListItemButton>
  );
}

/* =====================================================
    4. MAIN NAVIGATION HEADER COMPONENT
====================================================== */
export default function NavigationHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const getCurrentLogo = () => {
    const currentPath = location.pathname.toLowerCase();
    if (currentPath.includes('/service')) return '/Smark_logos/Smark_Service_Logo.png';
    if (currentPath.includes('/product')) return '/Smark_logos/Smark_Product_logo.png';
    if (currentPath.includes('/academy')) return '/Smark_logos/Smark_Academy_logo.png';
    if (currentPath.includes('/research')) return '/Smark_logos/Smark_Research_logo.png';

    return '/Smark_logos/Smark_logo.png';
  }

  const activeLogo = getCurrentLogo();

  return (
    <Box component="header" sx={{ position: 'sticky', top: 0, zIndex: 1100, bgcolor: '#3DCED4' }}>
      {/* Top Contact Bar */}
      <TopContactBar />

      {/* Main Navigation Toolbar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: '#fff',
          color: DARK_TEXT,
          borderBottom: '1px solid #E2E8F0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, justifyContent: 'space-between' }}>
            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <Box
                component="img"
                src={activeLogo}
                alt="S Mark Logo"
                sx={{ height: { xs: 42, sm: 50 }, width: 'auto' }}
              />
            </Box>

            {/* Desktop Navigation Links */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1, alignItems: 'center' }}>
              {navItems.map((item, idx) => (
                <DesktopDropdown key={idx} item={item} />
              ))}
            </Box>

            {/* Mobile Hamburger Toggle */}
            <IconButton
              aria-label="open drawer"
              onClick={() => setMobileOpen(true)}
              sx={{
                display: { sm: 'none' },
                color: PRIMARY_CYAN,
                bgcolor: `${PRIMARY_CYAN}10`,
                p: 1.2,
                borderRadius: '10px',
                '&:hover': { bgcolor: `${PRIMARY_CYAN}20` },
              }}
            >
              <FaBars style={{ fontSize: '1.2rem' }} />
            </IconButton>

            {/* Mobile Navigation Drawer */}
            <Drawer
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
              paperprops={{
                sx: {
                  width: { xs: '85%', sm: 380 },
                  bgcolor: '#ffffff',
                },
              }}
            >
              {/* Drawer Header */}
              <Box
                sx={{
                  p: 2.5,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  bgcolor: `${PRIMARY_CYAN}12`,
                }}
              >
                <Box
                  component="img"
                  src="/Smark_logos/Smark_logo.png"
                  alt="S Mark Logo"
                  sx={{ height: 36, width: 'auto' }}
                />
                <IconButton
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    color: DARK_TEXT,
                    bgcolor: '#ffffff',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                    '&:hover': { bgcolor: '#F8FAFC' },
                  }}
                >
                  <FaTimes style={{ fontSize: '1rem' }} />
                </IconButton>
              </Box>

              <Divider sx={{ borderColor: ACCENT_GREEN, borderWidth: 1 }} />

              {/* Drawer Navigation List */}
              <List sx={{ py: 2 }}>
                {navItems.map((item, idx) => (
                  <MobileNavItem key={idx} item={item} onCloseDrawer={() => setMobileOpen(false)} />
                ))}
              </List>
            </Drawer>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}