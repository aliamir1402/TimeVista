import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationSize() {
  const initialPage = 0; // Start count from 1980
  const pageCount = 100; // Total number of pages

  const [currentPage, setCurrentPage] = useState(initialPage);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Stack spacing={2}>
        <Pagination
          count={pageCount}
          size="small"
          onChange={handleChange}
          page={currentPage}
        />
      </Stack>
      <p>Current Page: {currentPage}</p>
    </>
  );
}
