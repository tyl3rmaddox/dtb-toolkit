$(window).ready(function () {
    $('#opfFile').on('change', handleUpload1);
});

var handleUpload1 = function handleUpload1(e) {
    var files1 = e.target.files;
    var i, f;
    for (i = 0, f = files1[i]; i != files1.length; ++i) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var xml = $(e.target.result);

            var dtbTitle = xml[2].getElementsByTagName("metadata")[0].getElementsByTagName("dc-metadata")[0].getElementsByTagName("dc:Title")[0].innerText;
            // var dtbTitle = xml[2].getElementsByTagName("metadata")[0].getElementsByTagName("x-metadata")[0].childNodes[45].content;
            var dtbAuth = xml[2].getElementsByTagName("metadata")[0].getElementsByTagName("x-metadata")[0].childNodes[47].content;
            var dbNumber = xml[2].getElementsByTagName("metadata")[0].getElementsByTagName("x-metadata")[0].childNodes[25].content;
            var sourcePublisher = xml[2].getElementsByTagName("metadata")[0].getElementsByTagName("x-metadata")[0].childNodes[3].content;
            var annotation = xml[2].getElementsByTagName("metadata")[0].getElementsByTagName("dc-metadata")[0].getElementsByTagName("dc:description")[0].innerHTML;

            
            // document.getElementById('dtbTitle').innerText = dtbTitle;
            // document.getElementById('dtbAuth').innerText = dtbAuth;

            var sourcePubSpan = document.getElementsByClassName('sourcePub');
            var dtbTitleSpan = document.getElementsByClassName('dtbTitle');
            var dtbAuthSpan = document.getElementsByClassName('dtbAuth');

            for (var x = 0; x < dtbTitleSpan.length; x++) {
                dtbTitleSpan[x].innerText = dtbTitle;
            }

            for (var x = 0; x < dtbAuthSpan.length; x++) {
                dtbAuthSpan[x].innerText = dtbAuth;
            }

            for (var x = 0; x < sourcePubSpan.length; x++) {
                sourcePubSpan[x].innerText = sourcePublisher;
            }

            document.getElementById('dbNumber').innerText = dbNumber;
            document.getElementById('locAnnotation').innerText = annotation;
            
        };
        reader.readAsBinaryString(f);
    }
};