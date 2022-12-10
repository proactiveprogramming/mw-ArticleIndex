<?php

/**
 * All hooked functions used by ArticleIndex
 * @ingroup Extensions
 * @author Josef Martiňák
 * @license MIT
 * @file
 */

class ArticleIndexHooks {

	/**
	 * Set up the parser hooks
	 * @param object $parser: instance of OutputPage
	 * @return Boolean: true
	 */
	public static function registerParserHook( &$parser ) {
		$parser->setHook( 'aindex', 'ArticleIndexHooks::aindexRender' );
		$parser->setHook( 'articleindex', 'ArticleIndexHooks::articleindexRender' );
		return true;
	}


	/**
	 * Callback function for registerParserHook
	 * @param string $input: user-supplied input, unused
	 * @param array $args: user-supplied arguments
	 * @param object $parser: instance of Parser, unused
	 * @return String: HTML
	 */
	public static function aindexRender( $input, $args, $parser ) {
		if( empty( $args['display'] ) ) {
			$display = htmlspecialchars( $input, ENT_QUOTES );
		}
		else {
			$display = htmlspecialchars( $args['display'], ENT_QUOTES );
		}
		return '<span id="aiw_' . $display . '" class="articleIndexedWord">' . htmlspecialchars( $input, ENT_QUOTES ) . '</span>';
	}


	/**
	 * Callback function for registerParserHook
	 * @param string $input: user-supplied input, unused
	 * @param array $args: user-supplied arguments, unused
	 * @param object $parser: instance of Parser, unused
	 * @return String: HTML
	 */
	public static function articleindexRender( $input, $args, $parser ) {
		return '<div class="articleindex"></div>';
	}


	/**
	 * Place the index
	 * @param object $out: instance of OutputPage
	 * @param object $skin: instance of Skin, unused
	 */
	public static function showIndex( &$out, &$skin ) {
		if ( $out->isArticle() && preg_match( "/class=\"articleIndexedWord\"/", $out->mBodytext ) ) {
			
			$out->addModules( 'ext.ArticleIndex' );
			
			// get tagged words
			$pattern = "/<span id=\"aiw_([^\"]*)\" class=\"articleIndexedWord\">([^<]*)<\/span>/";
			preg_match_all( $pattern, $out->mBodytext, $matches, PREG_SET_ORDER );
			$words = array();

			foreach ( $matches as $m ) {
				// convert to lowercase with first letter capitalized
				$displayedWord = mb_strtolower( $m[1] );
				$firstLetter = mb_strtoupper( mb_substr( $displayedWord, 0, 1 ) );
				$displayedWord = $firstLetter . mb_substr( $displayedWord, 1 );
				array_push( $words, $displayedWord );
			}
			$words = array_unique( $words );
			setlocale( LC_COLLATE, 'en_US.utf8');
			usort( $words, 'strcoll' );

			// show the index
			$prev_first_letter = '';
			$index = '';
			$count = 0;
			foreach ( $words as $w ) {
				if ( mb_substr( $w, 0, 1, 'UTF-8' ) != $prev_first_letter ) {
					if ($count > 0) {
						$index .= '</ul>';
					}
					$index .= '<strong>' . mb_substr( $w, 0, 1, 'UTF-8'). '</strong><br/>';
					$index .= '<ul>';
				}
				$index .= "<li><a class='articleIndexLink'>$w</a></li>";
				$prev_first_letter = mb_substr( $w, 0, 1, 'UTF-8' );
				$count += 1;
			}
			$index .= '</ul>';
			$out->mBodytext = preg_replace( "/<div class=\"articleindex\"><\/div>/", '<div class="articleindex">' . $index . '</div>', $out->mBodytext );
		}
		return true;
	}
}
