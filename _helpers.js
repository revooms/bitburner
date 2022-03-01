// Copied/stolen from jenheilemann's scripts

/**
 * @param {integer} milliseconds to sleep
 * @cost 0 GB
 */
export function mySleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * @param {NS} ns
 * @param {array} list of loggable functions to disable
 * @cost 0 GB
 */
export function disableLogs(ns, listOfLogs) {
  ['disableLog'].concat(...listOfLogs).forEach(log => ns.disableLog(log));
}

/**
 * @param {NS} ns
 * @cost 0.1 GB
 * @returns {integer} player's money available
 */
export function myMoney(ns) {
  return ns.getServerMoneyAvailable('home')
}

/**
 * @return {object} The player data from localStorage
 * @cost 0 GB
 **/
export function fetchPlayer() {
  return getLSItem('player')
}

// All of the below functions are stolen & reformatted/refactored from Insight's
// helper. They are required to make his scripts work.

/**
 * Return a formatted representation of the monetary amount using scale sympols
 * (e.g. $6.50M)
 * @param {number} num - The number to format
 * @param {number=} maxSigFigures - (default: 6) The maximum significant figures
 *                  you wish to see (e.g. 123, 12.3 and 1.23 all have 3
 *                  significant figures)
 * @param {number=} maxDecimalPlaces - (default: 3) The maximum decimal places
 *                  you wish to see, regardless of significant figures. (e.g.
 *                  12.3, 1.2, 0.1 all have 1 decimal)
 **/
export function formatMoney(num, maxSigFigures = 6, maxDecimalPlaces = 3) {
    let numberShort = formatNumberShort(num, maxSigFigures, maxDecimalPlaces)
    return num >= 0 ? "$" + numberShort : numberShort.replace("-", "-$")
}
