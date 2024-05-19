import { Field, Input, Label } from "@headlessui/react";

import { useId } from "preact/hooks";

interface Props {
  label: string;
  description?: string;
  onChange?: (event: Event) => void;
  checked?: boolean;
}

export default function NativeInputCheckbox(props: Props) {
  const { label, description, ...restProps } = props;
  const inputId = useId();

  return (
    <Field class="relative flex items-start rtl:flex-row-reverse">
      <div class="flex h-6 items-center">
        <Input
          {...restProps}
          id={inputId}
          type="checkbox"
          class="h-4 w-4 cursor-pointer rounded border-indigo-300 bg-indigo-50 text-indigo-600 ring-indigo-800 focus:ring-indigo-600 dark:border-indigo-500 dark:bg-indigo-800 dark:ring-indigo-600"
        />
      </div>
      <Label
        htmlFor={inputId}
        class="cursor-pointer px-2 font-medium leading-6"
      >
        {label}
        <p class="text-nowrap text-[10px]/3 font-thin text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </Label>
    </Field>
  );
}
