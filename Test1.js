describe("TestCase to fetch list of top 50 movies list from IMDB", function()
{

it("Visits IMDB website and Store movies name in a list", function(){


cy.visit("https://www.imdb.com/chart/top/");

console.log("start")

console.log("end")

let movies_list = []

cy.get('.chart > tbody > tr > td:nth-child(3)').each(($elem, index, $list) => {
    if(index <= 50){
        var rating = $elem.text().trim();
        movies_list.push({'rating':rating})
    }
});

cy.get('.chart > tbody > tr > td:nth-child(2)').each(($elem, index, $list) => {
    if(index <= 50){
        var a = $elem.text().split('      ')
        var name_movie = a[2];
        var year_release = a[3].split('  (')[1].substring(0,4);
        movies_list[index].title = name_movie
        movies_list[index].year = year_release



        var href_link = $elem.find('a').attr('href')

        cy.visit('https://www.imdb.com'+href_link)

        // cy.get('#titleYear').invoke('text').should('have.text', year_release)
        
        cy.get('#titleYear').each(($e) => {
            // var year = $e.text().substring(1,5);
            expect($e.text().substring(1,5)).to.equal(year_release)
        });
        cy.get('.title_wrapper > h1').each(($e) => {
            // var movie_name = $e.text().split('(')[0].trim()
            expect($e.text().split('(')[0].trim()).to.equal(name_movie.trim())
        });
        // cy.get('.ratingValue').each(($e) => {
        //     // var rating = $e.text().split('/')[0].trim()
        //     expect($e.text().split('/')[0].trim()).to.equal(movies_list[index].rating)
        // });

    }
});
})
})