import { useMemo } from 'react';

export const useSortedDevices = (devices, sort) => {
  const sortedDevices = useMemo(() => {
    if (sort) {
      return [...devices].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return devices;
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
