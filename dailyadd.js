const fieldgen = document.querySelector('.fieldgen');
const generateForm = document.querySelector('#generate-form');
var dayno = 0;


document.addEventListener('DOMContentLoaded', function() {
    const app = firebase.app();
    console.log(app)
    const db = firebase.firestore();
    db.collection('Daily').doc('Daily_Info').get()
    .then(function(doc) {
        if (doc.exists) {
            document.querySelector('.day').innerHTML = (doc.data().DaysAdded + 1);
            dayno = doc.data().DaysAdded + 1;
            console.log("dayno :", dayno);
            console.log("dayno :", typeof(dayno));

            db.collection("Daily").doc(dayno.toString()).set({
                Note_Count : 0
            });
            db.collection("Daily").doc("Daily_Info").update({
                DaysAdded : firebase.firestore.FieldValue.increment(1)
            })
            



        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    



})





function generate() {

    var count= parseInt(document.getElementById("count").value)
    console.log(count)
    let html = '';

for(i=1;i<=count;i++){

     const add =   `
   <div class="card">
    <div class="row"> 
        <div class="col-md-6" style="margin-top: 75px;">
            <div class="card-header">
                    <h2 class="title">Note${i}</h2>
            </div>
            <div class="form-group" >
                <input type="text" class="form-control Note" id ="nameofnote${i}" placeholder="Name of the Note"  name="heading1">
                <input type="text" class="form-control Subject" id = "subjectname${i}" placeholder="Subject Name" name="heading2">
                <textarea rows="10" cols="30" style="height: 400px;max-height: none;" class="form-control Description" id ="description${i}" placeholder="Description here.."  name="description"></textarea>
            </div>
        </div>
    </div>
    <div class="row">
                   
                    <div class="col-md-4">
                        <div class="form-group">
                         <label>Quiz Count</label>
                          <input type="number" class="form-control" placeholder="" id="count5${i}">
                        </div>
                    </div>
    </div>
              
                   
                 
                  <input type="submit" class="btn btn-round btn-primary" value="Generate Quiz Fields" name="generate" onclick="quizgenerate(${i})" >
                  <br>
                  <div id="quizgen${i}"> 
                 </div>
                 <br>
                
                 </div>
      `;

      html += add;



}

fieldgen.innerHTML= html;



}




 function quizgenerate(a) {
    var m = parseInt(a)
    var count= parseInt(document.getElementById("count5" + m).value);
    console.log(count);

    let html = '';

    for(i=1;i<=count;i++){


        const add = `<div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="title">Question ${i}</h5>
                            </div>
                            <div class="card-body">
                                <form>
                                    <div class="row">
                                      <div class="col-md-4">
                                            <div class="form-group">
                                                <textarea class="form-control" id = "question${a}${i}" placeholder="Here can be your question"  name="question"></textarea>
                                            </div>
                                        </div>                            
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                 <input type="text" class="form-control" id = "answer${a}${i}" placeholder="Right Answer" value="" name="answer">
                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <input type="text" class="form-control" id = "option1${a}${i}" placeholder="Option 1" value="" name="o1">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">                  
                                                <input type="text" class="form-control" id = "option2${a}${i}" placeholder="Option 2" value="" name="o2">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <input type="text" class="form-control" id = "option3${a}${i}" placeholder="Option 3" value="" name="o3">
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>`;
    

    html += add;
    }
    html +=     `<input type="submit" class="btn btn-round btn-primary" value="Add" name="addnews" onclick="NoteEntry(${a},${count})"> `
    document.getElementById('quizgen' + m).innerHTML=html;

}


function NoteEntry(index,count){
   
    const app = firebase.app();
    console.log(app)
    const db = firebase.firestore();
    const noteRef =  db.collection('Daily').doc(dayno.toString())

    


    var Note_name = document.getElementById("nameofnote"+index).value
    var Subject_name  = document.getElementById("subjectname"+index).value
    var Description  = document.getElementById("description"+index).value

    Quiz=[]
for(i=1;i<=count;i++){
    Option=[]
    var Question = document.getElementById("question"+index + i).value
    var Answer  = document.getElementById("answer"+index + i).value
    Option.push(document.getElementById("option1"+index + i).value)
    Option.push(document.getElementById("option2"+index + i).value)
    Option.push(document.getElementById("option3"+index + i).value)

    
    Quiz.push({Question_no: i, Question: Question,
        Answer:Answer,Options:Option})
        
        
    }
    
 

r =    {
        Note_name: Note_name,
        Subject_name: Subject_name,
        Description:Description,
        Quiz:Quiz,
        Quiz_count: count
    }

    noteRef.update({
        Note : firebase.firestore.FieldValue.arrayUnion(r),
        Note_Count : firebase.firestore.FieldValue.increment(1)


        }).then(function() {
            
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });





  
}