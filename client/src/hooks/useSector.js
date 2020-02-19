import { useState, useEffect } from 'react';
import { pullSectorData } from 'services/pullSectors';
import { calcSectorHealth } from 'services/calcSectorHealth';

export default function useSector() {
  const [sectorHealthDataPass, setSectorHealthData] = useState();

  useEffect(() => {
    try {
      pullSectorData().then(sectorData => {
        const sectorHealthCalc = calcSectorHealth(sectorData);
        setSectorHealthData(sectorHealthCalc);
      });
    } catch (ex) {}
  }, []);

  return [sectorHealthDataPass];
}
