/// <reference types="cypress" />
import bledneDane from '../../fixtures/bledneDane.json'
import wpisaneParametry from '../../pageObject/wpisaneParametry.js'

const dane = new wpisaneParametry();


context('Testy Kalkulatora BMI', () => {
    describe('Kalkulator BMI', {tags: 'testBMI'}, () => {
        beforeEach('Wejscie na stronę', () => {
            cy.visit('https://akuninfowl.github.io/KalkulatorBMI_MK');
            cy.url().should('contain', 'KalkulatorBMI_MK');

        })
        it('Test 1 - Odpowiednia wielkość nagłówka', () => {
            cy.get('.naglowek').should('have.css', 'font-size', '40px');

        })

        it('Test 2 - Grubość obramowania modułów oraz marginesy', () => {
            cy.get('.moduly > div')
                .should('have.css', 'border', '1px solid rgb(102, 103, 171)').and('have.css', 'margin', '10px');

        })

        it('Test 3 - Obecność 3 modułów: Formularza, Wyników oraz Historii pomiarów', () => {
            cy.get('.moduly > div').should(($div) => {
                expect($div).to.have.length(3)
            });

            cy.get('.modul1').should(($p) => {
                expect($p).to.contain('Wpisz dane')
            });

            cy.get('.modul2').should(($p) => {
                expect($p).to.contain('Wynik')
            });

            cy.get('.modul3').should(($p) => {
                expect($p).to.contain('Historia pomiarów')
            });

        })

        it('Test 4 - Informacja o wprowadzeniu błędnych wartości wagi', () => {
            dane.podanaWaga().type(bledneDane[0].blednaWaga);
            dane.podanyWzrost().type('120');
            dane.przyciskZatwierdz().click();

            dane.wynikWaga().should('have.text', 'waga nie jest poprawna');
            dane.wynikBMI().should('have.text', "Wpisane dane są błędne. Popraw dane.");

        })

        it('Test 5 - Informacja o wprowadzeniu błędnych wartości wzrostu', () => {
            dane.podanaWaga().type('40');
            dane.podanyWzrost().type(bledneDane[1].blednyWzrost);
            dane.przyciskZatwierdz().click();

            dane.wynikWzrost().should('have.text', 'wzrost nie jest poprawny');
            dane.wynikBMI().should('have.text', "Wpisane dane są błędne. Popraw dane.");

        })

        it('Test 6 - Informacja o błędnych danych po zatwierdzeniu pustego formularza', () => {
            dane.przyciskZatwierdz().click();

            dane.wynikWaga().should('have.text', 'waga nie jest poprawna');
            dane.wynikWzrost().should('have.text', 'wzrost nie jest poprawny');
            dane.wynikBMI().should('have.text', "Wpisane dane są błędne. Popraw dane.");

        })


        it('Test 7 - Wyświetlanie poprawnego wyniku w module Wyniki', () => {
            cy.wpiszDaneMin();

            dane.wynikWaga().should('have.text', 'Twoja waga:40 kg');
            dane.wynikWzrost().should('have.text', 'Twój wzrost:120 cm');
            dane.wynikBMI().should('have.text', 'Twoje BMI wynosi:27.78');

        })

        it('Test 8 - Wyświetlanie pomiaru w Historii Pomiarów', () => {
            cy.wpiszDaneMin();

            cy.get('.wynikDoHistorii').should(($lis) => {
                expect($lis).to.have.length(1)
                expect($lis).to.contain('40')
                expect($lis).to.contain('120')
                expect($lis).to.contain('27.78')

            });

        })

        it('Test 9 - Czyszczenie pól formularza po wprowadzeniu poprawnych danych', () => {
            cy.wpiszDaneMin();

            dane.podanaWaga().should('have.value', '');
            dane.podanyWzrost().should('have.value', '');

        })

        it('Test 10 - Brak czyszczenia formularza po wprowadzeniu niepoprawnych danych', () => {

            dane.podanaWaga().type(bledneDane[0].blednaWaga);
            dane.podanyWzrost().type(bledneDane[1].blednyWzrost);
            dane.przyciskZatwierdz().click();

            dane.podanaWaga().should('have.value', bledneDane[0].blednaWaga);
            dane.podanyWzrost().should('have.value', bledneDane[1].blednyWzrost);

        })

        it('Test 11 - Pojawienie się informacji o zmianie BMI', () => {
            cy.wpiszDaneMaks();
            cy.wpiszDaneMin();

            cy.get('.modul2 > .zmianaBMI').should(($p) =>
                expect($p).not.to.be.empty

            );

        })

        it('Test 12 - Wyświetlenie poprzedniego pomiaru w module wyników', () => {
            cy.wpiszDaneMaks();
            cy.get('.wynikDoHistorii').should(($lis) => {
                expect($lis).to.have.length(1)
            });
            cy.wpiszDaneMin();


            cy.get('.wynikDoHistorii > li').should(($lis) => {
                expect($lis).to.have.length(2)
            });

            cy.get('#klik1').click();

            dane.wynikWaga().should('have.text', 'Twoja waga:200 kg');
            dane.wynikWzrost().should('have.text', 'Twój wzrost:240 cm');
            dane.wynikBMI().should('have.text', 'Twoje BMI:34.72');

        })

        it('Test 13 - Wyświetlenie poprawnej średniej pomiarów BMI', () => {

            cy.wpiszDaneMaks();
            cy.wpiszDaneMin();

            cy.get('#sredniaBMI').should(($p) => {
                expect($p).to.contain('31.25')
            });


        })

    })

})