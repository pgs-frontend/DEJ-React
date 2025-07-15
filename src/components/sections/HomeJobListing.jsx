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
import { useTranslation } from "react-i18next";
import { LuCalendarCheck } from "react-icons/lu";
import { RiShareBoxFill } from "react-icons/ri";
import { MdAccessTime } from "react-icons/md";
import { PiBagDuotone } from "react-icons/pi";

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
} from "../ui/alert-dialog"

const JobCatergoryList = ({ data, onCategoryClick, activeCategories }) => {
  const list = useMemo(() => {
    const result = data.categories.sort();
    return result;
  }, [data, activeCategories]);

  const onCategory = useCallback(
    (value) => {
      let list;
      if (activeCategories.includes(value)) {
        list = activeCategories.filter((item) => item !== value);
      } else {
        list = [...activeCategories, value];
      }
      onCategoryClick({
        predicted_de_job_category: [...new Set(list)],
      });
    },
    [activeCategories]
  );

  return (
    <ul className="flex w-full items-center gap-3 overflow-x-scroll no-scrollbar lg:justify-start 2xl:justify-center">
      {list?.map((item, index) => (
        <li className="relative inline-block" key={"category-" + index}>
          <button
            className={`tag ${activeCategories?.includes(item) ? "active" : ""}`}
            onClick={() => onCategory(item)}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
};

const JobFilter = ({
  data,
  totalJobs,
  onCompaniesChanged,
  onCategoriesChanged,
  filterValues,
}) => {
  const [filters, setFilters] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    setFilters(() => {
      const companies = data.companies.sort();
      const categories = data.categories.sort();
      return {
        companies: companies.map((item) => {
          return { value: item, label: item };
        }),
        categories: categories.map((item) => {
          return { value: item, label: item };
        }),
      };
    });
  }, []);

  return (
    <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mt-12 mb-6">
      <div className="inline-flex flex flex-col w-full sm:w-auto sm:flex-row items-center gap-6 lg:gap-3">
        {filters.companies && (
          <Select
            options={[
              { value: "", label: "All Companies" },
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
            onChange={(e) => onCompaniesChanged({ company: e.value })}
            value={
              filterValues.company && {
                value: filterValues.company && filterValues.company,
                label: filterValues.company && filterValues.company,
              }
            }
          />
        )}
        {filters.categories && (
          <Select
            options={[
              { value: "", label: "All Categories" },
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
            onChange={(e) =>
              onCategoriesChanged({ predicted_de_job_category: [e.value] })
            }
            value={
              filterValues.predicted_de_job_category[0] && {
                value: filterValues.predicted_de_job_category[0],
                label: filterValues.predicted_de_job_category[0],
              }
            }
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

const JobListing = ({ data }) => {
  const [listCount, setListCount] = useState(12);

  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
      {data?.map((item, index) => (
        <JobCard data={item} key={"jobs-" + index} />
      ))}
    </div>
  );
};

const JobCard = ({ data }) => {
  const { t } = useTranslation();

  
  return (
    <div className="w-full flex flex-col gap-3  md:gap-5 relative bg-white  rounded-2xl overflow-hidden">
      <div className="relative w-full gap-3 flex items-center p-3 border-b-1 border-b-[#4f59621a]">
        {data.logo_url && (
          <div className="w-[3.7rem] h-[3.7rem] rounded-full overflow-hidden border-3 border-[#f6f6f6]">
            <img
              src={data.logo_url}
              alt={data.company}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="relative flex justify-between items-center flex-1">
          <div className="flex flex-col">
            {data.company && (
              <h3 className="m-0 font-semibold text-[1.1rem] leading-[100%] text-[#2F2F2F]">
                {data.company}
              </h3>
            )}
            {data.company_info?.sector && (
              <div className="text-sm opacity-60 font-medium">
                {data.company_info.sector}
              </div>
            )}
          </div>

          <a href="#" className="shareBtn">
            <RiShareBoxFill />
          </a>
        </div>
      </div>

      <div className="relative px-3 flex-1">
        {data.job_title && (
          <h3 className="m-0 mb-3 font-bold text-[1.3rem] leading-[100%] text-[#2F2F2F]">
            {data.job_title}
          </h3>
        )}
        {data.predicted_de_job_category && (
          <div className="smTag  w-[auto] inline-flex rounded-2xl text-sm font-medium leading-[100%] mb-2">
            {data.predicted_de_job_category}
          </div>
        )}
       <AlertDialog>
        <div className="text-[.95rem] " >
          <div className="textBox" style={{ "--ellipsRow": 3 }}>
          <p>  An experienced consulting professional, you will be a thought leader
            in the CMT industry and a key advisor to defining solutions and will
            be on point to help</p>

          </div>
          <AlertDialogTrigger className="text-[.95rem] text-(--brandColor2)">[...]</AlertDialogTrigger>
        </div>

   
          
          <AlertDialogContent>
            <AlertDialogHeader>
              
              <AlertDialogDescription className="font-medium">
                 <p>  An experienced consulting professional, you will be a thought leader
            in the CMT industry and a key advisor to defining solutions and will
            be on point to help</p>
            <p>  An experienced consulting professional, you will be a thought leader
            in the CMT industry and a key advisor to defining solutions and will
            be on point to help</p><p>  An experienced consulting professional, you will be a thought leader
            in the CMT industry and a key advisor to defining solutions and will
            be on point to help</p><p>  An experienced consulting professional, you will be a thought leader
            in the CMT industry and a key advisor to defining solutions and will
            be on point to help</p><p>  An experienced consulting professional, you will be a thought leader
            in the CMT industry and a key advisor to defining solutions and will
            be on point to help</p><p>  An experienced consulting professional, you will be a thought leader
            in the CMT industry and a key advisor to defining solutions and will
            be on point to help</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        
      </div>

      <div className="relative px-3 pb-3 flex flex-col gap-2">
        <div className="flex flex-wrap gap-2  items-center">
          <div className="smTag bgColor1  w-[auto] inline-flex rounded-2xl text-sm font-medium leading-[100%] mb-1">
            <div className="iconBox">
              <MdAccessTime />
            </div>
            <span>Full Time</span>
          </div>
          <div className="smTag bgColor1  w-[auto] inline-flex rounded-2xl text-sm font-medium leading-[100%] mb-1">
            <div className="iconBox">
              <PiBagDuotone />
            </div>
            <span>Entry Level</span>
          </div>
        </div>

        <div className="dateWrap ">
          <div className="dateBox">
            <span>Posted</span>20.04.2025
          </div>
          <div className="line"></div>
          <div className="dateBox">
            <span>Expires</span>30.06.2025
          </div>
        </div>

        <div className="w-full flex items-center justify-between gap-5">
          {data.predicted_location && (
            <div className="inline-flex gap-1 items-center text-(--gray)">
              <div className="opacity-[.5]">
                <FiMapPin />
              </div>
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
      {filterData.keywords && (
        <div
          onClick={() => onFilterReset({ keywords: "" })}
          className="w-auto relative inline-flex items-center gap-2 bg-[var(--text-color)] text-white text-sm font-medium px-2 py-1 rounded-2xl transition-opacity cursor-pointer hover:opacity-75"
        >
          <span>Keyword: </span>
          {<span>{filterData.keywords}</span>}
          <IoIosClose />
        </div>
      )}
      {filterData.location && (
        <div
          onClick={() => onFilterReset({ location: "" })}
          className="w-auto relative inline-flex items-center gap-2 bg-[var(--text-color)] text-white text-sm font-medium px-2 py-1 rounded-2xl transition-opacity cursor-pointer hover:opacity-75"
        >
          <span>Location: </span>
          {<span>{filterData.location}</span>}
          <IoIosClose />
        </div>
      )}
      {filterData.company && (
        <div
          onClick={() => onFilterReset({ company: "" })}
          className="w-auto relative inline-flex items-center gap-2 bg-[var(--text-color)] text-white text-sm font-medium px-2 py-1 rounded-2xl transition-opacity cursor-pointer hover:opacity-75"
        >
          <span>Company: </span>
          {<span>{filterData.company}</span>}
          <IoIosClose />
        </div>
      )}
      {filterData.predicted_de_job_category &&
        filterData.predicted_de_job_category?.map(
          (item, index) =>
            item && (
              <div
                onClick={() =>
                  onFilterReset({
                    predicted_de_job_category:
                      filterData.predicted_de_job_category.filter(
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
        )}
    </div>
  );
};

const HomeJobListing = ({ data }) => {
  const [jobs, setJobs] = useAtom(jobsListingAtom);
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

  useEffect(() => {
    const searchedJobs = data?.jobs?.filter(
      (item) =>
        item.job_title?.match(
          new RegExp(`(${searchValues?.keywords})`, "gi")
        ) &&
        item?.predicted_location?.match(
          new RegExp(`(${searchValues?.location})`, "gi")
        ) &&
        item?.company?.match(new RegExp(`(${searchValues?.company})`, "gi"))
    );
    setJobs(searchedJobs);

    if (searchValues?.predicted_de_job_category.length > 0)
      setJobs((data) =>
        data
          .filter((item) =>
            searchValues?.predicted_de_job_category?.includes(
              item.predicted_de_job_category
            )
          )
          .sort((a, b) => {
            return new Date(b.inserted_date) - new Date(a.inserted_date);
          })
      );
  }, [searchValues]);

  useEffect(() => {
    setJobs(
      data.jobs.sort((a, b) => {
        return new Date(b.inserted_date) - new Date(a.inserted_date);
      })
    );
  }, []);

  return (
    <motion.section
      id="jobs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, type: "tween", delay: 0.2 }}
      className="block w-full overflow-hidden relative pb-[7rem] bg-[var(--bg-color)]"
    >
      <JobCatergoryList
        data={data}
        onCategoryClick={onFilterChanged}
        activeCategories={searchValues?.predicted_de_job_category}
      />
      <Container>
        <JobFilter
          data={data}
          totalJobs={jobs.length}
          onCategoriesChanged={onFilterChanged}
          onCompaniesChanged={onFilterChanged}
          filterValues={searchValues}
        />
        <JobSearchValues filterData={searchValues} />
        <JobListing data={jobs} />
      </Container>
    </motion.section>
  );
};

export default HomeJobListing;
