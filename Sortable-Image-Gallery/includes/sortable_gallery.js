/*  JavaScript Document
 created by Jeffrey McCommas
 www.leveltenstudios.co
 January 2014
* */

var thumbnailSpacing = 15;

$(function () { // Ready Function

    $('a.sortLink').on('click', function(e){ // add the checkbox to click event
        $('a.sortLink').removeClass('selected');
        $(this).addClass('selected');
        var keyword = $(this).attr('data-keywords');
        sortThumbnails(keyword);
        e.preventDefault();
    });

    $('.gallery .sorting').css('margin-bottom', thumbnailSpacing +'px');
    $('.thumbnail_container a.thumbnail').addClass('showMe').addClass('fancybox').attr('rel','group');

    positionThumbnails();
    setInterval('checkViewport()',750);

});// end document ready

function checkViewport(){ // responsive function to check viewport

    var photoWidth = $('photos').width();
    var thumbnailContainerWidth = $('.thumbnail_container').width();
    var thumbnailWidth = $('.thumbnail_container a.thumbnail:first-child').outerWidth();

    if (photoWidth < thumbnailContainerWidth){
        positionThumbnails();
    }
    if ( (photoWidth - thumbnailWidth ) > thumbnailContainerWidth ){
        positionThumbnails();
    }


} // end check view port fn

function sortThumbnails(keyword){ // lets sort the thumbs by data keyword now

    $('.thumbnail_container a.thumbnail').each(function(){

        var thumbnailKeywords = $(this).attr('data-keywords');
        if (keyword == 'all'){
            $(this).addClass('showMe').removeClass('hideMe').attr('rel','group');
        } else {

            if (thumbnailKeywords.indexOf(keyword) != -1){
                $(this).addClass('showMe').removeClass('hideMe').attr('rel','group');
            }else {
                $(this).addClass('hideMe').removeClass('showMe').attr('rel','group');
            }

        }

    }); positionThumbnails(); // invoke the positionThumbnails

} // end sortThumbnails FN

// Position the thumbnail images
function positionThumbnails(){

    $('.thumbnail_container a.thumbnail.hideMe').animate({opacity:0},500,function(){
        $(this).css({
            'display': 'none',
            'top': 0,
            'left': 0
        })
    }); // end positionThumbnails FN

    detectFancyboxLinks();


    var containerWidth = $('.photos').width();
     console.log('containerWidth:', containerWidth);

    var thumbnail_R = 0;
    var thumbnail_C = 0;
    var thumbFirstChild = $('a.thumbnail img:first-child');

    var thumbnailWidth = thumbFirstChild.outerWidth() + thumbnailSpacing;
      console.log('thumbnailwidth: ' , thumbnailWidth);

    var thumbnailHeight = thumbFirstChild.outerHeight() + thumbnailSpacing;
     console.log('thumbnailheight: ' , thumbnailHeight);

    var max_C = Math.floor(containerWidth / thumbnailWidth);
     console.log('max_C',  max_C);


    $('.thumbnail_container a.thumbnail.showMe').each(function(index){

        var remainder = (index % max_C) / 100;
        console.log('index', index);
        console.log('remainder' , remainder);

        if (remainder == 0){
            if (index != 0){
                thumbnail_R += thumbnailHeight
            }
            thumbnail_C = 0;
        } else {
            thumbnail_C += thumbnailWidth;

        } // end if

        $(this).css('display', 'block').animate({
            'opacity': 1,
            'top': thumbnail_R + 'px',
            'left': thumbnail_C + 'px'
        },500);

        var newWidth = max_C * thumbnailWidth;
        var newHeight = thumbnail_R + thumbnailHeight;
            console.log(newHeight,newWidth);
        $('.thumbnail_container').css({
            'width': newWidth +'px',
            'height': newHeight +'px'
        });

        var sortingWidth = $('.thumbnail_container').width() / thumbnailWidth;
        newWidth = sortingWidth * thumbnailWidth - thumbnailSpacing;
        $('.sorting').css('width',newWidth+'px');
        console.log(sortingWidth);


    }); // end each


} // end PositionThumbnails fn

function detectFancyboxLinks(){ // detect any fancy box links and then invoke a fn
    $('a.fancybox[rel="group"]').fancybox({
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'titlePosition': 'over',
        'speedIn': 500,
        'overlayColor': '#000',
        'padding': 0,
        'overlayOpacity':.75
    });

}