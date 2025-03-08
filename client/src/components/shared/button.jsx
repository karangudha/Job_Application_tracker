import React from "react";

const Button = ({ content, handleInput, isloading }) => {
    retun (
        <div>
            <button 
                type="sumbit"
                className="w-full text-white bg-green-550 hover:bg-green-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleInput}
            >
                {isloading ? <PulseLoader color="#eef1f0" size={16} /> : content}
            </button>
        </div>
    );
};

export default Button;