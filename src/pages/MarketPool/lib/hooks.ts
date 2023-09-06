import { useEffect, useState } from 'react';

import { MerlinApi } from '../../../features/data/apis/merlin/merlin-api';
import { IHistoricalData } from '../../../features/data/entities/market';

export const useHistoricalData = (pair: string, poolId: string, start: string, end: string) => {
  const [data, setData] = useState<IHistoricalData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [pricesExist, setPricesExist] = useState<boolean>(true);

  useEffect(() => {
    const getHistoricalData = async () => {
      setLoading(true);
      const result = await MerlinApi.getHistoricalData(pair, poolId, start, end).finally(() =>
        setLoading(false)
      );
      if (typeof result === 'string') {
        setErrorMessage(result);
      } else if (Array.isArray(result) && !poolId) {
        setData(result);
      } else if (typeof result === 'object' && poolId && !Array.isArray(result)) {
        setData([result]);
        //check if we can show prices chart
        const protocolPoolData = result.data;
        if (
          protocolPoolData[0] &&
          (protocolPoolData[0].tokenIds?.length > 2 ||
            protocolPoolData.every(el => !('poolPrice' in el) || el.poolPrice === null))
        ) {
          setPricesExist(false);
        }
      } else {
        setErrorMessage('Something went wrong');
      }
    };

    getHistoricalData();
  }, [pair, poolId, start, end]);

  return { data, pricesExist, loading, errorMessage };
};
