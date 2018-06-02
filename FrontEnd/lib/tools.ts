let hasOwnProperty = Object.prototype.hasOwnProperty;

export function swap(arr: any[], idx1: number, idx2: number) {
  arr[idx1] = arr.splice(idx2, 1, arr[idx1])[0];
  return arr;
}

export function topIndex(arr: any[], idx: number) {
  const length = arr.length;
  if (idx >= length - 1) {
    return arr;
  }
  for (let i = idx; i < length - 1; i++) {
    swap(arr, i, i + 1);
  }
  return arr;
}

export function bottomIndex(arr: any[], idx: number) {
  if (idx <= 0) {
    return arr;
  }
  for (let i = idx; i > 0; i--) {
    swap(arr, i, i - 1);
  }
  return arr;
}

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
export function is(x: any, y: any) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
export function shallowEqual(objA: any, objB: any) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  let keysA = Object.keys(objA);
  let keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

export function debounce(fn: Function, delay: number) {
  let timer: any = null;
  return function () {
    let args = arguments;
    let context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}