const router = require('express').Router();
let Contacts = require('../models/contacts.model');


//Get all contacts
router.route('/').get((req,res) => {
    Contacts.find() 
    .then(contacts => {
        res.json(contacts);
        if(process.env.DEV_MODE == true)
        contacts.forEach(x =>console.log(x['id']))
    })
    .catch(err => res.status(400).json(`Error: ${err}`))
});

//Add a new contact
router.route('/add').post((req,res)=>{

    const fullname = String(req.body.fullname);
    const email    = String(req.body.email);
    const address  = String(req.body.address);
    const phones   = Number(req.body.phones);
    if(req.body.address == null){
        address = ""
    }
    if(req.body.phones == null){
        phones = ""
    }

    console.log("/add/ " + fullname + " , " + email + " , " +address)
    const newContact = new Contacts({fullname, email, address, phones});
    newContact.save()
    .then( 
        ()=>  {
            try {
                res.json('Contact added!')
            } catch (error) {
                res.status(400).json(`Error: ${error}`)    
     }})
});

//Delete specific id
router.route('/delete/:id').delete((req,res)=>{
    console.log("/delete/" + req.params.id)
    Contacts.findByIdAndDelete(req.params.id.toString())
    .then( 
        ()=>  {
            try {
                res.json('Contact deleted!')
            } catch (error) {
                res.status(400).json(`Error: ${error}`)    
     }})
      
});

//Update route
router.route('/update/:id').post((req,res) => {
    console.log(req.body)
    Contacts.findById(req.params.id)
    .then(contact => {
        //Check if is not null
        if(req.body.address != null)
        if(contact.address != req.body.address && req.query.body.length > 2)
        contact.address = req.body.address;
        //Check if is not null
        if(req.body.phones != null)
        if((contact.phones != req.body.phones.length) && (req.body.phones.length > 2 ))
        contact.phones = Number(req.body.phones);
        //Save new contact
        contact.save()
        .then(() => res.json('Contact updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
})

module.exports = router;