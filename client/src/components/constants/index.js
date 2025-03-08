const categories =[
    {
        id:1,
        title: "Status",
        name: "Status",
        options:[
            {
                id: 1,
                optionTitle: "Pending",
                optionValue: "pending"
            },
            {
                id: 2,
                optionTitle: "Interview",
                optionValue: "interview",
            },
            {
                id: 3,
                optionTitle: "Rejected",
                optionValue: "reject",
            },
            {
                id: 4,
                optionTitle: "all",
                optionValue: "all",
            },
        ],
    },
    {
        id:2,
        title: "Work Type",
        name: "workType",
        options: [
            {
                id: 1,
                optionTitle: "Full-Time",
                optionValue: "full-time",
            },
            {
                id: 2,
                optionTitle: "Part-Time",
                optionValue: "part-time",
            },
            {
                id: 3,
                optionTitle: "Iternship",
                optionValue: "internship",
            },
            {
                id: 4,
                optionTitle: "Contract",
                optionValue: "contract",
            },
            {
                id: 5,
                optionTitle: "all",
                optionValue: "all",
            },
        ],
    },
    {
        id: 3,
        title: "Sort",
        name: "sort",
        options: [
            {
                id: 1,
                optionTitle: "Latest",
                optionValue: "latest",
            },
            {
                id: 2,
                optionTitle: "Oldest",
                optionValue: "oldest",
            },
            {
                id: 3,
                optionTitle: "A-Z",
                optionValue: "a-z",
            },
            {
                id: 4,
                optionTitle: "Z-A",
                optionValue: "z-a",
            },
        ],
    },
];

export default categories;