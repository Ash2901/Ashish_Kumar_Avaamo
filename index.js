const fs = require("fs");

// We have used try , catch in our code for error handling. i.e it returns error if file is not present.
fs.readFile('input_data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Input file is not valid', err);
        return;
    }
    try {
        const people = JSON.parse(data); // to read data from JSON file

        //Reduce function is used to return single value from an array based on operations
        const totalAge = people.reduce((acc, person) => {
            acc += person.age
            return acc;
        }, 0);

        //We know that average is sum/total so we used same formula over here
        const avgAge = totalAge / people.length;
        console.log(avgAge); // To display average of age. 

        //Filter function in JS is used to return all the values from an array which satisfy condition
        const greaterThan30 = people.filter((person) => {
            return person.age >= 30
        });
        //localeCompare is inbuil method in JavaScript which is used to comapre strings to find it comes before or after i.e for sorting
        greaterThan30.sort((a, b) => a.name.localeCompare(b.name));


        //To write required output in output file we decleared a variable
        const outputData = {
            avgAge,
            greaterThan30,
        };

        //To write result in output JSON file
        //JSON.stringify convert a JavaScript value to a JSON string
        fs.writeFile('output_data.json', JSON.stringify(outputData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing output file: ', err);
            } else {
                console.log('Output file (output_data.json) has been created successfully.');
            }
        });
    } catch (error) {
        console.error('Error parsing input JSON file:', error);
    }
})