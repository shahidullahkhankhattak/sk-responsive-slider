const getCompetitiveSalary = (experienceYears, skills) => {
    return ('PKR ' + parseInt((0.09 * skills * experienceYears + 0.35) * 1e5))
    .replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

console.log(getCompetitiveSalary(10, 10)) // exp: 10, skills 10 = PKR 935,000
console.log(getCompetitiveSalary(10, 7)) // exp: 10, skills 7 = PKR 665,000
console.log(getCompetitiveSalary(5, 10)) // exp: 5, skills 10 = PKR 484,999
console.log(getCompetitiveSalary(5, 8)) // exp: 5, skills 8 = PKR 395,000
console.log(getCompetitiveSalary(3, 7)) // exp: 3, skills 7 = PKR 224,000
