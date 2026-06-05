export interface UIModuleTypes {
  isIframeActive: string | null;
  setIsIframeActive: (isIframeActive: string | null) => void;
  closePreview: () => void;
}
