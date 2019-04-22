  $(window).ready(function() {
    $('#opfFile').on('change', handleUpload1);
    //$('#myTextArea').spellAsYouType();
  });

  // Helpers
  var getCount = function getCount(xml, selector) {
    return xml.find(selector).length;
  };

  var elementExists = function elementExists(xml, selector) {
    return getCount(xml, selector) > 0;
  }

  var handleUpload1 = function handleUpload1(e) {
    var files1 = e.target.files;
    var i, f;
    for ( i = 0, f = files1[i]; i != files1.length; ++i ) {
      var reader = new FileReader();
      var name = f.name;
      var opfCount = 0;

      // var docAuthorOpf = 

      reader.onload = function(e) {
        var xml = $(e.target.result);
        var narrElement = document.getElementById("i_narr_id");
        var nameCheck = $('#nameCheck');
        var langCheck = $('#langCheck');
        var crossCheck = $('#crossCheck')
        // var narrators = ['[content="Fox, Jill"]','[content="Fox, Jack"]','[content="Willis, Teresa"]','[content="Conkin, Theresa"]','[content="Maupin, Abigail"]','[content="Maupin, Gregory"]','[content="Burton, Bill"]','[content="Pyle, Andy"]','[content="Jones, Erin"]','[content="Volz, Alec"]','[content="Bernson, Barry"]','[content="Buzzard, Madelyn"]','[content="Dines, Carol"]','[content="Duvall, Suzanne"]','[content="Dukin, Kerry"]','[content="Foushee, Ray"]','[content="Duvall, Suzanne"]','[content="Fox, Todd"]','[content="Harpenau, Lou"]','[content="Hubbard, Jennifer"]','[content="Huffman, Jon"]','[content="Reynolds, Scott"]','[content="Walters, Nancy Lynne"]','[content="Tipton, Gary"]']
        var langCount = 0;
        var narrCount = 0;
        var crossCount = 0;
        var narrators = new Array();

        for (i = 0; i < narrElement.children.length; i++) {
            narrators.push(narrElement.children[i].text);
        };

        var docTitleOpf = xml[2].getElementsByTagName("metadata")[0].getElementsByTagName("dc-metadata")[0].getElementsByTagName("dc:title")[0].innerHTML;
        if (docTitleOpf === docTitleNcx){
          crossCheck.append('&#10004; OPF & NCX titles match: ' + docTitleNcx.fontcolor("blue") + '<br />' );
          crossCount++
        }
        if (docTitleOpf !== docTitleNcx) {
          crossCheck.append('&#10006; Something is wrong with your title. <br>OPF (PAR): ' + docTitleOpf.fontcolor("red") + '<br> NCX (You): ' + docTitleNcx.fontcolor("red") + '<br>' );
        }

        var docAuthorOpf = xml[2].getElementsByTagName("metadata")[0].getElementsByTagName("dc-metadata")[0].getElementsByTagName("dc:creator")[0].innerHTML;

        if (docAuthorOpf === docAuthorNcx){
          crossCheck.append('&#10004; OPF & NCX authors match: ' + docAuthorNcx.fontcolor("blue") );
          crossCount++
        }
        if (docAuthorOpf !== docAuthorNcx) {
          crossCheck.append('<br> &#10068;  Is this okay? ' + docAuthorNcx.fontcolor("red")  + '<br>May have failed for multi-author or edited by..' );
        }

        var currentLanguage = xml[2].getElementsByTagName("metadata")[0].getElementsByTagName("dc-metadata")[0].getElementsByTagName("dc:language")[0].innerHTML

        if (currentLanguage === 'EN') {
          langCheck.append(' &#10004; Your language is ' + currentLanguage.fontcolor("blue"));
          langCount++;
        }
        else {
          langCheck.append('<span style="color: red;">Your current language - ' + currentLanguage + ' is not correct</span><br />');
        }

        var myNarr = xml[2].children["0"].childNodes[3].childNodes[17].content;
        console.log('Current Narrator: ' + myNarr)
        if (narrators.indexOf(myNarr) > -1) {
             nameCheck.append(' &#10004; Your narrator ' +  myNarr.fontcolor("blue") + ' was found <br />');
             narrCount++;
        }

        if (narrCount == 0) {
        nameCheck.append('<span style="color: red;">Your narrator was not found in the directory; Please revise</span><br />');
        }

        // for(var i=0; i<narrators.length; i++){
        //   var foundNarrator = elementExists(xml, narrators[i]);
        //   console.log(foundNarrator);
        
        //   if ( foundNarrator === true ) {
        //     nameCheck.append(' &#10004; Your narrator ' +  narrators[i].replace("content=", "").replace("[", "").replace("]", "").fontcolor("blue") + ' was found <br />');
        //     narrCount++;
        //   }
        // };

        // if (narrCount == 0) {
        //   nameCheck.append('<span style="color: red;">Your narrator was not found in the directory; Please revise</span><br />');
        // }

        // var foundLanguage = elementExists(xml, '[<dc:Language>EN</dc:Language>]');
        // if (foundLanguage === true ) {
        //   langCheck.append('You are using the correct language');
        //   langCount++;
        // }
        // else {
        //   langCheck.append('<span style="color: red;">You are using the wrong language</span><br />');
        // }

        if (langCount + narrCount == 2) {
          $(".valResultsOpf").get(0).style.setProperty( "--box-shadow-color", "blue" )
        }
        else {
          $(".valResultsOpf").get(0).style.setProperty( "--box-shadow-color", "red" )
        }

        if (crossCount === 2){
          $(".valResultsBoth").get(0).style.setProperty( "--box-shadow-color", "blue" )
        }  
        else {
          $(".valResultsBoth").get(0).style.setProperty( "--box-shadow-color", "red" )
        }      
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