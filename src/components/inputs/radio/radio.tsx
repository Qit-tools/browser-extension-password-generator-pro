import { Field, Input, Label } from "@headlessui/react";

import { useId } from "preact/hooks";

interface Props {
  label: string;
  checked?: boolean;
  onChange?: (event: Event) => void;
}

export default function NativeInputRadio(props: Props) {
  const { label, ...restProps } = props;
  const inputId = useId();

  return (
    <Field class="flex items-center">
      <Input
        id={inputId}
        {...restProps}
        name="notification-method"
        type="radio"
        class="h-4 w-4 cursor-pointer border-indigo-300 bg-indigo-50 text-indigo-600 ring-indigo-800 focus:ring-indigo-600 dark:border-indigo-500 dark:bg-indigo-800 dark:ring-indigo-600"
      />
      <Label
        htmlFor={inputId}
        class="mx-2 block cursor-pointer font-medium leading-6"
      >
        {label}
      </Label>
    </Field>
  );
}
