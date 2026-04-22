export const PAGES_LIST_QUERY = `
  *[_type == "page"] | order(title asc) {
    _id,
    title,
    description,
    link
  }
`;
