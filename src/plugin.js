import videojs from 'video.js';
import {version as VERSION} from '../package.json';

// Default options for the plugin.
var default_hover = {
	'x-pos': 100,
	'y-pos': 100,
	'padding': 10,
	'z-index': 9999,
	'start': 0,
	'duration': 5,
	'playlist': -1
};
var default_text = {
	'type': "text",
	'content': "Hover",
	'font-size': 18,
	'color': "#fff",
	'background-color': "#000",
	'opacity': 0.8,
};
var default_img = {
	'type': "img",
	'src': "",
	'width': "100%",
	'height': "100%"
};
var defaults = {
	defaultset: default_hover,
	data: Object.assign({}, default_hover, default_text)
}


// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player object.
 *
 * @param    {Object} [options={}]
 *           A plain object containing options for the plugin.
 */
 var setup = function setup(player, data) {
   var heightOfVideo = window.document.getElementById("video_html5_api").clientHeight;
   var widthOfVideo = window.document.getElementById("video_html5_api").clientWidth;

 	data.forEach(function(item) {
 		var el = document.createElement('div', {
 			className: 'vjs-hover-div'
 		});
 		var para = Object.assign({}, default_hover, item);
 		if(!item["type"]) {

 		} else if(item["type"] == "text") {
 			para = Object.assign({}, default_text, para);
 			el.innerHTML = para["content"];
 		  el.style["font-size"] = para["font-size"] + "px";
 		  el.style["color"] = para["color"];
 		} else if(item["type"] == "img") {
 			para = Object.assign({}, default_img, para);
 				el.innerHTML = "<img src='" + para["src"] + "' width='" + para["width"] + "px' height='" + para["height"] + "px'></img>";
 		}
 	  el.style.left = para["x-pos"] + "px";
 	  el.style.top = para["y-pos"] + "px";
 	  el.style["background-color"] = para["background-color"];
 	  el.style["padding"] = para["padding"] + "px";
 	  el.style["opacity"] = para["opacity"];
 	  el.style["z-index"] = para["z-index"];
 		el.style.position = "absolute";
 		el.style["display"] = "none";
 		player.el().appendChild(el);
 			player.on('timeupdate', function() {
 				if (!player.playlist) {
 		      var playlist_flag = true;
 		    } else {
 					var playlist_flag = player.playlist.currentIndex() == para["playlist"];
 				}
 				if(playlist_flag && para["start"] <= player.currentTime() && (para["start"]+para["duration"]) > player.currentTime()) {
 					if(el.style["display"]!="block")
 						el.style["display"] = "block";
 				} else {
 					if(el.style["display"]!="none")
 						el.style["display"] = "none";
 				}
 			});
 	});
 };
 var onPlayerReady = function onPlayerReady(player, options) {
 	defaults['default_set'] = Object.assign({}, default_hover, options['default_set']);
 	default_hover = Object.assign({}, default_hover, options['default_set']);
   player.addClass('vjs-hover');
   setup(player, options.data);
 };

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function hover
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const hover = function(options) {
  this.ready(() => {
    onPlayerReady(this, videojs.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
registerPlugin('hover', hover);

// Include the version number.
hover.VERSION = VERSION;

export default hover;
