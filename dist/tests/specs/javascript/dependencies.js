import { testSuite, expect } from 'manten';
export default testSuite(async ({ describe }, node) => {
    describe('Dependencies', ({ describe }) => {
        describe('module dependency', ({ test }) => {
            const output = '{"default":"default export","namedExport":"named export"}';
            test('Import', async () => {
                const nodeProcess = await node.import('package-module');
                expect(nodeProcess.stdout).toBe(output);
                expect(nodeProcess.stderr).toBe('');
            });
        });
    });
});
