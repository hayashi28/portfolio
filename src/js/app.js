jQuery(document).ready(function($){

    // Define a blank array for the effect positions. This will be populated based on width of the title.
    var bArray = [];
    // Define a size array, this will be used to vary bubble sizes
    var sArray = [4,6,8,10];

    // Push the header width values to bArray
    for (var i = 0; i < $('.bubbles').width(); i++) {
        bArray.push(i);
    }

    // Function to select random array element
    // Used within the setInterval a few times
    function randomValue(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // setInterval function used to create new bubble every 350 milliseconds
    setInterval(function(){

        // Get a random size, defined as variable so it can be used for both width and height
        var size = randomValue(sArray);
        // New bubble appeneded to div with it's size and left position being set inline
        // Left value is set through getting a random value from bArray
        $('.bubbles').append('<div class="individual-bubble" style="center: ' + randomValue(bArray) + 'px; width: ' + size + 'px; height:' + size + 'px;"></div>');

        // Callback function used to remove finsihed animations from the page
        $('.individual-bubble').animate({
            'bottom': '100%',
            'opacity' : '-=0.7'
        }, 3000, function(){
            $(this).remove()
        }
        );


    }, 350);

});

$(document).ready(function(){
    $('#pagetop').click(function () { // .pagetopをクリックすると
        $('body,html').animate({ // いちばん上にanimateする
        scrollTop: 0 // 戻る位置
        }, 400); // 戻るスピード
        return false;
    });
});

$(document).ready(function(){
    $("#topBtn").hide(); //とりあえず隠す
    $(window).on("scroll", function() {
        if ($(this).scrollTop() > 100) { //100以上にスクロールされた／されている時は
            $("#topBtn").fadeIn("fast"); //ふわっと表示
        } else { //それ意外は
            $("#topBtn").fadeOut("fast"); //ふわっと非表示
        }
    });
    $('#topBtn').click(function () {
        $('body,html').animate({
        scrollTop: 0
        }, 400);
        return false;
    });
});
