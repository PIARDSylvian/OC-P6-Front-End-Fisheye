/**
 * Ceate custom select input
 */
class CustomSelect { // eslint-disable-line
    constructor(id, name, data) {
        this._data = data;
        this._id = id;
        this._name = name;
        this._idx = 0;
    }
    
    /**
     * Create list of elements
     * 
     * @returns dom object.
     */
    createOption() {
        const listbox = document.createElement('div');
        listbox.setAttribute("id", "listbox_" + this._id);
        listbox.setAttribute("role", "listbox");
        listbox.setAttribute("aria-labelledby", "label_" + this._id);
        listbox.setAttribute("tabindex", -1);

        this._data.map((name, idx) => {
            const option = document.createElement('a');
            option.setAttribute("id", this._id + "_" + idx);
            option.setAttribute("role", "option");
            option.setAttribute('aria-selected', `${idx === 0}`);
            option.dataset.value = idx;
            option.innerText = name;
            option.setAttribute("aria-label", "trier par" + name);

            if (idx === 0) option.classList.add('select');

            listbox.append(option);
        });

        return listbox
    }

    /**
     * Call this.changeSelect() if right Key
     * 
     * @returns {boolean} if move key or not
     */
    keydown(key, optionsGroup) {
        switch (key) {
            case 'ArrowDown':
                if (this._idx == (optionsGroup.length - 1)) {
                    this.changeSelect(0, optionsGroup)
                } else {
                    this.changeSelect(this._idx + 1, optionsGroup)
                }
                return true
            case 'Tab':
                if (this._idx == (optionsGroup.length - 1)) {
                    return false
                } else {
                    this.changeSelect(this._idx + 1, optionsGroup)
                }
                return true
            case 'ArrowUp':
                if (this._idx == 0) {
                    this.changeSelect((optionsGroup.length - 1), optionsGroup)
                } else {
                    this.changeSelect(this._idx - 1, optionsGroup)
                }
                return true
            case 'Shift':
                if (this._idx == 0) {
                    return false
                } else {
                    this.changeSelect(this._idx - 1, optionsGroup)
                }
                return true
            case 'Enter':
            case ' ':
                this.changeSelected(optionsGroup[this._idx], optionsGroup)
                return true
            default:
                return true
        }
    }

    /**
     * Add / Remove class select in list
     * 
     * @param {*} selected index of element selected 
     * @param {*} optionsGroup list of options
     */
    changeSelect(selected, optionsGroup) {
        this._idx = selected;
        optionsGroup.forEach((option, idx)=> {
            if (idx !== this._idx) {
                option.classList.remove('select');
            } else {
                option.classList.add('select');
            }
        });
    }

    /**
     * Change after select and validate or click, on option
     * 
     * @param {*} selected selected element
     * @param {*} optionsGroup list of elements
     */
    changeSelected(selected, optionsGroup) {
        const list = document.querySelector("#listbox_"+ this._id);
        optionsGroup.forEach((elem) =>{
            if (elem !== selected) list.appendChild(elem)
        });

        if (selected.getAttribute("aria-selected") === "false") {
            optionsGroup.forEach((option)=> option.setAttribute("aria-selected", (selected.id === option.id)));
        }
    }

    /**
     * Create Custom select
     *  
     * @returns dom object
     */
    createSelect() {
        const label = document.createElement('label');
        label.innerText = this._name;
        label.setAttribute("id", "label_" + this._id);
        label.setAttribute("for", this._id);

        const button = document.createElement('button');
        button.setAttribute("id", this._id);
        button.setAttribute("role", "button");
        button.setAttribute("aria-haspopup", "listbox");
        button.setAttribute("aria-expanded", false);
        button.setAttribute("aria-controls", "listbox_" + this._id);
        button.setAttribute("aria-labelledby", "label_" + this._id);
        button.setAttribute("tabindex", 0);
        button.setAttribute("type", "button");
        
        button.innerText = this._data[0];

        const options = this.createOption();

        const select = document.createElement('div');
        select.classList.add('custom_select');
        select.append(label ,button, options);

        /**
         * On button loose focus event
         */
        button.addEventListener('blur', function(){
            if(options.classList.contains('is-open')) {
                button.style.zIndex = -1;
            }
        });

        /**
         * On options loose focus event
         */
        options.addEventListener('blur', function(){
            options.classList.remove('is-open');
            options.style.height = "3em";
            button.style.zIndex = 2;
            this._idx = 0;
            button.innerText = options.querySelector('a[aria-selected="true"]').innerText;
            button.setAttribute("aria-expanded", false);
        });

        /**
         * On button click event
         */
        button.addEventListener('click', (e) => {
            options.classList.add('is-open');
            options.style.height = "9em";
            button.setAttribute("aria-expanded", true);
            if(e.pointerId == 1 ) options.querySelector('a').classList.remove('select');
            options.focus();
        });

        /**
         * On option keydown event
         */
        options.addEventListener('keydown', (e) => {
            e.preventDefault();
            const optionsGroup = options.querySelectorAll('a');
            const mouveAction = this.keydown(e.key, optionsGroup);
            // if (!mouveAction) options.blur();
        })

        /**
         * On options click event
         */
        options.addEventListener('click', (e) => {
            const optionsGroup = options.querySelectorAll('a');
            this.changeSelected(e.target, optionsGroup);
            button.focus();
        })
    
        return select;
    }
}