import { CustomTable } from "./customTable.js";
import { movies } from "./data.js";

// Instanciate new CustomTable object 
let customTable = new CustomTable();

// Creating new well-formed table with custom 'id' and 'classes'
let table = customTable.createTable('user-table', 'table table-responsive table-striped m-0');

// Append table to an element
let appendElement = document.getElementById('append-element');
appendElement.append(table);

/**
 * Easier way:
 * 
 *  document
 *      .getElementById('append-element')
 *      .append(customTable.createTable('user-table', 'table table-responsive table-striped'));
 * 
 */


/**
 * Optional: Customization:
 */

/**
 * Custom Headers (WARNING: Do not use more values than the table can handle).
 * They will be rendered in the table by the array order.
 * If you don't declare any custom header, the headers will be the keys of the Object
 */

let customHeaders = [
    'Movie Title',
    'Duration (Minutes)',
    'Director',
    'Release Year',
    'Info'
];

/**
 * Custom Action - It will receive the "values" and the "spliced data" to iterate through each Object Content in the data Array.
 * The "values" are an Object.values() Array.
 * The "spliced data" is an Array ordered by the splice() method.
 */

let customAction = (values, splicedData) => {
    values[1] = values[1] + ' min'

    let button = customTable.createButton('Info', {
        'class': 'info-button btn btn-primary',
        'data-title': values[0]
    });

    values.push(button);
};

// Options Object parameter
let options = {
    'headers': customHeaders,
    'action': customAction
}

/** 
 * 
 * Fill table with data, custom headers and custom actions.
 * 
 * "movies" Array is an import from data.js. It's just a sample, used to build the table.
 * 
 */ 

customTable.fillTable(table, movies, options);


// "getMovie" is a custom function that returns the movie by the title
function getMovie(title) {
    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        if (movie.title == title) {
            return movie;
        }
    }
}

// Declaring click event function to test data attribute on button
let movieInfoButtons = document.getElementsByClassName('info-button');

for (let i = 0; i < movieInfoButtons.length; i++) {
    const button = movieInfoButtons[i];

    button.addEventListener('click', () => {
        let movie = getMovie(button.dataset.title);

        alert(`
        ------------- MOVIE -------------
        Title: ${movie.title}
        Duration: ${movie.duration} minutes
        Director: ${movie.director}
        Year: ${movie.year}
        ---------------------------------
        `);
    });
}