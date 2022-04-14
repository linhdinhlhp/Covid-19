// JavaScript Document

const html = document.documentElement
const body = document.body
const menuLinks = document.querySelectorAll('.admin-menu a')
const collapseBtn = document.querySelector('.admin-menu .collapse-btn')
const toggleMobileMenu = document.querySelector('.toggle-mob-menu')
const switchInput = document.querySelector('.switch input')
const switchLabel = document.querySelector('.switch label')
const switchLabelText = switchLabel.querySelector('span:last-child')
const collapsedClass = 'collapsed'
const lightModeClass = 'light-mode'
/*TOGGLE HEADER STATE*/
collapseBtn.addEventListener('click', function () {
	body.classList.toggle(collapsedClass)
	document.querySelector('.page-header').classList.toggle('toggled')
	if (this.getAttribute('aria-expanded') == 'true') {
		this.setAttribute('aria-expanded', 'false')
	} else {
		this.setAttribute('aria-expanded', 'true')
	}
	this.getAttribute('aria-label') == 'collapse menu' ?
		this.setAttribute('aria-label', 'expand menu') :
		this.setAttribute('aria-label', 'collapse menu')
})

/*TOGGLE MOBILE MENU*/
toggleMobileMenu.addEventListener('click', function () {
	body.classList.toggle('mob-menu-opened')
	this.getAttribute('aria-expanded') == 'true' ?
		this.setAttribute('aria-expanded', 'false') :
		this.setAttribute('aria-expanded', 'true')
	this.getAttribute('aria-label') == 'open menu' ?
		this.setAttribute('aria-label', 'close menu') :
		this.setAttribute('aria-label', 'open menu')
})

/*SHOW TOOLTIP ON MENU LINK HOVER*/
for (const link of menuLinks) {
	link.addEventListener('mouseenter', function () {
		if (
			body.classList.contains(collapsedClass) &&
			window.matchMedia('(min-width: 768px)').matches
		) {
			const tooltip = this.querySelector('span').textContent
			this.setAttribute('title', tooltip)
		} else {
			this.removeAttribute('title')
		}
	})
}

/*TOGGLE LIGHT/DARK MODE*/
if (localStorage.getItem('dark-mode') === 'false') {
	html.classList.add(lightModeClass)
	switchInput.checked = false
	switchLabelText.textContent = 'Light'
}

switchInput.addEventListener('input', function () {
	html.classList.toggle(lightModeClass)
	if (html.classList.contains(lightModeClass)) {
		switchLabelText.textContent = 'Light'
		localStorage.setItem('dark-mode', 'false')
	} else {
		switchLabelText.textContent = 'Dark'
		localStorage.setItem('dark-mode', 'true')
	}
})

$(function() {	
    $(".nav-item").click(function() {
		$('.nav-item').not(this).find('.nav-link').attr({'class': 'nav-link nav-collapsed', 'aria-expanded': 'true'});
		$('.nav-item').not(this).find('.collapse').slideUp(400);
		if($(this).find('.nav-link').attr('class') == 'nav-link') {
			$(this).find('.nav-link').attr({'class': 'nav-link nav-collapsed', 'aria-expanded': 'true'});
			$(this).find('.collapse').slideUp(400);
		}else{
			$(this).find('.nav-link').attr({'class': 'nav-link', 'aria-expanded': 'false'});
			$(this).find('.collapse').slideDown(400);
		}
	});
});

$(function() {

	function logoutck() {
		$(".logoutck").on("click", function(){
			var x = confirm("Do you really want to log out?");
			if(x) {
				window.location.href = './php/logout.php'
			}
		});
	}
	
	function checkLoginStatus() {
		$.ajax({
				type: "POST",
				url: "./php/checkstatus.php",
				success: function(res){
					if(res == "failed") {
						window.location.href = "login.html";
					}
					else
					{
						$("#greeting > b").html(res);
						$(".preloader").fadeOut("slow");
					}
				}
		});
	}
	
	checkLoginStatus();
	logoutck();
	
	return {
		checkLoginStatus : checkLoginStatus,
		logoutck : logoutck
	}
});
