/// <reference types="react-scripts" />

declare module 'assets/cats.json' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const catsData: Array<string>;
  export default catsData;
}
