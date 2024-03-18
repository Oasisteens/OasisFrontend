import Fuse from "fuse.js";

const fuseOptions = {
  isCaseSensitive: false,
  includeScore: false,
  shouldSort: true,
  includeMatches: false,
  findAllMatches: false,
  minMatchCharLength: 2,
  location: 0,
  threshold: 0.6,
  distance: 100,
  useExtendedSearch: false,
  ignoreLocation: false,
  ignoreFieldNorm: false,
  fieldNormWeight: 1,
  keys: ["title", "username"],
};

export default function search(list, pattern) {
  const fuse = new Fuse(list, fuseOptions);
  return fuse.search(pattern);
}