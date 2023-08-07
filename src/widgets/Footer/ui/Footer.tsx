import { useTheme } from 'styled-components';

import { icons } from '../../../shared/Icons';
import { Column, Row, SvgContainer } from '../../../shared/ui/Containers';
import { H4, SubTitle } from '../../../shared/ui/Typography';
import { FooterWrapper } from './styled';

const { externalLink } = icons;

export const Footer = () => {
  const {
    colors: { alterHelp, alterText },
  } = useTheme();
  return (
    <FooterWrapper>
      <div style={{ width: 220 }} />
      <Row justify="center" style={{ flex: 1 }}>
        <Column w="100%" maxW="1180px" justify="center" h="100%">
          <H4 m="0 0 11px">MRLN. All rights reserved © 2023.</H4>
          <Row w="100%" justify="space-between">
            <Row>
              <SubTitle color={alterHelp} m="0 32px 0 0">
                Terms of Use
              </SubTitle>
              <SubTitle color={alterHelp}>Terms & Conditions</SubTitle>
            </Row>
            <Row align="center">
              <SubTitle m="0 5px 0 0">About Merlin</SubTitle>
              <SvgContainer size={9} stroke={alterText}>
                {externalLink}
              </SvgContainer>
            </Row>
          </Row>
        </Column>
      </Row>
    </FooterWrapper>
  );
};
