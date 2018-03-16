
should = require('should')
, mockery = require('mockery')

salonPersistenceMock = require('../mock/salonPersistenceMock')
var BDD = new salonPersistenceMock();

const salon = {
    nom: 'OuestAvenir',
    ville: 'Rennes',
    date_debut: '2015-10-30',
    date_fin: '2016-11-30',
    description: 'forum de l\'ouest',
    id_salon: 'OuestAvenir_2015-10-30_2016-11-30'
};

describe('Salon Controller Tests', function () {
    before(function () {
        controller = require('../../app/controller/salonController')
        controllerMock = new controller();
        controllerMock.setPersistence(BDD);
    })

    it('getSalons', function (done) {
        controllerMock.getSalons(function (err, result) {
            if (err) {
                return done(err);
            }
            result.should.not.be.empty;
            result[0].nom.should.eql('DevFest');
            result.length.should.eql(2);
            done();
        })
    })

    // ne fonctionne pas 
    it('getSalonCourant', function (done) {
        controllerMock.getSalonCourant(function (err, result) {
            if (err) {
                return done(err);
            }
            console.log(result)
            result.should.not.be.empty;
            
            done(); 
        })
    })

})