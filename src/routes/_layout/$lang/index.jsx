import { useState, useEffect } from "react";

import { createFileRoute } from "@tanstack/react-router";
import HomeBanner from "../../../components/sections/HomeBanner";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useApi from "../../../hooks/useApi";
import { jobsListing } from "../../../store/jobs";
import HomeJobListing from "../../../components/sections/HomeJobListing";
import PreLoader from "../../../components/preloader/PreLoader";
import { AnimatePresence } from "framer-motion";

// import { searchFilterAtom } from "../../../components/sections/HomeBanner";
// import { useAtom } from "jotai";
export const Route = createFileRoute("/_layout/$lang/")({
  component: HomePage,
});

function HomePage() {
  const { get } = useApi();

  const [location, setLocation] = useState({});

  // const [searchValues, setSearchValue] = useAtom(searchFilterAtom);

  const { data, isLoading, isError, isRefetching } = useQuery({
    queryKey: ["jobs-listing-query"],
    queryFn: async () => {
      try {
        // const queryParams = new URLSearchParams(searchValues).toString();

        const [
          jobsResponse,
          companiesResponse,
          industriesResponse,
          jobFunctionsResponse,
          statesResponse,
        ] = await Promise.all([
          get("/jobs"),
          get("/companies"),
          get("/industries"),
          get("/job-functions"),
          get("/states"),
        ]);

        const jobs = await jobsResponse;
        const companies = await companiesResponse;
        const industries = await industriesResponse;
        const jobFunctions = await jobFunctionsResponse;
        const states = await statesResponse;

        setLocation(states.data);

        return {
          jobs,
          categories: industries.data,
          companies: companies.data,
          jobFunctions: jobFunctions.data,
        };
      } catch (error) {
        console.log(error);
      }
    },
    refetchOnMount: true,
    staleTime: 30000,
  });

  const onCategoryClick = (value) => {
    console.log(value);
  };

  return (
    <>
      <Helmet>
        <title>Find Jobs | Digital Economy Jobs</title>
      </Helmet>

      <AnimatePresence>
        {isLoading && <PreLoader key={"preloader-anim"} />}

        {data && (
          <>
            <HomeBanner key={"banner-anim"} location={location} />
            <HomeJobListing
              data={data}
              onCategoryClick={onCategoryClick}
              key={"jobs-listing-anim"}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
