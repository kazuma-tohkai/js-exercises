export function shakerSort(array) {
  let top_index = 0;
  let bot_index = array.length - 1;

  // eslint-disable-next-line
  while (true) {
    let last_swap_index = top_index;
    for (let i = top_index; i < bot_index; i++) {
      if (array[i] > array[i + 1]) {
        const temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        last_swap_index = i;
      }
    }
    bot_index = last_swap_index;

    if (top_index === bot_index) break;

    last_swap_index = bot_index;

    for (let i = bot_index; i > top_index; i--) {
      if (array[i] < array[i - 1]) {
        const temp = array[i];
        array[i] = array[i - 1];
        array[i - 1] = temp;
        last_swap_index = i;
      }
    }
    top_index = last_swap_index;

    if (top_index === bot_index) break;
  }
  return array;
}
