
  document.addEventListener('DOMContentLoaded', function() {
    const app = firebase.app();
    console.log(app)
    const db = firebase.firestore();
    var Note_Count = 0
    Notes =[]
    quiz =[]
    
   


    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    document.getElementById('day').innerHTML = "Day " + data.day;

   const  ref = db.collection('Daily').doc(data.day.toString())
  
    ref.get()
    .then(function(doc) {
      if (doc.exists) {
        Note_Count = parseInt(doc.data().Note_Count);
        console.log(Note_Count);
        var Quiz_count = []
        for(i=0;i<Note_Count;i++){
          
          Quiz_count[i] = parseInt(doc.data().Note[i].Quiz_count);
         console.log(doc.data().Note[i].Quiz_count);

        }
        for(i=0;i<Note_Count;i++){
          Notes[i] = { Note_name: doc.data().Note[i].Note_name,
                       Subject_name: doc.data().Note[i].Subject_name,
                       Description: doc.data().Note[i].Description,
                       }
                       

                       quiz[i] = []
        for(j=0;j<Quiz_count[i];j++){
         
          quiz[i][j] = { Question_no: doc.data().Note[i].Quiz[j].Question_no, 
           Question: doc.data().Note[i].Quiz[j].Question,
            Answer: doc.data().Note[i].Quiz[j].Answer,
            Option1: doc.data().Note[i].Quiz[j].Options[0],
            Option2: doc.data().Note[i].Quiz[j].Options[1],
            Option3: doc.data().Note[i].Quiz[j].Options[2]}

       }
        }
        Insert(Note_Count,Quiz_count,Notes,quiz);
      }});
    })


   function Insert(Note_Count,Quiz_count,Notes,quiz) {
    let html = '';
    
    for(i=0;i<Note_Count;i++){


      const add =   
      `
        <div class="card">
          <div class="row"> 
              <div class="col-md-6" >
                  <div class="card-header">
                          <h2 class="title">Note ${i+1}</h2>
                  </div>
                  <div class="form-group"  style="margin-left:5px;">

                      <input type="text" class="form-control" placeholder="Name of the Note" value="${Notes[i].Note_name}" name="heading1">
                      </span>
                      <input type="text" class="form-control" placeholder="Subject Name" value="${Notes[i].Subject_name}" name="heading2">
                      <input type="text" rows="10" cols="30" style="height: 400px;max-height: none;" class="form-control" placeholder="Description here.." value="${Notes[i].Description}" name="description"></textarea>
                  </div>
              </div>
          </div> 
          
          `
            
          html+= add;
          for(j=0;j<Quiz_count[i];j++){
            const addq = 
         `
          <div class="col-md-12">
                  <div class="card">
                    <div class="card-header">
                      <h5 class="title">Question ${j+1}</h5>
                    </div>
                    <div class="card-body">
                      <form>
                          
                        
                        
                        <div class="row">
                          
                          <div class="col-md-4">
                              <div class="form-group">
                      
                                <input type = "text" class="form-control" placeholder="Here can be your question" value="${quiz[i][j].Question}" name="question"></textarea>
                              </div>
                            </div>

                            
                        </div>
                        <div class="row">
                          <div class="col-md-4">
                            <div class="form-group">
                   
                              <input type="text" class="form-control" placeholder="Right Answer" value="${quiz[i][j].Answer}" name="answer">
                            </div>
                          </div>
                        </div>
                        <br/>
                        <div class="row">
                          <div class="col-md-4">
                            <div class="form-group">
                          
                              <input type="text" class="form-control" placeholder="Option 1" value="${quiz[i][j].Option1}" name="o1">
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-4">
                              <div class="form-group">
                  
                                <input type="text" class="form-control" placeholder="Option 2" value="${quiz[i][j].Option2}" name="o2">
                              </div>
                            </div></div>
                            <div class="row">
                          <div class="col-md-4">
                              <div class="form-group">
                      
                                <input type="text" class="form-control" placeholder="Option 3" value="${quiz[i][j].Option3}" name="o3">
                              </div>
                            </div>
                        </div>
                        
                        
                      </form>
                    </div>
                  </div>
                </div>
         
          ` 
          
html += addq;
        
        }
        html += "</div>"
    
    }
  
  document.getElementById("de").innerHTML= html;     } 
    
