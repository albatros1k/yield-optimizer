export type Audit = {
  name: string;
  report: string;
};

export const AUDITS: Record<string, Record<string, Audit[]>> = {
  'aave-bal-aura': {
    aave: [
      {
        name: 'Sigma prime',
        report:
          'https://github.com/aave/aave-v3-core/blob/master/audits/27-01-2022_SigmaPrime_AaveV3.pdf',
      },
      {
        name: 'ADBK',
        report:
          'https://github.com/aave/aave-v3-core/blob/master/audits/27-01-2022_ABDK_AaveV3.pdf',
      },
      {
        name: 'PeckShield',
        report: 'https://peckshield.com/',
      },
      {
        name: 'Trail of Bits',
        report: 'https://www.trailofbits.com/',
      },
    ],
    balancer: [
      {
        name: 'CertiK',
        report: 'https://www.certora.com/',
      },
      {
        name: 'Trail of Bits',
        report: 'https://www.trailofbits.com/',
      },
      {
        name: 'OpenZeppelin',
        report: 'https://www.openzeppelin.com/',
      },
      {
        name: 'Trail of Bits',
        report: 'https://skynet.certik.com/projects/balancer',
      },
    ],
    aurora: [
      {
        name: 'PeckShield',
        report: 'https://peckshield.com/',
      },
      {
        name: 'Halborn',
        report: 'https://www.halborn.com/',
      },
      {
        name: 'Code4rena',
        report: 'https://code4rena.com/',
      },
    ],
  },
  'sdai-leverage': {
    Maker: [
      {
        name: 'Trail of Bits',
        report: 'https://security.makerdao.com/audit-reports',
      },
      {
        name: 'PeckShield',
        report: 'https://security.makerdao.com/audit-reports',
      },
      {
        name: 'Runtime Verification',
        report: 'https://security.makerdao.com/formal-verification',
      },
    ],
    Aave: [
      {
        name: 'SigmaPrime, Smart Contract on 12-23-2022',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
      {
        name: 'Certora, Formal Verification on 11-17-2022 - 12-15-2022',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
      {
        name: 'PeckShield, Smart Contract on 12-09-2022',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
      {
        name: 'ABDK, Smart Contract on 01-27-2022',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
      {
        name: 'SigmaPrime, Smart Contract on 01-27-2022',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
      {
        name: 'Certora, Formal Verification on 11-12-2021 - 01-24-2022',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
      {
        name: 'Peckshield, Smart Contract on 01-14-2022',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
      {
        name: 'Trail of Bits, Smart Contract on 01-07-2022',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
      {
        name: 'OpenZeppelin, Smart Contract on 01-11-2021',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
    ],
  },
  'sdai-gnosis': {
    maker: [
      {
        name: 'Maker',
        report: 'https://security.makerdao.com/audit-reports',
      },
      {
        name: 'Trail of Bits',
        report: 'https://security.makerdao.com/formal-verification',
      },
      {
        name: 'PeckShield',
        report: 'https://security.makerdao.com/formal-verification',
      },
      {
        name: 'Runtime Verification',
        report: 'https://security.makerdao.com/formal-verification',
      },
    ],
    aave: [
      {
        name: 'Aave (Agave is an Aave fork)',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
      {
        name: 'V3.0.1 Audits - SigmaPrime',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
      {
        name: 'V3.0.1 Audits - Certora',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
      {
        name: 'V3.0.1 Audits - PeckShield',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
      {
        name: 'V3.0.1 Audits - ABDK',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
      {
        name: 'V3.0.1 Audits - Trail of Bits',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
      {
        name: 'V3.0.1 Audits - OpenZeppelin',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
    ],
    gnosis: [
      {
        name: 'Gnosis Bridge Audits',
        report: 'https://docs.gnosischain.com/bridges/audits/',
      },
      {
        name: 'Omega - ChainSafe',
        report: 'https://docs.gnosischain.com/bridges/audits/',
      },
      {
        name: 'ChainSafe',
        report: 'https://docs.gnosischain.com/bridges/audits/',
      },
      {
        name: 'ChainSecurity (OmniBridge v6.0 Smart Contracts)',
        report: 'https://docs.gnosischain.com/bridges/audits/',
      },
      {
        name: 'ChainSecurity (OmniBridge Smart Contracts)',
        report: 'https://docs.gnosischain.com/bridges/audits/',
      },
      {
        name: 'TokenBridge Audit by Quantstamp (covers OmniBridge)',
        report: 'https://docs.gnosischain.com/bridges/audits/',
      },
      {
        name: 'TokenBridge Audit by Quantstamp (covers AMB bridge)',
        report: 'https://docs.gnosischain.com/bridges/audits/',
      },
      {
        name: 'Smart Contracts Security Analysis by SmartDec',
        report: 'https://docs.gnosischain.com/bridges/audits/',
      },
      {
        name: 'Initial TokenBridge Audit by Peppersec',
        report: 'https://docs.gnosischain.com/bridges/audits/',
      },
    ],
  },
  'sdai-gnosis-nat': {
    maker: [
      {
        name: 'Maker',
        report: 'https://security.makerdao.com/audit-reports',
      },
      {
        name: 'Trail of Bits',
        report: 'https://security.makerdao.com/formal-verification',
      },
      {
        name: 'PeckShield',
        report: 'https://security.makerdao.com/formal-verification',
      },
      {
        name: 'Runtime Verification',
        report: 'https://security.makerdao.com/formal-verification',
      },
    ],
    aave: [
      {
        name: 'Aave (Agave is an Aave fork)',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
      {
        name: 'V3.0.1 Audits - SigmaPrime',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
      {
        name: 'V3.0.1 Audits - Certora',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
      {
        name: 'V3.0.1 Audits - PeckShield',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
      {
        name: 'V3.0.1 Audits - ABDK',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
      {
        name: 'V3.0.1 Audits - Trail of Bits',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
      {
        name: 'V3.0.1 Audits - OpenZeppelin',
        report: 'https://docs.aave.com/developers/deployed-contracts/security-and-audits',
      },
    ],
    gnosis: [
      {
        name: 'Gnosis Bridge Audits',
        report: 'https://docs.gnosischain.com/bridges/audits/',
      },
      {
        name: 'Omega - ChainSafe',
        report: 'https://docs.gnosischain.com/bridges/audits/',
      },
      {
        name: 'ChainSafe',
        report: 'https://docs.gnosischain.com/bridges/audits/',
      },
      {
        name: 'ChainSecurity (OmniBridge v6.0 Smart Contracts)',
        report: 'https://docs.gnosischain.com/bridges/audits/',
      },
      {
        name: 'ChainSecurity (OmniBridge Smart Contracts)',
        report: 'https://docs.gnosischain.com/bridges/audits/',
      },
      {
        name: 'TokenBridge Audit by Quantstamp (covers OmniBridge)',
        report: 'https://docs.gnosischain.com/bridges/audits/',
      },
      {
        name: 'TokenBridge Audit by Quantstamp (covers AMB bridge)',
        report: 'https://docs.gnosischain.com/bridges/audits/',
      },
      {
        name: 'Smart Contracts Security Analysis by SmartDec',
        report: 'https://docs.gnosischain.com/bridges/audits/',
      },
      {
        name: 'Initial TokenBridge Audit by Peppersec',
        report: 'https://docs.gnosischain.com/bridges/audits/',
      },
    ],
  },
};
