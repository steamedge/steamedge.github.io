/*
  STEAMEDGE PRODUCT CATALOG
  -------------------------
  Edit product names, prices, descriptions, and images here.
  Prices are in US dollars. Keep each product id unique.
  Product images should be placed in the assets folder.
*/
window.STEAMEDGE_PRODUCTS = [
  {
    id: "base-kit",
    name: "Base Kit",
    price: 59.99,
    category: "kits",
    label: "THE ESSENTIAL",
    shortDescription: "A straightforward way to get started with SteamEdge.",
    description: "The Base Kit is the entry point to the SteamEdge system. Use this description to explain the exact components included in your final Base Kit package.",
    image: "assets/steamedge-front.png",
    imageAlt: "Front view of the SteamEdge razor",
    featured: true
  },
  {
    id: "plus-kit",
    name: "Plus Kit",
    price: 79.99,
    category: "kits",
    label: "THE UPGRADE",
    shortDescription: "An expanded SteamEdge setup with room for your added kit features.",
    description: "The Plus Kit builds on the core SteamEdge setup. Edit this description to list the exact added components, features, or value included in your Plus package.",
    image: "assets/steamedge-angle.png",
    imageAlt: "Angled view of the SteamEdge razor",
    featured: true
  },
  {
    id: "premium-kit",
    name: "Premium Kit",
    price: 99.99,
    category: "kits",
    label: "THE COMPLETE SETUP",
    shortDescription: "The top-tier SteamEdge kit for a more complete setup.",
    description: "The Premium Kit is the highest-level SteamEdge package. Update this text with the finalized package contents, accessories, and benefits before publishing the store.",
    image: "assets/steamedge-front.png",
    imageAlt: "Front view of the SteamEdge razor",
    featured: true
  },
  {
    id: "replacement-blades",
    name: "Replacement Blades",
    price: 9.99,
    category: "accessories",
    label: "REPLACEMENT",
    shortDescription: "Replacement blades for your SteamEdge razor head.",
    description: "Keep replacement blades available for your SteamEdge setup. Add final blade count, compatibility information, and replacement guidance here.",
    visual: "blade",
    featured: true
  },
  {
    id: "charging-cable",
    name: "Charging Cable",
    price: 9.99,
    category: "accessories",
    label: "POWER",
    shortDescription: "A dedicated cable for charging the SteamEdge handle.",
    description: "The SteamEdge charging cable is an accessory for the rechargeable handle. Add connector type, cable length, and charging specifications once confirmed.",
    visual: "cable"
  },
  {
    id: "replacement-handle",
    name: "Handle Replacement",
    price: 39.99,
    category: "accessories",
    label: "REPLACEMENT",
    shortDescription: "A replacement handle for your SteamEdge setup.",
    description: "A replacement SteamEdge handle. Add final compatibility information and details about what is included with this replacement part.",
    image: "assets/steamedge-front.png",
    imageAlt: "SteamEdge razor handle and head",
    imageOnly: true
  },
  {
    id: "travel-case",
    name: "Travel Case",
    price: 14.99,
    category: "accessories",
    label: "PROTECTION",
    shortDescription: "A dedicated case for keeping your SteamEdge setup together.",
    description: "The SteamEdge Travel Case is designed as a companion accessory. Add final dimensions, material, and storage capacity when those details are confirmed.",
    visual: "case"
  },
  {
    id: "cleaning-brush",
    name: "Cleaning Brush",
    price: 5.99,
    category: "accessories",
    label: "CARE",
    shortDescription: "A simple accessory for routine razor care.",
    description: "Use the SteamEdge Cleaning Brush as part of your product-care setup. Add any final cleaning instructions or material details here.",
    visual: "brush"
  }
];
