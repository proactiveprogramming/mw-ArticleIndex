# ArticleIndex (Mediawiki extension), Version 1.0

The ArticleIndex Extension appends clickable index of tagged words in an article.

## Usage

Put the words you want to index to ‎<aindex>...‎</aindex> tag.

Words in these tags are displayed instead of tag ‎<articleindex /> in alphabet order.

Index is grouped by first letters.

Clicking the word highlights his occurrences and moves page to the first one.

Navigation buttons appears on mouseover on tagged words. It's case insensitive.

## Installation

This extension has been tested for MediaWiki 1.39.x LTS.  None of the 
changes in the most recent version have been tested with previous version.

Download and place the file(s) in a directory called ArticleIndex in your extensions/ folder.

Add the following code at the bottom of your LocalSettings.php:

wfLoadExtension( 'ArticleIndex' );

Yes Done – Navigate to Special:Version on your wiki to verify that the extension is successfully installed.

## Authors
* Melissa Janine Newman, Proactive Programming (Version 1.0)
* [Josef Martiňák](https://www.wikiskripta.eu/w/User:Josmart) (Version 0.x)

## License (from the original author)
* MIT License, Copyright (c) 2018 First Faculty of Medicine, Charles University

## Version History

Changes in version 1.0

The main goal of this version was to verify that ArticleIndex 
worked with MediaWiki 1.39.  There were cosmetic issues that also
needed to be fixed.

* Tested for MediaWiki 1.39.0
* Fixed <div class="articleindex">, so the articleindex can be formatted with css.
* Changed css to display "articleindex" class to be columns.
* Changed index items to be unordered list items.
* Final display of the articleindex looks similar what a user expects to see in a category display of items.

Changes in version 0.5.0

* Converted to extension registration.

Changes in version 0.4.0

* Migrated I18n from php-files to json-files

Changes in version 0.3.0

* Added files ArticleIndex.i18n.php and ext.ArticleIndex.css.
* Indexed words are now case insensitive, they are shown in index in lowercase with first letter capitalized
* New style of highlighted words
* New feature - navigation buttons shows on mouseover (previous, next, index)

Changes in version 0.2.0

* Code - spacey style
* New function - clicking the word in index moves page to first occurrence of the word
