//clean up the swap methods, maybe create utility func
let sortedArraysInOrder = [];

function colorSwap(a, left, right, code) {
    var swap1 = {
        ...a[left],
        valid: code, //1 - code for invalid placement (to be swapped)
    }
    var swap2 = {
        ...a[right],
        valid: code, //1 - code for invalid placement (to be swapped)
    }
    a[right] = swap1;
    a[left] = swap2;
    sortedArraysInOrder.push(a.slice());
}

export default function bubbleSort(a) {
    sortedArraysInOrder = [];
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < a.length - 1; i++) {
            if (a[i].value > a[i + 1].value) {
                colorSwap(a, i, i + 1, 1);
                colorSwap(a, i, i + 1, 2);
                colorSwap(a, i, i + 1, 0);
                swapped = true;
                //swap ids back
            }
        }
    } while (swapped);

    return sortedArraysInOrder
}