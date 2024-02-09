import { useMemo } from 'react';

//implement backend

// export const useSortedDevices = (devices, sort) => {
//   const sortedDevices = useMemo(() => {
//     if (sort == 'rating' || sort == 'price') {
//       return [...devices].sort((a, b) => a[sort] - b[sort]);
//     }
//     if (sort == 'commentsAmount') {
//       return [...devices].sort((a, b) => b[sort] - a[sort]);
//     } else if (sort) {
//       return [...devices].sort((a, b) => a[sort].localeCompare(b[sort]));
//     }
//     return devices;
//   }, [sort, devices]);
//   return sortedDevices;
// };
export const useSortedDevices = (devices, sort) => {
  const sortedDevices = useMemo(() => {
    if (!sort) {
      return devices;
    }
    switch (sort) {
      case 'rating':
      case 'price':
        return [...devices].sort((a, b) => a[sort] - b[sort]);
      case 'commentsAmount':
        return [...devices].sort((a, b) => b[sort] - a[sort]);
      default:
        return [...devices].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
  }, [sort, devices]);
  return sortedDevices;
};

export const useDevices = (devices, sort, query) => {
  const sortedDevices = useSortedDevices(devices, sort);
  const sortedAndSearchedDevices = useMemo(() => {
    return sortedDevices.filter((device) => device.name.toLowerCase().includes(query.toLowerCase()));
  }, [query, sortedDevices]);

  return sortedAndSearchedDevices;
};
