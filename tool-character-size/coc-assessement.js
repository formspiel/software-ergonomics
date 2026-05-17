//javascript:
console.log("Version 2.0 vom 06.12.2018");
console.log("Starte Pruefung...");
mintextsize = 10;
check_colorcontrast=0;

fontfam_trans_arr=[];
fontfam_trans_arr["arial"]="arial";
fontfam_trans_arr["helvetica"]="arial";
fontfam_trans_arr["lato"]="lato";
fontfam_trans_arr["open-sans"]="open-sans";
fontfam_trans_arr["roboto"]="open-sans";
fontfam_trans_arr["segoe"]="segoe";
fontfam_trans_arr["segoe-ui"]="segoe-ui";

fontsize_obj = 
	{"arial":
		{"7":"<6"
			,"8":6
			,"9":7
			,"10":7
			,"11":8
			,"12":9
			,"13":10
			,"14":10
			,"15":11
			,"16":12
			,"17":12
			,"18":13
			,"19":14
			,"20":15
			,"21":15
			,"22":16
			,"23":17
			,"24":17
			,"25":18
			,"26":19
			,"27":20
			,"28":20
			,"29":21
			,"30":22
			,"31":22
			,"32":23
			,"33":24
			,"34":25
			,"35":25
			,"36":26
			,"37":">26"
		}
	,"lato":
		{"7":"<=6"
			,"8":6
			,"9":7
			,"10":7
			,"11":8
			,"12":8
			,"13":10
			,"14":10
			,"15":11
			,"16":11
			,"17":13
			,"18":13
			,"19":14
			,"20":14
			,"21":15
			,"22":15
			,"23":17
			,"24":17
			,"25":18
			,"26":19
			,"27":19
			,"28":21
			,"29":21
			,"30":22
			,"31":22
			,"32":24
			,"33":24
			,"34":25
			,"35":25
			,"36":26
			,"37":">=26"
		}
	,"open-sans":
		{"7":"<6"
			,"8":6
			,"9":7
			,"10":7
			,"11":8
			,"12":9
			,"13":9
			,"14":10
			,"15":11
			,"16":12
			,"17":12
			,"18":13
			,"19":14
			,"20":14
			,"21":15
			,"22":16
			,"23":17
			,"24":17
			,"25":18
			,"26":19
			,"27":19
			,"28":20
			,"29":21
			,"30":21
			,"31":22
			,"32":23
			,"33":24
			,"34":24
			,"35":25
			,"36":26
			,"37":">=26"
		}
	,"segoe":
		{"7":"<6"
			,"8":6
			,"9":6
			,"10":7
			,"11":8
			,"12":8
			,"13":9
			,"14":10
			,"15":11
			,"16":11
			,"17":12
			,"18":13
			,"19":13
			,"20":14
			,"21":15
			,"22":15
			,"23":16
			,"24":17
			,"25":18
			,"26":18
			,"27":19
			,"28":20
			,"29":21
			,"30":21
			,"31":22
			,"32":23
			,"33":24
			,"34":24
			,"35":25
			,"36":26
			,"37":">26"
		}
	,"segoe-ui":
		{"7":"<6"
			,"8":6
			,"9":7
			,"10":7
			,"11":8
			,"12":9
			,"13":9
			,"14":10
			,"15":11
			,"16":11
			,"17":12
			,"18":13
			,"19":13
			,"20":14
			,"21":15
			,"22":16
			,"23":16
			,"24":17
			,"25":18
			,"26":18
			,"27":19
			,"28":20
			,"29":21
			,"30":21
			,"31":22
			,"32":23
			,"33":24
			,"34":24
			,"35":25
			,"36":26
			,"37":">=26"
		}
	}
;

marker_obj = {
	"cb_control_gr_char":{
		"marker_class":"char_green_box_marker"
		,"style_class":"char_green_box"
	}
	,"cb_control_red_char":{
		"marker_class":"char_red_box_marker"
		,"style_class":"char_red_box"
	}
	,"cb_control_for_attr":{
		"marker_class":"ergo_for_box_marker"
		,"style_class":"ergo_for_box"
	}
	,"cb_control_formele":{
		"marker_class":"ergo_formele_box_marker"
		,"style_class":"ergo_formele_box"
	}
	,"cb_control_tables":{
		"marker_class":"ergo_table_box_marker"
		,"style_class":"ergo_table_box"
	}
};

msg_img_arr=[];
msg_fontfamily_arr=[];
msg_lang_arr=[];

//document.addEventListener('DOMContentLoaded', function(){ 
	
	if(document.documentMode<9){
		console.log("ENDE: Die Webseite laeuft im Dokumentenmodus "+document.documentMode+". Es muss mindestens der Dokumentenmodus 9 im IE aktiv sein.");
		debugger;
	}

	wait_div = document.createElement("DIV");
	document.body.appendChild(wait_div);
	wait_div.id = "load_content_div";
	wait_div.classList.add("skip_check");
	wait_div.style.position = "absolute";
	wait_div.style.top = "0px";
	wait_div.style.left = "0px";
	wait_div.style.width = "4000px";
	wait_div.style.height = "10000px";
	wait_div.style.backgroundColor = "black";	
	wait_div.style.zIndex = 90000090;
	wait_div.style.opacity = 0.5;
	wait_div.style.cursor = "wait";

	/* Add Colour js */
	var js = document.createElement("script");
	js.href = "http://url.allianz/k4";
	document.getElementsByTagName("head")[0].appendChild(js);
	
	/* Add CSS */
	var ss = document.createElement("link");
	ss.type = "text/css";
	ss.rel = "stylesheet";
	ss.href = "http://url.allianz/jW";
	document.getElementsByTagName("head")[0].appendChild(ss);
	
	newdiv = document.createElement("DIV");
	newdiv.innerHTML = ""
		+"<button id='cb_control_close' class='skip_check' style='float:right;border: 1px solid black;'>X</button>"
		+"<b class='skip_check'>Bilder</b><br/><input id='cb_control_alt_attr' data-code='ergo_alt' class='cb_control skip_check' type='checkbox' checked/><label for='cb_control_alt_attr' class='skip_check'> ALT-Attribut</label><br/><input id='cb_control_alt_attr_miss' data-code='ergo_alt_miss' class='cb_control skip_check' type='checkbox' checked/><label for='cb_control_alt_attr_miss' class='skip_check'> Fehlendes ALT-Attribut</label><br/>"
		+"<b class='skip_check'>Schrift</b><br/><input id='cb_control_gr_char' type='checkbox' data-code='char_green' class='cb_control skip_check'/> <label for='cb_control_gr_char' class='skip_check'>Gr&uuml;ne Schrift</label><br/><input id='cb_control_red_char' data-code='char_red' class='cb_control skip_check' type='checkbox' checked/> <label for='cb_control_red_char' class='skip_check'>Rote Schrift</label><br/>"
		+"<b class='skip_check'>Sprache</b><br/><input id='cb_control_lang_attr' type='checkbox' data-code='ergo_lang' class='cb_control skip_check' checked/> <label for='cb_control_lang_attr' class='skip_check'>LANG-Tag</label><br/>"
		+"<b class='skip_check'>Struktur</b><br/><input id='cb_control_for_attr' type='checkbox' data-code='ergo_for' class='cb_control skip_check' checked/> <label for='cb_control_for_attr' class='skip_check'>FOR-Attribut</label><br/>"
		+"<input id='cb_control_formele' type='checkbox' data-code='ergo_formele' class='cb_control skip_check' checked/> <label for='cb_control_formele' class='skip_check'>Formularfelder</label><br/>"
		+"<input id='cb_control_headings' type='checkbox' data-code='ergo_headings' class='cb_control skip_check'/> <label for='cb_control_headings' class='skip_check'>&Uuml;berschriften</label><br/>"
		+"<input id='cb_control_tables' type='checkbox' data-code='ergo_tables' class='cb_control skip_check'/> <label for='cb_control_tables' class='skip_check'>Tabellen</label><br/>"
		+"<input id='cb_control_lists' type='checkbox' data-code='ergo_lists' class='cb_control skip_check'/> <label for='cb_control_lists' class='skip_check'>Listen</label><br/>"
		+"<input id='cb_control_links' type='checkbox' data-code='ergo_links' class='cb_control skip_check'/> <label for='cb_control_links' class='skip_check'>Links</label><br/><br/>"
		+"<input id='cb_control_cc' type='checkbox' data-code='ergo_cc' class='cb_control skip_check'/> <label for='cb_control_cc' class='skip_check'>Farbkontrast pr&uuml;fen</label><br/><br/>"
		+"<input id='cb_control_alle_boxen' type='checkbox' data-code='ergo_alle_boxen' class='cb_control skip_check'/> <label for='cb_control_alle_boxen' class='skip_check'>Alles ausw&auml;hlen / abw&auml;hlen</label><br/><br/>"
		+"<b class='skip_check' title='Resize Browserfenster mit [ALT]+[r]'>Browserfenster Gr&ouml;&szlig;e &auml;ndern</b><br/>"
		+"<label class='skip_check' for='ipt_control_width'>Breite</label>: <input id='ipt_control_width' type='text' class='cb_control skip_check' style='width:13%;' value='1024'/> <label class='skip_check' for='ipt_control_height'>H&ouml;he</label>: <input id='ipt_control_height' type='text' class='cb_control skip_check' style='width:13%;' value='768'/><br/>";
		
	newdiv.style.backgroundColor = "#CFCFCF";
	
	document.body.appendChild(newdiv);
	
	newdiv.id = "div_control_modal";
	newdiv.title = "Schliessen mit [ALT]+[h]";
	newdiv.style.position = "fixed";
	newdiv.style.bottom = "1em";
	newdiv.style.right = "1em";
	newdiv.style.padding = "0.5em";
	newdiv.style.display = "block";
	newdiv.style.color = "black";	
	newdiv.style.borderBottom = "1px solid black";		
	newdiv.style.borderRight = "1px solid black";		
	newdiv.style.zIndex = 90000001;
	newdiv.className = "skip_check";	
	
	
	/* Elemente von letzter Prüfung aus DOM löschen */
	var delelements = document.body.getElementsByClassName("d_e_e_b_c");
  while(delelements.length > 0){
      delelements[0].parentNode.removeChild(delelements[0]);
  }
	document.body.removeChild(document.getElementById("load_content_div"));

	check_body = 0;
	count_lang=0;
	
	level=0;
	last_rect_bottom=[];
	last_rect_bottom_group=0;
	found_font_family = [];
	
	count_img=0;
	count_img_without_alt=0;
	count_img_without_alt_text=0;
	
	count_label=0;
	count_label_without_for=0;
	count_label_without_ele=0;
	label_arr=[];
	count_formele=0;
	count_formele_without_label=0;
	formele_arr=[];
	flag_fieldset=0;
		
	count_headings=0;
	count_tables=0;
	count_table_heads=0;
	count_lists=0;
	count_links=0;
	count_links_without_href=0;
	
	var elements = document.getElementsByTagName('*');
  for (var i = 0, n = elements.length; i < n; i++){
  	
  	//ele = document.getElementsByTagName('*')[i];
  	ele = elements[i];
  	if(ele.tagName=="!" || (ele.classList!==undefined && ele.classList!==null && ele.classList.contains("skip_check"))){
  		continue;
  	}
  	
		/* get Lang Attribute */
    if (ele.getAttribute("lang") !== null && ele.lang.trim()!=""){
    	count_lang++;
      msg_lang_arr.push("Das Element <"+ele.tagName+"> hat als Sprache \""+ele.lang+"\" eingestellt.");
			setInfoBubble("#1C28CA","lang="+ele.lang,"ergo_lang d_e_e_b_c",ele.getBoundingClientRect(),ele);
						
    }
    
    if(ele.tagName=="BODY"){
    	check_body=1;
    }
    
		if(((check_body==1 && ele.innerHTML!==undefined && ele.innerHTML.trim()!="" 
						&& (ele.innerHTML.trim().substr(0,1)!="<" || ele.innerHTML.trim().substr(0,2)=="<!" || ele.innerHTML.trim().substr(-1)!=">" || ele.innerHTML.trim().substr(-2)=="->"))
					|| ele.tagName=="SELECT" || ele.tagName=="INPUT" || ele.tagName=="IMG")
					&& (window.getComputedStyle(ele,null).getPropertyValue('display')!="none" || ele.tagName=="INPUT")
			){
			/* get character height */
			len=elements.length;
			//console.log(ele);
			//console.log(ele.innerHTML);
			
			text = ele.textContent;
			
		  /* Contrast Ratio */  
  		ele.setAttribute("data-cccolor",window.getComputedStyle(ele,null).getPropertyValue('color'));
  		ele.onmousemove = (function(event){
  			if(check_colorcontrast==0){
  				return false;
  			}
				event.stopPropagation();
				
				var delcontrast = document.body.getElementsByClassName("ergo_contrast");
			  while(delcontrast.length > 0){
			      delcontrast[0].parentNode.removeChild(delcontrast[0]);
			  }
				elecolor = window.getComputedStyle(this,null).getPropertyValue('color');
				elecolor = this.getAttribute("data-cccolor");
				elebgcolor = window.getComputedStyle(this,null).getPropertyValue('background-color');
				elebgcolor = window.getComputedStyle ? window.getComputedStyle(this, null).getPropertyValue("background-color"): this.style.backgroundColor;
				loop_ele = this;
				
				while (elebgcolor==="transparent" && loop_ele.tagName!=="BODY"){
					loop_ele = loop_ele.parentNode;
		      elebgcolor = window.getComputedStyle ? window.getComputedStyle(loop_ele, null).getPropertyValue("background-color"): loop_ele.style.backgroundColor;
		    }
				if(elebgcolor==="transparent"){
					elebgcolor="rgb(255,255,255)";
				}
				
				elecolor_arr = elecolor.split("(")[1].split(")")[0].split(",");
				elebgcolor_arr = elebgcolor.split("(")[1].split(")")[0].split(",");
				cont = Math.round(contrast(elebgcolor_arr,elecolor_arr)*10)/10;
				var x = event.clientX;     // Get the horizontal coordinate
				var y = event.clientY;     // Get the vertical coordinate
				mouse_rect = {"left":x,"top":y};
				if(cont>=4.5){
					setInfoBubble("green",cont.toString().replace(".",",")+":1","ergo_contrast d_e_e_b_c",mouse_rect,ele);
				}else{
					setInfoBubble("red",cont.toString().replace(".",",")+":1","ergo_contrast d_e_e_b_c",mouse_rect,ele);
				}				
		  });
			
			font_family_arr = window.getComputedStyle(ele,null).getPropertyValue('font-family').split(",");
			font_family = font_family_arr[0].trim().replace('"','').replace('"','').replace(' ','-').toLowerCase();
			
			if (!(font_family in fontfam_trans_arr)){
				if (found_font_family.indexOf(font_family)==-1){
      		msg_fontfamily_arr.push("!!! Achtung: Die auf der Webseite verwendete Font-Family "+font_family+" ist nicht im Code hinterlegt. Es wird wie bei Arial geprueft. !!!");
					found_font_family.push(font_family);
				}
				
				font_family="arial";
			}
			else if(found_font_family.indexOf(font_family)==-1){
      	msg_fontfamily_arr.push("Auf der Webseite wurde die Schriftart "+font_family+" gefunden.");
				found_font_family.push(font_family);
			}
			
			if(text!="" || ele.type=="submit" || ele.type=="button"){			
				rect = ele.getBoundingClientRect();
				
				if(level>0){
					
				}
				else{
					level++;
				}		
				
				//font_size = parseInt(window.getComputedStyle(ele,null).getPropertyValue('font-size'));
				font_size = Math.round(parseFloat(window.getComputedStyle(ele,null).getPropertyValue('font-size')));
				if(font_size<8){fsi=7;}else if(font_size>36){fsi=37;}else{fsi=font_size;}
				r_font_size = fontsize_obj[fontfam_trans_arr[font_family]][fsi];
				
				ele.style.border = "1px solid transparent";
				if(parseInt(r_font_size)>=mintextsize || fsi==37){
					//ele.style.border = "1px solid green";
					ele.classList.add("char_green_box");
					ele.classList.add("char_green_box_marker");
					setInfoBubble("green",r_font_size+"px","char_green d_e_e_b_c",rect,ele);
				}
				else{
					//ele.style.border = "1px solid red";
					ele.classList.add("char_red_box");
					ele.classList.add("char_red_box_marker");
					setInfoBubble("red",r_font_size+"px","char_red d_e_e_b_c",rect,ele);
				}
			}
			
			/* check images */
			if(ele.tagName=="IMG"){		
				count_img++;
				if(!ele.hasAttribute("alt")){
					count_img_without_alt++;
					setInfoBubble("#8D6323","No [ALT]","ergo_img ergo_alt_miss d_e_e_b_c",ele.getBoundingClientRect(),ele);
				}
				else if(ele.alt.trim()==""){
					count_img_without_alt_text++;
					setInfoBubble("#8D6323","Empty [ALT]","ergo_img ergo_alt d_e_e_b_c",ele.getBoundingClientRect(),ele);
				}
				else{
					setInfoBubble("#8D6323","[ALT]="+ele.alt,"ergo_img ergo_alt d_e_e_b_c",ele.getBoundingClientRect(),ele);
				}
			}
			
			/* check label and form elements */
			if(ele.tagName=="LABEL"){
				count_label++;
				if(ele.getAttribute("for")!==null && ele.getAttribute("for").trim()!=""){
					label_arr.push(ele.getAttribute("for").trim());	
				}
				else{
					ele.classList.add("ergo_for_box");
					ele.classList.add("ergo_for_box_marker");
					//ele.style.border = "1px solid #AC3CA0";					
					setInfoBubble("#AC3CA0","[FOR] fehlt","ergo_for d_e_e_b_c",rect,ele);
					
					count_label_without_for++;
				}
			}
			if((ele.tagName=="INPUT" || ele.tagName=="SELECT" || ele.tagName=="TEXTAREA") && (ele.type===undefined || ele.type===null || ele.type!="hidden") && ele.type!="submit" && ele.type!="button"){	
				count_formele++;
				if(ele.id!==undefined && ele.id.trim()!=""){
					formele_arr.push(ele.id);
				}
				else{
					ele.classList.add("ergo_formele_box");
					ele.classList.add("ergo_formele_box_marker");
					//ele.style.border = "1px solid #AC3CA0";					
					setInfoBubble("#AC3CA0","<LABEL> fehlt","ergo_formele d_e_e_b_c",ele.getBoundingClientRect(),ele);
					
					count_formele_without_label++;
				}
			}
			
		}
		
			/* check headings */
			if(["H1","H2","H3","H4","H5","H6"].indexOf(ele.tagName)>-1){
				count_headings++;
				setInfoBubble("#A32124",ele.tagName,"ergo_headings d_e_e_b_c",ele.getBoundingClientRect(),ele);
			}
			
			/* check tables */
			if(["TABLE","THEAD","TBODY","TH","TR","TD"].indexOf(ele.tagName)>-1){
				if(["TABLE"].indexOf(ele.tagName)>-1){	
					ele.classList.add("ergo_table_box");
					ele.classList.add("ergo_table_box_marker");		
					count_tables++;
				}
				if(["THEAD"].indexOf(ele.tagName)>-1){			
					count_table_heads++;
				}
				if(["TABLE","THEAD","TR"].indexOf(ele.tagName)>-1){			
					setInfoBubble("#A32124",ele.tagName,"ergo_tables d_e_e_b_c",ele.getBoundingClientRect(),ele);
				}
			}
					
			/* check lists */
			if(["LI","UL","OL"].indexOf(ele.tagName)>-1){
				if(["UL","OL"].indexOf(ele.tagName)>-1){	
					count_lists++;
				}
				setInfoBubble("#A32124",ele.tagName,"ergo_lists d_e_e_b_c",ele.getBoundingClientRect(),ele);
			}
					
			/* check links */
			if(["A"].indexOf(ele.tagName)>-1){		
				count_links++;
				setInfoBubble("#A32124",ele.tagName,"ergo_links d_e_e_b_c",ele.getBoundingClientRect(),ele);
				if(ele.href===undefined || ele.href.trim()==""){
					count_links_without_href++;
				}
			}
					
	}
	if(count_lang==0){
   	msg_lang_arr.push("!!! Auf der Seite wurde kein LANG-Attribut definert. !!!");
	}
  msg_img_arr.push((count_img-count_img_without_alt)+" von "+count_img+" Bildern besitzen ein ALT-Attribut.");
  msg_img_arr.push((count_img-count_img_without_alt-count_img_without_alt_text)+" von "+count_img+" Bildern besitzen einen Alternativtext.");
  
  /* Label und Eingabefelder auswerten */ 
	for(var j=0;j<label_arr.length;j++){
		if(formele_arr.indexOf(label_arr[j])==-1){
			document.querySelector('[for="'+label_arr[j]+'"]').classList.add("ergo_for_box");
			document.querySelector('[for="'+label_arr[j]+'"]').classList.add("ergo_for_box_marker");				
			setInfoBubble("#AC3CA0","[FOR] ohne Element","ergo_for d_e_e_b_c",document.querySelector('[for="'+label_arr[j]+'"]').getBoundingClientRect(),ele);
			count_label_without_ele++;
		}
	}
	for(var j=0;j<formele_arr.length;j++){
		if(label_arr.indexOf(formele_arr[j])==-1){
			document.getElementById(formele_arr[j]).classList.add("ergo_formele_box");
			document.getElementById(formele_arr[j]).classList.add("ergo_formele_box_marker");		
			setInfoBubble("#AC3CA0","<LABEL> fehlt","ergo_formele d_e_e_b_c",document.getElementById(formele_arr[j]).getBoundingClientRect(),ele);
			count_formele_without_label++;
		}
	}
  
  /* Ausgabe der Meldungen */
  console.log(" ");
  console.log("SPRACHE");
  for(var i=0;i<msg_lang_arr.length;i++){
  	console.log(msg_lang_arr[i]);
  }
  
  console.log("-------------------------------------");
  console.log("BILDER");
  for(var i=0;i<msg_img_arr.length;i++){
  	console.log(msg_img_arr[i]);
  }
  console.log("-------------------------------------");
  console.log("SCHRIFT");
  for(var i=0;i<msg_fontfamily_arr.length;i++){
  	console.log(msg_fontfamily_arr[i]);
  }
  console.log("-------------------------------------");
  console.log("STRUKTUR");
  console.log(count_label+" <LABEL>-Elemente gefunden.");  
  console.log(count_label_without_for+" von "+count_label+" <LABEL>-Elemente ohne FOR-Attribut.");  
  console.log(count_label_without_ele+" von "+count_label+" <LABEL>-Elemente ohne zugehoeriges Element.");  
  console.log("---");
  console.log(count_formele+" Formular-/Eingabe-Elemente gefunden.");  
  console.log(count_formele_without_label+" von "+count_formele+" Formular-/Eingabe-Elemente ohne zugehoeriges <LABEL>-Element."); 
  console.log("---");
  console.log(count_headings+" Ueberschriften wurden gefunden.");  
  console.log("---");
  console.log(count_tables+" Tabellen wurden gefunden.");
  console.log(count_tables-count_table_heads+" Tabellen besitzen kein <TH>-Element.");  
  console.log("---");
  console.log(count_lists+" Listen wurden gefunden.");  
  console.log("---");
  console.log(count_links+" Links wurden gefunden.");  
  console.log(count_links_without_href+" Links ohne HREF wurden gefunden.");  
  console.log("-------------------------------------");
  
  
  /* Control Box */
	document.onkeydown = function (e) {
		// [ALT]+[h] 
		if(e.altKey && e.keyCode==72){
			var control_ele = document.getElementById("div_control_modal");
			sdisplay = control_ele.style.display;
			if(sdisplay=="block"){
				control_ele.style.display="none";
			}
			else{
				control_ele.style.display="block";
			}
		}
		// [ALT]+[r] 
		if(e.altKey && e.keyCode==82){
			resizeBrowserfenster();
		}
		// [ENTER] 
		if(e.keyCode==13){
			if(document.getElementById("ipt_control_width") === document.activeElement || document.getElementById("ipt_control_height") === document.activeElement){
				resizeBrowserfenster();
			}
		}
	};
	
	/* Steuerbox */
	var cb_controls = document.getElementsByClassName("cb_control");
	for (var i = 0; i < cb_controls.length; i++) {
    cb_controls[i].addEventListener('change', function(){
    	clicked_cb_id = this.id;
    	
    	if(["cb_control_alle_boxen","cb_control_cc"].indexOf(clicked_cb_id)==-1){
	    	if(clicked_cb_id=="cb_control_alt_attr"){
	    			//document.getElementById("cb_control_alt_attr_miss").checked=document.getElementById(this.id).checked;
	    	}
	    	var check_elements = document.getElementsByClassName(this.getAttribute("data-code"));
	    	if(document.getElementById(this.id).checked){	 
	    		for (var j = 0; j < check_elements.length; j++) {
	    			check_elements[j].style.display="block";
	    			
	    			if(marker_obj[clicked_cb_id]!==undefined){
		    			var text_elements = document.getElementsByClassName(marker_obj[clicked_cb_id]["marker_class"]);
		  				for (var k = 0; k < text_elements.length; k++) {
		  					text_elements[k].classList.add(marker_obj[clicked_cb_id]["style_class"]);
		  				}
		  			}
	    		}
	    	}
	    	else{		
	    		document.getElementById("cb_control_alle_boxen").checked=false;
	    		for (var j = 0; j < check_elements.length; j++) {
	    			check_elements[j].style.display="none";   
	    			
	    			if(marker_obj[clicked_cb_id]!==undefined){
							var text_elements = document.getElementsByClassName(marker_obj[clicked_cb_id]["marker_class"]);
							for (var k = 0; k < text_elements.length; k++) {
								text_elements[k].classList.remove(marker_obj[clicked_cb_id]["style_class"]);
							}
						}
	    		}
	    	}
	    }
	    else if(["cb_control_alle_boxen"].indexOf(clicked_cb_id)>-1){
	    	alle = document.getElementById(this.id).checked;
				var cb_controls_boxen = document.getElementsByClassName("cb_control");
				for (var m = 0; m < cb_controls_boxen.length; m++) {
					if(cb_controls_boxen[m].id!="cb_control_alle_boxen"){
							document.getElementById(cb_controls_boxen[m].id).checked = alle;
							var evt = document.createEvent("HTMLEvents");
					    evt.initEvent("change", false, true);
					    document.getElementById(cb_controls_boxen[m].id).dispatchEvent(evt);
					}
				}
	    }
	    else if(["cb_control_cc"].indexOf(clicked_cb_id)>-1){
	    	if(document.getElementById("cb_control_cc").checked){check_colorcontrast=1;}
	    	else{check_colorcontrast=0;}
	    }
    }, false);
	}
	
  document.getElementById("cb_control_close").addEventListener('click', function(){ 	
			var control_ele = document.getElementById("div_control_modal");
			control_ele.style.display="none";
  });
	
	/* halbtransparente Ebene löschen */
	/*var parent = document.body;
	var child = document.getElementById("load_content_div");
	parent.removeChild(child);*/
//},false);

function setInfoBubble(bgcolor,text,className,rect,checkedEle){
	newdiv = document.createElement("DIV");
	newdiv.style.border = "1px solid "+bgcolor;
	
	newdiv.style.backgroundColor = bgcolor;
	document.body.appendChild(newdiv);
	/*
	console.log(checkedEle);
	console.log(checkedEle.parentNode);
	checkedEle.parentNode.insertBefore(newdiv, checkedEle);
	i++;
	*/
	newdiv.appendChild(document.createTextNode(text));
	newdiv.style.display = "table";
	newdiv.style.color = "white";			
	newdiv.style.zIndex = 90000000;
	newdiv.className = className;
	//newdiv.classList.add("skip_check");
	newdiv.style.position = "absolute";
	if(ele.position=="relative"){
		newdiv.style.position = "relative";
	}
	
	rect_newdiv = newdiv.getBoundingClientRect();
	lineheight=rect_newdiv.height;
	if(lineheight===undefined){
		lineheight=0;
	}
	if(["TR","TH","LI"].indexOf(text)==-1){
		newdiv.style.left = rect.left+"px";
		newdiv.style.top = Math.max(0,window.pageYOffset+rect.top-lineheight)+"px";
	}
	else if(["TR","LI"].indexOf(text)>-1){
		newdiv.style.left = Math.max(0,rect.left-20)+"px";
		newdiv.style.top = Math.max(0,window.pageYOffset+rect.top)+"px";
	}
	
	if(["ergo_headings d_e_e_b_c","ergo_tables d_e_e_b_c","ergo_lists d_e_e_b_c","ergo_links d_e_e_b_c","char_green d_e_e_b_c"].indexOf(className)>-1){
		newdiv.style.display="none";
		
		var text_elements = document.getElementsByClassName(marker_obj["cb_control_gr_char"]["marker_class"]);
		for (var k = 0; k < text_elements.length; k++) {
			text_elements[k].classList.remove(marker_obj["cb_control_gr_char"]["style_class"]);
		}
		var table_elements = document.getElementsByClassName(marker_obj["cb_control_tables"]["marker_class"]);
		for (var k = 0; k < text_elements.length; k++) {
			text_elements[k].classList.remove(marker_obj["cb_control_tables"]["style_class"]);
		}
	}
}

function luminanace(r, g, b) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
function contrast(rgb1, rgb2) {
	l1=luminanace(rgb1[0], rgb1[1], rgb1[2]) + 0.05;
	l2=luminanace(rgb2[0], rgb2[1], rgb2[2]) + 0.05;
    return (Math.max(l1,l2)
         / Math.min(l1,l2));
}

function resizeBrowserfenster(){
	width=document.getElementById("ipt_control_width").value-10;
	height=document.getElementById("ipt_control_height").value-90;
	window.open(document.URL, '_blank', 'location=yes,height='+height+',width='+width+',scrollbars=yes,status=yes');
}
//void(0);

//javascript:mintextsize=10;fontsize_obj={"arial":{"7":"<6","8":6,"9":7,"10":7,"11":8,"12":9,"13":10,"14":10,"15":11,"16":12,"17":12,"18":13,"19":14,"20":15,"21":15,"22":16,"23":17,"24":17,"25":18,"26":19,"27":20,"28":20,"29":21,"30":22,"31":22,"32":23,"33":24,"34":25,"35":25,"36":26,"37":">26"},"helvetica":{"7":"<6","8":6,"9":7,"10":7,"11":8,"12":9,"13":10,"14":10,"15":11,"16":12,"17":12,"18":13,"19":14,"20":15,"21":15,"22":16,"23":17,"24":17,"25":18,"26":19,"27":20,"28":20,"29":21,"30":22,"31":22,"32":23,"33":24,"34":25,"35":25,"36":26,"37":">26"},"segoe":{"7":"<6","8":6,"9":6,"10":7,"11":8,"12":8,"13":9,"14":10,"15":11,"16":11,"17":12,"18":13,"19":13,"20":14,"21":15,"22":15,"23":16,"24":17,"25":18,"26":18,"27":19,"28":20,"29":21,"30":21,"31":22,"32":23,"33":24,"34":24,"35":25,"36":26,"37":">26"}};check_character=0;count_lang=0;level=0;last_rect_bottom=[];last_rect_bottom_group=0;found_font_family=[];var elements=document.getElementsByTagName('*');for(var i=0,n=elements.length;i<n;i++){ele=document.getElementsByTagName('*')[i];if(elements[i].getAttribute("lang")!==null){count_lang++;console.log("Das Element <"+ele.tagName+"> hat als Sprache \""+ele.lang+"\" eingestellt.");setInfoBubble("#1C28CA","lang="+ele.lang,"ergo_check",ele.getBoundingClientRect())}if(ele.tagName=="BODY"){check_character=1}if(check_character==1){len=elements.length;text=ele.textContent;font_family_arr=window.getComputedStyle(ele,null).getPropertyValue('font-family').split(",");font_family=font_family_arr[0].trim().replace('"','').replace('"','').replace(' ','-').toLowerCase();if(!(font_family in fontsize_obj)){if(!(found_font_family.indexOf(font_family)>-1)){console.log("!!! Achtung: Die auf der Webseite verwendete Font-Family "+font_family+" ist nicht im Code hinterlegt. Es wird wie bei Arial geprüft. !!!");found_font_family.push(font_family)}font_family="arial"}else if(!(found_font_family.indexOf(font_family)>-1)){console.log("Auf der Webseite wurde die Schriftart "+font_family+" gefunden.");found_font_family.push(font_family)}if(text!=""){rect=ele.getBoundingClientRect();if(level>0){}else{level++}font_size=parseInt(window.getComputedStyle(ele,null).getPropertyValue('font-size'));if(font_size<8){fsi=7}else if(font_size>36){fsi=37}else{fsi=font_size}r_font_size=fontsize_obj[font_family][fsi];if(parseInt(r_font_size)>=mintextsize||fsi==37){ele.style.border="1px solid green";setInfoBubble("green",r_font_size+"px","char_green",rect)}else{ele.style.border="1px solid red";setInfoBubble("red",r_font_size+"px","char_red",rect)}}}}if(count_lang==0){console.log("!!! Auf der Seite wurde ein LANG-Attribut definert. !!!")}function setInfoBubble(bgcolor,text,className,rect){newdiv=document.createElement("DIV");newdiv.style.border="1px solid "+bgcolor;newdiv.style.backgroundColor=bgcolor;document.body.appendChild(newdiv);newdiv.appendChild(document.createTextNode(text));newdiv.style.display="table";newdiv.style.position="absolute";newdiv.style.left=rect.left+"px";newdiv.style.color="white";newdiv.style.zIndex=90000000;newdiv.className=className;rect_newdiv=newdiv.getBoundingClientRect();lineheight=rect_newdiv.height;newdiv.style.top=Math.max(0,rect.top-lineheight)+"px"}void(0);
//javascript:mintextsize=10;fontsize_obj={"arial":{"7":"<6","8":6,"9":7,"10":7,"11":8,"12":9,"13":10,"14":10,"15":11,"16":12,"17":12,"18":13,"19":14,"20":15,"21":15,"22":16,"23":17,"24":17,"25":18,"26":19,"27":20,"28":20,"29":21,"30":22,"31":22,"32":23,"33":24,"34":25,"35":25,"36":26,"37":">26"},"helvetica":{"7":"<6","8":6,"9":7,"10":7,"11":8,"12":9,"13":10,"14":10,"15":11,"16":12,"17":12,"18":13,"19":14,"20":15,"21":15,"22":16,"23":17,"24":17,"25":18,"26":19,"27":20,"28":20,"29":21,"30":22,"31":22,"32":23,"33":24,"34":25,"35":25,"36":26,"37":">26"},"segoe":{"7":"<6","8":6,"9":6,"10":7,"11":8,"12":8,"13":9,"14":10,"15":11,"16":11,"17":12,"18":13,"19":13,"20":14,"21":15,"22":15,"23":16,"24":17,"25":18,"26":18,"27":19,"28":20,"29":21,"30":21,"31":22,"32":23,"33":24,"34":24,"35":25,"36":26,"37":">26"}};msg_img_arr=[];msg_fontfamily_arr=[];msg_lang_arr=[];if(document.documentMode<9){console.log("ENDE: Die Webseite läuft im Dokumentenmodus "+document.documentMode+". Es muss mindestens der Dokumentenmodus 9 im IE aktiv sein.");debugger}newdiv=document.createElement("DIV");newdiv.innerHTML="<b class='skip_check'>Bilder</b><br/><input id='cb_control_alt_attr' data-code='ergo_img' class='cb_control' type='checkbox' checked/><label for='cb_control_alt_attr' class='skip_check'>ALT-Attribut</label><br/>"+"<b class='skip_check'>Schrift</b><br/><input id='cb_control_gr_char' type='checkbox' data-code='char_green' class='cb_control' checked/> <label for='cb_control_gr_char' class='skip_check'>gr&uuml;ne Schrift</label><br/><input id='cb_control_red_char' data-code='char_red' class='cb_control' type='checkbox' checked/> <label for='cb_control_red_char' class='skip_check'>rote Schrift</label><br/>"+"<b class='skip_check'>Sprache</b><br/><input id='cb_control_lang_attr' type='checkbox' data-code='ergo_lang' class='cb_control' checked/> <label for='cb_control_lang_attr' class='skip_check'>LANG-Tag</label>";newdiv.style.backgroundColor="#CFCFCF";document.body.appendChild(newdiv);newdiv.id="div_control_modal";newdiv.title="Schließen mit [ALT]+[h]";newdiv.style.position="fixed";newdiv.style.bottom="1em";newdiv.style.right="1em";newdiv.style.padding="0.5em";newdiv.style.display="block";newdiv.style.color="black";newdiv.style.borderBottom="1px solid black";newdiv.style.borderRight="1px solid black";newdiv.style.zIndex=90000001;newdiv.className="skip_check";var delelements=document.body.getElementsByClassName("d_e_e_b_c");while(delelements.length>0){delelements[0].parentNode.removeChild(delelements[0])}check_body=0;count_lang=0;level=0;last_rect_bottom=[];last_rect_bottom_group=0;found_font_family=[];count_img=0;count_img_without_alt=0;var elements=document.getElementsByTagName('*');for(var i=0,n=elements.length;i<n;i++){ele=document.getElementsByTagName('*')[i];if(ele.tagName=="!"||ele.className=="skip_check"){continue}if(ele.getAttribute("lang")!==null&&ele.lang.trim()!=""){count_lang++;msg_lang_arr.push("Das Element <"+ele.tagName+"> hat als Sprache \""+ele.lang+"\" eingestellt.");setInfoBubble("#1C28CA","lang="+ele.lang,"ergo_lang d_e_e_b_c",ele.getBoundingClientRect())}if(ele.tagName=="BODY"){check_body=1}console.log(ele);console.log(ele.innerHTML.trim().substr(0,1));if(check_body==1&&ele.innerHTML.trim().substr(0,1)!="<"){len=elements.length;text=ele.textContent;font_family_arr=window.getComputedStyle(ele,null).getPropertyValue('font-family').split(",");font_family=font_family_arr[0].trim().replace('"','').replace('"','').replace(' ','-').toLowerCase();if(!(font_family in fontsize_obj)){if(!(found_font_family.indexOf(font_family)>-1)){msg_fontfamily_arr.push("!!! Achtung: Die auf der Webseite verwendete Font-Family "+font_family+" ist nicht im Code hinterlegt. Es wird wie bei Arial geprüft. !!!");found_font_family.push(font_family)}font_family="arial"}else if(!(found_font_family.indexOf(font_family)>-1)){msg_fontfamily_arr.push("Auf der Webseite wurde die Schriftart "+font_family+" gefunden.");found_font_family.push(font_family)}if(text!=""){rect=ele.getBoundingClientRect();if(level>0){}else{level++}font_size=parseInt(window.getComputedStyle(ele,null).getPropertyValue('font-size'));if(font_size<8){fsi=7}else if(font_size>36){fsi=37}else{fsi=font_size}r_font_size=fontsize_obj[font_family][fsi];if(parseInt(r_font_size)>=mintextsize||fsi==37){ele.style.border="1px solid green";setInfoBubble("green",r_font_size+"px","char_green d_e_e_b_c",rect)}else{ele.style.border="1px solid red";setInfoBubble("red",r_font_size+"px","char_red d_e_e_b_c",rect)}}if(ele.tagName=="IMG"){count_img++;if(ele.alt.trim()==""){count_img_without_alt++;setInfoBubble("#8D6323","No [ALT]","ergo_img d_e_e_b_c",ele.getBoundingClientRect())}else{setInfoBubble("#8D6323","[ALT]="+ele.alt,"ergo_img d_e_e_b_c",ele.getBoundingClientRect())}}}}if(count_lang==0){msg_fontfamily_arr.push("!!! Auf der Seite wurde ein LANG-Attribut definert. !!!")}msg_img_arr.push((count_img-count_img_without_alt)+" von "+count_img+" Bildern besitzen einen Alternativtext.");console.log(" ");console.log("SPRACHE");for(var i=0;i<msg_lang_arr.length;i++){console.log(msg_lang_arr[i])}console.log("---------------
//javascript:el=document.createElement('script');el.src='https://mein-sporttagebuch.de/ergonomie/marker.js';document.body.appendChild(el);
//javascript:el=document.createElement('script');el.src='\\\\Wwg00m.rootdom.net\\dfs\\HOME\\UECM2WQ\\Tools\\charheight_marker\\misc\\markertest.js';document.body.appendChild(el);
