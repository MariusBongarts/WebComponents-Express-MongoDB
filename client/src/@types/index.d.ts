/**
 * Custom type definitions which are included in the tsconfig.ts under `typeRoots`
 */

declare module '*.svg' {
  const content: string;
  export default content;
}
