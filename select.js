var Gaffa = require('gaffa'),
    crel = require('crel'),
    doc = require('doc-js'),
    statham = require('statham'),
    cachedElement;

function Select(){}
Select = Gaffa.createSpec(Select, Gaffa.View);
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
    this.selectElement = select;
};

Select.prototype.options = new Gaffa.Property({
    elements: [],
    update: function(view, value) {
        var property = this,
            gaffa = this.gaffa,
            element = view.selectElement;

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

        element.value = null;
        view.value.update(view, view.value.value);
    }
});

Select.prototype.value = new Gaffa.Property({
    update: function(view, value) {
        view.selectElement.value = value;
        for(var i = 0; i < view.options.elements.length; i++){
            if(view.options.elements[i].data === value){
                view.options.elements[i].selected = true;
                break;
            }
        }
    }
});

Select.prototype.showBlank = new Gaffa.Property();

Select.prototype.required = new Gaffa.Property(function(view, value){
    if (value){
        view.renderedElement.setAttribute('required', 'required');
    }else{
        view.renderedElement.removeAttribute('required');
    }
});

Select.prototype.enabled = new Gaffa.Property({
    update: function(view, value){
        view.selectElement[value ? 'removeAttribute' : 'setAttribute']('disabled','disabled');
    },
    value: true
});

module.exports = Select;
