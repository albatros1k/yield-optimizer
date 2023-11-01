import { memo, useMemo } from 'react';
import { useTheme } from 'styled-components';

import { icons } from '../../../shared/Icons';
import { awsLink } from '../../../shared/lib/aws';
import { Main } from '../../../shared/ui/Typography';
import { CircleImage } from '../../../shared/ui/Images';
import { ChainsEnum } from '../../../shared/lib/chains';
import { IconButton } from '../../../shared/ui/Buttons';
import { Card, ExpandedCardContent, Grid, Row } from '../../../shared/ui/Containers';

import { useToggle } from '../../../helpers/hooks';
import { onImageError, parseProtocol } from '../../../helpers/merlinHelpers';
import { NumberInfo } from './styled';
import { useAppSelector } from '../../../store';

import { selectProtocols } from '../../../features/data/selectors/protocols';
import { ISupportedProtocol } from '../../../features/data/apis/merlin/types/protocols';

interface TableProps {
  chain: string;
  protocols: ISupportedProtocol[];
}

export const Table = memo<TableProps>(({ chain, protocols }) => {
  const { search } = useAppSelector(selectProtocols);
  const { colors } = useTheme();
  const [open, toggleOpen] = useToggle(false);

  const filteredAndSortedProtocols = useMemo(
    () =>
      [...protocols]
        .filter(({ protocolName }) => protocolName.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => a.protocolName.localeCompare(b.protocolName)),
    [protocols, search]
  );

  return (
    <Card m="0 0 27px" style={{ border: 'none' }} pointer={true}>
      <Row
        align="center"
        h="60px"
        p="0 21px"
        w="100%"
        justify="space-between"
        style={{
          border: `1px solid ${colors.alterHelp}`,
          borderBottom: open ? 'none' : `1px solid ${colors.alterHelp}`,
          userSelect: 'none',
        }}
        onClick={toggleOpen}
      >
        <Row align="center" justify="flex-start">
          <CircleImage
            src={`${awsLink}/chain-icons/${chain}.png`}
            alt="logo"
            w="16px"
            h="16px"
            onError={onImageError}
          />
          <Main m="0 9px">
            {ChainsEnum[chain.toUpperCase() as keyof typeof ChainsEnum] || chain}
          </Main>
          <NumberInfo num={filteredAndSortedProtocols.length} />
        </Row>
        <IconButton isIconRotate={open}>{icons.arrow}</IconButton>
      </Row>
      <ExpandedCardContent open={open} p="0" style={{ border: 'none' }}>
        {open && (
          <Grid
            w="100%"
            colGap="0"
            rowGap="0"
            colTemplate="repeat(5, 20%)"
            rowTemplate="auto"
            style={{ border: `0.5px solid ${colors.alterHelp}` }}
          >
            {filteredAndSortedProtocols.map(({ protocolName, logo }, index) => (
              <Row
                key={protocolName + index}
                h="60px"
                align="center"
                justify="flex-start"
                p="0 15px 0 20px"
                overflowHidden
                style={{ border: `0.5px solid ${colors.alterHelp}`, userSelect: 'none' }}
              >
                <CircleImage
                  src={logo}
                  alt="logo"
                  w="16px"
                  h="16px"
                  onError={onImageError}
                  m="0 7px 0 0"
                />
                <Main maxW="calc(100% - 27px)" style={{ wordWrap: 'break-word' }}>
                  {parseProtocol(protocolName)}
                </Main>
              </Row>
            ))}
          </Grid>
        )}
      </ExpandedCardContent>
    </Card>
  );
});
