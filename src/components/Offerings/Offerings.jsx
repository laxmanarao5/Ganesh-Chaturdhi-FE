import React, { useState, useEffect } from 'react';
import { X, SlidersHorizontal, Plus, Edit, Trash, Rss } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { fetchUsers, filterResults } from '../../../api/common';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Offerings.css'
import { addOffering, deleteOffering, editOffering } from '../../../api/offerings';
import { convertIsoToCustomFormat } from '../../common/timeZoneConvertor';
import { years } from '../../constants/years';

const Offerings = () => {
  const [offeringsData, setOfferingsData] = useState(null)
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const resultsPerPage = 5; // Number of results per page
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: ''
  });
  const [editingItem, setEditingItem] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false);
  
  const monthAbbreviations = [
    { value: '01', label: 'Jan' }, { value: '02', label: 'Feb' }, { value: '03', label: 'Mar' },
    { value: '04', label: 'Apr' }, { value: '05', label: 'May' }, { value: '06', label: 'Jun' },
    { value: '07', label: 'Jul' }, { value: '08', label: 'Aug' }, { value: '09', label: 'Sep' },
    { value: '10', label: 'Oct' }, { value: '11', label: 'Nov' }, { value: '12', label: 'Dec' }
  ];

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));

  // Filter the data based on selected filters
  const handleFilter = async() => {
    try {
      if (!selectedYear && !selectedMonth && !selectedDay && !selectedUser) {
        // If no filters are selected, clear the filteredResults
        const currentDate = new Date().toISOString().slice(0, 10).split("-")
        setSelectedYear(currentDate[0])
        setSelectedMonth(currentDate[1])
        setSelectedDay(currentDate[2])
        setFilteredResults([])
        let results = await filterResults(String(currentDate[0]),String(currentDate[1]),String(currentDate[2]),'offerings')
        console.log(results, 'filtered results')
        setFilteredResults(results.data)
        setTotal(results.total)
        setCurrentPage(1); // Reset to first page
        return;
      }
      setLoading(true)
      let results = await filterResults(String(selectedYear),String(selectedMonth),String(selectedDay),'offerings',String(selectedUser))
      console.log(results, 'filtered results')
      setFilteredResults(results.data)
      setTotal(results.total)
      setCurrentPage(1); // Reset to first page when filters change
  } catch(error) {
    console.log(error, 'error')
  } finally {
    setLoading(false)
  }
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
   const handleSubmit = async(values) => {
    try {
    if (editingItem) {
      // deep copy of editing Item
      let editItem = JSON.parse(JSON.stringify(editingItem))
      editItem.amount = values.amount ? values.amount : editItem.amount
      editItem.description = values.description ? values.description : editItem.description
      editItem.name = values.name ? values.name : editItem.name
      setLoading(true)
      const res = await editOffering(editItem)
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
        toast.error('Failed to edit Offerings!', {
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
        description: values.description,
        amount: values.amount,
        name: values.name
      };
      // hit the api
      setLoading(true)
      const res = await addOffering(newItem)
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
        toast.error('Failed to add Offering!', {
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


  // Recalculate filtered results when offeringsData or any filter criteria change
  useEffect(() => {
    handleFilter();
  }, [offeringsData]);

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
  

  

  const handleEdit = (item) => {
    setEditingItem(item); // Set the item to edit
    setIsModalOpen(true); // Open the modal for editing
    // Set form data with the item data
    setFormData({
      description: item.description,
      amount: item.amount
    });
  };
  
  const handleDelete = (item) => {
    setItemToDelete(item); // Set the item to delete
    setIsDeleteConfirmOpen(true); // Open delete confirmation dialog
  };
  
  const confirmDelete = async() => {
    try {
    setIsDeleteConfirmOpen(false);
    const item = {
      amount: itemToDelete.amount,
      created_at: itemToDelete.created_at,
      created_by: itemToDelete.created_by,
      date: itemToDelete.date,
      description: itemToDelete.description,
      id: itemToDelete.id,
      user: itemToDelete.user
    }
    setLoading(true)
    const res = await deleteOffering(item)
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
      toast.error('Failed to delete Offering!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setItemToDelete(null);
    handleFilter()
  } catch(error) {
    console.log(error, 'error')
  } finally {
    setLoading(false)
  }
  };
  
  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setItemToDelete(null);
  }; 
  

  return (
    <div className="mx-auto w-full max-w-4xl">
      {loading && (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      )}
      <div className="px-2 py-6">
        <div className="flex flex-col justify-between md:flex-row">
        <div className="flex items-center space-x-2">
            <p className="text-2xl font-bold">Offerings</p>
            {localStorage.getItem('user_role') === 'Admin' && <button
              type="button"
              onClick={() => {
                setIsModalOpen(true)
                setEditingItem(null)
              }}
              className="text-sm font-semibold bg-black text-white px-3 py-1 rounded flex items-center"
            >
              <Plus className="mr-1 h-4 w-4" />
            </button> 
            }
          </div>
          <div className="ml-3 grid grid-cols-5 gap-x-6 gap-y-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="flex items-center justify-center text-sm font-semibold border p-2 rounded"
            >
              <option value="" disabled>Year</option>
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="flex items-center justify-center text-sm font-semibold border p-2 rounded"
              disabled={!selectedYear}
            >
              <option value="" disabled>Month</option>
              {monthAbbreviations.map(month => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="flex items-center justify-center text-sm font-semibold border p-2 rounded"
              disabled={!selectedMonth}
            >
              <option value="" disabled>Day</option>
              {days.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="flex items-center justify-center text-sm font-semibold border p-2 rounded"
              disabled={!selectedYear}
            >
              <option value="" disabled>User</option>
              {users.map(u => (
                <option key={u.user_id} value={u.email}>{u.name}</option>
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
                }} />
              </div>
            )}
            {selectedMonth && (
              <div className="flex items-center justify-center rounded-md bg-white px-3 py-1 font-medium">
                Month: {selectedMonth} <X className="ml-1 h-4 w-4 cursor-pointer" onClick={() => {
                  setSelectedMonth('');
                }} />
              </div>
            )}
            {selectedDay && (
              <div className="flex items-center justify-center rounded-md bg-white px-3 py-1 font-medium">
                Day: {selectedDay} <X className="ml-1 h-4 w-4 cursor-pointer" onClick={() => {
                  setSelectedDay('');
                }} />
              </div>
            )}
            {selectedUser && (
              <div className="flex items-center justify-center rounded-md bg-white px-3 py-1 font-medium">
                User: {selectedUser} <X className="ml-1 h-4 w-4 cursor-pointer" onClick={() => {
                  setSelectedUser('');
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
      <div className='pt-3 pl-3'>Total amount : {total} </div>
        <div className="space-y-4">
          {filteredResults.length > 0 ? (
            <>
              <div className="space-y-4">
              {currentResults.map((item,index) => (
                <div key={item.id} className="border p-4 rounded-md bg-white shadow-md flex justify-between items-center">
                  <div>
                    <p>Sl no: {indexOfFirstResult + index + 1}</p>
                    <p>Description: {item.description}</p>
                    <p>Name: {item.name}</p>
                    <p>Amount: {item.amount}</p>
                    <p>User: {item.created_by}</p>
                    <p>Date: {convertIsoToCustomFormat(item.created_at)}</p>
                  </div>
                  {localStorage.getItem('user_role') === 'Admin' && (<div className="flex space-x-2">
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
                  </div>)}
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
      <ToastContainer />
{isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white rounded-md p-6 shadow-lg w-11/12 md:w-1/2">
      <h2 className="text-lg font-bold mb-4">
        {editingItem ? 'Edit Offering' : 'Add Offering'}
      </h2>
      <Formik
        initialValues={{
          description: editingItem?.description || '',
          amount: editingItem?.amount || '',
          name: editingItem?.name
        }}
        validationSchema={Yup.object({
          description: Yup.string().required('Description is required'),
          amount: Yup.string().required('Amount is required'),
          name: Yup.string().required('Name is required'),
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
              <label htmlFor="amount" className="block text-sm font-semibold mb-2">Amount/Quantity</label>
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

export default Offerings;