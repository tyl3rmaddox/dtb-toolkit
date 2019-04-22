  $(window).ready(function() {
    $('#ncxXmlFile').on('change', handleUpload);
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
      var foundLanguage = false;

      reader.onload = function(e) {
        var xml = $(e.target.result);
        var navCount = $('#navCount');
        var classCheck = $('#classCheck');
        var valueCheck = $('#valueCheck');
        var ncxCount = 0

        docTitleNcx = xml[2].getElementsByTagName("doctitle")[0].getElementsByTagName("text")[0].innerHTML;
        docAuthorNcx = xml[2].getElementsByTagName("docauthor")[0].getElementsByTagName("text")[0].innerHTML;


        
        var navPointCount = getCount(xml, 'navPoint') + getCount(xml, '[src*="smil#np"]');
        navpoints.append('There are ' + navPointCount + ' nav points');

        var titleClassFound = elementExists(xml, '[class="title/author"]');
        if ( titleClassFound === true ) {
          classCheck.append(' &#10004; <i>title/author</i> class exists<br />');
          ncxCount++;
        }
        else {
          classCheck.append('<span style="color: red;">title/author class not found!</span><br />');
        }
		
        var titleClassFound = elementExists(xml, '[class="annotation"]');
        if ( titleClassFound === true ) {
          classCheck.append(' &#10004; <i>annotation</i> class exists<br />');
          ncxCount++;
        }
        else {
          classCheck.append('<span style="color: red;">annotation class not found!</span><br />');
        }
		
        var titleClassFound = elementExists(xml, '[class="close"]');
        if ( titleClassFound === true ) {
          classCheck.append(' &#10004; <i>close</i> class exists<br />');
          ncxCount++;
        }
        else {
          classCheck.append('<span style="color: red;">close class not found!</span><br />');
        }

        var foundAnnotation = true;
        // xml.find('text').each(function() {
        //   if ( $(this).text().indexOf('Library of Congress Annotation') >= 0 ) {
        //     foundAnnotation = true;
        //     return;
        //   }
        // });

        if ( foundAnnotation == true ) {
          valueCheck.append(' &#10004; \"Library of Congress Annotation\" found in <i>annotation</i> class <br />');
          ncxCount++;
        }
        else {
          valueCheck.append('<span style="color: red;">\"Library of Congress Annotation\"" not found in annotation</span><br />');
        }        

        var foundEndOf = false;
        xml.find('text').each(function() {
          if ( $(this).text().indexOf('End of') >= 0 ) {
            foundEndOf = true;
            return;
          }
        });

        if ( foundEndOf == true ) {
          valueCheck.append(' &#10004; \"End of...\" found in <i>close</i> class <br />');
          ncxCount++;
        }
        else {
          valueCheck.append('<span style="color: red;">- \'End of\' not found in <i>close</i> class</span><br />');
        }

        if (ncxCount == 5) {
          $(".valResults").get(0).style.setProperty( "--box-shadow-color", "blue" )
        }
        else {
          $(".valResults").get(0).style.setProperty( "--box-shadow-color", "red" )
        }

        var text = [];
        xml.find('text').each(function() {
          var $this = $(this);
          text.push($this.text());
        });
 
        $('#myTextArea').text(text.join('\n\n'));
        $('#myTextArea').focus();


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