let sortedArraysInOrder = [];


function colorSwap(arr, left, right, code) {
    var swap1 = {
        ...arr[left],
        valid: code, //1 - code for invalid placement (to be swapped)
    }
    var swap2 = {
        ...arr[right],
        valid: code, //1 - code for invalid placement (to be swapped)
    }
    arr[right] = swap1;
    arr[left] = swap2;
    sortedArraysInOrder.push(arr.slice());
}
//could merge this function, or simplify it by doing swap 3 times, calling it in partition. 
function swap(items, leftIndex, rightIndex) {
    colorSwap(items, leftIndex, rightIndex, 1);
    colorSwap(items, leftIndex, rightIndex, 2);
    colorSwap(items, leftIndex, rightIndex, 0);
}

function partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)], //middle element
        i = left, //left pointer
        j = right; //right pointer
    while (i <= j) {
        while (items[i].value < pivot.value) {
            i++;
        }
        while (items[j].value > pivot.value) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

function quickSortMain(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSortMain(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSortMain(items, index, right);
        }
    }
    return items;
}
export default function quickSort(items, left, right) {
    sortedArraysInOrder = [];
    quickSortMain(items, left, right);
    return sortedArraysInOrder;
}