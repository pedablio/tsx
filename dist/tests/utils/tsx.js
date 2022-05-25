import path from 'path';
import { fileURLToPath } from 'url';
import { execaNode } from 'execa';
import getNode from 'get-node';
const __dirname = fileURLToPath(import.meta.url);
const tsxPath = path.join(__dirname, '../../../dist/cli.js');
export const tsx = (options) => execaNode(tsxPath, options.args, {
    extendEnv: false,
    env: {
        ESBK_DISABLE_CACHE: '1',
    },
    nodePath: options.nodePath,
    nodeOptions: [],
    cwd: options.cwd,
    reject: false,
});
export async function createNode(nodeVersion, fixturePath) {
    const node = await getNode(nodeVersion);
    return {
        version: node.version,
        packageType: '',
        get isCJS() {
            return this.packageType === 'commonjs';
        },
        load(filePath, options) {
            return tsx({
                args: [filePath],
                nodePath: node.path,
                cwd: path.join(fixturePath, options?.cwd ?? ''),
            });
        },
        import(filePath, options) {
            return tsx({
                args: [
                    `./import-file${options?.typescript ? '.ts' : '.js'}`,
                    filePath,
                ],
                nodePath: node.path,
                cwd: fixturePath,
            });
        },
        require(filePath, options) {
            return tsx({
                args: [
                    `./require-file${options?.typescript ? '.cts' : '.cjs'}`,
                    filePath,
                ],
                nodePath: node.path,
                cwd: fixturePath,
            });
        },
    };
}
