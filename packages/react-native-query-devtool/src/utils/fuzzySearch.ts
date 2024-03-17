/**
 * Checks if a value or nested values in an object or array contain a specified search term.
 * @param value - The value or object/array to check.
 * @param searchTerm - The search term to look for in the value or nested values.
 * @returns - Returns true if the search term is found, else false.
 */
const checkProperty = (value: any, searchTerm: string): boolean => {
  if (typeof value === "string" && value.toLowerCase().includes(searchTerm)) {
    return true;
  }
  if (typeof value === "object") {
    return Object.values(value).some((nestedValue) =>
      checkProperty(nestedValue, searchTerm),
    );
  }
  if (Array.isArray(value)) {
    return value.some(
      (item) =>
        typeof item === "string" && item.toLowerCase().includes(searchTerm),
    );
  }
  return false;
};

const fuzzySearch = (searchTerm: string, data: any) => {
  const searchTermLower = searchTerm.toLowerCase();

  if (Array.isArray(data)) {
    return data.filter((obj) =>
      Object.values(obj).some((value) => checkProperty(value, searchTermLower)),
    );
  }

  return data;
};

export default fuzzySearch;
