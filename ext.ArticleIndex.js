/**
 * Highlight words placed in tag 'aindex' (span class='articleIndexedWord')
 * Clicking the word highlights his occurrences and moves page to the first one
 * Navigation buttons on mouseover
 */

( function ( mw, $ ) {

	// delay for animations
	var delay = 500;

	$( 'a.articleIndexLink' ).css( 'cursor', 'pointer' );
	$( 'a.articleIndexLink' ).click( function() {

		// clicked word
		var w = $( this ).text();

		// back to default state
		$( 'span.articleIndexedWord' ).attr( 'style', '' );	
		$( 'span.articleIndexedWord' ).off( 'mouseenter' );
		removeNavigation();


		// search and highlight all occurences of clicked word
		var searchedWords = $( 'span.articleIndexedWord' ).filter( function() {
			var id = $( this ).attr( 'id' ).toLowerCase();
			var clicked = 'aiw_' + w.toLowerCase();
			return clicked == id;
		} );

		var style = 'background-color: #5f7bb7; color: #ffffff; padding: 0px 2px 0px 2px;';
		style += '-moz-border-radius: 2px; -webkit-border-radius: 2px;';
		style += '-khtml-border-radius: 2px; border-radius: 2px;';
		searchedWords.attr( 'style', style );

		// find first occurance of the word and jump into
		$( 'html, body' ).animate( {
			scrollTop: searchedWords.first().offset().top - 64
		}, delay );



		// add navigation buttons on indexed word mouseenter
		var navButtons = '';
		if ( searchedWords.length > 1 ) {
			navButtons = "<span class='articleIndexNavPrev'>" + mw.msg( 'articleindex-prev' ) + "</span>";
			navButtons += "<span class='articleIndexNavNext'>" + mw.msg( 'articleindex-next' ) + "</span>";
		}
		navButtons += "<span class='articleIndexNavIndex'>" + mw.msg( 'articleindex-index' ) + "</span>";
		searchedWords.mouseenter( function() {

			// mouseentered word
			var w = $( this ).text();
			
			// update navigation buttons
			removeNavigation();
			$( this ).after( navButtons );


			// add onclick on PREV button
			if ( searchedWords.length > 1 ) {
				$( 'span.articleIndexNavPrev' ).css( 'cursor', 'pointer' );
				$( 'span.articleIndexNavPrev' ).click( function() {
	  				// find previous occurance of the word and jump into
					var prevIndex = 0;
					searchedWords.map( function (index ) {
						if ( $( this ).next( 'span.articleIndexNavPrev' ).length == 1 ) {
							prevIndex = index - 1;
							return $( this );
						}
						else {
							return null;
						}
					});

					if ( prevIndex < 0 ) {
						// jump to end
						$( 'html, body' ).animate( {
							scrollTop: searchedWords.last().offset().top - 64
						}, delay );
					}
					else {
						// jump to previous
						$( 'html, body' ).animate( {
							scrollTop: searchedWords.eq( prevIndex ).offset().top - 64
						}, delay );
					}
					removeNavigation();
				} );
			}


			// add onclick on NEXT button
			if ( searchedWords.length > 1 ) {
				$( 'span.articleIndexNavNext' ).css( 'cursor', 'pointer' );
				$( 'span.articleIndexNavNext' ).click( function() {
		  			// find next occurance of the word and jump into
					var nextIndex = 0;
					searchedWords.map( function (index ) {
						if ( $( this ).next( 'span.articleIndexNavPrev' ).length == 1 ) {
							nextIndex = index + 1;
							return $( this );
						}
						else {
							return null;
						}
					});

					if ( nextIndex == searchedWords.length ) {
						// jump to start
						$( 'html, body' ).animate( {
							scrollTop: searchedWords.first().offset().top - 64
						}, delay );
					}
					else {
						// jump to next
						$( 'html, body' ).animate( {
							scrollTop: searchedWords.eq( nextIndex ).offset().top - 64
						}, delay );
					}
					removeNavigation();
				} );
			}


			// add onclick on INDEX buttons
			$( 'span.articleIndexNavIndex' ).css( 'cursor', 'pointer' );
			$( 'span.articleIndexNavIndex' ).click( function() {
	  			// jump to the index
				removeNavigation();
				$( 'html, body' ).animate( {
					scrollTop: $( 'a.articleIndexLink' ).first().offset().top - 84
				}, delay );
			} );
		} );


	} );


	// remove navigation buttons
	function removeNavigation() {
		$( 'span.articleIndexNavPrev' ).off( 'click' );
		$( 'span.articleIndexNavNext' ).off( 'click' );
		$( 'span.articleIndexNavIndex' ).off( 'click' );
		$( 'span.articleIndexNavPrev' ).remove();
		$( 'span.articleIndexNavNext' ).remove();
		$( 'span.articleIndexNavIndex' ).remove();
	}

}( mediaWiki, jQuery ) );