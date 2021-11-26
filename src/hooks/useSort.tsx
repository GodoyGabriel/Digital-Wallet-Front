import { useState, useEffect } from "react";
import { sort } from "../types/Types";

const useSort = (data: any[], sort: sort) => {
  const [sortedData, setSortedData] = useState(data);

  useEffect(() => {
    sortSelector();
    // eslint-disable-next-line
  }, [data]);

  const sortSelector = () => {
    const sortType = {
      all: () => {
        const sorted = data.sort((item: any) => {
          if (!item.fav) {
            return 1;
          } else {
            return -1;
          }
        });
        setSortedData(sorted);
      },
      fav: () => {
        setSortedData(
          data.filter((item: any) => {
            return item.fav;
          })
        );
      },
      old: () => {
        setSortedData(
          data.filter((item: any) => {
            return item.fav;
          })
        );
      },
    };
    sortType[sort]();
  };

  return sortedData;
};

export default useSort;
