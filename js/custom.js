$(window).on('load', function(){

	"use strict";
 
 
	/* ========================================================== */
	/*   Navigation Background Color                              */
	/* ========================================================== */
	
	$(window).on('scroll', function() {
		if($(this).scrollTop() > 450) {
			$('.navbar-fixed-top').addClass('opaque');
		} else {
			$('.navbar-fixed-top').removeClass('opaque');
		}
	});
 
	
	/* ========================================================== */
	/*   Hide Responsive Navigation On-Click                      */
	/* ========================================================== */
	
	  $(".navbar-nav li a").on('click', function(event) {
	    $(".navbar-collapse").collapse('hide');
	  });

	
	/* ========================================================== */
	/*   Navigation Color                                         */
	/* ========================================================== */
	
	$('#navbarCollapse').onePageNav({
		filter: ':not(.external)'
	});


	/* ========================================================== */
	/*   SmoothScroll                                             */
	/* ========================================================== */
	
	$(".navbar-nav li a, a.scrool").on('click', function(e) {
		
		var full_url = this.href;
		var parts = full_url.split("#");
		var trgt = parts[1];
		var target_offset = $("#"+trgt).offset();
		var target_top = target_offset.top;
		
		$('html,body').animate({scrollTop:target_top -70}, 1000);
			return false;
		
	});


	/* ========================================================== */
	/*   Newsletter                                               */
	/* ========================================================== */
	
	$('.newsletter-form').each( function(){
		var form = $(this);
		//form.validate();
		form.submit(function(e) {
			if (!e.isDefaultPrevented()) {
				jQuery.post(this.action,{
					'email':$('input[name="nf_email"]').val(),
				},function(data){
					form.fadeOut('fast', function() {
						$(this).siblings('p.newsletter_success_box').show();
					});
				});
				e.preventDefault();
			}
		});
	});		
	

	/* ========================================================== */
	/*   Register Top Home Section                                */
	/* ========================================================== */
	
	$('#register-form-home').each( function(){
		var form = $(this);
		//form.validate();
		form.submit(function(e) {
			if (!e.isDefaultPrevented()) {
				jQuery.post(this.action,{
					'names':$('input[name="register_names_home"]').val(),
					'email':$('input[name="register_email_home"]').val(),
					'ticket':$('select[name="register_ticket_home"]').val(),
				},function(data){
					form.fadeOut('fast', function() {
						$(this).siblings('p.register_success_box_home').show();
					});
				});
				e.preventDefault();
			}
		});
	})		
	

	/* ========================================================== */
	/*   Contact                                                 */
	/* ========================================================== */
	
	$('#contact-form').each( function(){
		var form = $(this);
		//form.validate();
		form.submit(function(e) {
			if (!e.isDefaultPrevented()) {
				jQuery.post(this.action,{
					'names':$('input[name="contact_names"]').val(),
					'phone':$('input[name="contact_phone"]').val(),
					'email':$('input[name="contact_email"]').val(),
					'ticket':$('select[name="contact_ticket"]').val(),
					'message':$('textarea[name="contact_message"]').val(),
				},function(data){
					form.fadeOut('fast', function() {
						$(this).siblings('p.contact_success_box').show();
					});
				});
				e.preventDefault();
			}
		});
	})
});

	


	$('.popup-gallery').find('a.popup1').magnificPopup({
		type: 'image',
		gallery: {
		  enabled:true
		}
	}); 
	
	$('.popup-gallery').find('a.popup2').magnificPopup({
		type: 'image',
		gallery: {
		  enabled:true
		}
	}); 
 
	$('.popup-gallery').find('a.popup3').magnificPopup({
		type: 'image',
		gallery: {
		  enabled:true
		}
	}); 
 
	$('.popup-gallery').find('a.popup4').magnificPopup({
		type: 'iframe',
		gallery: {
		  enabled:false
		}
	});  
 
	/* ========================================================== */
	/*   Custom code                                              */
	/* ========================================================== */
	database.ref(`landing`).once('value', function(snapshot) {
		var value = snapshot.val();
		console.log(value);
		$('#panel-facebook-posts div').remove();
		for (var post of value.facebook_posts) {
			var msg = post.message.trim();
			var sp = msg.split('\n');
			sp = sp.filter(function (el) {
				return el != '';
			  });
			var title = sp[0];
			var body = '';
			var count = 1;
			var id = post.id.split('_')[1];
			for (var i = 1; i<sp.length; i++) {
				if (sp[i].trim().length > 0) {
					body += sp[i] + '</br>';
					count++;
				}
				if (body.length > 100 || count >= 3) {
					if (body.length > 150)
						body = body.substr(0, 150)+' ...<br/>';
					if (i != sp.length -1)
						body+= `<a href="https://www.facebook.com/${id}" target="_blank">Xem thêm</a>`;
					break;
				}
			}

			$('#panel-facebook-posts').append(`
				<!--begin col-sm-3 -->
				<div class="col-md-3">
					
					<!--begin blog-item -->
					<div class="blog-item">
						
						<!--begin popup image -->
						<div class="popup-wrapper">
							<div class="popup-gallery">
									<img src="${post.full_picture}" class="width-100" alt="pic">
									<span class="eye-wrapper2"><i class="fa fa-link eye-icon"></i></span>
							</div>
						</div>
						<!--end popup image -->
							
						<!--begin blog-item_inner -->
						<div class="blog-item-inner">
						
							<h3 class="blog-title"><a href="https://www.facebook.com/${id}" target="_blank">${title}</a></h3>
							
							<a href="https://www.facebook.com/${id}" target="_blank" class="blog-icons last"><i class="far fa-clock"></i> ${(new Date(post.created_time)).toLocaleDateString()}</a>
							
							<p>${body}</p>
													
						</div>
						<!--end blog-item-inner -->
						
					</div>
					<!--end blog-item -->
						
				</div>
				<!--end col-sm-3->
			`);
		}

		if (value.analytics) {
			$('.count-users').text(value.analytics.total_users);
			$('.count-matchs').text(value.analytics.total_matchs);
			$('.count-tours').text(value.analytics.total_tournaments);
			$('.count-schools').text(value.analytics.total_schools);
		}
	});

$(function(){
	//$(".chevron-down").
	$("div[data-toggle=collapse]").click(function(){
		$(this).children('span').toggleClass("fa-chevron-down fa-chevron-up");
	});
})