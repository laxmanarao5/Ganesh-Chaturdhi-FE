import React, { useState } from 'react';
import { years } from '../../constants/years';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Reports = () => {
  const types = ['collections', 'expenditure'];

  // Form validation schema
  const validationSchema = Yup.object({
    year: Yup.string().required('Year is required'),
    type: Yup.string().required('Type is required'),
  });

  const handleSubmit = (values) => {
    console.log('Form Data:', values);
    // Handle form submission logic here
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Formik
        initialValues={{ year: '', type: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Generate Report</h2>

            {/* Year field */}
            <div className="mb-4">
              <label htmlFor="year" className="block text-sm font-semibold mb-2">Year</label>
              <Field
                as="select"
                id="year"
                name="year"
                className="border p-2 rounded w-full"
              >
                <option value="" disabled>Select a year</option>
                {years.map((yearOption) => (
                  <option key={yearOption} value={yearOption}>
                    {yearOption}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="year" component="div" className="text-red-600 text-sm" />
            </div>

            {/* Type field */}
            <div className="mb-4">
              <label htmlFor="type" className="block text-sm font-semibold mb-2">Type</label>
              <Field
                as="select"
                id="type"
                name="type"
                className="border p-2 rounded w-full"
              >
                <option value="" disabled>Select a Type</option>
                {types.map((typeOption) => (
                  <option key={typeOption} value={typeOption}>
                    {typeOption}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="type" component="div" className="text-red-600 text-sm" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800"
            >
              Generate Report
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Reports;