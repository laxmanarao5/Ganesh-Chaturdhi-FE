import React, { useState, useEffect } from 'react';
import { X, SlidersHorizontal, Plus, Edit, Trash } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Sample data for demonstration purposes
const initialData = [
  { id: 1, date: '2024-01-15', description: 'Item 1', user: 'Nike', amount: '₹20k' },
  { id: 2, date: '2024-02-20', description: 'Item 2', user: 'Adidas', amount: '₹30k' },
  { id: 3, date: '2023-03-10', description: 'Item 3', user: 'Nike', amount: '₹50k' },
  { id: 4, date: '2024-01-25', description: 'Item 4', user: 'Puma', amount: '₹60k' },
  { id: 5, date: '2023-12-30', description: 'Item 5', user: 'Nike', amount: '₹40k' },
  { id: 6, date: '2024-04-15', description: 'Item 6', user: 'Reebok', amount: '₹35k' },
  { id: 7, date: '2023-11-05', description: 'Item 7', user: 'Puma', amount: '₹55k' },
  { id: 8, date: '2024-05-10', description: 'Item 8', user: 'Adidas', amount: '₹45k' },
  { id: 9, date: '2024-06-25', description: 'Item 9', user: 'Nike', amount: '₹70k' },
  { id: 10, date: '2023-09-15', description: 'Item 10', user: 'Reebok', amount: '₹25k' },
  { id: 11, date: '2024-07-30', description: 'Item 11', user: 'Adidas', amount: '₹85k' },
  { id: 12, date: '2023-08-20', description: 'Item 12', user: 'Puma', amount: '₹60k' },
  { id: 13, date: '2024-09-05', description: 'Item 13', user: 'Nike', amount: '₹75k' },
  { id: 14, date: '2024-10-15', description: 'Item 14', user: 'Reebok', amount: '₹50k' },
  { id: 15, date: '2023-12-05', description: 'Item 15', user: 'Adidas', amount: '₹40k' },
  { id: 16, date: '2024-11-20', description: 'Item 16', user: 'Nike', amount: '₹90k' },
  { id: 17, date: '2024-12-10', description: 'Item 17', user: 'Puma', amount: '₹55k' },
  { id: 18, date: '2023-07-15', description: 'Item 18', user: 'Adidas', amount: '₹35k' },
  { id: 19, date: '2024-02-05', description: 'Item 19', user: 'Reebok', amount: '₹45k' },
  { id: 20, date: '2024-03-15', description: 'Item 20', user: 'Nike', amount: '₹65k' }
];

const Donations = () => {
  const [sampleData, setSampleData] = useState(initialData)
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5; // Number of results per page
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: ''
  });
  const [editingItem, setEditingItem] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);


  // Extract unique years, months, days, and users from the data
  const years = [...new Set(sampleData.map(item => new Date(item.date).getFullYear()))];
  const months = [...new Set(sampleData.map(item => new Date(item.date).getMonth() + 1))];
  const days = [...new Set(sampleData.map(item => new Date(item.date).getDate()))];
  const users = [...new Set(sampleData.map(item => item.user))];

  // Filter the data based on selected filters
  const handleFilter = () => {
    if (!selectedYear && !selectedMonth && !selectedDay && !selectedUser) {
      // If no filters are selected, clear the filteredResults
      setFilteredResults([]);
      setCurrentPage(1); // Reset to first page
      return;
    }

    const filtered = sampleData.filter(item => {
      const itemDate = new Date(item.date);
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth() + 1; // JavaScript months are 0-based
      const itemDay = itemDate.getDate();

      return (
        (selectedYear ? itemYear === parseInt(selectedYear) : true) &&
        (selectedMonth ? itemMonth === parseInt(selectedMonth) : true) &&
        (selectedDay ? itemDay === parseInt(selectedDay) : true) &&
        (selectedUser ? item.user === selectedUser : true)
      );
    });
    setFilteredResults(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Pagination logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredResults.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Effect to reset the page number when filteredResults change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredResults]);

   // Form submission handler
   const handleSubmit = (values) => {
    if (editingItem) {
      const updatedData = sampleData.map(item =>
        item.id === editingItem.id
          ? { ...item, description: values.description, amount: values.amount }
          : item
      );
      setSampleData(updatedData);
      setEditingItem(null);
    } else {
      const newItem = {
        id: sampleData.length + 1,
        date: new Date().toISOString().slice(0, 10),
        user: 'Admin',
        description: values.description,
        amount: values.amount
      };
      setSampleData([...sampleData, newItem]);
    }
    
    setIsModalOpen(false);
  };  


  // Recalculate filtered results when sampleData or any filter criteria change
  useEffect(() => {
    handleFilter();
  }, [sampleData]);

  

  const handleEdit = (item) => {
    setEditingItem(item); // Set the item to edit
    setIsModalOpen(true); // Open the modal for editing
    // Set form data with the item data
    setFormData({
      date: new Date().toISOString().slice(0, 10),
      description: item.description,
      user: 'Admin', // need to replace this with current user
      amount: item.amount
    });
  };
  
  const handleDelete = (item) => {
    setItemToDelete(item); // Set the item to delete
    setIsDeleteConfirmOpen(true); // Open delete confirmation dialog
  };
  
  const confirmDelete = () => {
    setSampleData(sampleData.filter(item => item.id !== itemToDelete.id));
    setIsDeleteConfirmOpen(false);
    setItemToDelete(null);
  };
  
  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setItemToDelete(null);
  };  

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="px-2 py-6">
        <div className="flex flex-col justify-between md:flex-row">
        <div className="flex items-center space-x-2">
            <p className="text-2xl font-bold">Donations</p>
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(true)
                setEditingItem(null)
              }}
              className="text-sm font-semibold bg-black text-white px-3 py-1 rounded flex items-center"
            >
              <Plus className="mr-1 h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-5 gap-x-6 gap-y-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="flex items-center justify-center text-sm font-semibold border p-2 rounded"
            >
              <option value="">Year</option>
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="flex items-center justify-center text-sm font-semibold border p-2 rounded"
            >
              <option value="">Month</option>
              {months.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="flex items-center justify-center text-sm font-semibold border p-2 rounded"
            >
              <option value="">Day</option>
              {days.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="flex items-center justify-center text-sm font-semibold border p-2 rounded"
            >
              <option value="">User</option>
              {users.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleFilter}
              className="hidden md:flex items-center justify-center text-sm font-semibold bg-black text-white px-4 py-2 rounded"
            >
              Filter
            </button>
          </div>
        </div>
      </div>
      <div className="rounded-md bg-gray-100 px-2 py-6 md:px-8">
        <div className="space-y-4 md:flex md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-3 md:space-y-0">
            <span className="font-semibold">Filters:</span>
            {selectedYear && (
              <div className="flex items-center justify-center rounded-md bg-white px-3 py-1 font-medium">
                Year: {selectedYear} <X className="ml-1 h-4 w-4 cursor-pointer" onClick={() => {
                  setSelectedYear('');
                  handleFilter(); // Call handleFilter to update the filtered results
                }} />
              </div>
            )}
            {selectedMonth && (
              <div className="flex items-center justify-center rounded-md bg-white px-3 py-1 font-medium">
                Month: {selectedMonth} <X className="ml-1 h-4 w-4 cursor-pointer" onClick={() => {
                  setSelectedMonth('');
                  handleFilter(); // Call handleFilter to update the filtered results
                }} />
              </div>
            )}
            {selectedDay && (
              <div className="flex items-center justify-center rounded-md bg-white px-3 py-1 font-medium">
                Day: {selectedDay} <X className="ml-1 h-4 w-4 cursor-pointer" onClick={() => {
                  setSelectedDay('');
                  handleFilter(); // Call handleFilter to update the filtered results
                }} />
              </div>
            )}
            {selectedUser && (
              <div className="flex items-center justify-center rounded-md bg-white px-3 py-1 font-medium">
                User: {selectedUser} <X className="ml-1 h-4 w-4 cursor-pointer" onClick={() => {
                  setSelectedUser('');
                  handleFilter(); // Call handleFilter to update the filtered results
                }} />
              </div>
            )}
          </div>
          <div>
            <button
              type="button"
              className="hidden rounded-full bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black md:block"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleFilter}
              className="block w-full rounded-md bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black md:hidden"
            >
              Filter
            </button>
          </div>
        </div>
      </div>
      <div className="px-2 py-6">
        <div className="space-y-4">
          {filteredResults.length > 0 ? (
            <>
              <div className="space-y-4">
              {currentResults.map(item => (
                <div key={item.id} className="border p-4 rounded-md bg-white shadow-md flex justify-between items-center">
                  <div>
                    <p>Date: {item.date}</p>
                    <p>Description: {item.description}</p>
                    <p>User: {item.user}</p>
                    <p>Amount: {item.amount}</p>
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
              <div className="flex justify-center space-x-2 mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-black text-white' : 'bg-gray-300 text-black'}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="text-red-500 font-semibold">No results found</p>
          )}
        </div>
      </div>
      {/* Modal */}
{isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white rounded-md p-6 shadow-lg w-11/12 md:w-1/2">
      <h2 className="text-lg font-bold mb-4">
        {editingItem ? 'Edit Donations' : 'Add Donations'}
      </h2>
      <Formik
        initialValues={{
          description: editingItem?.description || '',
          amount: editingItem?.amount || ''
        }}
        validationSchema={Yup.object({
          description: Yup.string().required('Description is required'),
          amount: Yup.string().required('Amount is required'),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-semibold mb-2">Description</label>
              <Field
                type="text"
                id="description"
                name="description"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage name="description" component="div" className="text-red-600 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-semibold mb-2">Amount</label>
              <Field
                type="text"
                id="amount"
                name="amount"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage name="amount" component="div" className="text-red-600 text-sm" />
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
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={cancelDelete}>
          <div className="bg-white p-4 rounded-md w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={cancelDelete}
                className="text-sm font-semibold text-gray-600 border px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donations;