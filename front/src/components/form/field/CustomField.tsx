import {Field, FieldInputProps, FieldMetaProps} from "formik";
import {Input, Textarea} from "@nextui-org/react";
import {memo} from "react";

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

const labelPlacementOptions = ["outside", "outside-left", "inside"] as const;

function CustomField({
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
            {({field, meta}: FieldProps) => {
                const isError = !!meta.error && meta.touched;
                const commonProps = {
                    ...field,
                    label,
                    placeholder,
                    labelPlacement: "outside" as typeof labelPlacementOptions[number],
                    fullWidth,
                    isInvalid: isError,
                    errorMessage: isError ? errorMessage : undefined,
                };

                return componentType === 'textarea'
                    ? <Textarea {...commonProps} />
                    : <Input type={inputType} {...commonProps} />;
            }}
        </Field>
    );
}

export default memo(CustomField);
