import fs from 'fs';
import { pathToFileURL } from 'url';
import spawn from 'cross-spawn';
import { ignoreNodeWarnings } from './ignore-node-warnings';
const pathExists = (filePath) => fs.promises.access(filePath).then(() => true, () => false);
const isPathPattern = /^\.|\//;
export const isBinaryPath = async (filePath) => {
    if (isPathPattern.test(filePath)) {
        return false;
    }
    const fileExists = await pathExists(filePath);
    if (fileExists) {
        return false;
    }
    const binaryPath = `./node_modules/.bin/${filePath}`;
    if (await pathExists(binaryPath)) {
        return binaryPath;
    }
    return false;
};
export function runBinary(binaryPath, argv, options) {
    const environment = {
        ...process.env,
        NODE_OPTIONS: `--loader ${pathToFileURL(require.resolve('./loader.js')).toString()}`,
    };
    if (options?.noCache) {
        environment.ESBK_DISABLE_CACHE = '1';
    }
    const stdio = [
        'inherit',
        'inherit',
        'pipe', // stderr
    ];
    if (options?.ipc) {
        // To communicate with parent process
        stdio.push('ipc');
    }
    const childProcess = spawn(binaryPath, argv, {
        // stdio,
        stdio,
        env: environment,
    });
    // Suppress warnings about using experimental features
    childProcess.stderr
        .pipe(ignoreNodeWarnings())
        .pipe(process.stderr);
    return childProcess;
}
