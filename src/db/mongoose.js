const mongoose = require('mongoose')

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i8uw8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(
	uri, { useNewUrlParser: true, useUnifiedTopology: true},
	async (err) => {
		if (err){
			console.log(err)
		} 
		else console.log('Connected to DB!')
	}
)
