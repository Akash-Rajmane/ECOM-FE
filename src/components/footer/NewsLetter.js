import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



const NewsLetter = () => {
  return (
    <section className='w-100'>
        <h4 className='text-center'>NEWSLETTER</h4>
        <p className='my-3 fw-medium text-center'>Sign Up for Our Newsletter</p>
        <div className="my-2 d-flex gap-2 justify-content-center">
            <Form.Control
            placeholder='Enter Your Email'
            className='w-50'
            />
             <Button variant="outline-primary">
                Subscribe
            </Button>
      </div>
    </section>
  )
}

export default NewsLetter;