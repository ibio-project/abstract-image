// preview field data and store in cookie

const fs = "title authors affiliation summary";
let fields = fs.split(' ');

// replace newline to linebreak
let nl = function(a) {
    const regex=/\n/g;
    let r=a.replace(regex,"<br>\n");
    return r;
}

let fix_comma = function(a){
    const regex=/[,;]\s*/g;
    let r=a.replace(regex,", ");
    return nl(r);
}

// replace [#] to html superscript
let sup = function(a) {
    const regex=/\[(\d+)]/g;
    let r=a.replace(regex,"<sup>$1</sup>");
    return fix_comma(r);
}

// on input set it cookie and preview
let on_input = function(a) {
    $('#i_'+a).on('input', function(e) {
	let t = $(this).val();
	Cookies.set(a,t);
	$('p.'+a).html(sup(t));
    });
}

let reset_form = function() {
    for (f of fields) {
	let t='';
	$('#i_'+f).val(t);  // input frame
	$('p.'+f).html(t);   // preview frame
	Cookies.set(f,t);
    }
}

// get cookies to set in fields
for (f of fields) {
    let c = Cookies.get(f);
    on_input(f);  // set behavior on change
    if (c) {
	$('#i_'+f).val(c);  // input frame
	$('p.'+f).html(sup(c));   // preview frame
    }
}
