import { useCallback, useEffect, useMemo, useState } from "react";
import Container from "../layouts/Container";
import Select from "react-select";
import moment from "moment/moment";
import { FiMapPin } from "react-icons/fi";
import { useAtom, atom, useSetAtom } from "jotai";
import { searchFilterAtom } from "./HomeBanner";
import { IoIosClose } from "react-icons/io";
import { motion } from "framer-motion";
import linkedInImage from "@/assets/images/linkedin-icon.png";
import jobIcon from "@/assets/images/job_icon.png";
import { useTranslation } from "react-i18next";
import { LuCalendarCheck } from "react-icons/lu";
import { RiShareBoxFill } from "react-icons/ri";
import { MdAccessTime } from "react-icons/md";
import { PiBagDuotone } from "react-icons/pi";

import useApi from "../../hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import PreLoader from "../preloader/PreLoader";

import { Pagination } from "@heroui/react";

export const jobsListingAtom = atom([]);

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const JobCatergoryList = ({ data, onCategoryClick, activeCategories }) => {
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

      onCategoryClick({
        job_functions: Array.from(new Set(updatedList.map((item) => item))),
      });
    },
    [activeCategories, onCategoryClick]
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
    <ul className="flex flex-wrap w-full items-center gap-3 overflow-x-scroll no-scrollbar justify-center ">
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
  onCompaniesChanged,
  onCategoriesChanged,
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
    <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mt-12 mb-6">
      <div className="inline-flex flex flex-col w-full sm:w-auto sm:flex-row items-center gap-6 lg:gap-3">
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
              onCompaniesChanged({ company: selectedOption })
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
              onCategoriesChanged({ industries: selectedOption })
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

const JobListing = ({ jobs }) => {
  const [listCount, setListCount] = useState(12);

  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
      {jobs?.data?.map((item, index) => (
        <JobCard job={item} key={"jobs-" + index} />
      ))}
    </div>
  );
};

const JobCard = ({ job }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col gap-3  md:gap-5 relative bg-white  rounded-2xl overflow-hidden">
      <div className="relative w-full gap-3 flex items-center p-3 border-b-1 border-b-[#4f59621a]">
        <div className="w-[3.7rem] h-[3.7rem] rounded-full overflow-hidden border-3 border-[#f6f6f6]">
          <img
            src={job.logo_url ? job.logo_url : jobIcon}
            alt={job.company?.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative flex justify-between items-center flex-1 gap-1">
          <div className="flex flex-col">
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
              target="_blank"
            >
              <RiShareBoxFill />
            </a>
          )}
        </div>
      </div>

      <div className="relative px-3 flex-1">
        {job.title && (
          <h3 className="m-0 mb-3 font-bold text-[1.3rem] leading-[100%] text-[#2F2F2F]">
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

        <AlertDialog>
          {job.short_description && (
            <div className="text-[.95rem] ">
              <div className="textBox" style={{ "--ellipsRow": 3 }}>
                <p>{job.short_description}</p>
              </div>
              {job.description && (
                <AlertDialogTrigger className="text-[.95rem] text-(--brandColor2)">
                  [...]
                </AlertDialogTrigger>
              )}
            </div>
          )}
          {job.description && (
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogDescription
                  className="font-medium"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                ></AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          )}
        </AlertDialog>
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
            >
              <span>{t("details")}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const JobCardOld = ({ data }) => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col gap-4 relative bg-white p-4 rounded-3xl overflow-hidden">
      <div className="relative w-full gap-4 flex items-center justify-between">
        {data.logo_url && (
          <div className="w-[4rem] h-[4rem] rounded-full overflow-hidden border-3 border-[#f6f6f6] ">
            <img
              src={data.logo_url}
              alt={data.company}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {data.predicted_de_job_category && (
          <div className="block">
            <div className="inline-block items-center bg-[#b68a3512] text-[#B68A35] font-medium px-3 py-1 rounded-2xl text-sm">
              {data.predicted_de_job_category}
            </div>
          </div>
        )}
      </div>

      <div className="block relative w-full flex-1">
        {data.job_title && (
          <div className="w-full flex item-start gap-5 mt-1 justify-between">
            <h3 className="block font-bold text-start flex-1 text-lg">
              {data.job_title}
            </h3>
          </div>
        )}
        {data.company && <p className="block text-sm mt-2">{data.company}</p>}
      </div>

      <div className="flex w-full items-center gap-2">
        {/* {
                                        data.status &&
                                        <div className="inline-block items-center bg-[#0a66c217] text-[#0A66C2] font-medium px-3 py-1 rounded-2xl text-sm">{data.status}</div>
                                    } */}

        <div className="inline-flex items-center gap-2 border border-slate-200 bg-[#f2f8ff] rounded-2xl">
          {/* <div className="w-6 h-6 inline-flex items-center justify-center rounded-full bg-[#595c60]">
                                        <LuCalendarCheck className="text-[#fff]" size={12} />
                                    </div>
                                         */}
          <p className="font-medium leading-[100%] p-0 inline-block text-sm bg-text bg-[#4f5962] text-white px-2 py-2 rounded-2xl">
            Posted
          </p>
          <p className="font-medium leading-[100%] p-0 inline-block text-sm me-2">
            {moment(data.inserted_date).format("LL")}
          </p>
        </div>
      </div>

      <hr className="border-[#f6f6f6]" />

      <div className="w-full flex items-center justify-between gap-5">
        {data.predicted_location && (
          <div className="inline-flex gap-2 items-center">
            {/* <FiMapPin /> */}
            <p className="text-sm truncate font-medium">
              {data.predicted_location}
            </p>
          </div>
        )}

        {data.predicted_link && (
          <a
            href={data.predicted_link}
            referrerPolicy={"no-referrer"}
            className="btn-regular outline"
            title="Details"
            target={"_blank"}
          >
            <span>{t("details")}</span>
          </a>
        )}
      </div>
    </div>
  );
};

const JobSearchValues = ({ filterData }) => {
  const setSearchValue = useSetAtom(searchFilterAtom);

  const onFilterReset = (value) => {
    setSearchValue((data) => {
      return {
        ...data,
        ...value,
      };
    });
  };

  return (
    <div className="w-full flex flex-wrap gap-2 items-start mb-6">
      {filterData.keyword && (
        <div
          onClick={() => onFilterReset({ keyword: "" })}
          className="w-auto relative inline-flex items-center gap-2 bg-[var(--text-color)] text-white text-sm font-medium px-2 py-1 rounded-2xl transition-opacity cursor-pointer hover:opacity-75"
        >
          <span>Keyword: </span>
          {<span>{filterData.keyword}</span>}
          <IoIosClose />
        </div>
      )}

      {filterData.state.id && (
        <div
          onClick={() => onFilterReset({ state: [] })}
          className="w-auto relative inline-flex items-center gap-2 bg-[var(--text-color)] text-white text-sm font-medium px-2 py-1 rounded-2xl transition-opacity cursor-pointer hover:opacity-75"
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
                  onFilterReset({
                    job_functions: filterData.job_functions.filter(
                      (el) => el !== item
                    ),
                  })
                }
                key={"selected-cat-" + index}
                className="w-auto relative inline-flex items-center gap-2 bg-[var(--text-color)] text-white text-sm font-medium px-2 py-1 rounded-2xl transition-opacity cursor-pointer hover:opacity-75"
              >
                {<span>{item.name}</span>}
                <IoIosClose />
              </div>
            )
        )}

      {filterData.company.id && (
        <div
          onClick={() => onFilterReset({ company: [] })}
          className="w-auto relative inline-flex items-center gap-2 bg-[var(--text-color)] text-white text-sm font-medium px-2 py-1 rounded-2xl transition-opacity cursor-pointer hover:opacity-75"
        >
          <span>Company : </span>
          {<span>{filterData.company.label}</span>}
          <IoIosClose />
        </div>
      )}

      {filterData.industries.id && (
        <div
          onClick={() => onFilterReset({ industries: [] })}
          className="w-auto relative inline-flex items-center gap-2 bg-[var(--text-color)] text-white text-sm font-medium px-2 py-1 rounded-2xl transition-opacity cursor-pointer hover:opacity-75"
        >
          <span>Category : </span>
          {<span>{filterData.industries.label}</span>}
          <IoIosClose />
        </div>
      )}

      {/* {filterData.industries &&
        filterData.industries?.map(
          (item, index) =>
            item && (
              <div
                onClick={() =>
                  onFilterReset({
                    industries: filterData.industries.filter(
                      (el) => el !== item
                    ),
                  })
                }
                key={"selected-cat-" + index}
                className="w-auto relative inline-flex items-center gap-2 bg-[var(--text-color)] text-white text-sm font-medium px-2 py-1 rounded-2xl transition-opacity cursor-pointer hover:opacity-75"
              >
                {<span>{item}</span>}
                <IoIosClose />
              </div>
            )
        )} */}
    </div>
  );
};

const JobPagination = ({ data }) => {
  return <Pagination showControls initialPage={1} total={10} />;
};
const HomeJobListing = ({ data }) => {
  const { get, post } = useApi();
  const { jobs, categories, companies, jobFunctions } = data;

  const [jobList, setJobList] = useAtom(jobsListingAtom);
  const [searchValues, setSearchValue] = useAtom(searchFilterAtom);

  useEffect(() => {
    setJobList(jobs);
  }, []);

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

  // const {
  //   data: jobsData,
  //   isLoading: isLoadingJobs,
  //   isError: isErrorJobs,
  //   isRefetching: isRefetchingJobs,
  // } = useQuery({
  //   queryKey: ["jobs-search", searchValues],
  //   queryFn: async () => {
  //     try {
  //       const requestBody = {};

  //       if (searchValues.keyword) {
  //         requestBody.keyword = searchValues.keyword;
  //       }
  //       if (typeof searchValues.state.id !== "undefined") {
  //         requestBody.state = [searchValues.state.id];
  //       }
  //       if (typeof searchValues.company.id !== "undefined") {
  //         requestBody.company = [searchValues.company.id];
  //       }
  //       if (
  //         Array.isArray(searchValues.industries) &&
  //         searchValues.industries.length > 0
  //       ) {
  //         requestBody.industries = searchValues.industries.map(
  //           (item) => item.id
  //         );
  //       } else if (searchValues.industries && searchValues.industries.id) {
  //         requestBody.industries = [searchValues.industries.id];
  //       }

  //       if (
  //         Array.isArray(searchValues.job_functions) &&
  //         searchValues.job_functions.length > 0
  //       ) {
  //         requestBody.job_functions = searchValues.job_functions.map(
  //           (item) => item.id
  //         );
  //       } else if (
  //         searchValues.job_functions &&
  //         searchValues.job_functions.id
  //       ) {
  //         requestBody.job_functions = searchValues.job_functions.id;
  //       }

  //       //    const queryParams = new URLSearchParams(requestBody).toString();

  //       const response = await post(`/jobs`, requestBody);
  //       // const response = await get(`/jobs`);

  //       console.log(requestBody, "res");
  //       setListJobs(response);
  //       return response; // Assuming get returns parsed JSON
  //     } catch (error) {
  //       console.error("Error fetching jobs data:", error);
  //       throw error;
  //     }
  //   },
  //   enabled: Object.keys(searchValues).length > 0,
  //   staleTime: 30000,
  //   cacheTime: 5 * 60 * 1000,
  // });

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
        {/* {isLoadingJobs && <PreLoader key={"preloader-anim"} />} */}
        <JobCatergoryList
          data={jobFunctions}
          onCategoryClick={onFilterChanged}
          activeCategories={searchValues?.job_functions}
        />

        <JobFilter
          companies={companies}
          categories={categories}
          totalJobs={jobList?.meta ? jobList?.meta.total : 0}
          onCategoriesChanged={onFilterChanged}
          onCompaniesChanged={onFilterChanged}
          filterData={searchValues}
        />
        <JobSearchValues filterData={searchValues} />
        <JobPagination data={jobList?.meta} />

        {/* {jobsData && ( */}
        <>
          <JobListing jobs={jobList} />
        </>
        {/* )} */}
      </Container>
    </motion.section>
  );
};

export default HomeJobListing;
