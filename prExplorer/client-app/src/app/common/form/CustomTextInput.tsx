import { useField } from 'formik';
import React from 'react';
import { Form, Label } from 'semantic-ui-react';

interface CustomTextInputProps {
    placeholder: string;
    name: string;
    label?: string;
}

export default function CustomTextInput(customTextInputProps: CustomTextInputProps) {
    const [field, meta] = useField(customTextInputProps.name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{customTextInputProps.label}</label>
            <input {...field} {...customTextInputProps} />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null }
        </Form.Field>
    )
}