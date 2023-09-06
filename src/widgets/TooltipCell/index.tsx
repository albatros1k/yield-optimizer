import { FC, Fragment } from 'react';
import { useTheme } from 'styled-components';
import ReactTooltip from 'react-tooltip';

import { Row } from '../../shared/ui/Containers';
import { Main, SubTitle } from '../../shared/ui/Typography';

import { definePlus } from '../../helpers/merlinHelpers';
import { changeThresholdPercent } from '../../pages/Market/lib/consts';

export interface IconProps {
  color?: string;
  size?: number;
  rotate?: boolean;
  strokeWidth?: number;
  rotate45?: boolean;
}

export const ArrowLevel: FC<IconProps> = ({ color, size = 16, rotate = false }) => {
  const {
    colors: { subAccentSecondary },
  } = useTheme();

  return (
    <svg
      style={{ transform: rotate ? 'rotate(90deg)' : 'none' }}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.66666 11.3327L11.3333 4.66602"
        stroke={color || subAccentSecondary}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.66666 4.66602H11.3333V11.3327"
        stroke={color || subAccentSecondary}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface TooltipCellProps {
  valueName: string;
  heading: string;
  index: number;
  id: string;
  value: number;
  value24HIncreased: number;
}

export const TooltipCell: FC<TooltipCellProps> = ({
  heading,
  index,
  id,
  value,
  value24HIncreased,
  valueName,
}) => {
  const { colors } = useTheme();

  const isIncreased =
    value && isFinite(value24HIncreased) && value24HIncreased > changeThresholdPercent;
  const isDecreased =
    value && isFinite(value24HIncreased) && value24HIncreased < changeThresholdPercent * -1;
  const isChanged = !!(isIncreased || isDecreased);

  return (
    <Row align="center" justify="flex-start" data-tip data-for={heading + index + id}>
      <Main
        pointer={isChanged}
        m={isChanged ? '0 4px 0 0' : '0'}
        color={
          !value
            ? colors.alterText
            : isIncreased
            ? colors.subAccentSecondary
            : isDecreased
            ? colors.red
            : colors.textColor
        }
      >
        {definePlus(value, false)}
      </Main>
      {isChanged ? (
        <Fragment>
          <ArrowLevel
            rotate={!!isDecreased}
            color={isIncreased ? colors.subAccentSecondary : colors.red}
            size={9}
          />
          <ReactTooltip
            backgroundColor={colors.alterHelp}
            id={heading + index + id}
            place="top"
            type="light"
            effect="solid"
            border={true}
            borderColor={colors.alterText}
            arrowColor={colors.alterText}
          >
            <SubTitle m="0 0 9px" w="180px">
              {heading}
            </SubTitle>
            <Row m="0 0 4px">
              <SubTitle>{valueName}</SubTitle>
              <SubTitle>{definePlus(value, false)}</SubTitle>
            </Row>
            <Row m="0 0 10px">
              <SubTitle>24H Increase</SubTitle>
              <SubTitle color={isIncreased ? colors.subAccentSecondary : colors.red}>
                {definePlus(value24HIncreased, false, 2, 'percent')}
              </SubTitle>
            </Row>
          </ReactTooltip>
        </Fragment>
      ) : null}
    </Row>
  );
};
