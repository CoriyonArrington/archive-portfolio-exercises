import path from 'path';
import { NextConfig } from 'next';

const config: NextConfig = {
  webpack(config) {  // Typing the 'config' parameter for Webpack configuration
    config.resolve.alias['@'] = path.resolve(__dirname);
    config.resolve.alias['@components'] = path.resolve(__dirname, 'components');
    config.resolve.alias['@lib'] = path.resolve(__dirname, 'lib');  // Ensure 'lib' is correctly mapped
    return config;
  },
};

export default config;
