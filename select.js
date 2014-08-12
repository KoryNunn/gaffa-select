var Gaffa = require('gaffa'),
    FormElement = require('gaffa-formelement'),
    crel = require('crel'),
    doc = require('doc-js'),
    statham = require('statham'),
    cachedElement;

function Select(){}
Select = Gaffa.createSpec(Select, FormElement);
Select.prototype._type = 'select';
Select.prototype.render = function(){
    var view = this,
        select,
        renderedElement = crel('span',
            select = crel('select')
        );

    renderedElement.className = 'select';

    doc.on(this.updateEventName || "change", select, function(event){
        var option,
            data;

        for(var i = 0; i < select.childNodes.length; i++){
            if(select.childNodes[i].value === select.value){
                option = select.childNodes[i];
            }
        }

        data = option && option.data || undefined;

        view.value.set(data);
    });

    this.renderedElement = renderedElement;
    this.formElement = select;
};

Select.prototype.options = new Gaffa.Property({
    elements: [],
    update: function(view, value) {
        var property = this,
            gaffa = this.gaffa,
            element = view.formElement;

        if(!element){
            return;
        }

        element.innerHTML = '';
        property.elements = [];

        if(!value){
            return;
        }

        if(view.showBlank.value)
        {
            element.appendChild(document.createElement("option"));
        }

        for(var key in value){
            var optionData = value[key];
            if(optionData !== undefined){
                var option = document.createElement('option');

                option.value = key;
                option.data = property.valueBinding ? gaffa.gedi.get(property.valueBinding, property.getPath(), {option: optionData}) : optionData;
                option.textContent = property.textBinding ? gaffa.gedi.get(property.textBinding, property.getPath(), {option: optionData}) : optionData;

                element.appendChild(option);
                property.elements.push(option);
            }
        }

        if(view.value._bound){
            view.value.update(view, view.value.value);
        }
    }
});

Select.prototype.value = new Gaffa.Property({
    update: function(view, value) {

        view.formElement.value = value;

        // WOO BROWSER COMPATIBILITY BEST FUN EVER!
        view.formElement.selectedIndex = -1;

        for(var i = 0; i < view.options.elements.length; i++){
            if(view.options.elements[i].data === value){
                view.options.elements[i].selected = true;
                break;
            }
        }

        view.valid.set(view.formElement.validity.valid);
    }
});

Select.prototype.afterInsert = function(){
    // because all the browsers do something different,
    // sync them all up after insersion.
    this.value.update(this, this.value.value);
}

Select.prototype.showBlank = new Gaffa.Property();
Select.prototype.enabled.update = function(view){
    FormElement.prototype.enabled.update.apply(this, arguments);
    view.renderedElement[value ? 'removeAttribute' : 'setAttribute']('disabled','disabled');
}

module.exports = Select;
