import { memo, ChangeEvent } from 'react';

import { icons } from '../../../shared/Icons';
import { H2, Main } from '../../../shared/ui/Typography';
import { Spacer } from '../../../shared/ui/Spacer';
import { TextField } from '../../../shared/ui/TextField';
import { Block, Card, Row, SvgContainer } from '../../../shared/ui/Containers';

import { useAppDispatch, useAppSelector } from '../../../store';
import {
  selectProtocols,
  selectSearchedProtocols,
} from '../../../features/data/selectors/protocols';
import { protocolActions } from '../../../features/data/reducers/protocols';

import { Table } from './Table';
import { BlankCard } from './BlankCard';
import { SupportedProtocolsSkeleton } from './Skeleton';

const SupportedProtocols = memo(() => {
  const { loading, search, error } = useAppSelector(selectProtocols);
  const memorizedDeFi = useAppSelector(selectSearchedProtocols);
  const dispatch = useAppDispatch();

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(protocolActions.onSearchProtocol(event.target.value));
  };

  const renderTable = (): JSX.Element | JSX.Element[] =>
    memorizedDeFi.length ? (
      memorizedDeFi.map(([chain, protocols]) => <Table key={chain} {...{ chain, protocols }} />)
    ) : (
      <BlankCard />
    );

  if (loading) return <SupportedProtocolsSkeleton />;
  if (error) return <H2>{error}</H2>;
  return (
    <Block p="40px 0" w="100%">
      <Card p="20px" m="0 0 20px">
        <Row align="center" justify="flex-start">
          <SvgContainer style={{ strokeWidth: 0.5 }} size={20}>
            {icons.info}
          </SvgContainer>
          <Main m="0 0 0 20px">
            DeFi protocols that Odysea supports active position reporting only
          </Main>
        </Row>
      </Card>
      <TextField
        pattern="(.*?)"
        iconSize={14}
        w="100%"
        placeholder="Search protocols by name"
        value={search}
        onChange={onChangeSearch}
        inputHeight={50}
      />
      <Spacer space={40} />
      {renderTable()}
    </Block>
  );
});

export default SupportedProtocols;
