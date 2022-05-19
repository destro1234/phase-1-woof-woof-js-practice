document.addEventListener("DOMContentLoaded", function () {
    let dogBar = document.querySelector("#dog-bar");
    let dogInfo = document.querySelector('#dog-info')
    let filterButton = document.querySelector('#good-dog-filter')
    let goodDogs = []
    let allDogs = []

    function getAllPups() {
        fetch(" http://localhost:3000/pups")
        .then(resp => resp.json())
        .then(data => spanDogs(data));
    }

    getAllPups();
    toggleFilterButton()
    

    function spanDogs(data) {
        
            data.forEach(dog => {
                createDog(dog)
                allDogs.push(dog)
                
            }
            
            )};

        

    function createDog(obj) {
         let div = document.createElement('div');
                div.id = 'dog-info';
                let image = document.createElement('img');
                image.src = obj.image;
                let h2 = document.createElement('h2');
                h2.innerHTML = obj.name;
                let button = document.createElement('button');
                obj['isGoodDog'] ? button.innerHTML = 'Good Dog!' : button.innerHTML = 'Bad Dog!'
                div.append(image, h2, button)

                button.addEventListener('click', function (e) {
                    obj['isGoodDog'] ? obj['isGoodDog'] = false : obj['isGoodDog'] = true
                    button.innerHTML == "Good Dog!" ? button.innerHTML = "Bad Dog!" : button.innerHTML = "Good Dog!"
                    if (obj['isGoodDog'] == true) {
                        goodDogs.push(obj)
                        // console.log(goodDogs)
                    } 
            
                })

                let span = document.createElement('span')
            span.innerHTML = obj.name
                dogBar.appendChild(span)
                span.addEventListener('click', function () {
                    document.querySelector('#dog-summary-container').removeChild(document.querySelector('#dog-summary-container').lastChild)
                    document.querySelector('#dog-summary-container').append(div)
                })
    }

    function toggleFilterButton() {
        filterButton.addEventListener('click', function (e) {
            console.log(filterButton.innerHTML == "Filter good dogs: OFF")
            //   filterButton.innerHTML == "Filter good dogs: OFF" ? filterButton.innerHTML = 'Filter good dogs: ON' : filterButton.innerHTML = 'Filter good dogs: OFF'
              console.log(dogInfo)
            if (filterButton.innerHTML == "Filter good dogs: OFF") {
                filterButton.innerHTML = "Filter good dogs: ON"
                dogBar.innerHTML = ""
                goodDogs.forEach(function (dog) {
                    createDog(dog)
    
                })

            


    
            }

            else if (filterButton.innerHTML == "Filter good dogs: ON") {
                console.log(allDogs)
                filterButton.innerHTML = "Filter good dogs: OFF"
                dogBar.innerHTML = " "
                goodDogs.splice(0, goodDogs.length)
                allDogs.forEach(function (dog) {
                    createDog(dog)
    
                })
            }
        })
    }
}
)