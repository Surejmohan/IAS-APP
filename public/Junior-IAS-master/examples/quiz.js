var db,app,quizref,count
category = []
let html = '',htm = ''
document.addEventListener('DOMContentLoaded', function() {

app = firebase.app();
console.log(app)
db = firebase.firestore();
quizref = db.collection("Quiz").doc('Quiz_Info')
quizref.get()
.then(function(doc) {
    if (doc.exists) {
        category = doc.data().Category
        count = doc.data().TotalCount
        console.log(count)
    
html = html + `<select class="form-control" id = "cat" value="" name="categoryselect">`;
html = html + `<option value="">select_category</option>`;
for(i=0;i<count;i++)
{
    html = html + `<option value="${category[i]}">${category[i]}</option>`;
                    console.log(category[i])              
                              
}
html = html +   `</select>`;
document.getElementById("dropbox").innerHTML= html;




htm = htm + `<select class="form-control" id = "cat1" value="" name="categoryselect">`;
htm = htm + `<option value="">select_category</option>`;
for(i=0;i<count;i++)
{
    htm = htm + `<option value="${category[i]}">${category[i]}</option>`;
                    console.log(category[i])              
                              
}
htm = htm +   `</select>`;


document.getElementById("selectcat").innerHTML= htm;
}})
})
function Add_category()
{
    var Category = document.getElementById("addcat").value
    console.log(Category)
    db.collection("Quiz").doc(Category.toString()).set({
    Question : [],
    Quizcount : 0
     
    }).then(function() {
            
    console.log("Document successfully written!");
    })
    .catch(function(error) {
    console.error("Error writing document: ", error);
    });
    quizref.update({
        Category : firebase.firestore.FieldValue.arrayUnion(Category),
        TotalCount : firebase.firestore.FieldValue.increment(1)
    })
    
}

function Add_question()
{   
    var cat = document.getElementById("cat").value
    var addref = db.collection("Quiz").doc(cat.toString())
    
    Option=[]
    
    var Question = document.getElementById("question").value
    var Answer  = document.getElementById("answer").value
    Option.push(document.getElementById("option0").value)
    Option.push(document.getElementById("option1").value)
    Option.push(document.getElementById("option2").value)

    r = {Question: Question,
        Answer:Answer,Options:Option}

    addref.update({
        Quiz : firebase.firestore.FieldValue.arrayUnion(r),
        Quizcount : firebase.firestore.FieldValue.increment(1)

    }).then(function() {
            
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });


    
}

function View_all()
{
    var cat = document.getElementById("cat1").value
    var viewref = db.collection("Quiz").doc(cat.toString())
    Quiz = []
    Quizcount = 0


    viewref.get()
    .then(function(doc) {
    if (doc.exists) {
        Quiz = doc.data().Quiz
        Quizcount = doc.data().Quizcount

        let html1 = '';
        html1+=   `<div class="row">`
        for(i=0;i<Quizcount;i++){
            j =0
        
      const add =   
      
      `
      <div class="col-md-4">
      <div class="form-group">
        <label>Question</label>
        <input class="form-control"  id = "question${i}"placeholder="Here can be your question" value="${Quiz[i].Question}" name="question"></textarea>
        <br/>
        <label>Right Answer</label>
        <input type="text" class="form-control" id ="answer${i}" placeholder="Right Answer" value="${Quiz[i].Answer}" name="answer">
        <br/>
        <label>Option 1</label>
        <input type="text" class="form-control" id ="option1${i}" placeholder="Option 1" value="${Quiz[i].Options[j]}" name="o1">
        <br/>
        <label>Option 2</label>
        <input type="text" class="form-control" id ="option2${i}" placeholder="Option 2" value="${Quiz[i].Options[j+1]}" name="o2">
        <br/>
        <label>Option 3</label>
        <input type="text" class="form-control" id = "option3${i}" placeholder="Option 3" value="${Quiz[i].Options[j+2]}" name="o3">
        <br/>
      </div>
    </div> `
    html1+= add;
        }
        html1+=  `</div>`
        html1 += ` <input type="submit" class="btn btn-round btn-primary"  value="Update" name="updatequestion" onclick = "Update(${cat},${Quizcount})">`
        document.getElementById("viewquiz").innerHTML= html1;
    }})


    
}

function Update(cat,count1)
{
    console.log(cat)
    var viewref1 = db.collection("Quiz").doc(cat.toString())
    Quiz=[]
    for(i=0;i<count1;i++){
        Options=[]
        var Question = document.getElementById("question"+i).value
        var Answer  = document.getElementById("answer"+i).value
        Options.push(document.getElementById("option1"+i).value)
        Options.push(document.getElementById("option2"+i).value)
        Options.push(document.getElementById("option3"+i).value)

        Quiz[i] = {Question: Question,
            Answer:Answer,Options:Options}

            console.log(Quiz)
           
    
    }
    viewref1.update({
        Quiz: Quiz
    }).then(function() {
            
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
    
    
}