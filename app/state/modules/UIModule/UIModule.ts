import { GlobalStateApiType } from "../../GlobalStateTypes";

export const UIModule = ({ set, get }: GlobalStateApiType) => {
  return {
    isIframeActive: null,
    setIsIframeActive: (isIframeActive: string | null) => {
      set({ isIframeActive: isIframeActive });
    },
    closePreview: () => set({ isIframeActive: null }),
  };
};
