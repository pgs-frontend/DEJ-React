import { useCallback, useEffect, useMemo, useState } from "react";
import Container from "../layouts/Container";
import Select from "react-select";
import moment from "moment/moment";
import { FiMapPin } from "react-icons/fi";
import { useAtom, atom, useSetAtom } from "jotai";
import { searchFilterAtom } from "./HomeBanner";
import { IoIosClose } from "react-icons/io";
import { motion } from "framer-motion";
// import linkedInImage from "@/assets/images/linkedin-icon.png";
import jobIcon from "@/assets/images/job_icon.png";
import { useTranslation } from "react-i18next";
import { LuCalendarCheck } from "react-icons/lu";
import { RiShareBoxFill } from "react-icons/ri";
import { MdAccessTime } from "react-icons/md";
import { PiBagDuotone } from "react-icons/pi";

import useApi from "../../hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import PreLoader from "../preloader/PreLoader";

export const jobsListingAtom = atom([]);

import {
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";

import { Card, Skeleton } from "@heroui/react";

const JobCatergoryList = ({ data, onFilterChanged, activeCategories }) => {
  const list = useMemo(() => {
    const result = data.sort();
    return result;
  }, [data, activeCategories]);

  const onCategory = useCallback(
    (newItem) => {
      let updatedList;

      // Check if an item with the same 'key' as newItem already exists in activeCategories
      const itemExists = activeCategories.some((existingItem) => {
        return existingItem.code === newItem.code;
      });

      if (itemExists) {
        // If it exists, filter it out (remove it)
        updatedList = activeCategories.filter((existingItem) => {
          if (existingItem.code !== newItem.code) {
            return newItem;
          }
        });
      } else {
        // If it doesn't exist, add the new item
        updatedList = [...activeCategories, newItem];
      }

      onFilterChanged({
        current_page: 0,
        job_functions: Array.from(new Set(updatedList.map((item) => item))),
      });
    },
    [activeCategories, onFilterChanged]
  );

  const activeCheck = (code) => {
    const r = activeCategories.some((existingItem) => {
      return existingItem.code === code;
    });

    return r;
  };

  // const onCategory = useCallback(
  //   (value) => {
  //     let list;
  //     if (activeCategories.includes(value)) {
  //       list = activeCategories.filter((item) => item !== value);
  //     } else {
  //       list = [...activeCategories, value];
  //     }
  //     onCategoryClick({
  //       predicted_de_job_category: [...new Set(list)],
  //     });
  //   },
  //   [activeCategories]
  // );

  return (
    <ul className=" jobFunctions  ">
      {list?.map((item, index) => (
        <li className="relative inline-block" key={"category-" + index}>
          <button
            className={`tag ${activeCheck(item.code) ? "active" : ""}`}
            onClick={() => onCategory(item)}
          >
            {item.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

const JobFilter = ({
  companies,
  categories,
  totalJobs,
  onFilterChanged,
  filterData,
}) => {
  // const [filters, setFilters] = useState({});
  const { t } = useTranslation();

  // useEffect(() => {
  //   setFilters(() => {

  //     return {
  //       companies: companies.map((item) => {
  //         return { value: item.name, label: item.name, id: item.id };
  //       }),
  //       categories: categories.map((item) => {
  //         return { value: item.name, label: item.name, id: item.id };
  //       }),
  //     };
  //   });
  // }, []);

  const [filters, setFilters] = useState({ companies: [], categories: [] });
  useEffect(() => {
    setFilters({
      companies: companies.map((item) => ({
        value: item.name,
        label: item.name,
        id: item.id,
      })),
      categories: categories.map((item) => ({
        value: item.name,
        label: item.name,
        id: item.id,
      })),
    });
  }, [companies, categories]);

  // useEffect(() => {
  //   console.log(filterData, "filterData changed");
  // }, [filterData]);

  const getCurrentSelectValue = (currentFilterValue, options) => {
    if (currentFilterValue && currentFilterValue.id) {
      return options.find(
        (option) =>
          option.value === currentFilterValue.value &&
          option.label === currentFilterValue.label
      );
    }
    return null; // No selection
  };

  return (
    <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mt-6 md:mt-12 mb-6">
      <div className="inline-flex flex flex-col w-full sm:w-auto sm:flex-row items-center gap-3">
        {filters.companies && (
          <Select
            options={[
              { value: "", label: t("all_companies"), id: "" },
              ...filters.companies,
            ]}
            placeholder={
              <span>
                {t("filter_company")}{" "}
                <strong>{filters.companies.length}</strong>
              </span>
            }
            classNamePrefix={"dej-select"}
            className="custom-select"
            onChange={(selectedOption) =>
              onFilterChanged({ current_page: 0, company: selectedOption })
            }
            // Use the helper function to set the value correctly
            value={getCurrentSelectValue(filterData.company, [
              { value: "", label: t("all_companies"), id: "" },
              ...filters.companies,
            ])}
          />
        )}
        {filters.categories && (
          <Select
            options={[
              { value: "", label: t("all_categories"), id: "" },
              ...filters.categories,
            ]}
            placeholder={
              <span>
                {t("select_job_category")}{" "}
                <strong>{filters.categories.length}</strong>
              </span>
            }
            classNamePrefix={"dej-select"}
            className="custom-select"
            onChange={(selectedOption) =>
              onFilterChanged({ current_page: 0, industries: selectedOption })
            }
            // Use the helper function to set the value correctly
            value={getCurrentSelectValue(filterData.industries, [
              { value: "", label: t("all_categories"), id: "" },
              ...filters.categories,
            ])}
          />
        )}
      </div>
      <div className="inline-flex items-center gap-2">
        <strong className="text-3xl font-semibold">{totalJobs}</strong>
        <span>{t("total_open_roles")}</span>
      </div>
    </div>
  );
};

const JobListing = ({ shouldShowSkeleton, jobs }) => {
  const { t } = useTranslation();
  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
      {shouldShowSkeleton ? (
        [...Array(4)].map((_, index) => <JobCardSkeleton />)
      ) : jobs?.meta?.total === 0 ? (
        <div className="noData">{t("noResultsFound")}</div>
      ) : (
        jobs?.data?.map((item, index) => (
          <JobCard job={item} key={"jobs-" + index} />
        ))
      )}
    </div>
  );
};

const JobCard = ({ job }) => {
  const { t } = useTranslation();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-full flex flex-col gap-3  md:gap-5 relative bg-white  rounded-2xl overflow-hidden">
      <div className="relative w-full gap-3 flex items-center p-3 border-b-1 border-b-[#4f59621a]">
        <div className="w-[3.7rem] h-[3.7rem] rounded-full overflow-hidden border-3 border-[#f6f6f6]">
          <img
            src={
              job.company?.linkedin_logo_url
                ? job.company.linkedin_logo_url
                : jobIcon
            }
            alt={job.company?.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative flex justify-between items-center flex-1 gap-1">
          <div className="flex flex-col flex-1">
            {job.company.name && (
              <h3 className="m-0 mb-[.2rem] font-semibold text-[1rem] leading-[100%] text-[#2F2F2F]">
                {job.company.name}
              </h3>
            )}
            {job.industries[0] && (
              <div className="text-[.85rem] leading-[105%] opacity-60 font-medium">
                {job.industries[0].name}
              </div>
            )}
          </div>
          {job.company.linkedin_url && (
            <a
              href={job.company.linkedin_url}
              className="shareBtn"
              target={"_blank"}
              rel={"noreferrer"}
            >
              <RiShareBoxFill />
            </a>
          )}
        </div>
      </div>

      <div className="relative px-3 flex-1">
        {job.title && (
          <h3 className="m-0 mb-3 font-bold text-[1.3rem] leading-[110%] text-[#2F2F2F]">
            {job.title}
          </h3>
        )}
        {job.industries && (
          <div className="flex flex-wrap gap-1 mb-2">
            {job.industries.map((item, index) => (
              <div
                className="smTag  w-[auto] inline-flex rounded-2xl text-[.8rem] font-medium leading-[100%] "
                key={`jobCat_${index}`}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}

        {job.short_description && (
          <div className="text-[.95rem] ">
            <div className="textBox" style={{ "--ellipsRow": 3 }}>
              <p>{job.short_description}</p>
            </div>
            {job.description && (
              <Button className="decMore" onPress={onOpen}>
                [...]
              </Button>
            )}
          </div>
        )}
        {job.description && (
          <Modal
            isOpen={isOpen}
            scrollBehavior={"outside"}
            onOpenChange={onOpenChange}
            size={"5xl"}
            backdrop={"blur"}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 ">
                    {t("jobDescription")}
                  </ModalHeader>
                  <ModalBody
                    className="textBox pb-6"
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  ></ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        )}
      </div>

      <div className="relative px-3 pb-3 flex flex-col gap-2">
        <div className="flex flex-wrap gap-2  items-center">
          {job.employment_status && (
            <div className="smTag bgColor1  w-[auto] inline-flex rounded-2xl text-sm font-medium leading-[100%] mb-1">
              <div className="iconBox">
                <MdAccessTime />
              </div>
              <span>{job.employment_status}</span>
            </div>
          )}
          {job.experience_level && (
            <div className="smTag bgColor1  w-[auto] inline-flex rounded-2xl text-sm font-medium leading-[100%] mb-1">
              <div className="iconBox">
                <PiBagDuotone />
              </div>
              <span>{job.experience_level}</span>
            </div>
          )}
        </div>

        <div className="dateWrap ">
          {job.list_date && (
            <div className="dateBox">
              <span>{t("posted")}</span>
              {job.list_date}
            </div>
          )}
          {job.expiration_date && (
            <>
              <div className="line"></div>
              <div className="dateBox">
                <span>{t("expires")}</span>
                {job.expiration_date}
              </div>
            </>
          )}
        </div>

        <div className="w-full flex items-center justify-between gap-5">
          {job.state.name && (
            <div className="inline-flex gap-1 items-center text-(--gray)">
              <div className="opacity-[.5]">
                <FiMapPin />
              </div>
              <p className="text-sm truncate font-medium">{job.state.name}</p>
            </div>
          )}

          {job.source_url && (
            <a
              href={job.source_url}
              referrerPolicy={"no-referrer"}
              className="btn-regular outline"
              title="Details"
              target={"_blank"}
              rel={"noreferrer"}
            >
              <span>{t("details")}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const JobCardSkeleton = () => {
  return (
    <div className="w-full bg-white flex flex-col gap-3 md:gap-5 relative rounded-2xl overflow-hidden p-3 animate-pulse ">
      <div className="relative w-full gap-3 flex items-center border-b-1 border-b-[#4f59621a] pb-3">
        <Skeleton className="w-[3.7rem] h-[3.7rem] rounded-full">
          <div className="w-[3.7rem] h-[3.7rem] rounded-full bg-default-200" />
        </Skeleton>

        <div className="relative flex justify-between items-center flex-1 gap-1">
          <div className="flex flex-col flex-1">
            <Skeleton className="w-3/4 rounded-lg mb-[.2rem]">
              <div className="h-4 w-3/4 rounded-lg bg-default-200" />
            </Skeleton>

            <Skeleton className="w-1/2 rounded-lg">
              <div className="h-3 w-1/2 rounded-lg bg-default-200" />
            </Skeleton>
          </div>

          <Skeleton className="w-8 h-8 rounded-full">
            <div className="w-8 h-8 rounded-full bg-default-200" />
          </Skeleton>
        </div>
      </div>

      <div className="relative px-0 flex-1">
        <Skeleton className="w-full rounded-lg mb-3">
          <div className="h-6 w-full rounded-lg bg-default-300" />
        </Skeleton>

        <div className="flex flex-wrap gap-1 mb-2">
          <Skeleton className="w-20 h-6 rounded-2xl">
            <div className="w-20 h-6 rounded-2xl bg-default-200" />
          </Skeleton>
          <Skeleton className="w-24 h-6 rounded-2xl">
            <div className="w-24 h-6 rounded-2xl bg-default-200" />
          </Skeleton>
          <Skeleton className="w-16 h-6 rounded-2xl">
            <div className="w-16 h-6 rounded-2xl bg-default-200" />
          </Skeleton>
        </div>

        <div className="text-[.95rem]">
          <Skeleton className="w-full rounded-lg">
            <div className="h-4 w-full rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-11/12 rounded-lg mt-1">
            <div className="h-4 w-11/12 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-10/12 rounded-lg mt-1">
            <div className="h-4 w-10/12 rounded-lg bg-default-200" />
          </Skeleton>

          <Skeleton className="w-12 h-6 rounded-lg mt-2">
            <div className="w-12 h-6 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </div>

      <div className="relative px-0 pb-0 flex flex-col gap-2">
        <div className="flex flex-wrap gap-2 items-center">
          <Skeleton className="w-28 h-7 rounded-2xl">
            <div className="w-28 h-7 rounded-2xl bg-default-200" />
          </Skeleton>

          <Skeleton className="w-28 h-7 rounded-2xl">
            <div className="w-28 h-7 rounded-2xl bg-default-200" />
          </Skeleton>
        </div>

        <div className="dateWrap flex items-center gap-2">
          <Skeleton className="w-24 h-5 rounded-lg">
            <div className="w-24 h-5 rounded-lg bg-default-200" />
          </Skeleton>
          <div className="line h-3 w-px bg-gray-300"></div>

          <Skeleton className="w-24 h-5 rounded-lg">
            <div className="w-24 h-5 rounded-lg bg-default-200" />
          </Skeleton>
        </div>

        <div className="w-full flex items-center justify-between gap-5 mt-2">
          <Skeleton className="w-32 h-5 rounded-lg">
            <div className="w-32 h-5 rounded-lg bg-default-200" />
          </Skeleton>

          <Skeleton className="w-24 h-9 rounded-lg">
            <div className="w-24 h-9 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

const JobSearchValues = ({ onFilterChanged, filterData }) => {
  return (
    <div className="selectedFilterList ">
      {filterData.keyword && (
        <div
          onClick={() => onFilterChanged({ keyword: "" })}
          className="filterItem "
        >
          <span>Keyword: </span>
          {<span>{filterData.keyword}</span>}
          <IoIosClose />
        </div>
      )}

      {filterData.state.id && (
        <div
          onClick={() => onFilterChanged({ state: [] })}
          className="filterItem"
        >
          <span>Location: </span>
          {<span>{filterData.state.label}</span>}
          <IoIosClose />
        </div>
      )}

      {filterData.job_functions &&
        filterData.job_functions?.map(
          (item, index) =>
            item && (
              <div
                onClick={() =>
                  onFilterChanged({
                    job_functions: filterData.job_functions.filter(
                      (el) => el !== item
                    ),
                  })
                }
                key={"selected-cat-" + index}
                className="filterItem"
              >
                {<span>{item.name}</span>}
                <IoIosClose />
              </div>
            )
        )}

      {filterData.company.id && (
        <div
          onClick={() => onFilterChanged({ company: [] })}
          className="filterItem"
        >
          <span>Company : </span>
          {<span>{filterData.company.label}</span>}
          <IoIosClose />
        </div>
      )}

      {filterData.industries.id && (
        <div
          onClick={() => onFilterChanged({ industries: [] })}
          className="filterItem"
        >
          <span>Category : </span>
          {<span>{filterData.industries.label}</span>}
          <IoIosClose />
        </div>
      )}
    </div>
  );
};

const JobPagination = ({ data, onFilterChanged }) => {
  const { current_page, last_page } = data;
  const [activePage, setActivePage] = useState(current_page);

  useEffect(() => {
    setActivePage(current_page);
    // console.log("Pagination component updated to page:", current_page);
  }, [current_page]);

  const onPageChange = (page) => {
    setActivePage(page);
    onFilterChanged({ current_page: page });
  };

  return (
    <div className="mt-10 flex justify-center ">
      <Pagination
        showControls
        page={activePage}
        total={last_page}
        onChange={(page) => onPageChange(page)}
      />
    </div>
  );
};
const HomeJobListing = ({ data }) => {
  const { get, post } = useApi();
  const {
    //  jobs,
    categories,
    companies,
    jobFunctions,
  } = data;

  const [jobList, setJobList] = useAtom(jobsListingAtom);
  const [searchValues, setSearchValue] = useAtom(searchFilterAtom);

  const onFilterChanged = useCallback(
    (value) => {
      setSearchValue((data) => {
        return {
          ...data,
          ...value,
        };
      });
    },
    [searchValues]
  );

  const {
    data: jobsData,
    isLoading: isLoadingJobs,
    isError: isErrorJobs,
    isRefetching: isRefetchingJobs,
  } = useQuery({
    queryKey: ["jobs-search", searchValues],
    queryFn: async () => {
      try {
        const params = {};

        if (searchValues.keyword) {
          params.keyword = searchValues.keyword;
        }

        // Handle 'state' - it's already an array or undefined
        // If state is an array, join it with commas for URL param
        if (
          Array.isArray(searchValues.state) &&
          searchValues.state.length > 0
        ) {
          params.state = searchValues.state.join(","); // e.g., state=1,2,3
        }
        // If state is an object with an id (e.g., from a single select dropdown)
        else if (
          searchValues.state &&
          typeof searchValues.state.id !== "undefined"
        ) {
          params.state = searchValues.state.id;
        }

        // Handle 'company' - extract 'id' if it exists
        if (
          searchValues.company &&
          typeof searchValues.company.id !== "undefined"
        ) {
          params.company = searchValues.company.id;
        }

        // Handle 'industries' - can be an array of objects or a single object
        if (
          Array.isArray(searchValues.industries) &&
          searchValues.industries.length > 0
        ) {
          params.industries = searchValues.industries
            .map((item) => item.id)
            .join(","); // Join IDs with commas for URL param
        } else if (searchValues.industries && searchValues.industries.id) {
          params.industries = searchValues.industries.id;
        }

        // Handle 'job_functions' - can be an array of objects or a single object
        if (
          Array.isArray(searchValues.job_functions) &&
          searchValues.job_functions.length > 0
        ) {
          params.job_functions = searchValues.job_functions
            .map((item) => item.code)
            .join(","); // Join IDs with commas for URL param
        } else if (
          searchValues.job_functions &&
          searchValues.job_functions.code
        ) {
          params.job_functions = searchValues.job_functions.code;
        }

        if (searchValues.current_page) {
          params.page = searchValues.current_page;
        }

        // Construct the query string from the 'params' object
        // This will handle encoding correctly
        const queryString = new URLSearchParams(params).toString();

        // console.log("Search Store Params:", searchValues);
        // console.log("Query Params:", queryString);

        // Construct the full URL with query parameters
        const url = `/jobs?${queryString}`;

        // Use the 'get' function with the constructed URL
        const response = await get(url); // Assuming 'get' takes the full path as argument

        // console.log("API Response:", response, searchValues);

        setJobList(response); // Assuming setJobList is a state setter for your job list
        return response; // Assuming get returns parsed JSON
      } catch (error) {
        console.error("Error fetching jobs data:", error);
        throw error;
      }
    },
    // enabled: Object.keys(searchValues).length > 0,
    // staleTime: 30000,
    // cacheTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    setJobList(jobsData);
  }, []);

  // useEffect(() => {
  //   console.log("jj", jobsData);
  // }, [jobsData]);

  // Determine if we should show the skeleton
  const shouldShowSkeleton = isLoadingJobs || isRefetchingJobs || !jobsData;
  //const shouldShowSkeleton = true;
  return (
    <motion.section
      id="jobs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, type: "tween", delay: 0.2 }}
      className="block w-full overflow-hidden relative pb-[7rem] bg-[var(--bg-color)]"
    >
      <Container>
        <JobCatergoryList
          data={jobFunctions}
          onFilterChanged={onFilterChanged}
          activeCategories={searchValues?.job_functions}
        />

        <JobFilter
          companies={companies}
          categories={categories}
          totalJobs={jobList?.meta ? jobList?.meta?.total : 0}
          onFilterChanged={onFilterChanged}
          filterData={searchValues}
        />
        <JobSearchValues
          onFilterChanged={onFilterChanged}
          filterData={searchValues}
        />

        {/* {isLoadingJobs && <PreLoader key={"preloader-anim"} />} */}
        <JobListing shouldShowSkeleton={shouldShowSkeleton} jobs={jobList} />
        {jobList?.meta && jobList?.meta.last_page > 1 && (
          <JobPagination
            data={jobList?.meta}
            onFilterChanged={onFilterChanged}
          />
        )}
      </Container>
    </motion.section>
  );
};

export default HomeJobListing;
