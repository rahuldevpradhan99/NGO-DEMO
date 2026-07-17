export const TIERS = [
  { name: 'Reporter',              minPoints: 50,    badge: '🌱', color: '#4CAF82', description: 'First step into action' },
  { name: 'Pond Supporter',        minPoints: 250,   badge: '💧', color: '#14BDEB', description: 'Consistent contributor' },
  { name: 'Pond Protector Silver', minPoints: 500,   badge: '🥈', color: '#B0BEC5', description: 'Dedicated guardian' },
  { name: 'Gold Pond Guardian',    minPoints: 1000,  badge: '🥇', color: '#F5A623', description: 'Environmental hero' },
  { name: 'Kalyani Champion',      minPoints: 2500,  badge: '🏆', color: '#E91E8C', description: 'Legendary protector' },
];

export const POINT_ACTIONS = {
  SUBMIT_REPORT: 50,
  COMPLETE_CLEANING_DRIVE: 150,
  VERIFY_REPORT: 25,
  FIRST_REPORT: 100,
  REFER_USER: 30,
};

export const BADGES = [
  { id: 'first-drop',     name: 'First Drop',     icon: '💧', description: 'Submitted your first report' },
  { id: 'active-reporter',name: 'Active Reporter', icon: '📢', description: 'Submitted 5 reports' },
  { id: 'clean-warrior',  name: 'Clean Warrior',   icon: '⚔️', description: 'Completed 5 cleaning drives' },
  { id: 'team-player',    name: 'Team Player',     icon: '🤝', description: 'Joined 3 group drives' },
  { id: 'diligent',       name: 'Diligent',        icon: '🎯', description: 'Submitted 10 verified reports' },
  { id: 'champion',       name: 'Champion',        icon: '🏆', description: 'Reached Kalyani Champion tier' },
  { id: 'pond-sponsor',   name: 'Pond Sponsor',    icon: '🌊', description: 'Sponsored a pond cleanup' },
  { id: 'impact-leader',  name: 'Impact Leader',   icon: '📊', description: 'Drove 20+ cleaning drives' },
];

export const getTier = (points) => {
  let current = TIERS[0];
  for (const tier of TIERS) {
    if (points >= tier.minPoints) current = tier;
  }
  return current;
};

export const getNextTier = (points) => {
  for (const tier of TIERS) {
    if (points < tier.minPoints) return tier;
  }
  return null;
};

export const getProgressToNextTier = (points) => {
  const current = getTier(points);
  const next = getNextTier(points);
  if (!next) return 100;
  const currentMin = current.minPoints;
  const range = next.minPoints - currentMin;
  const progress = points - currentMin;
  return Math.min(100, Math.round((progress / range) * 100));
};
