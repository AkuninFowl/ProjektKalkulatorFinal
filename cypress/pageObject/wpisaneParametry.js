class wpisaneParametry{
    _wpisanaWaga = '.wpisanaWaga'
    _wpisanyWzrost = '.wpisanyWzrost'
    _waga='.waga'
    _wzrost='.wzrost'
    _przyciskZatwierdz='.przycisk'
    _wynikBMI='.wynikBMI'


    wynikWaga(){
        return cy.get(this._wpisanaWaga)
    }

    wynikWzrost(){
        return cy.get(this._wpisanyWzrost)
    }

    podanaWaga(){
        return cy.get(this._waga)
    }

    podanyWzrost(){
        return cy.get(this._wzrost)
    }

    przyciskZatwierdz(){
        return cy.get(this._przyciskZatwierdz)
    }

    wynikBMI(){
        return cy.get(this._wynikBMI)
    }




}

export default wpisaneParametry