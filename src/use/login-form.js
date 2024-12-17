import { computed, watch } from "vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";

export function useLoginForm() {
  const { handleSubmit, isSubmitting, submitCount } = useForm();

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

  const onSubmit = handleSubmit((values) => {});

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
