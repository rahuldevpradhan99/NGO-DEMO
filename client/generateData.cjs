const fs = require('fs');
const path = require('path');

// 1. Generate ~45 Bangalore Ponds
const pondNames = ['Kaikondrahalli Lake', 'Kasavanahalli Lake', 'Sarakki Lake', 'Puttenahalli Lake', 'Madiwala Lake', 'Agara Lake', 'Ulsoor Lake', 'Sankey Tank', 'Yediyur Lake', 'Bellandur Lake', 'Varthur Lake', 'Jakkur Lake', 'Hebbal Lake', 'Nagavara Lake', 'Rachenahalli Lake', 'Kalkere Lake', 'Doddabommasandra Lake', 'Mathikere Lake', 'Hesaraghatta Lake', 'Yelahanka Lake', 'Kengeri Lake', 'Uttarahalli Lake', 'Gottigere Lake', 'Hulimavu Lake', 'Arekere Lake', 'Kothanur Lake', 'Chunchaghatta Lake', 'Sompura Lake', 'Kudlu Lake', 'Parappana Agrahara Lake', 'Singasandra Lake', 'Garvebhavipalya Lake', 'Bommanahalli Lake', 'Begur Lake', 'Devarabisanahalli Lake', 'Kempapura Lake', 'Challaghatta Lake', 'Ambalipura Lake', 'Ibblur Lake', 'Kaikondrahalli Kere', 'Saul Kere', 'Koramangala Lake', 'Ejipura Lake', 'Domlur Lake'];

const statuses = ['good', 'moderate', 'critical'];

const generateLat = () => 12.85 + (Math.random() * 0.25); // Roughly Bangalore latitude spread
const generateLng = () => 77.45 + (Math.random() * 0.35); // Roughly Bangalore longitude spread

const ponds = pondNames.map((name, index) => {
  const isCritical = index % 3 === 0;
  const status = isCritical ? 'critical' : statuses[Math.floor(Math.random() * statuses.length)];
  const healthIndex = status === 'critical' ? Math.floor(Math.random() * 40) : (status === 'good' ? 70 + Math.floor(Math.random() * 30) : 40 + Math.floor(Math.random() * 30));
  
  return {
    id: `blr-${(index + 1).toString().padStart(3, '0')}`,
    name,
    village: 'Bengaluru Urban',
    district: 'Bengaluru Urban',
    lat: generateLat(),
    lng: generateLng(),
    healthIndex,
    waterQuality: Math.max(0, healthIndex - 5),
    pollutionIndex: 100 - healthIndex,
    area: `${10 + Math.floor(Math.random() * 300)} acres`,
    status,
    lastInspected: `2026-07-${Math.floor(Math.random() * 16 + 1).toString().padStart(2, '0')}`,
    reportsCount: status === 'critical' ? 20 + Math.floor(Math.random() * 50) : Math.floor(Math.random() * 10),
    cleaningDrives: Math.floor(Math.random() * 15)
  };
});

fs.writeFileSync(path.join(__dirname, 'src/data/ponds.json'), JSON.stringify(ponds, null, 2));


// 2. Generate 10 Preset Reports
const reportTypes = ['garbage', 'plastic', 'dirtyWater', 'deadFish', 'dumping'];
const reports = Array.from({ length: 15 }).map((_, i) => {
  const pond = ponds[Math.floor(Math.random() * ponds.length)];
  return {
    id: `rep-00${i + 1}`,
    userId: 'test-villager', // assign some to the test villager
    type: reportTypes[Math.floor(Math.random() * reportTypes.length)],
    description: `Found severe issues at ${pond.name}. Immediate attention required.`,
    location: `${pond.name} (${pond.lat.toFixed(4)}, ${pond.lng.toFixed(4)})`,
    status: i % 4 === 0 ? 'resolved' : 'pending',
    timestamp: `2026-07-${Math.floor(Math.random() * 16 + 1).toString().padStart(2, '0')}T10:30:00Z`,
    upvotes: Math.floor(Math.random() * 20)
  };
});

fs.writeFileSync(path.join(__dirname, 'src/data/reports.json'), JSON.stringify(reports, null, 2));


// 3. Generate NGO Proposals
const proposals = [
  {
    id: "prop-001",
    title: "Bellandur De-weeding & Aeration",
    budget: "₹2,50,000",
    duration: "3 Months",
    impact: "Will restore oxygen levels for aquatic life and reduce foam.",
    status: "open"
  },
  {
    id: "prop-002",
    title: "Varthur Lake Plastic Extraction",
    budget: "₹1,20,000",
    duration: "1 Month",
    impact: "Removal of 5 tons of surface plastic waste.",
    status: "open"
  },
  {
    id: "prop-003",
    title: "Madiwala Bio-fencing Project",
    budget: "₹5,00,000",
    duration: "6 Months",
    impact: "Preventing sewage runoff using natural vetiver grass fencing.",
    status: "funded"
  },
  {
    id: "prop-004",
    title: "Agara Lake Walkway Restoration",
    budget: "₹80,000",
    duration: "2 Weeks",
    impact: "Clearing garbage along the 2km walking path for citizens.",
    status: "open"
  },
  {
    id: "prop-005",
    title: "Ulsoor Lake Water Testing Drive",
    budget: "₹45,000",
    duration: "1 Week",
    impact: "Comprehensive chemical analysis across 10 zones of the lake.",
    status: "open"
  }
];

fs.writeFileSync(path.join(__dirname, 'src/data/proposals.json'), JSON.stringify(proposals, null, 2));

console.log('Successfully generated ponds.json, reports.json, proposals.json');
