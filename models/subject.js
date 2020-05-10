const mongoose = require("mongoose");

const Schema =  mongoose.Schema;

const Subject = new Schema({
        subjectName: {
            type:String,
            lowercase:true,
            trim:true,
            required:true
        },
        subjectDescription: {
            type:String,
            required:true,
            lowercase:true,
            trim:true
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category",
            required:true 
        }
        ,
        tutors:[
            {
              type:mongoose.Schema.Types.ObjectId,
              ref:"Tutors" 
            }
        ]
});

module.exports = mongoose.model("Subjects",Subject);



/*
primary school
English Language
Verbal Reasoning
Spelling
Mathematics
Quantitative Reasoning
Elementary Science
Social Studies
Vocational Aptitude
Health Education
Bible Knowledge
Languages
Creative Arts
Computer
Agric Science
Home Economics
Civic
Music
Moral Instruction
Handwriting
*/


/*
 Mathematics
2. English Language
3. A Nigerian Language (Yoruba)
4. Basic Science
5. Social Studies
6. Fine Arts/Creative Art
7. Agricultural Science
8. Civic Education
9. Christian Religion Studies
10. Physical and Health Education
11. Business Studies
12. French
13. Computer Studies
14. Home Economics
15. Music
16. Basic Technology
*/

/*





*/