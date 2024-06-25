export const withResource = (resource, res) => {
  try {
    res(resource);
  } finally {
    resource.close();
  }
};
