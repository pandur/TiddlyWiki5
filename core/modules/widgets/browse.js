/*\
title: $:/core/modules/widgets/browse.js
type: application/javascript
module-type: widget

Browse widget for browsing for files to import

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var BrowseWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
BrowseWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
BrowseWidget.prototype.render = function(parent,nextSibling) {
	var self = this;
	// Remember parent
	this.parentDomNode = parent;
	// Compute attributes and execute state
	this.computeAttributes();
	this.execute();
	// Create element
	var domNode = this.document.createElement("input");
	domNode.setAttribute("type","file");
	domNode.setAttribute("multiple","multiple");
	// Add a click event handler
	domNode.addEventListener("change",function (event) {
		self.wiki.readFiles(event.target.files,function(tiddlerFieldsArray) {
			self.dispatchEvent({type: "tw-import-tiddlers", param: JSON.stringify(tiddlerFieldsArray)});
		});
		return false;
	},false);
	// Insert element
	parent.insertBefore(domNode,nextSibling);
	this.renderChildren(domNode,null);
	this.domNodes.push(domNode);
};

/*
Compute the internal state of the widget
*/
BrowseWidget.prototype.execute = function() {
};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
BrowseWidget.prototype.refresh = function(changedTiddlers) {
	return false;
};

exports.browse = BrowseWidget;

})();
