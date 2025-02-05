import type { Config } from 'jest';

const config: Config = {
    extensionsToTreatAsEsm: [".ts"],
    moduleFileExtensions: ["ts", "js"],
    preset: "ts-jest",
    rootDir: "src",
    testRegex: ".*\\.test\\.ts$"
};

export default config;