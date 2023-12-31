let data = [
    90, 6, 56, 56, 82, 33, 16, 34, 41, 80, 10, 24, 74, 67, 27, 54, 49, 19,
    1, 25, 98, 89, 26, 24, 3, 29, 78, 49, 99, 64, 82, 74, 8, 13, 73, 13, 85, 91, 45, 56, 75, 50, 5, 77, 15, 33, 12, 38
];

// Function to randomize array
function randomizeArray() {
    data.sort(() => Math.random() - 0.5);
    renderBars();
}

// Insertion Sort
function insertionSort() {
    for (let i = 1; i < data.length; i++) {
        const key = data[i];
        let j = i - 1;
        while (j >= 0 && data[j] > key) {
            data[j + 1] = data[j];
            j--;
        }
        data[j + 1] = key;
    }
    renderBars();
}

// Selection Sort
function selectionSort() {
    for (let i = 0; i < data.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < data.length; j++) {
            if (data[j] < data[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [data[i], data[minIndex]] = [data[minIndex], data[i]];
        }
    }
    renderBars();
}

// Bubble Sort
function bubbleSort() {
    const n = data.length;
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (data[j] > data[j + 1]) {
                [data[j], data[j + 1]] = [data[j + 1], data[j]];
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }
    renderBars();
}

// Quick Sort
function quickSort() {
    function quickSort(arr) {
        if (arr.length <= 1) {
            return arr;
        }

        const pivot = arr[Math.floor(arr.length / 2)];
        const left = [];
        const right = [];

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < pivot) {
                left.push(arr[i]);
            } else if (arr[i] > pivot) {
                right.push(arr[i]);
            }
        }

        return [...quickSort(left), pivot, ...quickSort(right)];
    }
    data = quickSort(data);
    renderBars();
}

// Merge Sort
function mergeSort() {
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

    data = mergeSort(data);

    // Render the sorted bars
    renderBars();
}


// Shell Sort
function shellSort() {
    const n = data.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            const temp = data[i];
            let j = i;

            while (j >= gap && data[j - gap] > temp) {
                data[j] = data[j - gap];
                j -= gap;
            }

            data[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }

    renderBars();
}

// Function to change bar size
function changeSize() {
    const bars = document.querySelectorAll(".bar");
    bars.forEach((bar) => {
        const currentHeight = parseFloat(bar.style.height);
        const newHeight = currentHeight * 0.5;
        bar.style.height = newHeight + "px";
    });
}

// Initial rendering
renderBars();


// To render bars
function renderBars() {
    const barsContainer = document.getElementById("bars-container");
    barsContainer.innerHTML = "";
    const maxHeight = window.innerHeight * 0.8;
    data.forEach((value) => {
        const barContainer = document.createElement("div");
        barContainer.className = "bar-container";

        const bar = document.createElement("div");
        bar.className = "bar";

        const heightPercentage = (value / Math.max(...data)) * 100;
        bar.style.height = `${(heightPercentage * maxHeight) / 100}px`;

        const valueLabel = document.createElement("div");
        valueLabel.className = "value-label";
        valueLabel.textContent = value;

        barContainer.appendChild(bar);
        barContainer.appendChild(valueLabel);

        barsContainer.appendChild(barContainer);
    });
}