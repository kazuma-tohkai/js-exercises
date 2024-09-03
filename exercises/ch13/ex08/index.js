import * as fsPromises from "node:fs/promises";
export async function fetchFirstFileSizeAsync(path) {
  let files = [];
  try {
    files = await fsPromises.readdir(path);
  } catch (err) {
    return err;
  }

  if (files.length === 0) {
    return null;
  } else {
    let stats = null;
    try {
      stats = await fsPromises.stat(path + "/" + files[0]);
      return stats.size;
    } catch (err) {
      return err;
    }
  }
}

export async function fetchSumOfFileSizesAsync(path) {
  let files = [];
  try {
    files = await fsPromises.readdir(path);
  } catch (err) {
    return err;
  }

  let total = 0;
  const promises = [...files].map((file) => fsPromises.stat(path + "/" + file));
  const stats = await Promise.all(promises);
  for (const stat of stats) {
    total += stat.size;
  }
  return total;
}
