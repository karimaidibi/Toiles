const nodeMailer = require('nodemailer')

module.exports = {

  //send mail
  sendMessage: (req,res)=>{
    // recuperation des donnees du formulaire
    
    // créer le transporteur
    let transporteur = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'karimaidibi@gmail.com',
            pass: process.env.CODE_GMAIL
        }
    });
    let contenu = 'nom : ' + req.body.nom + '\n' + 'prénom : ' + req.body.prenom + '\n' + 'email : ' + req.body.email +'\n\n contenu du message : \n\n' + req.body.message 
    // créer le soptions du mail
    let mailOptions = {
        from: req.body.email,
        to: 'aidibikarim1999@hotmail.com',
        subject: req.body.sujet,
        text: contenu
    }
    // envoyer le mail
    transporteur.sendMail(mailOptions, (err, infos)=>{
        if(err){
            console.log(err)
            return res.status(500).json({
                status: 500,
                message: 'Echec d envoie de mail'
            })
        }
        return res.status(200).json({
            status: 200,
            message : infos
        })
    })
  }

}