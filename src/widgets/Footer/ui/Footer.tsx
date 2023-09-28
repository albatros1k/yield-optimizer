import { useTheme } from 'styled-components';

import { icons } from '../../../shared/Icons';
import { Column, Row, SvgContainer } from '../../../shared/ui/Containers';
import { H4, SubTitle } from '../../../shared/ui/Typography';
import { FooterWrapper } from './styled';
import { CircleImage } from '../../../shared/ui/Images';

import discord from '../../../images/odysea-socials/discord.svg';
import telegram from '../../../images/odysea-socials/telegram.svg';
import twitter from '../../../images/odysea-socials/twitter.svg';

const { externalLink } = icons;

const socials = [
  {
    src: discord,
    href: 'https://discord.com/invite/9NGfXvu8fc',
  },
  {
    src: telegram,
    href: 'https://twitter.com/intent/user?screen_name=Odysea_protocol',
  },
  {
    src: twitter,
    href: 'https://t.me/+GRMl7v5eGzY1ODVh',
  },
];

export const Footer = () => {
  const {
    colors: { alterHelp, alterText },
  } = useTheme();
  return (
    <FooterWrapper>
      <div style={{ width: 220 }} />
      <Row justify="center" style={{ flex: 1 }}>
        <Column w="100%" maxW="1180px" justify="center" h="100%">
          <Row w="100%" justify="space-between">
            <H4 m="0 0 11px">Odysea. All rights reserved © 2023.</H4>
            <Row>
              {socials.map(({ href, src }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ marginRight: 8 }}
                >
                  <CircleImage src={src} w="24px" h="24px" />
                </a>
              ))}
            </Row>
          </Row>
          <Row w="100%" justify="space-between">
            <Row>
              <SubTitle color={alterHelp} m="0 32px 0 0">
                Terms of Use
              </SubTitle>
              <SubTitle color={alterHelp}>Terms & Conditions</SubTitle>
            </Row>
            <a href="https://odysea.finance/" target="_blank" rel="noreferrer">
              <Row align="center">
                <SubTitle m="0 5px 0 0">About Odysea</SubTitle>
                <SvgContainer size={9} stroke={alterText}>
                  {externalLink}
                </SvgContainer>
              </Row>
            </a>
          </Row>
        </Column>
      </Row>
    </FooterWrapper>
  );
};
