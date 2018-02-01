(function() {
  var delay = 10000; //Time in ms that it takes to load the page
  var currentCost = 0; //Cost of viewing the webpage (used in the "standard" billing type)
  var costTimeout; //Variable to hold the cost-increaser timeout

  $('[id^=nnsim]').remove(); //Remove any Net Neutrality Simulator elements incase this plugin has been run on the site before

  $('img').filter(':visible').each(function(){ //Select all visible images (otherwise, site may break if elements that should be hidden are shown)
    var currentel = $(this);
    currentel.hide(); //Hide current image
    setTimeout(function(){
      currentel.show(); //Show after a random delay
    }, delay + Math.random()*delay); //Delay up to 10 seconds after all non images are re-shown
  });

  $('div').filter(':visible').each(function(){ //Select all visible divs (otherwise, site may break if elements that should be hidden are shown)
    var currentel = $(this);
    currentel.hide(); //Hide current div
    setTimeout(function(){
      currentel.show(); //Show after a random delay
    }, Math.random()*delay); //Delay up to 10 seconds
  });

  //Create a modal asking if the user wants an unlimited plan
  function popup() {
    $('body').prepend('<div id="nnsim-modal" style="z-index: 999999; position: fixed; background-color: rgba(0,0,0,0.6); width:100%; height:100%; left: 0; top: 0;"></div>');     //Backdrop and div to hold the actual modal
    $('#nnsim-modal').append('<div id="nnsim-content" style="background-color: #f4f4f4; position: relative; width: 40%; margin: 15% auto; box-shadow:  0 4px 8px 0 rgba(0,0,0,0.4),0 6px 20px 0 rgba(0,0,0,0.38);"></div>'); //Modal itself
    $('#nnsim-content').append('<div id="nnsim-header" style=""><img src="https://www.underconsideration.com/brandnew/archives/verizon_2015_logo_detail.png"  height="35px" style="margin:10px; height:35px;"><span id="close" style="cursor: pointer; float: right; font-size:35px; margin-right:20px; margin-top:15px">&times</span></div>'); //Header containing the Verizon logo and the close button
    $('#nnsim-content').append('<div id="nnsim-body" style="padding-bottom:25px; background-color:white"><h3 style="margin-bottom:20px; text-align:center; font-family: Helvetica, sans-serif; font-weight:500; font-size:large">Purchase the <i>'+window.location.hostname+'</i> unlimited package:</h3></div>'); //Body of the modal containing the title
    $('#nnsim-body').append('<div id="nnsim-buttons" style="background-color: white; text-align:center"></div>'); //Div to hold the two buttons
    $('#nnsim-buttons').append('<div id="nnsim-standard" style="cursor: pointer; width:200px; margin:20px; background-color:#e5e5e5; border-radius:15px; padding:10px; font-weight:600; display:inline-block">Standard: $2.50/MB</div>'); //"Standard plan" button
    $('#nnsim-buttons').append('<div id="nnsim-unlimited" style="cursor: pointer; width:200px; margin:20px; background-color:#42a4f4; border-radius:15px; padding:10px; font-weight:600; display:inline-block">Unlimited: $10/month</div>'); //"Unlimited plan" button

    $('#close').click(function(){
      $('#nnsim-modal').remove(); //On-click to close the modal when the close button is clicked
      createCostWindow("standard"); //Assume "standard plan", so add the "cost window" popup
    });

    $('#nnsim-standard').click(function(){
      $('#nnsim-modal').remove(); //Close the modal
      createCostWindow("standard"); //Add the "cost window" popup
    });

    $('#nnsim-unlimited').click(function(){
      $('#nnsim-modal').remove(); //Close the modal
      createCostWindow("unlimited"); //Add the "cost window" popup
    });
  }

  setTimeout(popup, delay*2); //Wait until all elements are re-shown (20 seconds) before opening the modal

  function createCostWindow(type){ //Create the "cost window" popup either with a static $10 charge or an increasing charge
    $('body').prepend('<div id="nnsim-cost-window" style="z-index: 999999; position: fixed; background-color: white; right: 0; bottom: 0; width: 25%; height: 15%; border: 1px solid black; text-align:center; font-size: large; font-weight: 700">Current bill:</div>'); //Create the actual popup with a title
    if(type==="standard") //Increases the price over time
    {
      $('#nnsim-cost-window').append('<p id="nnsim-cost" style="color: red; margin: 5%; font-size: xx-large; font-weight: 1000">$'+currentCost.toFixed(2)+'</p>'); //Starts at $0.00
      costTimeout = setTimeout(updateCostWindow, Math.random()*2000); //Wait for up to two seconds before updating the cost
    }
    else if(type==="unlimited")
    {
      $('#nnsim-cost-window').append('<p id="nnsim-cost" style="color: red; margin: 5%; font-size: xx-large; font-weight: 1000">$10.00</p>'); //Set a static charge of $10.00
    }
  }

  function updateCostWindow(){
    currentCost += Math.random()*0.08; //Increase the cost by up to $0.08 at a time
    $('#nnsim-cost').text('$'+currentCost.toFixed(2)); //Overwrite the previous cost with the new cost
    costTimeout = setTimeout(updateCostWindow, Math.random()*2000); //Wait up to another 2 seconds before updating the cost again
  }

})();
