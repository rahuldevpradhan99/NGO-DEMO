const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/data/ponds.json');
const ponds = JSON.parse(fs.readFileSync(file, 'utf8'));

// Array of nice unsplash lake/pond image URLs
const images = [
  "https://images.unsplash.com/photo-1590457632612-4ebf22d99723?w=400&q=80",
  "https://images.unsplash.com/photo-1579705745172-8ee4a9386d5e?w=400&q=80",
  "https://images.unsplash.com/photo-1517409259160-c9a72dfd08c6?w=400&q=80",
  "https://images.unsplash.com/photo-1558980838-8fa89b2db3c1?w=400&q=80"
];

ponds.forEach((p, i) => {
  p.image = images[i % images.length];
});

fs.writeFileSync(file, JSON.stringify(ponds, null, 2));
console.log('Added images to ponds.json');
