const db = require("../config/db")


const getJobs = async(req,res)=>{
    try {
        const data= await db.query('SELECT * FROM jobdetails')
        if (!data){
           return  res.status(404).send({
                success:false,
                message:"not found",
                
            })
        }
        res.status(200).send({
            success:true,
            message:"data fetched successfuly",
            data:data[0]
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error fetching jobs",
            error
        })
        
    }

}


const getJobById= async(req,res)=>{
    try {

        const jobid = req.params.id

        if (!jobid){
            return  res.status(404).send({
                 success:false,
                 message:"id not found",
                 
             })
         }

         const data = await db.query(`SELECT * FROM jobdetails WHERE id=?`,[jobid])
         if (!data){
            return res.status(404).send({
                success:false,
                message:"details not found",
                
            })
         }
         res.status(200).send({
            success:true,
            message:"data fetched successfuly",
            jobdetail:data[0]
         })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:
                "jobs get by id failed",
                error
            
        })
        
    }
}

const createjobs = async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const { title, company, location, salary, description } = req.body;

        if (!title || !company || !location || !salary || !description) {
            return res.status(400).send({
                success: false,
                message: "Please fill all required fields",
            });
        }
        const createdAt = new Date();

        const query = `
            INSERT INTO jobdetails (title, company, location, salary, description, createdAt)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [title, company, location, salary, description, createdAt];

        // Execute the query
        const [result] = await db.query(query, values);

        // Response
        res.status(201).send({
            success: true,
            message: "Job created successfully",
            jobDetail: {
                id: result.insertId,
                title,
                company,
                location,
                salary,
                description,
                createdAt,
            },
        });
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).send({
            success: false,
            message: "Error creating job",
            error: error.message,
        });
    }
};


const updateJobs= async(req,res)=>{
    try {
        const jobid= req.params.id

        if(!jobid){
            return res.status(404).send(
                {
                    success:false,
                    message:"id not found"
                }
            )
        }
        const { title, company, location, salary, description } = req.body;
       

        if (!title || !company || !location || !salary || !description) {
            return res.status(400).send({
                success: false,
                message: "Please fill all required fields",
            });
        }
        
        const query = `UPDATE jobdetails SET title = ?, company = ?, location = ?, salary = ?, description = ? 
        WHERE id = ?`;

       const data= await db.query(query, [title, company, location, salary, description,jobid])

       res.status(201).send({
        success:true,
        message:"data updated",
        updatedData:data[0]

       })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"update failed",
            error
        
        })
        
    }
}


const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(404).send({
                success: false,
                message: "id not found",
            });
        }
        const query = `DELETE FROM jobdetails WHERE id = ?`;
        const data = await db.query(query, [jobId]);

        if (data.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: `No job found with ID: ${jobId}. Please check and try again.`,
            });
        }
        return res.status(200).send({
            success: true,
            message: `Job with ID: ${jobId} was successfully deleted.`,
        });
    } catch (error) {
        console.error('Error deleting job:', error);
        return res.status(500).send({
            success: false,
            message: "Failed to delete job",
            error: error.message,
        });
    }
};




module.exports={getJobs,getJobById,createjobs,updateJobs,deleteJob}