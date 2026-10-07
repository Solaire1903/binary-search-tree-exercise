/**
 * Sorts an array recursively with the Merge Sort algorithm
 * @param {array} array The array to be sorted
 * @returns The sorted array
 */
const mergeSort = (array) => {
  //Base Case
  if (array.length <= 1) return array;

  //Recursive Case

  //Split array in two halves
  const splitIndex = Math.floor(array.length / 2);
  let leftHalf = array.slice(0, splitIndex);
  let rightHalf = array.slice(splitIndex);

  //Sort halves
  leftHalf = mergeSort(leftHalf);
  rightHalf = mergeSort(rightHalf);

  let sortedArray = [];
  let leftIndex = 0;
  let rightIndex = 0;

  //Compare sorted halves and build the sorted array
  while (leftIndex < leftHalf.length && rightIndex < rightHalf.length) {
    const leftValue = leftHalf[leftIndex];
    const rightValue = rightHalf[rightIndex];

    if (leftValue <= rightValue) {
      sortedArray.push(leftValue);
      leftIndex++;
    } else {
      sortedArray.push(rightValue);
      rightIndex++;
    }
  }

  //Add the remaining sorted values to the sorted array
  sortedArray = sortedArray.concat(leftHalf.slice(leftIndex));
  sortedArray = sortedArray.concat(rightHalf.slice(rightIndex));

  return sortedArray;
};

export default mergeSort;
