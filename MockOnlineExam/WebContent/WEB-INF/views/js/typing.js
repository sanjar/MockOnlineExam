function typingObject(){
	this.words = 0;
	this.row1_string = '';
	this.word_string = '';
	this.spaceCount = 0;
	this.wordCount = 0;
	this.startIndex = 0;
	this.endIndex = 0;
	this.inputArray = '';
	this.currentTypedWord = '';
	this.textAreaValue = '';
	this.wordCountTyped = 0;
	this.correctWordArray = new Array();
	this.wrongWordArray = new Array();
	this.currentWordsTextArea = 0;
	this.totalChar = '';
	this.totalCharLength = 0;
	this.correctWordCount = 0;
	this.wrongWordCount = 0;
	this.keyStrokesCount = 0;
	this.errorKeyStrokesCount = 0;
	this.correctKeyStrokesCount = 0;
	this.backSpaceCount = 0;
	this.cursorPos = 0;
	this.arrayTillCursor = '';
	this.wordsTillCursor = 0;
	this.arrayFromCursorTillLast = 0;
	this.wordsFromCursorTillLast = 0;
	this.totalWordsArea = 0;
	this.allowEdit = 'yes';
	this.allowMultipleSpace = 'yes';
	this.typedWordCount = 0;
	
	this.textForRestrictedTyping='';
	this.restrictedPosition = 0;
	this.highlightTextChar = 1;
	this.typedTextCount = 1;
	this.restrictedErrors = 0;
	this.coloredCursorPosition = 0;
	this.coloredTextForTyping = '';
	this.finalLine = 0;
	this.typingTextLength = 0;
	this.paste_utilitzat=0;
	this.charCount = $("#typedAnswer").text().length;
};

function loadTypingContentUnrestricted(){
	mockVar.typingGroup[mockVar.currentGrp].words = mockVar.typingGroup[mockVar.currentGrp].word_string.split(" ");
	var str = fill_line_switcher();
	$("#typedAnswer").focus();
	$("#row1").show();
	$("#totalKeyStrokesCount").html(mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount.toString());
	//$("#correctKeyCount").html(mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount);
	//$("#wrongKeyCount").html(mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount);
	$("#backSpaceCount").html(mockVar.typingGroup[mockVar.currentGrp].backSpaceCount.toString());
//	$("#typedWordCountVal").html(mockVar.typingGroup[mockVar.currentGrp].typedWordCount);
//	$("#totalWordCountVal").html(mockVar.typingGroup[mockVar.currentGrp].words.length);
//	$("#remainingWordCountVal").html(mockVar.typingGroup[mockVar.currentGrp].words.length - mockVar.typingGroup[mockVar.currentGrp].typedWordCount);
	return str;
}

function fill_line_switcher() {
	mockVar.typingGroup[mockVar.currentGrp].row1_string = '';
    for (var i = 0; i < mockVar.typingGroup[mockVar.currentGrp].words.length; i++){
    	mockVar.typingGroup[mockVar.currentGrp].row1_string +='<span wordnr=\"'+i+'\" class=\"\" id=\"sp'+i+'\">'+mockVar.typingGroup[mockVar.currentGrp].words[i].replace(/\&/g,'&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;')+'</span>';
    	mockVar.typingGroup[mockVar.currentGrp].row1_string += " ";
    }
    var str = '<br/><center><div id="row1" style="">'+mockVar.typingGroup[mockVar.currentGrp].row1_string+'</div><br/><div class="textAreaDiv"><textarea spellcheck="false" id="typedAnswer" onselectstart="return false;" oninput="javascript:checkPasteFF();" onkeydown="copyDataWithEdit(event);" onkeyup="calculateKeyStrokes(event);">'+iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues].answer+'</textarea></div></center>';
	return str;
}

function calculateKeyStrokes(e){
	var key_code = (window.event) ? event.keyCode : e.which;
	mockVar.typingGroup[mockVar.currentGrp].typedWordCount = $('#typedAnswer').val().split(' ').length;
	/*if($('#typedAnswer').val().length>0 && $('#typedAnswer').val().indexOf(' ')==-1){
		mockVar.typingGroup[mockVar.currentGrp].typedWordCount = 1;
	} else if($('#typedAnswer').val().length==0){
		mockVar.typingGroup[mockVar.currentGrp].typedWordCount = 0;
	} else{
		if(!$('#typedAnswer').val().match(/\S+/g) || $('#typedAnswer').val().split(' ').length-1>$('#typedAnswer').val().match(/\S+/g).length){
			mockVar.typingGroup[mockVar.currentGrp].typedWordCount = $('#typedAnswer').val().split(' ').length-1;
		}else if($('#typedAnswer').val().split(' ').length-1==$('#typedAnswer').val().match(/\S+/g).length && $('#typedAnswer').val().indexOf(' ')==0){
			mockVar.typingGroup[mockVar.currentGrp].typedWordCount = $('#typedAnswer').val().split(' ').length;
		}else{
			mockVar.typingGroup[mockVar.currentGrp].typedWordCount = $('#typedAnswer').val().match(/\S+/g).length;
		}
	}*/
	mockVar.typingGroup[mockVar.currentGrp].cursorPos = getCaretForAlphaNumeric(document.getElementById("typedAnswer"));
	if(mockVar.typingGroup[mockVar.currentGrp].allowMultipleSpace == "yes"){
		getRequiredArrayswithMultipleSpace();
	}else if(mockVar.typingGroup[mockVar.currentGrp].allowMultipleSpace == 'no'){
		getRequiredArrayswithTrim();
	}
	mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor = mockVar.typingGroup[mockVar.currentGrp].arrayTillCursor.split(" ").length-1;
	if(key_code == 32 || key_code == 8 || key_code == 46 || key_code == 37 || key_code == 39){
		doCalculations();
		scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
	}
	
	
	mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount = $("#typedAnswer").val().length;
	$("#totalKeyStrokesCount").html(mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount.toString());
//	$("#correctKeyCount").html(mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount);
//	$("#wrongKeyCount").html(mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount);
	$("#backSpaceCount").html(mockVar.typingGroup[mockVar.currentGrp].backSpaceCount.toString());
//	$("#typedWordCountVal").html(mockVar.typingGroup[mockVar.currentGrp].typedWordCount);
//	$("#totalWordCountVal").html(mockVar.typingGroup[mockVar.currentGrp].words.length);
//	$("#remainingWordCountVal").html(mockVar.typingGroup[mockVar.currentGrp].words.length - mockVar.typingGroup[mockVar.currentGrp].typedWordCount);
	if(mockVar.typingGroup[mockVar.currentGrp].typedWordCount == mockVar.typingGroup[mockVar.currentGrp].words.length){
		$('#finalTypingSub').removeAttr('disabled');
	}
}

function copyDataWithEdit(e){    //For unrestricted verion, with allowEdit and allowMultipleSpace as yes/no.
	try{
		$(document).unbind('keydown').bind('keydown', function 	(event) {
			var key_code = (window.event) ? event.keyCode : e.which;
	//		mockVar.typingGroup[mockVar.currentGrp].cursorPos = getCaretForAlphaNumeric(document.getElementById("typedAnswer"));
			
		/*	if($("#typedAnswer").val().split(" ")>mockVar.typingGroup[mockVar.currentGrp].words){	// If Typed Content exceeds Question Content, then only allow left and right arrow keys along with delete and backspace in case of allowEdit is yes.
				if(!(key_code==8 || key_code==46 || key_code==37 || key_code==39))
				(window.event) ? event.preventDefault() : e.preventDefault();
			}else{*/
				var a=0;
				var b=0;

			/*	if(!(key_code == 16 || key_code == 20)){	// Do not count shift and capslock key counts
					mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount++;
				}*/
				
				if($('#typedAnswer').val().split(' ').length == mockVar.typingGroup[mockVar.currentGrp].words.length){
					if(key_code == 32 || key_code == 13)
						(window.event) ? event.preventDefault() : e.preventDefault();
				}
				if(mockVar.typingGroup[mockVar.currentGrp].allowEdit == 'yes'){    //If allowEdit is yes then,
					if(mockVar.typingGroup[mockVar.currentGrp].allowMultipleSpace == "yes"){    // If multiple space needs to be considered then,
				//		getRequiredArrayswithMultipleSpace();
				//		mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor = mockVar.typingGroup[mockVar.currentGrp].arrayTillCursor.split(" ").length-1;
						/*if(key_code == 32){		// If keyPressed is space, then calculate the correctness of typed word.
							mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor+=1;
							doCalculationOnSpace(a,b);
							scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
						}else */if(key_code == 8){	// If keyPressed is backspace, then perform calculations.
						//	$("#row1 span").removeClass();
						//	doCalculationOnSpace(a,b);
							mockVar.typingGroup[mockVar.currentGrp].backSpaceCount++;
						//	mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount--;
						//	mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount++;
						//	scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
						}/*else if(key_code==46){		// If keyPressed is delete, then perform calculations.
							$("#row1 span").removeClass();
							doCalculationOnSpace(a,b);
							scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
						}else if(key_code==37 || key_code==39){		// If keyPressed is left/right arrow keys, then perform calculations.
							doCalculationOnSpace(a,b);
							scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
						}*/else if(key_code==27 || key_code==9 || (key_code>=17 && key_code<=19) || key_code==13 || (key_code>=91 && key_code<=93) || (key_code>=33 && key_code<=36) || key_code==38 || key_code==40 || key_code==45 || (key_code>=112 && key_code<=123) || key_code==145){
						//	mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount--;
						//	mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount++;
							(window.event) ? event.preventDefault() : e.preventDefault();
						}
				//		doHighlightNextWord();	
					} else if(mockVar.typingGroup[mockVar.currentGrp].allowMultipleSpace == 'no'){    // If multiple space should not be considered then,
					//	getRequiredArrayswithTrim();
						mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor = mockVar.typingGroup[mockVar.currentGrp].arrayTillCursor.split(" ").length-1;
						if(key_code == 32){
							if(mockVar.typingGroup[mockVar.currentGrp].totalChar.charCodeAt(mockVar.typingGroup[mockVar.currentGrp].cursorPos - 1)!=32 && mockVar.typingGroup[mockVar.currentGrp].totalChar.charCodeAt(mockVar.typingGroup[mockVar.currentGrp].cursorPos)!=32 && mockVar.typingGroup[mockVar.currentGrp].totalChar.charCodeAt(mockVar.typingGroup[mockVar.currentGrp].cursorPos+1)!=32){
								mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor+=1;
								$("#row1 span").removeClass();
								doCalculationOnSpace(a,b);
								scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
							} else {
								(window.event) ? event.preventDefault() : e.preventDefault();
							}
						}else if(key_code == 8){
							$("#row1 span").removeClass();
							doCalculationOnSpace(a,b);
							mockVar.typingGroup[mockVar.currentGrp].backSpaceCount++;
							mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount--;
							mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount++;
							scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
						}else if(key_code==46){
							$("#row1 span").removeClass();
							doCalculationOnSpace(a,b);
							scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
						}else if(key_code==37 || key_code==39){
							$("#row1 span").removeClass();
							doCalculationOnSpace(a,b);
							scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
						}else if(key_code==27 || key_code==9 || (key_code>=17 && key_code<=19) || key_code==13 || (key_code>=91 && key_code<=93) || (key_code>=33 && key_code<=36) || key_code==38 || key_code==40 || key_code==45 || (key_code>=112 && key_code<=123) || key_code==145){
							mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount--;
							mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount++;
							(window.event) ? event.preventDefault() : e.preventDefault();
						}
				//		doHighlightNextWord();	
					}
				} else if(mockVar.typingGroup[mockVar.currentGrp].allowEdit == 'no'){    //If allowEdit is no then,
					if(mockVar.typingGroup[mockVar.currentGrp].cursorPos<$('#typedAnswer').val().length){
						setCursorPos(document.getElementById("typedAnswer"), $('#typedAnswer').val().length);
						(window.event) ? event.preventDefault() : e.preventDefault();
					}else if(mockVar.typingGroup[mockVar.currentGrp].allowMultipleSpace == 'yes'){    //If allowEdit is no and if multiple space needs to be considered then,
				//		getRequiredArrayswithMultipleSpace();
						if(key_code == 32){
							doCalculationOnSpaceWithNoEdit(a,b);
							mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor++;
							scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
						} else if(key_code==8){
							mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount--;
							mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount++;
							if(mockVar.typingGroup[mockVar.currentGrp].arrayTillCursor.charCodeAt(mockVar.typingGroup[mockVar.currentGrp].arrayTillCursor.length - 1)!= 32 ){
								mockVar.typingGroup[mockVar.currentGrp].backSpaceCount++;
							}else{
								(window.event) ? event.preventDefault() : e.preventDefault();
							}
						} else if(key_code==27 || key_code==9 || key_code==46 || (key_code>=17 && key_code<=19) || key_code==13 || (key_code>=91 && key_code<=93) || (key_code>=33 && key_code<=40) || key_code==38 || key_code==40 || key_code==45 || (key_code>=112 && key_code<=123) || key_code==145){
							mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount--;
							mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount++;
							(window.event) ? event.preventDefault() : e.preventDefault();
						}
						$("#sp"+(mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor)).removeClass('highlight').addClass('highlight');
					}else if(mockVar.typingGroup[mockVar.currentGrp].allowMultipleSpace == 'no'){    // If allowEdit is no and if multiple space should not be considered then,
				//		getRequiredArrayswithTrim();
						if(key_code == 32){
							if(mockVar.typingGroup[mockVar.currentGrp].totalChar.charCodeAt(mockVar.typingGroup[mockVar.currentGrp].cursorPos - 1)!=32 && mockVar.typingGroup[mockVar.currentGrp].totalChar.charCodeAt(mockVar.typingGroup[mockVar.currentGrp].cursorPos + 1)!=32){
								doCalculationOnSpaceWithNoEdit(a,b);
								mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor++;
								scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
							} else {
								(window.event) ? event.preventDefault() : e.preventDefault();
							}
						} else if(key_code==8){
							mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount--;
							mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount++;
							if(mockVar.typingGroup[mockVar.currentGrp].arrayTillCursor.charCodeAt(mockVar.typingGroup[mockVar.currentGrp].arrayTillCursor.length - 1)!= 32 ){
								mockVar.typingGroup[mockVar.currentGrp].backSpaceCount++;
							}else{
								(window.event) ? event.preventDefault() : e.preventDefault();
							}
						} else if(key_code==27 || key_code==9 || key_code==46 || (key_code>=17 && key_code<=19) || key_code==13 || (key_code>=91 && key_code<=93) || (key_code>=33 && key_code<=40) || key_code==38 || key_code==40 || key_code==45 || (key_code>=112 && key_code<=123) || key_code==145){
							mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount--;
							mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount++;
							(window.event) ? event.preventDefault() : e.preventDefault();
						}
						$("#sp"+(mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor)).removeClass('highlight').addClass('highlight');
					}
				}
			//}
		});
	}catch(e){
		serverLogMessage('Exception in typing.js(copyDataWithEdit) : '+e);
	}
}

/*function copyDataWithNoEdit(e){    // For restricted version with allowEdit and allowMultipleSpace as no by default.
	$(document).unbind('keypress').bind('keypress', function 	(event) {
		var key_code = (window.event) ? event.keyCode : e.which;
		mockVar.typingGroup[mockVar.currentGrp].cursorPos = getCaretForAlphaNumeric(document.getElementById("typedAnswer"));
		
		if(mockVar.typingGroup[mockVar.currentGrp].cursorPos>mockVar.typingGroup[mockVar.currentGrp].word_string.length){
			(window.event) ? event.preventDefault() : e.preventDefault();
		}else{

			var a=0;
			var b=0;

			if(!(key_code == 16 || key_code == 20)){
				mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount++;
			}
			$("#totalKeyStrokesCount").html(mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount);
			$("#correctKeyCount").html(mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount);
			$("#wrongKeyCount").html(mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount);
			$("#backSpaceCount").html(mockVar.typingGroup[mockVar.currentGrp].backSpaceCount);
			
			$("#typedAnswer").keydown(function(evt){
				var keyP = (window.event) ? evt.keyCode : evt.which ;
				if(keyP == 8 || keyP==27 || keyP==9 || (keyP>=17 && keyP<=19) || keyP==13 || (keyP>=91 && keyP<=93) || (keyP>=33 && keyP<=40) || keyP==38 || keyP==40 || keyP==45 || (keyP>=112 && keyP<=123) || keyP==145 ){
					evt.preventDefault();
				}
			});
			
			var temp = String.fromCharCode(key_code);
			getRequiredArrayswithMultipleSpace();	
			mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor = mockVar.typingGroup[mockVar.currentGrp].arrayTillCursor.split(" ").length;
			if(temp == mockVar.typingGroup[mockVar.currentGrp].word_string.charAt(mockVar.typingGroup[mockVar.currentGrp].cursorPos)){
				mockVar.typingGroup[mockVar.currentGrp].correctKeyStrokesCount++;
				if(key_code == 32){
					doCalculationOnSpace(a,b);
					$("#sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor).removeClass('highlight').addClass('highlight');
					scrollIntoViewDiv(document.getElementById("sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor),document.getElementById("row1"));
				}
			} else {
				mockVar.typingGroup[mockVar.currentGrp].errorKeyStrokesCount++;
				(window.event) ? event.preventDefault() : e.preventDefault();
			}
		}
	});
}
*/
function scrollIntoViewDiv(element, container) {
	try{
	  var containerTop = container.offsetTop;
	  var elemTop = element.offsetTop;
	  $(container).scrollTop(elemTop - containerTop - $(element).height());
	}catch(err){
		
	}
}

function getCaretForAlphaNumeric(el) {
	try{
		if (el.selectionStart) { 
			   return el.selectionStart; 
			} else if (document.selection) { 
			   el.focus(); 
			   var r = document.selection.createRange(); 
			   if (r == null) {  
			     return 0; 
			   } 
			   var re = el.createTextRange(), 
			   rc = re.duplicate(); 
			   re.moveToBookmark(r.getBookmark()); 
			   rc.setEndPoint('EndToStart', re); 
			   return rc.text.length; 
			}  
			return 0;
	}catch(e){
		
	}
}

function getRequiredArrayswithMultipleSpace(){
	try{
		mockVar.typingGroup[mockVar.currentGrp].totalChar = $("#typedAnswer").val();
		mockVar.typingGroup[mockVar.currentGrp].totalCharLength = mockVar.typingGroup[mockVar.currentGrp].totalChar.length;
		mockVar.typingGroup[mockVar.currentGrp].arrayTillCursor = $("#typedAnswer").val().substring(0,mockVar.typingGroup[mockVar.currentGrp].cursorPos);
		if($("#typedAnswer").val().length>0){
			mockVar.typingGroup[mockVar.currentGrp].totalWordsArea = mockVar.typingGroup[mockVar.currentGrp].totalChar.split(" ");
		}else{
			mockVar.typingGroup[mockVar.currentGrp].totalWordsArea = '';
		}
	}catch(e){
		
	}
}

function getRequiredArrayswithTrim(){
	try{
		mockVar.typingGroup[mockVar.currentGrp].totalChar = $("#typedAnswer").val().replace(/\s+/g, ' ');
		mockVar.typingGroup[mockVar.currentGrp].totalCharLength = mockVar.typingGroup[mockVar.currentGrp].totalChar.length;
		mockVar.typingGroup[mockVar.currentGrp].arrayTillCursor = mockVar.typingGroup[mockVar.currentGrp].totalChar.substring(0,mockVar.typingGroup[mockVar.currentGrp].cursorPos).replace(/\s+/g, ' ');
		mockVar.typingGroup[mockVar.currentGrp].totalWordsArea = mockVar.typingGroup[mockVar.currentGrp].totalChar.split(" ");
	}catch(e){
		
	}
}

function doCalculations(){
	try{
		var a =0, b=0;
		var arraySize = 0;
		/*if(mockVar.typingGroup[mockVar.currentGrp].totalWordsArea.length > mockVar.typingGroup[mockVar.currentGrp].words.length){
			arraySize = mockVar.typingGroup[mockVar.currentGrp].words.length;
		}else{
			arraySize = mockVar.typingGroup[mockVar.currentGrp].totalWordsArea.length;
		}*/
		arraySize = mockVar.typingGroup[mockVar.currentGrp].totalWordsArea.length;
		$('#row1 span').removeClass();
		for(var k=0;k<arraySize;k++){
			if(!(k==arraySize-1 && mockVar.typingGroup[mockVar.currentGrp].totalWordsArea[k]=='')){ 
				if(k!=mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor){
					if($.trim(mockVar.typingGroup[mockVar.currentGrp].totalWordsArea[k])==$.trim(mockVar.typingGroup[mockVar.currentGrp].words[k])){
						$("#sp"+k).removeClass().addClass('correct');
						mockVar.typingGroup[mockVar.currentGrp].correctWordArray[a++]=mockVar.typingGroup[mockVar.currentGrp].totalWordsArea[k];
					}else{
						$("#sp"+k).removeClass().addClass('wrong');
						mockVar.typingGroup[mockVar.currentGrp].wrongWordArray[b++]=mockVar.typingGroup[mockVar.currentGrp].totalWordsArea[k];
					}
				}
			}
		}
		mockVar.typingGroup[mockVar.currentGrp].correctWordCount = a;
		mockVar.typingGroup[mockVar.currentGrp].wrongWordCount = b;
		doHighlightNextWord();
	//	$("#correctWordCount").html(a);
	//	$("#wrongWordCount").html(b);
	}catch(e){
		
	}
}

function doCalculationOnSpace(a,b){
	try{
		var arraySize = 0;
		if(mockVar.typingGroup[mockVar.currentGrp].totalWordsArea.length > mockVar.typingGroup[mockVar.currentGrp].words.length){
			arraySize = mockVar.typingGroup[mockVar.currentGrp].words.length;
		}else{
			arraySize = mockVar.typingGroup[mockVar.currentGrp].totalWordsArea.length;
		}
		for(var k=0;k<arraySize;k++){
			if(k!=mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor){
				if($.trim(mockVar.typingGroup[mockVar.currentGrp].totalWordsArea[k])==$.trim(mockVar.typingGroup[mockVar.currentGrp].words[k])){
					$("#sp"+k).removeClass().addClass('correct');
					mockVar.typingGroup[mockVar.currentGrp].correctWordArray[a++]=mockVar.typingGroup[mockVar.currentGrp].totalWordsArea[k];
				}else{
					$("#sp"+k).removeClass().addClass('wrong');
					mockVar.typingGroup[mockVar.currentGrp].wrongWordArray[b++]=mockVar.typingGroup[mockVar.currentGrp].totalWordsArea[k];
				}
			}
		}
		mockVar.typingGroup[mockVar.currentGrp].correctWordCount = a;
		mockVar.typingGroup[mockVar.currentGrp].wrongWordCount = b;
		doHighlightNextWord();
	//	$("#correctWordCount").html(a);
	//	$("#wrongWordCount").html(b);
	}catch(e){
		
	}
}

function doHighlightNextWord(){
	try{
		$('#row1 span').removeClass('highlight');
		$("#sp"+(mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor)).removeClass('highlight').addClass('highlight');
	}catch(e){
		
	}
}

function doCalculationOnSpaceWithNoEdit(a,b){
	try{
		if($.trim(mockVar.typingGroup[mockVar.currentGrp].totalWordsArea[mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor]) == $.trim(mockVar.typingGroup[mockVar.currentGrp].words[mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor])){
			$("#sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor).removeClass().addClass('correct');
			mockVar.typingGroup[mockVar.currentGrp].correctWordArray[a++] = mockVar.typingGroup[mockVar.currentGrp].words[mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor];
		}else{
			$("#sp"+mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor).removeClass().addClass('wrong');
			mockVar.typingGroup[mockVar.currentGrp].wrongWordArray[b++] = mockVar.typingGroup[mockVar.currentGrp].words[mockVar.typingGroup[mockVar.currentGrp].wordsTillCursor];
		}
		$("#correctWordCount").html(a);
		$("#wrongWordCount").html(b);
	}catch(e){
		
	}
}

function setCursorPos(input, start, end) {
	try{
		if (arguments.length < 3) end = start;
	    if ("selectionStart" in input) {
	        setTimeout(function() {
	            input.selectionStart = start;
	            input.selectionEnd = start+1;
	        }, 1);
	    }
	    else if (input.createTextRange) {
	        var rng = input.createTextRange();
	        rng.moveStart("character", start);
	        rng.collapse();
	        rng.moveEnd("character", end - start);
	        rng.select();
	    }
	}catch(e){
		
	}
} 

function getWrongCharCount(){
	var wrongCharCount = 0;
	var wordsInArea = $("#typedAnswer").val().split(" ");
	for(var k=0;k<wordsInArea.length;k++){
		if($.trim(wordsInArea[k])!=$.trim(mockVar.typingGroup[mockVar.currentGrp].words[k])){
			wrongCharCount += wordsInArea[k].length;
		}
	}
	return wrongCharCount;
}

function getNetW(){
	return ((mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount/5) - getWrongCharCount());
}