// utils/categoryUtils.ts
export const normalizeCategory = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    phone: 'phones',
    phones: 'phones',
    telephone: 'phones',
    telephones: 'phones',
    camera: 'cameras',
    cameras: 'cameras',
    watch: 'watches',
    watches: 'watches',
    smartwatch: 'watches',
    smartwatches: 'watches',
    headset: 'headsets',
    headsets: 'headsets',
    headphones: 'headsets',
    tablet: 'tablets',
    tablets: 'tablets',
    computer: 'computers',
    computers: 'computers',
    gaming: 'playstation',
    playstation: 'playstation',
    ps: 'playstation',
  };

  return categoryMap[category.toLowerCase()] || 'phones';
};