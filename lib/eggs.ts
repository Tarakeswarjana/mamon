export const EGG_EVENT = "care:egg";

export function showEgg(message: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent(EGG_EVENT, { detail: message }));
}
