ace.define("ace/mode/coffee",["require","exports","module","ace/tokenizer","ace/mode/coffee_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/folding/pythonic","ace/range","ace/mode/text","ace/worker/worker_client","ace/lib/oop"],function(a,b,c){function l(){this.$tokenizer=new d((new e).getRules()),this.$outdent=new f,this.foldingRules=new g("=|=>|->|\\s*class [^#]*")}"use strict";var d=a("../tokenizer").Tokenizer,e=a("./coffee_highlight_rules").CoffeeHighlightRules,f=a("./matching_brace_outdent").MatchingBraceOutdent,g=a("./folding/pythonic").FoldMode,h=a("../range").Range,i=a("./text").Mode,j=a("../worker/worker_client").WorkerClient,k=a("../lib/oop");k.inherits(l,i),function(){var a=/(?:[({[=:]|[-=]>|\b(?:else|switch|try|catch(?:\s*[$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)?|finally))\s*$/,b=/^(\s*)#/,c=/^\s*###(?!#)/,d=/^\s*/;this.getNextLineIndent=function(b,c,d){var e=this.$getIndent(c),f=this.$tokenizer.getLineTokens(c,b).tokens;return(!f.length||f[f.length-1].type!=="comment")&&b==="start"&&a.test(c)&&(e+=d),e},this.toggleCommentLines=function(a,e,f,g){console.log("toggle");var i=new h(0,0,0,0);for(var j=f;j<=g;++j){var k=e.getLine(j);if(c.test(k))continue;b.test(k)?k=k.replace(b,"$1"):k=k.replace(d,"$&#"),i.end.row=i.start.row=j,i.end.column=k.length+1,e.replace(i,k)}},this.checkOutdent=function(a,b,c){return this.$outdent.checkOutdent(b,c)},this.autoOutdent=function(a,b,c){this.$outdent.autoOutdent(b,c)},this.createWorker=function(a){var b=new j(["ace"],"worker-coffee.js","ace/mode/coffee_worker","Worker");return b.attachToDocument(a.getDocument()),b.on("error",function(b){a.setAnnotations([b.data])}),b.on("ok",function(b){a.clearAnnotations()}),b}}.call(l.prototype),b.Mode=l}),ace.define("ace/mode/coffee_highlight_rules",["require","exports","module","ace/lib/lang","ace/lib/oop","ace/mode/text_highlight_rules"],function(a,b,c){function g(){var a="[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*",b={token:"string",merge:!0,regex:".+"},c=d.arrayToMap("this|throw|then|try|typeof|super|switch|return|break|by)|continue|catch|class|in|instanceof|is|isnt|if|else|extends|for|forown|finally|function|while|when|new|no|not|delete|debugger|do|loop|of|off|or|on|unless|until|and|yes".split("|")),e=d.arrayToMap("true|false|null|undefined".split("|")),f=d.arrayToMap("case|const|default|function|var|void|with|enum|export|implements|interface|let|package|private|protected|public|static|yield|__hasProp|extends|slice|bind|indexOf".split("|")),g=d.arrayToMap("Array|Boolean|Date|Function|Number|Object|RegExp|ReferenceError|RangeError|String|SyntaxError|Error|EvalError|TypeError|URIError".split("|")),h=d.arrayToMap("Math|JSON|isNaN|isFinite|parseInt|parseFloat|encodeURI|encodeURIComponent|decodeURI|decodeURIComponent|RangeError|String|SyntaxError|Error|EvalError|TypeError|URIError".split("|"));this.$rules={start:[{token:"identifier",regex:"(?:(?:\\.|::)\\s*)"+a},{token:"variable",regex:"@(?:"+a+")?"},{token:function(a){return c.hasOwnProperty(a)?"keyword":e.hasOwnProperty(a)?"constant.language":f.hasOwnProperty(a)?"invalid.illegal":g.hasOwnProperty(a)?"language.support.class":h.hasOwnProperty(a)?"language.support.function":"identifier"},regex:a},{token:"constant.numeric",regex:"(?:0x[\\da-fA-F]+|(?:\\d+(?:\\.\\d+)?|\\.\\d+)(?:[eE][+-]?\\d+)?)"},{token:"string",merge:!0,regex:"'''",next:"qdoc"},{token:"string",merge:!0,regex:'"""',next:"qqdoc"},{token:"string",merge:!0,regex:"'",next:"qstring"},{token:"string",merge:!0,regex:'"',next:"qqstring"},{token:"string",merge:!0,regex:"`",next:"js"},{token:"string.regex",merge:!0,regex:"///",next:"heregex"},{token:"string.regex",regex:"/(?!\\s)[^[/\\n\\\\]*(?: (?:\\\\.|\\[[^\\]\\n\\\\]*(?:\\\\.[^\\]\\n\\\\]*)*\\])[^[/\\n\\\\]*)*/[imgy]{0,4}(?!\\w)"},{token:"comment",merge:!0,regex:"###(?!#)",next:"comment"},{token:"comment",regex:"#.*"},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\."},{token:"keyword.operator",regex:"(?:[\\-=]>|[-+*/%<>&|^!?=]=|>>>=?|\\-\\-|\\+\\+|::|&&=|\\|\\|=|<<=|>>=|\\?\\.|\\.{2,3}|\\!)"},{token:"paren.lparen",regex:"[({[]"},{token:"paren.rparen",regex:"[\\]})]"},{token:"text",regex:"\\s+"}],qdoc:[{token:"string",regex:".*?'''",next:"start"},b],qqdoc:[{token:"string",regex:'.*?"""',next:"start"},b],qstring:[{token:"string",regex:"[^\\\\']*(?:\\\\.[^\\\\']*)*'",merge:!0,next:"start"},b],qqstring:[{token:"string",regex:'[^\\\\"]*(?:\\\\.[^\\\\"]*)*"',merge:!0,next:"start"},b],js:[{token:"string",merge:!0,regex:"[^\\\\`]*(?:\\\\.[^\\\\`]*)*`",next:"start"},b],heregex:[{token:"string.regex",regex:".*?///[imgy]{0,4}",next:"start"},{token:"comment.regex",regex:"\\s+(?:#.*)?"},{token:"string.regex",merge:!0,regex:"\\S+"}],comment:[{token:"comment",regex:".*?###",next:"start"},{token:"comment",merge:!0,regex:".+"}]}}"use strict";var d=a("../lib/lang"),e=a("../lib/oop"),f=a("./text_highlight_rules").TextHighlightRules;e.inherits(g,f),b.CoffeeHighlightRules=g}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(a,b,c){"use strict";var d=a("../range").Range,e=function(){};((function(){this.checkOutdent=function(a,b){return/^\s+$/.test(a)?/^\s*\}/.test(b):!1},this.autoOutdent=function(a,b){var c=a.getLine(b),e=c.match(/^(\s*\})/);if(!e)return 0;var f=e[1].length,g=a.findMatchingBracket({row:b,column:f});if(!g||g.row==b)return 0;var h=this.$getIndent(a.getLine(g.row));a.replace(new d(b,0,b,f-1),h)},this.$getIndent=function(a){var b=a.match(/^(\s+)/);return b?b[1]:""}})).call(e.prototype),b.MatchingBraceOutdent=e}),ace.define("ace/mode/folding/pythonic",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode"],function(a,b,c){"use strict";var d=a("../../lib/oop"),e=a("./fold_mode").FoldMode,f=b.FoldMode=function(a){this.foldingStartMarker=new RegExp("(?:([\\[{])|("+a+"))(?:\\s*)(?:#.*)?$")};d.inherits(f,e),function(){this.getFoldWidgetRange=function(a,b,c){var d=a.getLine(c),e=d.match(this.foldingStartMarker);if(e)return e[1]?this.openingBracketBlock(a,e[1],c,e.index):e[2]?this.indentationBlock(a,c,e.index+e[2].length):this.indentationBlock(a,c)}}.call(f.prototype)}),ace.define("ace/mode/folding/fold_mode",["require","exports","module","ace/range"],function(a,b,c){"use strict";var d=a("../../range").Range,e=b.FoldMode=function(){};((function(){this.foldingStartMarker=null,this.foldingStopMarker=null,this.getFoldWidget=function(a,b,c){var d=a.getLine(c);return this.foldingStartMarker.test(d)?"start":b=="markbeginend"&&this.foldingStopMarker&&this.foldingStopMarker.test(d)?"end":""},this.getFoldWidgetRange=function(a,b,c){return null},this.indentationBlock=function(a,b,c){var e=/^\s*/,f=b,g=b,h=a.getLine(b),i=c||h.length,j=h.match(e)[0].length,k=a.getLength();while(++b<k){h=a.getLine(b);var l=h.match(e)[0].length;if(l==h.length)continue;if(l<=j)break;g=b}if(g>f){var m=a.getLine(g).length;return new d(f,i,g,m)}},this.openingBracketBlock=function(a,b,c,e){var f={row:c,column:e+1},g=a.$findClosingBracket(b,f);if(!g)return;var h=a.foldWidgets[g.row];return h==null&&(h=this.getFoldWidget(a,g.row)),h=="start"&&(g.row--,g.column=a.getLine(g.row).length),d.fromPoints(f,g)}})).call(e.prototype)}),ace.define("ace/worker/worker_client",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("../lib/event_emitter").EventEmitter,f=function(b,d,e,f){this.changeListener=this.changeListener.bind(this);if(c.packaged){var g=this.$guessBasePath();this.$worker=new Worker(g+d)}else{var h=this.$normalizePath(a.nameToUrl("ace/worker/worker",null,"_"));this.$worker=new Worker(h);var i={};for(var j=0;j<b.length;j++){var k=b[j],l=this.$normalizePath(a.nameToUrl(k,null,"_").replace(/.js$/,""));i[k]=l}}this.$worker.postMessage({init:!0,tlns:i,module:e,classname:f}),this.callbackId=1,this.callbacks={};var m=this;this.$worker.onerror=function(a){throw window.console&&console.log&&console.log(a),a},this.$worker.onmessage=function(a){var b=a.data;switch(b.type){case"log":window.console&&console.log&&console.log(b.data);break;case"event":m._emit(b.name,{data:b.data});break;case"call":var c=m.callbacks[b.id];c&&(c(b.data),delete m.callbacks[b.id])}}};((function(){d.implement(this,e),this.$normalizePath=function(a){return a=a.replace(/^[a-z]+:\/\/[^\/]+\//,""),a=location.protocol+"//"+location.host+(a.charAt(0)=="/"?"":location.pathname.replace(/\/[^\/]*$/,""))+"/"+a.replace(/^[\/]+/,""),a},this.$guessBasePath=function(){if(a.aceBaseUrl)return a.aceBaseUrl;var b=document.getElementsByTagName("script");for(var c=0;c<b.length;c++){var d=b[c],e=d.getAttribute("data-ace-base");if(e)return e.replace(/\/*$/,"/");var f=d.src||d.getAttribute("src");if(!f)continue;var g=f.match(/^(?:(.*\/)ace\.js|(.*\/)ace(-uncompressed)?(-noconflict)?\.js)(?:\?|$)/);if(g)return g[1]||g[2]}return""},this.terminate=function(){this._emit("terminate",{}),this.$worker.terminate(),this.$worker=null,this.$doc.removeEventListener("change",this.changeListener),this.$doc=null},this.send=function(a,b){this.$worker.postMessage({command:a,args:b})},this.call=function(a,b,c){if(c){var d=this.callbackId++;this.callbacks[d]=c,b.push(d)}this.send(a,b)},this.emit=function(a,b){try{this.$worker.postMessage({event:a,data:{data:b.data}})}catch(c){}},this.attachToDocument=function(a){this.$doc&&this.terminate(),this.$doc=a,this.call("setValue",[a.getValue()]),a.on("change",this.changeListener)},this.changeListener=function(a){a.range={start:a.data.range.start,end:a.data.range.end},this.emit("change",a)}})).call(f.prototype),b.WorkerClient=f})