export const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "", // Base services page if clicked directly
    children: [
      { label: "RIM (Rodent Management)", href: "/services/rim" },
      { label: "Infrastructure Audit", href: "/services/infrastructure-audit" },
      { label: "Water Proofing", href: "/services/water-proofing" },
    ],
  },
  {
    label: "Products",
    href: "/products", // Base products page if clicked directly
    children: [
      {
        label: "Botanical Deterrent", // Fixed typo "Botonical" -> "Botanical"
        children: [
          {
            label: "Soto Ratrid",
            href: "/products/botanical-deterrent/ratrid",
          },
          {
            label: "Soto Reptout",
            href: "/products/botanical-deterrent/reptout",
          },
          {
            label: "Soto Birdrid",
            href: "/products/botanical-deterrent/birdrid",
          },
          {
            label: "Soto Flyban",
            href: "/products/botanical-deterrent/flyban",
          },
          {
            label: "Soto Lizzpro",
            href: "/products/botanical-deterrent/lizzpro",
          },
        ],
      },
      {
        label: "Pesticides & Insecticides",
        children: [
          {
            label: "Termida",
            href: "/products/pesticides-insecticides/termida",
          },
        ],
      },
      {
        label: "Monitoring & Traps",
        children: [
          {
            label: "Soto Cockroach Trap",
            href: "/products/monitoring-traps/cockroach-trap",
          }, // Fixed typo "Cocroach" -> "Cockroach"
          {
            label: "Soto Lizard Trap",
            href: "/products/monitoring-traps/lizard-trap",
          },
        ],
      },
      {
        label: "Insect Monitoring System",
        children: [
          {
            label: "Snapper Insect Trapper",
            href: "/products/insect-monitoring/insect-trapper",
          },
          {
            label: "Snapper Mosquito Trapper",
            href: "/products/insect-monitoring/mosquito-trapper",
          },
          { label: "Spider", href: "/products/insect-monitoring/spider" },
          {
            label: "Insect Killer",
            href: "/products/insect-monitoring/insect-killer",
          },
        ],
      },
      {
        label: "Rodent Management",
        children: [
          {
            label: "Rodein Bait Station",
            href: "/products/rodent-management/rodein-baitstation",
          },
          {
            label: "Rodein Wifi",
            href: "/products/rodent-management/rodein-wifi",
          },
          {
            label: "Rodein Sensor",
            href: "/products/rodent-management/rodein-sensor",
          },
        ],
      },
      {
        label: "Other Products",
        children: [
          { label: "Samarth Stick", href: "/products/other/samarth-stick" },
          { label: "Samarth Stand", href: "/products/other/samarth-stand" },
          { label: "Reptout Stand", href: "/products/other/reptout-stand" },
        ],
      },
    ],
  },
  { label: "Academy", href: "/academy" },
  { label: "Research", href: "/research" },
  { label: "About Us", href: "/about_us" },
];
