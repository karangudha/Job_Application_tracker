import React, { useState } from "react";

const Pagination = () => {
    const [activeButton, setActiveButton] = useState(1);
    const dispatch = useDispatch();
    const totalJobs = useSelector((state) => state.job.totalJobs);
    const totalPages = Math.ceil(totalJobs / 10 );
    const params = useSelector((state) => state.job.filterParams);

    const fetchJobs = async (params) => {
        try {
            const {data} = await filterJobs(params);

            console.log(data);
            dispatch(setSuccess(data));
            dispatch(setJobs(data));
        } catch (error) {
            console.log(error);
        }
    };

    const selectPageHandler = (page) => {
        setActiveButton(page);
        const updatedParams = { ...params, page };
        dispatch(setFilterParams(updatedParams));

        fatchJobs(updatedParams);
    };

    const handlePerivous = () => {
        if(activeButton > 1) 
            selectPageHandler(activeButton - 1);
    };

    const handleNext = () => {
        if(activeButton < totalPages)
            selectPageHandler(activeButton + 1);
    };

    return (
        <div className="flex items-center gap-4">
            <button 
            disabled={activeButton === 1}
            className="flex item-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-white-300 uppercase align-middle transition-all rounded-lg select-none hover:bg-black-650 active:bg-black-650 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
            type="button" 
            onClick={handlePerivous}
            >
                <svg 
                    fill ="none"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 017.5-7.5M3 12h18"
                ></path>
            </svg>
                Previous
            </button>
            <div className="flex item-center gap-2">
                {[...Array(totalPages)].map((_, i) => {
                    return (
                        <button 
                            className={`relative block rounded px-3 py-3.5 text-sm text-white-500 transition-all duration-300 ${
                                activeButton === i + 1 ? "bg-black-650" : "bg-trasparent"
                            } dark:hover:text-white-300`}
                            type="button"
                            key={i}
                            onClick={() => selectPageHandler(i + 1)}
                        >
                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                {i + 1}
                            </span>
                        </button>
                    );
                })}
            </div>
            <button 
                disabled={activeButton === totalPages}
                className="flex item-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-white-300 uppercase align-middle transition-all rounded-lg select-none hover:bg-black-650 active:bg-black-650 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
                type="button" 
                onClick={handleNext}
            >
                <svg 
                    fill ="none"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-4 h-4"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.5 4.5L21 12m0 01-7.5 7.5M21 12H3"
                    ></path>
                </svg>
            </button>
        </div>
    );
};

export default Pagination;