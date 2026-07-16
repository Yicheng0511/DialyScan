// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

/** @type {import('expo/metro-config').MetroConfig} */
const { assetExts, sourceExts } = config.resolver;

config.resolver.assetExts = [...assetExts, "bin"];
// Optional: Ensure 'bin' isn't accidentally in sourceExts
config.resolver.sourceExts = sourceExts.filter(ext => ext !== "bin");

module.exports = config;
