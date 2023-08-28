import { useField } from 'formik';
import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';

interface CustomSelectInputProps {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
}

export default function CustomSelectInput(customSelectInputProps: CustomSelectInputProps) {
    const [field, meta, helpers] = useField(customSelectInputProps.name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{customSelectInputProps.label}</label>
            <Select clearable options={customSelectInputProps.options} value={field.value || null} onChange={(e, d) => helpers.setValue(d.value)}
            onBlur={() => helpers.setTouched(true)}
            placeholder={customSelectInputProps.placeholder}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null }
        </Form.Field>
    )
}