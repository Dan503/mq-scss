import $ from 'jquery';

export default function(){

  // putting lines by the pre blocks
  $("pre:not(.no-lines)").each(function(){
    var pre = $(this).text().split("\n");
    var lines = new Array(pre.length);
    var modifier = $(this).closest('.demo').length ? -1 : 0;
    for(var i = 0; i < pre.length + modifier; i++) {
      var wrap = Math.floor(pre[i].split("").length / 70)
      if (pre[i]==""&&i==pre.length-1) {
        lines.splice(i, 1);
      } else {
        lines[i] = i+1;
        for(var j = 0; j < wrap - 1; j++) {
          lines[i] += "\n";
        }
      }
    }
    $(this)
      //.wrap('<div class="code"></div>')
      .before("<pre class='lines'>" + lines.join("\n") + "</pre>");
  });

}
