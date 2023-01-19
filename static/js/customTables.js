/**
 * @author Guilherme Rocha
 * @repository (https://github.com/guilherme-or/CustomTables)
 */
export class CustomTable {
    /**
     * 
     * On object instance, creates an HTML 'table' element with 'thead' and 'tbody'.
     * Also provides 'id' and 'class' attributes to the table as parameters.
     * 
     * @param {String} tableId Table element 'id' attribute
     * @param {String} tableClasses Table element 'class' attribute
     * 
     */
    constructor(tableId = '', tableClasses = '') {
        this.table = this.createTable(tableId, tableClasses);
    }

    /**
     * 
     * Returns the created 'table' element
     * 
     * @returns {Element} Custom Table Element
     * 
     */
    get element() {
        return this.table;
    }

    /**
     * **Add-On**
     * 
     * Custom button creation with: 
     * 
     * *children*: Can be an HTML Element, for example: svg, i, img or String text
     * 
     * *attributes*: Button attributes to add, for example: id, class, title, onclick, data-set, disabled.
     * The attributes will be added as String with 'setAttributes' method, for each object key and value.
     * 
     * @param {Element} children Elements to be appended to the button. Also handles Strings
     * @param {Object} attributes Button optional attributes Object.
     * @returns {Element} Button with Classes, Id, onClick Function, Title and Children Elements
     * 
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
     * Creates well-formed HTML 'table', with 'thead' and 'tbody' elements.
     * Also provides 'id' and 'class' attributes to the table.
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
     * Fill the table selected element with data
     * 
     * @param {String} tableElement Only accepts *thead* or *tbody* as String
     * @param {String} elementType Only accepts *th* or *td* as String
     * @param {Array} data 
     * 
     */
    #fillTableElement(tableElement, elementType, data) {
        let tr = document.createElement('tr');

        data.forEach(dataValue => {
            let tableValue = dataValue == null ? '' : dataValue;

            const element = document.createElement(elementType);
            element.append(tableValue);

            tr.append(element);
        });

        let selectedElement = this.table.querySelector(tableElement);
        selectedElement.append(tr);
    }

    /**
     * 
     * Fill the created table with *data* Array.
     * Uses *option* Object to customize the table
     * 
     * **Options**:
     * 
     * **splice**: How much data is going to be removed from each object in the array. 
     * 
     * _Default_: 0 (None)
     * 
     * **headers**: String Array of custom table headers to be displayed. 
     * 
     * _Default_: Object.keys(data[0]) (The keys of the first object of *data* JSON)
     * 
     * **action**: Callable custom function. 
     * Receives *values* Array of each Object in the JSON. 
     * Can get and modify each value before filling the Table.
     * Also receives *splicedData* Array, containing the spliced data of each object in the Array, specified by the *splice* key.
     * 
     * _Default_: (values, splicedData) => {} (Empty function)
     * 
     * @param {JSON} data 
     * @param {Object} options Options (Number splice, Array headers, CallableFunction action)
     * 
     */
    fillTable(data, options) {
        if (data.length === 0) { return }

        // Initialize options
        const defaultOptions = {
            'splice': 0,
            'headers': Object.keys(data[0]),
            'action': (values, splicedData) => { }
        }

        options = Object.assign(defaultOptions, options);

        // Splice data from headers
        this.#spliceData(options.headers, options.splice);

        // Fill table headers
        this.#fillTableElement('thead', 'th', options.headers);

        // Loop through table data
        data.forEach(row => {
            const values = Object.values(row);

            const splicedData = this.#spliceData(values, options.splice);

            // call customFunction, with data values and splicedData array
            options.action(values, splicedData);

            // fill table with custom data values
            this.#fillTableElement('tbody', 'td', values);
        });
    }

    /**
     * 
     * Shift data from an Array of values.
     * 
     * Shift length is equal to the *splice* option.
     *
     * Returns an Array with the shifted data.
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