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
					'x-pos': 0.1,
					'y-pos': 0.5,
					'start': 1,
					'duration': 10,
					'playlist': 0
				},
				{
					'type': "img",
					'src': "/img/picture.png",
					'x-pos': 0.2,
					'y-pos': 0.5,
					'width': 100,
					'height': 100,
					'start': 3,
					'duration': 10,
					'playlist': 1,
					"clickable": true,
					"href": "/img/picture.png"
				},
			]
		});
```
The parameters are as below:

| Parameter | Data type | Required | Default | Value/Range | Use in Text component | Use in Image component | Usage |
| --- | --- | --- | --- | --- | --- | --- | --- |
| type | string | :heavy_check_mark: | "text" | "text" / "img" | :heavy_check_mark: | :heavy_check_mark: | For indicating type of component |
| x-pos | float | :heavy_check_mark: | 0 | 0~1 | :heavy_check_mark: | :heavy_check_mark: | For the x-coordinate in pixel from the left top corner of video player |
| y-pos | float | :heavy_check_mark: | 0 | 0~1 | :heavy_check_mark: | :heavy_check_mark: | For the y-coordinate in pixel from the left top corner of video player |
| width | string |  | "100px" | "npx" |  | :heavy_check_mark: | For the width of image in pixel |
| height | string |  | "100px" | "npx" |  | :heavy_check_mark: | For the height of image in pixel |
| content | string |  | "Hover" |  | :heavy_check_mark: |  | For the content of text |
| src | string |  | "" |  |  | :heavy_check_mark: | For the source url of image |
| start | float | :heavy_check_mark: | 0 | >0 | :heavy_check_mark: | :heavy_check_mark: | For the start time in second when the overlay show |
| duration | float | :heavy_check_mark: | 0 | >0 | :heavy_check_mark: | :heavy_check_mark: | For the duration of the overlay show |
| padding | integer |  | 10 | >0 | :heavy_check_mark: | :heavy_check_mark: | For the padding of the component |
| font-size | integer |  | 18 | >0 | :heavy_check_mark: |  | For the font size of text |
| color | string |  | "#fff" | >0 | :heavy_check_mark: |  | For the text color |
| background-color | string |  | "#000" | >0 | :heavy_check_mark: | :heavy_check_mark: | For the color of the background |
| opacity | float |  | 0.8 | 0~1 | :heavy_check_mark: | :heavy_check_mark: | For the opacity of the background |
| playlist | integer |  | -1 | >0 | :heavy_check_mark: | :heavy_check_mark: | For the playlist index of the component corrensponding to |
| clickable | boolean |  | false | true/false | :heavy_check_mark: | :heavy_check_mark: | To indicate the component is clickable |
| href | string |  |  |  | :heavy_check_mark: | :heavy_check_mark: | Required clickable to be true, the url of the clickable component |
| z-index | integer |  | 999 | >0 | :heavy_check_mark: | :heavy_check_mark: | For the z-index of the component |

## License

MIT. Copyright (c) Dennis Wong


[videojs]: http://videojs.com/
