/**
 * @module database
 * Manages the .json files used for storing needed data.
 */
const fs = require('fs');

/**
 * A simple database to save and load json files for the bot.
 */
class Database {
    #data;
    #name;
    /**
     * Create a "database" in the data folder as a json file.
     * @param {string} name The name of the database.
     */
    constructor(name) {
        this.#name = name;
        this.#data = undefined;
        this.load();
    }
    /**
     * Load the file or create an empty object and save it if it is not found.
     * The default filepath is ../data/.
     * @param force Force the program to either re-read or recreate the file. Default false.
     */
    load(force = false) {
        if (typeof this.#data === 'undefined' || force === true) {
            try {
                this.#data = JSON.parse(
                    fs.readFileSync(`./data/${this.name}.json`)
                );
            } catch (error) {
                this.#data = {};
                this.save();
            }
        }
    }

    get name() {
        return this.#name;
    }

    get data() {
        return this.#data;
    }

    set data(x) {
        if (typeof x !== 'undefined') {
            this.#data = x;
        } else {
            console.error('Attempt to set data failed.');
        }
    }

    setValue(key, value) {
        this.#data[key] = value;
    }

    /**
     * Save the current database to `../data/{name}.json`.
     */
    save() {
        fs.writeFileSync(
            `./data/${this.#name}.json`,
            JSON.stringify(this.#data),
            {flag: 'w'},
            (err) => console.log(err)
        );
    }
}

module.exports = {Database};
