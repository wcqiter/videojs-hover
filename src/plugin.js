import videojs from 'video.js';
import {version as VERSION} from '../package.json';

// Default options for the plugin.
var default_hover = {
	'x-pos': 0,
	'y-pos': 0,
	'padding': 10,
	'z-index': "auto",
	'start': 0,
	'duration': 5,
	'playlist': -1,
	'clickable': false,
	"blank_target": true
};
var default_text = {
	'type': "text",
	'content': "Hover",
	'font-size': 18,
	'color': "#fff",
	'background-color': "rgba(0,0,0, 0.5)"
};
var default_img = {
	'type': "img",
	'src': ""
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

 	data.forEach(function(item) {
 		var el = document.createElement('div');
 		var para = Object.assign({}, default_hover, item);
		var html = "";
 		if(!item["type"]) {
		  throw new Error('type of component is required, valid values: text/img');
 		} else if(item["type"] == "text") {
 			para = Object.assign({}, default_text, para);
 			html = para["content"];
 		  el.style["font-size"] = para["font-size"] + "px";
 		  el.style["color"] = para["color"];
			if(para["padding"] < 0) {
				throw new Error('padding of component should be > 0');
			}
	 	  el.style["padding"] = para["padding"] + "px";
 		} else if(item["type"] == "img") {
 			para = Object.assign({}, default_img, para);
			var heightOfVideo = window.document.getElementById("video_html5_api").clientHeight;
			var widthOfVideo = window.document.getElementById("video_html5_api").clientWidth;
			html = "<img class='vjs-hover-img' src='" + para["src"] + "' ";
			if(para['width']) {
				html += "width='" + para["width"]*widthOfVideo + "px' ";
			} else {
				html += "width='auto' ";
			}
			if(para['height']) {
				html += "height='" + para["height"]*heightOfVideo + "px' ";
			} else {
				html += "height='auto' ";
			}
 			html += "></img>";
 		}
		if(para["x-pos"] > 1 || para["x-pos"] < 0) {
			throw new Error('x-pos of component should be in a range from 0 to 1');
		}
		if(para["y-pos"] > 1 || para["y-pos"] < 0) {
			throw new Error('y-pos of component should be in a range from 0 to 1');
		}
 	  el.style["background-color"] = para["background-color"];
		if(para["opacity"] > 1 || para["opacity"] < 0) {
			throw new Error('opacity of component should be in a range from 0 to 1');
		}
		if(para["z-index"] < 0) {
			throw new Error('z-index of component should be > 0');
		}
 	  el.style["z-index"] = para["z-index"];
 		el.style.position = "absolute";
 		el.style["display"] = "none";
		if(!para["clickable"]) {
			el.style["pointer-events"] = "none";
			el.innerHTML = html;
		} else {
			if(!para["href"]) {
				throw new Error('href is required when clickable is true!');
			} else {
				var blank = "";
				if(para["blank_target"])
					blank = "target='_blank'";
				el.innerHTML = "<a class='vjs-hover-a' onclick='player.pause();' href='" + para["href"] + "' " + blank + ">" + html + "</a>";
			}
		}
 		player.el().appendChild(el);
 		player.on('timeupdate', function() {
 				if (!player.playlist) {
 		      var playlist_flag = true;
 		    } else {
 					var playlist_flag = player.playlist.currentIndex() == para["playlist"];
 				}
 				if(playlist_flag && para["start"] <= player.currentTime() && (para["start"]+para["duration"]) > player.currentTime()) {
 					if(el.style["display"]!="block") {
						var heightOfVideo = window.document.getElementById("video_html5_api").clientHeight;
						var widthOfVideo = window.document.getElementById("video_html5_api").clientWidth;
					 	el.style.left = para["x-pos"]*widthOfVideo + "px";
					 	el.style.top = para["y-pos"]*heightOfVideo + "px";
	  				el.style["display"] = "block";
					}
 				} else {
 					if(el.style["display"]!="none")
 						el.style["display"] = "none";
 				}
 		});
		window.addEventListener("resize", function() {
			var heightOfVideo = window.document.getElementById("video_html5_api").clientHeight;
			var widthOfVideo = window.document.getElementById("video_html5_api").clientWidth;

			el.style.left = para["x-pos"]*widthOfVideo + "px";
			el.style.top = para["y-pos"]*heightOfVideo + "px";
			if(para["clickable"]) {
				var img_el = el.firstChild.firstChild;
			} else {
				var img_el = el.firstChild;
			}
			if(para['width']) {
				img_el.setAttribute("width", para["width"]*widthOfVideo + "px");
			}
			if(para['height']) {
				img_el.setAttribute("height", para["height"]*widthOfVideo + "px");
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
