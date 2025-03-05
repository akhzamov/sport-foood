import { useAdminStore } from "../stores/admin";

export const useTabs = () => {
  function closeTab(tabId: string) {
    const adminStore = useAdminStore();
    const index = adminStore.activeOpenTabs.findIndex(
      (tab) => tab.id === tabId
    );
    if (index !== -1) {
      // Выбираем следующий или предыдущий таб при закрытии
      const nextTab = adminStore.activeOpenTabs[index + 1];
      const prevTab = adminStore.activeOpenTabs[index - 1];

      if (nextTab) {
        adminStore.activeOpenTab = nextTab.id;
        const match = nextTab.title.match(/\d+$/);
        const numId = match ? Number(match[0]) : null;
        if (numId) {
          adminStore.openUser = numId;
        }
      } else if (prevTab) {
        adminStore.activeOpenTab = prevTab.id;
        const match = prevTab.title.match(/\d+$/);
        const numId = match ? Number(match[0]) : null;
        if (numId) {
          adminStore.openUser = numId;
        }
      } else {
        adminStore.activeOpenTab = "";
      }
      // Удаляем таб
      adminStore.activeOpenTabs.splice(index, 1);
    }
  }

  return {
    closeTab,
  };
};
