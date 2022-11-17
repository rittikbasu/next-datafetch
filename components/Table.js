import { useState, Fragment } from "react";
import Image from "next/image";

export default function Table(data) {
  const filters = ["gender", "status"];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [category, setCategory] = useState("first_name");
  const [status, setStatus] = useState("active");
  const [gender, setGender] = useState("male");
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const searchData = (query) => {
    console.log(query);
    if (!query) {
      return data.data;
    }

    function searchInCategory(user) {
      let filters;
      if (category === "city") {
        filters = user.address[category]
          .toLowerCase()
          .startsWith(query);
      } else if (category === "status") {
        console.log("status");
        filters = user.subscription.status
          .toLowerCase()
          .startsWith(query);
      } else {
        filters = user[category].toLowerCase().startsWith(query);
      }
      return filters;
    }

    let filteredData = data.data
      .filter((user) => searchInCategory(user))
      .map((user) => {
        return user;
      });

    setCurrentPage(1);
    return filteredData;
  };

  const [userdata, setUserdata] = useState(searchData());
  const itemCount = userdata.length;
  const currentItems = userdata.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleSearchChange = (e) => {
    setUserdata(searchData(e.target.value.toLowerCase()));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleFilterChange = (e) => {
    if (category === "status") {
      setStatus(e.target.value);
    } else {
      setGender(e.target.value);
    }
    setUserdata(searchData(e.target.value));
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

  const getStatusColour = (status) => {
    if (status === "Active") {
      return "bg-green-200";
    } else if (status === "Pending") {
      return "bg-yellow-200";
    } else if (status === "Blocked") {
      return "bg-red-300";
    } else {
      return "bg-zinc-300";
    }
  };
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div>
        <div className="py-8 text-center">
          <h1 className="text-5xl text-[#f34d76] font-semibold leading-tight">
            <span className="text-blue-700">Super</span>mind
          </h1>
        </div>
        <div className="my-2 flex flex-row justify-center">
          <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative">
              <select
                className="appearance-none h-full rounded-l border block appearance-none w-full bg-red-200 border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-gray-500"
                id="search-category"
                onChange={handleCategoryChange}
              >
                <option value="first_name">First Name</option>
                <option value="last_name">Last Name</option>
                <option value="email">Email</option>
                <option value="username">Username</option>
                <option value="gender">Gender</option>
                <option value="city">City</option>
                <option value="status">Status</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            {filters.includes(category) ? (
              <div className="relative">
                <select
                  className="appearance-none h-full rounded-r border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-gray-500"
                  onChange={handleFilterChange}
                  id="search-filter"
                >
                  {category === "status" ? (
                    <Fragment>
                      <option disabled selected>
                        Choose
                      </option>
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="blocked">Blocked</option>
                      <option value="idle">Idle</option>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <option disabled selected>
                        Choose
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="agender">Agender</option>
                      <option value="bigender">Bigender</option>
                      <option value="polygender">Polygender</option>
                      <option value="genderfluid">Genderfluid</option>
                      <option value="genderqueer">Genderqueer</option>
                      <option value="non-Binary">Non-binary</option>
                    </Fragment>
                  )}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            ) : (
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
                  className="appearance-none rounded-r border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                  onChange={handleSearchChange}
                />
              </div>
            )}
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
                    Email
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user) => (
                  <tr key={user.id}>
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
                        {user.email}
                      </p>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.username}
                      </p>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.gender}
                      </p>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.address.city}
                      </p>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden
                          className={`absolute inset-0 ${getStatusColour(
                            user.subscription.status
                          )} opacity-80 rounded-xl`}
                        ></span>
                        <span className="relative text-zinc-800">
                          {user.subscription.status}
                        </span>
                      </span>
                    </td>
                  </tr>
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
