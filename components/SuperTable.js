import { useState, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SuperTable(data) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [userdata, setUserdata] = useState(data.data.data);
  const itemCount = userdata.length;
  const currentItems = userdata.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  console.log(itemCount);
  // function for global search
  const handleSearch = (e) => {
    // debouncing the search
    setTimeout(() => {
      const keyword = e.target.value.toLowerCase();
      const filteredData = data.data.data.filter((item) => {
        return (
          item.first_name.toLowerCase().startsWith(keyword) ||
          item.last_name.toLowerCase().startsWith(keyword) ||
          item.position.toLowerCase().startsWith(keyword) ||
          item.location.toLowerCase().startsWith(keyword) ||
          item.duration.toLowerCase().startsWith(keyword)
        );
      });
      setUserdata(filteredData);
    }, 200);
  };

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // function for previous and next buttons
  const nextPage = () => {
    if (currentPage < Math.ceil(itemCount / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div>
        <div className="py-8 text-center">
          <Link
            href="/"
            className="text-5xl text-[#f34d76] font-semibold leading-tight"
          >
            <span className="text-blue-700">Super</span>mind
          </Link>
        </div>
        <div className="my-2 flex flex-row justify-center">
          <div className="flex flex-row mb-1 sm:mb-0">
            <div className="block relative">
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current text-gray-500"
                >
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                </svg>
              </span>
              <input
                placeholder="Search"
                className="appearance-none rounded border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user) => (
                  <Row key={user.id} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
      </div>
    </div>
  );
}

const Row = ({ user }, key) => {
  return (
    <tr key={key}>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <Image
              className="w-full h-full rounded-full border border-gray-200"
              src={user.avatar}
              width={40}
              height={40}
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">
              {user.first_name} {user.last_name}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {user.position}
        </p>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {user.location}
        </p>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {user.duration}
        </p>
      </td>
    </tr>
  );
};
