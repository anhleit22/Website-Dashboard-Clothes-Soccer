// @mui
import type { FileInputProps } from '@mantine/core';
import { Input } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';
import { FileInput } from '@mantine/core';

// ----------------------------------------------------------------------

type Props = {
  name: string;
  helperText?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  multiple?: boolean;
  clearable?: boolean;
  valueComponent?: FileInputProps;
  unstyled?: boolean;
};

const ValueComponent: FileInputProps['valueComponent'] = ({ value }) => {
  if (value === null) {
    return null;
  }

  if (Array.isArray(value)) {
    return (
      <div className='p-2'>
        {value.map((file, index) => (
          <div
            className='w-[100px] overflow-hidden rounded-xl border bg-slate-400 px-2'
            key={index}
          >
            {file.name}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='w-[100px] overflow-hidden rounded-xl border bg-slate-400 px-2'>
      {value.name}
    </div>
  );
};
export default function RHFInputPicture({
  name,
  helperText,
  label,
  className,
  clearable = true,
  valueComponent,
  unstyled = false,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input.Wrapper error={error ? error?.message : helperText}>
          <FileInput
            variant={unstyled ? 'unstyled' : ''}
            valueComponent={ValueComponent}
            clearable
            label={label}
            accept='image/png,image/jpeg'
            {...field}
            {...other}
            onChange={(event) => {
              field.onChange(event);
            }}
            className={`${className} focus-within:out-line-primary`}
          />
        </Input.Wrapper>
      )}
    />
  );
}
