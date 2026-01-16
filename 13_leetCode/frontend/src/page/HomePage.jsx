import React, {useEffect} from "react";
import {useProblemStore} from "../store/useProblemStore";
import {Loader} from "lucide-react";
import ProblemTable from "../components/ProblemTable";

const HomePage = () => {
    const {getAllProblems, problems, isProblemsLoading} = useProblemStore()

    useEffect (() => {
      getAllProblems();
    }, [getAllProblems]);

    console.log("All problems: ",problems);
    console.log("Problem titles: ", problems.map(p => p.title));

    if(isProblemsLoading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <Loader className="size-10 animate-spin"/>
        </div>
      )
    }

    return (
        <div className='min-h-screen flex flex-col items-center mt-14 px-4'>
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-primary opacity-30 blur-[120px] rounded-full"></div>
            <h1 className="text-4xl font-extrabold z-10 text-center">
                Welcome to <span className="text-primary">Code Buddy</span>
            </h1>

            <p className="mt-4 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10">
                A LeetCode-inspired platform designed to help you prepare for 
                coding interviews and strengthen your problem-solving skills.
            </p>

            {
              problems.length > 0 ? <ProblemTable problems={problems}/> : (
                  <p className="mt-10 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10 border border-primary px-4 py-2 rounded-md border-dashed">
                  No problems found
                  </p>
              )
            }
        </div>
    );
}

export default HomePage