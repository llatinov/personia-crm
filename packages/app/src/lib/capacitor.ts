import { App } from "@capacitor/app";
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from "@capacitor/barcode-scanner";
import { Capacitor } from "@capacitor/core";
import { CapacitorCalendar, CreateEventOptions } from "@ebarooni/capacitor-calendar";
import { Paths } from "./consts";

const isWeb = Capacitor.getPlatform() === "web";
export const isDevMode = process.env.NODE_ENV !== "production";
export const capacitorMobileDeviceOnly = !isWeb || isDevMode;

export const capacitorScanQrCode = async () => {
  if (isDevMode) {
    return "development scan result";
  }

  const result = await CapacitorBarcodeScanner.scanBarcode({ hint: CapacitorBarcodeScannerTypeHint.ALL });

  return result.ScanResult || "";
};

export const capacitorBackButtonHandler = (getCurrentPath: () => string, goBack: () => void) => {
  if (isWeb) {
    return;
  }

  App.addListener("backButton", () => {
    const currentPath = getCurrentPath();

    if (currentPath === Paths.HOME) {
      App.exitApp();
    } else {
      goBack();
    }
  });
};

export const capacitorAddEventToCalendar = async (eventDetails: CreateEventOptions) => {
  if (isDevMode) return;

  await CapacitorCalendar.createEventWithPrompt(eventDetails);
};

export const capacitorOpenCalendar = async (startDate: Date) => {
  if (isDevMode) return;

  await CapacitorCalendar.openCalendar({ date: startDate.getTime() });
};
