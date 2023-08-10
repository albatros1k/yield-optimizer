import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import { icons } from '../../../shared/Icons';
import { SubTitle } from '../../../shared/ui/Typography';
import { Block, Grid, Row, SvgContainer } from '../../../shared/ui/Containers';

import { useAppDispatch, useAppSelector } from '../../../store';
import {
  selectFilterSearchSortDirection,
  selectFilterSearchSortField,
} from '../../../features/data/selectors/filtered-vaults';
import {
  FilteredVaultsState,
  filteredVaultsActions,
} from '../../../features/data/reducers/filtered-vaults';

const SORT_COLUMNS: {
  label: string;
  sortKey: FilteredVaultsState['sort'];
}[] = [
  { label: 'Filter-SortApy', sortKey: 'apy' },
  { label: 'Filter-SortDaily', sortKey: 'daily' },
  { label: 'Filter-SortTvl', sortKey: 'tvl' },
  { label: 'Filter-SortSafety', sortKey: 'safetyScore' },
];

export const SortHeading = memo(() => {
  const { colors } = useTheme();

  const dispatch = useAppDispatch();
  const sortField = useAppSelector(selectFilterSearchSortField);
  const sortDirection = useAppSelector(selectFilterSearchSortDirection);

  const handleSort = useCallback(
    field => {
      if (field === sortField) {
        dispatch(filteredVaultsActions.setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'));
      } else {
        dispatch(filteredVaultsActions.setSortFieldAndDirection({ field, direction: 'desc' }));
      }
    },
    [dispatch, sortField, sortDirection]
  );

  return (
    <Block bg={colors.alterBg} p="17px 25px" w="100%" style={{ borderBottom: '1px solid #3C3F59' }}>
      <Grid
        colTemplate="minmax(0, 30fr) minmax(0, 70fr)"
        rowGap="0px"
        colGap="20px"
        rowTemplate="none"
        w="100%"
      >
        <SubTitle color={colors.alterText}>Vault</SubTitle>
        <Grid
          colTemplate="repeat(5, minmax(0, 1fr))"
          rowGap="none"
          colGap="20px"
          rowTemplate="none"
          w="100%"
        >
          {SORT_COLUMNS.map(({ label, sortKey }) => (
            <SortHeader
              key={label}
              label={label}
              sortKey={sortKey}
              sorted={sortField === sortKey ? sortDirection : 'none'}
              onChange={handleSort}
            />
          ))}
        </Grid>
      </Grid>
    </Block>
  );
});

interface SortColumnHeaderProps {
  label: string;
  sortKey: string;
  sorted: 'none' | 'asc' | 'desc';
  onChange?: (field: string) => void;
}

export const SortHeader = memo<SortColumnHeaderProps>(({ label, sortKey, sorted, onChange }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { arrow } = icons;

  const handleChange = useCallback(() => {
    onChange(sortKey);
  }, [sortKey, onChange]);

  const selected = sorted === 'asc' || sorted === 'desc';

  return (
    <Row onClick={handleChange} align="center" pointer us="none">
      <SubTitle m="0 4px 0 0" color={selected ? colors.textColor : colors.alterText}>
        {t(label)}
      </SubTitle>
      {selected ? (
        <SvgContainer tf={`rotate(${sorted === 'asc' ? '0.5' : '1'}turn)`}>{arrow}</SvgContainer>
      ) : null}
    </Row>
  );
});
