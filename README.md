# videojs-hover

For customizable overlay of text and images on video.

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

### Browserify/CommonJS

When using with Browserify, install videojs-hover via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('@videojs-hover/videojs-hover');

var player = videojs('my-video');

player.hover();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', '@videojs-hover/videojs-hover'], function(videojs) {
  var player = videojs('my-video');

  player.hover();
});
```

## License

MIT. Copyright (c) Dennis Wong


[videojs]: http://videojs.com/
