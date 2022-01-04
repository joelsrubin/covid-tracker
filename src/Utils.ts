/***********************************************************
 * Helper Functions to Facilitate Fetching with ReactQuery *
 ***********************************************************/

export const fetchGraphs = (): Promise<void> => {
  return fetch(`/.netlify/functions/graphData`).then((res) => res.json());
};

export const fetchLanding = (): Promise<void> => {
  return fetch('/.netlify/functions/data').then((res) => res.json());
};
