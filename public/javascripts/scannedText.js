function onQRCodeScanned(scannedText)
{
    var prenom = document.getElementById("prenom");
    var nom = document.getElementById("nom");
    var email = document.getElementById("email");    
    var test = scannedText.split('\n');
console.log(scannedText)
    //verif du format de la Vcard
    if( test[0] != "BEGIN:VCARD"){
        return("Error");
    }

    if(nom)
    {
        split0 = scannedText.split("\nN:");
        split0 = split0[1].split(';');
        nom.value = split0[0];
    }
    if(prenom)
    {
        split0 = scannedText.split("\nN:");
        split0 = split0[1].split(';');
        split0 = split0[1].split('\n');
        prenom.value = split0[0];
    }
    if(email)
    {
        split0 = scannedText.split("EMAIL:");
        split0 = split0[1].split('\n');
        email.value = split0[0];
    }
}
//this function will be called when JsQRScanner is ready to use
function JsQRScannerReady()
{
    var jbScanner = new JsQRScanner(onQRCodeScanned);
    //reduce the size of analyzed image to increase performance on mobile devices
    jbScanner.setSnapImageMaxSize(300);
    var scannerParentElement = document.getElementById("scanner");
    if(scannerParentElement)
    {
        jbScanner.appendTo(scannerParentElement);
    }        
}