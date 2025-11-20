import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from "@capacitor/barcode-scanner";
import { Capacitor } from "@capacitor/core";

const isDevMode = () => process.env.NODE_ENV !== "production";

export const capacitorMobileDeviceOnly = () => Capacitor.getPlatform() !== "web" || isDevMode();

export const capacitorScanQrCode = async () => {
  if (isDevMode()) {
    return "development scan result";
  }

  const result = await CapacitorBarcodeScanner.scanBarcode({ hint: CapacitorBarcodeScannerTypeHint.ALL });

  return result.ScanResult || "";
};
