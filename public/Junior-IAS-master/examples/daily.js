 function daygen(j) {

     var b = j;
        url = 'dailyview.html?day='+ j;

     document.location.href = url;
        
}


document.addEventListener('DOMContentLoaded', function() {
    const app = firebase.app();
    console.log(app);
    const db = firebase.firestore();
    db.collection('Daily').doc('Daily_Info').get()
    .then(function(doc) {
      var ht = '';
      var n = 0;
        if (doc.exists) {
           n = doc.data().DaysAdded;
           console.log(n)
           
    for(i=1;i<=n;i++)
    {

      const add =   
      `<button type="button" class="col-md-2 pr-1 btn btn-round btn-outline-primary btn-primary button1" value="Day ${i}" name="day${i}" onclick="daygen(${i})" >Day ${i} </button><br>`
ht += add;  
  }
  document.getElementById("demo").innerHTML= ht;
        } 
        
    })
    
       }
)        
   



