import { testSuite, expect } from 'manten';
export default testSuite(async ({ describe }, node) => {
    describe('tsconfig', ({ test }) => {
        test('jsxFactory & jsxFragmentFactory', async () => {
            const nodeProcess = await node.load('./tsx.tsx', {
                cwd: './tsconfig',
            });
            expect(nodeProcess.stdout).toBe('div null hello world\nnull null goodbye world');
        });
    });
});
