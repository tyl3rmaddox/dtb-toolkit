  $(window).ready(function() {
    $('#xmlFile').on('change', handleUpload);
    //$('#myTextArea').spellAsYouType();
  });

  // Helpers
  var getCount = function getCount(xml, selector) {
    return xml.find(selector).length;
  };

  var elementExists = function elementExists(xml, selector) {
    return getCount(xml, selector) > 0;
  }

  var handleUpload = function handleUpload(e) {
    var files = e.target.files;
    var i, f;
    for ( i = 0, f = files[i]; i != files.length; ++i ) {
      var reader = new FileReader();
      var name = f.name;
      var count = 0;

      reader.onload = function(e) {
        var xml = $(e.target.result);
        var navCount = $('#navCount');
        var classCheck = $('#classCheck');
        var valueCheck = $('#valueCheck');



        var text = [];
        xml.find('text').each(function() {
          var $this = $(this);
          text.push($this.text());
        });

        function setNav(){
          for(i=0; i<text.length; i++){
            var navs = text[i];
            $(".navStorage").append(navs + '<br><br>');            
          }
        };

        setNav();

        

        $("#copyValues").click(function(){
          $("#myTextArea").select();
          document.execCommand('copy');
        });

        $( "#copyValues" ).click(function() {  
          $("#copyValues").val("Copied");
        });
      };

        // Spellcheck

      
      // Dropdown styling
      $(".dropdown-button").dropdown({
        inDuration: 550,
        outDuration: 225,
        constrainWidth: true, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        stopPropagation: false // Stops event propagation
  });
      reader.readAsBinaryString(f);
    }
  };