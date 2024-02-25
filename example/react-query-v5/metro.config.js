const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

// Find the project and workspace directories
const projectRoot = __dirname;

const monorepo = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(__dirname);

// 1. Watch all files within the monorepo
config.watchFolders = [monorepo];
config.resolver.disableHierarchicalLookup = true;

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepo, "node_modules"),
];

module.exports = config;
