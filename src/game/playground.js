const FieldModule = require('./field/index');

function Playground(name) {
    this.name = name;
    this.fields = initializeFields();
}

module.exports = Playground;

function initializeFields() {
    let fields = [];

    for(let i = 0; i < 9; i++) {
        fields.push(new FieldModule(i + 1));
    }

    return fields;
}

