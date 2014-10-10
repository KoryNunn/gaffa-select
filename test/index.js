var Gaffa = require('gaffa'),
    Select = require('../'),
    Text = require('gaffa-text'),
    gaffa = new Gaffa();

// Register used viewItems with gaffa
gaffa.registerConstructor(Select);
gaffa.registerConstructor(Text);

var text = new Text();
text.text.binding = '(join " " "Current value of [value]:" [value])';

var text2 = new Text();
text2.text.binding = '(join " " "Current value of [value2]:" [value2])';

var select1 = new Select();
select1.value.binding = '[value]';
select1.options.value = ['hello', 'world'];

var select2 = new Select();
select2.value.binding = '[value]';
select2.options.value = ['hello', 'world'];
select2.enabled.value = false;

var select3 = new Select();
select3.value.binding = '[value]';
select3.options.binding = '[options]';
select3.showBlank.value = true;

var select4 = new Select();
select4.value.binding = '[value]';
select4.options.binding = '[options]';
select4.options.textBinding = '(join " " "value:" option)';

var select5 = new Select();
select5.value.binding = '[value]';
select5.options.binding = '[options]';
select5.options.textBinding = '(join " " "value:" option)';
select5.options.valueBinding = '(? (== option "hello") "world" "hello")';

var select6 = new Select();
select6.value.binding = '[value]';
select6.options.binding = '[options]';
select6.required.value = true;

var select7 = new Select();
select7.value.binding = '[value]';
select7.options.binding = '[options]';
select7.validity.binding = '(? [value] null "custom required")';

var select8 = new Select();
select8.value.binding = '[value2]';
select8.options.binding = '{"label":"True" "value":true},{"label":"False" "value":false}';
select8.options.textBinding = 'option.label';
select8.options.valueBinding = 'option.value';

// An example model
gaffa.model.set({
    value:'',
    options:[
        'hello',
        'world'
    ]
});

setTimeout(function(){
    gaffa.model.set('[options/3]', 'another option');
    gaffa.model.set('[value]', '');
}, 2000);

setTimeout(function(){
    gaffa.model.set('[value]', 'hello');
}, 4000);

// Add the view on load.
window.onload = function(){
    gaffa.views.add([
        text,
        select1,
        select2,
        select3,
        select4,
        select5,
        select6,
        select7,
        text2,
        select8
    ]);
};

// Globalise gaffa for easy debugging.
window.gaffa = gaffa;