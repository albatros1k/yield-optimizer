import { Fragment, memo, useEffect, useMemo, useState } from 'react';
import { useTheme } from 'styled-components';
import ReactPaginate from 'react-paginate';

import { icons } from '../../../shared/Icons';
import { CircleImage } from '../../../shared/ui/Images';
import { H2, Main, SubTitle } from '../../../shared/ui/Typography';
import { PaginatorRow } from '../../../shared/ui/Pagination';
import { Spacer } from '../../../shared/ui/Spacer';
import { Block, Card, Column, Grid, Row, SvgContainer } from '../../../shared/ui/Containers';

import { getBeefyApi } from '../../../features/data/apis/instances';
import { selectGalaxyPoints } from '../../../features/data/selectors/points';
import { GalaxyRankingResponse } from '../../../features/data/apis/beefy/beefy-data-api-types';
import { UserRanking } from '../../../features/data/entities/ranking';

import { useAppSelector } from '../../../store';

import { useBlockies } from '../../../helpers/hooks';
import { formatAddressShort } from '../../../helpers/format';

import { UserSkeleton } from './UserSkeleton';

const USERS_PER_PAGE = 8;

export const UserList = memo(() => {
  const [rankings, setRankings] = useState<GalaxyRankingResponse | null>(null);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const myUser = useAppSelector(selectGalaxyPoints);
  const { colors } = useTheme();

  const api = useMemo(() => getBeefyApi(), []);

  const onChangePage = async (event: { selected: number }) => {
    const selectedPage: number = event.selected;
    setLoading(true);
    try {
      const res = await api.getUserRanking(USERS_PER_PAGE, selectedPage * USERS_PER_PAGE);
      setRankings(res);
      setPage(selectedPage);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching user rankings:', error);
    } finally {
      setLoading(false);
    }
  };

  const PAGE_COUNT = useMemo(() => rankings?.totalCount / USERS_PER_PAGE, [rankings]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const initialResponse = await api.getUserRanking(USERS_PER_PAGE, 0);
        setRankings(initialResponse);
      } catch (error) {
        console.error('Error fetching user rankings:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [api]);

  const renderTopUsers = useMemo(() => {
    if (rankings?.list) {
      const topUsers = rankings?.list.slice(0, 3);
      const remainingUsers = rankings?.list.slice(3).filter(user => user.id !== myUser.id);
      return (
        <Fragment>
          <Card
            w="100%"
            border={colors.subAccentSecondary}
            style={{ borderRadius: myUser.rank > 3 ? '6px 6px 0 0' : '6px' }}
          >
            {topUsers.map(user => (
              <UserRow key={user.id} {...user} />
            ))}
          </Card>
          {myUser.rank > 3 && <UserRow key={myUser.id} {...(myUser as UserRanking)} />}
          {remainingUsers?.map(user => (
            <UserRow key={user.id} {...user} />
          ))}
        </Fragment>
      );
    }
  }, [myUser, rankings, colors]);

  const renderUsers = useMemo(
    () => rankings?.list.map(user => <UserRow key={user.id} {...user} />),
    [rankings]
  );

  const renderLoadingSkeletons = () =>
    [...new Array(USERS_PER_PAGE).fill(null)].map((_, i) => <UserSkeleton key={i} />);

  const renderHeading = () =>
    [`${rankings.totalCount} Odysea Explorers`, 'Stardust', 'Rank'].map((title, index) => {
      const color = [colors.textColor, colors.subAccentSecondary, colors.alterText][index];
      return (
        <SubTitle key={title} ta={!index ? 'left' : 'center'} color={color}>
          {title}
        </SubTitle>
      );
    });

  if (!rankings || !rankings.list) return <Block h="100%">{renderLoadingSkeletons()}</Block>;
  if (error) return <H2>{error}</H2>;

  return (
    <Card w="100%" h="100%">
      <Column w="100%" h="100%">
        <Grid
          colTemplate="repeat(3,1fr)"
          colGap="10px"
          rowTemplate="none"
          rowGap="0"
          p="20px 24px"
          w="100%"
        >
          {renderHeading()}
        </Grid>
        {loading ? renderLoadingSkeletons() : page === 0 ? renderTopUsers : renderUsers}
        <Spacer />
        <PaginatorRow m="auto 0 25px" justify="center" w="100%" p="0 25px">
          <ReactPaginate
            {...{
              breakLabel: '...',
              nextLabel: '>',
              forcePage: page,
              onPageChange: onChangePage,
              pageRangeDisplayed: 0,
              marginPagesDisplayed: 2,
              pageCount: PAGE_COUNT,
              previousLabel: '<',
              className: 'paginator',
            }}
          />
        </PaginatorRow>
      </Column>
    </Card>
  );
});

export const UserRow = memo<UserRanking>(({ address, points, rank, id }) => {
  const blockiesIcon: string = useBlockies(address.address);
  const isMyUser = useAppSelector(selectGalaxyPoints).id === id;
  const { colors } = useTheme();

  const palette = [colors.subAccentSecondary, colors.accentMain, colors.subAccentMain];

  const isTop3 = rank < 4;

  const color = isTop3 ? palette[rank - 1] : isMyUser ? colors.textColor : colors.alterText;

  return (
    <Block
      w="100%"
      p="25px"
      style={{
        border: isMyUser ? `1px solid ${colors.subAccentMain}` : 'none',
        borderBottom: `1px solid ${isMyUser ? colors.subAccentMain : colors.alterHelp}`,
        borderTop: 'none',
        borderRadius: isMyUser ? '0 0 6px 6px' : 0,
      }}
    >
      <Grid colTemplate="repeat(3,1fr)" colGap="10px" rowTemplate="none" rowGap="0">
        <Row align="center">
          <CircleImage m="0 12px 0 0" w={`32px`} h={`32px`} src={blockiesIcon} />
          <Main>{formatAddressShort(address.address)}</Main>
          {isMyUser && (
            <Main color={colors.subAccentMain} m="0 0 0 5px">
              (You)
            </Main>
          )}
        </Row>
        <Main ta="center" color={colors.subAccentSecondary}>
          {points}
        </Main>
        <Row justify="center" align="center">
          {isTop3 && <SvgContainer fill={color}>{icons.fullStar}</SvgContainer>}
          <Main m="0 0 0 3px" color={color}>
            #{rank}
          </Main>
        </Row>
      </Grid>
    </Block>
  );
});
