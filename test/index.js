var Gaffa = require('gaffa'),
    Select = require('../'),
    Text = require('gaffa-text'),
    gaffa = new Gaffa();

// Register used viewItems with gaffa
gaffa.registerConstructor(Select);
gaffa.registerConstructor(Text);

// create a button to test with
var text = new Text();
text.text.binding = '(join " " "Current value of [value]:" [value])';

var select1 = new Select();
select1.value.binding = '[value]';
select1.options.value = ['hello', 'world'];

var select2 = new Select();
select2.value.binding = '[value]';
select2.options.value = ['hello', 'world'];
select2.enabled.value = false;

var select3 = new Select();
select3.value.binding = '[value]';
select3.options.value = ['hello', 'world'];
select3.showBlank.value = true;

var select4 = new Select();
select4.value.binding = '[value]';
select4.options.value = ['hello', 'world'];
select4.options.textBinding = '(join " " "value:" option)';

var select5 = new Select();
select5.value.binding = '[value]';
select5.options.value = ['hello', 'world'];
select5.options.textBinding = '(join " " "value:" option)';
select5.options.valueBinding = '(? (== option "hello") "world" "hello")';

// An example model
gaffa.model.set({
    value:''
})

// Add the view on load.
window.onload = function(){
    gaffa.views.add([
        text,
        select1,
        select2,
        select3,
        select4,
        select5
    ]);
};

// Globalise gaffa for easy debugging.
window.gaffa = gaffa;