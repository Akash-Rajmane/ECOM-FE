import React from 'react';
import { Form } from 'react-bootstrap';

const Input = React.forwardRef(({ id, label, type, ...props }, ref) => {
    return (
        <Form.Group controlId={id} className='d-flex justify-content-start align-items-center gap-3'>
            <Form.Label className='fw-bold fs-4'>{label}</Form.Label>
            <Form.Control
                type={type}
                ref={ref}
                {...props}
                style={{width:"4rem",padding:"0.5rem"}}
                className='rounded-3 border border-2'
            />
        </Form.Group>
    );
});

export default Input;
