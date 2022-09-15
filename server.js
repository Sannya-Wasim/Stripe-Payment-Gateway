const express=require('express');
const bodyParser=require('body-parser');
require('dotenv').config();
// const path=require('path');
const Stripe=require('stripe')('sk_test_51LiDRNGnkLV9x7EnBU46iQXb9Zk9IkFPrHigHI5dPn29fdRmMUfHs0fUTqKKwzFQD0ttrRktlvxHsK5chyFuApqc00oDZ06JhJ');
var cors=require ('cors');

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

const port=process.env.PORT || 5000;

app.listen(port, error=>{
    if(error) throw error;
    console.log('Your server is running on port 5000');
});

app.post('/payment', async(req, res)=>{
    let status, error;
    const {token, amount} = req.body;
    try {
        await Stripe.charges.create({
            source:token.id,
            amount,
            currency:'usd'
        });
        status ="success"
    } catch (error) {
        console.log(error);
        status="Failure";
    }
    res.json({error, status});
});
