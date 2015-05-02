// Handle events the old-fashioned way 
var button = document.getElementById('SubmitFirst');
if(document.addEventListener){
	button.addEventListener('click', function() {alert('Clicked Button');}, false); // fro most browsers that support .addEventListener
}
else{
	button.attachEvent('onclick', function() {alert('Clicked IE Button'); }); // IE handles it differently 
}


/********************** Handling Events  http://james.padolsey.com/jquery/ ********************/
// jQuery event shortcuts:  
// .click()
// .blur()
// .focus()
// .dblclick()
// .mousedown()
// .mouseup()
// .mouseover()
// .keydown()
// .keypress()
// reference http://api.jquery.com/category/events/

//**//**//** Every Event handling function receives an event object, which contains many properties and methods

// 1. pageX, pageY -> mouse position relative to the top left corner of the page display area (not the entire browser)
	$( document ).on( "mousemove", function( event ) {
		  $( "#log" ).text( "pageX: " + event.pageX + ", pageY: " + event.pageY );
	}); // Note! 'mousemove' -> is called Event, 'function()' -> is called Handler 

// 2. type -> The type of the event(e.g. "click")
	$( "a" ).click(function( event ) {
	  alert( event.type ); // "click"
	});

// 3. which -> The button or key that was pressed. The 'event.which' property normalizes 'event.keyCode' and 'event.charCode'. It is recommended to watch 'event.which' for keyboard key input. 'event.which' also normalizes button presses (mousedown and mouseupevents), reporting 1 for left button, 2 for middle, and 3 for right. Use 'event.which' instead of 'event.button'.
/*	<input id="whichkey" value="type something">
	<div id="log"></div>
*/
	<script>
	$( "#whichkey" ).on( "keydown", function( event ) {
	  $( "#log" ).html( event.type + ": " +  event.which );
	});
	</script>

// 4. data -> Any data that was passed in when the event was bound. For example:
	//Example 1:
	// Event setup using the `.on()` method with data
	$( "input" ).on(
	    "change",
	    { foo: "bar" }, // Associate data with event binding
	    function( eventObject ) {
	        console.log("An input value has changed! ", eventObject.data.foo);
	    }
	);

	// Example 2:
/*	<button> 0 </button>
	<button> 1 </button>
	<button> 2 </button>
	<button> 3 </button>
	<button> 4 </button>
	<div id="log"></div>
*/	 
	<script>
	var logDiv = $( "#log" );
	for ( var i = 0; i < 5; i++ ) {
	  $( "button" ).eq( i ).on( "click", { value: i }, function( event ) {
	    var msgs = [
	      "button = " + $( this ).index(),
	      "event.data.value = " + event.data.value,
	      "i = " + i
	    ];
	    logDiv.append( msgs.join( ", " ) + "<br>" );
	  });
	}
	</script>

// 5. target -> The DOM element that initiated the event. The 'target' property can be the 'element' that registered for the event or a descendant of it. It is often useful to compare 'event.target' to 'this' in order to determine if the event is being handled due to event bubbling. This property is very useful in event delegation, when events bubble.
/*	<ul>
	  <li>item 1
	    <ul>
	      <li>sub item 1-a</li>
	      <li>sub item 1-b</li>
	    </ul>
	  </li>
	  <li>item 2
	    <ul>
	      <li>sub item 2-a</li>
	      <li>sub item 2-b</li>
	    </ul>
	  </li>
	</ul>
*/  
	<script>
	function handler( event ) {
	  var target = $( event.target );
	  if ( target.is( "li" ) ) {
	    target.children().toggle();
	  }
	}
	$( "ul" ).click( handler ).find( "ul" ).hide();
	</script>

// 6. namespace -> The namespace specified when the event was triggered. 
// 7. timeStamp -> The difference in milliseconds between the time the browser created the event and January 1, 1970. 
// 8. preventDefault() 	-> Prevent the default action of the event (e.g. following a link).
// 9. link stopPropagation() -> Prevents the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.

	//**//**////**//**////**//**////**//**////**//**////**//**// Handling Click Events //**//**////**//**////**//**////**//**////**//**////**//**//
//1. Example: .click(handler(eventObject)) is used to listen for a click event or trigger a click event on a element  
	$('#myID').click(function(){
		alert('The element myID was clicked'); 
	});

//2. Example: 
// Raising a click event from within another function: 
	$('#otherID').click(function(){
		$('#myID').click();
	});  // This would fire when the element 'otherID' was clicked and raise the click event for 'myID'. So click in other words is not just for receiving the data, but you can trigger these events on other objects if that fits your particular application. 

//3. Another traditional way of .click() is adding 'onlick' into the HTML and create an associated function in the script 
//<script type="text/javascript">  // placed in the header of HTML
	function testButton(){
		alert('used .onclick() inside HTML');
	}
//</script> 
// <td class="testButton"><input id="testButton" onclick="testButton()" value="Button" type="button"></td> // its HTMl document 

//4.  Better way to maintain when I have my own function in jQuery
	$(document).ready(function(){
		wireEvents();
	});
	function wireEvents(){
		$("#idButton").click(function() {
			alert('Clicked Button idButton');
		});
	}
// // NO onclick="testButton"() in the HTML needed
// <td class="testButton"><input id="testButton" value="Button" type="button"></td> // its HTMl document 

//5. Combination of two input button elements value updating text of another div element 
	
	$(document).ready(function(){
		fireEvent();
	});
	function fireEvent(){ // custom function
		$('#mergeButton').click(function(){  // once it is clicked 
			var firstVar = $('#SubmitFirst').val();
			var secondVar = $('#otherID').val();
			$('#divOutput').text(firstVar + ' ' + secondVar);
		});
	}

// 6. Combination of two input value will update text of another div element 
	$(document).ready(function(){
			buttonEvent();
	});
	function buttonEvent(){
		$('#button').click(function(){  // make sure type="button" not type="submit" in order output concatenated text
			var firstInputVar = $('#userName').val();
			var secondInputVar = $('#password').val();
			$('#fireButton').text(firstInputVar + ' ' + secondInputVar);
		});
	}

//**//**////**//**////**//**////**//**////**//**////**//**// Handling Change Events //**//**////**//**////**//**////**//**////**//**////**//**//
// 1. Example: change event with select option
$('#selectState').change(function() {
	alert('You selected' + " " + $(this).val());
});

// 2. Example: Change event with input controls or textareas 
	$('.changeEvent').change(function() {
		alert($(this).val());
		$(this).addClass('Highlight');
	});

//**//**////**//**////**//**////**//**////**//**////**//**// Mouse Events //**//**////**//**////**//**////**//**////**//**////**//**//
// 1. Example: sudden idea 
/*
	$('#mouseEvent').mouseenter(function() {
		$(this).css({'background-color': 'green', 'padding': '5px'});
		$(this).mouseleave(function(event) {
			$(this).css({'background-color': 'red', 'padding': '5px'});
			$(this).fadeOut(9000);
		});
	});

// 2. Chaining events
	$('#mouseEventChaining').mouseenter(function() {
		$(this).toggleClass('Highlight');
		$(this).css('cursor', 'pointer');    // can be used this method for hyperlinks 
	})  // don't put semicolon here otherwise it will not work
	.mouseleave(function() {
		$(this).toggleClass('Highlight');
	});
*/
// OR I could create a function. Comment previous example to see this functioning because of targeting the same ID this will not work. 
$('#mouseEventChaining').mouseenter(function() {
		Toggle(this);
		$(this).css('cursor', 'pointer');    // can be used this method for hyperlinks 
	})  // don't put semicolon here otherwise it will not work
	.mouseleave(function() {
		Toggle(this);
	})
	.mouseup(function(event) {
		// alert(event.target.attr('id')); // I'll fire an error because it's the raw DOM object HTML div element. Run alert(event.target); to see it. Use jQuery wrapper 
		// alert($(event.target).attr('id'));  wrapped with jQuery wrapper it to get div's ID. Uncomment it to see how it works 
		$(this).text('X: ' + event.pageX + ' and Y: ' + event.pageY);
	});
	function Toggle(div){
			$(div).toggleClass('Highlight');
	}

//**//**////**//**////**//**////**//**////**//**////**//**// Binding to Events //**//**////**//**////**//**////**//**////**//**////**//**//
// bind() function  wires up multiple events with a single statement to a particular callback function. 
// Using on() supported with jQuery 1.7 and older versions use 'bind'. check http://james.padolsey.com/jquery/  to see different versions of jQuery source. Functions delegation to 'on'
// .on(eventType, handler(eventObject)) attaches a handler to an event for the selected element(s)
	// Example:

	$('#MyDiv').on('click',function(){
		//handle click event
	});

//Binding Multiple Events with on()	
// .on() allows multiple events to be bound to one or more elements 
//  Event names to bind are separated with a space: 
	$('#MyDiv').on('mouseenter mouseleave', function(){
		$(this).toggleClass('entered');
	});
	

// Example: bind() and on()
$('#bindEvent').on('mouseenter mouseleave mouseup', function(e) { //.on() up to date version of .bind()
	$(this).toggleClass('Highlight');
	$(this).css('cursor', 'pointer');
	if(e.type == 'mouseup'){
		$(this).text('X: ' + e.pageX + 'Y: ' + e.pageY);
	}
});

// Using off(). .off() is newer version of unbind 
// .off(event) is used to remove a handler previously bound to an element:
	// Example:
	$('#test').click(handler); // can be unbound using
	$('#test').off();  //that'll turn off not only the click but any other events that are attached to that particular DOM element

	// Specific event can also be targeted using off():
	$('#test').off('click');

// Example: 
	$('#bindEvent').on('mouseenter mouseleave mouseup', function(e) { //.on() modern way instead of .bind()
	$(this).toggleClass('Highlight');
	$(this).css('cursor', 'pointer');
	if(e.type == 'mouseup'){
		$(this).text('X: ' + e.pageX + 'Y: ' + e.pageY);
		}
	});
	$('#bindEvent').off('mouseup'); // turns off just 'mouseup'
	// $('#bindEvent').off(); // turns off everything 

//**//**////**//**////**//**////**//**////**//**//// live(), delegate() and on() Functions ////**//**////**//**////**//**////**//**////**//**//
//live(), delegate(), and on() functions allow new DOM elements to automatically be "attached" to an event handler
// Allow children to be added to a container without explicitly attaching an event handler to each child
// .live() deprecated in jQuery 1.9 
//		$('.someClass').live('click', someFunction);  // We have one function in memory that acts the event handler, it will be attached to the document object and now when any child that has someClass is clicked in this case it will bubble up. 
	// <span class="someClass"/>
	// <p class="someClass"/>
	// <div class="someClass"/>


// Stop 'live()' event handling using die():
	 	// $('.someClass').die('click', someFunction);  // it will detach the click and the event handler from the document object. 

// Newer Version of .live() is .delegate() it was added in jQuery 1.4
// A context object (#Divs in the sample below) handles events by default rather than the document object. Works even when new objects are added into the DOM: 
		// $('#Divs').delegate('div', 'click', someFunction); // the parent handles bubble up events and then processes those events. So it works as a new children are added into its container and will automatically detect what child was clicked and if it is appropriate, will handle it. #Divs is our context container (parent). We are going to delegate that when any child that's a 'div' is clicked, call the function (someFunction) here. The difference is when any of those (.someClass) are clicked they are not going to bubble up all the way up to the document it is actually going up to our context object ('#Divs' - parent).
		// Stop delegate event handling using .udelegate()


// The .on() Function 
// The .on() function is a new replacement for the following:
	// .bind()
	// .delegate()
	// .live()
// now we have one API to rule them all and it makes it much easier to just go with one thing 

// $('div').on('click', function(){
	// alert('Clicked button!');
// });

// Using .on() with Child Objects 
	// The .on() function can be used in place of .live() and .delegate()   Works when new objects are added into the DOM:
	// It can used for simple things but it can also replace the whole .live() and .delegate() concept. Example: 
		$("#MyTable tbody").on('click', 'tr', function(event){
			alert('Row was clicked and bubbled up');
		})
		// So in this example we are going to say to find this #MyTable and find the 'tbody' under it 'on' a click of a 'tr', bubble up to the 'tbody' and this function will now be attached to the 'tbody'.

// Using .on() with a Map
	// Multiple events and handlers can be defined in .on() using a "map":
		$("#MyTable tr").on({
			mouseenter: function(){
				$(this).addClass("over");
			}, 
			mouseleave: function(){
				$(this).removeCalss("out");
			}
		});

// In this demonstration we're going to take a look at how we can use the .on() function to handle events without actually attaching an event handler to every single DOM element in our target. 
	//	Example: sudden idea
		$(document).ready(function(){
			$('#onEvent tr').on({
				mouseenter: function(){
					$(this).css('background-color', 'crimson');
				},
				mouseleave: function(){
					$(this).css('background-color', 'transparent');
				}
			});
		});

	// Example: 
		$(document).ready(function(){
			$('#onEvent td').on('click', function(){
				alert($(this).html()); // will alert names of each cell
			});
		});

		// Example: 
		$(document).ready(function(){
			$('#onEvent tr').on('click', function(){
				alert($(this).html()); // will alert names of each row
			});
		});

	// Example: 
		$(document).ready(function(){
			$('#onEvent td').on('click', function(){
				alert($(this).text()); // will alert names of each cell in text
			});
		})	

	// Example: getting plain text of each cell 
	$(document).ready(function(){
			$('#onEvent tbody').on('click', 'tr', function(){ // click on 'tr' or 'td'
				alert($(this).text()); // 'tbody' is added by browser
			});
		})// there is no event actually attached to the 'td', it's to the actual 'tbody' open up console to see it

	// Example: on button click we will be adding a new row into our table
	$(document).ready(function(){
		var tbodyVar = $('#onEvent tbody'); //I forgot to add $ here before parenthesis and it kept giving me an error 'tbody.on' is not a function
		$('#addRow').on('click', function(){
			tbodyVar.append('<tr><td>John</td><td>Doe</td></tr>')
		});

		tbodyVar.on('click', 'td', function(){ // was getting an error on the console because forgot to put $ before ('#onEvent tbody') above when assigning tbodyVar
			alert($(this).text());
		});
	});	
			

//**//**////**//**////**//**////**//**////**//**////**//**// Handling Hover Events //**//**////**//**////**//**////**//**////**//**////**//**//
// there are different ways to do it with jQuery shortcut functions and bind which were mentioned earlier but there is actually built-in 'hover' that we can use and it makes it really easy to handle 'mouseenter' and 'mouseout' with a minimal amount of code. 
// Using bind() with this example  just equivalent for hover()
$('#MyDiv').bind('mouseenter mouseleave mouseup', function(element){
	$(this).toggleClass('Highlight');
	$(this).css('cursor', 'pointer');
	if(element.type == 'mouseup')
		$(this).text('X: ' + element.pageX + 'Y: ' + element.pageY);
})

// introducing hover(): 
	$(selector).hover(handlerIn, handlerOut) 
	// handlerIn is equivalent to mouseenter and handlerOut is equivalent to mouseleave 
// Example: highlight #target on mouseenter and sets it back to white on mouseleave 
	$(document).ready(function(){
		$('#target').hover(function() {
				$(this).css("background-color", '#00FF99');
			}, function() {
				$(this).css('background-color', '#FFFFFF');
			});
		}); // as I see and intellisense shows that hover() function comes with two set of functions 
// and an idea came to my mind while I was learning mouseenter and mouseleave - the same concept of the code above 
		//	Example: sudden idea
		$(document).ready(function(){
			$('#onEvent tr').on({
				mouseenter: function(){
					$(this).css('background-color', 'crimson');
				},
				mouseleave: function(){ // mouseout 
					$(this).css('background-color', 'transparent');
				}
			});
		});

// Another way of using hover() without explicitly writing event with function 
		$(document).ready(function(){
			$('#onEvent tr').hover(
				//mouseenter
				function() { //targeting table and its rows will make each row to be highlighted 
				$(this).css({'cursor': 'pointer', 'background-color': 'orange'});
			}, 
				//mouseleave
				function() {
				$(this).css('background-color', 'white');
			});
		});

// the same concept can be reached with the toggleCalss() function 
		$(document).ready(function(){  //The best way to do a simple hover
			$('#onEvent tr').hover(function(){ // 'hover' is obviously the  'mouseenter' and 'mouseleave' 
				$(this).toggleClass('over'); //don't put . period before class name 
			});
		});

// toggleClass combined with hover() provides the ultimate in ease of use and flexibility so here's an example of doing that...
 // Another option is 
 $(selector).hover(handlerOut) // Fires the same handler from 'mouseenter' and 'mouseleave' events. Used with jQuery's 'toggle()' methods: 
 //Example: 
 $('p.green').hover(function(){ // one handler(function) which is the in(mouseenter) and the out(mouseleave) 
 	$(this).toggleClass('over'); // class 'over' is created in style css filen
 }); // This code will toggle the class applied to a paragraph element 
