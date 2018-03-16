const should = require('should')
    , DB = require('../../db')
    , fixtures = require('../fixtures/model-visiteurs')
    , Visiteur = require('../../app/persistence/visiteurPersistence')


const visiteur = {
    prenom: 'Jean',
    email: 'jean.dupont@gmail.com',
    nom: 'Dupont',
    telephone: '0241414141',
    linkedin: 'inutile',
    viadeo: 'inutile2',
    profil: 1,
    metier: 'ingenieur',
    contact: 'non',
    jour: 17,
    id_salon: 'DevFest_2017-11-16_2017-11-18'
};

describe('Model Visiteur Tests', function () {

    /**
       * Avant d'exécuter les tests, la connexion à la BDD dédiée aux tests
       * est initialisée.
       * Cette méthode est appelée une fois. Il y aura une connexion pour la
       * série de tests.
       */
    before(function (done) {
        DB.connect(DB.MODE_TEST, done)
    })

    /**
       * La BDD est nettoyée et remplie à l'aide du fichier JSON model-visiteur 
       * contenant des visiteurs.
       * Cette méthode est exécutée avant chaque test. Ceci permet d'avoir une
       * BDD stable.
       */
    beforeEach(function (done) {
        DB.drop(function (err) {
            if (err) return done(err)
            DB.fixtures(fixtures, done)
        })
    })

    it('get', function (done) {
        Visiteur.get(visiteur.id_salon, function (err, visiteurs) {
            visiteurs.length.should.eql(2)
            done()
        })
    })

    it('save', function (done) {
        Visiteur.save(visiteur, function (err, id) {
            Visiteur.get(visiteur.id_salon, function (err, visiteurs) {
                visiteurs.length.should.eql(3)
                visiteurs[2]._id.should.eql(id)
                visiteurs[2].nom.should.eql('Dupont')
                visiteurs[2].email.should.eql('jean.dupont@gmail.com')
                visiteurs[2].telephone.should.eql('0241414141')
                visiteurs[2].linkedin.should.eql('inutile')
                visiteurs[2].viadeo.should.eql('inutile2')
                visiteurs[2].profil.should.eql(1)
                visiteurs[2].metier.should.eql('ingenieur')
                visiteurs[2].contact.should.eql('non')
                visiteurs[0].jour.should.eql(20) // utilisation du visiteur ajouter via le fichier model-visiteur.json
                visiteurs[2].id_salon.should.eql('DevFest_2017-11-16_2017-11-18')
                done()
            })
        })
    })

})