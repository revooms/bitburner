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

/**
 * Return a formatted representation of the monetary amount using scale sympols
 * (e.g. 6.50M)
 * @param {number} num - The number to format
 * @param {number=} maxSigFigures - (default: 6) The maximum significant figures
 *                  you wish to see (e.g. 123, 12.3 and 1.23 all have 3
 *                  significant figures)
 * @param {number=} maxDecimalPlaces - (default: 3) The maximum decimal places
 *                  you wish to see, regardless of significant figures. (e.g.
 *                  12.3, 1.2, 0.1 all have 1 decimal)
 **/
export function formatNumberShort(num, maxSigFigures = 6, maxDecimalPlaces = 3) {
  const symbols = ["", "k", "m", "b", "t", "qa", "qi", "sx", "sp", "oc", "e30",
                  "e33", "e36", "e39"]
  const sign = Math.sign(num) < 0 ? "-" : ""
  for (var i = 0, num = Math.abs(num); num >= 1000 && i < symbols.length; i++) {
    num /= 1000
  }
  const sigFigs = maxSigFigures - Math.floor(1 + Math.log10(num))
  const fixed = num.toFixed(Math.max(0, Math.min(maxDecimalPlaces, sigFigs)))
  return sign + fixed + symbols[i]
}

/**
 * Return a number formatted with the specified number of significatnt figures
 * or decimal places, whichever is more limiting.
 * @param {number} num - The number to format
 * @param {number=} minSigFigures - (default: 6) The minimum significant figures
 *                  you wish to see (e.g. 123, 12.3 and 1.23 all have 3
 *                  significant figures)
 * @param {number=} minDecimalPlaces - (default: 3) The minimum decimal places
 *                  you wish to see, regardless of significant figures. (e.g.
 *                  12.3, 1.2, 0.1 all have 1 decimal)
 **/
export function formatNumber(num, minSigFigures = 3, minDecimalPlaces = 1) {
  if ( num == 0.0 )
    return  num

  let sigFigs = Math.max(0, minSigFigures - Math.ceil(Math.log10(num)))
  return num.toFixed(Math.max(minDecimalPlaces, sigFigs))
}

/**
 * Formats some RAM amount as a round number of GB with thousands separators
 * e.g. `1,028 GB`
 * @param {number} n - the number to format
 */
export function formatRam(n) {
  if (n < 1e3) return formatNumber(n, 3, 0) + 'GB'
  if (n < 1e6) return formatNumber(n / 1e3, 3, 0) + 'TB'
  if (n < 1e9) return formatNumber(n / 1e6, 3, 0) + 'PB'
  if (n < 1e12) return formatNumber(n / 1e9,3, 0) + 'EB'
  return `${Math.round(n).toLocaleString()} GB`;
}

/**
 * Format a duration (in milliseconds) as e.g. '1h 21m 6s' for big durations or
 * e.g '12.5s' / '23ms' for small durations
 **/
export function formatDuration(duration) {
    if (duration < 1000) return `${duration.toFixed(0)}ms`
    const portions = [];
    const msInHour = 1000 * 60 * 60;
    const hours = Math.trunc(duration / msInHour);
    if (hours > 0) {
        portions.push(hours + 'h');
        duration -= (hours * msInHour);
    }
    const msInMinute = 1000 * 60;
    const minutes = Math.trunc(duration / msInMinute);
    if (minutes > 0) {
        portions.push(minutes + 'm');
        duration -= (minutes * msInMinute);
    }
    let seconds = (duration / 1000.0)
    // Include millisecond precision if we're on the order of seconds
    seconds = (hours == 0 && minutes == 0) ? seconds.toPrecision(3) : seconds.toFixed(0);
    if (seconds > 0) {
        portions.push(seconds + 's');
        duration -= (minutes * 1000);
    }
    return portions.join(' ');
}

/** Generate a hashCode for a string that is pretty unique most of the time */
export function hashCode(s) {
  return s.split("").reduce(function (a, b) {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
}
