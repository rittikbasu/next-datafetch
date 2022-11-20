import { Fragment } from "react";

export function Navigation({
  itemCount,
  indexOfFirstItem,
  indexOfLastItem,
  currentPage,
  prevPage,
  nextPage,
}) {
  return (
    <Fragment>
      {itemCount != 0 ? (
        <div className="px-5 gap-y-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between">
          <span className="text-xs xs:text-sm text-gray-900">
            Showing {indexOfFirstItem + 1} to{" "}
            {itemCount % 10 === 0
              ? indexOfLastItem
              : itemCount < currentPage * 10
              ? itemCount
              : indexOfLastItem}{" "}
            of {itemCount} Entries
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              onClick={prevPage}
              className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
            >
              Prev
            </button>
            <button
              onClick={nextPage}
              className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-2xl text-gray-500">
          No Data Found
        </div>
      )}
    </Fragment>
  );
}

export function TableHead({ fields }) {
  return (
    <thead>
      <tr>
        {fields.map((field, index) => (
          <th
            key={field}
            className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            {field}
          </th>
        ))}
      </tr>
    </thead>
  );
}
