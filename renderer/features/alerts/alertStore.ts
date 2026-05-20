import { create } from "zustand";
import { AlertType } from "../../types";

type AlertStore = {
  alerts: AlertType[];
  addAlert: (alert: AlertType) => void;
  removeAlert: (id: string) => void;
  clear: () => void;
};

export const useAlertStore = create<AlertStore>((set, get) => ({
  alerts: [],
  addAlert: (alert) => {
    set((state) => ({
      alerts: [alert, ...state.alerts],
    }));

    // ✅ auto-dismiss lives here
    setTimeout(() => {
      const doesExist = !!(get().alerts.find(x => x.id === alert.id))
      if (doesExist) get().removeAlert(alert.id);
    }, 4000);
  },

  removeAlert: (id) => set((state) => ({ alerts: state.alerts.filter((a) => a.id !== id) })),
  clear: () => set({ alerts: [] }),
}));