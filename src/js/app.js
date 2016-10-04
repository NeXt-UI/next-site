$(document).ready(function(){
    var docsLink=$('.js-docs');
    var dropdownMenu=$('.m-dropdown-menu');
    docsLink.click(function(){
        dropdownMenu.toggle();
    });
    docsLink.mouseenter(function(){
        dropdownMenu.show();
    });
    docsLink.mouseleave(function(){
        dropdownMenu.hide();
    });
    dropdownMenu.mouseenter(function(){
        dropdownMenu.show();
    });
    dropdownMenu.mouseleave(function(){
        dropdownMenu.hide();
    });
});