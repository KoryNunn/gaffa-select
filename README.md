gaffa-select
============

select view for gaffa

## Install:

    npm i gaffa-select
    
## Add to gaffa:

    gaffa.views.constructors.select = require('gaffa-select');

# API

## Properties (instanceof Gaffa.Property)

### options

Bind to an array of items to use as options in the select box

eg:

    gaffa.model.set('[data]', [1,2,3]);

    select.options.binding = '[data]';
  
You can override what to show as text for each option via:

    select.options.textBinding = <some binding>
  
When the textBinding expression is evaluated, the value of the option is available in context, as 'option'
  
For example:

    select.options.textBinding = 'option';
  
Would map to 1, 2 and 3 for each respective option element.

You can use any kind of expression you like for the textBinding, eg:

    gaffa.model.set('[someLabels]', ['a','b','c']);

    select.options.textBinding = '(getValue [someLabels] option)';
  
Would map to a, b and c for each respective option element.

You can also override what value gets set to the model when a given option is selected via: 

    select.options.valueBinding = <some binding>
  
Which has the same implementation as textBinding.

eg:

    select.options.textBinding = '(/ option 2)';
  
Would map to 0.5, 1 and 1.5 for each respective option element.

### value

Bind the value of the option view to the model.

    select.value.binding = '[someBinding]';

value is a two way property, changing the option views selection will update the model based on this properties binding,
and changing the model will update the view.

### showBlank

Whether to show a blank option in the select control or not.

    select.showBlank.value = true;
    
Would add a blank option who's value is undefined, to the select control.
  
