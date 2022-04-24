// @ts-check
import { tickets } from './tickets';

const Ticket = {
  daily: tickets[0],
  weekly: tickets[1],
  monthly: tickets[2],
}

// My suggestion for such a function is: for each element of the array, it should look at the next elements until the gap between the current day and the last day matches 30 days. The elements between then should be considered the element's "scope". The scope then should be checked backwards... (GH Copilot: ...to see if the scope is 30 days. If it is, then the scope is a monthly ticket. If it is not, then the scope is a weekly ticket. If it is not, then the scope is a daily ticket.)
// The question for this backwards check: can we save money by buying the monthly ticket instead of ?

/**
 * @param {number[]} days a sorted array of day number (1 to Infinity)
 * @returns {number}
 */
export function findLowestTotalPrice(days) {
  let total = 0;
  for (let i = 0; i < days.length; i++) {
    const currentDay = days[i];
    const scope = [];
    let scopeSum = 0;

    let k = 0;
    let dayToAddToScope = days[i + k];
    while (dayToAddToScope && scopeSum < Ticket.monthly.days) {
      scope.push(dayToAddToScope);
      scopeSum += (dayToAddToScope - currentDay);
      k++;
      dayToAddToScope = days[i + k];
    }
    console.log(scope.length);

    let resultForThisScope = Infinity;
    if (scope.length <= 3) {
      resultForThisScope = scope.length * Ticket.daily.price;
    } else if (scope.length > 22) {
      resultForThisScope = Ticket.monthly.price;
    }
    total += resultForThisScope;
  }
  return total;
}
