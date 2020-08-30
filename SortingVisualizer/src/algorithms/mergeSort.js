//clement shows the algorihtm working in a different way, second portion of the array is static.
//multi threading?
let sortedArraysInOrder = [];

function merge(arr, copyOfArray, from, mid, to) {
  let sortedArraysInOrder = [];
  let k = from;
  let i = from;
  let j = mid + 1;

  //loop until elements in right and left runs
  while (i <= mid && j <= to) {
    if (arr[i].value < arr[j].value) {
      let temp = {
        ...arr[i],
        valid: 1,
      };
      copyOfArray[k] = temp;
      sortedArraysInOrder.push(copyOfArray.slice());
      temp = {
        ...arr[i],
        valid: 2,
      };
      copyOfArray[k] = temp;
      sortedArraysInOrder.push(copyOfArray.slice());
      temp = {
        ...arr[i],
        valid: 0,
      };
      copyOfArray[k] = temp;
      sortedArraysInOrder.push(copyOfArray.slice());

      // copyOfArray[k].value = arr[i].value;
      i++;
    } else {
      let temp = {
        ...arr[j],
        valid: 1,
      };
      copyOfArray[k] = temp; //gotta hard copy the cells back to the copyArray(to be changed!)
      sortedArraysInOrder.push(copyOfArray.slice());
      temp = {
        ...arr[j],
        valid: 2,
      };
      copyOfArray[k] = temp;
      sortedArraysInOrder.push(copyOfArray.slice());
      temp = {
        ...arr[j],
        valid: 0,
      };
      copyOfArray[k] = temp;
      sortedArraysInOrder.push(copyOfArray.slice());

      j++;
    }

    k++;
  }
  //copy remaning elements of array onto copy
  while (i < arr.length && i <= mid) {
    const temp = {
      ...arr[i],
    };
    copyOfArray[k] = temp;
    k++;
    i++;
  }
  for (var x = from; x < to + 1; ++x) {
    let temp = {
      ...copyOfArray[x],
      swapped: true,
    };
    arr[x] = temp;
    // sortedArraysInOrder.push(arr.slice());
    // sortedArraysInOrder.push(arr.slice()); //main array is updating and we are logging every iteration
    temp = {
      ...copyOfArray[x],
      swapped: false,
    };
    sortedArraysInOrder.push(arr.slice());

    arr[x] = temp;
  }

  return sortedArraysInOrder;
}

export default function mergeSort(arr) {
  let sortedArraysInOrder = [];
  let copyOfArray = arr.slice(); //copy array
  let m = 1;
  const low = 0;
  const high = arr.length - 1;
  while (m <= high - low) {
    for (var i = 0; i < high; i += 2 * m) {
      let from = i;
      let mid = i + m - 1;
      let to = Math.min(i + 2 * m - 1, high);
      //every subarray change is strung together and appended to the array of arrays
      //console.log(merge(arr, copyOfArray, from, mid, to));
      sortedArraysInOrder.push(...merge(arr, copyOfArray, from, mid, to)); //merge(array, copyOfarray, i, i + m - 1, min(i + 2 * m -1, n-1))
    }
    m = m * 2;
  }
  return sortedArraysInOrder;
}
