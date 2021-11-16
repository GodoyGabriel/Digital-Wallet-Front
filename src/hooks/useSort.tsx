import React, { useState, useEffect } from "react";
import { sort } from "../types/Types";

const useSort = (data: any[], sort: sort) => {
  const [sortedData, setSortedData] = useState(data);

  useEffect(() => {
    sortSelector();
  }, []);

  const sortSelector = () => {
    switch (sort) {
      case "all":
        const sorted = data.sort((item: any) => {
          if (!item.fav) {
            return 1;
          } else {
            return -1;
          }
        });
        setSortedData(sorted);
        break;
      case "fav":
        setSortedData(
          data.filter((item: any) => {
            return item.fav;
          })
        );
        break;
      case "old":
        setSortedData(
          data.filter((item: any) => {
            return item.fav;
          })
        );
        break;
      default:
        break;
    }
  };

  return sortedData;
};

export default useSort;
