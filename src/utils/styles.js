// eslint-disable-next-line import/prefer-default-export
export const Padding = (a, b, c, d) => {
  return {
    paddingTop: a,
    paddingRight: b || a,
    paddingBottom: c || a,
    paddingLeft: d || (b || a)
  };
};
