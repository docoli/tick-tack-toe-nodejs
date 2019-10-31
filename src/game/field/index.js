function Field(name) {
    this.value = null;
    this.name = name
}

Field.prototype.get = function() {
    return this.value;
};

Field.prototype.mark = function(mark) {
    if(this.value === null) {
        this.value = mark;
        console.log('Field ' + this.name + ' was marked with: ' + mark);

        return { error: false };
    }

    return { message: 'Already marked', error: true };
};

module.exports = Field;
