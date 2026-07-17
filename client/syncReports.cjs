const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, 'src/data/users.json');
const pondsFile = path.join(__dirname, 'src/data/ponds.json');
const reportsFile = path.join(__dirname, 'src/data/reports.json');

const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
const ponds = JSON.parse(fs.readFileSync(pondsFile, 'utf8'));

const reportTypes = ['garbage', 'plastic', 'dirtyWater', 'deadFish', 'dumping'];
const statuses = ['pending', 'resolved', 'in-progress'];

let allReports = [];
let reportIdCounter = 1;

users.forEach(user => {
  const numReports = user.reportsSubmitted || 0;
  for (let i = 0; i < numReports; i++) {
    const pond = ponds[Math.floor(Math.random() * ponds.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Distribute timestamps over the last few months
    const date = new Date(Date.now() - Math.floor(Math.random() * 10000000000));
    
    allReports.push({
      id: `rep-${reportIdCounter.toString().padStart(4, '0')}`,
      userId: user.id,
      submittedBy: user.id,
      type: reportTypes[Math.floor(Math.random() * reportTypes.length)],
      description: `Reported issue concerning ${pond.name}. Require immediate attention.`,
      location: `${pond.name} (${pond.lat.toFixed(4)}, ${pond.lng.toFixed(4)})`,
      status: status,
      timestamp: date.toISOString(),
      upvotes: Math.floor(Math.random() * 30)
    });
    reportIdCounter++;
  }
});

fs.writeFileSync(reportsFile, JSON.stringify(allReports, null, 2));
console.log(`Generated ${allReports.length} reports successfully to match user stats.`);
