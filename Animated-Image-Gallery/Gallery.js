﻿// Gallery.js

(function (ns) {

    ns.Gallery = function (id) {

        var gallery = $('#' + id);
        gallery.css({
            'perspective' : '250px',
            'perspective-origin' : '50% 50%'

        });
        var images = gallery.find('.galleryImage');
        console.log(images);

        var xPos = 50;
        var yPos = 50;
        var gWidth = gallery.width();
        var hoverWait = false; // helps with the jerky fast mouse over
        var showLargeImage = false;


        images.each(function (idx, el) {
          var img = $(el);
           img.data('homeX', xPos);
            console.log(img.data);
           img.data('homeY', yPos);
            img.data('currentScale', 1);
            console.log(xPos, yPos);
            img.css({
                'left': xPos,
                'top': yPos,
                'width': img.width() * 0.25
            });
            xPos += 95;
            if (xPos > gWidth - 100) {
                xPos = 50;
                yPos += 115;
            } // end each function

            img.hover(function(event){
                    if(showLargeImage) return;
                    hoverWait = false;
                var target = $(event.target);
                    bringImageToTop(target);
                    avoidImage(target);

                animateImage(target, 500, target.data('homeX'), target.data('homeY'),2);
            },
                function (event){
                    if(showLargeImage) return;
                    hoverWait = true;
                    setTimeout(function(){
                        if (hoverWait)
                            returnAllToNormal();
                    },200);

                }
            ); // end hover

            img.click(function(){ // here we will enlarge the target image when clicked
                if (!showLargeImage){
                    // show large image
                    showLargeImage  = true;
                    animateImage(img, 500, 200, 150,4);
                    // fade and rotate away
                    images.each(function(idx,el){
                        var target = $(el);
                        if (img[0] != target[0]) {
                            target.animate({'opacity' : 0 },
                                {
                                    duration: 1000,
                                    step: function(now){
                                        target.css('transform', 'rotateZ(' + (90 * now - 90) + 'deg)');
                                    }
                                });
                        }
                    })
                } else {
                    animateImage(img,500,img.data('homeX'), img.data('homeY'), 1);

                    // fade in and rotate back to normal
                    images.each(function(idx,el){
                        var target = $(el);
                        if (img[0] != target[0]){
                            target.animate({'opacity': 1},
                                {
                                    duration: 500,
                                    step: function(now){
                                        target.css('transform', 'rotateZ(' + (90 * now - 90) + 'deg)');
                                    },
                                    complete: function(){
                                        if (showLargeImage){
                                            showLargeImage = false;
                                            returnAllToNormal();
                                        }
                                    }
                                }
                            )
                        }
                    })
                }

            })
        });

        var bringImageToTop = function(img){
            images.each(function(idx, el){
                $(el).css('z-index',0);
            });
            img.css('z-index',1);
        };

        var avoidImage = function(target){ // sets some spacing between the hover image and all others
            images.each(function(idx,el){
                var img = $(el);
                if (img[0] != target[0]){ // if the image is NOT the target image

                    var xdiff = img.data('homeX') - target.data('homeX');
                    var ydiff = img.data('homeY') - target.data('homeY');

                    var adj = 40;
                    var xAdjust = (xdiff > 0) ? adj : (xdiff < 0) ? -adj : 0;
                    var yAdjust = (ydiff > 0) ? adj : (ydiff < 0) ? -adj : 0;

                    if (yAdjust != 0) xAdjust = 0;

                    var newX = img.data('homeX') + xAdjust;
                    var newY = img.data('homeY') + yAdjust;

                    animateImage(img,500,newX,newY,1);
                }
            })
        };

        var returnAllToNormal = function(){
            images.each(function(idx, el){
                var img = $(el);
                animateImage(img, 500, img.data('homeX'), img.data('homeY'), 1);
            });
        }; // end return to normal

        var animateImage = function(img,duration,left,top,scale){
            img.stop();
            img.css('textIndent', img.data('currentScale'));
            img.animate({
                'left': left,
                'top': top,
                'textIndent': scale // use textIndent css property for scaling
            },
                {

                    duration: duration,
                    step: function(now,fx){
                        if (fx.prop === 'textIndent'){
                            // scale
                            img.data('currentScale', now);
                            img.css('transform', 'scale( ' + now +' ) ');
                        }
                        else if (fx.prop === 'left')
                        img.css('left', now);
                        else if (fx.prop === 'top')
                        img.css('top', now);
                    }

                })
        }

    }
}(window.PS = window.PS || {}));

