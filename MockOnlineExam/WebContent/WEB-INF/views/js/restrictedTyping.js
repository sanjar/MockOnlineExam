function loadTypingContentRestricted(){
	mockVar.typingGroup[mockVar.currentGrp].typingTextLength = mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping.length;
	mockVar.typingGroup[mockVar.currentGrp].coloredTextForTyping = mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping.substring(0,mockVar.typingGroup[mockVar.currentGrp].coloredCursorPosition).replace(/\&/g,'&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;')+'<FONT id="highlightedLtr" COLOR="red"><U>'+mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping.substring(mockVar.typingGroup[mockVar.currentGrp].coloredCursorPosition, mockVar.typingGroup[mockVar.currentGrp].coloredCursorPosition+mockVar.typingGroup[mockVar.currentGrp].typedTextCount)+'</U></FONT>'+mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping.substring(mockVar.typingGroup[mockVar.currentGrp].coloredCursorPosition+mockVar.typingGroup[mockVar.currentGrp].typedTextCount,mockVar.typingGroup[mockVar.currentGrp].typingTextLength).replace(/\&/g,'&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;');
	var str = '<br/><center><div id="row1" style="">'+mockVar.typingGroup[mockVar.currentGrp].coloredTextForTyping+'</div><br/><div class="textAreaDiv"><textarea spellcheck="false" id="typedAnswer" onkeypress=compareText(event) onkeyup=updateText() oninput="javascript:checkPasteFF();" onselectstart="return false;" onkeydown="calculateBackspaceCount(event)">'+iOAP.sections[iOAP.curSection][iOAP.viewLang[iOAP.curSection][iOAP.curQues].langID][iOAP.curQues].answer+'</textarea></div></center>';
	$("#typedAnswer").focus();
	$("#totalKeyStrokesCount").html(mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount.toString());
	$("#backSpaceCount").html(mockVar.typingGroup[mockVar.currentGrp].backSpaceCount.toString());
	$("#errorCountValue").html(mockVar.typingGroup[mockVar.currentGrp].restrictedErrors.toString());
	return str;
}

function calculateBackspaceCount(e){
	var keyCodeObject;
	if (navigator.appName != 'Netscape') {
		keyCodeObject = window.event.keyCode;
	}
	else {
		keyCodeObject = e.which;
	}
	$(document).unbind('keydown').bind('keydown', function 	(event) {
		if(keyCodeObject == 8){
			mockVar.typingGroup[mockVar.currentGrp].backSpaceCount++;
		}else if(keyCodeObject == 9){
			(window.event) ? event.preventDefault() : e.preventDefault();
		}
	});
	mockVar.typingGroup[mockVar.currentGrp].charCount = $("#typedAnswer").val().length;
	$("#backSpaceCount").html(mockVar.typingGroup[mockVar.currentGrp].backSpaceCount.toString());
	$("#errorCountValue").html(mockVar.typingGroup[mockVar.currentGrp].restrictedErrors.toString());
}
	
function compareText(event) {
	var keyCodeObject;
	var textfromKeyCode;
	if (navigator.appName != 'Netscape') {
		keyCodeObject = window.event.keyCode;
	}
	else {
		keyCodeObject = event.which;
	}
	/*if(!(keyCodeObject==16 || keyCodeObject==20)){
		mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount++;
	}*/
	mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount = $("#typedAnswer").val().length;
	textfromKeyCode = String.fromCharCode(keyCodeObject);
	/*if (mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping.substr(mockVar.typingGroup[mockVar.currentGrp].restrictedPosition,4)=="<br>" || mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping.substr(mockVar.typingGroup[mockVar.currentGrp].restrictedPosition,5)=="<br/>" || mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping.substr(mockVar.typingGroup[mockVar.currentGrp].restrictedPosition,5)=="</br>") {
		if (keyCodeObject != 13) {
			mockVar.typingGroup[mockVar.currentGrp].restrictedErrors = mockVar.typingGroup[mockVar.currentGrp].restrictedErrors + 1;
		}
		else {
			if (mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping.substr(mockVar.typingGroup[mockVar.currentGrp].restrictedPosition,4)=="<br>")
				mockVar.typingGroup[mockVar.currentGrp].restrictedPosition = mockVar.typingGroup[mockVar.currentGrp].restrictedPosition + 4;
			else if (mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping.substr(mockVar.typingGroup[mockVar.currentGrp].restrictedPosition,5)=="<br/>" || mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping.substr(mockVar.typingGroup[mockVar.currentGrp].restrictedPosition,5)=="</br>")
				mockVar.typingGroup[mockVar.currentGrp].restrictedPosition = mockVar.typingGroup[mockVar.currentGrp].restrictedPosition + 5;
			
			mockVar.typingGroup[mockVar.currentGrp].typedTextCount=mockVar.typingGroup[mockVar.currentGrp].highlightTextChar;
			mockVar.typingGroup[mockVar.currentGrp].finalLine=1;
			mockVar.typingGroup[mockVar.currentGrp].coloredCursorPosition = mockVar.typingGroup[mockVar.currentGrp].restrictedPosition;
			mockVar.typingGroup[mockVar.currentGrp].coloredTextForTyping = mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping.substring(0,mockVar.typingGroup[mockVar.currentGrp].coloredCursorPosition)+'<FONT id="highlightedLtr" COLOR="red"><U>'+mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping.substring(mockVar.typingGroup[mockVar.currentGrp].coloredCursorPosition, mockVar.typingGroup[mockVar.currentGrp].coloredCursorPosition + mockVar.typingGroup[mockVar.currentGrp].typedTextCount)+'</FONT></U>'+mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping.substring(mockVar.typingGroup[mockVar.currentGrp].coloredCursorPosition + mockVar.typingGroup[mockVar.currentGrp].typedTextCount,mockVar.typingGroup[mockVar.currentGrp].typingTextLength);
			$("#row1").html(mockVar.typingGroup[mockVar.currentGrp].coloredTextForTyping);
		}
	}
	else {*/
		if (textfromKeyCode!=mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping.substr(mockVar.typingGroup[mockVar.currentGrp].restrictedPosition,1)) {
			mockVar.typingGroup[mockVar.currentGrp].restrictedErrors=mockVar.typingGroup[mockVar.currentGrp].restrictedErrors+1;
		}
		else {
			mockVar.typingGroup[mockVar.currentGrp].restrictedPosition=mockVar.typingGroup[mockVar.currentGrp].restrictedPosition+1;
		/*	if(mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping.substring(mockVar.typingGroup[mockVar.currentGrp].coloredCursorPosition+mockVar.typingGroup[mockVar.currentGrp].highlightTextChar,mockVar.typingGroup[mockVar.currentGrp].coloredCursorPosition+mockVar.typingGroup[mockVar.currentGrp].highlightTextChar+4)=='<br>') {
				mockVar.typingGroup[mockVar.currentGrp].typedTextCount=mockVar.typingGroup[mockVar.currentGrp].highlightTextChar+3;
				mockVar.typingGroup[mockVar.currentGrp].finalLine=1;
			}
			else if(mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping.substring(mockVar.typingGroup[mockVar.currentGrp].coloredCursorPosition+mockVar.typingGroup[mockVar.currentGrp].highlightTextChar,mockVar.typingGroup[mockVar.currentGrp].coloredCursorPosition+mockVar.typingGroup[mockVar.currentGrp].highlightTextChar+5)=='<br/>' || mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping.substring(mockVar.typingGroup[mockVar.currentGrp].coloredCursorPosition+mockVar.typingGroup[mockVar.currentGrp].highlightTextChar,mockVar.typingGroup[mockVar.currentGrp].coloredCursorPosition+mockVar.typingGroup[mockVar.currentGrp].highlightTextChar+5)=='</br>') {
				mockVar.typingGroup[mockVar.currentGrp].typedTextCount=mockVar.typingGroup[mockVar.currentGrp].highlightTextChar+4;
				mockVar.typingGroup[mockVar.currentGrp].finalLine=1;
			}
			else {
				if (mockVar.typingGroup[mockVar.currentGrp].finalLine==1) {
					if(mockVar.typingGroup[mockVar.currentGrp].typedTextCount>4)
						mockVar.typingGroup[mockVar.currentGrp].typedTextCount--;
				}
				else {
					if(mockVar.typingGroup[mockVar.currentGrp].typedTextCount>mockVar.typingGroup[mockVar.currentGrp].highlightTextChar)
						mockVar.typingGroup[mockVar.currentGrp].typedTextCount--;
				}
			//}*/
			mockVar.typingGroup[mockVar.currentGrp].coloredCursorPosition=mockVar.typingGroup[mockVar.currentGrp].restrictedPosition;
			mockVar.typingGroup[mockVar.currentGrp].coloredTextForTyping=mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping.substring(0,mockVar.typingGroup[mockVar.currentGrp].coloredCursorPosition).replace(/\&/g,'&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;')+'<FONT id="highlightedLtr" COLOR="red"><U>'+mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping.substring(mockVar.typingGroup[mockVar.currentGrp].coloredCursorPosition, mockVar.typingGroup[mockVar.currentGrp].coloredCursorPosition+mockVar.typingGroup[mockVar.currentGrp].typedTextCount)+'</FONT></U>'+mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping.substring(mockVar.typingGroup[mockVar.currentGrp].coloredCursorPosition+mockVar.typingGroup[mockVar.currentGrp].typedTextCount,mockVar.typingGroup[mockVar.currentGrp].typingTextLength).replace(/\&/g,'&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;');
			$("#row1").html(mockVar.typingGroup[mockVar.currentGrp].coloredTextForTyping);
		}
	//}
	if (mockVar.typingGroup[mockVar.currentGrp].typingTextLength+1==mockVar.typingGroup[mockVar.currentGrp].restrictedPosition) {
		(window.event) ? event.preventDefault() : e.preventDefault();
		//var duration = Math.abs((startTime.getTime() - new Date().getTime())/1000);
		//window.location.href="display.html?mockVar.typingGroup[mockVar.currentGrp].restrictedErrors="+mockVar.typingGroup[mockVar.currentGrp].restrictedErrors+"&textLength="+mockVar.typingGroup[mockVar.currentGrp].typingTextLength+"&duration="+duration;
	}
}

function updateText(){
	text_ok=mockVar.typingGroup[mockVar.currentGrp].textForRestrictedTyping.substr(0,mockVar.typingGroup[mockVar.currentGrp].restrictedPosition);
	$("#typedAnswer").val(text_ok);
	mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount = $("#typedAnswer").val().length;
	if($('#row1').text().length == $('#typedAnswer').val().length)
	$('#finalTypingSub').removeAttr('disabled');
	$("#totalKeyStrokesCount").html(mockVar.typingGroup[mockVar.currentGrp].keyStrokesCount.toString());
	scrollIntoViewDiv(document.getElementById('highlightedLtr'),document.getElementById("row1"));
}

function checkPasteFF(methodToCall) {
	newCharCount = $("#typedAnswer").val().length;
	oldCharCount = mockVar.typingGroup[mockVar.currentGrp].charCount;
	mockVar.typingGroup[mockVar.currentGrp].charCount = newCharCount;
	if(newCharCount - oldCharCount > 2) {
		mockVar.typingGroup[mockVar.currentGrp].paste_utilitzat=1;
		alert("Mal Practice");
	}
}
