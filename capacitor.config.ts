import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sae.handlingapp',
  appName: 'HandlingApp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
