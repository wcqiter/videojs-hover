# videojs-hover

A plugin for video.js. For customizable overlay of text and images on video.

## Installation

```sh
npm install --save @videojs-hover/videojs-hover
```

## Usage

To include videojs-hover on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-hover.min.js"></script>
<script>
  var player = videojs('my-video');

  player.hover();
</script>
```

### Options

This is a sample options of hover plugin. 
```
player.hover({
			default_set: { // Define the default set of parameter used in this video player
				'padding': 20,
				'font-size': 40
			},
			data: [ // Define the components that rendered to be overlay to the video
				{
					'type': "text",
					'content': "hi",
					'x-pos': 400,
					'y-pos': 400,
					'start': 1,
					'duration': 1,
					'playlist': 0
				},
				{
					'type': "text",
					'content': "bye",
					'x-pos': 800,
					'y-pos': 600,
					'start': 2,
					'duration': 1,
					'playlist': 0
				},

				{
					'type': "img",
					'src': "/img/picture.png",
					'x-pos': 200,
					'y-pos': 200,
					'width': 100,
					'height': 100,
					'start': 3,
					'duration': 1,
					'playlist': 1
				},
			]
		});
```
The parameters are as below:

| Parameter | Data type | Required | Default | Value/Range | Use in Text component | Use in Image component | Usage |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| type | string | &#10004 | "text" | "text" / "img" | &#10004 | &#10004 | For indicating type of component |
| x-pos | integer | &#10004 | 100 | >0 | &#10004 | &#10004 | For the x-coordinate in pixel from the left top corner of video player |
| y-pos | integer | &#10004 | 100 | >0 | &#10004 | &#10004 | For the y-coordinate in pixel from the left top corner of video player |
| width | string |  | "100px" | "npx" |  | &#10004 | For the width of image in pixel |
| height | string |  | "100px" | "npx" |  | &#10004 | For the height of image in pixel |
| content | string |  | "Hover" |  | &#10004 |  | For the content of text |
| src | string |  | "" |  |  | &#10004 | For the source url of image |
| start | float | &#10004 | 0 | >0 | &#10004 | &#10004 | For the start time in second when the overlay show |
| duration | float | &#10004 | 0 | >0 | &#10004 | &#10004 | For the duration of the overlay show |
| padding | integer |  | 10 | >0 | &#10004 | &#10004 | For the padding of the component |
| font-size | integer |  | 18 | >0 | &#10004 |  | For the font size of text |
| color | string |  | "#fff" | >0 | &#10004 |  | For the text color |
| background-color | string |  | "#000" | >0 | &#10004 | &#10004 | For the color of the background |
| opacity | float |  | 0.8 | 0~1 | &#10004 | &#10004 | For the opacity of the background |
| playlist | integer |  | -1 | >0 | &#10004 | &#10004 | For the playlist index of the component corrensponding to |

## License

MIT. Copyright (c) Dennis Wong


[videojs]: http://videojs.com/
