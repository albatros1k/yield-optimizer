import { useEffect, useState } from 'react';

import { MerlinApi } from '../../../features/data/apis/merlin/merlin-api';
import { IHistoricalData } from '../../../features/data/entities/market';

export const useHistoricalData = (
  pair: string,
  poolId: string,
  start: string,
  end: string,
  tvl: string | null = null
) => {
  const [data, setData] = useState<IHistoricalData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [pricesExist, setPricesExist] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();

    const getHistoricalData = async (
      _pair: string,
      _poolId: string,
      _start: string,
      _end: string,
      _tvl: string | null,
      signal: AbortSignal
    ) => {
      setLoading(true);
      await MerlinApi.getHistoricalData(_pair, _poolId, _start, _end, _tvl, signal).then(result => {
        if (typeof result === 'string') {
          //error case
          if (result !== 'canceled') {
            setErrorMessage(result);
            setLoading(false);
          }
        } else if (Array.isArray(result) && !poolId) {
          setData(result);
          setErrorMessage('');
          setLoading(false);
        } else if (typeof result === 'object' && poolId && !Array.isArray(result)) {
          setData([result]);
          setErrorMessage('');
          setLoading(false);
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
          //some uncovered case
          setErrorMessage('Something went wrong');
          setLoading(false);
        }
      });
    };

    getHistoricalData(pair, poolId, start, end, tvl, controller.signal);

    return (): void => controller.abort();
  }, [pair, poolId, start, end, tvl]);

  return { data, pricesExist, loading, errorMessage };
};
