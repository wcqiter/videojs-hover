
  function second_format(totalSeconds) {
    hour = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    minute = Math.floor(totalSeconds / 60);
    second = totalSeconds % 60;
    return pad(Math.floor(hour),2) + ":" + pad(Math.floor(minute),2) + ":" + pad(Math.floor(second),2);
  }

  function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
