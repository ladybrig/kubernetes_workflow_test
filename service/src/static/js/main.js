/*********************************** 
 *    This is the main javascript file for the BBH_Demo page
 *    The function of this file is to dynamically create HTML content based on the images in the static/images/world_images folder
 *          and text files with the same name in the doc/image_text folder
*************************************/

/******** functions ********/
// function to create an HTML div section for an image and text
function imageDiv( $image_url, $text_url, $even ){
    var $image_html = "<div>";
    var $text = "";
    $.get( ('/static/images/world_images/'+$text_url) , function(data) {
        $text = data;
     }, 'text');
    if( $even ){
        $image_html = $image_html + '<div class=world_image><img src="/static/images/world_images/'+$image_url+'"></div>';
        $image_html = $image_html + '<div class="image_text">'+$text+'</div>';
    } else {
        $image_html = $image_html + '<div class="image_text">'+$text+'</div>';
        $image_html = $image_html + '<div class=world_image><img src="/static/images/world_images/'+$image_url+'"></div>';
    }
    $image_html = $image_html + "</div>";
    return $image_html;
}

/******** main code ********/

/*** initialize variables ***/
var $html_string = "<div>";
var $img_folder = "/static/images/world_images/";
var $image_array = new Array();
var i = 1;
var $lines = new Array();
var $image_html = "";
var $text = "";

// $.ajax({
//     url : $img_folder,
//     success: function (data) {
//         $(data).find("a").attr("href", function (i, val) {
//             if( val.match(/\.(jpe?g|png|gif)$/) ) { 
//                 $image_array.add( val.split("/")[-1] );
//             } 
//         });
//     }
// });

$.get( ('static/world_image_list.txt') , function(data) {
    $lines = data.split("\n");
    for (var i = 0, len = ($lines.length); i < len; i++) {
        if( $lines[i] != "" ){
            var $line_split = $lines[i].split("/");
            $image_array.push( $line_split[($line_split.length)-1] );
        }
    }
    $image_array = $image_array.sort()
    // Loop through each image
    var $content_html = $("#main_content").html( );
    for(var j = 0, len = ($image_array.length); j < len; j++) {
            $curr_image = $image_array[j]
            $curr_text = $curr_image.split(".")[0] + ".txt"
            console.log("Current text: "+$curr_text+" Current pic:"+$curr_image);
            $image_html = "<div class='image-block'>";
            $content_html = $("#main_content").html( );
            $text = "";
            $.ajax({ type: "GET",   
                url: '/static/world_images/'+$curr_text,   
                async: false,
                success : function($text)
                {
                    console.log($text)
                    // if the image # is even, pic is on the left and text is on the right
                    if( j % 2 == 0 ){
                        //create html divs to hold the text and the image
                        $image_html += '<div class=world-image><img src="/static/images/world_images/'+$curr_image+'"></div>';
                        $image_html += '<div class="image-text">'+$text+'</div>';
                    //else: pic is on the right and text is on the left
                    } else {
                        //create html divs to hold the text and the image
                        $image_html += '<div class="image-text">'+$text+'</div>';
                        $image_html += '<div class=world-image><img src="/static/images/world_images/'+$curr_image+'"></div>';
                    }
                    $image_html += "</div>";
                    // Append the div content into the main_content section
                    $("#main_content").html( $content_html + $image_html  );
                },
                error: function() {
                    $image_html += '<div class=world-image-notext><img src="/static/images/world_images/'+$curr_image+'"></div>';
                    $image_html += "</div>";
                    $("#main_content").html( $content_html + $image_html  );
                }
            });
        }
    }, 'text');