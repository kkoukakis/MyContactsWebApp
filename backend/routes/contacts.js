const router = require('express').Router();
let Contacts = require('../models/contacts.model');

router.route('/').get((req,res) => {
    Contacts.find() 
    .then(contacts => {
        res.json(contacts);
        if(process.env.DEV_MODE == true)
        contacts.forEach(x =>console.log(x['_id']))
    })
    .catch(err => res.status(400).json(`Error: ${err}`))
});

router.route('/add').post((req,res)=>{
    const fullname = String(req.query.fullname);
    const email    = String(req.query.email);
    const address  = String(req.query.address);
    const phones   = Number(req.query.phones);

    if(process.env.DEV_MODE == true)
    console.log(fullname + " , " + email + " , " +address)

    const newContact = new Contacts({fullname, email, address, phones});

    newContact.save()
    .then(()=> res.json('Contact added!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/delete/:id').delete((req,res)=>{
    Contacts.findByIdAndDelete(req.params.id)
        .then(()=> res.json('Contact deleted.')
        .catch(err => res.status(400).json(`Error: ${err}`)));
});

router.route('/clear').delete((req,res)=>{
    Contacts.findByIdAndDelete(req.params.id)
        .then(()=> res.json('Contact deleted.')
        .catch(err => res.status(400).json(`Error: ${err}`)));
});


router.route('/update/:id').put((req,res) => {
    // console.log(req.params.id)
    Contacts.findById(req.params.id)
    .then(contact => {

        if(req.query.address != null)
        if(contact.address != req.query.address && req.query.address.length > 2)
        contact.address = req.query.address;

        if(req.query.phones != null)
        if((contact.phones != req.query.phones.length) && (req.query.phones.length > 2 ))
        contact.phones = Number(req.query.phones);

        contact.save()
        .then(() => res.json('Contact updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
})

module.exports = router;