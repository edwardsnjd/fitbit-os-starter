/**
 * @file A collection of utilities for interacting with the Fitbit API.
 * (companion app only)
 */

/**
 * The supplied access token has expired. 
 */
export class ExpiredAccessTokenError extends Error { }

/**
 * Fetch a user's sleep data.
 *
 * @param {string} accessToken - an OAuth access token for the user
 * @param {date} date - the date to query
 * @return Promise<object> - a promise that resolves to the sleep data
 * or rejects with any error that occurs.
 */
export const fetchSleepDataForDate = (accessToken, date) =>
  fetch(getUrlForSleepDataOnDate(date), {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${accessToken}` },
  })
    .then(res => res.json())
    .then(sleepData => {
      console.log('Sleep data ' + JSON.stringify(sleepData));
      if (sleepData.summary) {
        return sleepData;
      }
      
      const isTokenExpired = (sleepData.errors || []).find(e => e.errorType === 'expired_token');
      if (isTokenExpired) {
        throw new ExpiredAccessTokenError('Access token expired');
      }

      throw new Error('Problem getting Fitbit sleep data');
    });

const getUrlForSleepDataOnDate = (date) =>
  // See Fitbit sleep API docs - https://dev.fitbit.com/reference/web-api/sleep/
  `https://api.fitbit.com/1.2/user/-/sleep/date/${ toISO(date) }.json`;

const toISO = (date) =>
  `${ date.getFullYear() }-${ date.getMonth() + 1 }-${ date.getDate() }`;
