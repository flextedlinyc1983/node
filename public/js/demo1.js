$.fn.clickAll = function (control) {
    var el = $(this);
    var control = $(control);

    el.on('click', function () {
        if ($(this).prop("checked")) {
            control.each(function() {
                $(this).prop("checked", true);
            });
        }else{
            control.each(function() {
                $(this).prop("checked", false);
            });
        }
    })
    
    return this;
}


var InputCheckboxItem = Backbone.Model.extend({
    initialize: function () {            
    },
    validate: function (attrs) {        
    },
    defaults: function(){
        return {
            value:"",                
        }
    },        
});

var InputCheckboxList = Backbone.Collection.extend({
    model: InputCheckboxItem,        
});

var InputCheckboxView = Backbone.View.extend({
    // tagName: 'input',        
    template: _.template( $("#InputCheckbox-template").html() ),
    render: function() {            
        // this.$el.attr('type',"checkbox");
        // this.$el.attr('name',"user_active_col[]");
        // this.$el.attr('value',this.model.get('value'));
        // this.$el.after(this.model.get('value').toString());
        // this.$el.after("<p>Test</p>");
        $( this.el ).html( this.template(this.model.toJSON() ));
         
        return this;
    },
    initialize: function () {
        // this.listenTo(this.model, 'change', this.render);
        // this.listenTo(this.model, 'destroy', this.remove);
    },        
});  


var ClickAllView = Backbone.View.extend({  
  model: InputCheckboxList,

  render: function() {
      _.each(this.model.models, this.renderInputCheckboxItems, this);
      return this;
  },
  renderInputCheckboxItems: function(item) {
      $(this.el).append(new InputCheckboxView({model:item}).render().el);
  }
})





function getArticleList(){
    return new Promise(function(resolve, reject){       
        $.ajax("./data/demo_1.json").done(function(result){            
            resolve(result);
        })
    });
}


function initGallery (data) {
    // 儲存取得的JSON資料
    var allData = data;
    filteredData = allData;
    addItems();
}


function addItems (filter) {

    var elements = [],
        // 新增資料的陣列
        slicedData = filteredData.slice(addedd, addedd + addItemCount);

    // 對每個slicedDate的元素建立DOM元素
    $.each(slicedData, function (i, item) {
        var itemHTML =
                '<li class="gallery-item is-loading">' +
                    (i+addedd).toString() +
                    '<a href="' + item.images.large + '">' +
                        '<img src="' + item.images.thumb + '" alt="">' +
                        '<span class="caption">' +
                            '<span class="inner">' +
                                '<b class="title">' + item.title + '</b>' +
                                '<time class="date" datatime="' + item.date + '">' +
                                    item.date.replace(/-0?/g, '/') +
                                '</time>' +
                            '</span>' +
                        '</span>' +
                    '</a>' +
                '</li>';
        elements.push($(itemHTML).get(0));
    });

    // 將DOM元素陣列插入container，並執行Masonry配置
    $('#gallery').append(elements)
        
    
    // 新增結束後更新項目數目
    addedd += slicedData.length;

    // 當JSON中的資料皆已經顯示時，隱藏新增按鈕
    // if (addedd < filteredData.length) {
    //     $loadMoreButton.show();
    // } else {
    //     $loadMoreButton.hide();
    // }
    container.loading('stop');
}



function foogetArticleList(){
      getArticleList().then(function(data){
        return initGallery(data);
      })
};