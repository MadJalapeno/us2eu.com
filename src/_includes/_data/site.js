// _data/site.js
module.exports = {
  title: "Our European Adventure - Moving from USA to Europe",
  name: "Our European Adventure", 
  tagline: "Sarah & Mike's Journey",
  description: "Follow our personal journey moving from the USA to Europe. Real experiences, honest mistakes, research we wish we'd found earlier, and everything we're learning along the way.",
  keywords: "moving to Europe, American expat journey, personal relocation story, Europe move blog, expat life",
  author: "Sarah & Mike",
  url: process.env.URL || "https://yoursite.com",
  email: "hello@yourjourney.com",
  logo: "✈️",
  footerDescription: "Just two Americans trying to figure out how to move to Europe, one visa form at a time.",
  footerCopy: "Made with ❤️ (and lots of coffee) in Austin, TX",
  themes: [
    { name: "Light", value: "light" },
    { name: "Cupcake", value: "cupcake" },
    { name: "Autumn", value: "autumn" }
  ]
};

// _data/navigation.js  
module.exports = {
  main: [
    { text: "Our Story", url: "#story" },
    { text: "Research", url: "#research" },
    { text: "Updates", url: "#updates" },
    { text: "Say Hi", url: "#contact" }
  ],
  footer: [
    { text: "Privacy", url: "/privacy/" },
    { text: "About Us", url: "/about/" },
    { text: "Contact", url: "/contact/" }
  ]
};