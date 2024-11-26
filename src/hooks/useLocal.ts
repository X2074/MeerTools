import { watch, ref, onUnmounted } from 'vue';
import i18n from "@/i18n";
const { locale } = i18n.global;
export function useLocalWatch(cb) {
  const fn = watch(locale, cb);
  const fner = ref(fn);
  onUnmounted(() => {
    fner.value();
  });
  return fner;
}
export function useLocal() {
  return locale.value;
}