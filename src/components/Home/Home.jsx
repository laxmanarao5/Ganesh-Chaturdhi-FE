import React, { useState, useEffect } from 'react';
import { filterResults } from '../../../api/common';
import { getHomePageData } from '../../../api/home';

function Home() {
  const [homeData, setHomeData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchData = async () => {
      try {
        setLoading(true)
        let results = await getHomePageData()
        setHomeData(results)
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false)
      }
    };
  
    fetchData();
  }, []);
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
      {loading && (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      )}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Expenditures And Donations</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all expenditures and donations. You can view all of them here.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-bold text-gray-700"
                      >
                        Title
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-bold text-gray-700"
                      >
                        Total Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {homeData.map((data) => (
                      <tr key={data.header}>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-700">{data.header}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                          {data.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home