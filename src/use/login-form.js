import { computed, watch } from "vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export function useLoginForm() {
  const { handleSubmit, isSubmitting, submitCount } = useForm();
  const store = useStore();
  const router = useRouter();

  const {
    value: email,
    errorMessage: emailError,
    handleBlur: emailBlur,
  } = useField(
    "email",
    yup
      .string()
      .trim()
      .required("Пожалуйста введите email")
      .email("Необходимо ввести корректный email")
  );

  const MIN_LENGTH = 6;

  const {
    value: password,
    errorMessage: passwordError,
    handleBlur: passwordBlur,
  } = useField(
    "password",
    yup
      .string()
      .trim()
      .required("Пожалуйста введите пароль")
      .min(MIN_LENGTH, `Пароль не может быть меньше ${MIN_LENGTH} символов`)
  );

  const isTooManyAttempts = computed(() => submitCount.value >= 3);

  watch(isTooManyAttempts, (val) => {
    if (val) {
      setTimeout(() => (submitCount.value = 0), 1500);
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await store.dispatch("auth/login", values);
      router.push("/");
    } catch (e) {}
  });

  return {
    email,
    emailError,
    emailBlur,
    password,
    passwordError,
    passwordBlur,
    onSubmit,
    isSubmitting,
    isTooManyAttempts,
  };
}
