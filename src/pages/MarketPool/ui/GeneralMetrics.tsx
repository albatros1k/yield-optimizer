import { memo } from 'react';

import { IAvgMetrics } from '../../../features/data/entities/market';

import { H3, H4 } from '../../../shared/ui/Typography';
import { MultipleTokenIcons } from '../../../shared/ui/Images';
import { Card, Column, Row } from '../../../shared/ui/Containers';

import { useColor } from '../../../helpers/hooks';
import { definePlus } from '../../../helpers/merlinHelpers';

interface GeneralMetricsProps {
  pairName: string;
  tokenIds: string[];
  avgMetrics: IAvgMetrics;
}

export const GeneralMetrics = memo<GeneralMetricsProps>(({ pairName, tokenIds, avgMetrics }) => {
  const defineColor = useColor();
  const { apy, apyBase, apyFarm, apyMean30 } = avgMetrics;

  return (
    <Card h="125px" m="0 0 40px" p="25px 30px 30px" w="100%">
      <Row>
        <Column w="33%">
          <H4 m="0 0 23px">Pool</H4>
          <Row align="center" justify="flex-start">
            {tokenIds.length ? <MultipleTokenIcons addresses={tokenIds} size={24} /> : null}
            <H3 m={tokenIds.length ? '0 0 0 20px' : '0'}>{pairName}</H3>
          </Row>
        </Column>
        <Row w="20px" />
        <Row w="66%">
          <Column w="calc(25% - 10px)">
            <H4 m="0 0 23px">APY</H4>
            <H3 color={defineColor(apy)}>{definePlus(apy, false, 1, 'percent')}</H3>
          </Column>
          <Column w="calc(25% - 10px)">
            <H4 m="0 0 23px">Base APY</H4>
            <H3 color={defineColor(apyBase)}>{definePlus(apyBase, false, 1, 'percent')}</H3>
          </Column>
          <Column w="calc(25% - 10px)">
            <H4 m="0 0 23px">Reward APY</H4>
            <H3 color={defineColor(apyFarm)}>{definePlus(apyFarm, false, 1, 'percent')}</H3>
          </Column>
          <Column w="calc(25% - 10px)">
            <H4 m="0 0 23px">APY (30d)</H4>
            <H3 color={defineColor(apyMean30)}>{definePlus(apyMean30, false, 1, 'percent')}</H3>
          </Column>
        </Row>
      </Row>
    </Card>
  );
});
