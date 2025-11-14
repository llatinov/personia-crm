import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.personia_crm",
  appName: "@personia-crm/app",
  webDir: "packages/app/dist",
  server: {
    androidScheme: "https",
    iosScheme: "https"
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    },
    StatusBar: {
      overlaysWebView: false,
      style: "DARK",
      backgroundColor: "#000000"
    }
  },
  android: {
    path: "packages/android"
  }
};

export default config;
