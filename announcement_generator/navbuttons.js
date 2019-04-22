$(document).ready(function(){

    $("#oneLevelText").hide();
    $("#twoLevelText").hide();
    $("#threeLevelText").hide();

    $("input:radio[name='nav']").change(function(){  

            if(this.value == 'one' && this.checked){
              $("#oneLevelText").show();
            }else{
              $("#oneLevelText").hide();
            }

            if(this.value == 'two' && this.checked){
                $("#twoLevelText").show();
              }else{
                $("#twoLevelText").hide();
              }

              if(this.value == 'three' && this.checked){
                $("#threeLevelText").show();
              }else{
                $("#threeLevelText").hide();
              }

    });

});