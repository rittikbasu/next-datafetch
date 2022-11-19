import { useState, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation, TableHead } from "./Table.js";

export default function NormalTable(data) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [category, setCategory] = useState("first_name");
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [userdata, setUserdata] = useState(data.data);
  const itemCount = userdata.length;
  const currentItems = userdata.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const fields = [
    "Name",
    "Email",
    "Username",
    "Gender",
    "City",
    "Status",
  ];

  const handleSearch = (e) => {
    // debouncing the search
    setTimeout(() => {
      const keyword = e.target.value.toLowerCase();
      const filteredData = data.data.filter((item) => {
        return (
          item.gender.toLowerCase().startsWith(keyword) ||
          item.subscription.status
            .toLowerCase()
            .startsWith(keyword) ||
          item.first_name.toLowerCase().startsWith(keyword) ||
          item.last_name.toLowerCase().startsWith(keyword) ||
          item.username.toLowerCase().startsWith(keyword) ||
          item.address.city.toLowerCase().startsWith(keyword)
        );
      });
      setCurrentPage(1);
      setUserdata(filteredData);
    }, 200);
  };

  const handleFilters = (e) => {
    if (category !== global) {
      const searchFilter = document.getElementById("search-filter");
      if (
        typeof searchFilter !== "undefined" &&
        searchFilter !== null
      ) {
        searchFilter.selectedIndex = 0;
      }
    }
    setCategory(e.target.value);
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
            href="/supermind"
            className="text-5xl text-[#f34d76] font-semibold leading-tight"
          >
            <span className="text-zinc-300">Normal</span>mind
          </Link>
        </div>
        <SearchBar
          handleSearch={handleSearch}
          handleFilters={handleFilters}
          category={category}
        />
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            {itemCount != 0 && (
              <table className="min-w-full leading-normal">
                <TableHead fields={fields} />
                <tbody>
                  {currentItems.map((user) => (
                    <Row key={user.id} user={user} />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <Navigation
          itemCount={itemCount}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
    </div>
  );
}

const Row = ({ user }, key) => {
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
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-center">
        <p className="text-gray-900 whitespace-no-wrap">
          {user.email}
        </p>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-center">
        <p className="text-gray-900 whitespace-no-wrap">
          {user.username}
        </p>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-center">
        <p className="text-gray-900 whitespace-no-wrap">
          {user.gender}
        </p>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-center">
        <p className="text-gray-900 whitespace-no-wrap">
          {user.address.city}
        </p>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-center">
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
  );
};

const SearchBar = ({ handleFilters, handleSearch, category }) => {
  const filters = ["gender", "status"];
  return (
    <div className="my-2 flex flex-row justify-center">
      <div className="flex flex-row mb-1 sm:mb-0">
        <div className="relative">
          <select
            className="h-full rounded-l border block appearance-none w-full bg-red-200 border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none"
            id="search-category"
            onChange={handleFilters}
          >
            <option value="global">Global</option>
            <option value="gender">Gender</option>
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
              className="h-full rounded-r border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none"
              onChange={handleSearch}
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
              onChange={handleSearch}
            />
          </div>
        )}
      </div>
    </div>
  );
};
