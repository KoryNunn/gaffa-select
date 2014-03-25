var Gaffa = require('gaffa'),
    crel = require('crel'),
    doc = require('doc-js'),
    statham = require('statham'),
    viewType = "select",
    cachedElement;

function Select(){}
Select = Gaffa.createSpec(Select, Gaffa.View);
Select.prototype.type = viewType;

Select.prototype.render = function(){
    var viewModel = this,
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

        viewModel.value.set(data);
    });

    this.renderedElement = renderedElement;

};

Select.prototype.options = new Gaffa.Property({
    elements: [],
    update: function(viewModel, value) {
        var property = this,
            element = viewModel.renderedElement.childNodes[0];

        if(!element){
            return;
        }

        element.innerHTML = '';
        property.elements = [];

        if(!value){
            return;
        }

        if(viewModel.showBlank.value)
        {
            element.appendChild(document.createElement("option"));
        }

        for(var key in value){
            var optionData = value[key];
            if(optionData !== undefined){
                var option = document.createElement('option');

                option.value = option.data = property.valueBinding ? gaffa.gedi.get(property.valueBinding, property.getPath(), {option: optionData}) : optionData;
                option.textContent = property.textBinding ? gaffa.gedi.get(property.textBinding, property.getPath(), {option: optionData}) : optionData;

                element.appendChild(option);
                property.elements.push(option);
            }
        }

        element.value = null;
        viewModel.value.update(viewModel, viewModel.value.value);
    }
});

Select.prototype.value = new Gaffa.Property({
    update: function(viewModel, value) {
        viewModel.renderedElement.childNodes[0].value = value;
        for(var i = 0; i < viewModel.options.elements.length; i++){
            if(viewModel.options.elements[i].data === value){
                viewModel.options.elements[i].selected = true;
                break;
            }
        }
    },
    sameAsPrevious: function(){
        var oldHash = this.getPreviousHash(),
            newHash = statham.stringify(this.value);

        this.setPreviousHash(newHash);

        return oldHash === newHash;
    }
});

Select.prototype.showBlank = new Gaffa.Property();

module.exports = Select;