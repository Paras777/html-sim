global.jQuery = require('jquery');
mustache = require('mustache');


jQuery(document).ready(function($){
    alert('hello')
    var jqxhr = $.getJSON('data.json', function(){

    }).done(function(data){
        var template = $('#template').html();
        var showTemplate = mustache.render(template, data);
        ('#gallery').html(showTemplate);
    });
    
});

var bootstrap = require('bootstrap');