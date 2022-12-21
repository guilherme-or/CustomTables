export class CustomTable {
    constructor() { }

    /**
     * 
     * @param {Element} children Elements to be appended to the button
     * @param {Object} attributes Button optional attributes (Example: Id, Classes, OnClick, Title)
     * @returns {Element} Button with Classes, Id, onClick Function, Title and Children Elements
     */
    createButton(children = '', attributes = {}) {
        let btn = document.createElement('button');

        const keys = Object.keys(attributes) || [];

        keys.forEach(key => {
            btn.setAttribute(key, attributes[key]);
        });

        btn.append(children);

        return btn;
    }

    /**
     * 
     * @param {String} tableId 
     * @param {String} tableClasses 
     * @returns {Element} Structured Table
     * 
     */
    createTable(tableId = '', tableClasses = '') {
        let table = document.createElement('table');
        table.id = tableId;
        table.className = tableClasses;

        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        table.append(thead);
        table.append(tbody);

        return table;
    }

    /**
     * 
     * @param {Element} table 
     * @param {String} tableElement 
     * @param {String} elementType 
     * @param {Array} data 
     * 
     */
    #fillTableElement(table, tableElement, elementType, data) {
        let tr = document.createElement('tr');

        data.forEach(dataValue => {
            let tableValue = dataValue == null ? '' : dataValue;

            const element = document.createElement(elementType);
            element.append(tableValue);

            tr.append(element);
        });

        let selectedElement = table.querySelector(tableElement);
        selectedElement.append(tr);
    }

    /**
     * 
     * @param {Element} table 
     * @param {JSON} data 
     * @param {Object} options Options (Number splice, Array headers, CallableFunction action)
     * 
     */
    fillTable(table, data, options) {
        // Initialize options
        const defaultOptions = {
            'splice': 0,
            'headers': [],
            'action': (values, splicedData) => { }
        }

        options = Object.assign(defaultOptions, options);

        // Define table headers
        let headers = options.headers.length == 0 ? Object.keys(data[0]) : options.headers;

        // Splice data from headers
        this.#spliceData(headers, options.splice);

        // Fill table headers
        this.#fillTableElement(table, 'thead', 'th', headers);

        // Loop through table data
        data.forEach(row => {
            const values = Object.values(row);

            const splicedData = this.#spliceData(values, options.splice);

            // call customFunction, with data values and splicedData array
            options.action(values, splicedData);

            // fill table with custom data values
            this.#fillTableElement(table, 'tbody', 'td', values);
        });
    }

    /**
     * 
     * @param {Array} data 
     * @param {Number} length Splice/Shift length
     * @returns {Array} Spliced data array 
     */
    #spliceData(data, length) {
        let splicedData = [];
        for (let i = 0; i < length; i++) {
            splicedData.push(data.shift());
        }
        return splicedData;
    }
}