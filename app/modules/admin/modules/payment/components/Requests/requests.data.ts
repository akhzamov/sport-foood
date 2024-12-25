import { usePaymentStore } from "~/modules/admin/stores/payment";

export async function getTypes() {
  const { $paymentRequestsRep } = useNuxtApp();
  const paymentStore = usePaymentStore();
  try {
    const res = await $paymentRequestsRep.getTypes();
    paymentStore.types = res.data;
  } catch (error) {
    console.error("Не удалось получить /crud/payment/types: ", error);
  }
}

export async function getStatuses() {
  const { $paymentRequestsRep } = useNuxtApp();
  const paymentStore = usePaymentStore();
  try {
    const res = await $paymentRequestsRep.getStatuses();
    paymentStore.statuses = res.data;
  } catch (error) {
    console.error("Не удалось получить /crud/payment/statuses: ", error);
  }
}

export async function getPriorities() {
  const { $paymentRequestsRep } = useNuxtApp();
  const paymentStore = usePaymentStore();
  try {
    const res = await $paymentRequestsRep.getPriorities();
    paymentStore.priorities = res.data;
  } catch (error) {
    console.error("Не удалось получить /crud/payment/priorities: ", error);
  }
}

export async function getPayments() {
  const { $paymentRequestsRep } = useNuxtApp();
  const paymentStore = usePaymentStore();
  try {
    const params = {
      "stores[]": Array.isArray(paymentStore.filteredStores)
        ? paymentStore.filteredStores
        : [paymentStore.filteredStores],
      "cities[]": Array.isArray(paymentStore.filteredCities)
        ? paymentStore.filteredCities
        : [paymentStore.filteredCities],
      status: paymentStore.filteredStatus,
      type: paymentStore.filteredType,
      priority: paymentStore.filteredPriority,
      id: paymentStore.filteredPaymentId,
      per_page: paymentStore.perPage,
      page: paymentStore.paymentRequestsPage,
    };
    const res = await $paymentRequestsRep.getPayments(params);
    paymentStore.payments = res.data.payments;
    paymentStore.paymentRequestsPagination = res.data.pagination;
  } catch (error) {
    console.error("Не удалось получить /crud/payments: ", error);
  }
}
