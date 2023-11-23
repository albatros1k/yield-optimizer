import GA4React from 'ga-4-react';
// eslint-disable-next-line import/no-unresolved
import { GA4ReactResolveInterface } from 'ga-4-react/dist/models/gtagModels';

const GA4 = 'G-9VQYRQ68V5';

const ga4react = new GA4React(GA4 ?? '', {}, [], 5000);
let GA: GA4ReactResolveInterface | null = null;

ga4react.initialize().then(
  ga4 => (GA = ga4),
  _ => _
);

export const gaPageTracker = (path: string) => {
  try {
    GA?.pageview(path);
  } catch (e) {
    console.log(e);
  }
};
