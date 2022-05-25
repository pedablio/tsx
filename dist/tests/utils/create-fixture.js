import fs from 'fs/promises';
import path from 'path';
import os from 'os';
const temporaryDirectory = path.join(os.tmpdir(), 'esb');
class Fixture {
    path;
    constructor(fixturePath) {
        this.path = fixturePath;
    }
    async createFrom(templatePath) {
        if (await this.exists()) {
            await this.cleanup();
        }
        await fs.mkdir(this.path, {
            recursive: true,
        });
        await fs.cp(templatePath, this.path, {
            recursive: true,
            filter: source => !path.basename(source).startsWith('.'),
        });
    }
    exists(subpath = '') {
        return fs.access(path.join(this.path, subpath)).then(() => true, () => false);
    }
    cleanup() {
        return fs.rm(this.path, {
            recursive: true,
            force: true,
        });
    }
    writeFile(filePath, content) {
        return fs.writeFile(path.join(this.path, filePath), content);
    }
    writeJson(filePath, json) {
        return this.writeFile(filePath, JSON.stringify(json, null, 2));
    }
    readFile(filePath, encoding) {
        return fs.readFile(path.join(this.path, filePath), encoding);
    }
}
let id = 1;
export async function createFixture(fromFixtureTemplatePath) {
    const fixturePath = path.resolve(temporaryDirectory, `${path.basename(fromFixtureTemplatePath)}-${id}`);
    id += 1;
    const fixture = new Fixture(fixturePath);
    await fixture.createFrom(fromFixtureTemplatePath);
    return fixture;
}
