import { FC, SVGProps, memo, useCallback } from 'react';
import { useTheme } from 'styled-components';

import { ChainEntity } from '../../../features/data/entities/chain';
import { selectActiveChainIds, selectChainById } from '../../../features/data/selectors/chains';

import { Grid, Row } from '../../../shared/ui/Containers';
import { ChainBtn } from '../../../shared/ui/Buttons';
import { Main } from '../../../shared/ui/Typography';

import { useAppSelector } from '../../../store';

const networkIcons = import.meta.glob<FC<SVGProps<SVGSVGElement>>>(
  '../../../images/networks/*.svg',
  {
    eager: true,
    import: 'ReactComponent',
  }
);

type ChainButtonProps = {
  id: ChainEntity['id'];
  selected: boolean;
  onChange: (selected: boolean, id: ChainEntity['id']) => void;
};

const ChainButton: FC<ChainButtonProps> = ({ id, onChange, selected }) => {
  const chain = useAppSelector(state => selectChainById(state, id));
  const { colors } = useTheme();

  const handleChange = useCallback(() => {
    onChange(!selected, id);
  }, [id, selected, onChange]);

  const Icon: FC<SVGProps<SVGSVGElement>> = networkIcons[`../../../images/networks/${id}.svg`];

  return (
    <ChainBtn
      w="100%"
      h="42px"
      bg={colors.alterBg}
      p="0 20px"
      selected={selected}
      onClick={handleChange}
    >
      <Row align="center" w="100%">
        <Icon width={14} height={14} />
        <Main color={selected ? colors.textColor : colors.alterText} m="0 0 0 8px">
          {chain.name}
        </Main>
      </Row>
    </ChainBtn>
  );
};

export type ChainButtonSelectorProps = {
  selected: ChainEntity['id'][];
  onChange: (selected: ChainEntity['id'][]) => void;
};
export const ChainButtonSelector = memo<ChainButtonSelectorProps>(({ onChange, selected }) => {
  const chainIds = useAppSelector(selectActiveChainIds);

  const handleChange = useCallback(
    (isSelected: boolean, id: string) => {
      if (isSelected) {
        if (!selected.includes(id)) {
          const newSelected = [...selected, id];
          // if all selected, return empty array to represent not-filtered
          onChange(newSelected.length < chainIds.length ? newSelected : []);
        }
      } else if (!isSelected) {
        if (selected.length === 0) {
          // special handling:
          // first chain unselected should be treated as unselecting all other chains instead
          onChange([id]);
        } else if (selected.includes(id)) {
          onChange(selected.filter(selectedId => selectedId !== id));
        }
      }
    },
    [chainIds, selected, onChange]
  );

  return (
    <Grid colTemplate="repeat(4, 1fr)" rowTemplate="none" rowGap="20px" colGap="20px" w="100%">
      {chainIds.map(id => (
        <ChainButton
          key={id}
          id={id}
          selected={selected.length === 0 || selected.includes(id)}
          onChange={handleChange}
        />
      ))}
    </Grid>
  );
});
