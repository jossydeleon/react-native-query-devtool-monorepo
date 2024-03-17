/**
 * Retrieves the value from a nested object or array based on the provided key path
 * @param data - The root object or array from which to retrieve the value
 * @param keyPath - An array representing the path to the desired value
 * @returns The value located at the specified key path, or undefined
 */
function getNodeValue(data: any, keyPath: string[]) {
  let value = data;

  // This deletes the last `data` item of the array
  const reversedKeyPath = keyPath.slice(0, -1).reverse();

  for (const key of reversedKeyPath) {
    if (typeof value[key] === "object") {
      value = value[key];
    } else {
      return value[key];
    }
  }

  return value;
}

export default getNodeValue;
