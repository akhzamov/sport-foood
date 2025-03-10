import { useMainStore } from "~/stores/main";
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

  const openNewTab = (id: string, name: string) => {
    const adminStore = useAdminStore();
    const mainStore = useMainStore();
    const exists = adminStore.activeOpenTabs.some((item) => item.id === id);

    if (exists) {
      mainStore.alertShow = true;
      mainStore.alertShowType = "error";
      mainStore.alertShowTitle = "Ошибка";
      mainStore.alertShowText =
        "Нельзя открыть несколько одинаковых окон! Закройте или сохраните предыдущее окно";
    } else {
      adminStore.activeOpenTabs.unshift({
        id,
        title: "Новый",
        name: name,
      });
      adminStore.activeOpenTab = id;
    }
  };
  const openEditTab = (id: number, textId: string, name: string) => {
    const adminStore = useAdminStore();
    const exists = adminStore.activeOpenTabs.some((item) => item.id === textId);

    if (exists) {
      adminStore.activeOpenTab = textId;
    } else {
      adminStore.activeOpenTabs.unshift({
        id: textId,
        title: `#${id}`,
        name: name,
      });
      adminStore.activeOpenTab = textId;
      adminStore.openUser = id;
    }
  };

  return {
    closeTab,
    openNewTab,
    openEditTab,
  };
};
