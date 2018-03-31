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
  const length = arr.length;
  if (idx <= 0) {
    return arr;
  }
  for (let i = idx; i > 0; i--) {
    swap(arr, i, i - 1);
  }
  return arr;
}