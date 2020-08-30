// function colorSwap(arr, left, right, code) {
//   var swap1 = {
//     ...arr[left],
//     valid: code, //1 - code for invalid placement (to be swapped)
//   };
//   var swap2 = {
//     ...arr[right],
//     valid: code, //1 - code for invalid placement (to be swapped)
//   };
//   arr[right] = swap1;
//   arr[left] = swap2;
//   sortedArraysInOrder.push(arr.slice());
// }
// //could merge this function, or simplify it by doing swap 3 times, calling it in partition.
// function swap(items, leftIndex, rightIndex) {
//   colorSwap(items, leftIndex, rightIndex, 1);
//   colorSwap(items, leftIndex, rightIndex, 2);
//   colorSwap(items, leftIndex, rightIndex, 0);
// }

export default function radixSort(arr) {
  const sortedArraysInOrder = [];
  let maxNum = 0;
  for (let num of arr) {
    if (num.value > maxNum) {
      maxNum = num.value;
    }
  }
  maxNum = maxNum * 10;
  let divisor = 10;

  while (divisor < maxNum) {
    let buckets = [...Array(10)].map(() => []); //bucket arrays for each.

    for (let num of arr) {
      //for each number, get current digit and put it in respective bucket computed from math.floor eq.
      buckets[Math.floor((num.value % divisor) / (divisor / 10))].push(num); //this is doing the countingSort on its own

      sortedArraysInOrder.push(arr.slice());
    }

    arr = [].concat.apply([], buckets); //along with this, which is reassigning array with segments of the buckets array
    sortedArraysInOrder.push(arr.slice());

    //some weird syntax to flatten arrays basically
    divisor *= 10;
  }
  //   maxNum.value = maxNum.value / 10;
  console.log(arr);
  return sortedArraysInOrder;
}
