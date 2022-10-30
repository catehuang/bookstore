import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ books }) {
  const [searchString, setSearchString] = useState("");
  const [matchedBook, setMatchedBook] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // clean search words when switching pages
  useEffect(() => {
    return () => {
      setSearchString("");
    };
  }, [window.location.href]);

  const handleSearch = (str) => {
    setMatchedBook("");
    setSearchString(str.replace(/[^0-9a-z ]/gi, ""));
    setIsOpen(true);
  };

  const handleClickItemOnResultList = (book) => {
    setMatchedBook(book);
    setSearchString(book.name);
    setIsOpen(false);
  };

  const clickSearchIcon = () => {
    if (searchString !== "" && matchedBook !== "") {
      setSearchString("");
      navigate(`/books/${matchedBook._id}`);
    }
    setIsOpen(false);
  };

  const handleResult = () => {
    if (searchString !== "") {
      const result = books.filter((book) =>
        book.name
          .toLowerCase()
          .includes(searchString.replaceAll(" ", "").toLocaleLowerCase())
      );
      return (
        <div className="w-4/5 md:w-1/3 bg-white mt-5 px-2 text-gray-700 border border-gray-200 rounded-lg text-sm flex flex-col gap-2 absolute z-50 py-2" onMouseLeave={(e) => setIsOpen(false)}>
          {result.length === 0 ? (
            <p>No Results</p>
          ) : (
            result.map((book) => (
              <p
                key={book._id}
                className="flex-wrap line-clamp-1 cursor-default"
                onClick={() => handleClickItemOnResultList(book)}
              >
                {book.name}
              </p>
            ))
          )}
        </div>
      );
    }
  };

  return (
    <div id="searchArea">
      <div className="flex">
        <input
          type="text"
          className="rounded-none rounded-l  text-[#00131a] px-2 w-full md:w-52"
          value={searchString}
          onChange={(e) => handleSearch(e.target.value)}
          // onBlur={(e) => setIsOpen(false)}
        />
        <p
          className="border border-amber-400 rounded-r bg-amber-400 text-[#00131a] px-1"
          onClick={(e) => clickSearchIcon()}
        >
          <SearchIcon />
        </p>
      </div>
      {isOpen && handleResult()}
    </div>
  );
}

export default SearchBar;
