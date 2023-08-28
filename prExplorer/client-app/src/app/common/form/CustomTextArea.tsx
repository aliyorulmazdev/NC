import { useField } from 'formik';
import React from 'react';
import { Form, Label } from 'semantic-ui-react';

interface CustomTextAreaProps {
    placeholder: string;
    name: string;
    rows: number;
    label?: string;
}

export default function CustomTextArea(customTextAreaProps: CustomTextAreaProps) {
    const [field, meta] = useField(customTextAreaProps.name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{customTextAreaProps.label}</label>
            <textarea {...field} {...customTextAreaProps} />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null }
        </Form.Field>
    )
}