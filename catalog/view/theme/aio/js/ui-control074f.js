// PAGE READY
$( window ).on( "load", function() {
	$("html").addClass("ready");
});

$(document).ready(function() {
    // BACK TO TOP FUNCTION
    $(window).on('scroll', function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            document.getElementById("backToTop").style.display = "block";
        } else {
            document.getElementById("backToTop").style.display = "none";
        }
    });

    // GET MEDIA WIDTH
    windowsDetect($( window ).width());
    $(window).on('resize', function() {
        windowsDetect($( window ).width());
    });

        
    // STICKY HEADER - HEADER
    var elementTop = $('#header').offset().top;
    var elementBottom = elementTop + $('#header').outerHeight();

    $(window).on('resize scroll', function() {

        var viewportTop = $(window).scrollTop();

        if(viewportTop > elementBottom) {
            $('#header').addClass('isStickyHeader');
            $('#wrapper').css('margin-top', (elementBottom));
        }

        if($('#header').is('.isStickyHeader') && viewportTop < elementBottom){
            $('#wrapper').css('margin-top', '');
            $('#header').removeClass('isStickyHeader');
            // $(window).scrollTop(0);
        };
    });


    // BURGER - MAIN MENU TOGGLE
    $('#burger-mainmenu').click(function(){
        $('#navi-bar').toggleClass('is-active');
        $(this).toggleClass('is-active');
        $("#navi-bar .navbar").find('*').removeClass("is-active");
        
        if($('#burger-topbar').is(".is-active")){
            $('#burger-topbar').toggleClass('is-active');
            $('#header-top-navbar').toggleClass('is-active');
        }
    });

    // BURGER - TOP BAR TOGGLE
    $('#burger-topbar').click(function(){
        $('#header-top-navbar').toggleClass('is-active');
        $(this).toggleClass('is-active');

        if($('#burger-mainmenu').is(".is-active")){
            $('#burger-mainmenu').toggleClass('is-active');
            $('#navi-bar').toggleClass('is-active');
            $("#navi-bar .navbar").find('*').removeClass("is-active");
        }
    });


    // LOGIN DROPDOWN
    $("#myaccount .account-dropdown").click(function(){
        $('#myaccount .dropdown').toggleClass('is-active');;
    });

    $("#currency .currency-dropdown").click(function(){
        $('#currency .dropdown').toggleClass('is-active');;
    });

    $(document).on("click", function(event){
        if(!$(event.target).closest("#myaccount").length){
            $('#myaccount .dropdown').removeClass("is-active");
        }
        if(!$(event.target).closest("#currency").length){
            $('#currency .dropdown').removeClass("is-active");
        }
    });


    // NAVIGATION DROPDOWN - ONLY IN MOBILE
    if($( window ).width() < 1025){
		$(".navbar-dropdown .navbar-item").click(function(event){
			if(!$(this).is(".sub-menu-dropdown")){
				location.href = ($(this)['0'].href);
			}
        });
		//manufacturer product page
		$(".man_filt_head_gt_child").click(function(event){
            navActive($(this));
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
            event.stopPropagation();
        });
		$(".man_filt_head_gt_child li a").click(function(event){
			if(!$(this).is(".sub-menu-dropdown")){
				location.href = ($(this)['0'].href);
			}
        });
        function navActive(nav){
            if(nav.is(".is-active")){
                nav.removeClass("is-active");
            }
            else {
                nav.addClass("is-active");
            }
        }
    }
    

    // HEADLINE ROTATOR
    setInterval(function(){
        if($('#headline-message').css("left") == ('-' + $('#headline-message').width() + "px")){
            $('#headline-message').removeClass("headline-moving");
            $('#headline-message').css("left","100%");
        }
        else if($('#headline-message').hasClass('headline-moving') == false){
            $('#headline-message').addClass('headline-moving');
            $('#headline-message').css("left","-" + $('#headline-message').width() + "px");
        }
    },1000);


    // ----- CONTENT MANAGEMENT -----
    var show_sidebarLeft = false;
    var show_sidebarRight = false;
    $('#sidebar-left').children().each (function(){
        var tagName = $(this).prop("tagName");
        if( tagName !== "SCRIPT" && tagName !== "STYLE"){
            // console.log(tagName);

            //display one sidebar only
            show_sidebarLeft = true;
            $('#sidebar-right').remove();
            return false;
        }
    })

    $('#sidebar-right').children().each (function(){
        var tagName = $(this).prop("tagName");
        if( tagName !== "SCRIPT" && tagName !== "STYLE"){
            // console.log(tagName);
            
            //display one sidebar only
            show_sidebarRight = true;
            $('#sidebar-left').remove();
            return false;
        }
    })

    if(show_sidebarLeft != true){
        $('#sidebar-left').remove();
    }
    if(show_sidebarRight != true){
        $('#sidebar-right').remove();
    }

    if(show_sidebarLeft == true || show_sidebarRight == true){
        if( $( window ).width()  >= 1025 ) {
            $('#main-content').css('max-width', '80%');
        }
        else {
            $('#main-content').css('max-width', '');
        }
    }

    // Responsive changes
    $(window).on('resize', function() {
        if(show_sidebarLeft == true || show_sidebarRight == true){
            if( $( window ).width()  >= 1025 ) {
                $('#main-content').css('max-width', '80%');
            }
            else {
                $('#main-content').css('max-width', '');
            }
        }
    });
    // ----- END CONTENT MANAGEMENT -----


    // ----- ACCORDION -----
    var acc = document.getElementsByClassName("accordion");
    for (var acc_counts = 0; acc_counts < acc.length; acc_counts++) {
        acc[acc_counts].addEventListener("click", function() {
            this.parentElement.classList.toggle("is-active");
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
            event.stopPropagation();
        });
    }
    // ----- END ACCORDION -----
    
	// ----- SLICK CAROUSEL -----
    $("#main-content #module-fmanufacturers .carousel").not('.slick-initialized').slick({
		dots: false,
		lazyLoad: 'ondemand',
		infinite: true,
		slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
		responsive: [
            {
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
				}
			}
		]
	});

    bannerSettings(); // Instantiate banner
    // ----- END SLICK CAROUSEL -----


    // COMBINE FROM COMMON.JS
    /* Search */
	$('#btn-search').bind('click', function() {
		url = $('base').attr('href') + 'index.php?route=product/search';
		var search = $('#header_search').val();
		if (search) {
			url += '&search=' + encodeURIComponent(search);
		}
		location = url;
	});
	
	$('#icon-search').bind('click', function() {
		url = $('base').attr('href') + 'index.php?route=product/search'; 
		var search = $('#header_search').val();
		if (search) {
			url += '&search=' + encodeURIComponent(search);
		}
		location = url;
	});
	
	$('#modal-search-product input[id=\'modal_search\']').bind('keydown', function(e) {
		if (e.keyCode == 13) {
			url = $('base').attr('href') + 'index.php?route=product/search';
			var search = $('#header_search').val();
			if (search) {
				url += '&search=' + encodeURIComponent(search);
			}
			location = url;
		}
	});
	
	$('#search-toggle input[id=\'header_search\']').bind('keydown', function(e) {
		if (e.keyCode == 13) {
			url = $('base').attr('href') + 'index.php?route=product/search';
			var search = $('#header_search').val();
			if (search) {
				url += '&search=' + encodeURIComponent(search);
			}
			location = url;
		}
    });

    // GOOGLE TRANSLATE UI
    $('#btn-gtranslate').on('click', function() {
        if($('#app-google-translate').hasClass('is-active')) {
            $('#app-google-translate').removeClass('is-active');
        } else {
            $('#app-google-translate').addClass('is-active');
        }
    });
    // END GOOGLE TRANSLATE UI
});

function productslick(home,category,product){
    // ----- SLICK CAROUSEL -----
    $("#home #main-content .module-product .carousel").not('.slick-initialized').slick({
		dots: false,
		lazyLoad: 'ondemand',
		infinite: true,
		slidesToShow: home,
		slidesToScroll: 1,
		responsive: [
            {
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
				}
			}
		]
    });
	
	$("#product-category #main-content .module-product .carousel").not('.slick-initialized').slick({
		dots: false,
		lazyLoad: 'ondemand',
		infinite: true,
		slidesToShow: category,
		slidesToScroll: 1,
		responsive: [
            {
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
				}
			}
		]
    });
	
	$("#product-product #main-content .module-product .carousel").not('.slick-initialized').slick({
		dots: false,
		lazyLoad: 'ondemand',
		infinite: true,
		slidesToShow: product,
		slidesToScroll: 1,
		responsive: [
            {
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
				}
			}
		]
    });
}
// ----- END SLICK CAROUSEL -----

// HIDE POPUP
function hidePopUp() {
    $( "#myModal" ).css( "display", "none" );
    $( "#blackbg" ).css( "display", "none" );
}
// END HIDE POPUP

// BACK TO TOP FUNCTION
function backToTop() {
    window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
    });
}
// END BACK TO TOP FUNCTION

// MULTITABS
function multitabs(home,category,product,isfade = false){
    
    // $('.multitabs .tabs ul li').first().addClass('is-active');
    var activeTab = $('.multitabs .tabs ul li.is-active').data('tab');
    $('.multitabs .tab-content div[data-content="' + activeTab + '"]').addClass('is-active');
    $('#home .multitabs .tab-content div[data-content="' + activeTab + '"] .carousel').not('.slick-initialized').slick({
        dots: false,
		lazyLoad: 'ondemand',
        infinite: true,
        slidesToShow: home,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    });
	
	$('#product-category .multitabs .tab-content div[data-content="' + activeTab + '"] .carousel').not('.slick-initialized').slick({
        dots: false,
		lazyLoad: 'ondemand',
        infinite: true,
        slidesToShow: category,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    });
	
	$('#product-product .multitabs .tab-content div[data-content="' + activeTab + '"] .carousel').not('.slick-initialized').slick({
        dots: false,
		lazyLoad: 'ondemand',
        infinite: true,
        slidesToShow: product,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    });
    
    $('.multitabs .tabs ul li').on('click', function() {
        var tab = $(this).data('tab');
        $('.multitabs .tabs ul li').removeClass('is-active');
        $(this).addClass('is-active');

        $('.multitabs .tab-content div').removeClass('is-active');
        $('.multitabs .tab-content div[data-content="' + tab + '"]').addClass('is-active');

        // CAROUSEL
        $('#home .multitabs .tab-content div[data-content="' + tab + '"] .carousel').not('.slick-initialized').slick({
            dots: false,
			lazyLoad: 'ondemand',
            infinite: true,
            slidesToShow: home,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]
        });
		
		$('#product-category .multitabs .tab-content div[data-content="' + tab + '"] .carousel').not('.slick-initialized').slick({
			dots: false,
			lazyLoad: 'ondemand',
			infinite: true,
			slidesToShow: category,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 2,
					}
				}
			]
		});
		
		$('#product-product .multitabs .tab-content div[data-content="' + tab + '"] .carousel').not('.slick-initialized').slick({
			dots: false,
			lazyLoad: 'ondemand',
			infinite: true,
			slidesToShow: product,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 2,
					}
				}
			]
		});
	
		if(isfade){
			productfade();
		}
    });
}

// END MULTITABS

// ----- SLICK CAROUSEL - MODULE SETTINGS -----
    // BANNER MODULE
    function bannerSettings(){
        $("#module-banner .carousel").not('.slick-initialized').slick({
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            autoplay: true,
            autoplaySpeed: 2000,
            cssEase: 'linear'
        });
    }
// ----- END SLICK CAROUSEL - MODULE SETTINGS -----


// -----  MODAL -----
    var rootEl = document.documentElement;
    var $modals = getAll('.modal');
    var $modalButtons = getAll('.modal-button');
    var $modalCloses = getAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button');

    if ($modalButtons.length > 0) {
    $modalButtons.forEach(function ($el) {
        $el.addEventListener('click', function () {
        var target = $el.dataset.target;
        openModal(target);
        });
    });
    }

    if ($modalCloses.length > 0) {
    $modalCloses.forEach(function ($el) {
        $el.addEventListener('click', function () {
        closeModals();
        });
    });
    }

    function openModal(target) {
    var $target = document.getElementById(target);
    rootEl.classList.add('is-clipped');
    $target.classList.add('is-active');
    }

    function closeModals() {
    rootEl.classList.remove('is-clipped');
    $modals.forEach(function ($el) {
        $el.classList.remove('is-active');
    });
    }

    document.addEventListener('keydown', function (event) {
    var e = event || window.event;
    if (e.keyCode === 27) {
        closeModals();
        closeDropdowns();
    }
    });

    function getAll(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
    }
// ----- END MODAL -----

// ----- PRODUCT IMAGE HOVER -----
    function hoverchange(particular_id){
		// $("."+particular_id).animate({opacity:.8},250);
		$("."+particular_id).attr("src", $("."+particular_id).attr("over"));
		// $("."+particular_id).animate({opacity:1},100);
    }	

    function outchange(particular_id){
		// $("."+particular_id).animate({opacity:.8},250);
        $("."+particular_id).attr("src", $("."+particular_id).attr("out"));
		// $("."+particular_id).animate({opacity:1},100);
    }
// ----- END PRODUCT IMAGE HOVER -----

// ----- SEARCH AUTO COMPLETE -----
    function search_autocomplete() {
        $('input[name=\'search\']').autocomplete({
            minLength: 3, //min enter 3 char
            maxResults: 5, //only max 5 result
            delay: 500, 
            source: function(request, response) {
                $.ajax({
                    //go to load auto complete function
                    url: 'index.php?route=common/header/autocomplete&search=' +  encodeURIComponent(request.term),
                    //data pass by json
                    dataType: 'json',
                    //if success
                    success: function(json) {   
                    response($.map(json, function(item) {
                        return {
                        //return item name
                        label: item.name,
                        //return product id
                        value: item.product_id
                        }
                    }));
                    }
                });
            }, 
            select: function(event, ui) {
                $('input[name=\'search\']').val(ui.item.label);           
                $('#header_search').val(ui.item.label); 
                if($('#header').hasClass('uni-head-4') || $('#header').hasClass('uni-head-5')){
                    if($('.body-style').hasClass('desktop')){
                        search();
                    } else {
                        $('#button-search').trigger('click');
                    }
                } else {
                   $('#button-search').trigger('click');
                }
                return false;
            },
            focus: function(event, ui) {
                return false;
            }
        });
    }
// ----- END SEARCH AUTO COMPLETE -----

// ----- MEDIA WIDTH CONTROLLER -----
    function windowsDetect($windowWidth){
    
        var className;
        $('body').removeClass('desktop');
        $('body').removeClass('tablet');
        $('body').removeClass('mobile');
        
        // DESKTOP
        if( $windowWidth  >= 1025 ) {
            className = "desktop";
        }
        
        // TABLET
        if ( 1024 >= $windowWidth && $windowWidth >= 479 ){
            className = "tablet";
        }
        
        // MOBILE
        if ( $windowWidth <= 480 ){
            className = "mobile";
        }
        
        $('body').addClass(className);
    }
// ----- END MEDIA WIDTH CONTROLLER-----

// ----- PRODUCT VIEW SWITCH -----
    function display(view) {
        if (view == 'grid') {
            $('.grid-view').addClass('active');
            $('.list-view').removeClass('active');
            $('.module-product.product-listing').removeClass('list-view');
            $.totalStorage('display', 'grid'); 
        } else {
            $('.grid-view').removeClass('active');
            $('.list-view').addClass('active');
            $('.module-product.product-listing').addClass('list-view');
            $.totalStorage('display', 'list');
        }
    }

    view = $.totalStorage('display');

    if (view) {
        display(view);
    } else {
        display('grid');
    }
// ----- END PRODUCT VIEW SWITCH -----

// ----- PRODUCT EFFECT FADE -----
	function productfade() {
		$(document).ready(function() {
			$('.module-product .box-content > div, .module-product .carousel .slick-slide, .tab-product .box-content > div, .tab-product .carousel .slick-slide').each(function(index) {
				$(this).bind('mouseenter',function(){
						$(this).siblings().stop();
						$(this).siblings().animate({opacity:.6},500);
				
				});
				
				$(this).bind('mouseleave',function(){
						$(this).siblings().stop();
						$(this).siblings().animate({opacity:1},500);
				
				});
				
			});
		});
	}
// ----- END PRODUCT EFFECT FADE -----


// POPUP MODAL
function info(id){
    document.getElementById('modal-information-info').classList.add('is-active');
	$.ajax({
		url: 'index.php?route=information/information/info&information_id='+id,
		dataType: 'json',     
		beforeSend: function(){
			$('.loading').show();
			$('#modal-information-info .modal-card-body .information-description').remove();
		},
		complete: function(){
			$('.loading').hide();
		},
		success: function(json) {
			$('#modal-information-info .modal-card .logo').html('<img src="'+json['logo']+'" title="'+json['name']+'" alt="'+json['name']+'">');
			$('#modal-information-info .modal-card .modal-card-title').html(json['title']);
			$('#modal-information-info .modal-card-body .loading').after('<div class="information-description">'+json['html']+'</div>');
		}
	});
}

function subscribe(){
    document.getElementById('modal-subscribe').classList.add('is-active');
}

function payMethod(){
    document.getElementById('modal-payment-method').classList.add('is-active');
}

function uploadBankTransfer(order_id){
    document.getElementById('modal-bank-transfer').classList.add('is-active');
	$('#modal-bank-transfer .modal-card-body .bank-transfer-info').load('index.php?route=notification/notification/upload&order_id='+order_id);
}

function rateReview(order_id,product_id,order_product_id){
    document.getElementById('modal-rate-review').classList.add('is-active');
	$('#modal-rate-review .modal