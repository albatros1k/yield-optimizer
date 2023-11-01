import vaults from '../config/vault/ethereum.json';

import { ABOUT } from './about';
import { AUDITS } from './modals/audits';
import { BACKERS } from './modals/backers';
import { MECHANICS } from './modals/mechanics';
import { SAFETY_SCORE } from './modals/safety-score';
import { REVENUE } from './revenue';
import { POTENTIAL_RISKS } from './risk';

export const checkVaults = (): void => {
  const errorMessages: string[] = [];

  const checkIfExist = (mainArr: string[], subArr: string[]): boolean =>
    subArr.every(risk => mainArr.includes(risk));

  const checkCondition = (condition: boolean, message: string) => {
    if (!condition) {
      errorMessages.push(message);
    }
  };

  vaults.forEach(({ id, risks, revenue }) => {
    checkCondition(!!ABOUT[id], `Missing ABOUT for vault with ID: ${id}`);
    checkCondition(!!MECHANICS[id], `Missing MECHANICS for vault with ID: ${id}`);
    checkCondition(!!AUDITS[id], `Missing AUDITS for vault with ID: ${id}`);
    checkCondition(!!BACKERS[id], `Missing BACKERS for vault with ID: ${id}`);
    checkCondition(!!SAFETY_SCORE[id], `Missing SAFETY_SCORE for vault with ID: ${id}`);

    const RISKS_EXIST = checkIfExist(Object.keys(POTENTIAL_RISKS), risks);
    const REVENUE_EXIST = checkIfExist(Object.keys(REVENUE), revenue);

    checkCondition(RISKS_EXIST, `Risks missing or incomplete for vault with ID: ${id}`);
    checkCondition(REVENUE_EXIST, `Revenue missing or incomplete for vault with ID: ${id}`);
  });

  if (errorMessages.length > 0) {
    throw new Error(`Validation Failed:\n${errorMessages.join('\n')}`);
  } else {
    console.log('%cVaults are fulfilled', 'color: green; font-weight: bold;');
  }
};
