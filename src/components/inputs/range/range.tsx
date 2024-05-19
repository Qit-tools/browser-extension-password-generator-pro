import { Field, Input, Label } from "@headlessui/react";

import { useId } from "preact/hooks";

interface Props {
  label: string;
  value: number;
  max?: number;
  min?: number;
  step?: number;
  onChange?: (value: Event) => void;
}

export default function InputRange(props: Props) {
  const { label, ...restProps } = props;
  const inputId = useId();
  return (
    <div class="w-full max-w-md">
      <Field>
        <Label htmlFor={inputId} class="text-xs font-medium">
          {label} ({restProps.value})
        </Label>
        <Input
          id={inputId}
          {...restProps}
          type="range"
          class="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-300 accent-indigo-500 dark:bg-gray-600"
        />
      </Field>
    </div>
  );
}
