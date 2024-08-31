import React from 'react';
import { Edit, Trash } from 'lucide-react';

const Users = () => {
    const data = [
        {
            id: 1,
            name: 'user1',
            amount: 1000
        },
        {
            id: 2,
            name: 'user2',
            amount: 200
        },
    ];

    const handleEdit = (item) => {
        // Handle edit logic
        console.log('Edit:', item);
    };

    const handleDelete = (item) => {
        // Handle delete logic
        console.log('Delete:', item);
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-2xl lg:w-1/2 p-4">
                <div className="grid grid-cols-1 gap-4">
                    {data.map(item => (
                        <div
                            key={item.id}
                            className="border p-4 rounded-md bg-white shadow-md flex justify-between items-center"
                        >
                            <div>
                                <p className="font-semibold">User: {item.name}</p>
                                <p>Amount: ${item.amount}</p>
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
            </div>
        </div>
    );
};

export default Users;
