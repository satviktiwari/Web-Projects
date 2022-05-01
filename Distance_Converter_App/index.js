document.getElementById('output').style.visibility = 'hidden';
document.getElementById('meterinput').addEventListener('input', function(e){
    document.getElementById('output').style.visibility = 'visible';
    let meters = e.target.value;
    console.log(meters);
    document.getElementById('milimeterOutput').innerHTML = meters*1000;
    document.getElementById('centimeterOutput').innerHTML = meters*100;
    document.getElementById('inchesOutput').innerHTML = meters*39.3701;
    document.getElementById('feetOutput').innerHTML = meters*3.28084;
    document.getElementById('yardOutput').innerHTML = meters*1.09361;
    document.getElementById('kilometerOutput').innerHTML = meters/1000;
})