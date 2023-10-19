const people = [
    { name: "John", dob: "1990-01-01" },
    { name: "Jane", dob: "2000-05-05" },
    { name: "Doe", dob: "2010-11-12" },
    { name: "Alice", dob: "1987-06-15" },
    { name: "Bob", dob: "1995-07-20" },
    { name: "Charlie", dob: "2005-08-25" },
    { name: "David", dob: "1998-09-30" },
    { name: "Eva", dob: "2003-10-10" },
    { name: "Frank", dob: "1980-02-21" },
    { name: "Grace", dob: "2008-03-26" },
    { name: "Hannah", dob: "1992-04-02" },
    { name: "Ivan", dob: "1999-12-17" },
    { name: "Jasmine", dob: "2002-03-08" },
    { name: "Kevin", dob: "1985-11-23" },
    { name: "Lana", dob: "2001-05-19" },
    { name: "Mike", dob: "1983-04-24" },
    { name: "Nancy", dob: "2007-09-09" },
    { name: "Oscar", dob: "1988-06-06" },
    { name: "Patty", dob: "1994-10-15" },
    { name: "Quincy", dob: "2004-07-07" },
    { name: "Rachel", dob: "1982-08-12" },
    { name: "Steve", dob: "1997-09-27" },
    { name: "Tina", dob: "2006-01-31" },
    { name: "Ulysses", dob: "1984-02-05" },
    { name: "Vicky", dob: "1993-12-22" },
    { name: "William", dob: "1986-01-16" },
    { name: "Xena", dob: "2009-05-14" },
    { name: "Yves", dob: "1991-06-29" },
    { name: "Zara", dob: "1996-07-04" }
];

function displayData(data) {
    $("#display").empty();
    data.forEach(person => {
        $("#display").append(`<div>${person.name} - ${person.dob}</div>`);
    });
}

$(document).ready(function() {
    displayData(people);

    $('[data-action="oldest"]').click(function() {
        const oldest = _.minBy(people, person => new Date(person.dob).getTime());
        displayData([oldest]);
    });

    $('[data-action="youngest"]').click(function() {
        const youngest = _.maxBy(people, person => new Date(person.dob).getTime());
        displayData([youngest]);
    });

    $('[data-action="sortAsc"]').click(function() {
        const sortedAsc = _.sortBy(people, 'dob');
        displayData(sortedAsc);
    });

    $('[data-action="sortDesc"]').click(function() {
        const sortedDesc = _.sortBy(people, 'dob').reverse();
        displayData(sortedDesc);
    });

    $('[data-action="upcomingBdays"]').click(function() {
        console.log("Button clicked");

        const today = dayjs();
        console.log("Today is: ", today);

        const sortedByUpcomingBirthday = [...people].sort((a, b) => {
            const nextBirthdayA = today.isAfter(dayjs(a.dob)) ? dayjs(a.dob).add(today.diff(dayjs(a.dob), 'year') + 1, 'year') : dayjs(a.dob);
            const nextBirthdayB = today.isAfter(dayjs(b.dob)) ? dayjs(b.dob).add(today.diff(dayjs(b.dob), 'year') + 1, 'year') : dayjs(b.dob);

            console.log(`Next birthday for ${a.name} is ${nextBirthdayA}`);
            console.log(`Next birthday for ${b.name} is ${nextBirthdayB}`);

            return nextBirthdayA.diff(today) - nextBirthdayB.diff(today);
        });

        console.log("Sorted data: ", sortedByUpcomingBirthday);

        const nextFive = sortedByUpcomingBirthday.slice(0, 5);
        console.log("Next five: ", nextFive);

        displayData(nextFive);
    });


    $('[data-action="adults"]').click(function() {
        const adults = _.filter(people, person => dayjs().diff(person.dob, 'year') >= 18);
        displayData(adults);
    });

    $('[data-action="minors"]').click(function() {
        const minors = _.filter(people, person => dayjs().diff(person.dob, 'year') < 18);
        displayData(minors);
    });

    $('[data-action="shuffle"]').click(function() {
        const shuffled = _.shuffle(people);
        displayData(shuffled);
    });

    $('[data-action="bornThisMonth"]').click(function() {
        const thisMonth = dayjs().month();
        const bornThisMonth = _.filter(people, person => dayjs(person.dob).month() === thisMonth);
        displayData(bornThisMonth);
    });

    $('[data-action="reverse"]').click(function() {
        const reversed = _.reverse([...people]);
        displayData(reversed);
    });
});
