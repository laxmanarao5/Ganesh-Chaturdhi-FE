import React, { useState, useEffect } from 'react';
import { Trash, Plus, Edit } from 'lucide-react';
import { fetchUsers } from '../../../api/common';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addUser, editUser, deleteUser } from '../../../api/users';
import {roles} from '../../constants/users'

const Users = () => {
    
    const [users,setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingItem, setEditingItem] = useState(null);

    const handleEdit = (item) => {
        // Handle edit logic
        console.log('Edit:', item);
    };

    const handleDelete = (item) => {
        // Handle delete logic
        console.log('Delete:', item);
    };

    const handleAddUser = (item) => {
        setIsModalOpen(true)
    };

    // Form submission handler
   const handleSubmit = async(values) => {
    try {
    if (editingItem) {
    // deep copy of editing Item
    let editItem = JSON.parse(JSON.stringify(editingItem))
    editItem.amount = values.amount ? values.amount : editItem.amount
    editItem.description = values.description ? values.description : editItem.description
    setLoading(true)
    const res = await editUser(editItem)
    console.log(res, 'response in edit item')
    if (res.status === 200) {
        toast.success(res.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } else {
        toast.error('Failed to edit user!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    handleFilter()
    setEditingItem(null);
    } else {
    const newItem = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role
    };
    // hit the api
    setLoading(true)
    console.log(newItem)
    const res = await addUser(newItem)
    if (res.status === 200) {
        toast.success(res.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } else {
        toast.error('Failed to add User!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    handleFilter()
    }
    setIsModalOpen(false);
    } catch(error) {
        console.log(error, 'error')
    } finally {
        setLoading(false)
    }
    };  

    useEffect(() => {
        // Define an async function inside useEffect
        const fetchData = async () => {
          try {
            setLoading(true)
            const users = await fetchUsers();
            setUsers(users);
          } catch (error) {
            console.error('Error fetching users:', error);
          } finally {
            setLoading(false)
          }
        };
      
        fetchData(); // Call the async function
      }, []);

      return (
        <div className="flex justify-center">
            {loading && (
                <div className="loader">
                <div className="spinner"></div>
                </div>
            )}
            <div className="w-full max-w-2xl lg:w-1/2 p-4">
                {/* Heading with User text and Plus button */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Users</h2>
                    <button
                        onClick={handleAddUser}
                        className="flex items-center text-sm font-semibold bg-black text-white px-3 py-2 rounded hover:bg-gray-800"
                    >
                        <Plus className="h-4 w-4 mr-1" /> Add User
                    </button>
                </div>

                {users.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {users.map(item => (
                            <div
                                key={item.user_id}
                                className="border p-4 rounded-md bg-white shadow-md flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-semibold">Name: {item.name}</p>
                                    <p>Email: {item.email}</p>
                                    <p>Role: {item.role}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="text-blue-500 hover:text-blue-700"
                                        >
                                        <Edit className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-red-500 text-bold text-center">No users to display</p>
                )}
            </div>
            {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-md p-6 shadow-lg w-11/12 md:w-1/2">
            <h2 className="text-lg font-bold mb-4">
                {editingItem ? 'Edit User' : 'Add User'}
            </h2>
            <Formik
                initialValues={{
                name: editingItem?.name || '',
                email: editingItem?.email || '',
                password: editingItem?.password,
                role: editingItem?.role || ''
                }}
                validationSchema={Yup.object({
                name: Yup.string().required('Name is required'),
                email: Yup.string().required('Email is required'),
                password: Yup.string().required('Password is required'),
                role: Yup.string().required('Role is required'),
                })}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                <Form>
                    <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">Name</label>
                    <Field
                        type="text"
                        id="name"
                        name="name"
                        className="border p-2 rounded w-full"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
                    <Field
                        type="text"
                        id="email"
                        name="email"
                        className="border p-2 rounded w-full"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-semibold mb-2">Password</label>
                    <Field
                        type="password"
                        id="password"
                        name="password"
                        className="border p-2 rounded w-full"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-semibold mb-2">Role</label>
                    <Field
                        as="select"
                        id="role"
                        name="role"
                        className="border p-2 rounded w-full"
                    >
                    <option value="">Role</option>
                        {roles.map(y => (
                        <option key={y} value={y}>{y}</option>
                        ))}
                    </Field>
                    <ErrorMessage name="role" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="bg-gray-200 px-4 py-2 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-black text-white px-4 py-2 rounded"
                    >
                        {editingItem ? 'Update' : 'Add'}
                    </button>
                    </div>
                </Form>
                )}
            </Formik>
            </div>
        </div>
        )}
      </div>
    );
};

export default Users;
