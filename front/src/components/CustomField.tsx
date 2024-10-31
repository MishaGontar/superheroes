import {Field, FieldInputProps, FieldMetaProps} from "formik";
import {Input, Textarea} from "@nextui-org/react";

interface CustomFieldProps {
    name: string;
    label: string;
    placeholder: string;
    fullWidth?: boolean;
    componentType?: 'input' | 'textarea';
    inputType?: string;
    errorMessage: string;
}

interface FieldProps {
    field: FieldInputProps<string>;
    meta: FieldMetaProps<string>;
}

export function CustomField({
                                name,
                                label,
                                placeholder,
                                fullWidth = true,
                                componentType = 'input',
                                inputType = 'text',
                                errorMessage
                            }: CustomFieldProps) {
    return (
        <Field name={name}>
            {({field, meta}: FieldProps) =>
                componentType === 'textarea'
                    ? (<Textarea
                        {...field}
                        label={label}
                        placeholder={placeholder}
                        labelPlacement="outside"
                        fullWidth={fullWidth}
                        errorMessage={errorMessage}
                        isInvalid={!!meta.error && meta.touched}
                    />)
                    : (
                        <Input
                            {...field}
                            type={inputType}
                            label={label}
                            placeholder={placeholder}
                            labelPlacement="outside"
                            fullWidth={fullWidth}
                            errorMessage={errorMessage}
                            isInvalid={!!meta.error && meta.touched}
                        />
                    )
            }
        </Field>
    );
}