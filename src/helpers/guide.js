const guide = `# Chelly

Markdown Syntax Guide

# Markdown syntax guide

---

<p class="source">
Based on the <a href="https://github.com/fletcher/MultiMarkdown/blob/master/Documentation/Markdown%20Syntax.md">Markdown syntax guide</a>, by Fletcher T. Penney<br />
Written in and generated with <strong>Byword</strong> (<a href="syntax.md">view source</a>)
</p>

---

## Phrase Emphasis [section-emphasis]

	*italic*   **bold**
	_italic_   __bold__


### Shortcuts [section-emphasis-shortcuts]

* **⌘B** : Add/remove bold
  Inserts four asterisks and places the caret in the middle.
  If a range of text is selected, it will either be surrounded by two pairs of asterisks or have its leading and trailing asterisks removed.
* **⌘I** : Add/remove italic
  Same as above.


## Links [section-links]

Inline:

	An [example](http://url.com/ "Title")

Reference-style labels (titles are optional):

	An [example][id]. Then, anywhere
	else in the doc, define the link:

	  [id]: http://example.com/  "Title"

**Byword** allows you to drag and drop links directly into the text. An inline link reference will be generated.

### Shortcuts [section-links-shortcuts]

* **⌘K** : Add link
  Inserts an inline link. Caret is placed inside square brackets, by default.
  If a range of text is selected and it is recognized as a URL, it will be placed inside parenthesis. If a range of text is selected and it is not a URL, it will be considered the title and placed between the square brackets.

## Images [section-images]

Inline (titles are optional):

	![alt text](/path/img.jpg "Title")

Reference-style:

	![alt text][id]

	[id]: /url/to/img.jpg "Title"

**Byword** allows you to drag and drop image files directly into the text. An inline image reference will be generated.

<p><strong>Byword</strong> allows you to drag and drop images directly into the text. An inline image reference will be generated.</p>

<h3 id="section-images-shortcuts">Shortcuts</h3>


* **⌥⌘I** : Add image
  Inserts an inline image reference. Caret is placed inside the square brackets, by default.
  If a range of text is selected and it is recognized as an image URL, it will be placed inside the parenthesis. If a range of text is selected and it is not an image URL, it will be considered the image title and placed between the square brackets.

## Headers [section-headers]

Setext-style:

	Header 1
	========

	Header 2
	--------

atx-style (closing #'s are optional):

	# Header 1 #

	## Header 2 ##

	###### Header 6

### Shortcuts [section-headers-shortcuts]

* **⌘+** : Add atx-style header (or increase header level)
* **⌘-** : Remove atx-style header (or decrease header level)


## Lists [section-lists]

Ordered, without paragraphs:

	1.  Foo
	2.  Bar

Unordered, with paragraphs:

	*   A list item.

		With multiple paragraphs.

	*   Bar

You can nest them:

	*   Abacus
		* answer
	*   Bubbles
		1.  bunk
		2.  bupkis
			* BELITTLER
		3. burper
	*   Cunning

### Shortcuts [section-lists-shortcuts]

* **⌘L** : Create an unordered list
* **⌥Enter** : Add another entry to the list (if caret is placed on a list item)


## Blockquotes [section-blockquotes]

	> Email-style angle brackets
	> are used for blockquotes.

	> > And, they can be nested.

	> #### Headers in blockquotes
	>
	> * You can quote a list.
	> * Etc.

### Shortcuts [section-blockquotes-shortcuts]

* **⌘'** : Start a blockquote (or convert line at caret to a blockquote)


## Code Spans [section-codespans]

	\`<code>\` spans are delimited
	by backticks.

	You can include literal backticks
	like \`\` \`this\` \`\`.


## Pre-formatted Code Blocks [section-code]

Indent every line of a code block by at least 4 spaces or 1 tab.

	This is a normal paragraph.

	    This is a preformatted
	    code block.


## Horizontal Rules [section-hr]

Three or more dashes or asterisks:

	---

	* * *

	- - - -


## Manual Line Breaks [section-hardbreaks]

End a line with two or more spaces:

	Roses are red,
	Violets are blue.
`

export default guide
