
// $("button").on("click",function () {
//     $("h1").slideToggle();
// });

$("button").on("click",function(){
    $("h1").slideUp().slideDown().animate({opacity: 0.5});
});