const should = require('should')
    , DB = require('../../db')
    , fixtures = require('../fixtures/model-salons')
    , Salon = require('../../app/persistence/salonPersistence')

const salon = {
    nom: 'OuestAvenir',
    ville: 'Rennes',
    date_debut: '2015-10-30',
    date_fin: '2016-11-30',
    description: 'forum de l\'ouest',
    id_salon: 'OuestAvenir_2015-10-30_2016-11-30'
};

describe('Model Salon Tests', function () {

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
     * La BDD est nettoyée et remplie à l'aide du fichier JSON model-salon 
     * contenant des salons.
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
        Salon.get(function (err, salons) {
            salons.length.should.eql(2)
            done()
        })
    })

    it('save', function (done) {
        Salon.save(salon, function (err, id) {
            Salon.get(function (err, salons) {
                salons.length.should.eql(3)
                salons[2]._id.should.eql(id)
                salons[2].nom.should.eql('OuestAvenir')
                salons[2].ville.should.eql('Rennes')
                salons[2].date_debut.should.eql('2015-10-30')
                salons[2].date_fin.should.eql('2016-11-30')
                salons[2].description.should.eql('forum de l\'ouest')
                salons[2].id_salon.should.eql('OuestAvenir_2015-10-30_2016-11-30')
                done()
            })
        })
    })

    it('delete', function (done) {
        Salon.get(function (err, salons) {
            Salon.delete(salons[0]._id, function (err) {
                Salon.get(function (err, result) {
                    result.length.should.eql(1)
                    result[0]._id.should.not.eql(salons[0]._id)
                    done()
                })
            })
        })
    })

    it('get_today', function (done) {
        Salon.get_today(function (err, salon) {
            salon.id_salon.should.eql('AnjouPerspectives_2017-11-9_2018-11-9');
            done()
        })
    })

    it('get_a-day', function (done) {
        Salon.get_a_day(function(err, nbSalon) {
            nbSalon.should.eql('1')
            done()
        })
    })
})