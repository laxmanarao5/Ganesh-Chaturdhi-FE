import React from 'react'

function Home() {
    const data = [
        {
          name: 'Donations',
          amount: 1000
        },
        {
            name: 'Expenditure',
            amount: 200
        },
      ]
  return (
    <>
      <section className="mx-auto w-1/2 max-w-7xl px-4 py-4">
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
                    {data.map((data) => (
                      <tr key={data.name}>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-700">{data.name}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                          {data.amount}
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