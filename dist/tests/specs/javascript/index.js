import { testSuite } from 'manten';
export default testSuite(async ({ describe }, node) => {
    describe('JavaScript', ({ runTestSuite }) => {
        runTestSuite(import('./cjs'), node);
        runTestSuite(import('./esm'), node);
        runTestSuite(import('./dependencies'), node);
    });
});
