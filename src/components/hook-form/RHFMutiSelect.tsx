import { Autocomplete, Input, MultiSelect } from '@mantine/core';
import type { Dispatch, SetStateAction } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface InputProps {
  name: string;
  helperText?: string;
  label?: string;
  placeholder: string;
  type: string;
  maxLength?: number;
  rightLabel?: string;
  className?: string;
  height?: string;
  noResize?: boolean;
}

interface RHFInputAutoCompleteProps extends InputProps {
  name: string;
  options: string[];
  setValue?: Dispatch<SetStateAction<string[]>>;
  helperText?: string;
  isMulti?: boolean;
  creatable?: boolean;
  value?: string[] | string;
  noGap?: boolean;
  rightSection?: React.ReactNode;
}
// NOTE: RHF data.value not working with Mantine MultiSelect, use State instead
export default function RHFMutiSelect(props: RHFInputAutoCompleteProps) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Input.Wrapper
            className='!outline-primary'
            {...field}
            sx={{
              '.mantine-InputWrapper-error': {
                paddingTop: '5px',
              },
            }}
            error={error ? error.message : props.helperText}
          >
            <div
              className={`${
                props.noGap ? 'flex flex-col' : 'flex flex-col gap-[6px]'
              }`}
            >
              <div className='flex justify-between'>
                <p className='text-base font-normal '>{props.label}</p>
              </div>
              {props.isMulti ? (
                <MultiSelect
                  value={props.value as string[]}
                  searchable
                  creatable={props.creatable}
                  size='md'
                  data={props.options || []}
                  getCreateLabel={(query) => `${query}`}
                  onChange={(value) => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    props.setValue && props.setValue(value);
                  }}
                  rightSection={<></>}
                  placeholder={props.placeholder}
                  className='placeholder-light-text-placeholder'
                />
              ) : (
                <Autocomplete
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  size='md'
                  data={props.options || []}
                  className='placeholder-light-text-placeholder'
                  placeholder={props.placeholder}
                  rightSection={props.rightSection}
                />
              )}
            </div>
          </Input.Wrapper>
        );
      }}
    />
  );
}
