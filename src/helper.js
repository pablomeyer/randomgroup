const gradeToValue = {
    'A+': 105,
    'A': 100,
    'A-': 95,
    'B+': 90,
    'B': 85,
    'B-': 80,
    'C+': 75,
    'C': 70,
    'C-': 65,
    'D+': 60,
    'D': 55,
    'D-': 50,
    'F+': 45,
    'F': 40,
    'F-': 35,
    'I':0
};

export const averageMeanGrade = (gradeArray) => {
    let gradeValueSum = 0;
    gradeArray.forEach((grade) => gradeValueSum += gradeToValue[grade]);

    const mean = Math.round(gradeValueSum/gradeArray.length);
    let nearestWholeNumberByFive = Math.round(mean/5) * 5;

    if (nearestWholeNumberByFive < 35) {
        nearestWholeNumberByFive = 35
    }

    let finalAverageGrade = Object.keys(gradeToValue).find((grade) => gradeToValue[grade] === nearestWholeNumberByFive);
    if (finalAverageGrade === undefined) {
        finalAverageGrade = "-";
    }
    return finalAverageGrade;
};


export const getBaseUrl= () => {
    const url = localStorage.getItem('baseurl');
    if (url === null) {
        return "http://localhost:8080/";
    }
    return url;

};

export const saveBaseUrl = async (baseurl) => {
    localStorage.setItem('baseurl', baseurl)
};

export const buildurl = (path) => {
    let url = getBaseUrl();
    if (!url.endsWith("/")){
        url += "/";
    }
    return url + path;
};